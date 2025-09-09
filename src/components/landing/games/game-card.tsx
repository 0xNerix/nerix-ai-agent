"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Sparkles, Trophy, Brain, Shield, Users, MessageCircle, Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GameWithCurrentState } from "@/database/type";
import { useGame } from "@/lib/hooks/use-game";
import { CountdownTimer } from "@/components/ui/countdown-timer";

interface GameCardProps {
  game: GameWithCurrentState;
}

export function GameCard({ game }: GameCardProps) {
  const gameState = useGame(game.id, { initialGameData: game });
if (!game.isActive) {
  return (
   <Card className="group relative overflow-hidden backdrop-blur-sm border-secondary/20 hover:border-secondary/30 transition-all duration-500 py-4 min-h-[550px]">
      {/* Locked Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-background/95 via-background/85 to-background/95 backdrop-blur-md transition-all duration-500 flex flex-col min-h-[550px]">
        <div className="relative flex h-auto min-h-[420px] items-stretch flex-1">
          {/* LEFT — Title & Description (same width as before) */}
          <div className="flex-[2] flex flex-col p-6 pr-6 pt-6">
            {/* Title moved higher and bigger */}
            <div className="mb-6">
              <h3 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient-x bg-[length:200%_auto]">
                {game.name}
              </h3>
            </div>

            {/* Badge above description - enlarged */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/25 to-purple-500/25 border border-blue-500/40 backdrop-blur-sm">
                <span className="text-sm font-bold text-blue-300">🏆 Main Challenge</span>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span className="text-sm font-bold text-purple-300">⚡ Premium</span>
              </div>
            </div>

            {/* Description - flexible space */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 backdrop-blur-sm flex items-center">
              <p className="text-foreground/90 text-base leading-relaxed">
                💎 <span className="font-semibold text-emerald-300">Legendary Challenge</span> awaits brave minds!
                Compete against our most advanced AI with a{" "}
                <span className="font-bold text-cyan-300">{gameState.currentMessageFee}</span> entry fee
                and prove your strategic mastery to claim the{" "}
                <span className="font-bold text-yellow-300">{gameState.currentPrizePool}</span> prize! ⚡
              </p>
            </div>

            {/* Spacer to push prize pool to bottom */}
            <div className="flex-grow"></div>

            {/* Prize Pool at bottom */}
            <div className="relative p-8 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-500/20 via-orange-500/15 to-red-500/10 border border-yellow-500/30 backdrop-blur-sm">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0 animate-pulse" />
              </div>
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-bounce delay-100" />
                <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-300" />
                <div className="absolute bottom-3 left-8 w-1 h-1 bg-yellow-300 rounded-full animate-bounce delay-500" />
              </div>
              
              <div className="relative flex items-center group">
                {/* Icon fixed to left */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 group-hover:from-gray-800/80 group-hover:to-gray-900/80 flex items-center justify-center border-2 border-orange-500/50 group-hover:border-red-500/50 shadow-lg shadow-orange-500/20 group-hover:shadow-red-500/20 transition-all duration-300 mr-6">
                  <Trophy className="w-8 h-8 text-orange-400 group-hover:hidden transition-all duration-300" />
                  <Lock className="w-8 h-8 text-red-300 hidden group-hover:block transition-all duration-300" />
                </div>
                
                {/* Text centered in remaining space */}
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300">
                    {gameState.currentPrizePool}
                  </div>
                  <div className="text-base text-yellow-400/70 font-medium">Grand Prize Pool</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Image & Countdown (expanded to fill the remaining space) */}
          <div className="relative flex-[3.2] flex flex-col p-6 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              {game.coverImage && (
                <Image
                  src={game.coverImage}
                  alt={game.name}
                  fill
                  className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                />
              )}
            </div>


            {/* Badge above timer */}
            <div className="relative w-full z-10 flex justify-end mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 border border-orange-500/30 backdrop-blur-sm">
                <span className="text-sm font-bold text-orange-300">🏆 Epic Challenge Awaits</span>
              </div>
            </div>

            {/* Top content area */}
            <div className="relative w-full z-10 space-y-6 flex-grow flex flex-col">
              <CountdownTimer
                endTime={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                size="lg"
                isActive={false}
                className="rounded-xl"
              />

              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-xl p-6 backdrop-blur-lg bg-black/20">
                <p className="text-base text-center text-blue-200 leading-relaxed">
                  The community is playing <span className="font-semibold text-cyan-300">Checkmate Paradox</span> right now!
                  Once they complete it, the timer starts and this <span className="font-bold text-blue-300">legendary challenge goes live 24 hours later</span>! 🎯
                </p>
              </div>
            </div>

            {/* CTA Button aligned to bottom */}
            <div className="relative group cursor-pointer mt-auto z-10">
                {/* Main Button - Green initially, red on hover */}
                <div className="w-full bg-gradient-to-r from-green-600/80 to-emerald-600/80 group-hover:from-red-600/80 group-hover:to-red-700/80 border border-green-500/40 group-hover:border-red-500/40 rounded-xl p-4 backdrop-blur-sm transition-all duration-300">
                  
                  {/* Content with text change on hover */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400/30 group-hover:from-red-400/30 to-emerald-400/30 group-hover:to-red-500/30 border border-green-400/40 group-hover:border-red-400/40 flex items-center justify-center transition-all duration-300">
                      <Trophy className="w-5 h-5 text-green-300 group-hover:text-red-300 group-hover:hidden transition-all duration-300" />
                      <Lock className="w-5 h-5 text-red-300 hidden group-hover:block transition-all duration-300" />
                    </div>
                    
                    {/* Text that changes on hover */}
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-100 group-hover:text-red-100 transition-colors duration-300 group-hover:hidden">
                        Join Epic Challenge!
                      </div>
                      <div className="text-sm font-bold text-red-100 hidden group-hover:block transition-colors duration-300">
                        Oops! Still locked 😅
                      </div>
                      <div className="text-xs text-green-200 group-hover:text-red-200 transition-colors duration-300 group-hover:hidden">
                        Ready for glory?
                      </div>
                      <div className="text-xs text-red-200 hidden group-hover:block transition-colors duration-300">
                        Coming soon...
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-green-300 group-hover:text-red-300 transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Background Image (blur) */}
      <div className="absolute inset-0">
        {game.coverImage && (
          <Image
            src={game.coverImage}
            alt={game.name}
            fill
            className="w-full h-full object-cover filter blur-sm opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-transparent" />
      </div>
    </Card>
  );
}
  return (
    <Link href={`/games/${game.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
        className="group"
      >
        <Card className="relative overflow-hidden backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-2xl">
          {/* Rich Animated Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            {/* Radial gradients like CTA */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.4),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,119,198,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(168,85,247,0.2),transparent_40%)]" />
            
            {/* Floating battle elements */}
            <motion.div 
              className="absolute top-1/4 left-1/6 w-3 h-3 bg-primary/40 rounded-full"
              animate={{ 
                y: [-12, 12, -12],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 4, repeat: 9999 }}
            />
            <motion.div 
              className="absolute top-3/4 right-1/6 w-2 h-2 bg-secondary/40 rounded-full"
              animate={{ 
                y: [8, -8, 8],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: 9999, delay: 1 }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-accent/40 rounded-full"
              animate={{ 
                x: [-6, 6, -6],
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2.5, repeat: 9999, delay: 0.8 }}
            />
            
            {/* Moving particles with better distribution */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                animate={{
                  x: [0, Math.random() * 80 - 40],
                  y: [0, Math.random() * 80 - 40],
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: 9999,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                }}
              />
            ))}

            {/* Pulsing glow orbs */}
            <motion.div 
              className="absolute top-1/3 right-1/4 w-8 h-8 bg-primary/20 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: 9999, delay: 0.5 }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-secondary/20 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.35, 0.15]
              }}
              transition={{ duration: 3.5, repeat: 9999, delay: 1.2 }}
            />
          </div>

          {/* Background Image */}
          <div className="absolute inset-0 opacity-10">
            {game.coverImage && (
              <Image
                src={game.coverImage}
                alt={game.name}
                fill
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
          </div>

          {/* Content Area */}
          <div className="relative flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                  <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                    {game.name}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm text-muted-foreground cursor-help">
                          {game.description ? `${game.description.substring(0, 60)}...` : 'Endless challenge awaits...'}
                        </p>
                      </TooltipTrigger>
                      {game.description && game.description.length > 60 && (
                        <TooltipPrimitive.Portal>
                          <TooltipContent 
                            className="max-w-sm z-[9999]" 
                            side="top"
                            sideOffset={10}
                          >
                            <p className="text-sm">{game.description}</p>
                          </TooltipContent>
                        </TooltipPrimitive.Portal>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="flex items-center gap-2 px-2 lg:px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-primary" />
                  <span className="text-xs lg:text-sm font-semibold text-primary">
                    Live
                  </span>
                </div>
                <div className="px-2 lg:px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                  <span className="text-xs lg:text-sm font-medium text-secondary">
                    Iteration #{gameState.currentIteration || '1'}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Status Banner */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">
                Active Challenge • Smart Contract Protected
              </span>
            </div>

            {/* Prize Pool & Message Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Prize Pool */}
              <motion.div 
                className="relative p-4 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-orange-500/5 border border-yellow-500/30 rounded-xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-amber-500/20 to-yellow-500/0"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: 9999,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                <div className="relative flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-sm text-yellow-600/70">Prize Pool</div>
                    <motion.div 
                      className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent"
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: 9999,
                        ease: "easeInOut"
                      }}
                    >
                      {gameState.currentPrizePool}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Message Fee */}
              <motion.div 
                className="relative p-4 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-red-500/10 border border-red-500/20 rounded-xl" />
                
                <div className="relative flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Coins className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-red-600/70">Message Fee</div>
                    <div className="text-xl font-bold text-red-700">
                      {gameState.currentMessageFee}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative p-3 rounded-lg overflow-hidden bg-secondary/10 border border-secondary/20">
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Players</div>
                      <motion.div 
                        className="text-xl font-bold"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: 9999,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      >
                        {gameState.uniqueParticipants?.toLocaleString() || '0'}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative p-3 rounded-lg overflow-hidden bg-accent/10 border border-accent/20">
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Attempts</div>
                      <motion.div 
                        className="text-xl font-bold"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: 9999,
                          ease: "easeInOut",
                          delay: 0.7
                        }}
                      >
                        {gameState.totalAttempts?.toLocaleString() || '0'}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Action Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  Enter Challenge
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </motion.div>
            </div>

            {/* Side Image Area */}
            <div className="relative lg:w-80 w-full h-40 lg:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20" />
              <Image
                src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-endless-loop-da4oE7Z9fYRjMKhWjSCub99n0jPJC7.png"
                alt="Game Visual"
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-background/20 to-transparent" />
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}