"use client";

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Shield, Zap, ArrowRight } from 'lucide-react';

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletConnectModal({ open, onOpenChange }: WalletConnectModalProps) {
  const benefits = [
    {
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      title: "Secure & Private",
      description: "Your wallet stays in your control. We never store your private keys."
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: "Instant Access",
      description: "Connect once and access all features seamlessly across the platform."
    },
    {
      icon: <Wallet className="w-5 h-5 text-green-500" />,
      title: "Multi-Chain Support",
      description: "Support for BNB Chain and other popular blockchain networks."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border border-white/10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Connect your Web3 wallet to access your profile, track NFTs, and participate in games.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Benefits */}
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 p-1">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connect Button */}
          <div className="flex flex-col items-center space-y-6">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button
                            onClick={() => {
                              onOpenChange(false); // Close our modal first
                              setTimeout(() => openConnectModal(), 100); // Then open wagmi modal with small delay
                            }}
                            className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/80 hover:via-secondary/80 hover:to-accent/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group"
                          >
                            <Wallet className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Connect Wallet
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <Button
                            onClick={openChainModal}
                            variant="destructive"
                            className="w-full"
                          >
                            Wrong network
                          </Button>
                        );
                      }

                      return (
                        <div className="flex gap-2 w-full">
                          <Button
                            onClick={openChainModal}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <Image
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    width={12}
                                    height={12}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </Button>

                          <Button
                            onClick={openAccountModal}
                            variant="outline"
                            className="flex-1"
                          >
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </Button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>

            <p className="text-xs text-muted-foreground text-center">
              By connecting, you agree to our{" "}
              <button
                onClick={() => {
                  onOpenChange(false);
                  window.open('/terms-of-service', '_blank');
                }}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                Terms of Service
              </button>
              {" "}and{" "}
              <button
                onClick={() => {
                  onOpenChange(false);
                  window.open('/privacy-policy', '_blank');
                }}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}