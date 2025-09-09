import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Battle Arena',
  description: 'Enter the AI Battle Arena and challenge our self-evolving AI in Checkmate Paradox and The Endless Loop. Use natural language to outsmart AI systems, win BNB prize pools, and collect evolving NFTs — fully on-chain.',
  keywords: [
    'AI battle arena', 'AI gaming', 'self evolving AI', 'checkmate paradox', 'endless loop game', 
    'natural language AI', 'BNB chain gaming', 'blockchain gaming', 'crypto games',
    'AI challenges', 'prompt engineering', 'AI competitions', 'NFT rewards',
    'on-chain gaming', 'BNB prizes', 'GameFi', 'Web3 gaming', 'evolving NFTs'
  ],
  openGraph: {
    title: 'AI Battle Arena | Challenge Self-Evolving AI Systems',
    description: 'Enter the AI Battle Arena and challenge our self-evolving AI in strategic games, win BNB prizes, and collect evolving NFTs — fully on-chain.',
    url: '/games',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Battle Arena | Challenge Self-Evolving AI Systems',
    description: 'Enter the AI Battle Arena and challenge our self-evolving AI in strategic games, win BNB prizes, and collect evolving NFTs.',
  }
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}