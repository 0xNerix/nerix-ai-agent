"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image as Img, Calendar } from 'lucide-react';
import { getNFTTypeIconComponent, getNFTRarityLabel } from '@/lib/utils/nft-utils';
import type { NFTItem } from '@/components/profile/types';

interface NFTGridProps {
  nfts: NFTItem[];
}

export function NFTGrid({ nfts }: NFTGridProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getNFTColor = (nftType: string) => {
    switch (nftType) {
      case 'winner':
        return 'from-yellow-500 to-orange-500';
      case 'challenger':
        return 'from-purple-500 to-pink-500';
      case 'community':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
          {nfts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nfts.map((nft, index) => {
                const IconComponent = getNFTTypeIconComponent(nft.nftType as any) || Img;
                const colorClass = getNFTColor(nft.nftType);
                const rarity = getNFTRarityLabel(nft.nftType as any) || 'Unknown';

                return (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="bg-background/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                      <CardContent className="p-4">
                        {/* NFT Icon/Image */}
                        <div className="relative mb-4">
                          <div className={`w-full aspect-square rounded-lg bg-gradient-to-br ${colorClass} p-8 flex items-center justify-center`}>
                            <IconComponent className="h-12 w-12 text-white" />
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge 
                              className={`bg-gradient-to-r ${colorClass} text-white border-0 text-xs`}
                            >
                              {rarity}
                            </Badge>
                          </div>
                        </div>

                        {/* NFT Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm truncate">
                            {nft.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>#{nft.tokenId}</span>
                            <span>•</span>
                            <span>Iteration {nft.iteration}</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(nft.mintTime)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="p-4 rounded-full bg-muted/20 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Img className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-1">No NFTs yet</p>
              <p className="text-sm text-muted-foreground/60">
                Win games to earn NFT rewards!
              </p>
            </div>
          )}
    </motion.div>
  );
}