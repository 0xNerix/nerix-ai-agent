"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LearnMorePopup } from "@/components/ui/learn-more-popup";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { Moon, Sun, BookOpen, DollarSign, Coins, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useCurrency } from "@/lib/hooks/use-currency";
import Image from "next/image";

export function Dock() {
  const { theme, setTheme } = useTheme();
  const { currency, toggleCurrency } = useCurrency();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLearnMorePopupOpen, setIsLearnMorePopupOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <TooltipProvider delayDuration={0}>
          <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-lg">
            {/* Animated gradient background */}
            <div className="absolute inset-0 dock-gradient rounded-2xl" />
            
            {/* Glow effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-gradient-x rounded-2xl" />
            </div>

            {/* Games Navigation */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost" 
                  size="lg"
                  onClick={() => router.push('/')}
                  className="relative px-3 pt-2 group/logo"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                      alt="Nerix"
                      width={128}
                      height={128}
                      className="w-8 h-8 transition-transform duration-300 group-hover/logo:scale-110"
                    />
                    <Image
                      src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg"
                      alt="Nerix"
                      height={5}
                      width={50}
                      className="h-5 hidden dark:block"
                    />
                    <Image
                      src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg"
                      alt="Nerix"
                      height={5}
                      width={50}
                      className="h-5 dark:hidden"
                    />
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Browse Games</p>
              </TooltipContent>
            </Tooltip>

            <div className="relative h-6 w-px bg-white/5" />

            {/* Home */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push('/')}
                  className={`relative w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 ${
                    pathname === '/' ? 'bg-primary/20' : 'hover:bg-primary/10'
                  }`}
                >
                  <Home className="w-5 h-5 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Home</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCurrency}
                  className="relative w-10 h-10 rounded-xl hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  {currency === "ETH" ? (
                    <Coins className="w-5 h-5 text-primary" />
                  ) : (
                    <DollarSign className="w-5 h-5 text-primary" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle currency ({currency})</p>
              </TooltipContent>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative w-10 h-10 rounded-xl hover:bg-accent/10 transition-all duration-300 hover:scale-110"
                >
                  <Sun className="w-5 h-5 text-accent rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute w-5 h-5 text-accent rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>

            {/* Learn More (Whitepaper) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLearnMorePopupOpen(true)}
                  className="relative w-10 h-10 rounded-xl hover:bg-secondary/10 transition-all duration-300 hover:scale-110"
                >
                  <BookOpen className="w-5 h-5 text-secondary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn More</p>
              </TooltipContent>
            </Tooltip>

            <div className="relative h-6 w-px bg-white/5" />
          </div>
        </TooltipProvider>
      </div>

      <LearnMorePopup 
        open={isLearnMorePopupOpen} 
        onOpenChange={setIsLearnMorePopupOpen} 
      />
    </>
  );
}