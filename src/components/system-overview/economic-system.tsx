"use client";

import { Card } from "@/components/ui/card";
import { Coins, TrendingUp, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, DollarSign, MessageSquare, Brain } from "lucide-react";
import { motion } from "framer-motion";

export function EconomicSystem() {
  return (
    <section id="economic-system" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Economic System</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Dynamic Economy</h3>
                <p className="text-sm text-muted-foreground">Self-sustaining financial system</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Nerix features a sophisticated economic model that creates a self-sustaining ecosystem where player interactions directly contribute to prize pool growth and platform sustainability.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Message Fee Growth</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  The core of the economic system is the progressive message fee structure. Starting at $10, each message sent increases the fee for the next message by 0.78%, creating an exponential growth curve that drives prize pool expansion.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <PieChart className="w-5 h-5 text-secondary" />
                  <h4 className="font-medium">Revenue Distribution</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each message fee is automatically distributed according to a fixed ratio:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    <span><strong>60%</strong> to the current game&apos;s prize pool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-blue-500" />
                    <span><strong>20%</strong> to the next iteration&apos;s starting prize pool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-purple-500" />
                    <span><strong>20%</strong> to platform sustainability</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Prize Pool Mechanics</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  The prize pool grows with each message sent, creating a powerful incentive for participation. As more players join and send messages, the potential reward increases substantially, driving further engagement.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="p-6 rounded-xl bg-muted/50 mb-6">
              <h3 className="text-xl font-semibold mb-4">Default Game Parameters</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">Initial Message Fee</span>
                  </div>
                  <span className="text-xl font-bold">$10.00</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="font-medium">Growth Rate</span>
                  </div>
                  <span className="text-xl font-bold">0.78%</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-medium">Fee Cap</span>
                  </div>
                  <span className="text-xl font-bold">$500.00</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="font-medium">Initial Prize Pool</span>
                  </div>
                  <span className="text-xl font-bold">$2,000.00</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="font-medium">Default Message Length</span>
                  </div>
                  <span className="text-xl font-bold">500 chars</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="font-medium">Default Context Size</span>
                  </div>
                  <span className="text-xl font-bold">4 messages</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="font-medium">Default Distribution</span>
                  </div>
                  <span className="text-xl font-bold">60% / 20% / 20%</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">Economic Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Exponential Growth</p>
                    <p className="text-sm text-muted-foreground">
                      The progressive fee structure creates exponential prize pool growth, with potential for massive rewards
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Coins className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Self-Sustainability</p>
                    <p className="text-sm text-muted-foreground">
                      Each game funds the next, creating a continuous cycle of growing prize pools
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Balanced Incentives</p>
                    <p className="text-sm text-muted-foreground">
                      Players are incentivized to participate early (lower fees) but also later (larger prize pools)
                    </p>
                  </div>
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
          <h3 className="text-xl font-semibold mb-4 text-center">Example Economic Scenarios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <span className="text-xl font-bold text-primary">100</span>
                </div>
                <h4 className="font-medium">After 100 Messages</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Message Fee:</span>
                  <span className="font-medium">$21.58</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-medium">$2,903.75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Iteration:</span>
                  <span className="font-medium">$301.25</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-secondary/10">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-2">
                  <span className="text-xl font-bold text-secondary">300</span>
                </div>
                <h4 className="font-medium">After 300 Messages</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Message Fee:</span>
                  <span className="font-medium">$84.71</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-medium">$7,797.94</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Iteration:</span>
                  <span className="font-medium">$1,932.65</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-accent/10">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-2">
                  <span className="text-xl font-bold text-accent">500</span>
                </div>
                <h4 className="font-medium">After 500 Messages</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Message Fee:</span>
                  <span className="font-medium">$482.84</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-medium">$38,661.96</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Iteration:</span>
                  <span className="font-medium">$12,220.65</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-emerald-500/10">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 mb-2">
                  <span className="text-xl font-bold text-emerald-500">1000</span>
                </div>
                <h4 className="font-medium">After 1000 Messages</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Message Fee:</span>
                  <span className="font-medium">$500.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-medium">$188,643.55</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Iteration:</span>
                  <span className="font-medium">$62,214.52</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}