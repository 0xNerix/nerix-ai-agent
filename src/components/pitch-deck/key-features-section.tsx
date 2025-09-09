"use client";

import { Card } from "@/components/ui/card";
import { Brain, Coins, Sparkles, Trophy, Users, Star, MessageCircle, Timer, Layers } from "lucide-react";

export function KeyFeaturesSection() {
  return (
    <Card className="p-8 backdrop-blur-sm bg-background/50">
      <h2 className="text-3xl font-bold mb-6 text-center">Key Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Universal AI Compatibility */}
        <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Universal AI Compatibility</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Seamlessly integrates with any AI system including GPT models, Claude, Gemini, Grok, and custom models.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">Multi-model support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">Adaptive AI integration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">Custom model compatibility</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Functional NFT System */}
        <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
          <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Functional NFT System</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              NFTs with real utility that enhance gameplay and provide strategic advantages that grow stronger over time.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Community NFTs</p>
                  <p className="text-xs text-muted-foreground">Awarded to all participants</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Star className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Challenger NFTs</p>
                  <p className="text-xs text-muted-foreground">For top 3 most active players</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Winner NFTs</p>
                  <p className="text-xs text-muted-foreground">Exclusive to iteration winners</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Timer className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Legacy Bonus System</p>
                  <p className="text-xs text-muted-foreground">Early NFTs gain increasing power</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sustainable Economics */}
        <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
            <Coins className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Sustainable Economics</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Self-sustaining economic model with dynamic prize pools and fee structures that ensure long-term platform viability.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Coins className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Dynamic Prize Pools</p>
                  <p className="text-xs text-muted-foreground">Grow with each interaction</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Progressive Fee Structure</p>
                  <p className="text-xs text-muted-foreground">Balanced growth mechanism</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Layers className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Iteration Carryover</p>
                  <p className="text-xs text-muted-foreground">Each game funds the next</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}