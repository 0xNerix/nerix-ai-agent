import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support & Community',
  description: 'Connect with the Nerix AI gaming community. Get technical support, join Discord and Telegram, discuss partnerships, and become part of our growing AI gaming ecosystem on BNB Chain.',
  keywords: [
    'Nerix support', 'AI gaming community', 'Discord community', 'Telegram group', 
    'technical support', 'community help', 'partnerships', 'AI gaming help',
    'BNB Chain support', 'gaming community', 'blockchain gaming support', 'player support'
  ],
  openGraph: {
    title: 'Support & Community | Nerix AI Gaming Platform',
    description: 'Connect with the Nerix AI gaming community. Get support, join our Discord and Telegram, and become part of our ecosystem.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Support & Community | Nerix AI Gaming Platform',
    description: 'Connect with the Nerix AI gaming community. Get support and join our growing ecosystem.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}