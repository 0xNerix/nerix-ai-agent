"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Coins, Brain, Users, MessageCircle, Trophy, Image as ImageIcon, Sparkles, Maximize2, Play, ChevronRight, ChevronLeft, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveNFTs } from "./nft/active-nfts";
import { NFTList } from "./nft/nft-list";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { GameWithCurrentState } from "@/database/type";
import { UseGameReturn } from "@/lib/hooks/use-game";

interface GameHeroProps {
  game: GameWithCurrentState;
  gameData: UseGameReturn;
  onOpenGameInfo: () => void;
  onOpenSystemPrompt: () => void;
  hideNavigationBar?: boolean;
}

const gameMedia = [
  {
    type: 'image',
    url: 'https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-endless-loop-da4oE7Z9fYRjMKhWjSCub99n0jPJC7.png',
  },
  {
    type: 'video',
    thumbnail: 'https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-endless-loop-da4oE7Z9fYRjMKhWjSCub99n0jPJC7.png',
    url: 'https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-endless-loop.mp4',
  }
];

export function GameHero({ game, gameData, onOpenGameInfo, onOpenSystemPrompt, hideNavigationBar = false }: GameHeroProps) {
  const { data: session } = useSession();
  const [hoveredVideoIndex, setHoveredVideoIndex] = useState<number | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [isNFTCollapsed, setIsNFTCollapsed] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Handle hover video playback
    const currentVideoRefs = videoRefs.current;
    const currentIndex = hoveredVideoIndex;
    
    if (currentIndex !== null) {
      const video = currentVideoRefs[currentIndex];
      if (video) {
        video.play().catch(() => {});
      }
    }
    
    return () => {
      if (currentIndex !== null) {
        const video = currentVideoRefs[currentIndex];
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    };
  }, [hoveredVideoIndex]);

  useEffect(() => {
    // Handle modal video playback
    if (selectedMediaIndex !== null && gameMedia[selectedMediaIndex].type === 'video') {
      const video = modalVideoRef.current;
      if (video) {
        video.play().catch(() => {});
      }
    }
  }, [selectedMediaIndex]);

  const navigateMedia = useCallback((direction: 'prev' | 'next') => {
    if (selectedMediaIndex === null) return;
    
    let newIndex = direction === 'prev' 
      ? selectedMediaIndex - 1 
      : selectedMediaIndex + 1;
    
    if (newIndex < 0) newIndex = gameMedia.length - 1;
    if (newIndex >= gameMedia.length) newIndex = 0;
    
    setSelectedMediaIndex(newIndex);
  }, [selectedMediaIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMediaIndex === null) return;

      if (e.key === 'ArrowLeft') {
        navigateMedia('prev');
      } else if (e.key === 'ArrowRight') {
        navigateMedia('next');
      } else if (e.key === 'Escape') {
        setSelectedMediaIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMediaIndex, navigateMedia]);

  return (
    <div className="space-y-6">
      {/* Navigation bar - only show if not hidden */}
      {!hideNavigationBar && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Button>
          </Link>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onOpenGameInfo}
              className="flex items-center justify-center gap-1 flex-1"
            >
              <Brain className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Game Guide</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onOpenSystemPrompt}
              className="flex items-center justify-center gap-1 flex-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs sm:text-sm">System Prompt</span>
            </Button>
          </div>
        </div>
      )}

      <Card className="overflow-hidden bg-gradient-to-br from-background/95 via-background/80 to-background/95">
        <Tabs defaultValue="info" className="w-full">
          <div className="p-2">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Game Info
              </TabsTrigger>
              <TabsTrigger value="nfts" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Your NFTs ({gameData.totalNFTs})
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Media
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="info" className="relative">
             {/* Background Image */}
             <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${game.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
            <div className="relative z-10 p-4 space-y-4">
              {/* Game Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center px-3 py-1 rounded-full backdrop-blur-sm border text-sm font-medium gap-2 bg-primary/20 border-primary/20 text-foreground">
                    <span className="w-2 h-2 rounded-full animate-pulse bg-primary" />
                    Live Challenge
                  </div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border text-sm font-medium gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-foreground relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: 9999,
                        ease: "linear"
                      }}
                    />
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-amber-500 relative z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: 9999,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative z-10 font-semibold">
                      Iteration #{gameData.currentIteration}
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  {game.name}
                </h1>
                <p className="text-sm text-foreground/90">
                  {game.description}
                </p>
              </div>

               {/* Prize Pool */}
              <motion.div 
                className="relative p-6 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Enhanced Prize Pool Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl">
                  {/* Smooth Pulsing Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 to-amber-500/10 rounded-xl"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: 9999,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Gentle Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent"
                    animate={{
                      x: ["-150%", "150%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: 9999,
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  />
                  
                  {/* Floating Golden Particles */}
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-sm"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 5,
                      repeat: 9999,
                      ease: "easeInOut",
                    }}
                    style={{ left: '15%', top: '25%' }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 bg-amber-300 rounded-full shadow-sm"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 7,
                      repeat: 9999,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    style={{ left: '85%', top: '75%' }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-sm"
                    animate={{
                      y: [0, -12, 0],
                      opacity: [0.3, 0.7, 0.3],
                      scale: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 6,
                      repeat: 9999,
                      ease: "easeInOut",
                      delay: 3
                    }}
                    style={{ left: '65%', top: '15%' }}
                  />
                  
                  {/* Corner Sparkles */}
                  <motion.div
                    className="absolute w-0.5 h-0.5 bg-yellow-200 rounded-full"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: 9999,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    style={{ left: '25%', top: '80%' }}
                  />
                  <motion.div
                    className="absolute w-0.5 h-0.5 bg-amber-200 rounded-full"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: 9999,
                      ease: "easeInOut",
                      delay: 2.5
                    }}
                    style={{ left: '75%', top: '35%' }}
                  />
                </div>

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/30 to-amber-500/20 flex items-center justify-center border border-yellow-500/30">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-yellow-500/90">💰 Current Prize Pool</span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-yellow-600/70">Live & Growing</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Prize Display */}
                  <div className="text-center mb-4">
                    <motion.div 
                      className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent relative"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        textShadow: [
                          "0 0 10px rgba(245, 158, 11, 0.3)",
                          "0 0 20px rgba(245, 158, 11, 0.5)",
                          "0 0 10px rgba(245, 158, 11, 0.3)"
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: 9999,
                        ease: "easeInOut"
                      }}
                      style={{
                        backgroundSize: "200% 200%"
                      }}
                    >
                      {gameData.currentPrizePool}
                      {/* Subtle glow overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-500/30 to-yellow-600/20 blur-lg -z-10"
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: 9999,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    <div className="text-sm text-yellow-600/80 mt-1">
                      🏆 Winner gets <span className="font-bold">100%</span> of this pool
                    </div>
                  </div>

                </div>
              </motion.div>


              {/* Active NFT Effects - Collapsible */}
              {session?.address && gameData.totalNFTs > 0 && (
                <motion.div 
                  className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer"
                      onClick={() => setIsNFTCollapsed(!isNFTCollapsed)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700">Active NFT Bonuses</h4>
                          <p className="text-xs text-blue-600/70">
                            {gameData.totalNFTs} NFT{gameData.totalNFTs > 1 ? 's' : ''} providing bonuses
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-blue-500"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: 9999,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          animate={{ rotate: isNFTCollapsed ? 0 : 180 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronDown className="w-4 h-4 text-blue-500" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {!isNFTCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1 
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0 
                          }}
                          transition={{ 
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94] // Custom ease for smooth animation
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <ActiveNFTs nfts={gameData.userNFTs} currentIteration={gameData.currentIteration} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

        
              {/* Stats Grid */}
              <motion.div 
                className="relative p-4 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-secondary/10 border border-secondary/20 rounded-xl">
                  {/* Floating Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-secondary/50"
                      animate={{
                        y: [-20, -40],
                        x: i * 10,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: 9999,
                        delay: i * 0.2
                      }}
                      style={{
                        left: `${20 + i * 20}%`,
                        bottom: "20%"
                      }}
                    />
                  ))}
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Unique Players</div>
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
                        {gameData.uniqueParticipants.toLocaleString()}
                      </motion.div>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-secondary/20" />
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Attempts</div>
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
                        {gameData.totalAttempts.toLocaleString()}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Message Fee */}
              <div className="relative p-4 rounded-xl overflow-hidden bg-destructive/10 border border-destructive/20">
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Current Fee</div>
                      <div className="relative">
                        <div className="text-lg font-bold line-through text-muted-foreground/60">
                          {gameData.totalFee}
                        </div>
                        <div className="text-xl font-bold">
                          {gameData.hasNFTDiscount ? gameData.userMessageFee : gameData.currentMessageFee}
                        </div>
                        {gameData.hasNFTDiscount && (
                          <div className="text-xs text-emerald-600 font-medium">
                            {gameData.discountPercentage}% NFT discount
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-destructive/20" />
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Initial Fee</div>
                        <div className="text-sm font-semibold">
                          {gameData.initialFee}
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <div className="text-xs text-muted-foreground">Growth Rate</div>
                        <div className="text-sm font-semibold text-destructive">
                          +{game.economyConfig?.growthRate || 10}% per message
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prize Pool Details */}
              <div className="relative p-4 rounded-xl overflow-hidden bg-emerald-500/10 border border-emerald-500/20">
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Current Pool</div>
                      <div className="text-xl font-bold">
                        {gameData.currentPrizePool}
                      </div>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-emerald-500/20" />
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Initial Pool</div>
                      <div className="text-xl font-bold">
                        {game.economyConfig?.initialPrizePool || '0.0 BNB'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nfts" className="p-6 pt-4">
            <NFTList nfts={gameData.userNFTs} />
          </TabsContent>

          <TabsContent value="media" className="p-6 pt-4">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {gameMedia.map((media, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden cursor-pointer object-contain "
                    onMouseEnter={() => media.type === 'video' && setHoveredVideoIndex(index)}
                    onMouseLeave={() => setHoveredVideoIndex(null)}
                    onClick={() => setSelectedMediaIndex(index)}
                  >
                    {media.type === 'video' ? (
                      <>
                        <video
                          ref={el => { videoRefs.current[index] = el }}
                          src={media.url}
                          poster={media.thumbnail}
                          className="w-full aspect-video object-contain rounded-lg"
                          loop
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center object-contain">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          src={media.url}
                          alt="Game media"
                          fill
                          className="w-full aspect-video rounded-lg object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Maximize2 className="w-12 h-12 text-white" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Fullscreen Media Modal */}
      <Dialog open={selectedMediaIndex !== null} onOpenChange={() => setSelectedMediaIndex(null)}>
        <DialogContent className="max-w-7xl p-0 bg-background/95 backdrop-blur-sm">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedMediaIndex(null)}
              className="absolute right-4 top-4 z-10"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Media Content */}
            {selectedMediaIndex !== null && (
              <div className="aspect-video">
                {gameMedia[selectedMediaIndex].type === 'video' ? (
                  <video
                    ref={modalVideoRef}
                    src={gameMedia[selectedMediaIndex].url}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={gameMedia[selectedMediaIndex].url}
                    alt="Game media"
                    fill
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}