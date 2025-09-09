import type { Metadata } from 'next';
import { Dock } from "@/components/layout/dock";

export const metadata: Metadata = {
  title: 'BNB Chain Partnership Proposal',
  description: 'Comprehensive pitch deck showcasing Nerix AI gaming platform proposal for BNB Chain ecosystem integration, featuring innovative GameFi mechanics and AI-powered challenges.',
  keywords: 'BNB Chain partnership, GameFi proposal, AI gaming platform, blockchain integration, crypto gaming, web3 gaming, pitch deck',
  openGraph: {
    title: 'BNB Chain Partnership Proposal | Nerix AI Gaming Platform',
    description: 'Innovative AI gaming platform proposal for BNB Chain ecosystem integration.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNB Chain Partnership Proposal | Nerix AI Gaming Platform',
    description: 'Innovative AI gaming platform proposal for BNB Chain ecosystem integration.',
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  }
};

export default function BnbPitchDeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      <Dock />
    </div>
  );
}