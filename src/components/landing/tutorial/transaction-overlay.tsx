"use client";

import { motion } from "framer-motion";
import { Coins, ArrowRight, Check, Trophy } from "lucide-react";
import { GAME_DATA } from "./tutorial-data";

interface TransactionOverlayProps {
  step: 'confirm' | 'processing' | 'success';
}

export function TransactionOverlay({ step }: TransactionOverlayProps) {
  return (
    <motion.div 
      className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="p-6">
        {step === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold">Confirm Transaction</h3>
              <p className="text-sm text-muted-foreground">
                Send a message to Chess Master AI
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Message Fee</span>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium text-emerald-500">FREE</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Demo Showcase</span>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="font-medium">Experience the game</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: 9999, ease: "linear" }}
                >
                  <ArrowRight className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Processing Transaction</h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we process your message...
              </p>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-success" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Transaction Complete</h3>
              <p className="text-sm text-muted-foreground">
                Message sent successfully!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}