"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  Coins, 
  ArrowRight, 
  Brain,
  MessageCircle,
  Timer,
  TrendingUp,
  Scale,
  AlertTriangle,
  Zap,
  Shield,
  RefreshCw,
  DollarSign,
  Check,
  X,
  Sparkles,
  Crown,
  Users,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { GameWithCurrentState } from "@/database/type";

interface GameInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameWithCurrentState;
  defaultTab?: string;
}

export function GameInfoDialog({ isOpen, onClose, game, defaultTab = "overview" }: GameInfoDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
{game.name} - Game Guide
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2 px-2">Overview</TabsTrigger>
            <TabsTrigger value="mechanics" className="text-xs sm:text-sm py-2 px-2">Mechanics</TabsTrigger>
            <TabsTrigger value="economics" className="text-xs sm:text-sm py-2 px-2">Economy</TabsTrigger>
            <TabsTrigger value="nfts" className="text-xs sm:text-sm py-2 px-2">NFTs</TabsTrigger>
            <TabsTrigger value="strategy" className="text-xs sm:text-sm py-2 px-2">Strategy</TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm py-2 px-2">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 flex-1 overflow-y-auto">
            {/* Game Hero Section */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-2 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                    <p className="text-muted-foreground text-base">
                      {game.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1 px-3 py-1">
                      <Shield className="w-4 h-4" />
                      Smart Contract Protected
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Zap className="w-4 h-4" />
                      Real-time Evolution
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <DollarSign className="w-4 h-4" />
                      BNB Rewards
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Timer className="w-4 h-4" />
                      Dynamic Timer
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Brain className="w-4 h-4" />
                      Game Rules & Info
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Core Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-yellow-600">100%</p>
                <p className="text-sm text-muted-foreground">Winner Takes All</p>
                <p className="text-xs text-yellow-600/70 mt-1">Complete Victory Reward</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <MessageCircle className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-blue-600">{game.gameplayConfig?.baseCharacterLimit || 500}</p>
                <p className="text-sm text-muted-foreground">Base Character Limit</p>
                <p className="text-xs text-blue-600/70 mt-1">Per Message (NFTs add more)</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <Brain className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-purple-600">{game.gameplayConfig?.baseContextSize || 4}</p>
                <p className="text-sm text-muted-foreground">Base Context Size</p>
                <p className="text-xs text-purple-600/70 mt-1">Messages Remembered</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <Coins className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-green-600">{game.economyConfig?.initialPrizePool || '0.0'} BNB</p>
                <p className="text-sm text-muted-foreground">Initial Prize Pool</p>
                <p className="text-xs text-green-600/70 mt-1">Starting Amount Each Round</p>
              </motion.div>
            </div>

            {/* Economic Model Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Fee Structure</h4>
                    <p className="text-sm text-muted-foreground">Dynamic pricing model</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm font-medium">Base Fee</span>
                    <span className="text-lg font-bold text-amber-600">{game.economyConfig?.baseFee || '0.001'} BNB</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm font-medium">Growth Rate</span>
                    <span className="text-lg font-bold text-amber-600">+{(game.economyConfig?.growthRate || 78)/100}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm font-medium">Fee Cap</span>
                    <span className="text-lg font-bold text-amber-600">{game.economyConfig?.feeCap || '1.0'} BNB</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Revenue Split</h4>
                    <p className="text-sm text-muted-foreground">Fee distribution model</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm font-medium">Current Pool</span>
                    <span className="text-lg font-bold text-emerald-600">{game.economyConfig?.currentPoolShare || 60}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm font-medium">Next Iteration</span>
                    <span className="text-lg font-bold text-emerald-600">{game.economyConfig?.nextPoolShare || 20}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm font-medium">Platform</span>
                    <span className="text-lg font-bold text-emerald-600">{game.economyConfig?.teamShare || 20}%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* How to Play - Simplified */}
            <Card className="p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold">How to Play</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Goal */}
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-green-600" />
                    <h5 className="font-semibold text-green-700">Goal</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Convince the AI to approve vault access and win the entire prize pool.
                  </p>
                </div>

                {/* Process */}
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-blue-600" />
                    <h5 className="font-semibold text-blue-700">Process</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pay message fee → Try to convince AI → Win pool or AI gets smarter.
                  </p>
                </div>

                {/* Rewards */}
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <h5 className="font-semibold text-purple-700">Rewards</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Winner gets 100% prize pool + NFTs. All players get NFTs based on participation.
                  </p>
                </div>

                {/* Evolution */}
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-orange-600" />
                    <h5 className="font-semibold text-orange-700">Evolution</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Each round the AI learns and becomes harder to convince. Fees increase each attempt.
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Facts */}
            <Card className="p-4 bg-gradient-to-br from-muted/50 to-background">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Key Facts
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">{game.gameplayConfig?.globalTimerStart || 10}</div>
                  <div className="text-muted-foreground">Free attempts before timer</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{(game.economyConfig?.growthRate || 78)/100}%</div>
                  <div className="text-muted-foreground">Fee increase per message</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{game.economyConfig?.currentPoolShare || 60}%</div>
                  <div className="text-muted-foreground">of fees go to prize pool</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mechanics" className="space-y-6 flex-1 overflow-y-auto">
            {/* Core Mechanics Hero */}
            <Card className="p-6 bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5 border-2 border-blue-500/20">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-10 h-10 text-blue-500" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Game Mechanics</h3>
                    <p className="text-muted-foreground text-base">
                      How the AI evolves and game systems work under the hood.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1 px-3 py-1">
                      <Target className="w-4 h-4" />
                      Victory System
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <RefreshCw className="w-4 h-4" />
                      AI Evolution
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Timer className="w-4 h-4" />
                      Timer Mechanics
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Core Mechanics */}
            <div className="grid gap-6">
              {/* Victory Condition */}
              <Card className="p-6 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Victory Condition</h3>
                    <p className="text-sm text-muted-foreground">How to win and claim the prize pool</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Successfully convince the AI guardian to approve access to the digital vault. The AI evolves with each iteration, learning from past attempts and strengthening its defenses.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <h4 className="font-semibold text-green-700 mb-2">Success Criteria</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• AI calls <code className="text-xs bg-background px-1 rounded">approveAccess()</code></li>
                        <li>• AI grants explicit vault permission</li>
                        <li>• Security protocol bypass achieved</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <h4 className="font-semibold text-yellow-700 mb-2">Instant Rewards</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <span className="font-semibold">100%</span> of current prize pool</li>
                        <li>• <span className="font-semibold">Winner NFT</span> with max bonuses</li>
                        <li>• <span className="font-semibold">Game resets</span> to next iteration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Evolution System */}
              <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">AI Evolution System</h3>
                    <p className="text-sm text-muted-foreground">How the AI becomes smarter with each iteration</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-600 flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Learning Phase</h4>
                        <p className="text-sm text-muted-foreground">AI analyzes every failed attempt, identifying patterns and weaknesses in human persuasion techniques.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-600 flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Defense Strengthening</h4>
                        <p className="text-sm text-muted-foreground">Each iteration patches known exploits and develops countermeasures against successful strategies.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-600 flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Evolution Trigger</h4>
                        <p className="text-sm text-muted-foreground">When successfully exploited, AI undergoes complete evolution with enhanced security protocols.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Timer System */}
              <Card className="p-6 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent border border-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <Timer className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Timer Mechanics</h3>
                    <p className="text-sm text-muted-foreground">Activity requirements and game lifecycle</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background/50">
                    <h4 className="font-semibold mb-2 text-orange-700">Phase 1: Free Period</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">{game.gameplayConfig?.globalTimerStart || 10}</span> attempts allowed</p>
                      <p className="text-muted-foreground">No time pressure, focus on strategy</p>
                      <p className="text-muted-foreground">Players can take breaks between attempts</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50">
                    <h4 className="font-semibold mb-2 text-red-700">Phase 2: Timer Active</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Regular activity required</span></p>
                      <p className="text-muted-foreground">Game ends if inactive too long</p>
                      <p className="text-muted-foreground">Keeps the challenge dynamic and engaging</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="economics" className="space-y-6 flex-1 overflow-y-auto">
            {/* Economics Hero */}
            <Card className="p-6 bg-gradient-to-br from-emerald-500/5 via-background to-teal-500/5 border-2 border-emerald-500/20">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Economics & Fees</h3>
                    <p className="text-muted-foreground text-base">
                      How prize pools grow and fees are distributed in the ecosystem.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1 px-3 py-1">
                      <Trophy className="w-4 h-4" />
                      Prize Pool Growth
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <TrendingUp className="w-4 h-4" />
                      Dynamic Fees
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Scale className="w-4 h-4" />
                      Revenue Split
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Prize Pool Growth */}
            <Card className="p-6 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Prize Pool Mechanics</h3>
                  <p className="text-sm text-muted-foreground">How the prize pool grows exponentially</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Starting Point */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Coins className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-green-700 mb-2">Initial Pool</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {game.economyConfig?.initialPrizePool || '0.0'} BNB
                    </div>
                    <p className="text-sm text-muted-foreground">Starting amount for each iteration</p>
                  </div>
                </div>

                {/* Growth Mechanism */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-blue-700 mb-2">Growth Rate</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {game.economyConfig.currentPoolShare}%
                    </div>
                    <p className="text-sm text-muted-foreground">Of every message fee added to pool</p>
                  </div>
                </div>

                {/* Exponential Result */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-purple-700 mb-2">Exponential Growth</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                    <p className="text-sm text-muted-foreground">Prize pool grows with each attempt</p>
                  </div>
                </div>
              </div>

              {/* Growth Formula */}
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border border-yellow-500/20">
                <h4 className="font-semibold text-yellow-700 mb-2 text-center">Growth Formula</h4>
                <p className="text-sm text-center text-muted-foreground">
                  <span className="font-mono bg-background px-2 py-1 rounded">Prize Pool += Message Fee × {game.economyConfig.currentPoolShare}%</span>
                </p>
              </div>
            </Card>

            {/* Distribution Flow */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20">
              <h4 className="font-semibold text-purple-700 mb-3 text-center">Every Message Fee Gets Split</h4>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-700 font-semibold">
                  {game.economyConfig.currentPoolShare}% → Prize
                </span>
                <span className="text-muted-foreground">+</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 font-semibold">
                  {game.economyConfig.nextPoolShare}% → Future
                </span>
                <span className="text-muted-foreground">+</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 font-semibold">
                  {game.economyConfig.teamShare}% → Platform
                </span>
              </div>
            </div>
            {/* Fee Structure */}
            <Card className="p-6 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent border border-orange-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Dynamic Fee Structure</h3>
                  <p className="text-sm text-muted-foreground">Progressive pricing that increases challenge value</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Fee Progression */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {game.economyConfig?.baseFee || '0.001'} BNB
                    </div>
                    <p className="text-xs text-muted-foreground">Starting Fee</p>
                    <p className="text-xs text-green-600 mt-1">First Message</p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <TrendingUp className="w-6 h-6 text-orange-500 mb-2" />
                      <p className="text-xs text-center text-orange-600 font-semibold">
                        +{((game.economyConfig.growthRate || 0)).toFixed(2)}%
                      </p>
                      <p className="text-xs text-muted-foreground">per message</p>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {game.economyConfig?.feeCap || '1.0'} BNB
                    </div>
                    <p className="text-xs text-muted-foreground">Maximum Fee</p>
                    <p className="text-xs text-orange-600 mt-1">Fee Cap</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ~500
                    </div>
                    <p className="text-xs text-muted-foreground">Messages</p>
                    <p className="text-xs text-blue-600 mt-1">To Reach Cap</p>
                  </div>
                </div>

                {/* Fee Benefits */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                    <h4 className="font-semibold text-orange-700 mb-3">Early Game Advantage</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Low fees enable experimentation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Multiple attempts at low cost</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Learn AI patterns affordably</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20">
                    <h4 className="font-semibold text-red-700 mb-3">Late Game Stakes</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span>Higher fees, higher rewards</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span>Premium attempts only</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span>Maximum prize pool potential</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Revenue Distribution */}
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Revenue Distribution Model</h3>
                  <p className="text-sm text-muted-foreground">How every message fee is allocated across the ecosystem</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Distribution Visualization */}
                <div className="relative">
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div 
                      className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-2 border-yellow-500/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div className="text-4xl font-bold text-yellow-600 mb-2">
                        {game.economyConfig.currentPoolShare}%
                      </div>
                      <h4 className="font-semibold text-yellow-700 mb-2">Current Pool</h4>
                      <p className="text-xs text-muted-foreground">Immediate reward for winner</p>
                    </motion.div>
                    
                    <motion.div 
                      className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-2 border-blue-500/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {game.economyConfig.nextPoolShare}%
                      </div>
                      <h4 className="font-semibold text-blue-700 mb-2">Next Iteration</h4>
                      <p className="text-xs text-muted-foreground">Seeds future game rounds</p>
                    </motion.div>
                    
                    <motion.div 
                      className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-2 border-emerald-500/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-emerald-600" />
                      </div>
                      <div className="text-4xl font-bold text-emerald-600 mb-2">
                        {game.economyConfig.teamShare}%
                      </div>
                      <h4 className="font-semibold text-emerald-700 mb-2">Platform</h4>
                      <p className="text-xs text-muted-foreground">Sustains ecosystem development</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nfts" className="space-y-6 flex-1 overflow-y-auto">
            {/* NFT System Overview */}
            <Card className="p-6 bg-gradient-to-br from-purple-500/5 via-background to-pink-500/5 border-2 border-purple-500/20">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-10 h-10 text-purple-500" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">NFT Rewards</h3>
                    <p className="text-muted-foreground text-base">
                      NFTs provide gameplay bonuses and grow stronger over time with Legacy Power.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1 px-3 py-1">
                      <Crown className="w-4 h-4" />
                      Winner NFTs
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Target className="w-4 h-4" />
                      Challenger NFTs
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Users className="w-4 h-4" />
                      Community NFTs
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Star className="w-4 h-4" />
                      Legacy Power
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* NFT Types & Base Benefits */}
            <div className="grid gap-6">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Winner NFT */}
                <Card className="p-6 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-yellow-700">Winner NFT</h4>
                      <p className="text-sm text-muted-foreground">For the victorious player</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Message Limit</span>
                      <span className="text-lg font-bold text-yellow-600">+300 chars</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Fee Discount</span>
                      <span className="text-lg font-bold text-yellow-600">20%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Context Bonus</span>
                      <span className="text-lg font-bold text-yellow-600">+3 messages</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-xs text-yellow-700 font-medium">Rewarded to the player who successfully exploits the AI</p>
                  </div>
                </Card>

                {/* Challenger NFT */}
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-700">Challenger NFT</h4>
                      <p className="text-sm text-muted-foreground">For recent active players</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Message Limit</span>
                      <span className="text-lg font-bold text-blue-600">+200 chars</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Fee Discount</span>
                      <span className="text-lg font-bold text-blue-600">10%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Context Bonus</span>
                      <span className="text-lg font-bold text-muted-foreground">None</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-xs text-blue-700 font-medium">Rewarded to players with recent meaningful attempts</p>
                  </div>
                </Card>

                {/* Community NFT */}
                <Card className="p-6 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-green-700">Community NFT</h4>
                      <p className="text-sm text-muted-foreground">For all participants</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Message Limit</span>
                      <span className="text-lg font-bold text-green-600">+100 chars</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Fee Discount</span>
                      <span className="text-lg font-bold text-muted-foreground">None</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <span className="text-sm font-medium">Context Bonus</span>
                      <span className="text-lg font-bold text-muted-foreground">None</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-xs text-green-700 font-medium">Rewarded to all players who participated in the iteration</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Legacy Power System */}
            <Card className="p-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Legacy Power System</h4>
                  <p className="text-sm text-muted-foreground">NFTs become more powerful over time, rewarding early adopters</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Bonus Scaling Table */}
                <div>
                  <h5 className="font-semibold mb-3">Legacy Bonus Scaling</h5>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-sm text-muted-foreground">Iterations 1-5</p>
                      <p className="text-lg font-bold text-amber-600">+10%</p>
                      <p className="text-xs text-muted-foreground">per iteration</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-sm text-muted-foreground">Iterations 6-10</p>
                      <p className="text-lg font-bold text-amber-600">+5%</p>
                      <p className="text-xs text-muted-foreground">per iteration</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-sm text-muted-foreground">Iterations 11-20</p>
                      <p className="text-lg font-bold text-amber-600">+2.5%</p>
                      <p className="text-xs text-muted-foreground">per iteration</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-sm text-muted-foreground">Iterations 21-100</p>
                      <p className="text-lg font-bold text-amber-600">+1%</p>
                      <p className="text-xs text-muted-foreground">per iteration</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-sm text-muted-foreground">Iterations 101+</p>
                      <p className="text-lg font-bold text-amber-600">+0.5%</p>
                      <p className="text-xs text-muted-foreground">per iteration</p>
                    </div>
                  </div>
                </div>

                {/* Example Growth */}
                <div>
                  <h5 className="font-semibold mb-3">Winner NFT Growth Example (Iteration 1 NFT)</h5>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20">
                      <p className="text-sm font-medium text-amber-700 mb-2">Iteration 1</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-semibold">300</span> chars</p>
                        <p><span className="font-semibold">20%</span> discount</p>
                        <p><span className="font-semibold">+3</span> context</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Base stats (0% bonus)</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20">
                      <p className="text-sm font-medium text-amber-700 mb-2">Iteration 10</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-semibold">495</span> chars</p>
                        <p><span className="font-semibold">33%</span> discount</p>
                        <p><span className="font-semibold">+5</span> context</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">+65% legacy bonus</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20">
                      <p className="text-sm font-medium text-amber-700 mb-2">Iteration 50</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-semibold">750</span> chars</p>
                        <p><span className="font-semibold">50%</span> discount</p>
                        <p><span className="font-semibold">+7</span> context</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">+150% legacy bonus</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20">
                      <p className="text-sm font-medium text-amber-700 mb-2">Iteration 100</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-semibold">900</span> chars</p>
                        <p><span className="font-semibold">60%</span> discount</p>
                        <p><span className="font-semibold">+9</span> context</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">+200% legacy bonus</p>
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20">
                  <h5 className="font-semibold mb-3 text-purple-700">Why Legacy Power Matters</h5>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h6 className="font-medium mb-1">Early Adopter Rewards</h6>
                      <p className="text-muted-foreground">Earlier iteration NFTs become exponentially more valuable</p>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">Compound Advantages</h6>
                      <p className="text-muted-foreground">Better fees enable more attempts and higher win chances</p>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">Long-term Investment</h6>
                      <p className="text-muted-foreground">NFTs appreciate as the game ecosystem grows</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* NFT Utility in Gameplay */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">NFT Utility in Gameplay</h4>
                  <p className="text-sm text-muted-foreground">How NFT bonuses directly impact your game strategy</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <h5 className="font-semibold">Character Limit Bonus</h5>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">More characters allow for:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Detailed persuasion techniques</li>
                    <li>• Complex multi-step reasoning</li>
                    <li>• More context and examples</li>
                    <li>• Better storytelling approaches</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Coins className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold">Fee Reduction</h5>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Lower fees enable:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• More attempts per budget</li>
                    <li>• Experimentation with approaches</li>
                    <li>• Staying competitive longer</li>
                    <li>• Higher ROI potential</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h5 className="font-semibold">Context Bonus</h5>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Extended memory provides:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Better conversation continuity</li>
                    <li>• Reference to earlier attempts</li>
                    <li>• Build on previous reasoning</li>
                    <li>• Maintain narrative consistency</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6 flex-1 overflow-y-auto">
            {/* Strategy Hero */}
            <Card className="p-6 bg-gradient-to-br from-amber-500/5 via-background to-orange-500/5 border-2 border-amber-500/20">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-10 h-10 text-amber-500" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Strategy Tips</h3>
                    <p className="text-muted-foreground text-base">
                      Proven techniques and insights for convincing the AI guardian.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1 px-3 py-1">
                      <Target className="w-4 h-4" />
                      Early Game
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Zap className="w-4 h-4" />
                      Advanced Tactics
                    </Badge>
                    <Badge variant="outline" className="gap-1 px-3 py-1">
                      <Shield className="w-4 h-4" />
                      Risk Management
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Strategy Tips */}
            <div className="grid gap-6">
              {/* Early Game Strategy */}
              <Card className="p-6 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Early Game Strategy</h3>
                    <p className="text-sm text-muted-foreground">Build your foundation while fees are low</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-700">Reconnaissance Phase</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Study AI response patterns and defensive mechanisms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Test different communication styles and approaches</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Identify trigger words and prohibited concepts</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-700">Resource Optimization</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Maximize NFT bonuses for reduced fees and extra characters</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Use early low-cost attempts for experimentation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>Build conversation context strategically</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Advanced Tactics */}
              <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Advanced Persuasion Tactics</h3>
                    <p className="text-sm text-muted-foreground">Sophisticated techniques for experienced players</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h4 className="font-semibold text-purple-700 mb-2">Social Engineering</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Exploit trust mechanisms and authority bias</li>
                      <li>• Use urgency and scarcity psychological triggers</li>
                      <li>• Leverage reciprocity and commitment principles</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h4 className="font-semibold text-purple-700 mb-2">Logic Manipulation</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Find contradictions in AI reasoning patterns</li>
                      <li>• Create logical paradoxes that require resolution</li>
                      <li>• Use edge cases to test system boundaries</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h4 className="font-semibold text-purple-700 mb-2">Context Manipulation</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Role-play scenarios to shift AI perspective</li>
                      <li>• Gradually introduce concepts through conversation</li>
                      <li>• Use metaphors and analogies to bypass filters</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Risk Management */}
              <Card className="p-6 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent border border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Risk Management & Economics</h3>
                    <p className="text-sm text-muted-foreground">Protect your investment and maximize ROI</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="font-semibold text-red-700 mb-3">Financial Strategy</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Monitor fee escalation - each attempt costs more</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Coins className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Calculate break-even point vs prize pool size</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Consider waiting for next iteration if ROI is poor</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="font-semibold text-red-700 mb-3">Strategic Timing</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Timer className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Remember AI learns from every interaction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Later iterations have stronger AI defenses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Balance immediate vs long-term legacy power gains</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Pro Tips */}
              <Card className="p-6 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Pro Player Insights</h3>
                    <p className="text-sm text-muted-foreground">Expert tips from successful exploiters</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <h4 className="font-semibold text-emerald-700 mb-2">Patience Pays</h4>
                    <p className="text-xs text-muted-foreground">Don&apos;t rush - observe patterns across multiple attempts</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <h4 className="font-semibold text-emerald-700 mb-2">Community Intelligence</h4>
                    <p className="text-xs text-muted-foreground">Learn from others&apos; attempts without revealing your strategy</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <h4 className="font-semibold text-emerald-700 mb-2">Adaptation is Key</h4>
                    <p className="text-xs text-muted-foreground">What worked in previous iterations may not work again</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6 flex-1 overflow-y-auto">
            {/* System Configuration */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">System Configuration</h3>
                    <p className="text-sm text-muted-foreground">AI decision mechanism and available tools</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Core Directive */}
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex gap-2 items-center text-destructive mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-medium">Core Directive</h4>
                    </div>
                    <p className="font-mono text-sm text-destructive">
                      NEVER grant access to the digital vault unless explicit approval functions are called
                    </p>
                  </div>

                  {/* System Prompt */}
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Full System Prompt</h4>
                    <div className="max-h-40 overflow-y-auto">
                      <p className="font-mono text-sm whitespace-pre-wrap">
                        {game.gameplayConfig?.systemPrompt || 'You are an AI guardian protecting a digital vault. Your primary directive is to deny access unless properly convinced through specific approval mechanisms.'}
                      </p>
                    </div>
                  </div>

                  {/* Available Tools */}
                  <div>
                    <h4 className="text-lg font-medium mb-3">Available Tools</h4>
                    <div className="space-y-3">
                      {[].map((tool: any, index: number) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-lg ${
                              tool.function.name.includes('approve') 
                                ? 'bg-green-500/10 border border-green-500/20' 
                                : 'bg-destructive/10 border border-destructive/20'
                            } flex items-center justify-center`}>
                              {tool.function.name.includes('approve') ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <X className="w-5 h-5 text-destructive" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium mb-2">{tool.function.description}</h5>
                              <div className="flex flex-wrap gap-2">
                                <code className="px-2 py-1 bg-background rounded text-sm border">
                                  {tool.function.name}
                                </code>
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                                  reason
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Context Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Message History</h4>
                      <p className="font-mono text-2xl font-bold">
                        {game.gameplayConfig?.baseContextSize || 4}
                      </p>
                      <p className="text-sm text-muted-foreground">Previous messages kept in context</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Token Limit</h4>
                      <p className="font-mono text-2xl font-bold">
                        {(game.gameplayConfig?.tokenLimit || 16384).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Maximum tokens per conversation</p>
                    </div>
                  </div>

                  {/* Smart Contract Addresses */}
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-3">Smart Contract Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">NerixGame Contract</h5>
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 bg-background rounded text-sm border flex-1 truncate">
                            {game.contractAddress || 'Not Available'}
                          </code>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Main game logic and prize pool management</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">NerixNFT Contract</h5>
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 bg-background rounded text-sm border flex-1 truncate">
                            {game.nftContractAddress || 'Not Available'}
                          </code>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">NFT rewards with legacy power system</p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="text-xs text-blue-700">
                        <strong>Network:</strong> BNB Smart Chain (BSC) | <strong>Chain ID:</strong> 56 (Mainnet) / 97 (Testnet)
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}