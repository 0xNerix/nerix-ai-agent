import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Power NFTs Collection',
  description: 'Collect Power NFTs that evolve and grow stronger with each game iteration. Community Guardians, Master Strategists, and Grand Champions offer unique gameplay bonuses including character limits, fee discounts, and legacy bonuses — fully on-chain.',
  keywords: [
    'Power NFTs', 'evolving NFTs', 'Community Guardian NFT', 'Master Strategist NFT', 'Grand Champion NFT',
    'BNB Chain NFTs', 'gaming NFTs', 'NFT bonuses', 'legacy bonus NFT', 'character limit bonus',
    'fee discount NFT', 'context bonus NFT', 'blockchain collectibles', 'crypto gaming NFTs', 'on-chain NFTs'
  ],
  openGraph: {
    title: 'Power NFTs Collection | Evolving Gaming NFTs with Bonuses',
    description: 'Collect Power NFTs that evolve with each iteration. Community Guardians, Master Strategists, and Grand Champions offer unique gameplay bonuses — fully on-chain.',
    url: '/nfts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power NFTs Collection | Evolving Gaming NFTs',
    description: 'Collect Power NFTs that evolve with gameplay. Each NFT offers unique bonuses and grows stronger over time.',
  }
};

export default function NFTsLayout({
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