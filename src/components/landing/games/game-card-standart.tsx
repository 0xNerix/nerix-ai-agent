"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Brain, Coins, ArrowRight, Flame, TrendingUp, Users, MessageCircle, Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useCurrency } from "@/lib/hooks/use-currency";
import { useState } from "react";
import { GameWithCurrentState } from "@/database/type";
import { useGame } from "@/lib/hooks/use-game";

interface GameCardProps {
  game: GameWithCurrentState;
}

export function GameCardStandart({ game }: GameCardProps) {
  const { formatValue } = useCurrency();
  const [isHovered, setIsHovered] = useState(false);
  const gameState = useGame(game.id, { initialGameData: game });

  if (!game.isActive) {
    return (
      <Card className="group relative min-h-[600px] h-full overflow-hidden backdrop-blur-sm bg-background/10 border-white/5 transition-all duration-500">
        {/* Locked Overlay */}
        <div className="absolute inset-0 z-20 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center transition-all duration-500 group-hover:bg-background/90">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
            <Lock className="w-8 h-8 text-muted-foreground transition-colors duration-500 group-hover:text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4 transition-colors duration-500 group-hover:text-primary">{game.name}</h3>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/10 border border-muted/20 mb-4">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm">Complete previous challenges first</span>
          </div>
          <p className="text-muted-foreground max-w-md transition-colors duration-500 group-hover:text-foreground/80">
            Complete the previous challenges to unlock this game.
          </p>
        </div>

        {/* Blurred Background */}
        <div className="absolute inset-0">
          {game.coverImage && (
            <Image
              src={game.coverImage}
              alt={game.name}
              fill
              className="w-full h-full object-cover filter blur-sm opacity-20 transition-all duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-secondary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
      </Card>
    );
  }

  return (
    <Link href={`/games/${game.id}`} className="h-full">
      <Card 
        className="group/card relative h-full overflow-hidden backdrop-blur-[2px] bg-background/10 border-white/5
          transition-all duration-500 hover:backdrop-blur-[8px] hover:bg-background/20 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 animate-gradient-x" />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 animate-gradient-x" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col">
          {/* Title & Description */}
          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <Badge className="bg-primary/20 text-primary backdrop-blur-sm border-primary/20">
                <Flame className="w-3.5 h-3.5 mr-1.5" />
                Live Challenge
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">{game.name}</h3>
              {game.isBeta && (
                  <div className="relative">
                    <div className="absolute -rotate-12 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 shadow-lg transform scale-90">
                      <span className="drop-shadow-sm">BETA</span>
                      {/* Ribbon effect */}
                      <div className="absolute -left-1 top-0 w-0 h-0 border-t-[12px] border-b-[12px] border-r-[4px] border-t-transparent border-b-transparent border-r-red-800"></div>
                      <div className="absolute -right-1 top-0 w-0 h-0 border-t-[12px] border-b-[12px] border-l-[4px] border-t-transparent border-b-transparent border-l-red-800"></div>
                    </div>
                  </div>
                )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-foreground/70 line-clamp-2 cursor-help">{game.description}</p>
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
            {/* Prize Pool - Most prominent */}
            <div className="p-6 rounded-xl overflow-hidden bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20
              transition-all duration-300 group-hover/card:from-yellow-500/15 group-hover/card:to-orange-500/15 group-hover/card:border-yellow-500/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-yellow-500/15 flex items-center justify-center">
                  <Coins className="w-7 h-7 text-yellow-500" />
                </div>
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Current Prize Pool</div>
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-gradient-x bg-[length:200%_auto]">
                    {gameState.currentPrizePool}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - Rearranged in two rows */}
            <div className="space-y-3">
              {/* Players and Attempts in first row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-foreground/60 mb-1">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Players</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {gameState.uniqueParticipants?.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-foreground/60 mb-1">
                    <MessageCircle className="w-5 h-5 text-violet-500" />
                    <span className="text-sm">Attempts</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {gameState.totalAttempts?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>

              {/* Growth and Entry Fee in second row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-foreground/60 mb-1">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">Growth</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    +{game.economyConfig?.growthRate ? (game.economyConfig.growthRate * 100).toFixed(2) : '0'}%
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-foreground/60 mb-1">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Entry Fee</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {formatValue(parseFloat(gameState.currentMessageFee || '0'))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button - Blue background */}
          <Button 
            className="w-full group/button overflow-hidden relative bg-blue-500/80 hover:bg-blue-600/90 backdrop-blur-md
              transition-all duration-300 border-blue-400/20 hover:border-blue-500/30 mt-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 opacity-0 
              group-hover/button:opacity-100 transition-opacity duration-500 animate-gradient-x" />
            <span className="relative flex items-center gap-2 text-foreground">
              Enter Challenge
              <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
            </span>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/20 rounded-full blur-3xl opacity-0 group-hover/opacity-20 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-secondary/20 rounded-full blur-3xl opacity-0 group-hover/opacity-20 transition-opacity duration-700" />
      </Card>
    </Link>
  );
}
