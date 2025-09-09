import { NextRequest } from 'next/server';
import { db } from '@/database';
import { betaCodes, betaAccessLogs } from '@/database/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { requireAuth, getCurrentUser } from "@/lib/auth/server-auth";
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';

const betaAccessRequestSchema = z.object({
  betaCode: z.string().min(1)
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate with server-auth
    await requireAuth();
    const { userAddress } = await getCurrentUser();

    const body = await request.json();
    const { betaCode } = betaAccessRequestSchema.parse(body);

    const walletAddress = userAddress!;

    // Check if user already has beta access (any log entry means they have access)
    const existingAccess = await db
      .select()
      .from(betaAccessLogs)
      .where(eq(betaAccessLogs.walletAddress, walletAddress))
      .limit(1);

    if (existingAccess.length > 0) {
      throw new ApiError(ErrorCode.BETA_ACCESS_ALREADY_EXISTS);
    }

    // Validate beta code
    const codeResult = await db
      .select()
      .from(betaCodes)
      .where(
        and(
          eq(betaCodes.id, betaCode),
          eq(betaCodes.isActive, true)
        )
      )
      .limit(1);

    if (codeResult.length === 0) {
      throw new ApiError(ErrorCode.BETA_CODE_INVALID, undefined, 400, { betaCode });
    }

    const code = codeResult[0];

    // Check if code is expired
    if (code.expiresAt && new Date() > code.expiresAt) {
      throw new ApiError(ErrorCode.BETA_CODE_EXPIRED, undefined, 400, { betaCode, expiresAt: code.expiresAt });
    }

    // Check usage limits
    if (code.maxUses) {
      const maxUsesNum = parseInt(code.maxUses);
      const currentUsesNum = parseInt(code.currentUses);
      
      if (currentUsesNum >= maxUsesNum) {
        throw new ApiError(ErrorCode.BETA_CODE_USAGE_LIMIT_EXCEEDED, undefined, 400, { betaCode, maxUses: maxUsesNum, currentUses: currentUsesNum });
      }
    }

    // Check if user already used this specific code
    const existingUsage = await db
      .select()
      .from(betaAccessLogs)
      .where(
        and(
          eq(betaAccessLogs.walletAddress, walletAddress),
          eq(betaAccessLogs.betaCodeId, betaCode)
        )
      )
      .limit(1);

    if (existingUsage.length > 0) {
      throw new ApiError(ErrorCode.BETA_CODE_ALREADY_USED, undefined, 400, { walletAddress, betaCode });
    }

    // Generate simple ID using timestamp + random
    const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Start transaction
    await db.transaction(async (tx) => {
      // Log the beta code usage (this is the only record we need)
      await tx.insert(betaAccessLogs).values({
        id: generateId(),
        walletAddress,
        betaCodeId: betaCode,
        usedAt: new Date(),
      });

      // Update beta code usage count
      const newUsageCount = (parseInt(code.currentUses) + 1).toString();
      await tx
        .update(betaCodes)
        .set({ 
          currentUses: newUsageCount,
          updatedAt: new Date()
        })
        .where(eq(betaCodes.id, betaCode));
    });

    
    return createSuccessResponse({
      message: 'Beta access successfully activated',
      betaCode,
      walletAddress
    }, request);

  } catch (error) {
    return handleApiError(error, request);
  }
}