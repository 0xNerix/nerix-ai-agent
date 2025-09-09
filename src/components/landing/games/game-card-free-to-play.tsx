"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  ArrowRight,
  Flame,
  Users,
  MessageCircle,
  Coins,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useState } from "react";
import { GameWithCurrentState } from "@/database/type";
import { useGame } from "@/lib/hooks/use-game";
import { CountdownTimer } from "@/components/ui/countdown-timer";

interface GameCardFreeToPlayProps {
  game: GameWithCurrentState;
}

export function GameCardFreeToPlay({ game }: GameCardFreeToPlayProps) {
  const gameState = useGame(game.id, { initialGameData: game });

  const unlockDate = new Date(2025, 8, 15);
  if (!game.isActive) {
    return (
      <Card className="group relative min-h-[700px] h-full overflow-hidden backdrop-blur-sm bg-background/10 border-white/5 transition-all duration-500">
        {/* Locked Overlay */}
        {/* <div className="absolute inset-0">
          <Image
            src={game.coverImage}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        </div> */}

        <div className="absolute inset-0 z-20 bg-gradient-to-br from-background/30 via-background/50 to-background/30 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center transition-all duration-500">
          
          {/* Badges moved after description */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 via-yellow-500/20 to-orange-500/20 border border-emerald-500/30 backdrop-blur-sm mb-6">
            <span className="text-sm font-bold text-emerald-300">🆓 Free to Play</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span className="text-sm font-bold text-yellow-300">💰 Big Rewards</span>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-background/20 to-background/10 border border-white/10 backdrop-blur-sm mb-4">
            <h3 className="text-2xl font-bold transition-colors duration-500 group-hover:text-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400">
              {game.name}
            </h3>
          </div>

          {/* Countdown Timer */}
          <div className="mb-6 w-full max-w-sm">
            <CountdownTimer
              endTime={unlockDate}
              size="sm"
              className="bg-background/10 rounded-xl p-4 backdrop-blur-sm border border-white/10"
            />
          </div>
          
          {/* Enhanced Description */}
          <div className="max-w-md mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
            <p className="text-foreground/90 text-sm leading-relaxed">
              When the countdown hits zero, the <span className="font-semibold text-emerald-300">Endless Loop</span> begins — a thrilling <span className="font-semibold text-emerald-300">Free to Play</span> battle where players race against our advanced AI to claim the <span className="font-bold text-yellow-300">${gameState.currentPrizePool?.replace('$', '') || '500'}</span> prize! 🚀
            </p>
          </div>

          {/* Prize Pool - Full Width Design */}
          <div className="relative p-6 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-500/15 via-orange-500/10 to-red-500/5 border border-yellow-500/25 backdrop-blur-sm w-full">
            {/* Subtle Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 animate-pulse" />
            </div>
            
            <div className="relative flex items-center">
              {/* Icon fixed to left */}
              <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center mr-6">
                <Coins className="w-7 h-7 text-yellow-400" />
              </div>
              
              {/* Text centered in remaining space */}
              <div className="flex-1 text-center">
                <div className="text-sm text-yellow-300/80 mb-1 font-medium uppercase tracking-wider">Prize Pool</div>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300">
                  {gameState.currentPrizePool}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blurred Background */}
        <div className="absolute inset-0">
          {game.coverImage && (
            <Image
              src={game.coverImage}
              alt={game.name}
              fill
              className="w-full h-full object-cover filter blur-sm opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
      </Card>
    );
  }

  return (
    <Link href={`/games/${game.id}`} className="h-full" passHref>
      <Card
        className="group/card relative h-full overflow-hidden backdrop-blur-[2px] bg-background/10 border-white/5
          transition-all duration-500 hover:backdrop-blur-[8px] hover:bg-background/20 flex flex-col"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={game.coverImage || "https://via.placeholder.com/800x600"}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
        </div>

        {/* Animated Background Gradients */}
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-emerald-500/10 animate-gradient-x" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/10 animate-gradient-x"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Content */}
        <div className="relative p-6 flex flex-col">
          {/* Title & Description */}
          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <Badge className="bg-emerald-500/20 text-emerald-500 backdrop-blur-sm border-emerald-500/20">
                <Brain className="w-3.5 h-3.5 mr-1.5" />
                Initial Challenge
              </Badge>
              <Badge className="bg-primary/20 text-primary backdrop-blur-sm border-primary/20">
                <Flame className="w-3.5 h-3.5 mr-1.5" />
                Live
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">
                  {game.name}
            </h3>
                {game.isBeta && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="inline-block rounded-full bg-red-600 text-white text-sm sm:text-sm font-bold px-3 py-1 shadow-md">
                      BETA
                    </span>
                  </div>
                )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-foreground/70 line-clamp-2 cursor-help">
                    {game.description}
                  </p>
                </TooltipTrigger>
                {game.description && game.description.length > 100 && (
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

          {/* Main Content Section */}
          <div className="space-y-4 flex-grow">
            {/* Entry Banner */}
            <div
              className="p-6 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20
              transition-all duration-300 group-hover/card:from-emerald-500/15 group-hover/card:to-emerald-500/10 group-hover/card:border-emerald-500/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm text-foreground/60 mb-1">
                    Initial Challenge
                  </div>
                  <div className="text-2xl font-bold text-emerald-500">
                    No Entry Fee
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-3">
              {/* Players and Attempts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-foreground/60 mb-1">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">Players</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {gameState.uniqueParticipants?.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-foreground/60 mb-1">
                    <MessageCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">Attempts</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {gameState.totalAttempts?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
              {/* Prize Pool - Most prominent */}
              <div
                className="p-6 rounded-xl overflow-hidden bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20
              transition-all duration-300 group-hover/card:from-yellow-500/15 group-hover/card:to-orange-500/15 group-hover/card:border-yellow-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500/15 flex items-center justify-center">
                    <Coins className="w-7 h-7 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">
                      Current Prize Pool
                    </div>
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-gradient-x bg-[length:200%_auto]">
                      {gameState.currentPrizePool}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full group/button overflow-hidden relative bg-emerald-500/80 hover:bg-emerald-500/90 backdrop-blur-md
              transition-all duration-300 border-emerald-400/20 hover:border-emerald-500/30 mt-4"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 opacity-0 
              group-hover/button:opacity-100 transition-opacity duration-500 animate-gradient-x"
            />
            <span className="relative flex items-center gap-2 text-foreground">
              Enter Free Challenge
              <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
            </span>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-700" />
      </Card>
    </Link>
  );
}
