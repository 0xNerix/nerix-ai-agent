import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from "next-auth/react";
import { Address } from 'viem';
import { useContractServices } from './use-contract-services';
import { useUserActivity } from './use-user-activity';
import type { NFTDetails } from '@/lib/web3/nft-service';
import { queryKeys } from '../api/client';
import { logger } from '@/lib/utils/logger';

// Convert contract NFT to UI NFT format
export interface UINFT {
  id: string;
  name: string;
  type: 'community' | 'challenger' | 'winner';
  iteration: number;
  image: string;
  description: string;
  bonuses: NFTBonus[];
  tier: 'common' | 'rare' | 'legendary';
  tokenId: bigint;
  owner: Address;
  tokenURI: string;
  nftType: number;
  mintTime: bigint;
}

export interface NFTBonus {
  type: 'message_limit' | 'fee_reduction' | 'context_message_limit';
  baseValue: number;
  legacyValue: number;
  totalValue: number;
  description: string;
}

interface NFTsByType {
  community: UINFT[];
  challenger: UINFT[];
  winner: UINFT[];
}

export interface UseUserNFTsOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  enabled?: boolean;
}

export interface UseUserNFTsReturn {
  // NFT data
  nfts: UINFT[];
  loading: boolean;
  error: string | null;
  
  // Organized NFTs
  nftsByType: NFTsByType;
  bestNFT: UINFT | null;
  totalNFTs: number;
  
  // Bonus calculations
  calculateBonuses: (tokenId: bigint, currentIteration: number) => Promise<{
    characterBonus: number;
    feeDiscount: number;
    contextBonus: number;
  } | null>;
  
  // Actions
  refetch: () => void;
  calculateLegacyBonus: (iteration: number) => number;
}

