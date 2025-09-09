"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Brain, Coins, Flame, Sparkles, Trophy } from "lucide-react";
import Image from "next/image";

export function SystemHeader() {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-8">
      <motion.div 
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
        >
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group hover:from-primary/30 hover:to-secondary/30 transition-all duration-500">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <Image
              src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
              alt="Nerix Logo"
              width={128}
              height={128}
              className="w-16 h-16 object-contain relative"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary blur-2xl opacity-30" />
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
              Nerix Whitepaper
            </span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          A revolutionary AI gaming platform combining advanced security testing with blockchain rewards
        </motion.p>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Badge className="px-4 py-2 text-base bg-[#F0B90B]/20 text-[#F0B90B] border-[#F0B90B]/30">
            <Image
              src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/bnb-logo.png" 
              alt="BNB Chain" 
              width={20}
              height={20}
              className="w-5 h-5 mr-2" 
            />
            BNB Chain
          </Badge>
          <Badge className="px-4 py-2 text-base bg-primary/20 text-primary border-primary/30">
            <Brain className="w-4 h-4 mr-2" />
            AI Security
          </Badge>
          <Badge className="px-4 py-2 text-base bg-secondary/20 text-secondary border-secondary/30">
            <Trophy className="w-4 h-4 mr-2" />
            Prize Pools
          </Badge>
          <Badge className="px-4 py-2 text-base bg-accent/20 text-accent border-accent/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Gamified Testing
          </Badge>
        </motion.div>
      </motion.div>
    </div>
  );
}