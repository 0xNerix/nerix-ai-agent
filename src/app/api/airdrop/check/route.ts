import { eq } from "drizzle-orm";
import { isAddress } from "viem";
import { airdropRegistrations } from "@/database/schema";
import { db } from "@/database";
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';
import { requireAuth, getCurrentUser } from "@/lib/auth/server-auth";

export async function GET(request: Request) {
  try {
    // Authenticate with server-auth
    await requireAuth();
    const { userAddress } = await getCurrentUser();
    
    // Use authenticated user's address (ignore query param for security)
    const address = userAddress!;

    if (!isAddress(address)) {
      throw new ApiError(ErrorCode.INVALID_WALLET_ADDRESS, 'Invalid session wallet address');
    }

    // Check registration in database
    const registrationResult = await db
      .select()
      .from(airdropRegistrations)
      .where(eq(airdropRegistrations.walletAddress, address))
      .limit(1);
    
    const registration = registrationResult[0] || null;

    // Generate completed levels array based on current level
    const completedLevels = registration 
      ? Array.from({ length: registration.currentLevel }, (_, i) => i + 1)
      : [];

    // Check verification statuses
    const verificationStatuses = registration ? {
      step2: registration.step2Status || 'none', // Twitter
      step3: registration.step3Status || 'none', // Discord  
      step4: registration.step4Status || 'none', // Telegram
    } : {
      step2: 'none',
      step3: 'none',
      step4: 'none',
    };

    return createSuccessResponse({
      isRegistered: !!registration,
      completedLevels,
      verificationStatuses,
      socialInfo: {
        twitter: registration?.twitterUsername,
        discord: registration?.discordUsername,
        telegram: registration?.telegramUsername,
      },
      verificationData: {
        twitter: registration?.twitterVerificationData,
        discord: registration?.discordVerificationData, 
        telegram: registration?.telegramVerificationData,
      }
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}