import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Join Nerix - AI Gaming Platform',
  description: 'Learn how to join Nerix AI Gaming Platform. Step-by-step guide to connect your wallet, challenge AI, win prizes and collect NFTs.',
  keywords: ['nerix', 'how to join', 'getting started', 'beginner guide', 'wallet connection', 'AI gaming', 'crypto rewards'],
  openGraph: {
    title: 'How to Join Nerix - AI Gaming Platform',
    description: 'Learn how to join Nerix AI Gaming Platform. Step-by-step guide to get started.',
    type: 'website',
    url: 'https://www.nerixai.com/how-to-join',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Join Nerix',
    description: 'Step-by-step guide to start your AI gaming adventure',
  },
};

export default function HowToPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}