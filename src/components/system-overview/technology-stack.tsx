"use client";

import { Card } from "@/components/ui/card";
import { Code, Database, Globe, Layers, Server, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function TechnologyStack() {
  return (
    <section id="technology-stack" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Technology Stack</h2>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend */}
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

          {/* Blockchain */}
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
                  <Image src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/solidity_logo.svg" width={5} height={5} alt="MetaMask" className="w-5 h-5 bg-white" />
                </div>
                <div>
                  <p className="font-medium">Solidity</p>
                  <p className="text-xs text-muted-foreground">Smart contracts</p>
                </div>
              </li>
            </ul>
          </div>

          {/* AI & Backend */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-accent" />
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

        <motion.div
          className="mt-8 p-6 rounded-xl bg-muted/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">System Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Core Components</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><strong>Frontend Layer:</strong> User interface and interaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><strong>API Layer:</strong> Communication between frontend and backend</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><strong>AI Processing Layer:</strong> Message analysis and response generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><strong>Blockchain Layer:</strong> Smart contracts and transactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><strong>Database Layer:</strong> Data storage and retrieval</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-secondary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Server className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium">Data Flow</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><strong>User Interaction:</strong> Frontend → API → AI Processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><strong>Message Processing:</strong> API → AI → Database</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><strong>Transaction Handling:</strong> Frontend → Blockchain → Smart Contracts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><strong>Game State Management:</strong> Database ↔ API ↔ Frontend</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><strong>AI Evolution:</strong> Database → AI Processing → Database</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">Smart Contract Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">NerixGame.sol</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Main game contract handling message fees, prize pools, and reward distribution
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><code className="text-xs">startFirstGame()</code> - Initializes the first game</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><code className="text-xs">sendMessage()</code> - Processes message fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><code className="text-xs">declareWinner()</code> - Distributes prize and NFTs</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span><code className="text-xs">_prepareNextIteration()</code> - Sets up next game</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-medium">NerixNFT.sol</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                NFT contract for minting and managing functional NFTs with gameplay benefits
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><code className="text-xs">mintCommunityNFT()</code> - For all participants</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><code className="text-xs">mintChallengerNFT()</code> - For top players</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><code className="text-xs">mintWinnerNFT()</code> - For game winners</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span><code className="text-xs">_calculateLegacyBonus()</code> - Computes bonuses</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
}