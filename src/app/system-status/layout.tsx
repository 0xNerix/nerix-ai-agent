import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Status',
  description: 'Real-time status of Nerix AI Gaming Platform services including game servers, BNB Chain connectivity, AI systems, NFT contracts, and database performance. Monitor uptime and service availability.',
  keywords: [
    'Nerix status', 'platform status', 'system uptime', 'game server status', 'BNB Chain status',
    'AI system status', 'NFT contract status', 'service availability', 'platform monitoring',
    'blockchain status', 'gaming platform status', 'real-time status'
  ],
  openGraph: {
    title: 'Platform Status | Nerix AI Gaming Platform',
    description: 'Real-time status of Nerix AI Gaming Platform services including game servers, blockchain connectivity, and AI systems.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Platform Status | Nerix AI Gaming Platform',
    description: 'Monitor real-time status of Nerix AI Gaming Platform services and components.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function SystemStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}