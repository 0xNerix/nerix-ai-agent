"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, ArrowRight, Timer, Clock, Lock, ExternalLink, Check } from "lucide-react";
import { getNFTTierColors, getNFTTypeIcon } from "@/lib/utils/nft-utils";
import { NFT } from "@/types/nft";
import { calculateIterationBonus, nfts } from "@/data/nfts";
import { useState } from "react";
import { NFTDetailDialog } from "./nft-detail-dialog";
import Image from "next/image";

interface NFTCardProps {
  nft: NFT;
  currentIteration: number;
}

const getBonusLabel = (bonusType: string) => {
  switch (bonusType) {
    case 'message_limit':
      return 'Message Limit';
    case 'fee_reduction':
      return 'Fee Reduction';
    case 'context_message_limit':
      return 'Context Message Limit';
    default:
      return bonusType;
  }
};

export function NFTCard({ nft, currentIteration }: NFTCardProps) {
  const [showDetail, setShowDetail] = useState(false);


  // Get current active iteration from NFTs data
  const CURRENT_ACTIVE_ITERATION = Math.max(...nfts.map(nft => nft.iteration));
  
  // Calculate legacy bonus based on current active iteration
  const iterationBonus = calculateIterationBonus(CURRENT_ACTIVE_ITERATION, nft.iteration);
  const legacyBonusPercentage = ((iterationBonus - 1) * 100).toFixed(0);
  const hasLegacyBonus = iterationBonus > 1;

  // Calculate NFT age based on current active iteration
  const nftAge = CURRENT_ACTIVE_ITERATION - nft.iteration;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card 
          className={`group relative h-full overflow-hidden backdrop-blur-[2px] bg-background/10 border-white/5
            transition-all duration-500 hover:backdrop-blur-[8px] hover:bg-background/20 flex flex-col cursor-pointer ${
              !nft.isLocked ? 'bg-emerald-500/5' : ''
            }`}
          onClick={() => setShowDetail(true)}
        >
          {/* NFT Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={nft.image}
              alt={nft.name}
              fill
              className="w-full h-full object-cover"
            />
            
            {/* Locked Overlay */}
            {nft.isLocked && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Badge 
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm border-destructive text-destructive py-2 px-3"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  <span className="text-base">Locked</span>
                </Badge>
              </div>
            )}
            
            {/* Type Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge 
                className="bg-background/80 backdrop-blur-sm border-primary/20"
              >
                <div className="flex items-center gap-1">
                  {getNFTTypeIcon(nft.type, "w-4 h-4")}
                  <span className="capitalize">{nft.type}</span>
                </div>
              </Badge>
              {nft.isLocked ? (
                <Badge 
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm border-destructive text-destructive"
                >
                  <Lock className="w-3 h-3 mr-1" />
                  Locked
                </Badge>
              ) : (
                <Badge 
                  className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Owned
                </Badge>
              )}
            </div>

            {/* Tier Badge */}
            <Badge 
              className={`absolute top-3 right-3 backdrop-blur-sm border-0 bg-gradient-to-r ${getNFTTierColors(nft.tier)}`}
            >
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span className="capitalize">{nft.tier}</span>
              </div>
            </Badge>

            {/* NFT Age Badge */}
            {nftAge > 0 && (
              <Badge 
                className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm border-primary/20"
              >
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{nftAge} iteration{nftAge > 1 ? 's' : ''} old</span>
                </div>
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold truncate">{nft.name}</h3>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">#{nft.iteration}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{nft.description}</p>

            {/* Base Bonuses */}
            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Base Values */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-primary" />
                    <h4 className="font-medium text-sm">Base Bonuses</h4>
                  </div>
                  {nft.bonuses.map((bonus, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground text-xs">
                        {getBonusLabel(bonus.type)}
                      </span>
                      <span className="font-medium text-primary text-xs">
                        {bonus.type === 'special_tools' ? 'Enabled' : 
                         `+${bonus.value}${bonus.type === 'fee_reduction' ? '%' : ''}`}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Legacy Bonus */}
                {hasLegacyBonus && (
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-4 h-4 text-emerald-500" />
                      <h4 className="font-medium text-sm text-emerald-500">Legacy Bonus (+{legacyBonusPercentage}%)</h4>
                    </div>
                    {nft.bonuses.map((bonus, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-emerald-500/70 text-xs">
                          {getBonusLabel(bonus.type)}
                        </span>
                        <span className="font-medium text-emerald-500 text-xs">
                          {bonus.type === 'special_tools' ? 'Enhanced' : 
                           `+${Math.round(bonus.value * (iterationBonus - 1))}${bonus.type === 'fee_reduction' ? '%' : ''}`}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Total Values */}
                {hasLegacyBonus && (
                  <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/10 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      <h4 className="font-medium text-sm">Total Values</h4>
                    </div>
                    {nft.bonuses.map((bonus, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground text-xs">
                          {getBonusLabel(bonus.type)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-muted-foreground line-through text-xs">
                            {bonus.type === 'special_tools' ? 'Basic' : 
                             `+${bonus.value}${bonus.type === 'fee_reduction' ? '%' : ''}`}
                          </span>
                          <ArrowRight className="w-3 h-3 text-secondary" />
                          <span className="font-medium text-secondary text-xs">
                            {bonus.type === 'special_tools' ? 'Enhanced+' : 
                             `+${Math.round(bonus.value * iterationBonus)}${bonus.type === 'fee_reduction'? '%' : ''}`}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* OpenSea Link */}
            {/* {nft.isLocked && (
              <Button 
                variant="destructive" 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(nft.openSeaLink, '_blank');
                }}
                className="w-full group"
              >
                <Lock className="w-4 h-4 mr-2" />
                View on OpenSea
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            )} */}
          </div>
        </Card>
      </motion.div>

      <NFTDetailDialog
        nft={nft}
        currentIteration={CURRENT_ACTIVE_ITERATION}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}