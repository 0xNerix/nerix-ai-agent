"use client";

import { useRef } from "react";
import { HeaderSection } from "@/components/pitch-deck/header-section";
import { OverviewSection } from "@/components/pitch-deck/overview-section";
import { KeyFeaturesSection } from "@/components/pitch-deck/key-features-section";
import { BnbIntegrationSection } from "@/components/pitch-deck/bnb-integration-section";
import { SystemArchitectureSection } from "@/components/pitch-deck/system-architecture-section";
import { EconomicModelSection } from "@/components/pitch-deck/economic-model-section";
import { NftSystemSection } from "@/components/pitch-deck/nft-system-section";
import { TechnologySection } from "@/components/pitch-deck/technology-section";
import { SmartContractsSection } from "@/components/pitch-deck/smart-contracts-section";
import { BenefitsSection } from "@/components/pitch-deck/benefits-section";
import { RoadmapSection } from "@/components/pitch-deck/roadmap-section";
import { CreatorPlatformSection } from "@/components/pitch-deck/creator-platform-section";
import { BnbSubmissionSection } from "@/components/pitch-deck/bnb-submission-section";
import { ChessParadoxSection } from "@/components/pitch-deck/chess-paradox-section";
import { FooterSection } from "@/components/pitch-deck/footer-section";
import { ScrollToTopButton } from "@/components/pitch-deck/scroll-to-top-button";

export default function BnbPitchDeckPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" ref={contentRef}>
        {/* Header */}
        <HeaderSection />

        {/* Scroll to Top Button */}
        <ScrollToTopButton contentRef={contentRef} />

        {/* Main Content - All sections stacked vertically */}
        <div className="space-y-16">
          {/* Section 1: What is Nerix */}
          <OverviewSection />

          {/* Key Features */}
          <KeyFeaturesSection />

          {/* BNB Chain Integration */}
          <BnbIntegrationSection />

          {/* System Architecture */}
          <SystemArchitectureSection />

          {/* Economic Model & Data Visualizations */}
          <EconomicModelSection />

          {/* NFT System */}
          <NftSystemSection />

          {/* Technology */}
          <TechnologySection />

          {/* Smart Contracts */}
          <SmartContractsSection />

          {/* Benefits */}
          <BenefitsSection />

          {/* Roadmap */}
          <RoadmapSection />

          {/* Creator Platform */}
          <CreatorPlatformSection />

          {/* BNB Submission */}
          <BnbSubmissionSection />

          {/* Chess Paradox */}
          <ChessParadoxSection />
        </div>

        {/* Footer */}
        <FooterSection />
      </div>
    </main>
  );
}