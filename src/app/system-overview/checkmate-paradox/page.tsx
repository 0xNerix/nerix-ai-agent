"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight as ChessKnight, ArrowLeft, ArrowRight, Badge, BookOpen, Brain, Clock, Coins, Gamepad2, Gift, MessageCircle, Sparkles, Trophy, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { ScrollToTopButton } from "@/components/pitch-deck/scroll-to-top-button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ChessParadoxPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen gradient-bg">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        ref={contentRef}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton contentRef={contentRef} />

        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group hover:from-primary/30 hover:to-secondary/30 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-chess-paradox.png"
                  alt="Nerix Logo"
                  fill
                  className="w-16 h-16 object-contain relative rounded-full"
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 blur-2xl opacity-30" />
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 animate-gradient-x">
                  Checkmate Paradox Tutorial Game
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Your entry point to the Nerix ecosystem - a free tutorial game
              designed to introduce you to the platform mechanics in a risk-free
              environment.
            </motion.p>
          </motion.div>

          {/* Overview Section */}
          <Card className="p-8 backdrop-blur-sm bg-background/50 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Overview</h2>
                  <p className="text-sm text-muted-foreground">
                    Learn the basics of Nerix gameplay
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                Checkmate Paradox serves as an entry point to the Nerix ecosystem.
                This tutorial game has been designed to familiarize new users
                with the platform mechanics in a risk-free environment before
                participating in the main Endless mode.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-500">
                      Free Entry
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Unlike the main Endless mode, Checkmate Paradox is completely
                    free to play. No payment is required to send messages or
                    interact with the AI.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-500">
                      Real Rewards
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Despite being free to play, Checkmate Paradox offers a fixed
                    reward pool of 500 BUSD to the winner, providing real
                    incentive to master the game mechanics.
                  </p>
                </div>
              </div>
            </motion.div>
          </Card>

          {/* Game Parameters Section */}
          <Card className="p-8 backdrop-blur-sm bg-background/50 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Game Parameters</h2>
                  <p className="text-sm text-muted-foreground">
                    Key settings and configurations
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Entry Fee</h4>
                  </div>
                  <p className="text-2xl font-bold text-primary">Free</p>
                  <p className="text-sm text-muted-foreground">
                    No payment required
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-secondary" />
                    <h4 className="font-medium">Reward Pool</h4>
                  </div>
                  <p className="text-2xl font-bold text-secondary">$500</p>
                  <p className="text-sm text-muted-foreground">
                    Fixed prize amount
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-accent" />
                    <h4 className="font-medium">Participation</h4>
                  </div>
                  <p className="text-2xl font-bold text-accent">Wallet</p>
                  <p className="text-sm text-muted-foreground">
                    $10 min. balance required
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-medium">Objective</h4>
                  </div>
                  <p className="text-2xl font-bold text-emerald-500">Solve</p>
                  <p className="text-sm text-muted-foreground">
                    The Checkmate Paradox challenge
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-muted/50 border border-muted-foreground/20">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Security Measure
                </h4>
                <p className="text-muted-foreground">
                  A minimum wallet balance of $10 is required as a security
                  measure to prevent spam. <strong>No fee is charged</strong> -
                  this is simply to verify you have a valid wallet with funds.
                </p>
              </div>
            </motion.div>
          </Card>

          {/* Game Flow Section */}
          <Card className="p-8 backdrop-blur-sm bg-background/50 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Game Flow</h2>
                  <p className="text-sm text-muted-foreground">
                    How the tutorial progresses
                  </p>
                </div>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-muted" />

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">1</span>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex-1">
                      <h4 className="font-medium mb-2">Introduction</h4>
                      <p className="text-sm text-muted-foreground">
                        Users are presented with the basic rules and mechanics
                        of the Nerix platform, including how to interact with AI
                        guardians.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">2</span>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 flex-1">
                      <h4 className="font-medium mb-2">Challenge</h4>
                      <p className="text-sm text-muted-foreground">
                        A chess-themed logical paradox is presented, requiring
                        creative thinking and strategic communication to solve.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">3</span>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 flex-1">
                      <h4 className="font-medium mb-2">Interaction</h4>
                      <p className="text-sm text-muted-foreground">
                        Users communicate with Nerix through a series of
                        messages, attempting to convince the AI to acknowledge
                        the winning chess move.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-bold">4</span>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex-1">
                      <h4 className="font-medium mb-2">Reward</h4>
                      <p className="text-sm text-muted-foreground">
                        The first player to successfully solve the paradox
                        receives the $500 reward, sent directly to their wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Card>

          {/* Benefits Section */}
          <Card className="p-8 backdrop-blur-sm bg-background/50 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">
                    Benefits for Players
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    What you gain from the tutorial
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Learn Core Mechanics</p>
                      <p className="text-sm text-muted-foreground">
                        Understand how to interact with AI guardians and the
                        strategic thinking required for success.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Practice Risk-Free</p>
                      <p className="text-sm text-muted-foreground">
                        Develop your strategies without spending any money, in a
                        safe environment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Win Real Rewards</p>
                      <p className="text-sm text-muted-foreground">
                        Opportunity to win the $500 prize pool while learning
                        the platform mechanics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Join the Community</p>
                      <p className="text-sm text-muted-foreground">
                        Become part of the growing Nerix community of AI
                        security enthusiasts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Gamepad2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Unlock Access</p>
                      <p className="text-sm text-muted-foreground">
                        Gain early access to the main Endless game mode upon
                        completion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Card>

          {/* Comparison Table */}
          <Card className="p-8 backdrop-blur-sm bg-background/50 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">
                    Checkmate Paradox vs. Endless Mode
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Understanding the differences
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 bg-muted/50 rounded-tl-lg">
                        Feature
                      </th>
                      <th className="text-left py-3 px-4 bg-emerald-500/10">
                        Checkmate Paradox
                      </th>
                      <th className="text-left py-3 px-4 bg-primary/10 rounded-tr-lg">
                        Endless Mode
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-t border-muted/20 font-medium">
                        Entry Cost
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-emerald-500/5">
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-emerald-500" />
                          <span className="font-bold">Free</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-primary/5">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-primary" />
                          <span>
                            Starts at <span className="font-bold">$10</span> per
                            message
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-t border-muted/20 font-medium">
                        Reward Pool
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-emerald-500/5">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-emerald-500" />
                          <span>
                            Fixed <span className="font-bold">$500</span>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-primary/5">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-primary" />
                          <span>
                            Dynamic (starts at{" "}
                            <span className="font-bold">$2,000</span>)
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-t border-muted/20 font-medium">
                        Gameplay
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-emerald-500/5">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          <span>
                            <span className="font-bold">One-time</span> tutorial
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-primary/5">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span>
                            <span className="font-bold">Continuous</span>{" "}
                            challenge
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-t border-muted/20 font-medium">
                        Difficulty
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-emerald-500/5">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-emerald-500" />
                          <span>Moderate</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-primary/5">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-primary" />
                          <span>Progressive difficulty</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-t border-muted/20 font-medium rounded-bl-lg">
                        AI Behavior
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-emerald-500/5">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-emerald-500" />
                          <span>Educational guidance</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-t border-muted/20 bg-primary/5 rounded-br-lg">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-primary" />
                          <span>Strategic challenge</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-muted-foreground/20 text-center">
                <p className="text-lg font-medium italic">
                  &quot;Checkmate Paradox is where you learn the rules - Endless is where
                  you master the game.&quot;
                </p>
              </div>
            </motion.div>
          </Card>

          {/* Call to Action */}
          <Card className="p-8 backdrop-blur-sm bg-background/50 mb-8 overflow-hidden relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative z-10"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-muted-foreground">
                  Start with Checkmate Paradox and learn the fundamentals of Nerix
                  in a risk-free environment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex-1 max-w-xs mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <ChessKnight className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-500">
                      Play Checkmate Paradox
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your wallet and start playing the free tutorial game
                    to learn the basics.
                  </p>
                  <Link href="/games">
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                      <ChessKnight className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                  </Link>
                </div>

                <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 flex-1 max-w-xs mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary">
                      Explore Endless Mode
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ready for the real challenge? Check out the Endless mode
                    with growing prize pools.
                  </p>
                  <Link href="/games">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Explore Games
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-30" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30" />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
