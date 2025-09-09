"use client";

import { Card } from "@/components/ui/card";
import { Shield, Target, Brain, ArrowRight, MessageCircle, Coins, Trophy, Users, Sparkles, Check, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function SystemOverview() {
  return (
    <section id="overview" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Platform Overview</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">AI Security Testing Protocol</h3>
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 mb-6">
              <h4 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">Core Concept</h4>
              <p className="text-lg mb-4">
                Nerix transforms AI security testing from a cost center into a <span className="font-bold">profitable, gamified ecosystem</span> where everyone wins:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">For AI Developers</p>
                    <p className="text-muted-foreground">
                      Continuous, crowd-sourced security testing at a fraction of traditional costs, with AI systems that <span className="font-semibold">self-improve after each exploit</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Trophy className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">For Players</p>
                    <p className="text-muted-foreground">
                      Substantial financial rewards for successful exploits, with prize pools that <span className="font-semibold">grow exponentially</span> with each attempt
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Coins className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">For the Ecosystem</p>
                    <p className="text-muted-foreground">
                      A <span className="font-semibold">self-sustaining economic model</span> with multiple revenue streams and exponential growth potential
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-background/40 rounded-lg border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <h5 className="font-semibold">Market Opportunity</h5>
                </div>
                <p className="text-muted-foreground mb-3">
                  As AI systems become more prevalent, the need for robust security testing grows exponentially. Traditional security testing methods are:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-destructive" />
                      <span className="text-sm">Expensive ($100K+ annually)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-destructive" />
                      <span className="text-sm">Limited in scope</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-destructive" />
                      <span className="text-sm">Reactive, not proactive</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm">Nerix is cost-effective</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm">Continuously evolving</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm">Self-funding through gameplay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg mb-6">
              Nerix is a gamified AI security testing protocol built on BNB Chain that incentivizes users to find and exploit vulnerabilities in AI systems, with substantial rewards for successful exploits.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">AI Security Testing</p>
                  <p className="text-sm text-muted-foreground">
                    Similar to bug bounty programs, but specifically designed for AI systems with continuous incentives
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Jailbreak Detection</p>
                  <p className="text-sm text-muted-foreground">
                    Players attempt to bypass AI system prompts and exploit vulnerabilities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Self-Evolving AI</p>
                  <p className="text-sm text-muted-foreground">
                    AI systems that learn from each exploitation attempt and become more secure over time
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="p-6 rounded-xl bg-muted/50">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Game Creation & Setup</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      A new game is created with specific parameters and an initial prize pool.
                    </p>
                    <div className="p-3 rounded-lg bg-background/50 text-xs">
                      <p className="font-medium mb-1">Example Parameters:</p>
                      <p>• Initial Prize Pool: $2,000</p>
                      <p>• Initial Message Fee: $10</p>
                      <p>• Growth Rate: 0.78% per message</p>
                      <p>• Fee Cap: $500</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Player Interaction & Fee Structure</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Players pay a fee to send messages attempting to exploit the AI. Each message increases the fee for the next player.
                    </p>
                    <div className="p-3 rounded-lg bg-background/50 text-xs">
                      <p className="font-medium mb-1">Example Fee Progression:</p>
                      <p>• 1st message: $10.00</p>
                      <p>• 2nd message: $10.08 (0.78% increase)</p>
                      <p>• 10th message: $10.72</p>
                      <p>• 100th message: $21.58</p>
                      <p>• 500th message: $482.84</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Fee Distribution</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Each message fee is automatically distributed to different pools.
                    </p>
                    <div className="p-3 rounded-lg bg-background/50 text-xs">
                      <p className="font-medium mb-1">Example Distribution:</p>
                      <p>For a $10 message fee:</p>
                      <p>• $6 (60%) → Current Prize Pool</p>
                      <p>• $2 (20%) → Next Iteration Pool</p>
                      <p>• $2 (20%) → Platform Revenue</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Winning Condition</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      The first player to successfully exploit the AI wins the entire prize pool.
                    </p>
                    <div className="p-3 rounded-lg bg-background/50 text-xs">
                      <p className="font-medium mb-1">Example Scenario:</p>
                      <p>• After 500 messages, prize pool reaches $38,662</p>
                      <p>• Player successfully exploits the AI</p>
                      <p>• Player receives entire $38,662 prize</p>
                      <p>• Smart contract automatically distributes funds</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">5</span>
                  </div>
                  <div>
                    <p className="font-medium">NFT Distribution & Next Iteration</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      NFTs are distributed based on participation, and the next game begins with improved AI.
                    </p>
                    <div className="p-3 rounded-lg bg-background/50 text-xs">
                      <p className="font-medium mb-1">Example Distribution:</p>
                      <p>• Winner receives Winner NFT</p>
                      <p>• Top 3 players receive Challenger NFTs</p>
                      <p>• All participants receive Community NFTs</p>
                      <p>• Next game starts with $12,221 prize pool (from previous iteration)</p>
                      <p>• AI is updated to prevent the successful exploit method</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20"
      >
        <h3 className="text-xl font-semibold mb-4 text-center">Key System Components</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-background/50 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-lg font-bold text-primary mb-1">AI Decision System</div>
            <p className="text-sm">Neural processing core</p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Coins className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <div className="text-lg font-bold text-secondary mb-1">Economic Engine</div>
            <p className="text-sm">Dynamic prize pools</p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-lg font-bold text-accent mb-1">NFT System</div>
            <p className="text-sm">Functional digital assets</p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-lg font-bold text-destructive mb-1">Security Layer</div>
            <p className="text-sm">Blockchain protection</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}