"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { LandingDock } from "@/components/layout/landing-dock";
import { AirdropPreview } from "@/components/landing/airdrop-preview";
import { WelcomeWrapper } from "@/components/landing/welcome-wrapper";
import { NFTPreview } from "@/components/landing/nft-preview";
import { AssetGallery } from "@/components/landing/assets-gallery";
import { HeaderAuth } from "@/components/layout/header-auth";
import { useMobileNavigation } from "@/lib/hooks/use-mobile-navigation";
import { Section } from "@/lib/hooks/use-url-hash";
import { GamesPreview } from "./landing/games-preview";
import { TechBadges } from "@/components/landing/tech-badges";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import { SmartNotificationPrompt } from "@/components/layout/smart-notification-prompt";
import Link from "next/link";

interface HomeClientProps {
  airdropData?: any;
  gamesData: any;
}

export default function HomeClient({ airdropData, gamesData }: HomeClientProps) {
  const { currentSection, isMobile } = useMobileNavigation();
  const [currentMobileSection, setCurrentMobileSection] = useState<Section>('hero');

  useEffect(() => {
    if (isMobile) {
      setCurrentMobileSection(currentSection);
    }
  }, [currentSection, isMobile]);

  const handleSectionChange = (section: Section) => {
    setCurrentMobileSection(section);
  };

  const renderMobileSection = () => {
    switch (currentMobileSection) {
      case 'hero':
        return <HeroSection />;
      case 'games':
        return <GamesPreview games={gamesData.games || gamesData} />;
      case 'nfts':
        return <NFTPreview />;
      case 'airdrop':
        return <AirdropPreview initialData={airdropData} />;
      case 'gallery':
        return <AssetGallery />;
      case 'technologies':
        return <TechBadges />;
      case 'community':
        return <FeatureSection />;
      default:
        return <HeroSection />;
    }
  };

  if (isMobile) {
    return (
      <main className="min-h-screen gradient-bg">
        <HeaderAuth />
        <WelcomeWrapper />
        <LandingDock onSectionChange={handleSectionChange} />
        
        <div className="min-h-screen">
          {renderMobileSection()}
        </div>

        {currentMobileSection === 'community' && <Footer />}
        
        {/* Smart Notification Prompt */}
        <SmartNotificationPrompt />
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <HeaderAuth />
      
      {/* Content */}
      <div className="relative z-10">
        <WelcomeWrapper />
        <LandingDock />

        <section id="hero" className="relative">
          <HeroSection />
        </section>
        
        <section id="games" className="relative">
          <GamesPreview games={gamesData.games || gamesData} />
        </section>

        <section id="nfts" className="relative">
          <NFTPreview />
        </section>

        <section id="airdrop" className="relative">
          <AirdropPreview initialData={airdropData} />
        </section>

        <section id="gallery" className="relative">
          <AssetGallery />
        </section>

        <section id="technologies" className="relative">
          <TechBadges />
        </section>


        <section id="community" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/15 via-emerald-500/10 to-emerald-500/20">
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-accent to-emerald-500 blur-2xl opacity-30" />
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-accent to-emerald-500 animate-gradient-x">
                    Contact & Support
                  </span>
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our growing community of AI gaming enthusiasts. Get support, share ideas, discuss partnerships, and connect with fellow players and developers.
              </p>
              <Button size="lg" asChild className="group relative overflow-hidden px-8 py-4 text-lg font-semibold bg-gradient-to-r from-emerald-500 via-accent to-emerald-500 hover:from-emerald-600 hover:via-accent/90 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500">
                <Link href="/support">
                  <span className="relative z-10 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Connect Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Smart Notification Prompt */}
      <SmartNotificationPrompt />
    </main>
  );
}