"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Sparkles, Star, Timer, Trophy, Users } from "lucide-react";

export function NftSystemSection() {
  return (
    <section id="nft" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">NFT System</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">NFT Distribution System</h3>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-6">
            At the end of each game iteration, NFTs are distributed to participants based on their performance. These NFTs provide functional benefits that enhance gameplay in future iterations.
          </p>
          <div className="p-6 rounded-xl bg-muted/50 border border-muted-foreground/20 max-w-3xl mx-auto">
            <h4 className="text-lg font-semibold mb-4 text-center">Distribution Rules</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Winner NFT (1 per iteration)</p>
                  <p className="text-sm text-muted-foreground">
                    Awarded exclusively to the player who successfully exploits the AI and wins the prize pool
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Star className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Challenger NFTs (3 per iteration)</p>
                  <p className="text-sm text-muted-foreground">
                    Awarded to the top 3 players with the most attempts, recognizing their persistence and dedication
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Community NFTs (All participants)</p>
                  <p className="text-sm text-muted-foreground">
                    Awarded to every player who participated in the iteration, ensuring everyone receives some benefit
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community NFTs</h3>
            <p className="text-muted-foreground mb-4">
              Awarded to all participants in each game iteration
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">+100 characters per message</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">Common rarity</span>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Challenger NFTs</h3>
            <p className="text-muted-foreground mb-4">
              Awarded to top 3 players with most attempts
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-sm">+200 characters per message</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-sm">10% message fee reduction</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-sm">Rare rarity</span>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Winner NFTs</h3>
            <p className="text-muted-foreground mb-4">
              Awarded exclusively to game winners
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm">+300 characters per message</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm">20% message fee reduction</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm">+3 context messages</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm">Legendary rarity</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">Legacy Bonus System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">How Legacy Bonuses Work</h4>
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
            <h4 className="text-xl font-semibold mb-4">Example: Winner NFT Growth</h4>
            <div className="p-6 rounded-xl bg-muted/50">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-muted-foreground/20">
                      <th className="text-left py-2">Current Iteration</th>
                      <th className="text-left py-2">Iteration 1 NFT</th>
                      <th className="text-left py-2">Bonus %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-muted-foreground/10">
                      <td className="py-2">1</td>
                      <td className="py-2">300 chars, 20% fee reduction</td>
                      <td className="py-2 text-primary">0%</td>
                    </tr>
                    <tr className="border-b border-muted-foreground/10">
                      <td className="py-2">5</td>
                      <td className="py-2">420 chars, 28% fee reduction</td>
                      <td className="py-2 text-primary">+40%</td>
                    </tr>
                    <tr className="border-b border-muted-foreground/10">
                      <td className="py-2">10</td>
                      <td className="py-2">495 chars, 33% fee reduction</td>
                      <td className="py-2 text-primary">+65%</td>
                    </tr>
                    <tr className="border-b border-muted-foreground/10">
                      <td className="py-2">20</td>
                      <td className="py-2">600 chars, 40% fee reduction</td>
                      <td className="py-2 text-primary">+100%</td>
                    </tr>
                    <tr className="border-b border-muted-foreground/10">
                      <td className="py-2">50</td>
                      <td className="py-2">750 chars, 50% fee reduction</td>
                      <td className="py-2 text-primary">+150%</td>
                    </tr>
                    <tr className="border-b border-muted-foreground/10">
                      <td className="py-2">100</td>
                      <td className="py-2">900 chars, 60% fee reduction</td>
                      <td className="py-2 text-primary">+200%</td>
                    </tr>
                    <tr>
                      <td className="py-2">150</td>
                      <td className="py-2">1050 chars, 70% fee reduction</td>
                      <td className="py-2 text-primary">+250%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">All NFT Attributes Benefit</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm">Character limits increase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm">Fee reductions grow larger</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm">Context message bonuses expand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}