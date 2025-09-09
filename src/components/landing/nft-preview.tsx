"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NFTCard } from "@/components/landing/nft/nft-card";
import { ChevronLeft, ChevronRight, InboxIcon, ArrowRight, Sparkles, Zap, Star, Play, X } from "lucide-react";
import { nfts } from "@/data/nfts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function NFTPreview() {
  // Maximum iteration number that can be viewed (not the current active iteration)
  const MAX_VIEWABLE_ITERATION = 1000;
  // Current active iteration is 1 - only iteration 1 has actual NFTs
  const [currentIteration, setCurrentIteration] = useState(1);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Filter NFTs for current iteration
  const currentNFTs = nfts.filter((nft) => nft.iteration === currentIteration);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-secondary/15 via-secondary/20 to-secondary/10">
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
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-secondary blur-2xl opacity-30" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-secondary animate-gradient-x">
                Nerix NFT System
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Collect unique NFTs from each iteration to unlock powerful bonuses
            and enhance your gaming experience.
          </motion.p>
        </div>


        {/* NFT Display Section */}
        <div className="space-y-8">
          {/* Iteration Navigation */}
          <Card className="relative p-6 backdrop-blur-sm bg-background/20 border-primary/20 group hover:bg-background/30 hover:border-primary/30 transition-all duration-500">
            {/* Move gradient behind the content */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content on top with pointer-events-auto */}
            <div className="relative z-10 pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Iteration #{currentIteration} NFTs
                </h3>
                <p className="text-muted-foreground">
                  View and collect NFTs from the current iteration
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentIteration(1)}
                  disabled={currentIteration === 1}
                  className="px-3"
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentIteration((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentIteration === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="w-16 text-center font-bold text-lg">
                  #{currentIteration}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentIteration((prev) =>
                      Math.min(MAX_VIEWABLE_ITERATION, prev + 1)
                    )
                  }
                  disabled={currentIteration === MAX_VIEWABLE_ITERATION}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentIteration(MAX_VIEWABLE_ITERATION)}
                  disabled={currentIteration === MAX_VIEWABLE_ITERATION}
                  className="px-3"
                >
                  Latest
                </Button>
              </div>
            </div>
          </Card>

          {/* NFT Cards or No Records Message */}
          {currentNFTs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNFTs.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  currentIteration={MAX_VIEWABLE_ITERATION}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center backdrop-blur-sm bg-background/20 border-primary/20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
                  <InboxIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No NFTs Found</h3>
                  <p className="text-muted-foreground">
                    There are no NFTs available for iteration #
                    {currentIteration}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Video CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group mt-16"
        >
          <Card 
            className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 border border-secondary/30 hover:border-secondary/50 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl"
            onClick={() => setShowVideoModal(true)}
          >
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute -top-4 -left-4 w-8 h-8 bg-secondary/30 rounded-full blur-sm"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3] 
                }}
                transition={{ duration: 3, repeat: 9999 }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent/30 rounded-full blur-sm"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4] 
                }}
                transition={{ duration: 2.5, repeat: 9999, delay: 1 }}
              />
            </div>

            <div className="relative p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center group-hover:from-secondary/40 group-hover:to-accent/40 transition-all duration-300">
                  {/* Glow effect behind play button */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <Play className="w-6 h-6 text-secondary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-1">
                    Watch the NFT Showcase
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    See how NFTs evolve and gain power through gameplay
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: 9999, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-2 group-hover:text-accent transition-all duration-300" />
              </motion.div>
            </div>
            
            {/* Enhanced hover effect with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Card>
        </motion.div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowVideoModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Video */}
                <iframe 
                  src="https://streamable.com/e/qbznws"
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="NFT Evolution Demo"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Elegant NFT CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-xl border border-secondary/20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,119,198,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.3),transparent_50%)]" />
            </div>
            
            {/* Floating NFT Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-1/3 left-1/5 w-2 h-2 bg-secondary/40 rounded-full"
                animate={{ 
                  y: [-8, 8, -8],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: 9999 }}
              />
              <motion.div 
                className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-accent/40 rounded-full"
                animate={{ 
                  y: [8, -8, 8],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: 9999, delay: 1.5 }}
              />
              <motion.div 
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/40 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 2, repeat: 9999, delay: 0.5 }}
              />
            </div>

            <div className="relative p-12">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-secondary/20 border border-secondary/30">
                      <Sparkles className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="p-2 rounded-full bg-accent/20 border border-accent/30">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div className="p-2 rounded-full bg-primary/20 border border-primary/30">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-secondary">
                  Collect, Evolve, Dominate
                </h3>

                {/* Subtitle */}
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Own unique NFTs that grow stronger with every victory. Each iteration brings new powers, exclusive rewards, and enhanced gaming capabilities.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                    <Sparkles className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h4 className="font-semibold text-secondary mb-2">Evolution System</h4>
                    <p className="text-sm text-muted-foreground">NFTs gain power through gameplay</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/20">
                    <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="font-semibold text-accent mb-2">Unique Abilities</h4>
                    <p className="text-sm text-muted-foreground">Unlock special gaming bonuses</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-primary mb-2">Rare Traits</h4>
                    <p className="text-sm text-muted-foreground">Collect limited edition properties</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Button size="lg" asChild className="group relative overflow-hidden px-8 py-4 text-lg font-semibold bg-gradient-to-r from-secondary via-accent to-secondary hover:from-secondary/90 hover:via-accent/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-500">
                    <Link href="/nfts">
                      <span className="relative z-10 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Explore NFT Collection
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>
                  </Button>
                </div>

                {/* Small text */}
                <p className="text-xs text-muted-foreground/60 mt-4">
                  Free minting • Evolution through gameplay • Cross-game compatibility
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}