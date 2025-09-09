"use client";

import { motion } from "framer-motion";
import { Brain, Coins, MessageCircle, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { getNFTTierColors, getNFTTypeIcon } from "@/lib/utils/nft-utils";
import { UINFT } from "@/lib/hooks/use-user-nfts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NFTListProps {
  nfts: UINFT[];
}

export function NFTList({ nfts }: NFTListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(nfts.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNFTs = nfts.slice(startIndex, endIndex);


  return (
    <div className="space-y-4">
      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentNFTs.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getNFTTierColors(nft.tier as any, true)} group hover:scale-[1.02] transition-all duration-300`}
          >
            {/* NFT Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Type Badge */}
              <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                {getNFTTypeIcon(nft.type as any)}
                <span className="text-[10px] font-medium capitalize">{nft.type}</span>
              </div>

              {/* Tier Badge */}
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span className="text-[10px] font-medium capitalize">{nft.tier}</span>
              </div>
            </div>

            {/* NFT Info */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold truncate">{nft.name}</h4>
                <div className="px-1.5 py-0.5 rounded bg-background/50 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] font-medium">#{nft.iteration}</span>
                </div>
              </div>

              {/* Bonuses */}
              <div className="space-y-1.5">
                {nft.bonuses.map((bonus, i) => (
                  <div key={i} className="space-y-1">
                    {/* Base Bonus */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-background/50 backdrop-blur-sm flex items-center justify-center">
                        {bonus.type === 'message_limit' ? (
                          <MessageCircle className="w-3 h-3" />
                        ) : bonus.type === 'fee_reduction' ? (
                          <Coins className="w-3 h-3" />
                        ) : (
                          <Brain className="w-3 h-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-medium">
                          {bonus.type === 'fee_reduction' ? 
                            `${bonus.baseValue}% fee reduction` :
                            `+${bonus.baseValue} ${bonus.type.replace('_', ' ')}`
                          }
                        </div>
                        {bonus.legacyValue > 0 && (
                          <motion.div 
                            className="text-[9px] text-amber-600 flex items-center gap-1"
                            animate={{
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: 9999,
                              ease: "easeInOut"
                            }}
                          >
                            <Sparkles className="w-2 h-2" />
                            +{bonus.legacyValue}{bonus.type === 'fee_reduction' ? '%' : ''} legacy
                          </motion.div>
                        )}
                      </div>
                      <motion.div 
                        className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: 9999,
                          ease: "easeInOut"
                        }}
                      >
                        {bonus.type === 'fee_reduction' ? 
                          `${bonus.totalValue}%` :
                          `+${bonus.totalValue}`
                        }
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}