import type { Metadata } from 'next';
import { Dock } from "@/components/layout/dock";

export const metadata: Metadata = {
  title: 'Technical Documentation',
  description: 'Comprehensive technical documentation of Nerix AI gaming platform. Explore system architecture, AI decision systems, economic models, NFT mechanics, security features, and BNB Chain integration — fully on-chain gaming technology.',
  keywords: [
    'Nerix documentation', 'AI gaming architecture', 'system documentation', 'blockchain gaming tech',
    'AI decision system', 'economic model', 'NFT mechanics', 'security features', 'BNB Chain integration',
    'smart contract architecture', 'game mechanics', 'technical overview', 'platform architecture'
  ],
  openGraph: {
    title: 'Technical Documentation | Nerix AI Gaming Platform',
    description: 'Comprehensive technical documentation of Nerix AI gaming platform architecture, AI systems, and blockchain integration.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Technical Documentation | Nerix AI Gaming Platform',
    description: 'Comprehensive technical documentation of Nerix AI gaming platform architecture and systems.',
  },
  robots: {
    index: true,
    follow: true,
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