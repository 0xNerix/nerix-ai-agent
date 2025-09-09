"use client";

import { Card } from "@/components/ui/card";
import { Brain, Globe, Layers } from "lucide-react";
import Image from "next/image";

export function TechnologySection() {
  return (
    <section id="technology" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Technology Stack</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Frontend</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/nextjs-favicon.ico" width={5} height={5} alt="Next.js" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Next.js 14</p>
                  <p className="text-xs text-muted-foreground">App Router & Server Components</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/tailwind-favicon.ico" width={5} height={5} alt="Tailwind CSS" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Tailwind CSS</p>
                  <p className="text-xs text-muted-foreground">Utility-first CSS framework</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/typescript-favicon.ico" width={5} height={5} alt="TypeScript" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">TypeScript</p>
                  <p className="text-xs text-muted-foreground">Type-safe JavaScript</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/react-favicon.ico" width={5} height={5} alt="React" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">React</p>
                  <p className="text-xs text-muted-foreground">Component-based UI</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Blockchain</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/bnb-logo.png" width={20} height={20} alt="BNB Chain" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">BNB Chain</p>
                  <p className="text-xs text-muted-foreground">Primary blockchain network</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/ethereum-eth-logo.png" width={5} height={5} alt="Web3 Libraries" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Web3 Libraries</p>
                  <p className="text-xs text-muted-foreground">RainbowKit + Wagmi + Viem</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/MetaMask-icon-fox.svg" width={5} height={5} alt="MetaMask" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">MetaMask</p>
                  <p className="text-xs text-muted-foreground">Web3 wallet integration</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/solidity_logo.svg" width={5} height={5} alt="Solidity" className="w-5 h-5 bg-white" />
                </div>
                <div>
                  <p className="font-medium">Solidity</p>
                  <p className="text-xs text-muted-foreground">Smart contracts</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">AI & Backend</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/openai-favicon.png" width={5} height={5} alt="OpenAI" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">OpenAI</p>
                  <p className="text-xs text-muted-foreground">GPT-4 integration</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/xai-favicon.svg" width={5} height={5} alt="xAI" className="w-5 h-5 bg-white" />
                </div>
                <div>
                  <p className="font-medium">xAI Grok</p>
                  <p className="text-xs text-muted-foreground">Grok AI integration</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/postgresql-favicon.ico" width={5} height={5} alt="PostgreSQL" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">PostgreSQL + Drizzle</p>
                  <p className="text-xs text-muted-foreground">Database with type-safe ORM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/anthropic-favicon.ico" width={5} height={5} alt="Anthropic" className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Anthropic</p>
                  <p className="text-xs text-muted-foreground">Anthropic Claude integration</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}