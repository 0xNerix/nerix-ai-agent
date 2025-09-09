"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, MessageCircle, Zap, ZapOff } from "lucide-react";
import { GameWithCurrentState } from "@/database/type";
import { UseGameReturn } from "@/lib/hooks/use-game";
import { useRouter } from "next/navigation";
import { WalletButton } from "@/components/layout/wallet-button";
import { CurrencyButton } from "@/components/ui/currency-button";
import { useState, useEffect } from "react";

interface GameNavigationBarProps {
  game: GameWithCurrentState;
  gameData: UseGameReturn;
  onOpenGameInfo: () => void;
  onOpenSystemPrompt: () => void;
  onAnimationToggle?: (enabled: boolean) => void;
}

export function GameNavigationBar({ 
  game, 
  gameData, 
  onOpenGameInfo, 
  onOpenSystemPrompt,
  onAnimationToggle
}: GameNavigationBarProps) {
  const router = useRouter();
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('psychedelic-animations');
    if (saved !== null) {
      const enabled = saved === 'true';
      setAnimationsEnabled(enabled);
      onAnimationToggle?.(enabled);
    }
  }, [onAnimationToggle]);

  const handleAnimationToggle = () => {
    const newState = !animationsEnabled;
    setAnimationsEnabled(newState);
    localStorage.setItem('psychedelic-animations', newState.toString());
    onAnimationToggle?.(newState);
  };

  return (
    <div className="flex items-center justify-between w-full py-2 bg-tansparent backdrop-blur-sm rounded-lg">
      {/* Left side - Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/games')}
          className="text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Games
        </Button>

        <div className="h-4 w-px bg-white/20" /> {/* Separator */}

        <Button 
          variant="outline" 
          size="sm"
          onClick={onOpenGameInfo}
          className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
        >
          <Brain className="w-4 h-4" />
          <span className="hidden sm:inline">Game Guide</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onOpenSystemPrompt}
          className="flex items-center gap-2 hover:bg-secondary/10 hover:border-secondary/30 hover:text-secondary transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">System Prompt</span>
        </Button>
      </div>

      {/* Right side - Animation Toggle, Wallet & Currency */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAnimationToggle}
          className={`p-2 border border-transparent hover:border-border transition-all ${
            animationsEnabled 
              ? 'text-yellow-500 hover:text-yellow-400' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title={`${animationsEnabled ? 'Disable' : 'Enable'} psychedelic animations`}
        >
          {animationsEnabled ? (
            <Zap className="w-4 h-4" />
          ) : (
            <ZapOff className="w-4 h-4" />
          )}
        </Button>
        
        <div className="h-4 w-px bg-white/20" /> {/* Separator */}
        
        <CurrencyButton size="sm" />
        <WalletButton size="sm" />
      </div>
    </div>
  );
}