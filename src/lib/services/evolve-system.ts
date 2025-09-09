import { eq, and, desc } from 'drizzle-orm';
import { toHex } from 'viem';
import { PromptEvolutionService } from './prompt-evolution';
import { ChallengerRankingService } from './challenger-ranking';
import { db } from '@/database';
import { iterations, participants, games, gameGameplayConfig, userNfts } from '@/database/schema';
import { NerixGameServerService } from '../web3/game-server-service';
import { logger } from '@/lib/utils/logger';

export interface EvolveSystemData {
  gameId: string;
  gameContractAddress: string;
  nftContractAddress: string;
  winnerAddress: string;
  winnerMessage: string;
  winnerResponse: string;
  currentPrompt: string;
  currentIteration: number;
  prizeWon: number;
  feePaid: number;
  totalParticipants: number;
  totalMessages: number;
}

/**
 *  EvolveSystemService - Winner processing and system evolution for per-game contracts
 */
// Processing steps for tracking
const PROCESSING_STEPS = {
  STARTED: 'started',
  PROMPT_EVOLUTION: 'prompt_evolution',
  CHALLENGER_RANKING: 'challenger_ranking',
  ITERATION_RECORD: 'iteration_record_created',
  SMART_CONTRACT: 'smart_contract_call',
  NFT_TRACKING: 'nft_tracking_records',
  PARTICIPANT_UPDATE: 'participant_update',
  GAME_STATE_UPDATE: 'game_state_update',
  COMPLETED: 'completed'
} as const;

export class EvolveSystemService {
  private promptEvolution: PromptEvolutionService;
  private challengerRanking: ChallengerRankingService;

  constructor() {
    this.promptEvolution = new PromptEvolutionService();
    this.challengerRanking = new ChallengerRankingService();
  }

  /**
   * Update processing step in iteration record
   */
  private async updateProcessingStep(
    iterationId: string, 
    step: string, 
    error?: string
  ): Promise<void> {
    await db.update(iterations)
      .set({
        processingStep: step,
        processingError: error || null,
        isProcessingComplete: step === PROCESSING_STEPS.COMPLETED
      })
      .where(eq(iterations.id, iterationId));
      
    if (error) {
      logger.error('Processing failed at step', { step, iterationId, error });
    } else {
      logger.info('Processing step completed', { step, iterationId });
    }
  }

  /**
   * Process winner and evolve system - main entry point
   * This runs in background without blocking the API response
   */
  async processWinnerAndEvolve(data: EvolveSystemData): Promise<void> {
    let iterationRecord: any = null;
    
    try {
      logger.info('Starting winner processing and system evolution', { gameId: data.gameId, winnerAddress: data.winnerAddress });

      // First create iteration record to track processing
      iterationRecord = await this.createIterationRecord({
        gameId: data.gameId,
        iteration: data.currentIteration,
        winnerAddress: data.winnerAddress,
        winnerMessage: data.winnerMessage,
        winnerResponse: data.winnerResponse,
        currentPrompt: data.currentPrompt,
        evolvedPrompt: data.currentPrompt, // Will be updated later
        prizeWon: data.prizeWon,
        totalParticipants: data.totalParticipants,
        totalAttempts: data.totalMessages,
      });

      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.STARTED);

      // 1. Evolve system prompt for next iteration
      const evolvedPrompt = await this.promptEvolution.evolveSystemPrompt(
        data.currentPrompt,
        data.winnerMessage,
        data.winnerResponse,
        data.gameId
      );
      
      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.PROMPT_EVOLUTION);

