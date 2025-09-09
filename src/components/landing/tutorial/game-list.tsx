"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Flame, Users, MessageCircle } from "lucide-react";
import { GAME_DATA } from "./tutorial-data";
import Image from "next/image";

interface GameListProps {
  isStarted: boolean;
  step: number;
}

export function GameList({ isStarted, step }: GameListProps) {
  return (
    <motion.div
      key="game-list"
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Checkmate Game Card */}
      <Card 
        className={`p-6 transition-all duration-1000 ${
          isStarted && step === 1 
            ? "bg-background/70 border-primary/30 scale-100 z-10 relative"
            : "bg-background/50 border-white/10 scale-95"
        }`}
      >
        {/* Highlight Overlay */}
        {isStarted && step === 1 && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ boxShadow: "0 0 0px 0px hsla(var(--primary), 0)" }}
            animate={{
              boxShadow: [
                "0 0 0px 0px hsla(var(--primary), 0)",
                "0 0 0px 0px hsla(var(--primary), 0)",
                "0 0 30px 2px hsla(var(--primary), 0.3)",
                "0 0 0px 0px hsla(var(--primary), 0.3)"
              ]
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.6, 0.8, 1],
              repeat: 9999,
              ease: "easeInOut"
            }}
          />
        )}

        <div className="space-y-6">
          {/* First Row: Image and Info */}
          <div className="flex gap-6">
            <div className="relative w-[200px] aspect-[16/9] rounded-lg bg-gradient-to-br from-primary/20 via-background/20 to-secondary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={"https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-chess-paradox.png"}
                    alt={"chess-paradox-tutorial"}
                    fill
                    className="object-contain"
                  />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{GAME_DATA.name}</h3>
                <Badge className="bg-primary/20 text-primary">
                  <Flame className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{GAME_DATA.description}</p>
            </div>
          </div>

          {/* Second Row: Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Coins className="w-4 h-4" />
                <span className="text-sm">Prize Pool</span>
              </div>
              <p className="text-lg font-bold">{GAME_DATA.prizePool} BNB</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/10">
              <div className="flex items-center gap-2 text-secondary mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">Players</span>
              </div>
              <p className="text-lg font-bold">{GAME_DATA.participants}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/10">
              <div className="flex items-center gap-2 text-accent mb-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Attempts</span>
              </div>
              <p className="text-lg font-bold">{GAME_DATA.attempts}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Skeleton Cards */}
      {[1, 2].map((i) => (
        <Card 
          key={i}
          className={`p-6 mt-4 transition-all duration-700 ${
            isStarted && step === 1
              ? "opacity-30 scale-95 blur-[1px]"
              : "opacity-100 scale-100 blur-0"
          }`}
        >
          <div className="space-y-6">
            {/* First Row: Image and Info */}
            <div className="flex gap-6">
              <div className="relative w-[200px] aspect-[16/9] rounded-lg bg-muted animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              </div>
            </div>

            {/* Second Row: Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-muted rounded-lg animate-pulse" />
              <div className="h-16 bg-muted rounded-lg animate-pulse" />
              <div className="h-16 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </Card>
      ))}
    </motion.div>
  );
}