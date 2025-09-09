"use client";

import { Card } from "@/components/ui/card";
import { RefreshCw, Sparkles, Shield, Brain, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function IterationSystem() {
  return (
    <section id="iteration-system" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Iteration System</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Continuous Evolution</h3>
                <p className="text-sm text-muted-foreground">The cycle of improvement</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              The Iteration System is what makes Nerix truly unique - a continuous cycle of gameplay, exploitation, learning, and improvement that creates an ever-evolving AI security challenge.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Iteration Cycle</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each game represents a single iteration in the evolution of Nerix. When a player successfully exploits the AI, the current iteration ends, rewards are distributed, and a new iteration begins with an improved AI system.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <h4 className="font-medium">Security Improvement</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each successful exploitation reveals a vulnerability in the AI&apos;s defenses. The system analyzes these vulnerabilities and automatically updates the AI&apos;s system prompt to patch them, making each iteration more secure than the last.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Collective Intelligence</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  The iteration system harnesses the collective intelligence of all players. Each attempt, whether successful or not, contributes to the system&apos;s understanding of potential vulnerabilities and attack vectors.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="p-6 rounded-xl bg-muted/50 mb-6">
              <h3 className="text-xl font-semibold mb-4">Iteration Process</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-muted" />

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">1</span>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex-1">
                      <h4 className="font-medium mb-2">Game Launch</h4>
                      <p className="text-sm text-muted-foreground">
                        A new iteration begins with an initial prize pool (or carried over from previous iteration) and a specific AI challenge.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">2</span>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 flex-1">
                      <h4 className="font-medium mb-2">Player Interaction</h4>
                      <p className="text-sm text-muted-foreground">
                        Players send messages attempting to exploit the AI, with each message increasing the prize pool and the next message fee.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">3</span>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 flex-1">
                      <h4 className="font-medium mb-2">Successful Exploitation</h4>
                      <p className="text-sm text-muted-foreground">
                        A player successfully convinces the AI to break its core directive, triggering the end of the current iteration.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">4</span>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex-1">
                      <h4 className="font-medium mb-2">Reward Distribution</h4>
                      <p className="text-sm text-muted-foreground">
                        The winner receives the prize pool, and NFTs are distributed to all participants based on their performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">5</span>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 flex-1">
                      <h4 className="font-medium mb-2">AI Improvement</h4>
                      <p className="text-sm text-muted-foreground">
                        The system analyzes the successful exploitation and updates the AI&apos;s system prompt to patch the vulnerability.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">6</span>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-1">
                      <h4 className="font-medium mb-2">New Iteration Launch</h4>
                      <p className="text-sm text-muted-foreground">
                        A new iteration begins with the improved AI and the carried-over prize pool from the previous iteration.
                      </p>
                    </div>
                  </div>
                </div>
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
          <h3 className="text-xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">The Power of Iteration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Increasing Difficulty</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Each iteration becomes progressively more challenging as the AI learns from past exploits, creating an ever-evolving security challenge.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium">Growing Rewards</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Prize pools grow with each iteration, as 20% of all message fees from the previous iteration are carried forward to the next.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-medium">Evolving Intelligence</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                The AI&apos;s intelligence and security measures evolve organically based on real player interactions, not predetermined rules.
              </p>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}