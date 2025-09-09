import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from "next-auth/react";
import { formatEther } from 'viem';
import { useContractServices } from './use-contract-services';
import { GameWithCurrentState } from '@/database/type';
import { useCurrency } from './use-currency';
import { useUserActivity } from './use-user-activity';
import { useUserNFTs, type UINFT } from './use-user-nfts';
import { api, queryKeys } from '../api/client';
import { logger } from '@/lib/utils/logger';

export interface UseGameOptions {
  pollingInterval?: number;
  enabled?: boolean;
  autoRefresh?: boolean;
  initialGameData?: GameWithCurrentState;
}

export interface UseGameReturn {
  // Game data
  game: GameWithCurrentState | null;
  loading: boolean;
  error: string | null;
  
  // Contract enriched data
  currentIteration: number;
  currentPrizePool: string;
  currentMessageFee: string;
  totalFee: string;
  initialFee: string;
  userMessageFee: string;
  uniqueParticipants: number;
  totalAttempts: number;
  
  // Game status
  canSendMessage: boolean;
  gameStatus: string;
  statusMessage: string;
  gameActive: boolean;
  minutesRemaining: number;
  
  // User-specific data (if wallet connected)
  maxMessageLength: number;
  contextSize: number;
  userFee: number;
  hasNFTDiscount: boolean;
  discountPercentage: number;
  isParticipant: boolean;
  attemptCount: number;
  userHasBetaAccess: boolean;
  
  // NFT data
  userNFTs: UINFT[];
  bestNFT: UINFT | null;
  totalNFTs: number;
  
  // Raw contract state
  contractState: {
    currentIteration: bigint | null;
    currentRewardPool: bigint | null;
    gameActive: boolean | null;
    totalMessages: bigint | null;
    participantCount: bigint | null;
    currentMessageFee: bigint | null;
    messageFee: bigint | null;
    maxMessageLength: bigint | null;
    contextSize: bigint | null;
    isParticipant: boolean | null;
    attemptCount: bigint | null;
  };
  
  // Actions
  refresh: () => void;
  refreshContract: () => Promise<void>;
}

export type GameEnrichedData = Omit<UseGameReturn, 'game' | 'loading' | 'error' | 'refresh' | 'refreshContract'>;

