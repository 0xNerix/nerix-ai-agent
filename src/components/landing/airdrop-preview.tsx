"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AirdropStats } from "@/components/airdrop/airdrop-stats";
import { Gift, ArrowRight, Rocket, Wallet} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AIRDROP_CONFIG } from "@/data/airdrop";

interface AirdropPreviewProps {
  initialData?: {
    stats: {
      totalParticipants: number;
      totalTokensDistributed: number;
      airdropEndDate: string;
      prelaunchEndDate: string;
      isPrelaunch: boolean;
    };
  };
}

export function AirdropPreview({ initialData }: AirdropPreviewProps) {
  const [isPrelaunch, setIsPrelaunch] = useState(true);
  
  // Use fallback data if initialData is not provided
  const stats = initialData?.stats || {
    totalParticipants: 8742,
    totalTokensDistributed: 125000,
    airdropEndDate: AIRDROP_CONFIG.airdropEndDate,
    prelaunchEndDate: AIRDROP_CONFIG.prelaunchEndDate,
    isPrelaunch: true
  };

  // Check if airdrop is active based on current time
  useEffect(() => {
    const checkAirdropStatus = () => {
      const now = new Date();
      const prelaunchEnd = new Date(stats.prelaunchEndDate);
      
      if (now < prelaunchEnd) {
        setIsPrelaunch(true);
      } else {
        setIsPrelaunch(false);
      }
    };

    checkAirdropStatus();
    
    // Check every minute
    const interval = setInterval(checkAirdropStatus, 60000);
    
    return () => clearInterval(interval);
  }, [stats.prelaunchEndDate]);
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-secondary/10 via-accent/15 to-accent/20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-orange-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent w-full"
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 blur-2xl opacity-30" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 animate-gradient-x">
                Nerix Airdrop
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join the exclusive airdrop program and earn rewards by participating in our ecosystem. 
            Complete challenges, invite friends, and unlock valuable tokens.
          </motion.p>
        </div>

        {/* Launching Soon Section for Prelaunch */}
        {isPrelaunch && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <Card className="relative overflow-hidden backdrop-blur-sm bg-background/20 border-orange-500/30 p-4">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.3),transparent_70%)]" />
              </div>
              
              <div className="relative">
                {/* Title */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                    🚀 Launching Soon!
                  </h3>
                  <p className="text-muted-foreground">
                    Get ready for the Nerix Airdrop! Pre-register to secure your spot.
                  </p>
                </div>

                {/* Stats Boxes */}
                <div className="mb-8">
                  <AirdropStats
                    totalParticipants={stats.totalParticipants}
                    totalTokensDistributed={stats.totalTokensDistributed}
                    airdropEndDate={stats.airdropEndDate}
                    prelaunchEndDate={stats.prelaunchEndDate}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Pre-register Horizontal Section */}
        {isPrelaunch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <Card className="relative overflow-hidden backdrop-blur-sm bg-background/20 border-orange-500/20 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left side - Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 flex-shrink-0">
                    <Rocket className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-400 mb-1">
                      Pre-Register for Early Access
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Connect your wallet to secure your spot and get notified when we launch
                    </p>
                  </div>
                </div>

                {/* Right side - Action */}
                <div className="flex-shrink-0">
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
                            style: {
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
                                  className="relative px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden group bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg transition-all duration-300"
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
                                  className="relative px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <span>Wrong Network</span>
                                </motion.button>
                              );
                            }

                            return (
                              <div className="flex items-center gap-3">
                                {/* Network Indicator */}
                                <motion.button
                                  onClick={openChainModal}
                                  className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {chain.hasIcon && (
                                    <div
                                      style={{
                                        background: chain.iconBackground,
                                        width: 16,
                                        height: 16,
                                        borderRadius: 999,
                                        overflow: 'hidden',
                                      }}
                                    >
                                      {chain.iconUrl && (
                                        <Image
                                          alt={chain.name ?? 'Chain icon'}
                                          src={chain.iconUrl}
                                          width={16}
                                          height={16}
                                        />
                                      )}
                                    </div>
                                  )}
                                  <span className="font-medium text-sm text-blue-400">{chain.name}</span>
                                </motion.button>
                                
                                {/* Registration Status */}
                                <motion.button
                                  onClick={openAccountModal}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Wallet className="w-4 h-4 text-green-400" />
                                  <span className="font-medium text-sm text-green-400">Registered!</span>
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
            </Card>
          </motion.div>
        )}

        {/* CTA Button - Always Show */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button size="lg" asChild className="group relative overflow-hidden px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500">
            <Link href="/airdrop">
              <span className="relative z-10 flex items-center">
                <Gift className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {isPrelaunch ? 'View Airdrop Details' : 'Join Airdrop Program'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}