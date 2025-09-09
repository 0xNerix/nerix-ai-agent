import { AIRDROP_LEVELS, AIRDROP_CONFIG } from "@/data/airdrop";
import { eq } from "drizzle-orm";
import { z } from 'zod';
import { db } from "@/database";
import { airdropRegistrations } from "@/database/schema";
import { requireAuth, getCurrentUser } from "@/lib/auth/server-auth";
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';

export async function GET(request: Request) {
  try {
    // Check if we're in prelaunch phase
    const now = new Date();
    const prelaunchEnd = new Date(AIRDROP_CONFIG.prelaunchEndDate);
    const isPrelaunch = now < prelaunchEnd;
    
    // Get registration count from database
    const registrations = await db.select().from(airdropRegistrations);
    
    // Calculate total tokens and message credits distributed
    const totalDistributed = registrations.reduce((totals, reg) => {
      // Only count distributions if airdrop has started
      if (!isPrelaunch) {
        // Calculate rewards based on current level
        for (let i = 0; i < reg.currentLevel; i++) {
          const level = AIRDROP_LEVELS[i];
          if (level) {
            level.rewards.forEach(reward => {
              if (reward.type === 'token') {
                totals.tokens += reward.amount;
              } else if (reward.type === 'message_credit') {
                totals.messageCredits += reward.amount;
              }
            });
          }
        }
      }
      return totals;
    }, { tokens: 0, messageCredits: 0 });

    return createSuccessResponse({
      levels: AIRDROP_LEVELS,
      stats: {
        totalParticipants: registrations.length,
        totalTokensDistributed: totalDistributed.tokens,
        totalMessageCreditsDistributed: totalDistributed.messageCredits,
        airdropEndDate: AIRDROP_CONFIG.airdropEndDate,
        prelaunchEndDate: AIRDROP_CONFIG.prelaunchEndDate,
        isPrelaunch
      }
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}

const airdropRequestSchema = z.object({
  level: z.number().min(1).max(4),
  verificationData: z.string().optional()
});

export async function POST(request: Request) {
  
  
  try {
    // Check if airdrop registration is open
    const now = new Date();
    const prelaunchEnd = new Date(AIRDROP_CONFIG.prelaunchEndDate);
    const airdropEnd = new Date(AIRDROP_CONFIG.airdropEndDate);
    
    if (now < prelaunchEnd) {
      throw new ApiError(
        ErrorCode.AIRDROP_NOT_STARTED,
        undefined,
        400,
        { prelaunchEndDate: AIRDROP_CONFIG.prelaunchEndDate }
      );
    }
    
    if (now > airdropEnd) {
      throw new ApiError(
        ErrorCode.AIRDROP_ENDED,
        undefined,
        400,
        { airdropEndDate: AIRDROP_CONFIG.airdropEndDate }
      );
    }

    // Authenticate with server-auth
    await requireAuth();
    const { userAddress } = await getCurrentUser();

    const walletAddress = userAddress!;
    const body = await request.json();
    const { level, verificationData } = airdropRequestSchema.parse(body);

    // Get or create registration
    const existingRegistration = await db
      .select()
      .from(airdropRegistrations)
      .where(eq(airdropRegistrations.walletAddress, walletAddress))
      .limit(1);

    let registration = existingRegistration[0];

    if (!registration && level === 1) {
      // Create new registration for level 1 (wallet connect) - auto completed
      const newRegistration = await db.insert(airdropRegistrations)
        .values({
          walletAddress,
          currentLevel: 1,
        })
        .returning();
      registration = newRegistration[0];
    } else if (!registration) {
      throw new ApiError(ErrorCode.INVALID_INPUT, 'Must start with level 1 (wallet connect)', 400);
    }

    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
    
    if (registration.lastSubmissionAt && registration.lastSubmissionAt > oneHourAgo && (registration.submissionCount || 0) >= 5) {
      throw new ApiError(
        ErrorCode.RATE_LIMIT_EXCEEDED, 
        'Too many submissions. Please wait before trying again.',
        429
      );
    }

    // Validate sequential progression and prerequisites
    if (level === 2) {
      // Twitter verification - requires level 1 completed
      if (registration.currentLevel < 1) {
        throw new ApiError(ErrorCode.INVALID_INPUT, 'Must complete level 1 first', 400);
      }
      
      const isNewHour = !registration.lastSubmissionAt || registration.lastSubmissionAt < oneHourAgo;
      const newSubmissionCount = isNewHour ? 1 : (registration.submissionCount || 0) + 1;

      const updatedRegistration = await db
        .update(airdropRegistrations)
        .set({
          twitterVerificationData: verificationData,
          step2Status: 'waiting',
          lastSubmissionAt: currentTime,
          submissionCount: newSubmissionCount,
          updatedAt: new Date(),
        })
        .where(eq(airdropRegistrations.walletAddress, walletAddress))
        .returning();
      registration = updatedRegistration[0];
      
    } else if (level === 3) {
      // Discord verification - requires level 2 completed
      if (registration.currentLevel < 2 || registration.step2Status !== 'completed') {
        throw new ApiError(ErrorCode.INVALID_INPUT, 'Must complete level 2 verification first', 400);
      }
      
      const isNewHour = !registration.lastSubmissionAt || registration.lastSubmissionAt < oneHourAgo;
      const newSubmissionCount = isNewHour ? 1 : (registration.submissionCount || 0) + 1;

      const updatedRegistration = await db
        .update(airdropRegistrations)
        .set({
          discordVerificationData: verificationData,
          step3Status: 'waiting',
          lastSubmissionAt: currentTime,
          submissionCount: newSubmissionCount,
          updatedAt: new Date(),
        })
        .where(eq(airdropRegistrations.walletAddress, walletAddress))
        .returning();
      registration = updatedRegistration[0];
      
    } else if (level === 4) {
      // Telegram verification - requires level 3 completed
      if (registration.currentLevel < 3 || registration.step3Status !== 'completed') {
        throw new ApiError(ErrorCode.INVALID_INPUT, 'Must complete level 3 verification first', 400);
      }
      
      const isNewHour = !registration.lastSubmissionAt || registration.lastSubmissionAt < oneHourAgo;
      const newSubmissionCount = isNewHour ? 1 : (registration.submissionCount || 0) + 1;

      const updatedRegistration = await db
        .update(airdropRegistrations)
        .set({
          telegramVerificationData: verificationData,
          step4Status: 'waiting',
          lastSubmissionAt: currentTime,
          submissionCount: newSubmissionCount,
          updatedAt: new Date(),
        })
        .where(eq(airdropRegistrations.walletAddress, walletAddress))
        .returning();
      registration = updatedRegistration[0];
      
    } else if (level === 1 && registration.currentLevel >= 1) {
      // Level 1 already completed, no need to update
      // registration stays as is
    } else {
      throw new ApiError(ErrorCode.INVALID_INPUT, `Invalid level progression: ${level}`, 400);
    }

    // Get level rewards from static data
    const airdropLevel = AIRDROP_LEVELS.find(l => l.id === level);
    if (!airdropLevel) {
      throw new ApiError(ErrorCode.INVALID_INPUT, `Invalid airdrop level: ${level}`, 400, { level });
    }

    // Generate completed levels array based on current level
    const completedLevels = Array.from(
      { length: registration.currentLevel }, 
      (_, i) => i + 1
    );

    
    return createSuccessResponse({
      message: "Level completed successfully",
      rewards: airdropLevel.rewards,
      completedLevels,
      airdropEndDate: AIRDROP_CONFIG.airdropEndDate,
      prelaunchEndDate: AIRDROP_CONFIG.prelaunchEndDate
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}