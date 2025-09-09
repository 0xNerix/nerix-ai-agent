"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NFTCard } from "@/components/landing/nft/nft-card";
import { NFTStats } from "@/components/landing/nft/nft-stats";
import { NFTFeatures } from "@/components/landing/nft/nft-features";
import { ChevronLeft, ChevronRight, InboxIcon } from "lucide-react";
import { nfts } from "@/data/nfts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NFTSection() {
  // Maximum iteration number that can be viewed (not the current active iteration)
  const MAX_VIEWABLE_ITERATION = 1000;
  // Current active iteration is 1 - only iteration 1 has actual NFTs
  const [currentIteration, setCurrentIteration] = useState(1);

  // Filter NFTs for current iteration
  const currentNFTs = nfts.filter((nft) => nft.iteration === currentIteration);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-secondary/15 via-secondary/20 to-secondary/10">
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

        <NFTStats />

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group mt-16"
        >
          <Card className="relative overflow-hidden backdrop-blur-sm bg-background/50 border border-primary/20 shadow-2xl">
            {/* Responsive Video Container */}
            <div 
              className="relative w-full aspect-video bg-black/90"
            >
              {/* Streamable Iframe - Fully Responsive */}
              <iframe 
                src="https://streamable.com/e/qbznws"
                className="absolute inset-0 w-full h-full"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: 'inherit'
                }}
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            </div>
          </Card>
        </motion.div>
        {/* NFT Features */}
        <div className="mt-16">
          <NFTFeatures />
        </div>
      </div>
    </section>
  );
}
