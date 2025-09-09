import { Metadata } from 'next';
import { NFTSection } from "@/components/landing/nft-section";
import { LandingDock } from "@/components/layout/landing-dock";
import { HeaderAuth } from "@/components/layout/header-auth";


export default async function NFTsPage() {
  return (
    <main className="min-h-screen gradient-bg">
      <HeaderAuth />
      <LandingDock alwaysVisible={true} />
      <NFTSection />
    </main>
  );
}