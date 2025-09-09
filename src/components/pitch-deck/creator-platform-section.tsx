"use client";

import { Card } from "@/components/ui/card";
import { Brain, Coins, Sparkles, Timer, Users } from "lucide-react";

export function CreatorPlatformSection() {
  return (
    <Card className="p-8 backdrop-blur-sm bg-background/50">
      <h3 className="text-2xl font-semibold mb-6 text-center">Community Game Creation Platform</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4">Creator Tools</h4>
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Custom AI Prompts</p>
                <p className="text-sm text-muted-foreground">
                  Create your own AI security challenges with custom system prompts and rules
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Coins className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Custom Economics</p>
                <p className="text-sm text-muted-foreground">
                  Define your own prize pools, fee structures, and distribution percentages
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Timer className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Game Parameters</p>
                <p className="text-sm text-muted-foreground">
                  Set custom message limits, context windows, and game duration
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Creator Benefits</h4>
          <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Coins className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Revenue Share</p>
                <p className="text-sm text-muted-foreground">
                  Earn a percentage of all message fees from your custom games
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Community Building</p>
                <p className="text-sm text-muted-foreground">
                  Create and grow your own community of AI security testers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Creator NFTs</p>
                <p className="text-sm text-muted-foreground">
                  Earn special Creator NFTs with enhanced benefits across the platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}