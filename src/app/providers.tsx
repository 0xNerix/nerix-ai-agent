"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/config/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { CurrencyProvider } from "@/lib/hooks/use-currency";
import { getInitialChain, validateNetworkConfig } from "@/lib/web3/network-config";
import { Toaster } from "@/components/ui/toaster";
import { registerServiceWorker } from '@/lib/utils/notification-utils';
import { logger } from '@/lib/utils/logger';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: (failureCount, error) => {
          if (error && typeof error === 'object' && 'message' in error) {
            const errorMessage = error.message as string;
            if (errorMessage.includes('HTTP 4')) return false;
          }
          return failureCount < 2;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 2 * 60 * 1000,
        gcTime: 10 * 60 * 1000, 
      },
      mutations: {
        retry: (failureCount, error) => {
          if (error && typeof error === 'object' && 'message' in error) {
            const errorMessage = error.message as string;
            if (errorMessage.includes('HTTP 4')) return false;
          }
          return failureCount < 1;
        },
        retryDelay: 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

const getSiweMessageOptions = () => ({
  statement: 'Welcome to Nerix AI Platform',
});

interface ProvidersProps extends ThemeProviderProps {
  session?: any;
}

export function Providers({ children, session, ...props }: ProvidersProps) {
  const queryClient = getQueryClient();
  
  // Validate network configuration on app startup
  React.useEffect(() => {
    const networkValidation = validateNetworkConfig();
    if (!networkValidation.isValid) {
      networkValidation.warnings.forEach(warning => logger.warn(warning));
    } else {
      logger.info(`Network configured: ${networkValidation.currentNetwork} (Chain ID: ${networkValidation.chainId})`);
    }
  }, []);

  // Register Service Worker on app startup for push notifications
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      registerServiceWorker().catch(error => {
        logger.warn('Service Worker registration failed:', error)
      })
    }
  }, [])
  
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <SessionProvider 
        refetchInterval={0} 
        refetchOnWindowFocus={true} 
        refetchWhenOffline={false}
        session={session}
      >
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider 
              getSiweMessageOptions={getSiweMessageOptions}
            >
                <RainbowKitProvider
                  coolMode={true}
                  showRecentTransactions={true}
                  theme={{
                    lightMode: lightTheme(),
                    darkMode: darkTheme(),
                  }}
                  initialChain={getInitialChain()}
                >
                  <NextThemesProvider {...props}>
                    <CurrencyProvider>
                      {children}
                      <Toaster />
                    </CurrencyProvider>
                  </NextThemesProvider>
                </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}