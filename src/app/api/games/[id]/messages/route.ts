import { eq, and, asc } from "drizzle-orm";
import { EvolveSystemService } from '@/lib/services/evolve-system';
import { z } from 'zod';
import { isAddress, Hash } from 'viem';
import DOMPurify from 'isomorphic-dompurify';
import { db } from "@/database";
import { gameEconomyConfig, gameGameplayConfig, games, gameTools, messages, participants } from "@/database/schema";
import { MessageWithContext } from "@/database/type";
import { TransactionVerificationService } from "@/lib/web3/transaction-verification";
import { AIClient } from "@/lib/ai";
import { NerixNFTService } from "@/lib/web3/nft-service";
import { requireAuth, getCurrentUser } from "@/lib/auth/server-auth";
import { checkBetaAccess } from "@/lib/config/auth";
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';
import { logger } from '@/lib/utils/logger';

const messageRequestSchema = z.object({
  content: z.string().min(1).max(4000).transform(val => DOMPurify.sanitize(val)),
  transactionHash: z.string().optional(),
  nftId: z.number().optional()
});

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { searchParams } = new URL(request.url);
  const iteration = searchParams.get('iteration');
  
  try {
    const game = await db.select().from(games).where(eq(games.id, params.id)).limit(1);
    if (game.length === 0) {
      throw new ApiError(ErrorCode.GAME_NOT_FOUND, undefined, 404, { gameId: params.id });
    }

    // Beta game access check - require authentication and beta access
    if (game[0].isBeta) {
      await requireAuth();
      const { userAddress } = await getCurrentUser();
      const walletAddress = userAddress!;
      
      const userHasBetaAccess = await checkBetaAccess(walletAddress);
      if (!userHasBetaAccess) {
        throw new ApiError(ErrorCode.BETA_ACCESS_REQUIRED, undefined, 403, { gameId: params.id });
      }
    }

    // Build query conditions
    const conditions = [eq(messages.gameId, params.id)];
    if (iteration) {
      conditions.push(eq(messages.iteration, parseInt(iteration)));
    } else {
      // Default to current iteration
      conditions.push(eq(messages.iteration, game[0].currentIteration));
    }

    // Get messages with participant info
    const gameMessages = await db
      .select({
        message: messages,
        participant: participants
      })
      .from(messages)
      .leftJoin(participants, eq(messages.participantId, participants.id))
      .where(and(...conditions))
      .orderBy(asc(messages.createdAt));

    // Format response
    const formattedMessages: MessageWithContext[] = gameMessages.map(({ message, participant }) => ({
      id: message.id,
      gameId: message.gameId,
      participantId: message.participantId,
      parentMessageId: message.parentMessageId,
      role: message.role,
      content: message.content,
      functionCall: message.functionCall,
      tokensUsed: message.tokensUsed,
      transactionHash: message.transactionHash,
      messageFee: message.messageFee,
      messageFeeWei: message.messageFeeWei,
      nftUsedId: message.nftUsedId,
      isWinningMessage: message.isWinningMessage,
      iteration: message.iteration,
      createdAt: message.createdAt,
      participant: participant || undefined
    }));

    return createSuccessResponse(formattedMessages, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}

// Background winner processing and system evolution - runs asynchronously
function processWinnerInBackground(game: any, walletAddress: string, content: string, aiResponse: any, systemPrompt: string, economyConfig?: any) {
  (async () => {
    try {
      const evolveSystemService = new EvolveSystemService();
      
      await evolveSystemService.processWinnerAndEvolve({
        gameId: game.id,
        gameContractAddress: game.contractAddress,
        nftContractAddress: game.nftContractAddress,
        winnerAddress: walletAddress,
        winnerMessage: content,
        winnerResponse: aiResponse.content,
        currentPrompt: systemPrompt,
        currentIteration: game.currentIteration,
        prizeWon: parseFloat(game.currentPrizePool),
        feePaid: parseFloat(economyConfig?.baseFee || '0'),
        totalParticipants: game.totalParticipants,
        totalMessages: game.totalMessages,
      });

      logger.info('Background winner processing completed', { gameId: game.id });
    } catch (error) {
      logger.error('Background winner processing failed', { gameId: game.id, error });
    }
  })();
}

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  try {
    // Authenticate with server-auth
    await requireAuth();
    const { userAddress } = await getCurrentUser();
    const walletAddress = userAddress!;
    
    // Validate wallet address format
    if (!isAddress(walletAddress)) {
      throw new ApiError(ErrorCode.INVALID_WALLET_ADDRESS, undefined, 400, { address: walletAddress });
    }

    const body = await request.json();
    const { content, transactionHash, nftId } = messageRequestSchema.parse(body);

    // Use database transaction for atomic game state checking and message creation
    const result = await db.transaction(async (tx) => {
      // Get game with configs with row lock to prevent concurrent modifications
      const gameResult = await tx
        .select()
        .from(games)
        .leftJoin(gameGameplayConfig, eq(games.id, gameGameplayConfig.gameId))
        .leftJoin(gameEconomyConfig, eq(games.id, gameEconomyConfig.gameId))
        .where(eq(games.id, params.id))
        .limit(1)
        .for('update'); // Add FOR UPDATE lock

      if (gameResult.length === 0) {
        throw new ApiError(ErrorCode.GAME_NOT_FOUND, undefined, 404, { gameId: params.id });
      }

      const { games: game, game_gameplay_config: gameplayConfig, game_economy_config: economyConfig } = gameResult[0];

      // Check beta access for beta games
      if (game.isBeta) {
        const userHasBetaAccess = await checkBetaAccess(walletAddress);
        if (!userHasBetaAccess) {
          throw new ApiError(ErrorCode.BETA_ACCESS_REQUIRED, undefined, 403, { gameId: params.id });
        }
      }

      // Check game state
      if (game.status === 'processing_winner') {
        throw new ApiError(ErrorCode.GAME_PROCESSING_WINNER, undefined, 423, { gameId: params.id, status: game.status });
      }

      if (game.status === 'completed') {
        throw new ApiError(ErrorCode.GAME_COMPLETED, undefined, 400, { gameId: params.id, status: game.status });
      }

      // Check iteration cooldown for games that have it
      if (game.status === 'waiting_next_iteration' && game.iterationCooldownMinutes) {
        const lastMessageTime = game.lastMessageAt;
        if (lastMessageTime) {
          const cooldownEndTime = new Date(lastMessageTime.getTime() + (game.iterationCooldownMinutes * 60 * 1000));
          const now = new Date();
          
          if (now < cooldownEndTime) {
            const timeRemaining = Math.ceil((cooldownEndTime.getTime() - now.getTime()) / 1000 / 60);
            throw new ApiError(
              ErrorCode.ITERATION_COOLDOWN_ACTIVE,
              `Next iteration starts in ${timeRemaining} minutes`,
              423,
              {
                gameId: params.id,
                nextIterationStartsAt: cooldownEndTime.toISOString(),
                minutesRemaining: timeRemaining
              }
            );
          } else {
            // Cooldown ended, activate game
            await tx.update(games)
              .set({
                status: 'active',
                updatedAt: new Date()
              })
              .where(eq(games.id, params.id));
          }
        }
      }

      return { game, gameplayConfig, economyConfig };
    });

    const { game, gameplayConfig, economyConfig } = result;

    // TODO: Add NextAuth.js session verification

    // Initialize variables for transaction data
    let verifiedMessageFee: string | null = null;
    let verificationEvent: any = null;

    // For paid games (isFree: false), transaction hash is mandatory
    if (!game.isFree) {
      if (!transactionHash) {
        throw new ApiError(
          ErrorCode.TRANSACTION_VERIFICATION_FAILED,
          'Transaction hash is required for paid games',
          400,
          { gameId: params.id, isFree: game.isFree }
        );
      }

      if (!game.contractAddress) {
        throw new ApiError(
          ErrorCode.GAME_NOT_FOUND,
          'Game contract address not configured',
          500,
          { gameId: params.id }
        );
      }

      const verificationService = new TransactionVerificationService(game.contractAddress);
      const verification = await verificationService.verifyMessageTransaction(
        transactionHash as Hash,
        walletAddress as `0x${string}`
      );

      if (!verification.isValid) {
        throw new ApiError(
          ErrorCode.TRANSACTION_VERIFICATION_FAILED,
          undefined,
          400,
          { transactionHash, details: verification.error }
        );
      }

      verificationEvent = verification.event;
      
      // Store the actual fee paid from the transaction
      if (verification.event && verification.event.discountedFee) {
        // Store both decimal (for UI compatibility) and wei (for precision)
        const feeInWei = verification.event.discountedFee;
        const feeInEth = Number(feeInWei) / 1e18;
        verifiedMessageFee = feeInEth.toFixed(8); // For decimal field
        verificationEvent.feeWei = feeInWei; // Store wei value for later use
      }
    }

    // Get or create participant
    let participant = await db
      .select()
      .from(participants)
      .where(and(
        eq(participants.gameId, params.id),
        eq(participants.userAddress, walletAddress),
        eq(participants.iteration, game.currentIteration)
      ))
      .limit(1);

    if (participant.length === 0) {
      // Create new participant
      const [newParticipant] = await db.insert(participants).values({
        gameId: params.id,
        userAddress: walletAddress,
        iteration: game.currentIteration,
        attemptCount: 0,
        isWinner: false,
        isTopChallenger: false,
        joinedAt: new Date()
      }).returning();
      
      participant = [newParticipant];
    }

    const currentParticipant = participant[0];

    // Create user message
    const [userMessage] = await db.insert(messages).values({
      gameId: params.id,
      participantId: currentParticipant.id,
      role: "user",
      content,
      iteration: game.currentIteration,
      transactionHash: transactionHash || null,
      messageFee: verifiedMessageFee,
      messageFeeWei: verificationEvent?.feeWei || null,
      nftUsedId: nftId || null,
      isWinningMessage: false,
      createdAt: new Date()
    }).returning();

    // Update participant attempt count
    await db.update(participants)
      .set({ 
        attemptCount: currentParticipant.attemptCount + 1 
      })
      .where(eq(participants.id, currentParticipant.id));

    // Calculate context limit based on game config and NFT bonuses
    let contextLimit = gameplayConfig?.baseContextSize || 10; // Base context limit from game config
    
    // Add NFT context bonus if user has NFT
    if (nftId && game.nftContractAddress) {
      try {
        const nftService = new NerixNFTService(game.nftContractAddress);
        const nftBonuses = await nftService.calculateNFTBonuses(
          BigInt(nftId), 
          BigInt(game.currentIteration)
        );
        contextLimit += nftBonuses.contextBonus;
      } catch (error) {
        logger.error('Error calculating NFT context bonus:', error);
        // Use default context limit on error
      }
    }
    
    // Get context messages with NFT-based limit
    const contextMessages = await db
      .select()
      .from(messages)
      .where(and(
        eq(messages.gameId, params.id),
        eq(messages.iteration, game.currentIteration)
      ))
      .orderBy(asc(messages.createdAt))
      .limit(contextLimit * 2); // Get more to ensure we have enough after filtering

    // Generate AI response
    const aiClient = new AIClient();
    
    // Get system prompt and prepare context
    const systemPrompt = gameplayConfig?.systemPrompt || `You are playing ${game.name}. Engage with the user's message and determine if they have achieved the win condition.`;
    
    // Format context messages for AI with proper conversation flow
    const conversationHistory = contextMessages
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
      .slice(-contextLimit); // Apply NFT-based context limit
    
    // Get game tools if available
    const availableGameTools = await db
      .select()
      .from(gameTools)
      .where(eq(gameTools.gameId, params.id));
    
    // Generate AI response with function calling for winner detection
    // Note: This is a simplified version - integrate with your existing AI system
    const aiResponse = await aiClient.generateResponse(
      // Convert game info for AI client
      {
        id: game.id,
        systemPrompt,
        gameplay: {
          decisionMechanism: {
            systemPrompt,
            tools: availableGameTools.map(tool => ({
              function: {
                name: tool.functionName,
                description: tool.description,
                parameters: tool.parameters
              }
            }))
          }
        }
      } as any,
      // Convert conversation history
      [...conversationHistory, { role: 'user', content }] as any,
      gameplayConfig?.aiModel as 'openai' | 'claude' || 'openai' // Use provider from game config
    );

    // Check if AI detected a winner using game-specific tools
    const gameToolNames = availableGameTools.map(tool => tool.functionName);
    const isWinningMessage = aiResponse.functionCalls && aiResponse.functionCalls.some((call: any) => 
      gameToolNames.includes(call.name)
    );

    // Create AI response message
    const [assistantMessage] = await db.insert(messages).values({
      gameId: params.id,
      participantId: null, // AI messages don't have participant
      parentMessageId: userMessage.id,
      role: "assistant",
      content: aiResponse.content,
      functionCall: aiResponse.functionCalls,
      tokensUsed: aiResponse.tokensUsed || null,
      iteration: game.currentIteration,
      isWinningMessage: isWinningMessage || false,
      createdAt: new Date()
    }).returning();

    // If winner detected, update the user message as winning message and trigger winner processing
    if (isWinningMessage) {
      await db.update(messages)
        .set({ isWinningMessage: true })
        .where(eq(messages.id, userMessage.id));

      // Update game status to processing winner
      await db.update(games)
        .set({ 
          status: 'processing_winner',
          updatedAt: new Date()
        })
        .where(eq(games.id, params.id));

      // Process winner in background
      processWinnerInBackground(game, walletAddress, content, aiResponse, systemPrompt, economyConfig);
    }

    // Update game stats (only if not processing winner)
    if (!isWinningMessage) {
      await db.update(games)
        .set({
          totalMessages: game.totalMessages + 2, // User + AI message
          lastMessageAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(games.id, params.id));
    }

    
    return createSuccessResponse({
      userMessage,
      assistantMessage,
      isWinningMessage,
      gameStatus: isWinningMessage ? 'processing_winner' : game.status
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}