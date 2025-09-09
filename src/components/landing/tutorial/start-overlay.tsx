"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StartOverlayProps {
  isHovered: boolean;
  onStart: () => void;
}

export function StartOverlay({ isHovered, onStart }: StartOverlayProps) {
  return (
    <motion.div
      className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-center space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 0.2,
          duration: 0.4,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {/* Icon Container */}
        <motion.div 
          className="relative w-20 h-20 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Background with gradient and glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50" />
          </div>

          {/* Icon */}
          <div className="relative w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center">
            <Play className="w-10 h-10 text-primary" />
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 20px 2px hsla(var(--primary), 0.2)",
                "0 0 30px 4px hsla(var(--primary), 0.4)",
                "0 0 20px 2px hsla(var(--primary), 0.2)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: 9999,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Text Content */}
        <div className="relative space-y-4">
          <motion.h3 
            className="text-xl font-semibold mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Demo Tutorial
          </motion.h3>
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Experience the game in action
          </motion.p>
          
          {/* Start Button */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button 
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Tutorial
            </Button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              animate={{
                y: [-20, -60, -20],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: 9999,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${15 + i * 12}%`,
                bottom: `${10 + Math.random() * 20}%`
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}