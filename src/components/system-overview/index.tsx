"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, GamepadIcon, Shield, Activity, HelpCircle, Zap } from "lucide-react";
import Link from "next/link";
import { SystemHeader } from "./system-header";
import { SystemOverview } from "./system-overview";
import { AIDecisionSystem } from "./ai-decision-system";
import { EconomicSystem } from "./economic-system";
import { NFTSystem } from "./nft-system";
import { IterationSystem } from "./iteration-system";
import { GameModes } from "./game-modes";
import { TechnologyStack } from "./technology-stack";
import { SecurityFeatures } from "./security-features";
import { ScrollToTopButton } from "@/components/pitch-deck/scroll-to-top-button";
import { useRef } from "react";

export function SystemOverviewDocument() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"  ref={contentRef}>
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

        {/* Main Content - All sections stacked vertically */}
        <div className="space-y-16">
          {/* Header Section */}
          <SystemHeader />

          {/* Overview Section */}
          <SystemOverview />

          {/* Game Modes */}
          <GameModes />

          {/* AI Decision System */}
          <AIDecisionSystem />

          {/* Economic System */}
          <EconomicSystem />

          {/* NFT System */}
          <NFTSystem />

          {/* Iteration System */}
          <IterationSystem />

          {/* Technology Stack */}
          <TechnologyStack />

          {/* Security Features */}
          <SecurityFeatures />
        </div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-16 space-y-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-center">Quick Links</h2>
          
          {/* First row - Main links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/how-to-play"
              className="block p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                  <HelpCircle className="w-5 h-5 text-orange-500" />
                </div>
                <span className="font-semibold">How to Join</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Step-by-step guide to get started with Nerix
              </p>
            </Link>
            
            <Link
              href="/system-overview/checkmate-paradox"
              className="block p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-semibold">Checkmate Paradox</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Learn about the game theory behind Nerix
              </p>
            </Link>
            
            <Link
              href="/api-docs"
              className="block p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <Globe className="w-5 h-5 text-green-500" />
                </div>
                <span className="font-semibold">API Documentation</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Build applications and integrate with our platform
              </p>
            </Link>
          </div>
          
          {/* Second row - Additional links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/games"
              className="block p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <GamepadIcon className="w-5 h-5 text-purple-500" />
                </div>
                <span className="font-semibold">Play Games</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Challenge AI systems and win BNB prizes
              </p>
            </Link>
            
            <Link
              href="/system-status"
              className="block p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Activity className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-semibold">System Status</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Check platform health and uptime
              </p>
            </Link>
            
            <Link
              href="/support"
              className="block p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <Shield className="w-5 h-5 text-cyan-500" />
                </div>
                <span className="font-semibold">Support</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Get help and join our community
              </p>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center border-t border-border/30 pt-8">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Nerix - Revolutionary AI Gaming Platform
          </p>
        </div>
      </div>
    </main>
  );
}