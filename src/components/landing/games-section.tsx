"use client";

import { useMemo } from "react";
import { GameWithCurrentState } from "@/database/type";
import { motion } from "framer-motion";
import { Brain, Gift, ArrowRight, Lock, ChevronRight, Users, Trophy, Infinity } from "lucide-react";
import { GameCardFreeToPlay } from "./games/game-card-free-to-play";
import { GameCardStandart } from "./games/game-card-standart";
import { GameCard } from "./games/game-card";

interface GameSectionProps {
  games: GameWithCurrentState[];
}

export function GameSection({ games }: GameSectionProps) {
  
  // Games are already filtered by backend based on beta access
  const filteredGames = useMemo(() => {
    return games;
  }, [games]);
  
  // Filter games by category (also reactive)
  const casualGames = useMemo(() => {
    return filteredGames.filter(game => game.category !== 'endless');
  }, [filteredGames]);
  
  const endlessGame = useMemo(() => {
    return filteredGames.find(game => game.category === "endless");
  }, [filteredGames]);

  if (!casualGames.length || !endlessGame) {
    return null;
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-secondary/15">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
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

          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary blur-2xl opacity-30" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
                Join the Global Challenge
              </span>
            </span>
          </motion.h2>

          {/* Game Progression Explanation */}
          <motion.div
            className="max-w-3xl mx-auto mb-12 space-y-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Progress Path */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Brain className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Initial Challenge</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
                <Infinity className="w-4 h-4 text-secondary" />
                <span className="text-sm">Endless Mode</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-foreground/90">
                Join thousands of players in a live, evolving battle of wits against AI!
              </p>
              <p className="text-muted-foreground">
                Begin your journey with the initial challenge, then progress to more advanced tests. Work together with the community to unlock the ultimate endless mode with ever-growing rewards!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Game Cards */}
        <div className="space-y-8 sm:space-y-16">
          {/* Free Games - Responsive Grid */}
          <div className={`grid gap-6 sm:gap-8 max-w-4xl mx-auto ${
            casualGames.length === 1 
              ? 'grid-cols-1 place-items-center' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            {casualGames.map((game, index) => (
              <motion.div 
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                className={`h-full ${casualGames.length === 1 ? 'w-full max-w-lg' : 'w-full'}`}
              >
                <div className="h-full">
                  {game.isFree && !game.isBeta ? (
                    <GameCardFreeToPlay game={game} />
                  ) : (
                    <GameCardStandart game={game} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Endless Game - Bigger and Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <div className="max-w-8xl mx-auto px-2 sm:px-0">
              <GameCard game={endlessGame} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}