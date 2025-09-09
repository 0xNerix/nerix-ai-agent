"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton, useAccountModal } from '@rainbow-me/rainbowkit';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAccount, useBalance } from 'wagmi';
import { isTestnetNetwork } from '@/lib/web3/network-config';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WalletConnectModal } from '@/components/layout/wallet-connect-modal';
import { useCurrency } from "@/lib/hooks/use-currency";
import { useBetaAccess } from "@/lib/hooks/use-beta-access";
import { User, ChevronDown, MessageCircle, MessagesSquare, Wallet, Copy, Check, LogOut, Key, ExternalLink, DollarSign, Coins, Share2, Youtube } from 'lucide-react';
import { NotificationCenter } from '@/components/layout/notification-center';
import { BetaCodeModal } from './beta-code-modal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Custom X (Twitter) icon component
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="20"
      height="20"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );
}

export function HeaderAuth() {
  // const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession({
    required: false,
  });

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }
  const { address, chain, chainId } = useAccount();
  const { data: balance } = useBalance({ address });
  const { openAccountModal } = useAccountModal();
  const router = useRouter();
  const { currency, toggleCurrency } = useCurrency();
  const { hasBetaAccess } = useBetaAccess();
  const [isWalletConnectOpen, setIsWalletConnectOpen] = useState(false);
  const [isBetaCodeOpen, setIsBetaCodeOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleCurrencyToggle = () => {
    toggleCurrency();
  };

  const socialLinks = [
    {
      name: "X",
      icon: <XIcon className="w-4 h-4 text-white" />,
      href: "https://x.com/0xNerix",
    },
    {
      name: "Discord",
      icon: <MessageCircle className="w-4 h-4 text-[#5865F2]" />,
      href: "https://discord.gg/bvxzdHgBPW",
    },
    {
      name: "Telegram",
      icon: <MessagesSquare className="w-4 h-4 text-[#0088cc]" />,
      href: "https://t.me/nerixaiprotocol",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-4 h-4 text-[#FF0000]" />,
      href: "https://www.youtube.com/@0xNerix",
    }
  ];


  // Loading state - only show loading during actual loading
  if (status === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 right-6 z-50 flex items-center gap-2"
      >
        {/* Social Links - Share button with dropdown - Hide on scroll */}
        {!isScrolled && (
          <Popover>
            <PopoverTrigger asChild>
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="group relative p-2.5 rounded-lg bg-background/60 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-background/80"
                aria-label="Share social links"
              >
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                </div>
              </motion.button>
            </PopoverTrigger>
            <PopoverContent 
              align="start"
              side="bottom"
              className="w-auto p-2 bg-background/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl"
              sideOffset={8}
            >
              <div className="flex items-center gap-2">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group relative p-2 rounded-lg bg-background/40 border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-background/80"
                    title={link.name}
                  >
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Notification Center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <NotificationCenter />
        </motion.div>

        {/* Currency Controls - Always visible with tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                onClick={handleCurrencyToggle}
                className="group relative p-2.5 rounded-lg bg-background/60 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-background/80"
                aria-label="Share social links"
              >
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {currency === "BNB" ? (
                    <Coins className="w-4 h-4 text-yellow-500" />
                  ) : currency === "ETH" ? (
                    <Coins className="w-4 h-4 text-blue-500" />
                  ) : (
                    <DollarSign className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Current: {currency} - Click to switch currency</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Loading state for auth button */}
        <Button
          disabled
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-4 py-2 h-10 rounded-lg shadow-sm opacity-50"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Loading...
        </Button>
      </motion.div>
    );
  }

  const handleProfileClick = () => {
    if (session?.address) {
      router.push(`/profile/${session.address}`);
      setIsOpen(false);
    }
  };

  const handleDisconnect = () => {
    signOut();
    setIsOpen(false);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatAddress = (address: string, full = false) => {
    if (!address) return '';
    return full ? address : `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainInfo = () => {
    if (!chain || !chainId) return null;
    
    const chainInfo = {
      name: chain.name,
      id: chainId,
      isTestnet: isTestnetNetwork(),
      explorerUrl: chain.blockExplorers?.default?.url
    };

    return chainInfo;
  };

  const formatBalance = (balance: any) => {
    if (!balance) return '0.00';
    return parseFloat(balance.formatted).toFixed(4);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 right-6 z-50 flex items-center gap-2"
      >
        {/* Social Links - Share button with dropdown - Hide on scroll */}
        {!isScrolled && (
          <Popover>
            <PopoverTrigger asChild>
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="group relative p-2.5 rounded-lg bg-background/60 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-background/80"
                aria-label="Share social links"
              >
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                </div>
              </motion.button>
            </PopoverTrigger>
            <PopoverContent 
              align="start"
              side="bottom"
              className="w-auto p-2 bg-background/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl"
              sideOffset={8}
            >
              <div className="flex items-center gap-2">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group relative p-2 rounded-lg bg-background/40 border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-background/80"
                    title={link.name}
                  >
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Notification Center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <NotificationCenter />
        </motion.div>

        {/* Currency Controls - Always visible with tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                onClick={handleCurrencyToggle}
                className="group relative p-2.5 rounded-lg bg-background/60 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-background/80"
                aria-label={`Switch currency (current: ${currency})`}
              >
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {currency === "BNB" ? (
                    <Coins className="w-4 h-4 text-yellow-500" />
                  ) : currency === "ETH" ? (
                    <Coins className="w-4 h-4 text-blue-500" />
                  ) : (
                    <DollarSign className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Current: {currency} - Click to switch</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Auth Section */}
        {!session ? (
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -1, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={openConnectModal}
                  className="h-[32px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
                >
                  <motion.div
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  >
                    <Wallet className="w-4 h-4" />
                  </motion.div>
                  <span>Connect Wallet</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </Button>
              </motion.div>
            )}
          </ConnectButton.Custom>
        ) : (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="group relative px-3 py-2 h-10 bg-background/60 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/40 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-background/80"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar className="w-6 h-6 border border-orange-500/30">
                    <AvatarImage src={session.user?.image || undefined} />
                    <AvatarFallback className="bg-orange-500/10 text-xs text-orange-600">
                      {session.address?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-orange-600">
                    {formatAddress(session.address || '')}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                </div>
              </Button>
            </PopoverTrigger>

            <PopoverContent 
              align="end" 
              className="w-64 p-0 bg-background/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl overflow-hidden"
              sideOffset={8}
            >
              <div className="space-y-0">
                {/* Header - Compact Wallet Info */}
                <div className="p-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    {/* Profile Avatar */}
                    <Avatar className="w-12 h-12 border-2 border-orange-500/30">
                      <AvatarImage src={session.user?.image || undefined} />
                      <AvatarFallback className="bg-orange-500/10 text-orange-600 font-semibold">
                        {session.address?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-1">
                      {/* Wallet Address with Copy */}
                      <div className="flex items-center gap-2">
                        <span 
                          className="font-semibold text-orange-600 text-sm group relative"
                          title={session.address || ''}
                        >
                          {formatAddress(session.address || '')}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(session.address || '')}
                          className="h-5 w-5 p-0 hover:bg-orange-500/10 hover:text-orange-600 transition-colors"
                          aria-label={isCopied ? "Address copied!" : "Copy wallet address"}
                        >
                          {isCopied ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 text-muted-foreground" />
                          )}
                        </Button>
                      </div>

                      {/* Clickable Wallet Details */}
                      <button
                        onClick={() => openAccountModal && openAccountModal()}
                        className="space-y-1 text-left hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors group w-full"
                        aria-label="View wallet details in modal"
                      >
                        {/* Chain Info */}
                        {getChainInfo() && (
                          <div className="text-xs text-blue-400 font-medium group-hover:text-blue-300">
                            {getChainInfo()?.name}
                          </div>
                        )}

                        {/* Balance */}
                        {balance && (
                          <div className="text-sm text-green-400 font-medium group-hover:text-green-300">
                            {formatBalance(balance)} {balance.symbol}
                          </div>
                        )}

                        {/* View More Link */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-blue-400 transition-colors">
                          <ExternalLink className="w-3 h-3" />
                          <span>View wallet details</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 space-y-2">
                  <Button
                    onClick={handleProfileClick}
                    variant="ghost"
                    className="w-full justify-start h-10 hover:bg-blue-500/10 text-blue-400 hover:text-blue-400 rounded-lg transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-3" />
                    View Profile
                  </Button>
                  
                  {!hasBetaAccess && (
                    <Button
                      onClick={() => {
                        setIsBetaCodeOpen(true);
                        setIsOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start h-10 hover:bg-green-500/10 text-green-400 hover:text-green-400 rounded-lg transition-all duration-200"
                    >
                      <Key className="w-4 h-4 mr-3" />
                      Enter Beta Code
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleDisconnect}
                    variant="ghost"
                    className="w-full justify-start h-10 hover:bg-red-500/10 text-red-400 hover:text-red-400 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Disconnect
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </motion.div>

      <WalletConnectModal 
        open={isWalletConnectOpen} 
        onOpenChange={setIsWalletConnectOpen} 
      />
      
      <BetaCodeModal
        open={isBetaCodeOpen}
        onOpenChange={setIsBetaCodeOpen}
      />
    </>
  );
}