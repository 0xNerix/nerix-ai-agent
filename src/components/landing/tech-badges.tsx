"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const technologies = [
  {
    name: "BNB Chain",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/bnb-logo.png",
    description: "Blockchain Infrastructure"
  },
  {
    name: "OpenAI",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/openai-favicon.png",
    description: "AI Technology"
  },
  {
    name: "Anthropic",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/anthropic-favicon.ico",
    description: "Claude AI"
  },
  {
    name: "xAI Grok",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/xai-favicon.svg",
    description: "AI Technology"
  },
  {
    name: "NodeJS",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/nodejs-favicon.ico",
    description: "JavaScript Runtime"
  },
  {
    name: "TypeScript",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/typescript-favicon.ico",
    description: "Type Safety"
  },
  {
    name: "React",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/react-favicon.ico",
    description: "UI Framework"
  },
  {
    name: "Next.js",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/nextjs-favicon.ico",
    description: "React Framework"
  },
  {
    name: "Tailwind CSS",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/tailwind-favicon.ico",
    description: "Styling Framework"
  },
  {
    name: "TanStack Query",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/tanstack-favicon.ico",
    description: "Data Fetching"
  },
  {
    name: "PostgreSQL",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/postgresql-favicon.ico",
    description: "Database"
  },
  {
    name: "Drizzle ORM",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/drizzle-favicon.ico",
    description: "Type-safe ORM"
  },
  {
    name: "MetaMask",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/MetaMask-icon-fox.svg",
    description: "Web3 Wallet"
  },
  {
    name: "Vercel",
    logo: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/icons/vercel-favicon.ico",
    description: "Deployment Platform"
  }
];

export function TechBadges() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-2xl opacity-30" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
                Built on a Cutting-Edge Tech Stack
              </span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technologies from the most trusted companies in AI, blockchain, and web development
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main Tech Container */}
          <div className="bg-background/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Technology Logos - Infinite Scroll */}
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: [0, -2000] }}
                transition={{
                  duration: 40,
                  repeat: 9999,
                  ease: "linear",
                  repeatType: "loop"
                }}
                className="flex items-center gap-12 whitespace-nowrap"
                style={{ width: 'max-content' }}
              >
                {/* Triple the array for seamless infinite loop */}
                {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                  <div 
                    key={`${tech.name}-${index}`}
                    className="group flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-all duration-300 min-w-fit border border-white/5 hover:border-white/10"
                  >
                    <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {tech.description}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center mt-8 gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-500 font-semibold">
                  Secure & Audited
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm text-blue-500 font-semibold">
                  Enterprise Grade
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm text-purple-500 font-semibold">
                  Production Ready
                </span>
              </div>
            </div>
          </div>

          {/* Background Glow Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl opacity-50 rounded-3xl -z-10 animate-pulse"></div>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 blur-3xl opacity-30 rounded-3xl -z-20"></div>
        </motion.div>
      </div>
    </section>
  );
}