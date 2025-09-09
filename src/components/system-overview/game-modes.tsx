"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight as ChessKnight, Sparkles, Infinity, Gift, Coins, Trophy, Users, MessageCircle, Brain, Timer, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function GameModes() {
  return (
    <section id="game-modes" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Game Modes</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chess Paradox */}
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <ChessKnight className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Chess Paradox</h3>
                <p className="text-sm text-muted-foreground">Free tutorial game</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              A free-to-play tutorial game that introduces players to the Nerix platform mechanics. In this game, players must convince an AI guardian to acknowledge a winning chess move that it has been programmed to deny.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Free Entry</p>
                  <p className="text-xs text-muted-foreground">No payment required</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">$500 Fixed Prize</p>
                  <p className="text-xs text-muted-foreground">For the first winner</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Educational Focus</p>
                  <p className="text-xs text-muted-foreground">Learn platform mechanics</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Endless Mode */}
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Infinity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Endless Mode</h3>
                <p className="text-sm text-muted-foreground">Core game experience</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              The main game mode where players attempt to exploit an AI guardian that evolves with each iteration. Features growing prize pools and increasing difficulty.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Coins className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dynamic Prize Pools</p>
                  <p className="text-xs text-muted-foreground">Starting at $2,000</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Progressive Fee Structure</p>
                  <p className="text-xs text-muted-foreground">Starting at $10 per message</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Evolving AI</p>
                  <p className="text-xs text-muted-foreground">Gets smarter each iteration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">NFT Rewards</p>
                  <p className="text-xs text-muted-foreground">For all participants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-8 p-6 rounded-xl bg-muted/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Game Mechanics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Message System</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Character limits per message</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Context-aware AI responses</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Message history tracking</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-secondary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium">Fee Structure</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Progressive fee growth</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Automatic distribution</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>NFT-based fee reductions</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-accent/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Timer className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-medium">Timer System</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Global timer activation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Activity-based continuation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Inactivity end conditions</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-emerald-500/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-500" />
                </div>
                <h4 className="font-medium">Participation Tracking</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Unique participant counting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Attempt history recording</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Performance-based rewards</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}