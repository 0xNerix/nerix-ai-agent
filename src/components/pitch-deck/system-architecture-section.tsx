"use client";

import { Card } from "@/components/ui/card";
import { Brain, Layers, Zap } from "lucide-react";

export function SystemArchitectureSection() {
  return (
    <section id="system" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">System Architecture</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Core Components</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">AI Decision System</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Processes user messages, evaluates against security constraints, and determines if an exploitation attempt is successful
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="w-5 h-5 text-secondary" />
                  <h4 className="font-medium">Blockchain Layer</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Handles all financial transactions, prize pools, and NFT minting/distribution on BNB Chain
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Evolution Engine</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Analyzes successful exploits and automatically generates improved system prompts for future iterations
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Data Flow</h3>
            <div className="p-6 rounded-xl bg-muted/50 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">User Message Submission</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    User connects wallet, pays message fee, and submits an attempt to exploit the AI
                  </p>
                  <div className="p-3 rounded-lg bg-background/50 text-xs font-mono">
                    {`User -> Smart Contract -> Message Fee -> Prize Pool`}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">AI Processing</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    AI system evaluates the message against security constraints
                  </p>
                  <div className="p-3 rounded-lg bg-background/50 text-xs font-mono">
                    {`Message -> AI Decision System -> Security Evaluation`}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Outcome Determination</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    System determines if exploitation was successful
                  </p>
                  <div className="p-3 rounded-lg bg-background/50 text-xs font-mono">
                    {`Success -> Prize Distribution -> NFT Minting`}
                    <br />
                    {`Failure -> Prize Pool Growth -> Next Attempt`}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">4</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">System Evolution</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    After successful exploitation, system evolves for the next iteration
                  </p>
                  <div className="p-3 rounded-lg bg-background/50 text-xs font-mono">
                    {`Successful Exploit -> Analysis -> Improved System Prompt -> New Game with Next Iteration Prize Pool`}
                    <br />
                    {`Failure -> Current Prize Pool Grows -> Next Iteration Prize Pool Grows`}
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