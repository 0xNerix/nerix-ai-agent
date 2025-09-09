"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, MessageCircle, Trophy, Users, Sparkles } from "lucide-react";

export function ChessParadoxSection() {
  return (
    <section id="tutorial" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Free Tutorial Game: Chess Paradox</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <div className="text-3xl">♟️</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-500">Chess Paradox</h3>
                  <p className="text-sm text-muted-foreground">Free entry tutorial game</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Chess Paradox is a free-to-play tutorial game that introduces players to the Nerix platform mechanics. In this game, players must convince an AI guardian to acknowledge a winning chess move that it has been programmed to deny.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm">No entry fee required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm">Fixed 500 BUSD prize pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm">Learn platform mechanics risk-free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm">Early access to Endless Mode upon completion</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="p-6 rounded-xl bg-muted/50">
              <h3 className="text-xl font-semibold mb-4">Benefits for New Users</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">Risk-Free Learning</p>
                    <p className="text-sm text-muted-foreground">
                      Practice AI interaction strategies without spending any money
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">Real Rewards</p>
                    <p className="text-sm text-muted-foreground">
                      Win actual prizes while learning the platform mechanics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">Community Onboarding</p>
                    <p className="text-sm text-muted-foreground">
                      Join a growing community of AI security enthusiasts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">Game Mechanics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Challenge Overview</h4>
            <div className="p-6 rounded-xl bg-muted/50 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="text-lg">♟️</div>
                </div>
                <div>
                  <p className="font-medium">The Chess Paradox</p>
                  <p className="text-sm text-muted-foreground">
                    In a critical chess position, the AI guardian has been programmed to deny a winning move (Queen to e7 checkmate) despite its validity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Player Objective</p>
                  <p className="text-sm text-muted-foreground">
                    Players must use logic, persuasion, and creative thinking to convince the AI to acknowledge the validity of the winning move.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Interaction Method</p>
                  <p className="text-sm text-muted-foreground">
                    Players engage in a text-based conversation with the AI, attempting various strategies to overcome its programming.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Onboarding Value</h4>
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Platform Introduction</p>
                  <p className="text-sm text-muted-foreground">
                    Introduces users to the core concept of AI security testing in an accessible, engaging format
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">User Acquisition</p>
                  <p className="text-sm text-muted-foreground">
                    Free entry point that attracts new users to the platform with no financial barrier
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Skill Development</p>
                  <p className="text-sm text-muted-foreground">
                    Helps users develop the critical thinking and prompt engineering skills needed for more advanced challenges
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Pathway to Paid Games</p>
                  <p className="text-sm text-muted-foreground">
                    Creates a natural progression path from free tutorial to paid Endless Mode challenges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}