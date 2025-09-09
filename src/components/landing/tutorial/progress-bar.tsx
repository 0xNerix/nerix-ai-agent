"use client";

import { motion } from "framer-motion";
import { STEP_DELAY } from "./tutorial-data";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50">
      {/* Background gradient line */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 8,
          repeat: 9999,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 100%'
        }}
      />
      
      {/* Progress fill */}
      <motion.div
        className="relative h-full bg-gradient-to-r from-primary via-secondary to-primary"
        initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
        animate={{ 
          width: `${(step / totalSteps) * 100}%`
        }}
        transition={{ 
          duration: STEP_DELAY / 1000,
          ease: "easeInOut"
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-sm" />
        
        {/* Progress tip glow */}
        <motion.div
          className="absolute right-0 top-0 h-full w-2 bg-gradient-to-r from-transparent to-white/30 rounded-r"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: 9999,
            ease: "easeInOut"
          }}
        />
        
        {/* Shimmer animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent w-32"
          animate={{
            x: ['-200%', '200%']
          }}
          transition={{
            duration: 2.5,
            repeat: 9999,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />
      </motion.div>
    </div>
  );
}