export function useUserNFTs(
  nftContractAddress: Address | undefined,
  userAddress?: Address,
  options: UseUserNFTsOptions = {}
): UseUserNFTsReturn {
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
    enabled = true
  } = options;

  const { data: session } = useSession();
  const { isActive, isPageVisible } = useUserActivity();
  const targetAddress = userAddress || (session?.address as Address);

  // Get memoized NFT service
  const { nftService } = useContractServices(
    null, // We don't need game service here
    nftContractAddress
  );

  // Determine if we should refetch based on user activity
  const shouldRefetch = isActive && isPageVisible && autoRefresh && enabled;

  // Calculate legacy bonus
  const calculateLegacyBonus = useCallback((iteration: number): number => {
    let bonus = 0;
    
    // Iteration 1-5: +10% per iteration
    if (iteration <= 5) {
      bonus += iteration * 10;
    } else {
      bonus += 5 * 10; // 50% for first 5 iterations
    }
    
    // Iteration 6-10: +5% per iteration
    if (iteration > 5 && iteration <= 10) {
      bonus += (iteration - 5) * 5;
    } else if (iteration > 10) {
      bonus += 5 * 5; // 25% for iterations 6-10
    }
    
    // Iteration 11-20: +2.5% per iteration
    if (iteration > 10 && iteration <= 20) {
      bonus += (iteration - 10) * 2.5;
    } else if (iteration > 20) {
      bonus += 10 * 2.5; // 25% for iterations 11-20
    }
    
    // Iteration 21-100: +1% per iteration
    if (iteration > 20 && iteration <= 100) {
      bonus += (iteration - 20) * 1;
    } else if (iteration > 100) {
      bonus += 80 * 1; // 80% for iterations 21-100
    }
    
    // Iteration 101+: +0.5% per iteration
    if (iteration > 100) {
      bonus += (iteration - 100) * 0.5;
    }
    
    return bonus;
  }, []);

  // Convert contract NFT to UI format
  const convertContractNFTToUIFormat = useCallback((contractNFT: NFTDetails): UINFT => {
    const getTypeName = (nftType: number): 'community' | 'challenger' | 'winner' => {
      switch (nftType) {
        case 0: return 'community';
        case 1: return 'challenger';
        case 2: return 'winner';
        default: return 'community';
      }
    };

    const getTier = (nftType: number): 'common' | 'rare' | 'legendary' => {
      switch (nftType) {
        case 0: return 'common';
        case 1: return 'rare';
        case 2: return 'legendary';
        default: return 'common';
      }
    };

    const getBonuses = (nftType: number, iteration: number, currentIteration: number = 1): NFTBonus[] => {
      const baseValues: Record<number, Record<string, number>> = {
        0: { message_limit: 100, fee_reduction: 0, context_message_limit: 0 }, // Community
        1: { message_limit: 200, fee_reduction: 10, context_message_limit: 0 }, // Challenger
        2: { message_limit: 300, fee_reduction: 20, context_message_limit: 3 }, // Winner
      };

      const base = baseValues[nftType] || baseValues[0];
      
      // Calculate legacy bonus percentage only if NFT is from an older iteration
      const legacyBonusPercent = iteration < currentIteration ? calculateLegacyBonus(iteration) : 0;
      
      return Object.entries(base).map(([type, baseValue]) => {
        const legacyValue = Math.floor(baseValue * (legacyBonusPercent / 100));
        const totalValue = baseValue + legacyValue;
        
        return {
          type: type as 'message_limit' | 'fee_reduction' | 'context_message_limit',
          baseValue,
          legacyValue,
          totalValue,
          description: getDescriptionForBonusType(type),
        };
      });
    };

    const getDescriptionForBonusType = (type: string): string => {
      switch (type) {
        case 'message_limit':
          return 'Additional characters for your messages';
        case 'fee_reduction':
          return 'Percentage reduction in message fees';
        case 'context_message_limit':
          return 'Extra context messages for AI memory';
        default:
          return 'Bonus effect';
      }
    };

    const type = getTypeName(contractNFT.nftType);

    return {
      id: contractNFT.tokenId.toString(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} NFT #${contractNFT.tokenId}`,
      type,
      iteration: Number(contractNFT.iteration),
      image: `/nft-images/${type}-${contractNFT.iteration}.png`,
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} NFT from iteration ${contractNFT.iteration}`,
      bonuses: getBonuses(contractNFT.nftType, Number(contractNFT.iteration)),
      tier: getTier(contractNFT.nftType),
      tokenId: contractNFT.tokenId,
      owner: contractNFT.owner,
      tokenURI: contractNFT.tokenURI,
      nftType: contractNFT.nftType,
      mintTime: contractNFT.mintTime,
    };
  }, [calculateLegacyBonus]);

  // Fetch NFTs using React Query
  const {
    data: nfts = [],
    isLoading: loading,
    error: queryError,
    refetch
  } = useQuery({
    queryKey: queryKeys.nfts.list(nftContractAddress, targetAddress),
    queryFn: async (): Promise<UINFT[]> => {
      if (!targetAddress || !nftService) {
        return [];
      }

      try {
        const contractNFTs = await nftService.getUserNFTs(targetAddress);
        return contractNFTs.map(convertContractNFTToUIFormat);
      } catch (err) {
        logger.error('Error fetching user NFTs:', err);
        throw new Error('Failed to load NFTs');
      }
    },
    enabled: enabled && !!targetAddress && !!nftService,
    refetchInterval: shouldRefetch ? refreshInterval : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: shouldRefetch,
    staleTime: 60 * 1000, // 1 minute
  });

  // Calculate bonuses for specific NFT
  const calculateBonuses = useCallback(async (
    tokenId: bigint, 
    currentIteration: number
  ): Promise<{
    characterBonus: number;
    feeDiscount: number;
    contextBonus: number;
  } | null> => {
    if (!nftService) return null;

    try {
      return await nftService.calculateNFTBonuses(tokenId, BigInt(currentIteration));
    } catch (err) {
      logger.error('Error calculating NFT bonuses:', err);
      return null;
    }
  }, [nftService]);

  // Organized NFTs by type
  const nftsByType = useMemo((): NFTsByType => {
    const organized: NFTsByType = {
      community: [],
      challenger: [],
      winner: []
    };

    nfts.forEach(nft => {
      organized[nft.type].push(nft);
    });

    // Sort each type by iteration (descending)
    Object.keys(organized).forEach(key => {
      organized[key as keyof NFTsByType].sort((a, b) => b.iteration - a.iteration);
    });

    return organized;
  }, [nfts]);

  // Best NFT for bonuses
  const bestNFT = useMemo((): UINFT | null => {
    if (nfts.length === 0) return null;

    // Sort by priority: Winner > Challenger > Community, then by iteration (higher is better)
    const sortedNFTs = [...nfts].sort((a, b) => {
      const typePriority = { winner: 3, challenger: 2, community: 1 };
      
      // First sort by type priority
      if (a.type !== b.type) {
        return typePriority[b.type] - typePriority[a.type];
      }
      
      // Then by iteration (higher iteration = newer = better bonuses)
      return b.iteration - a.iteration;
    });

    return sortedNFTs[0];
  }, [nfts]);

  // Error handling
  const error = queryError ? 
    (queryError instanceof Error ? queryError.message : 'Failed to load NFTs') 
    : null;

  return {
    nfts,
    loading,
    error,
    nftsByType,
    bestNFT,
    totalNFTs: nfts.length,
    calculateBonuses,
    refetch: () => refetch(),
    calculateLegacyBonus,
  };
}