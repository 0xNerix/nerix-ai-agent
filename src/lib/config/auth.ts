import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SiweMessage } from 'siwe'
import { db } from '@/database'
import { users, wallets, sessions, betaAccessLogs } from '@/database/schema'
import { eq, sql } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { logger } from '@/lib/utils/logger'

export const authOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0"
        },
        signature: {
          label: "Signature", 
          type: "text",
          placeholder: "0x0"
        }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.message || !credentials?.signature) {
            return null
          }

          const siwe = new SiweMessage(credentials.message)
          
          // Verify the signature
          const verificationResult = await siwe.verify({
            signature: credentials.signature,
          })

          if (!verificationResult.success) {
            return null
          }

          // Check if message is not expired
          if (siwe.expirationTime && new Date() > new Date(siwe.expirationTime)) {
            return null
          }

          // Check if message is not used before its valid time
          if (siwe.notBefore && new Date() < new Date(siwe.notBefore)) {
            return null
          }

          // Create or update user in database
          const walletAddress = siwe.address.toLowerCase()
          const userId = `${walletAddress}`
          
          // Check if user exists
          const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)

          let user = existingUser[0]
          
          if (!user) {
            // Create new user
            const newUser = await db.insert(users).values({
              id: userId,
              name: walletAddress,
              email: `${walletAddress}@ethereum.org`,
              image: `https://api.dicebear.com/9.x/identicon/svg?seed=${walletAddress}`,
            }).returning()
            user = newUser[0]
          }

          // Create or update wallet record
          const existingWallet = await db
            .select()
            .from(wallets)
            .where(eq(wallets.address, walletAddress))
            .limit(1)

          if (existingWallet.length === 0) {
            await db.insert(wallets).values({
              address: walletAddress,
              userId: userId,
              lastActiveAt: new Date(),
            })
          } else {
            await db.update(wallets)
              .set({ 
                userId: userId,
                lastActiveAt: new Date(),
                updatedAt: new Date()
              })
              .where(eq(wallets.address, walletAddress))
          }

          return {
            id: userId,
            name: walletAddress,
            email: `${walletAddress}@ethereum.org`,
            image: `https://api.dicebear.com/9.x/identicon/svg?seed=${walletAddress}`,
          }
        } catch (e) {
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub) {
        session.address = token.sub
        session.user.id = token.sub
        session.user.address = token.sub
      }
      return session
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.sub = user.id
        
        // Log JWT session to database
        try {
          const sessionToken = nanoid(32)
          const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          
          // Check if session exists for this user
          const existingSession = await db
            .select()
            .from(sessions)
            .where(eq(sessions.userId, user.id))
            .limit(1)

          if (existingSession.length > 0) {
            // Update existing session
            await db.update(sessions)
              .set({ 
                sessionToken: sessionToken,
                expires: expires 
              })
              .where(eq(sessions.userId, user.id))
          } else {
            // Create new session
            await db.insert(sessions).values({
              sessionToken: sessionToken,
              userId: user.id,
              expires: expires
            })
          }
          
          token.sessionToken = sessionToken
        } catch (error) {
          logger.error('Failed to log JWT session:', error)
        }
      }
      return token
    }
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  debug: process.env.NODE_ENV === 'development',
}

export async function checkBetaAccess(walletAddress: string): Promise<boolean> {
  try {
    const result = await db
      .select({ 
        count: sql<number>`COUNT(*)` 
      })
      .from(betaAccessLogs)
      .where(eq(betaAccessLogs.walletAddress, walletAddress))
    
    return result[0].count > 0
  } catch (error) {
    logger.error('Failed to check beta access:', error)
    return false
  }
}
