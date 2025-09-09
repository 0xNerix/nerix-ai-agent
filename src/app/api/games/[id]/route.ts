import { eq } from "drizzle-orm";
import { db } from "@/database";
import { gameEconomyConfig, gameGameplayConfig, games, gameTools } from "@/database/schema";
import { GameWithConfig } from "@/database/type";
import { enrichGameWithContractData } from "@/lib/web3/contract-data-reader";
import { getCurrentUser } from "@/lib/auth/server-auth";
import { checkBetaAccess } from "@/lib/config/auth";
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';


export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  try {
    // Get game with configurations
    const gameResult = await db
      .select()
      .from(games)
      .leftJoin(gameEconomyConfig, eq(games.id, gameEconomyConfig.gameId))
      .leftJoin(gameGameplayConfig, eq(games.id, gameGameplayConfig.gameId))
      .where(eq(games.id, params.id))
      .limit(1);

    if (gameResult.length === 0) {
      throw new ApiError(ErrorCode.GAME_NOT_FOUND, undefined, 404, { gameId: params.id });
    }

    const { games: game, game_economy_config: economyConfig, game_gameplay_config: gameplayConfig } = gameResult[0];

    // Check beta access for beta games
    const { userAddress } = await getCurrentUser();
    const userHasBetaAccess = userAddress ? await checkBetaAccess(userAddress) : false;
    
    if (game.isBeta && (!userAddress || !userHasBetaAccess)) {
      const emptyResponse = {
        id: game.id,
        name: game.name,
        isBeta: game.isBeta,
        userHasBetaAccess
      };
      return createSuccessResponse(emptyResponse, request);
    }

    // Get tools for this game
    const tools = await db
      .select()
      .from(gameTools)
      .where(eq(gameTools.gameId, params.id));

    // Format response with current state
    const gameWithConfig: GameWithConfig = {
      id: game.id,
      name: game.name,
      description: game.longDescription,
      shortDescription: game.shortDescription,
      coverImage: game.coverImage,
      category: game.category,
      isActive: game.isActive,
      isFree: game.isFree,
      isLocked: game.isLocked,
      currentIteration: game.currentIteration,
      status: game.status,
      currentPrizePool: game.currentPrizePool,
      currentPrizePoolWei: game.currentPrizePoolWei,
      totalMessages: game.totalMessages,
      totalParticipants: game.totalParticipants,
      lastMessageAt: game.lastMessageAt,
      iterationCooldownMinutes: game.iterationCooldownMinutes,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
      contractAddress: game.contractAddress,
      nftContractAddress: game.nftContractAddress,
      isBeta: game.isBeta,
      // Config data - provide defaults if not found
      economyConfig: economyConfig || {
        gameId: game.id,
        initialPrizePool: "0.01",
        initialPrizePoolWei: null,
        baseFee: "0.01",
        baseFeeWei: null,
        growthRate: 10,
        feeCap: null,
        feeCapWei: null,
        currentPoolShare: 90,
        nextPoolShare: 10,
        teamShare: 0,
      },
      gameplayConfig: gameplayConfig || {
        gameId: game.id,
        baseCharacterLimit: 500,
        baseContextSize: 4,
        cooldownSeconds: 300,
        tokenLimit: 2000,
        aiModel: "gpt-4",
        systemPrompt: "You are a helpful AI assistant.",
        globalTimerStart: null,
        resetCondition: null,
        endCondition: null,
      },
      tools: tools
    };

    // Add current state calculations using ContractDataReader
    const formattedGame = await enrichGameWithContractData(gameWithConfig);
    
    // Convert BigInt values to strings for JSON serialization
    const serializedGame = {
      ...formattedGame,
      currentPrizePoolWei: formattedGame.currentPrizePoolWei ? formattedGame.currentPrizePoolWei.toString() : null,
      economyConfig: formattedGame.economyConfig ? {
        ...formattedGame.economyConfig,
        initialPrizePoolWei: formattedGame.economyConfig.initialPrizePoolWei ? formattedGame.economyConfig.initialPrizePoolWei.toString() : null,
        baseFeeWei: formattedGame.economyConfig.baseFeeWei ? formattedGame.economyConfig.baseFeeWei.toString() : null,
        growthRate: formattedGame.economyConfig.growthRate,
        feeCapWei: formattedGame.economyConfig.feeCapWei ? formattedGame.economyConfig.feeCapWei.toString() : null,
      } : null
    };

    // Add beta access information to the response
    const gameWithBetaAccess = {
      ...serializedGame,
      userHasBetaAccess
    };

    return createSuccessResponse(gameWithBetaAccess, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}