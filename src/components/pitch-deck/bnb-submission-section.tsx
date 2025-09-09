"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink, Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function BnbSubmissionSection() {
  return (
    <section id="submission" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">BNB Chain AI Hack Submission</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Hackathon Details</h3>
            <div className="p-6 rounded-xl bg-[#F0B90B]/10 border border-[#F0B90B]/20 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/bnb-logo.png" width={40} height={40} alt="BNB Chain" className="w-10 h-10" />
                <h4 className="text-lg font-semibold">BNB AI Hack</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                  <span className="text-sm">Category: AI GAMES & AI SECURITY</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                  <span className="text-sm">Deployment: BNB Chain Testnet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                  <span className="text-sm">Status: Fully Functional Prototype</span>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-muted/50">
              <h4 className="text-lg font-semibold mb-4">Why Nerix for BNB Chain?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Innovative AI Use Case</p>
                    <p className="text-sm text-muted-foreground">
                      Combines AI security testing with blockchain in a novel way
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">High Transaction Volume</p>
                    <p className="text-sm text-muted-foreground">
                      Generates consistent transaction volume through message fees
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Community Building</p>
                    <p className="text-sm text-muted-foreground">
                      Creates an engaged community of AI security testers and gamers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Project Links</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://github.com/nerixai/nerix-platform" target="_blank">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://www.nerixai.com" target="_blank">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Live Demo</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://x.com/0xNerix" target="_blank">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                    <span>Twitter</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Current Status</h3>
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-emerald-500">Ready for Evaluation</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-sm">Fully functional prototype deployed on BNB Chain testnet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-sm">Smart contracts developed and tested</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-sm">Frontend interface complete with wallet integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-sm">AI integration with multiple models</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}