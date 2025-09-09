"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { AirdropStats } from "@/components/airdrop/airdrop-stats";
import { AirdropLevelComponent } from "@/components/airdrop/airdrop-level";
import { Gift, Sparkles, ArrowRight, Wallet, Check, Lock, Clock, Users, NetworkIcon } from "lucide-react";
import { AirdropLevel } from "@/types/airdrop";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { AIRDROP_LEVELS, AIRDROP_CONFIG } from "@/data/airdrop";
import { api, queryKeys } from "@/lib/api/client";
import { handleError } from "@/lib/utils/error-handler";
import { logger } from "@/lib/utils/logger";

interface AirdropSectionProps {
  initialData?: {
    levels: AirdropLevel[];
    stats: {
      totalParticipants: number;
      totalTokensDistributed: number;
      totalMessageCreditsDistributed?: number;
      airdropEndDate: string;
      prelaunchEndDate: string;
      isPrelaunch: boolean;
    };
  };
}

export function AirdropSection({ initialData }: AirdropSectionProps) {
  const { data: session } = useSession();

  // Use fallback data if initialData is not provided
  const levels = initialData?.levels || AIRDROP_LEVELS;
  const stats = initialData?.stats || {
    totalParticipants: 0,
    totalTokensDistributed: 0,
    totalMessageCreditsDistributed: 0,
    airdropEndDate: AIRDROP_CONFIG.airdropEndDate,
    prelaunchEndDate: AIRDROP_CONFIG.prelaunchEndDate,
    isPrelaunch: true
  };

  const [isPrelaunch, setIsPrelaunch] = useState(stats.isPrelaunch);
  const [airdropError, setAirdropError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Check if airdrop is active based on current time
  useEffect(() => {
    const checkAirdropStatus = () => {
      const now = new Date();
      const prelaunchEnd = new Date(stats.prelaunchEndDate);
      const airdropEnd = new Date(stats.airdropEndDate);
      
      if (now < prelaunchEnd) {
        setIsPrelaunch(true);
        setAirdropError(null);
      } else if (now > airdropEnd) {
        setIsPrelaunch(false);
        setAirdropError("Airdrop has ended");
      } else {
        setIsPrelaunch(false);
        setAirdropError(null);
      }
    };

    checkAirdropStatus();
    
    // Check every minute
    const interval = setInterval(checkAirdropStatus, 60000);
    
    return () => clearInterval(interval);
  }, [stats.prelaunchEndDate, stats.airdropEndDate]);

  // Fetch completed levels using React Query
  const { data: airdropData } = useQuery({
    queryKey: queryKeys.airdrop.check(session?.address),
    queryFn: () => api.airdrop.checkEligibility(session?.address!),
    enabled: !!(session?.address && !isPrelaunch),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const completedLevels = airdropData?.completedLevels || [];
  const currentLevel = completedLevels.length + 1;

  const completeLevelMutation = useMutation({
    mutationFn: async ({ level, verificationData }: { level: number; verificationData?: string }) => {
      return api.airdrop.completeLevel({
        level,
        walletAddress: session?.address!,
        verificationData,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch airdrop status
      queryClient.invalidateQueries({ queryKey: queryKeys.airdrop.check(session?.address) });
    },
    onError: (error: any) => {
      logger.error('Failed to complete level:', error);
      if (error.message?.includes('not started yet')) {
        setAirdropError('Airdrop registration has not started yet');
      }
    }
  });

  const handleCompleteLevel = async (level: number, verificationData?: string) => {
    if (!session?.address || isPrelaunch || airdropError) return;
    
    // Validate level progression
    const currentLevel = airdropData?.completedLevels?.length ?? 0;
    const targetLevel = level;
    
    // Can only complete the next level in sequence
    if (targetLevel !== currentLevel + 1) {
      handleError(
        new Error(`Invalid level progression: trying to complete level ${targetLevel} but currently at level ${currentLevel}`),
        'Level progression error',
        { toastDescription: 'You must complete levels in order' }
      );
      return;
    }
    
    // Validate level bounds (API schema: min 1, max 4)
    if (targetLevel < 1 || targetLevel > 4) {
      handleError(
        new Error(`Invalid level: ${targetLevel}. Level must be between 1 and 4`),
        'Invalid level',
        { toastDescription: 'Invalid level selected' }
      );
      return;
    }
    
    completeLevelMutation.mutate({ level, verificationData });
  };

  const getMainCardContent = () => {
    if (airdropError) {
      return {
        title: "Airdrop Ended",
        description: "This airdrop campaign has concluded. Thank you for your interest!",
        icon: <Clock className="w-12 h-12 text-gray-500 relative" />
      };
    }
    
    if (isPrelaunch) {
      return {
        title: "Launching Soon",
        description: "Airdrop registration will begin when the countdown reaches zero. Connect your wallet to be ready!",
        icon: <Lock className="w-12 h-12 text-orange-500 relative animate-pulse" />
      };
    }
    
    if (session?.address) {
      return {
        title: `Total Rewards: ${
          completedLevels.reduce((total: number, level: number) => 
            total + (levels[level - 1]?.reward || 0), 0
          )} NRX`,
        description: "Complete tasks to earn NRX tokens",
        icon: <Gift className="w-12 h-12 text-primary relative animate-pulse" />
      };
    }
    
    return {
      title: "Get Started",
      description: "Connect your wallet to start earning NRX tokens",
      icon: <Gift className="w-12 h-12 text-primary relative animate-pulse" />
    };
  };

  const mainCardContent = getMainCardContent();

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-secondary/10 via-accent/15 to-accent/20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glowing Orbs */}
        <div className={`absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 animate-pulse ${
          isPrelaunch ? 'bg-orange-500/20' : 'bg-primary/20'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-pulse ${
          isPrelaunch ? 'bg-red-500/20' : 'bg-secondary/20'
        }`} style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-px bg-gradient-to-r from-transparent to-transparent w-full ${
                isPrelaunch ? 'via-orange-500/50' : 'via-primary/50'
              }`}
              style={{
                top: `${25 + i * 25}%`,
                opacity: 0.5,
                scale: 0.8,
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: 9999,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">

          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <div className={`absolute inset-0 blur-2xl opacity-30 ${
                isPrelaunch 
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-orange-500'
                  : airdropError
                    ? 'bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500'
                    : 'bg-gradient-to-r from-secondary via-accent to-secondary'
              }`} />
              <span className={`relative bg-clip-text text-transparent animate-gradient-x ${
                isPrelaunch 
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-orange-500'
                  : airdropError
                    ? 'bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500'
                    : 'bg-gradient-to-r from-secondary via-accent to-secondary'
              }`}>
                NRX Token Airdrop
              </span>
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isPrelaunch 
              ? "Get ready for the Nerix revolution! Airdrop registration will begin soon. Connect your wallet to be prepared."
              : airdropError
                ? "Thank you for your interest in the Nerix airdrop. Stay tuned for future opportunities!"
                : "Join the Nerix revolution and earn NRX tokens by completing simple tasks. Be part of our growing ecosystem and shape the future of AI gaming."
            }
          </motion.p>
        </div>
        
        <AirdropStats 
          totalParticipants={stats.totalParticipants}
          totalTokensDistributed={stats.totalTokensDistributed}
          airdropEndDate={stats.airdropEndDate}
          prelaunchEndDate={stats.prelaunchEndDate}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          
          {/* Left Column - Stats & Info */}
          <div className="space-y-6">
            <Card className={`p-6 backdrop-blur-sm bg-background/20 transition-all duration-500 ${
              isPrelaunch 
                ? 'border-orange-500/20'
                : airdropError
                  ? 'border-gray-500/20'
                  : 'border-primary/20'
            }`}>
              <h3 className="text-lg font-semibold mb-4">
                {isPrelaunch ? "Coming Soon" : airdropError ? "Event Ended" : "How It Works"}
              </h3>
              <div className="space-y-4">
                {isPrelaunch ? (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Pre-Launch Phase</p>
                        <p className="text-sm text-muted-foreground">
                          Airdrop registration will begin when countdown ends
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Wallet className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Get Ready</p>
                        <p className="text-sm text-muted-foreground">
                          Connect your wallet now to be prepared for launch
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Gift className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Early Access</p>
                        <p className="text-sm text-muted-foreground">
                          Be among the first to participate when we launch
                        </p>
                      </div>
                    </div>
                  </>
                ) : airdropError ? (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Event Concluded</p>
                        <p className="text-sm text-muted-foreground">
                          This airdrop campaign has successfully ended
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Community Growth</p>
                        <p className="text-sm text-muted-foreground">
                          Thank you to all participants who joined us
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Wallet className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Connect Wallet</p>
                        <p className="text-sm text-muted-foreground">
                          Start by connecting your Ethereum wallet
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Gift className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">Complete Tasks</p>
                        <p className="text-sm text-muted-foreground">
                          Follow simple steps to earn NRX tokens
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Claim Rewards</p>
                        <p className="text-sm text-muted-foreground">
                          Receive NRX tokens directly to your wallet
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Levels */}
          <div>
            <div className="space-y-4">
              <Card className={`relative p-6 overflow-hidden backdrop-blur-sm bg-background/20 group transition-all duration-500 ${
                isPrelaunch 
                  ? 'border-orange-500/20 hover:bg-background/30 hover:border-orange-500/30'
                  : airdropError
                    ? 'border-gray-500/20'
                    : 'border-primary/20 hover:bg-background/30 hover:border-primary/30'
              }`}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isPrelaunch 
                    ? 'bg-gradient-to-r from-orange-500/5 via-transparent to-red-500/5'
                    : airdropError
                      ? 'bg-gradient-to-r from-gray-500/5 via-transparent to-gray-500/5'
                      : 'bg-gradient-to-r from-primary/5 via-transparent to-secondary/5'
                }`} />
                
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className={`text-xl font-bold mb-2 bg-clip-text text-transparent ${
                      isPrelaunch 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                        : airdropError
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                          : 'bg-gradient-to-r from-primary to-secondary'
                    }`}>
                      {mainCardContent.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {mainCardContent.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                   <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      const ready = mounted && authenticationStatus !== 'loading';
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus || authenticationStatus === 'authenticated');

                      return (
                        <div
                          {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <motion.button
                                  onClick={openConnectModal}
                                  type="button"
                                  className={twMerge(
                                    "relative px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden group",
                                    "bg-gradient-to-r from-orange-500 to-red-500",
                                    "text-white hover:shadow-lg transition-all duration-300"
                                  )}
                                  disabled={!!airdropError}
                                  initial={{ scale: 1 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <div className="flex items-center gap-2">
                                    <Wallet className="w-4 h-4" />
                                    <span>Connect Wallet</span>
                                  </div>
                                </motion.button>
                              );
                            }

                            if (chain.unsupported) {
                              return (
                                <motion.button
                                  onClick={openChainModal}
                                  type="button"
                                  className="relative px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                  initial={{ scale: 1 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4" />
                                    <span>Wrong Network</span>
                                  </div>
                                </motion.button>
                              );
                            }

                            return (
                             <div className="flex flex-col md:flex-row items-center gap-3">
                              <motion.button
                                onClick={openChainModal}
                                type="button"
                                className="relative flex items-center gap-2 px-4 py-3 min-h-[52px] rounded-lg font-medium text-sm bg-orange-500/10 border border-orange-500 text-orange-500 hover:bg-orange-500/20 transition-all duration-300 overflow-hidden group w-full md:w-auto"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <NetworkIcon className="w-5 h-5" />
                                <span className="truncate">{chain.name}</span>
                              </motion.button>

                              <motion.button
                                onClick={openAccountModal}
                                type="button"
                                className="relative flex items-center gap-2 px-4 py-3 min-h-[52px] rounded-lg font-medium text-sm bg-orange-500/10 border border-orange-500 text-orange-500 hover:bg-orange-500/20 transition-all duration-300 overflow-hidden group w-full md:w-auto"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Wallet className="w-5 h-5" />
                                <div className="flex flex-col text-left">
                                  <span className="truncate">{account.displayName}</span>
                                  {account.displayBalance && (
                                    <span className="text-xs text-orange-400 truncate">{account.displayBalance}</span>
                                  )}
                                </div>
                              </motion.button>
                            </div>
                            );
                          })()}
                        </div>
                      );
                    }}
                   </ConnectButton.Custom>
                  </div>
                </div>

                {/* Status indicators */}
                {isPrelaunch && (
                  <div className="mt-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="flex items-center gap-2 text-orange-400">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Registration locked until launch
                      </span>
                    </div>
                  </div>
                )}

                {airdropError && (
                  <div className="mt-4 p-3 bg-gray-500/10 rounded-lg border border-gray-500/20">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {airdropError}
                      </span>
                    </div>
                  </div>
                )}
              </Card>

              {levels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <AirdropLevelComponent
                    level={level}
                    isCompleted={completedLevels.includes(level.id)}
                    isActive={level.id === currentLevel && !isPrelaunch && !airdropError}
                    isLocked={isPrelaunch || !!airdropError}
                    onComplete={(verificationData) => handleCompleteLevel(level.id, verificationData)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}