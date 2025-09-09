import { eq } from "drizzle-orm";
import { db } from "@/database";
import { gameEconomyConfig, gameGameplayConfig, games, gameTools } from "@/database/schema";
import { GameWithConfig } from "@/database/type";
import { enrichGameWithContractData } from "@/lib/web3/contract-data-reader";
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';
import { getCurrentUser } from "@/lib/auth/server-auth";
import { checkBetaAccess } from "@/lib/config/auth";

export async function GET(request: Request) {
  try {
    // Check beta access for filtering
    const { userAddress } = await getCurrentUser();
    const userHasBetaAccess = userAddress ? await checkBetaAccess(userAddress) : false;

    // Get all games with their configurations
    const gamesWithConfigs = await db
      .select()
      .from(games)
      .leftJoin(gameEconomyConfig, eq(games.id, gameEconomyConfig.gameId))
      .leftJoin(gameGameplayConfig, eq(games.id, gameGameplayConfig.gameId));

    // Get tools for all games
    const allTools = await db.select().from(gameTools);
    const toolsByGame = allTools.reduce((acc, tool) => {
      if (!acc[tool.gameId]) acc[tool.gameId] = [];
      acc[tool.gameId].push(tool);
      return acc;
    }, {} as Record<string, typeof allTools>);

    // Format response with current state calculations
    const formattedGames = await Promise.all(
      gamesWithConfigs.map(async ({ games: game, game_economy_config: economyConfig, game_gameplay_config: gameplayConfig }) => {
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
          isBeta: game.isBeta,
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
          tools: toolsByGame[game.id] || []
        };
        
        // Add current state calculations using ContractDataReader
        return await enrichGameWithContractData(gameWithConfig);
      })
    );
    
    // Convert BigInt values to strings for JSON serialization
    const serializedGames = formattedGames.map(game => ({
        ...game,
        currentPrizePoolWei: game.currentPrizePoolWei ? game.currentPrizePoolWei.toString() : null,
        economyConfig: game.economyConfig ? {
          ...game.economyConfig,
          initialPrizePoolWei: game.economyConfig.initialPrizePoolWei ? game.economyConfig.initialPrizePoolWei.toString() : null,
          baseFeeWei: game.economyConfig.baseFeeWei ? game.economyConfig.baseFeeWei.toString() : null,
          growthRate: game.economyConfig.growthRate,
          feeCapWei: game.economyConfig.feeCapWei ? game.economyConfig.feeCapWei.toString() : null,
        } : null
      }));

    // Filter beta games based on user access
    const filteredGames = serializedGames.filter(game => {
      if (game.isBeta && !userHasBetaAccess) {
        return false; // Hide beta game from users without access
      }
      return true;
    });
      
    return createSuccessResponse({
      games: filteredGames,
      userHasBetaAccess
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}