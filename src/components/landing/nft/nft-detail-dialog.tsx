"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { NFT } from "@/types/nft";
import { Sparkles, Brain, ArrowRight, Timer, Lock, Check } from "lucide-react";
import { getNFTTierColors, getNFTTypeIcon } from "@/lib/utils/nft-utils";
import { calculateIterationBonus } from "@/data/nfts";
import Image from "next/image";

interface NFTDetailDialogProps {
  nft: NFT;
  currentIteration: number;
  isOpen: boolean;
  onClose: () => void;
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

export function NFTDetailDialog({ nft, currentIteration, isOpen, onClose }: NFTDetailDialogProps) {

  // Calculate legacy bonus
  const iterationBonus = calculateIterationBonus(currentIteration, nft.iteration);
  const legacyBonusPercentage = ((iterationBonus - 1) * 100).toFixed(0);
  const hasLegacyBonus = iterationBonus > 1;

  // OpenSea link
  const openSeaLink = `https://opensea.io/assets/ethereum/nerix/${nft.id}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background">
        <div className="flex gap-8">
          {/* Left Column - Image */}
          <div className="w-2/5 flex-shrink-0">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
                <Badge className="w-full justify-center bg-background backdrop-blur-sm border-primary/20 py-1.5">
                  <div className="flex items-center gap-2">
                    {getNFTTypeIcon(nft.type, "w-4 h-4")}
                    <span className="capitalize text-sm">{nft.type}</span>
                  </div>
                </Badge>
                <Badge className={`w-full justify-center backdrop-blur-sm border-0 bg-gradient-to-r ${getNFTTierColors(nft.tier)} py-1.5`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="capitalize text-sm">{nft.tier}</span>
                  </div>
                </Badge>
                {nft.isLocked ? (
                  <Badge 
                    variant="outline"
                    className="w-full justify-center bg-background/80 backdrop-blur-sm border-destructive text-destructive py-1.5"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    <span className="text-sm">Locked</span>
                  </Badge>
                ) : (
                  <Badge 
                    className="w-full justify-center bg-emerald-500/20 text-emerald-500 border-emerald-500/30 py-1.5"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    <span className="text-sm">Owned</span>
                  </Badge>
                )}
              </div>
            </div>

            {/* OpenSea Button */}
            {/* {nft.isLocked && (
              <Button 
                variant="destructive" 
                onClick={() => window.open(openSeaLink, '_blank')}
                className="w-full mt-4 py-6 group text-base"
              >
                <Lock className="w-5 h-5 mr-2" />
                View on OpenSea
                <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            )} */}
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold mb-2">{nft.name}</h2>
              <p className="text-base text-muted-foreground">{nft.description}</p>
            </div>

            {/* Base Bonuses */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-primary" />
                <h4 className="text-base font-medium">Base Bonuses</h4>
              </div>
              <div className="space-y-2">
                {nft.bonuses.map((bonus, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      {getBonusLabel(bonus.type)}
                    </span>
                    <span className="font-medium text-primary text-sm">
                      {bonus.type === 'special_tools' ? 'Enabled' : 
                       `${bonus.value}${bonus.type === 'fee_reduction' ? '%' : ''}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legacy Bonus */}
            {hasLegacyBonus && (
              <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-3">
                  <Timer className="w-5 h-5 text-emerald-500" />
                  <h4 className="text-base font-medium text-emerald-500">Legacy Bonus (+{legacyBonusPercentage}%)</h4>
                </div>
                <div className="space-y-2">
                  {nft.bonuses.map((bonus, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-emerald-500/70 text-sm">
                        {getBonusLabel(bonus.type)}
                      </span>
                      <span className="font-medium text-emerald-500 text-sm">
                        {bonus.type === 'special_tools' ? 'Enhanced' : 
                         `+${Math.round(bonus.value * (iterationBonus - 1))}${bonus.type === 'fee_reduction' ? '%' : ''}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total Values */}
            {hasLegacyBonus && (
              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h4 className="text-base font-medium">Total Values</h4>
                </div>
                <div className="space-y-2">
                  {nft.bonuses.map((bonus, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        {getBonusLabel(bonus.type)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground line-through text-sm">
                          {bonus.type === 'special_tools' ? 'Basic' : 
                           `${bonus.value}${bonus.type === 'fee_reduction' ? '%' : ''}`}
                        </span>
                        <ArrowRight className="w-4 h-4 text-secondary" />
                        <span className="font-medium text-secondary text-sm">
                          {bonus.type === 'special_tools' ? 'Enhanced+' : 
                           `${Math.round(bonus.value * iterationBonus)}${bonus.type === 'fee_reduction' ? '%' : ''}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Iteration Info */}
            <div className="pt-3 border-t border-primary/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Iteration</span>
                <span className="font-medium">#{nft.iteration}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}