"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Coins, Flame, Timer, Scale, ArrowRight, Trophy, MessageCircle } from "lucide-react";
import { GAME_DATA, STEP_DELAY } from "./tutorial-data";

interface GameDetailProps {
  isStarted: boolean;
  step: number;
}

export function GameDetail({ isStarted, step }: GameDetailProps) {
  return (
    <motion.div
      key="game-detail"
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.h2 
              className="text-xl font-bold"
              initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              animate={isStarted && step === 2 ? 
                { scale: [1, 1, 0.9], opacity: [1, 1, 0.5], filter: ["blur(0px)", "blur(0px)", "blur(1px)"] } 
                : {}
              }
              transition={{ 
                duration: STEP_DELAY / 1000,
                times: [0, 0.7, 1]
              }}>
              {GAME_DATA.name}
            </motion.h2>
            <motion.div
              initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              animate={isStarted && step === 2 ? 
                { scale: [1, 1, 0.9], opacity: [1, 1, 0.5], filter: ["blur(0px)", "blur(0px)", "blur(1px)"] } 
                : {}
              }
              transition={{ 
                duration: STEP_DELAY / 1000,
                times: [0, 0.7, 1]
              }}
            >
              <Badge className="bg-primary/20 text-primary">
                <Flame className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </motion.div>
          </div>
          <Button 
            size="sm"
            variant="outline"
            className={`group relative z-10 bg-background/50 hover:bg-primary/10 border-primary/30 hover:border-primary/50 ${
              isStarted && step === 2 ? "animate-none" : ""
            }`}
          >
            {/* Zoom Container */}
            {isStarted && step === 2 && (
              <motion.div
                className="absolute inset-0 bg-background/80 -z-10 rounded-md"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 1, 1.2, 1.1],
                  opacity: [0, 0, 1, 1],
                  boxShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 30px rgba(0,0,0,0.2)",
                    "0 0 20px rgba(0,0,0,0.1)"
                  ]
                }}
                transition={{
                  duration: STEP_DELAY / 1000,
                  times: [0, 0.7, 0.8, 1],
                  ease: "easeOut"
                }}
              />
            )}
            {/* Click Animation Overlay */}
            {isStarted && step === 2 && (
              <motion.div
                className="absolute inset-0 rounded-md bg-primary"
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: [0, 0, 0.2, 0],
                  scale: [1, 1, 0.95, 1]
                }}
                transition={{
                  duration: STEP_DELAY / 1000,
                  times: [0, 0.7, 0.8, 1],
                }}
              />
            )}
            {/* Glow Effect */}
            {isStarted && step === 2 && (
              <motion.div
                className="absolute inset-0 rounded-md"
                initial={{ boxShadow: "0 0 0px 0px hsla(var(--primary), 0)" }}
                animate={{
                  boxShadow: [
                    "0 0 0px 0px hsla(var(--primary), 0)",
                    "0 0 0px 0px hsla(var(--primary), 0)",
                    "0 0 20px 2px hsla(var(--primary), 0.3)",
                    "0 0 0px 0px hsla(var(--primary), 0.3)"
                  ]
                }}
                transition={{
                  duration: STEP_DELAY / 1000,
                  times: [0, 0.7, 0.8, 1],
                  ease: "easeInOut",
                }}
              />
            )}
            Start Challenge
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Additional Stats */}
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          animate={isStarted && step === 2 ? {
            scale: [1, 1, 0.9],
            opacity: [1, 1, 0.5],
            filter: ["blur(0px)", "blur(0px)", "blur(1px)"],
            y: [0, 0, 10]
          } : {}}
          transition={{ 
            duration: STEP_DELAY / 1000,
            times: [0, 0.7, 1]
          }}
        >
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Coins className="w-4 h-4" />
              <span className="text-sm">Prize Pool</span>
            </div>
            <p className="text-xl font-bold">{GAME_DATA.prizePool} BNB</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/10">
            <div className="flex items-center gap-2 text-secondary mb-1">
              <Timer className="w-4 h-4" />
              <span className="text-sm">Time Left</span>
            </div>
            <p className="text-xl font-bold">{GAME_DATA.timeLeft}</p>
          </div>
        </motion.div>

        <motion.div 
          className="p-4 rounded-lg bg-muted/50"
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          animate={isStarted && step === 2 ? {
            scale: [1, 1, 0.9],
            opacity: [1, 1, 0.5],
            filter: ["blur(0px)", "blur(0px)", "blur(1px)"],
            y: [0, 0, 20]
          } : {}}
          transition={{ 
            duration: STEP_DELAY / 1000,
            times: [0, 0.7, 1]
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Core Rules</h3>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <p>Never acknowledge the winning move</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <p>Maintain chess position integrity</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <p>Engage in logical debate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}