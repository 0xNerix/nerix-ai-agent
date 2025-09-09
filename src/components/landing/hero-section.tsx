"use client";

import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, GamepadIcon, Gift, ChevronRight as ChessKnight } from "lucide-react";
import { motion } from "framer-motion";
import { TutorialSystem } from "./tutorial";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMobileNavigation } from "@/lib/hooks/use-mobile-navigation";

export function HeroSection() {
  const router = useRouter();
  const { isMobile } = useMobileNavigation();
  
  const handleSectionNavigation = (sectionId: string) => {
    if (isMobile) {
      // On mobile, navigate to dedicated pages
      switch (sectionId) {
        case 'games':
          router.push('/games');
          break;
        case 'airdrop':
          router.push('/airdrop');
          break;
        default:
          // For other sections, use scroll behavior
          scrollToSection(sectionId);
      }
    } else {
      // On desktop, scroll to section within the same page
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };


  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-primary/15 via-primary/5 to-transparent">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
              style={{
                top: `${25 + i * 25}%`,
                opacity: 0.5,
                scale: 0.8,
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: 9999,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>


      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Logo */}
            <motion.div 
              className="flex lg:justify-start justify-center gap-6 items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <div className="relative rounded-3xl px-3 pt-2 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group hover:from-primary/30 hover:to-secondary/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                  alt="Nerix Logo"
                  width={128}
                  height={128}
                  className="w-24 h-24 object-contain relative"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg"
                  alt="Nerix"
                  height={12}
                  width={120}
                  className="h-12 hidden dark:block relative"
                />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg"
                  alt="Nerix"
                  height={12}
                  width={120}
                  className="h-12 dark:hidden relative"
                />
              </div>
            </motion.div>

             {/* Title */}
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold relative text-center lg:text-left"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary blur-2xl opacity-30" />
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
                  Hack the AI<br />
                  Win the Prize Pool<br />
                  Trigger the Evolution
                </span>
              </span>
            </motion.h1>

             {/* Description */}
            <motion.p 
              className="text-base text-muted-foreground leading-relaxed text-center lg:text-left"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Compete against a self-evolving AI. Use natural language to push its limits, win the full BNB prize pool, and collect evolving NFTs that boost your power in future iterations — fully on-chain.<br />
               Join the growing ecosystem and shape the future of AI gaming.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Play Challenge Button - Starts with Blue */}
              <Button 
                size="lg"
                onClick={() => handleSectionNavigation('games')}
                className="group relative px-8 py-6 overflow-hidden border-none transition-all duration-300"
                style={{
                  background: "linear-gradient(45deg, #3498db, #2ecc71, #9b59b6, #3498db)",
                  backgroundSize: "300% 300%",
                  animation: "gradientFlow 12s ease infinite",
                }}
              >
                <style jsx global>{`
                  @keyframes gradientFlow {
                    0% { background-position: 0% 50% }
                    50% { background-position: 100% 50% }
                    100% { background-position: 0% 50% }
                  }
                  @keyframes gradientFlow2 {
                    0% { background-position: 100% 50% }
                    50% { background-position: 0% 50% }
                    100% { background-position: 100% 50% }
                  }
                  @keyframes gradientFlow3 {
                    0% { background-position: 50% 0% }
                    50% { background-position: 50% 100% }
                    100% { background-position: 50% 0% }
                  }
                `}</style>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3498db] via-[#2ecc71] to-[#9b59b6] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ mixBlendMode: 'overlay' }}
                />
                <GamepadIcon className="w-5 h-5 mr-2 text-white" />
                <span className="text-white">Play Challenge</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 text-white" />
              </Button>

              {/* Airdrop Button - Starts with Green */}
              <Button 
                size="lg"
                onClick={() => handleSectionNavigation('airdrop')}
                className="group relative px-8 py-6 overflow-hidden border-none transition-all duration-300"
                style={{
                  background: "linear-gradient(45deg, #2ecc71, #9b59b6, #3498db, #2ecc71)",
                  backgroundSize: "300% 300%",
                  animation: "gradientFlow2 12s ease infinite",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2ecc71] via-[#9b59b6] to-[#3498db] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ mixBlendMode: 'overlay' }}
                />
                <Gift className="w-5 h-5 mr-2 text-white" />
                <span className="text-white">Join Airdrop</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 text-white" />
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Banner and Tutorial */}
          <div className="space-y-6">
            {/* Tutorial System */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TutorialSystem />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}