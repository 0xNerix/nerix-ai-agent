import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/auth'
import { ApiError, ErrorCode } from '../api'
import { logger } from '@/lib/utils/logger'

export interface AuthResult {
  isAuthenticated: boolean
  isAdmin: boolean
  session: any | null
  userAddress: string | null
}

export async function getCurrentUser(): Promise<AuthResult> {
  try {
    const session = await getServerSession(authOptions)
    const adminWalletAddress = process.env.ADMIN_WALLET_ADDRESS
    
    const isAuthenticated = !!session?.user?.address
    const userAddress = session?.user?.address || null
    const isAdmin = isAuthenticated && adminWalletAddress 
      ? userAddress!.toLowerCase() === adminWalletAddress.toLowerCase() 
      : false

    return {
      isAuthenticated,
      isAdmin,
      session,
      userAddress
    }
  } catch (error) {
    logger.error('Get current user failed:', error)
    return {
      isAuthenticated: false,
      isAdmin: false,
      session: null,
      userAddress: null
    }
  }
}

export async function requireAuth(): Promise<void> {
  const { isAuthenticated } = await getCurrentUser()
  
  if (!isAuthenticated) {
    throw new ApiError(ErrorCode.UNAUTHORIZED)
  }
}

export async function requireAdmin(): Promise<void> {
  const { isAuthenticated, isAdmin } = await getCurrentUser()
  
  if (!isAuthenticated) {
    throw new ApiError(ErrorCode.UNAUTHORIZED)
  }

  if (!isAdmin) {
    throw new ApiError(ErrorCode.ADMIN_ACCESS_REQUIRED)
  }
}