export function useGame(
  gameId: string,
  options: UseGameOptions = {}
): UseGameReturn {
  const {
    pollingInterval = 10000,
    enabled = true,
    autoRefresh = false,
    initialGameData
  } = options;

  const { formatValue } = useCurrency();
  const { data: session } = useSession();
  const { isActive, isPageVisible } = useUserActivity();
  
  // Determine if we should refetch based on user activity
  const shouldRefetch = isActive && isPageVisible && enabled && autoRefresh;

  // Fetch game data using React Query
  const {
    data: game = null,
    isLoading: loading,
    error: queryError,
    refetch
  } = useQuery({
    queryKey: queryKeys.games.detail(gameId),
    queryFn: () => api.games.getById(gameId),
    enabled: enabled && !!gameId,
    refetchInterval: shouldRefetch ? pollingInterval : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: shouldRefetch,
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: initialGameData,
  });

  // Initialize contract services
  const { gameService, nftService } = useContractServices(
    game?.contractAddress,
    game?.nftContractAddress
  );

  // Use dedicated NFT hook
  const { 
    nfts: userNFTs, 
    bestNFT, 
    totalNFTs 
  } = useUserNFTs(
    game?.nftContractAddress as `0x${string}` | undefined, 
    session?.address as `0x${string}` | undefined, 
    { 
      enabled: enabled && !!session?.address,
      autoRefresh 
    }
  );

  // Fetch contract data using React Query
  const {
    data: contractData = null,
    refetch: refetchContract
  } = useQuery({
    queryKey: ['contract-state', gameId, session?.address],
    queryFn: async () => {
      if (!gameService || !game) return null;

      try {
        const gameState = await gameService.getGameState();
        
        let userGameInfo = null;
        if (session?.address) {
          try {
            const contractBestNFT = await nftService?.getBestNFTForBonuses(session.address as `0x${string}`);
            const nftId = contractBestNFT ? contractBestNFT.tokenId : BigInt(0);
            userGameInfo = await gameService.getUserGameInfo(session.address as `0x${string}`, nftId);
          } catch (userErr) {
            logger.warn('Error fetching user data:', userErr);
          }
        }

        return { gameState, userGameInfo };
      } catch (err) {
        logger.error('Error fetching contract data:', err);
        return null;
      }
    },
    enabled: !!gameService && !!game && enabled,
    refetchInterval: shouldRefetch ? pollingInterval : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: shouldRefetch,
    staleTime: 30 * 1000, // 30 seconds for contract data
  });

  // Extract contract state
  const contractState = useMemo(() => ({
    currentIteration: contractData?.gameState?.currentIteration || null,
    currentRewardPool: contractData?.gameState?.currentRewardPool || null,
    gameActive: contractData?.gameState?.gameActive || null,
    totalMessages: contractData?.gameState?.totalMessages || null,
    participantCount: contractData?.gameState?.participantCount || null,
    currentMessageFee: contractData?.gameState?.currentMessageFee || null,
    messageFee: contractData?.userGameInfo?.messageFee || null,
    maxMessageLength: contractData?.userGameInfo?.maxMessageLength || null,
    contextSize: contractData?.userGameInfo?.contextSize || null,
    isParticipant: contractData?.userGameInfo?.isParticipant || null,
    attemptCount: contractData?.userGameInfo?.attemptCount || null,
  }), [contractData]);

  // Calculated values
  const calculatedData = useMemo(() => {
    if (!game) {
      return {
        currentIteration: 0,
        currentPrizePool: formatValue(0),
        currentMessageFee: formatValue(0),
        totalFee: formatValue(0),
        initialFee: formatValue(0),
        userMessageFee: formatValue(0),
        uniqueParticipants: 0,
        totalAttempts: 0,
        canSendMessage: false,
        gameStatus: 'inactive',
        statusMessage: 'Game not found',
        gameActive: false,
        minutesRemaining: 0,
        maxMessageLength: 500,
        contextSize: 4,
        userFee: 0,
        hasNFTDiscount: false,
        discountPercentage: 0,
        isParticipant: false,
        attemptCount: 0,
        userHasBetaAccess: false,
        bestNFT: null,
      };
    }

    // Use contract state if available, fallback to enriched game data
    const currentIteration = contractState.currentIteration 
      ? Number(contractState.currentIteration)
      : game.currentIteration;

    const currentRewardPool = contractState.currentRewardPool 
      ? formatValue(parseFloat(formatEther(contractState.currentRewardPool)))
      : formatValue(parseFloat(game.currentPrizePool || '0'));

    const uniqueParticipants = contractState.participantCount 
      ? Number(contractState.participantCount)
      : game.totalParticipants;

    const totalAttempts = contractState.totalMessages 
      ? Number(contractState.totalMessages)
      : game.totalMessages;

    const gameActive = contractState.gameActive !== null 
      ? contractState.gameActive
      : game.status === 'active';

    // Game status logic
    let canSendMessage = gameActive;
    let statusMessage = '';
    let minutesRemaining = 0;

    if (game.status === 'processing_winner') {
      canSendMessage = false;
      statusMessage = 'Game is processing winner, please wait...';
    } else if (game.status === 'waiting_next_iteration' && game.iterationCooldownMinutes) {
      const now = new Date();
      const cooldownEnd = game.lastMessageAt 
        ? new Date(game.lastMessageAt.getTime() + (game.iterationCooldownMinutes * 60 * 1000))
        : now;
      
      if (now < cooldownEnd) {
        canSendMessage = false;
        minutesRemaining = Math.ceil((cooldownEnd.getTime() - now.getTime()) / 1000 / 60);
        statusMessage = `Next iteration starts in ${minutesRemaining} minutes`;
      }
    } else if (!gameActive) {
      canSendMessage = false;
      statusMessage = 'Game is currently inactive';
    }

    // Get fee calculations from contract data
    const economyConfig = game.economyConfig;
    const baseFee = economyConfig?.baseFee 
      ? parseFloat(economyConfig.baseFee)
      : 0.01;

    const contractCurrentMessageFee = contractState.currentMessageFee;
    const contractUserFee = contractState.messageFee;
    const contractMaxLength = contractState.maxMessageLength;
    const contractContextSize = contractState.contextSize;
    
    // Calculate discount percentage if we have contract data
    let discountPercentage = 0;
    let userFee = baseFee;
    
    if (contractUserFee && contractCurrentMessageFee && session?.address) {
      const userFeeInEth = parseFloat(formatEther(contractUserFee));
      const currentFeeInEth = parseFloat(formatEther(contractCurrentMessageFee));
      
      if (userFeeInEth < currentFeeInEth) {
        discountPercentage = Math.round(((currentFeeInEth - userFeeInEth) / currentFeeInEth) * 100);
        userFee = userFeeInEth;
      }
    }

    // Format values for UI
    const currentMessageFee = contractCurrentMessageFee 
      ? formatValue(parseFloat(formatEther(contractCurrentMessageFee))) 
      : formatValue(baseFee);
      
    const userMessageFee = contractUserFee 
      ? formatValue(parseFloat(formatEther(contractUserFee))) 
      : currentMessageFee;
      
    const maxMessageLength = contractMaxLength ? Number(contractMaxLength) : (game.gameplayConfig?.baseCharacterLimit || 500);
    const contextSize = contractContextSize ? Number(contractContextSize) : (game.gameplayConfig?.baseContextSize || 4);

    return {
      currentIteration,
      currentPrizePool: currentRewardPool,
      currentMessageFee,
      totalFee: currentMessageFee,
      initialFee: formatValue(baseFee),
      userMessageFee,
      uniqueParticipants,
      totalAttempts,
      canSendMessage,
      gameStatus: game.status,
      statusMessage,
      gameActive,
      minutesRemaining,
      maxMessageLength,
      contextSize,
      userFee,
      hasNFTDiscount: discountPercentage > 0,
      discountPercentage,
      isParticipant: contractState.isParticipant || false,
      attemptCount: contractState.attemptCount ? Number(contractState.attemptCount) : 0
    };
  }, [game, contractState, formatValue, session?.address]);

  // Error handling
  const error = queryError ? 
    (queryError instanceof Error ? queryError.message : 'Failed to fetch game data') 
    : null;

  return {
    game,
    loading,
    error,
    ...calculatedData,
    userNFTs,
    bestNFT,
    totalNFTs,
    contractState,
    userHasBetaAccess: game?.userHasBetaAccess || false,
    refresh: () => refetch(),
    refreshContract: async () => { await refetchContract(); },
  };
}