"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, Trophy, Users, Star, Timer, MessageCircle, Coins, Brain } from "lucide-react";
import { motion } from "framer-motion";

export function NFTSystem() {
  return (
    <section id="nft-system" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">NFT System</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Functional NFTs</h3>
              <p className="text-sm text-muted-foreground">Digital assets with real utility</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">
            Nerix&apos;s NFT system goes beyond simple collectibles, offering functional benefits that directly enhance gameplay and provide strategic advantages. These NFTs are distributed at the end of each game iteration based on player performance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community NFTs</h3>
              <p className="text-muted-foreground mb-4">
                Awarded to all participants in each game iteration
              </p>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <h4 className="font-medium text-primary mb-2">Gameplay Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm font-semibold">+100 characters per message</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm">Common rarity</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Challenger NFTs</h3>
              <p className="text-muted-foreground mb-4">
                Awarded to top 3 players with most attempts
              </p>
              <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                <h4 className="font-medium text-secondary mb-2">Gameplay Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-sm font-semibold">+200 characters per message</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-sm font-semibold">10% message fee reduction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-sm">Rare rarity</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Winner NFTs</h3>
              <p className="text-muted-foreground mb-4">
                Awarded exclusively to game winners
              </p>
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
                <h4 className="font-medium text-accent mb-2">Gameplay Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm font-semibold">+300 characters per message</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm font-semibold">20% message fee reduction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm font-semibold">+3 context messages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm">Legendary rarity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Legacy Bonus System</h3>
            <p className="text-muted-foreground mb-6">
              NFTs from earlier iterations become more powerful over time, providing increasing bonuses as new iterations are released. This creates significant value for early participants and long-term holders.
            </p>
            
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 mb-6">
              <h4 className="font-semibold mb-3">Progressive Bonus Scaling</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Iterations 1-5</span>
                  <span className="font-medium">+10% per iteration</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Iterations 6-10</span>
                  <span className="font-medium">+5% per iteration</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Iterations 11-20</span>
                  <span className="font-medium">+2.5% per iteration</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Iterations 21-100</span>
                  <span className="font-medium">+1% per iteration</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Iterations 100+</span>
                  <span className="font-medium">+0.5% per iteration</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
              <h4 className="font-semibold mb-3">Strategic Value</h4>
              <p className="text-sm text-muted-foreground">
                Early NFTs become increasingly valuable over time, creating a strong incentive for early participation and long-term holding.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-background/50">
                <p className="text-sm font-medium text-center">
                  &quot;Owning an early iteration NFT in Nerix isn&apos;t just a flex—it&apos;s a long-term strategic advantage.&quot;
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Bonus Types</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Message Limit Bonus</h4>
                </div>
                <div className="p-3 rounded-lg bg-background/50 mb-2">
                  <p className="text-sm font-semibold text-center">
                    Increases maximum character count for messages
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allows for more detailed and complex interactions with the AI, significantly increasing your chances of success by enabling more sophisticated persuasion techniques.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Coins className="w-5 h-5 text-secondary" />
                  <h4 className="font-medium">Fee Reduction Bonus</h4>
                </div>
                <div className="p-3 rounded-lg bg-background/50 mb-2">
                  <p className="text-sm font-semibold text-center">
                    Reduces the cost of sending messages
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Provides a significant economic advantage, especially as message fees grow exponentially. In later game stages when fees can reach hundreds of dollars, even a small percentage reduction can save substantial amounts.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Context Message Bonus</h4>
                </div>
                <div className="p-3 rounded-lg bg-background/50 mb-2">
                  <p className="text-sm font-semibold text-center">
                    Increases the AI&apos;s context window
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enables the AI to consider more previous messages when generating responses, allowing for more coherent and contextually aware interactions. This is crucial for complex multi-message strategies.
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">Example: Winner NFT Growth Over Time</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-muted/50 rounded-tl-lg">Current Iteration</th>
                  <th className="text-left py-3 px-4 bg-muted/50">Iteration 1 NFT</th>
                  <th className="text-left py-3 px-4 bg-muted/50">Legacy Bonus</th>
                  <th className="text-left py-3 px-4 bg-muted/50 rounded-tr-lg">Total Benefits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-t border-muted/20">1</td>
                  <td className="py-3 px-4 border-t border-muted/20">Base values</td>
                  <td className="py-3 px-4 border-t border-muted/20 text-primary font-bold">0%</td>
                  <td className="py-3 px-4 border-t border-muted/20 font-semibold">300 chars, 20% fee reduction, +3 context</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-t border-muted/20">10</td>
                  <td className="py-3 px-4 border-t border-muted/20">9 iterations older</td>
                  <td className="py-3 px-4 border-t border-muted/20 text-primary font-bold">+65%</td>
                  <td className="py-3 px-4 border-t border-muted/20 font-semibold">495 chars, 33% fee reduction, +5 context</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-t border-muted/20">50</td>
                  <td className="py-3 px-4 border-t border-muted/20">49 iterations older</td>
                  <td className="py-3 px-4 border-t border-muted/20 text-primary font-bold">+150%</td>
                  <td className="py-3 px-4 border-t border-muted/20 font-semibold">750 chars, 50% fee reduction, +7.5 context</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-t border-muted/20 rounded-bl-lg">100</td>
                  <td className="py-3 px-4 border-t border-muted/20">99 iterations older</td>
                  <td className="py-3 px-4 border-t border-muted/20 text-primary font-bold">+200%</td>
                  <td className="py-3 px-4 border-t border-muted/20 rounded-br-lg font-semibold">900 chars, 60% fee reduction, +9 context</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 p-6 rounded-xl bg-muted/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">NFT Integration with Gameplay</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Enhanced Communication</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">NFTs allow players to send longer, more detailed messages</span>, increasing the chances of successfully convincing the AI. This is crucial for complex persuasion strategies.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-secondary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium">Economic Advantage</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-secondary">Fee reductions provide a significant economic advantage</span>, especially in later game stages when fees can reach hundreds of dollars. This allows for more attempts at a lower cost.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-accent/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-medium">Strategic Depth</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-accent">Increased context window allows for more sophisticated multi-message strategies</span>, enabling complex persuasion techniques that build upon previous interactions with the AI.
              </p>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}