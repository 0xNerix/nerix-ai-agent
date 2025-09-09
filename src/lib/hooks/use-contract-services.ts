import { useMemo } from 'react';
import { NerixGameService } from '@/lib/web3/game-service';
import { NerixNFTService } from '@/lib/web3/nft-service';
import { logger } from '@/lib/utils/logger';

export interface UseContractServicesReturn {
  gameService: NerixGameService | null;
  nftService: NerixNFTService | null;
  isValid: boolean;
}

/**
 * Memoized contract services hook
 * Creates and caches service instances per contract address
 * Only recreates when contract addresses change
 */
export function useContractServices(
  gameContractAddress?: string | null,
  nftContractAddress?: string | null,
  chainId?: number
): UseContractServicesReturn {
  
  const gameService = useMemo(() => {
    if (!gameContractAddress) return null;
    
    try {
      return new NerixGameService(gameContractAddress, chainId);
    } catch (error) {
      logger.error('Failed to create game service:', error);
      return null;
    }
  }, [gameContractAddress, chainId]);

  const nftService = useMemo(() => {
    if (!nftContractAddress) return null;
    
    try {
      return new NerixNFTService(nftContractAddress, chainId);
    } catch (error) {
      logger.error('Failed to create NFT service:', error);
      return null;
    }
  }, [nftContractAddress, chainId]);

  const isValid = useMemo(() => {
    return gameService !== null || nftService !== null;
  }, [gameService, nftService]);

  return {
    gameService,
    nftService,
    isValid
  };
}