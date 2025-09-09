"use client";

import { Card } from "@/components/ui/card";
import { Check, Coins, Lock, Sparkles } from "lucide-react";
import Image from "next/image";

export function BnbIntegrationSection() {
  return (
    <Card className="p-8 backdrop-blur-sm bg-background/50">
      <h2 className="text-3xl font-bold mb-6 text-center">BNB Chain Integration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-[#F0B90B]/10 border border-[#F0B90B]/20">
          <div className="flex items-center gap-3 mb-4">
            <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/bnb-logo.png" width={40} height={40} alt="BNB Chain" className="w-10 h-10" />
            <h3 className="text-xl font-semibold">Why BNB Chain?</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F0B90B]/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#F0B90B]" />
              </div>
              <span>Low transaction fees for frequent message interactions</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F0B90B]/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#F0B90B]" />
              </div>
              <span>High throughput for real-time gameplay</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F0B90B]/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#F0B90B]" />
              </div>
              <span>Growing AI ecosystem and support</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F0B90B]/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#F0B90B]" />
              </div>
              <span>Robust infrastructure for GameFi applications</span>
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-muted/50">
          <h3 className="text-xl font-semibold mb-4">Implementation Details</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Coins className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Smart Contracts</p>
                <p className="text-sm text-muted-foreground">
                  Deployed on BNB Chain for handling message fees, prize pools, and reward distribution
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="font-medium">NFT System</p>
                <p className="text-sm text-muted-foreground">
                  BEP-721 tokens with on-chain metadata for functional benefits
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="font-medium">Wallet Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Secure wallet connection and transaction signing for all interactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}