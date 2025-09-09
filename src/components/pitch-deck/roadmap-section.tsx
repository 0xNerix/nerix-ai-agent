"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Rocket, Code, Brain, Coins, Layers, Shield, Users, Sparkles, Hourglass } from "lucide-react";
import { motion } from "framer-motion";

export function RoadmapSection() {
  return (
    <section id="roadmap" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Development Roadmap</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted transform -translate-x-1/2" />

          {/* February 2025 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="md:text-right md:pr-8">
              <h3 className="text-xl font-semibold mb-2">February 2025</h3>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm">✅ Development kickoff</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm">✅ Core smart contracts development</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm">✅ Frontend platform architecture</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm">✅ Initial AI integration research</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm">✅ Economic model design</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm">✅ Multi-model AI support (Claude, GPT-4)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:hidden w-6 h-6 rounded-full bg-primary absolute left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-background" />
            </div>
            <div className="md:pl-8">
              <div className="w-6 h-6 rounded-full bg-primary absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-background" />
              </div>
            </div>
          </div>

          {/* April 2025 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="md:text-right md:pr-8 md:order-1 order-2">
              <div className="w-6 h-6 rounded-full bg-secondary absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-background" />
              </div>
            </div>
            <div className="md:pl-8 md:order-2 order-1">
              <h3 className="text-xl font-semibold mb-2">April 2025</h3>
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm">✅ Platform launch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm">✅ BNB Chain testnet deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm">✅ BNB AI Hackathon submission</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm">✅ Chess Paradox game launch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> BNB Chain mainnet & Endless Game launch</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:hidden w-6 h-6 rounded-full bg-secondary absolute left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-background" />
            </div>
          </div>

          {/* July 2025 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="md:text-right md:pr-8">
              <h3 className="text-xl font-semibold mb-2">July 2025</h3>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> NFT marketplace integration</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Advanced AI guardian iterations</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> NRX token launch</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> BNB Greenfield integration</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Community game creation platform</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  </li>
                  <li className="flex items-center gap-2 md:justify-end">
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Custom AI integration for creators</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:hidden w-6 h-6 rounded-full bg-accent absolute left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center">
              <Clock className="w-4 h-4 text-background" />
            </div>
            <div className="md:pl-8">
              <div className="w-6 h-6 rounded-full bg-accent absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                <Clock className="w-4 h-4 text-background" />
              </div>
            </div>
          </div>

          {/* October 2025 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:text-right md:pr-8 md:order-1 order-2">
              <div className="w-6 h-6 rounded-full bg-destructive absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                <Clock className="w-4 h-4 text-background" />
              </div>
            </div>
            <div className="md:pl-8 md:order-2 order-1">
              <h3 className="text-xl font-semibold mb-2">October 2025</h3>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Global tournament system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Mobile app beta release</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Cross-chain expansion planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Enterprise partnerships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Advanced creator marketplace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    <span className="text-sm"><Hourglass className="w-4 h-4 mr-1 inline-block" /> Multimodal AI support (vision, audio)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:hidden w-6 h-6 rounded-full bg-destructive absolute left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center">
              <Clock className="w-4 h-4 text-background" />
            </div>
          </div>
        </div>

        {/* Animated Roadmap Highlights */}
        <motion.div 
          className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Key Milestones</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-background/50 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-lg font-bold text-primary mb-1">Feb 2025</div>
              <p className="text-sm">Development Start</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div className="text-lg font-bold text-secondary mb-1">Apr 2025</div>
              <p className="text-sm">Platform Launch</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div className="text-lg font-bold text-accent mb-1">Jul 2025</div>
              <p className="text-sm">Advanced AI & Mainnet</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-destructive" />
                </div>
              </div>
              <div className="text-lg font-bold text-destructive mb-1">Oct 2025</div>
              <p className="text-sm">Token & Expansion</p>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}