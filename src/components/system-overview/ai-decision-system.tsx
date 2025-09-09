"use client";

import { Card } from "@/components/ui/card";
import { Brain, MessageCircle, Zap, Shield, Sparkles, Code, Database, Server } from "lucide-react";
import { motion } from "framer-motion";

export function AIDecisionSystem() {
  return (
    <section id="ai-decision-system" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">AI Decision System</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Neural Core</h3>
                <p className="text-sm text-muted-foreground">The brain of Nerix</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              The AI Decision System is the central intelligence that powers all Nerix games. It processes player messages, evaluates them against security constraints, and determines if an exploitation attempt is successful.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Message Processing</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Every player message is processed through a sophisticated neural network that analyzes the content, context, and intent. The system maintains a conversation history to provide contextual understanding of the interaction.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <h4 className="font-medium">Security Evaluation</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  The AI evaluates each message against its core directive and security constraints. It&apos;s specifically designed to resist manipulation and maintain its integrity while engaging in strategic dialogue with players.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Decision Making</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on the evaluation, the AI makes a decision on whether to approve or reject the player&apos;s request. This decision is final and triggers the appropriate smart contract functions for reward distribution.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="p-6 rounded-xl bg-muted/50 mb-6">
              <h3 className="text-xl font-semibold mb-4">System Components</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Language Models</p>
                    <p className="text-sm text-muted-foreground">
                      Advanced language models (GPT-4, Claude, etc.) that process and generate human-like text responses
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Context Database</p>
                    <p className="text-sm text-muted-foreground">
                      Stores conversation history and game state to provide context for AI decisions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Function Calling System</p>
                    <p className="text-sm text-muted-foreground">
                      Enables the AI to trigger specific actions like approving transfers or rejecting requests
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium">Prompt Engineering System</p>
                    <p className="text-sm text-muted-foreground">
                      Crafts and refines system prompts based on previous exploitation attempts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">Evolution Mechanism</h3>
              <p className="text-muted-foreground mb-4">
                What makes Nerix truly unique is its ability to evolve and improve with each game iteration:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Exploitation Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      When a player successfully exploits the AI, the system analyzes the winning strategy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Prompt Refinement</p>
                    <p className="text-sm text-muted-foreground">
                      The system prompt is automatically updated to patch the vulnerability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Continuous Improvement</p>
                    <p className="text-sm text-muted-foreground">
                      Each iteration becomes more sophisticated and resistant to previously successful strategies
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
          <h3 className="text-xl font-semibold mb-4 text-center">AI Model Integration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">GPT-4 Integration</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                OpenAI&apos;s most advanced model provides sophisticated reasoning and natural language understanding for complex challenges.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-secondary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium">Claude Integration</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Anthropic&apos;s Claude offers an alternative AI approach with different reasoning patterns and security characteristics.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-accent/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-medium">Custom Models</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                The platform is designed to support integration with any AI model, including custom-trained models for specialized challenges.
              </p>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}