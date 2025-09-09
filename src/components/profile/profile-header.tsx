"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Copy, Check, ChevronDown, ChevronUp, Wallet, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  user: {
    address: string;
    displayName?: string;
    avatar?: string;
    createdAt: string;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { data: session } = useSession();

  // Check if current user is viewing their own profile
  const isOwnProfile = session?.address && user.address && 
    session.address.toLowerCase() === user.address.toLowerCase();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(user.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color theme based on profile ownership
  const themeColors = isOwnProfile ? {
    gradient: "from-orange-500 via-orange-600 to-amber-500",
    borderColor: "border-orange-500/30",
    bgColor: "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
    textColor: "text-orange-600",
    hoverBg: "hover:bg-orange-500/20"
  } : {
    gradient: "from-green-400 via-green-500 to-emerald-400",
    borderColor: "border-green-500/30",
    bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    textColor: "text-green-600",
    hoverBg: "hover:bg-green-500/20"
  };

  return (
    <div className="space-y-4">
      {/* Profile Ownership Indicator */}
      {!isOwnProfile && (
        <div className="text-center">
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            Viewing as Visitor
          </Badge>
        </div>
      )}

      {/* Avatar and Name Section */}
      <div className="text-center space-y-4">
        <div className="relative group inline-block">
          <div className={`absolute -inset-2 bg-gradient-to-r ${themeColors.gradient} rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
          <Avatar className={`relative w-20 h-20 border-3 ${themeColors.borderColor} mx-auto`}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback className={`text-xl ${themeColors.bgColor} ${themeColors.textColor}`}>
              {user.displayName ? user.displayName[0].toUpperCase() : user.address?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <h3 className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${themeColors.gradient}`}>
          {user.displayName || "Anonymous Player"}
          {isOwnProfile && <span className="ml-2 text-xs text-orange-400">(You)</span>}
        </h3>
      </div>

      {/* Wallet Info */}
      <div className="space-y-3">
        <div className="p-3 bg-background/30 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Wallet</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={`h-auto p-1 ${themeColors.hoverBg} ${themeColors.textColor}`}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
          <p className="text-sm font-mono text-foreground/90 mt-1">
            {formatAddress(user.address)}
          </p>
        </div>

        {/* Your Wallet Section - Only show for own profile */}
        {session?.address && isOwnProfile && (
          <Collapsible open={walletOpen} onOpenChange={setWalletOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full p-3 bg-background/30 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Your Wallet</span>
                  </div>
                  {walletOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <ConnectButton.Custom>
                {({ account, chain, openAccountModal, openChainModal, mounted, authenticationStatus }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                  if (!connected) {
                    return null;
                  }

                  return (
                    <div className="space-y-2">
                      {/* Network Info - Clickable */}
                      <motion.div
                        onClick={openChainModal}
                        className="p-3 bg-background/30 rounded-xl border border-blue-500/20 cursor-pointer hover:border-blue-500/40 transition-all duration-300 group"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Network</span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <RefreshCw className="w-3 h-3 text-blue-400 group-hover:rotate-180 transition-transform duration-300" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 16,
                                height: 16,
                                borderRadius: 999,
                                overflow: 'hidden',
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  width={16}
                                  height={16}
                                />
                              )}
                            </div>
                          )}
                          <span className="text-sm font-semibold text-blue-300">{chain.name}</span>
                        </div>
                      </motion.div>

                      {/* Balance Info - Clickable */}
                      <motion.div
                        onClick={openAccountModal}
                        className="p-3 bg-background/30 rounded-xl border border-green-500/20 cursor-pointer hover:border-green-500/40 transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Balance</span>
                          <span className="text-xs text-green-400">Available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-green-400">
                            {account.displayBalance || '0.00 ETH'}
                          </span>
                          <span className="text-xs text-muted-foreground">Click to view</span>
                        </div>
                      </motion.div>
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  );
}