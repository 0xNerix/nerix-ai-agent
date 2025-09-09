import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import { getCurrentNetwork } from '@/lib/web3/network-config';

// Get the current chain based on environment
const getChain = () => {
  const network = getCurrentNetwork();
  return network === 'bsc' ? bsc : bscTestnet;
};

// Public client for reading from the blockchain
export const getPublicClient = () => {
  return createPublicClient({
    chain: getChain(),
    transport: http()
  });
};

// Wallet client for writing to the blockchain
export const getWalletClient = async () => {
  if (!window.ethereum) return null;

  return createWalletClient({
    chain: getChain(),
    transport: custom(window.ethereum)
  });
};