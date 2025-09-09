"use client";

import { Card } from "@/components/ui/card";
import { Brain, Check, Globe, Shield, Users } from "lucide-react";

export function BenefitsSection() {
  return (
    <section id="benefits" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Benefits for Stakeholders</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For AI Developers</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Continuous Security Testing</p>
                  <p className="text-sm text-muted-foreground">
                    Ongoing testing of AI systems by diverse users with different approaches
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Vulnerability Discovery</p>
                  <p className="text-sm text-muted-foreground">
                    Identify and patch security vulnerabilities before they can be exploited in production
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Self-Improving Systems</p>
                  <p className="text-sm text-muted-foreground">
                    AI systems that automatically evolve and become more secure over time
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For Players</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Financial Rewards</p>
                  <p className="text-sm text-muted-foreground">
                    Earn significant prizes for successfully exploiting AI systems
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Valuable NFTs</p>
                  <p className="text-sm text-muted-foreground">
                    Collect functional NFTs that provide gameplay advantages and grow in value over time
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Skill Development</p>
                  <p className="text-sm text-muted-foreground">
                    Improve prompt engineering and AI interaction skills through strategic gameplay
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For BNB Chain</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <p className="font-medium">AI Ecosystem Growth</p>
                  <p className="text-sm text-muted-foreground">
                    Strengthens BNB Chain&apos;s position in the AI + blockchain space
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Transaction Volume</p>
                  <p className="text-sm text-muted-foreground">
                    Generates consistent transaction volume through message fees and prize distributions
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Innovation Showcase</p>
                  <p className="text-sm text-muted-foreground">
                    Demonstrates innovative use cases combining AI and blockchain technology
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}