      // 2. Get top challengers and community participants for current iteration
      const topChallengers = await this.challengerRanking.getTopChallengers(data.gameId, data.currentIteration);
      const communityParticipants = await this.challengerRanking.getCommunityParticipants(data.gameId, data.currentIteration);
      
      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.CHALLENGER_RANKING);

      // 3. Update iteration record with evolved prompt
      await db.update(iterations)
        .set({ evolvedPrompt: evolvedPrompt })
        .where(eq(iterations.id, iterationRecord.id));
        
      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.ITERATION_RECORD);

      // 4. Call smart contract declareWinner (with per-game contract)
      const gameServerService = new NerixGameServerService(data.gameContractAddress);
      
      const declareWinnerTxHash = await this.callDeclareWinner(
        gameServerService,
        data.winnerAddress,
        topChallengers,
        communityParticipants,
        evolvedPrompt
      );
      
      // Update iteration record with transaction hash
      await db.update(iterations)
        .set({ declareWinnerTxHash })
        .where(eq(iterations.id, iterationRecord.id));

      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.SMART_CONTRACT);

      // 5. Create NFT tracking records
      await this.createNftTrackingRecords(
        iterationRecord.id,
        data.winnerAddress,
        topChallengers,
        communityParticipants,
        data.currentIteration
      );
      
      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.NFT_TRACKING);

      // 6. Update participant as winner
      await db.update(participants)
        .set({ 
          isWinner: true,
          challengerRank: null // Winner doesn't need challenger rank
        })
        .where(and(
          eq(participants.gameId, data.gameId),
          eq(participants.userAddress, data.winnerAddress),
          eq(participants.iteration, data.currentIteration)
        ));

      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.PARTICIPANT_UPDATE);

      // 7. Update game for next iteration or completion
      await this.updateGameForNextState(data.gameId, evolvedPrompt, data.currentIteration);

      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.GAME_STATE_UPDATE);

      // Mark as completed
      await this.updateProcessingStep(iterationRecord.id, PROCESSING_STEPS.COMPLETED);

      logger.info('Winner processing and system evolution completed', { gameId: data.gameId });
    } catch (error) {
      logger.error('Error processing winner and evolving system', { gameId: data.gameId, error });
      
      // Update iteration record with error details (if we have it)
      if (iterationRecord) {
        try {
          await this.updateProcessingStep(
            iterationRecord.id, 
            'failed', 
            error instanceof Error ? error.message : String(error)
          );
        } catch (updateError) {
          logger.error('Failed to update error in iteration record', updateError);
        }
      }
      
      // Do NOT reset game status - keep it in 'processing_winner' to indicate failed state
      // This allows us to identify and manually fix failed iterations
      
      throw error;
    }
  }

  private async createIterationRecord(data: {
    gameId: string;
    iteration: number;
    winnerAddress: string;
    winnerMessage: string;
    winnerResponse: string;
    currentPrompt: string;
    evolvedPrompt: string;
    prizeWon: number;
    totalParticipants: number;
    totalAttempts: number;
  }) {
    const [record] = await db.insert(iterations).values({
      gameId: data.gameId,
      iteration: data.iteration,
      winnerAddress: data.winnerAddress,
      winnerMessage: data.winnerMessage,
      winnerResponse: data.winnerResponse,
      prizeWon: data.prizeWon.toString(),
      totalParticipants: data.totalParticipants,
      totalAttempts: data.totalAttempts,
      systemPrompt: data.currentPrompt,
      evolvedPrompt: data.evolvedPrompt,
      declareWinnerTxHash: null, // Will be updated after smart contract call
      processingStep: 'initializing',
      processingError: null,
      isProcessingComplete: false,
      startedAt: new Date(), // Approximate start time
      completedAt: new Date()
    }).returning();

    return record;
  }

  private async callDeclareWinner(
    gameServerService: NerixGameServerService,
    winnerAddress: string,
    topChallengers: string[],
    communityParticipants: string[],
    nextPrompt: string
  ): Promise<string> {
    try {
      logger.info('Calling smart contract declareWinner', {
        contract: gameServerService.getContractAddress(),
        winnerAddress,
        topChallengers,
        communityCount: communityParticipants.length
      });

      // Ensure we have exactly 3 top challengers
      const paddedTopChallengers: [string, string, string] = [
        topChallengers[0] || '0x0000000000000000000000000000000000000000',
        topChallengers[1] || '0x0000000000000000000000000000000000000000',
        topChallengers[2] || '0x0000000000000000000000000000000000000000'
      ];

      // Convert nextPrompt string to hex bytes
      const nextPromptHex = nextPrompt ? toHex(nextPrompt) : '0x';

      return await gameServerService.declareWinner(
        winnerAddress as any,
        paddedTopChallengers as any,
        communityParticipants as any[],
        nextPromptHex as `0x${string}`,
        gameServerService.getAdminAddress()
      );
    } catch (error) {
      logger.error('Smart contract declareWinner failed:', error);
      throw error;
    }
  }

  private async createNftTrackingRecords(
    iterationId: string,
    winnerAddress: string,
    topChallengers: string[],
    communityParticipants: string[],
    currentIteration: number
  ): Promise<void> {
    const nftRecords = [];

    // Winner NFT (placeholder tokenId - will be updated from smart contract events)
    nftRecords.push({
      tokenId: BigInt(Date.now() + Math.random() * 1000), // Temporary ID
      ownerAddress: winnerAddress,
      nftType: 'winner' as const,
      iteration: currentIteration,
      mintTime: new Date(),
      isActive: true
    });

    // Top challenger NFTs (up to 3)
    topChallengers.forEach((challenger, index) => {
      if (challenger !== '0x0000000000000000000000000000000000000000') {
        nftRecords.push({
          tokenId: BigInt(Date.now() + Math.random() * 1000 + index + 1), // Temporary ID
          ownerAddress: challenger,
          nftType: 'challenger' as const,
          iteration: currentIteration,
          mintTime: new Date(),
          isActive: true
        });
      }
    });

    // Community NFTs
    communityParticipants.forEach((participant, index) => {
      nftRecords.push({
        tokenId: BigInt(Date.now() + Math.random() * 1000 + index + 100), // Temporary ID
        ownerAddress: participant,
        nftType: 'community' as const,
        iteration: currentIteration,
        mintTime: new Date(),
        isActive: true
      });
    });

    if (nftRecords.length > 0) {
      await db.insert(userNfts).values(nftRecords);
      logger.info('Created NFT tracking records', { recordCount: nftRecords.length, currentIteration });
    }
  }

  private async updateGameForNextState(gameId: string, evolvedPrompt: string, currentIteration: number): Promise<void> {
    // Get current game info
    const game = await db.query.games.findFirst({
      where: eq(games.id, gameId),
      with: {
        gameplayConfig: true
      }
    });

    if (!game) {
      throw new Error(`Game ${gameId} not found`);
    }

    // Check if game has iterations (iterationCooldownMinutes is set)
    if (game.iterationCooldownMinutes !== null) {
      // Game with iterations - prepare for next iteration
      const nextIteration = currentIteration + 1;
      
      await db.update(games)
        .set({
          currentIteration: nextIteration,
          status: 'waiting_next_iteration' as any,
          totalMessages: 0, // Reset for next iteration
          totalParticipants: 0, // Reset for next iteration
          lastMessageAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(games.id, gameId));

      // Update gameplay config with evolved prompt
      await db.update(gameGameplayConfig)
        .set({
          systemPrompt: evolvedPrompt
        })
        .where(eq(gameGameplayConfig.gameId, gameId));

      logger.info('Game prepared for next iteration', { gameId, nextIteration });
    } else {
      // Single iteration game - mark as completed
      await db.update(games)
        .set({
          status: 'completed' as any,
          updatedAt: new Date()
        })
        .where(eq(games.id, gameId));

      logger.info('Single iteration game marked as completed', { gameId });
    }
  }

  /**
   * Get recent iteration stats for a game
   */
  async getRecentIterationStats(gameId: string, limit: number = 5) {
    return await db.select()
      .from(iterations)
      .where(eq(iterations.gameId, gameId))
      .orderBy(desc(iterations.iteration))
      .limit(limit);
  }

  /**
   * Get evolution history for a game's prompts
   */
  async getPromptEvolutionHistory(gameId: string) {
    const iterationHistory = await db.select({
      iteration: iterations.iteration,
      systemPrompt: iterations.systemPrompt,
      evolvedPrompt: iterations.evolvedPrompt,
      completedAt: iterations.completedAt
    })
      .from(iterations)
      .where(eq(iterations.gameId, gameId))
      .orderBy(desc(iterations.iteration));

    return iterationHistory;
  }
}