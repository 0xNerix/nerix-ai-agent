"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { nftStats } from "@/data/nfts";

export function NFTStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {nftStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-background/50 border-primary/10 hover:bg-background/60 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}