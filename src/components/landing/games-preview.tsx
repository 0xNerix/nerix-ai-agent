"use client";

import { GameWithCurrentState } from "@/database/type";
import { motion } from "framer-motion";
import { Brain, ArrowRight, ChevronRight, Trophy, Infinity, Zap, Target } from "lucide-react";
import { GameCard } from "./games/game-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { GameCardFreeToPlay } from "./games/game-card-free-to-play";
import { GameCardStandart } from "./games/game-card-standart";
import { useMemo } from "react";

interface GamesPreviewProps {
  games: GameWithCurrentState[];
}

export function GamesPreview({ games }: GamesPreviewProps) {
  
  // Games are already filtered by backend based on beta access
  const filteredGames = useMemo(() => {
    if (!Array.isArray(games)) {
      return [];
    }
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
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-secondary/15">
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
                Begin your journey with the initial challenge, then progress to more advanced tests.
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

        {/* Elegant CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative mt-12 overflow-hidden bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-xl border border-primary/20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.3),transparent_50%)]" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full"
                animate={{ 
                  y: [-10, 10, -10],
                  opacity: [0.4, 0.8, 0.4] 
                }}
                transition={{ duration: 4, repeat: 9999 }}
              />
              <motion.div 
                className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary/40 rounded-full"
                animate={{ 
                  y: [10, -10, 10],
                  opacity: [0.4, 0.8, 0.4] 
                }}
                transition={{ duration: 3, repeat: 9999, delay: 1 }}
              />
            </div>

            <div className="relative p-12">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/20 border border-primary/30">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div className="p-2 rounded-full bg-secondary/20 border border-secondary/30">
                      <Target className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="p-2 rounded-full bg-accent/20 border border-accent/30">
                      <Trophy className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                  Battle AI, Earn BNB
                </h3>

                {/* Subtitle */}
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Challenge the evolving AI system, compete with players worldwide, and win cryptocurrency prizes in this groundbreaking gaming experience.
                </p>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Button size="lg" asChild className="group relative overflow-hidden px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-500">
                    <Link href="/games">
                      <span className="relative z-10 flex items-center">
                        <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Start Your AI Battle
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>
                  </Button>
                </div>

                {/* Small text */}
                <p className="text-xs text-muted-foreground/60 mt-4">
                  Free to start • Blockchain secured • Instant gameplay
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}