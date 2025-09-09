"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AirdropLevel } from "@/types/airdrop";
import { 
  Wallet, 
  Twitter, 
  MessageCircle, 
  MessagesSquare, 
  Check, 
  Loader2, 
  ArrowRight, 
  Coins, 
  Sparkles,
  Lock,
  Clock
} from "lucide-react";
import { useState } from "react";
import { handleError } from "@/lib/utils/logger";

interface AirdropLevelComponentProps {
  level: AirdropLevel;
  isCompleted: boolean;
  isActive: boolean;
  isLocked?: boolean;
  onComplete: (verificationData?: string) => Promise<void>;
}

export function AirdropLevelComponent({
  level,
  isCompleted,
  isActive,
  isLocked = false,
  onComplete
}: AirdropLevelComponentProps) {
  const [verificationData, setVerificationData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleComplete = async () => {
    if (isSubmitting || isLocked) return;

    // For wallet connection level
    if (level.type === "wallet") {
      if (!window.ethereum) {
        handleError(new Error('Web3 wallet not found'), 'Web3 wallet required', {
          toastDescription: 'Please install a Web3 wallet like MetaMask to continue.'
        });
        return;
      }
      
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        
        if (accounts[0]) {
          await onComplete(accounts[0]);
        }
      } catch (error) {
        handleError(error, 'Failed to connect wallet', {
          toastDescription: 'Could not connect your wallet. Please try again.'
        });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await onComplete(verificationData);
      setShowVerification(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialAction = () => {
    if (isLocked) return;
    
    if (level.socialLink) {
      window.open(level.socialLink, '_blank');
      setShowVerification(true);
    }
  };

  const getIcon = () => {
    if (isLocked) return <Lock className="w-5 h-5 text-orange-500" />;
    
    switch (level.type) {
      case "wallet":
        return <Wallet className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "discord":
        return <MessageCircle className="w-5 h-5" />;
      case "telegram":
        return <MessagesSquare className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getCardStyle = () => {
    if (isCompleted) {
      return "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30";
    }
    if (isLocked) {
      return "bg-orange-500/5 border-orange-500/20 opacity-75";
    }
    if (isActive) {
      return "bg-primary/10 border-primary/20 hover:bg-primary/20 hover:border-primary/30";
    }
    return "bg-background/20 border-white/10 opacity-50";
  };

  const getIconStyle = () => {
    if (isCompleted) {
      return "bg-emerald-500/20 text-emerald-500";
    }
    if (isLocked) {
      return "bg-orange-500/20 text-orange-500";
    }
    if (isActive) {
      return "bg-primary/20";
    }
    return "bg-background/20";
  };

  const getGradientStyle = () => {
    if (isCompleted) {
      return "from-emerald-500/5 via-transparent to-emerald-500/5";
    }
    if (isLocked) {
      return "from-orange-500/5 via-transparent to-orange-500/5";
    }
    return "from-primary/5 via-transparent to-secondary/5";
  };

  return (
    <Card className={`relative p-4 overflow-hidden backdrop-blur-sm transition-all duration-500 group ${getCardStyle()}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getGradientStyle()}`} />

      <div className="relative flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${getIconStyle()}`}>
          {getIcon()}
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">Level {level.id}</h3>
                {isLocked && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-xs">
                    <Lock className="w-3 h-3" />
                    Locked
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {level.description}
              </p>
              {isLocked && (
                <p className="text-xs text-orange-400 mt-1">
                  {level.id === 1 
                    ? "Airdrop registration has not started yet" 
                    : "Complete previous levels first"
                  }
                </p>
              )}
            </div>
            <div className="space-y-2">
              {level.rewards.map((reward, index) => (
                <div key={index} className={`px-3 py-0.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                  isLocked
                    ? 'bg-orange-500/10 text-orange-400'
                    : reward.type === 'token'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary/20 text-secondary'
                }`}>
                  {reward.type === 'token' ? (
                    <Coins className="w-3.5 h-3.5" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  {reward.label}
                </div>
              ))}
            </div>
          </div>

          {/* Verification Input */}
          {level.verificationField && isActive && !isCompleted && !isLocked && showVerification && (
            <div className="flex items-center gap-2">
              <Input
                placeholder={level.verificationField}
                value={verificationData}
                onChange={(e) => setVerificationData(e.target.value)}
                className="bg-background/50 h-10 text-sm flex-1"
              />
              <Button
                onClick={handleComplete}
                disabled={!verificationData || isSubmitting}
                className="h-9 bg-emerald-500 hover:bg-emerald-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying
                  </>
                ) : (
                  <>
                    Verify
                    <ArrowRight className="w-4 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Action Button */}
          {!showVerification && (
            <>
              {isLocked ? (
                <Button
                  disabled
                  className="h-9 w-full bg-orange-500/20 hover:bg-orange-500/20 text-orange-400 cursor-not-allowed"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {level.id === 1 ? "Registration Not Started" : "Complete Previous Levels"}
                </Button>
              ) : (
                <Button
                  onClick={level.socialLink ? handleSocialAction : handleComplete}
                  disabled={!isActive || isCompleted || isSubmitting}
                  className={`h-9 w-full group/button ${
                    isCompleted 
                      ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      {level.action}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/button:translate-x-1" />
                    </>
                  )}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}