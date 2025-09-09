"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Moon, 
  Sun, 
  DollarSign, 
  Coins, 
  GamepadIcon,
  Brain,
  Gift,
  Twitter,
  MessageCircle,
  MessagesSquare,
  Menu,
  X,
  Home,
  ImageIcon,
  Activity,
  LifeBuoy,
  Share2,
  Images,
  User,
  LogIn,
  Youtube,
  HelpCircle
} from "lucide-react";
import { LearnMorePopup } from "@/components/ui/learn-more-popup";
import { WalletConnectModal } from "@/components/layout/wallet-connect-modal";
import { useCurrency } from "@/lib/hooks/use-currency";
import { useMobileNavigation } from "@/lib/hooks/use-mobile-navigation";
import { Section } from "@/lib/hooks/use-url-hash";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";

interface LandingDockProps {
  onSectionChange?: (section: Section) => void;
  alwaysVisible?: boolean;
}

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

export function LandingDock({ onSectionChange, alwaysVisible = false }: LandingDockProps) {
  const { theme, setTheme } = useTheme();
  const { currency, toggleCurrency } = useCurrency();
  const router = useRouter();
  const { currentSection, isMobile, navigateToSection, scrollToTop } = useMobileNavigation();
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLearnMorePopupOpen, setIsLearnMorePopupOpen] = useState(false);
  const [isWalletConnectOpen, setIsWalletConnectOpen] = useState(false);

  useEffect(() => {
    if (alwaysVisible) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [isMobile, alwaysVisible]);

  const handleSectionNavigation = (section: Section) => {
    if (isMobile) {
      switch (section) {
        case 'hero':
          router.push('/');
          break;
        case 'games':
          router.push('/games');
          break;
        case 'nfts':
          router.push('/nfts');
          break;
        case 'airdrop':
          router.push('/airdrop');
          break;
        case 'gallery':
          router.push('/gallery');
          break;
        case 'community':
          router.push('/support');
          break;
      }
      setIsMobileMenuOpen(false);
    } else {
      if (window.location.pathname === '/') {
        const element = document.getElementById(section);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        switch (section) {
          case 'hero':
            router.push('/');
            break;
          case 'games':
            router.push('/games');
            break;
          case 'nfts':
            router.push('/nfts');
            break;
          case 'airdrop':
            router.push('/airdrop');
            break;
          case 'gallery':
            router.push('/gallery');
            break;
          case 'community':
            router.push('/support');
            break;
        }
      }
    }
  };

  const handleScrollToTop = () => {
    if (isMobile || window.location.pathname !== '/') {
      // Go to homepage if on mobile or not already there
      router.push('/');
      setIsMobileMenuOpen(false);
    } else {
      // Scroll to top if on desktop and already on homepage
      scrollToTop();
      if (onSectionChange) {
        onSectionChange('hero');
      }
    }
  };

  const handleLearnMoreClick = () => {
    setIsLearnMorePopupOpen(true);
    if (isMobile) setIsMobileMenuOpen(false);
  };


  const isLoggedIn = !!session?.address;

  const menuItems = [
    {
      icon: <Home className="w-5 h-5 text-green-500" />,
      label: "Home",
      onClick: () => handleSectionNavigation('hero'),
      description: "Go to home",
      hoverBg: "hover:bg-green-500/20",
      section: 'hero' as Section
    },
    {
      icon: <GamepadIcon className="w-5 h-5 text-blue-500" />,
      label: "Play Challenge",
      onClick: () => handleSectionNavigation('games'),
      description: "Start playing",
      hoverBg: "hover:bg-blue-500/20",
      section: 'games' as Section
    },
    {
      icon: <ImageIcon className="w-5 h-5 text-purple-500" />,
      label: "NFTs",
      onClick: () => handleSectionNavigation('nfts'),
      description: "View NFTs",
      hoverBg: "hover:bg-purple-500/20",
      section: 'nfts' as Section
    },
    {
      icon: <Gift className="w-5 h-5 text-orange-500" />,
      label: "Join Airdrop",
      onClick: () => handleSectionNavigation('airdrop'),
      description: "Claim tokens",
      hoverBg: "hover:bg-orange-500/20",
      section: 'airdrop' as Section
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-orange-600" />,
      label: "How to Join",
      onClick: () => {
        router.push('/how-to-join');
        if (isMobile) setIsMobileMenuOpen(false);
      },
      description: "Step-by-step guide",
      hoverBg: "hover:bg-orange-600/20"
    },
    {
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      label: "Learn More",
      onClick: handleLearnMoreClick,
      description: "Read documentation",
      hoverBg: "hover:bg-purple-600/20"
    },
    {
      icon: <Images className="w-5 h-5 text-pink-500" />,
      label: "Gallery",
      onClick: () => handleSectionNavigation('gallery'),
      description: "View assets",
      hoverBg: "hover:bg-pink-500/20",
      section: 'gallery' as Section
    },
    {
      icon: <Activity className="w-5 h-5 text-emerald-500" />,
      label: "System Status",
      onClick: () => {
        router.push('/system-status');
        if (isMobile) setIsMobileMenuOpen(false);
      },
      description: "Check system status",
      hoverBg: "hover:bg-emerald-500/20"
    },
    {
      icon: <LifeBuoy className="w-5 h-5 text-cyan-500" />,
      label: "Support",
      onClick: () => handleSectionNavigation('community'),
      description: "Get support",
      hoverBg: "hover:bg-cyan-500/20",
      section: 'community' as Section
    }
  ];

  // Separate auth section
  const authItem = {
    icon: isLoggedIn ? <User className="w-5 h-5 text-accent" /> : <LogIn className="w-5 h-5 text-accent" />,
    label: isLoggedIn ? "Profile" : "Connect Wallet",
    onClick: () => {
      if (isLoggedIn && session?.address) {
        router.push(`/profile/${session.address}`);
      } else {
        setIsWalletConnectOpen(true);
      }
      if (isMobile) setIsMobileMenuOpen(false);
    },
    description: isLoggedIn ? "View profile" : "Connect wallet",
    hoverBg: "hover:bg-accent/20"
  };

  // Social media links - only visible on hover
  const socialMediaItems = [
    {
      icon: <XIcon className="w-5 h-5 text-white" />,
      label: "X (Twitter)",
      onClick: () => {
        window.open('https://x.com/0xNerix', '_blank');
        if (isMobile) setIsMobileMenuOpen(false);
      },
      description: "Follow us for updates and announcements",
      hoverBg: "hover:bg-white/10"
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#5865F2]" />,
      label: "Discord",
      onClick: () => {
        window.open('https://discord.gg/bvxzdHgBPW', '_blank');
        if (isMobile) setIsMobileMenuOpen(false);
      },
      description: "Join our community for support and discussions",
      hoverBg: "hover:bg-[#5865F2]/10"
    },
    {
      icon: <MessagesSquare className="w-5 h-5 text-[#0088cc]" />,
      label: "Telegram",
      onClick: () => {
        window.open('https://t.me/nerixaiprotocol', '_blank');
        if (isMobile) setIsMobileMenuOpen(false);
      },
      description: "Get real-time updates and connect with the team",
      hoverBg: "hover:bg-[#0088cc]/10"
    },
    {
      icon: <Youtube className="w-5 h-5 text-[#FF0000]" />,
      label: "YouTube",
      onClick: () => {
        window.open('https://www.youtube.com/@0xNerix', '_blank');
        if (isMobile) setIsMobileMenuOpen(false);
      },
      description: "Watch our latest videos and tutorials",
      hoverBg: "hover:bg-[#FF0000]/10"
    }
  ];


  // Mobile Menu
  if (isMobile) {
    return (
      <>
        {/* Floating Hamburger Button */}
        <div className={cn(
          "fixed top-4 left-4 z-50 transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        )}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "relative w-12 h-12 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-lg",
              "flex items-center justify-center transition-all duration-300",
              "hover:bg-background/60 active:scale-95"
            )}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 dock-gradient rounded-2xl opacity-50" />
            
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 relative z-10" />
            ) : (
              <Menu className="w-6 h-6 relative z-10" />
            )}
          </button>
        </div>

        {/* Mobile Dock Menu */}
        <div className={cn(
          "fixed left-4 top-20 z-50 transition-all duration-300 ease-out",
          isMobileMenuOpen ? "w-48" : "w-14",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        )}>
          <div className={cn(
            "relative flex flex-col gap-2 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300",
            isMobileMenuOpen ? "p-2" : "p-1"
          )}>
            {/* Animated gradient background */}
            <div className="absolute inset-0 dock-gradient rounded-2xl" />
            
            {/* Glow effects */}
            <div className={cn(
              "absolute inset-0 transition-opacity duration-300 rounded-2xl",
              isMobileMenuOpen ? "opacity-40" : "opacity-0"
            )}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-gradient-x rounded-2xl" />
            </div>

            {/* Nerix Logo */}
            <button
              onClick={handleScrollToTop}
              className={cn(
                "relative mb-2 transition-all duration-300 w-full",
                isMobileMenuOpen ? "px-2 py-3" : "px-1 py-2"
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  "rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-2 flex items-center justify-center transition-all duration-300",
                  isMobileMenuOpen ? "w-10 h-10 from-primary/40 to-secondary/40" : "w-9 h-9"
                )}>
                  <Image
                    src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                    alt="Nerix"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <div className={cn(
                  "flex-1 overflow-hidden transition-all duration-300 ease-out",
                  isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}>
                  <div className="flex-1 overflow-hidden">
                    <Image
                      src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg"
                      alt="Nerix"
                      width={120}
                      height={24}
                      className="h-6 hidden dark:block"
                    />
                    <Image
                      src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg"
                      alt="Nerix"
                      width={120}
                      height={24}
                      className="h-6 dark:hidden"
                    />
                  </div>
                </div>
              </div>
            </button>

            <div className="relative h-px bg-white/5 mx-2" />

            {/* Auth Section - Prominent */}
            <div className="relative mb-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-all duration-300",
                  "px-3 py-2 landing-dock-item hover:cursor-pointer",
                  "group/item bg-transparent",
                  authItem.hoverBg
                )}
                onClick={authItem.onClick}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  {authItem.icon}
                </div>
                <span className={cn(
                  "ml-3 transition-all duration-300 ease-out font-semibold",
                  isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}>
                  {authItem.label}
                </span>
              </Button>
            </div>

            <div className="relative h-px bg-white/5 mx-2" />

            {/* Menu Items */}
            <div className="relative space-y-1 max-h-[50vh] overflow-y-auto scrollbar-hide">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-all duration-300",
                    "px-3 py-2 landing-dock-item hover:cursor-pointer",
                    "group/item bg-transparent",
                    item.hoverBg,
                    item.section === currentSection && "bg-white/10 border border-white/20"
                  )}
                  onClick={item.onClick}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className={cn(
                    "ml-3 transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  )}>
                    {item.label}
                  </span>
                </Button>
              ))}
            </div>

            {/* Social Media Items - Only shown when menu is open, in a single row */}
            {isMobileMenuOpen && (
              <div className="relative pt-2 border-t border-white/5">
                <div className="flex gap-0.5">
                  {socialMediaItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 h-10 p-1 transition-all duration-300",
                        "landing-dock-item hover:cursor-pointer",
                        "group/item bg-transparent",
                        item.hoverBg
                      )}
                      onClick={item.onClick}
                    >
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center">
                        {item.icon}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="relative h-px bg-white/5 mx-2" />

            {/* Utility Buttons */}
            <div className="relative space-y-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCurrency}
                className="w-full justify-start transition-all duration-300 px-3 py-2 landing-dock-item hover:cursor-pointer hover:bg-primary/20 group/item"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  {currency === "ETH" ? (
                    <Coins className="w-5 h-5 text-primary" />
                  ) : (
                    <DollarSign className="w-5 h-5 text-primary" />
                  )}
                </div>
                <span className={cn(
                  "ml-3 transition-all duration-300 ease-out",
                  isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}>
                  Currency
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full justify-start transition-all duration-300 px-3 py-2 landing-dock-item hover:cursor-pointer hover:bg-accent/20 group/item"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <Sun className="w-5 h-5 text-accent rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute w-5 h-5 text-accent rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
                <span className={cn(
                  "ml-3 transition-all duration-300 ease-out",
                  isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}>
                  Theme
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <LearnMorePopup 
          open={isLearnMorePopupOpen} 
          onOpenChange={setIsLearnMorePopupOpen} 
        />

        {/* Wallet Connect Modal */}
        <WalletConnectModal 
          open={isWalletConnectOpen} 
          onOpenChange={setIsWalletConnectOpen} 
        />
      </>
    );
  }

  // Desktop version (original code with scroll functionality)
  return (
    <>
      <div className={cn(
        "fixed left-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out",
        "group hover:w-48",
        isCollapsed ? "w-14" : "w-16",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      )}>
        <div className={cn(
          "relative flex flex-col gap-2 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-background/70 group-hover:p-2",
          isCollapsed ? "p-1" : "p-2"
        )}>
          {/* Animated gradient background */}
          <div className="absolute inset-0 dock-gradient rounded-2xl" />
          
          {/* Glow effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-gradient-x rounded-2xl" />
          </div>

          {/* Nerix Logo */}
          <button
            onClick={handleScrollToTop}
            className={cn(
              "relative mb-2 transition-all duration-300 group-hover:px-2 group-hover:py-3 w-full",
              isCollapsed ? "px-1 py-2" : "px-2 py-3"
            )}
          >
            <div className="flex items-center">
              <div className={cn(
                "rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-2 flex items-center justify-center group-hover:from-primary/40 group-hover:to-secondary/40 transition-all duration-300 group-hover:w-10 group-hover:h-10",
                isCollapsed ? "w-9 h-9" : "w-10 h-10"
              )}>
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                  alt="Nerix"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className={cn(
                "flex-1 overflow-hidden opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
                "transition-all duration-300 ease-out"
              )}>
                <div className="flex-1 overflow-hidden">
                  <Image
                    src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg"
                    alt="Nerix"
                    width={120}
                    height={24}
                    className="h-6 hidden dark:block"
                  />
                  <Image
                    src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg"
                    alt="Nerix"
                    width={120}
                    height={24}
                    className="h-6 dark:hidden"
                  />
                </div>
              </div>
            </div>
          </button>

          <div className="relative h-px bg-white/5 mx-2" />

          {/* Auth Section - Prominent */}
          <div className="relative mb-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-300",
                "px-3 py-2 landing-dock-item hover:cursor-pointer",
                "group/item bg-transparent",
                authItem.hoverBg
              )}
              onClick={authItem.onClick}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                {authItem.icon}
              </div>
              <span className={cn(
                "ml-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 font-semibold",
                "transition-all duration-300 ease-out"
              )}>
                {authItem.label}
              </span>
            </Button>
          </div>

          <div className="relative h-px bg-white/5 mx-2" />

          {/* Menu Items */}
          <div className="relative space-y-1 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-all duration-300",
                  "px-3 py-2 landing-dock-item hover:cursor-pointer",
                  "group/item bg-transparent",
                  item.hoverBg
                )}
                onClick={item.onClick}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <span className={cn(
                  "ml-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
                  "transition-all duration-300 ease-out"
                )}>
                  {item.label}
                </span>
              </Button>
            ))}

          </div>

          <div className="relative h-px bg-white/5 mx-2" />

          {/* Social Media Section */}
          <div className="relative">
            {/* Collapsed Social Media Icon - Always visible */}
            <div className="block group-hover:hidden">
              <Button
                variant="ghost"
                className="w-full justify-start transition-all duration-300 px-3 py-2 landing-dock-item hover:cursor-pointer group/item bg-transparent hover:bg-gradient-to-r hover:from-white/10 hover:via-[#5865F2]/10 hover:to-[#0088cc]/10"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center relative">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                  Social
                </span>
              </Button>
            </div>

            {/* Expanded Social Media Icons - Only visible on dock hover, in a single row */}
            <div className="hidden group-hover:block">
              <div className="flex gap-0.5">
                {socialMediaItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex-1 h-10 p-1 transition-all duration-300",
                      "landing-dock-item hover:cursor-pointer",
                      "group/item bg-transparent",
                      item.hoverBg
                    )}
                    onClick={item.onClick}
                  >
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-px bg-white/5 mx-2" />

          {/* Utility Buttons */}
          <div className="relative space-y-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCurrency}
              className="w-full justify-start transition-all duration-300 px-3 py-2 landing-dock-item hover:cursor-pointer hover:bg-primary/20 group/item"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                {currency === "ETH" ? (
                  <Coins className="w-5 h-5 text-primary" />
                ) : (
                  <DollarSign className="w-5 h-5 text-primary" />
                )}
              </div>
              <span className={cn(
                "ml-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
                "transition-all duration-300 ease-out"
              )}>
                Currency
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-start transition-all duration-300 px-3 py-2 landing-dock-item hover:cursor-pointer hover:bg-accent/20 group/item"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Sun className="w-5 h-5 text-accent rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute w-5 h-5 text-accent rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </div>
              <span className={cn(
                "ml-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
                "transition-all duration-300 ease-out"
              )}>
                Theme
              </span>
            </Button>
          </div>
        </div>
      </div>

      <LearnMorePopup 
        open={isLearnMorePopupOpen} 
        onOpenChange={setIsLearnMorePopupOpen} 
      />

      {/* Wallet Connect Modal */}
      <WalletConnectModal 
        open={isWalletConnectOpen} 
        onOpenChange={setIsWalletConnectOpen} 
      />
    </>
  );
}