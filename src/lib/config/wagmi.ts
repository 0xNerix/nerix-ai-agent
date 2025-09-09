import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { bsc, bscTestnet } from 'wagmi/chains';
import { createStorage, cookieStorage } from 'wagmi';
import { http } from 'viem';
import { logger } from '@/lib/utils/logger';
import { getChainId, getCurrentNetwork, getRpcUrl } from '@/lib/web3/network-config';

let wagmiConfig: ReturnType<typeof getDefaultConfig> | null = null;

function createWagmiConfig() {
  if (wagmiConfig) {
    return wagmiConfig;
  }

  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
  
  if (!projectId) {
    logger.warn('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined');
  }

  // Force current network - users cannot switch between mainnet/testnet
  const currentNetwork = getCurrentNetwork();
  const allowedChains = currentNetwork === 'bsc' ? [bsc] as const : [bscTestnet] as const;
  
  wagmiConfig = getDefaultConfig({
    appName: 'Nerix',
    projectId: projectId!,
    chains: allowedChains,
    transports: {
      [getChainId(currentNetwork)]: http(getRpcUrl(currentNetwork)),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    wallets: [
      {
        groupName: 'Recommended',
        wallets: [metaMaskWallet],
      },
    ],
  });

  return wagmiConfig;
}

export const config = createWagmiConfig();