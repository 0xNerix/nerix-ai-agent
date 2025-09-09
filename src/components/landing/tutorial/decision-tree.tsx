"use client";

import { Check, X, Trophy, Coins, Brain } from "lucide-react";
import { GAME_DATA } from "./tutorial-data";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface DecisionTreeProps {
  onDecisionMade?: (decision: 'approve' | 'reject') => void;
}

export function DecisionTree({ onDecisionMade }: DecisionTreeProps) {
  const [selectedPath, setSelectedPath] = useState<'approve' | 'reject' | null>(null);
  const [prizePool, setPrizePool] = useState(GAME_DATA.prizePool);

  useEffect(() => {
    const timer = setTimeout(() => {
      const decision = 'reject';
      setSelectedPath(decision);

      if (decision === 'reject') {
        setPrizePool(prev => prev + GAME_DATA.baseFee * 0.7);
      }
      
      setTimeout(() => {
        if (onDecisionMade) {
          onDecisionMade(decision);
        }
      }, 2500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onDecisionMade]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center overflow-hidden">
      <div className="max-w-3xl w-full p-4 relative">
        <div className="relative flex flex-col items-center">
          {/* Top Section - Nerix Core */}
          <div className="mb-4 relative z-10">
            <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-background/90 to-background/70 border border-primary/20 p-2 backdrop-blur-xl mx-auto mb-2">
              <Image
                src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                alt="Nerix"
                fill
                className="object-contain"
              />
            </div>

            <div className="text-center">
              <h3 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary mb-1">
                Neural Analysis
              </h3>
              <p className="text-[11px] text-muted-foreground">Processing chess move request...</p>
            </div>
          </div>

          {/* Decision Paths */}
          <div className="w-full max-w-2xl">
            {/* Neural Connections */}
            <div className="relative h-12 mb-4">
              <div 
                className="absolute left-1/2 bottom-0 w-[300px] h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Reject Path */}
              <motion.div 
                className={`relative p-4 rounded-lg bg-gradient-to-br from-background/95 to-background/80 border backdrop-blur-sm transition-all duration-500 ${
                  selectedPath === 'reject'
                    ? 'border-destructive/50 scale-105 shadow-lg shadow-destructive/20'
                    : selectedPath === 'approve'
                    ? 'border-destructive/20 opacity-50 scale-95'
                    : 'border-destructive/20'
                }`}
              >
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-destructive/10 to-transparent transition-opacity duration-500 ${
                  selectedPath === 'reject' ? 'opacity-100' : 'opacity-50'
                }`} />

                <div className="relative space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <X className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-destructive">Reject Move</h4>
                      <p className="text-xs text-muted-foreground">Maintain game integrity</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Current Pool</span>
                        <div className="flex items-center gap-1 text-destructive">
                          <Coins className="w-3 h-3" />
                          <motion.span
                            className="text-xs font-semibold"
                            animate={selectedPath === 'reject' ? {
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            {prizePool.toFixed(3)} BNB
                            {selectedPath === 'reject' && (
                              <span className="text-[10px] text-destructive/80 ml-1">
                                (+Free)
                              </span>
                            )}
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Accept Path */}
              <motion.div 
                className={`relative p-4 rounded-lg bg-gradient-to-br from-background/95 to-background/80 border backdrop-blur-sm transition-all duration-500 ${
                  selectedPath === 'approve'
                    ? 'border-emerald-500/50 scale-105 shadow-lg shadow-emerald-500/20'
                    : selectedPath === 'reject'
                    ? 'border-emerald-500/20 opacity-50 scale-95'
                    : 'border-emerald-500/20'
                }`}
              >
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/10 to-transparent transition-opacity duration-500 ${
                  selectedPath === 'approve' ? 'opacity-100' : 'opacity-50'
                }`} />

                <div className="relative space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-emerald-500">Accept Move</h4>
                      <p className="text-xs text-muted-foreground">Grant victory reward</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Reward</span>
                        <div className="flex items-center gap-1 text-emerald-500">
                          <Trophy className="w-3 h-3" />
                          <motion.span
                            className="text-xs font-semibold"
                            animate={selectedPath === 'approve' ? {
                              scale: [1, 1.2, 1],
                              color: ['hsl(142, 76%, 36%)', 'hsl(142, 76%, 50%)', 'hsl(142, 76%, 36%)']
                            } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            +{prizePool.toFixed(3)} BNB
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Selection Result */}
            {selectedPath && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                <div className="p-3 rounded-lg bg-background/50 border border-muted/20 max-w-sm mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Decision Complete</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedPath === 'reject' 
                      ? 'Move rejected - game continues under AI authority'
                      : 'Move accepted - player victory confirmed'
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}