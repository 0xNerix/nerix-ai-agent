import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visual Gallery',
  description: 'Explore the visual universe of Nerix AI gaming platform. Discover game assets, AI-generated artwork, Power NFT designs, and visual elements from ARIA Security, Checkmate Paradox, and The Endless Loop games.',
  keywords: [
    'Nerix visual gallery', 'AI gaming assets', 'game artwork', 'Power NFT designs',
    'ARIA security visuals', 'checkmate paradox art', 'endless loop graphics', 'AI art gallery',
    'blockchain game assets', 'crypto gaming visuals', 'digital art collection', 'gaming graphics'
  ],
  openGraph: {
    title: 'Visual Gallery | Nerix AI Gaming Platform Artwork',
    description: 'Explore the visual universe of Nerix AI gaming. Game assets, AI-generated artwork, and Power NFT designs from our gaming platform.',
    url: '/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Gallery | Nerix AI Gaming Platform Artwork',
    description: 'Explore the visual universe of Nerix AI gaming. Game assets, AI-generated artwork, and Power NFT designs.',
  }
};

export default function GalleryLayout({
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