"use client";

import { motion } from "framer-motion";
import { Brain, Coins, MessageCircle, Sparkles } from "lucide-react";
import { UINFT } from "@/lib/hooks/use-user-nfts";

interface ActiveNFTsProps {
  nfts: UINFT[];
  currentIteration: number;
}

export function ActiveNFTs({ nfts, currentIteration }: ActiveNFTsProps) {
  // Use hook data directly instead of manual calculation
  const bonusBreakdown = nfts.reduce((acc, nft) => {
    nft.bonuses.forEach(bonus => {
      if (!acc.total[bonus.type]) {
        acc.total[bonus.type] = 0;
        acc.base[bonus.type] = 0;
        acc.legacy[bonus.type] = 0;
      }
      
      acc.total[bonus.type] += bonus.totalValue;
      acc.base[bonus.type] += bonus.baseValue;
      acc.legacy[bonus.type] += bonus.legacyValue;
    });
    
    return acc;
  }, { 
    total: {} as Record<string, number>, 
    base: {} as Record<string, number>,
    legacy: {} as Record<string, number>
  });

  if (Object.keys(bonusBreakdown.total).length === 0) {
    return null;
  }

  return (
    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Active NFT Effects</h3>
      </div>
      <div className="space-y-4">
        {/* Base Bonuses */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">Base NFT Effects</div>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(bonusBreakdown.base).map(([type, value], index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-3 rounded-lg overflow-hidden backdrop-blur-sm border border-primary/5"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
              {type === 'message_limit' && (
                <>
                  {/* Neural Network Animation */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/50 rounded-full"
                        animate={{
                          x: ["0%", "100%"],
                          y: ["0%", "100%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: 9999,
                          repeatType: "reverse",
                          ease: "linear"
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Glowing Orb */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: 9999,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}

              {type === 'fee_reduction' && (
                <>
                  {/* Neural Network Animation */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/50 rounded-full"
                        animate={{
                          x: ["0%", "100%"],
                          y: ["0%", "100%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: 9999,
                          repeatType: "reverse",
                          ease: "linear"
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Glowing Orb */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: 9999,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}

              {type === 'context_message_limit' && (
                <>
                  {/* Neural Network Animation */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/50 rounded-full"
                        animate={{
                          x: ["0%", "100%"],
                          y: ["0%", "100%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: 9999,
                          repeatType: "reverse",
                          ease: "linear"
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Glowing Orb */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: 9999,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                {type === 'message_limit' ? (
                  <MessageCircle className="w-4 h-4 text-primary" />
                ) : type === 'fee_reduction' ? (
                  <Coins className="w-4 h-4 text-primary" />
                ) : (
                  <Brain className="w-4 h-4 text-primary" />
                )}
                <motion.span 
                  className="text-xs font-medium"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: 9999,
                    ease: "easeInOut"
                  }}
                >
                  {type === 'message_limit' ? 'Message Limit' :
                   type === 'fee_reduction' ? 'Fee Reduction' :
                   'Context Messages'}
                </motion.span>
              </div>
              <motion.span 
                className="text-lg font-bold"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: 9999,
                  ease: "easeInOut",
                  delay: 0.1
                }}
              >
                {type === 'fee_reduction' ? `${value}%` : `+${value}`}
              </motion.span>
            </div>
          </motion.div>
            ))}
          </div>
        </div>

        {/* Legacy Power Bonuses */}
        {Object.values(bonusBreakdown.legacy).some(value => value > 0) && (
          <div>
            <div className="text-xs font-medium text-amber-600 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Legacy Power Bonuses
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(bonusBreakdown.legacy).filter(([, value]) => value > 0).map(([type, value], index) => (
                <motion.div
                  key={`legacy-${type}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-3 rounded-lg overflow-hidden backdrop-blur-sm border border-amber-500/20 bg-amber-500/5"
                >
                  {/* Legacy Power Animation */}
                  <div className="absolute inset-0 -z-10">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-amber-500/10"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: 9999,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                    {/* Sparkle effect */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full"
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: 9999,
                          repeatType: "loop",
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1.5">
                      {type === 'message_limit' ? (
                        <MessageCircle className="w-4 h-4 text-amber-600" />
                      ) : type === 'fee_reduction' ? (
                        <Coins className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Brain className="w-4 h-4 text-amber-600" />
                      )}
                      <motion.span 
                        className="text-xs font-medium text-amber-700"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: 9999,
                          ease: "easeInOut"
                        }}
                      >
                        Legacy {type === 'message_limit' ? 'Chars' :
                         type === 'fee_reduction' ? 'Discount' :
                         'Context'}
                      </motion.span>
                    </div>
                    <motion.span 
                      className="text-lg font-bold text-amber-600"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: 9999,
                        ease: "easeInOut",
                        delay: 0.1
                      }}
                    >
                      {type === 'fee_reduction' ? `+${value}%` : `+${value}`}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}