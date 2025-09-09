import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NRX Token Airdrop',
  description: 'Join the NRX Token Airdrop and earn rewards through 4 levels: Connect Wallet, Share on Twitter, Join Discord, and Join Telegram. Claim NRX tokens and free message credits for The Endless Loop — fully on-chain rewards.',
  keywords: [
    'NRX token airdrop', 'Nerix airdrop', 'free NRX tokens', 'crypto airdrop', 'BNB Chain airdrop',
    'wallet connect rewards', 'Twitter share rewards', 'Discord rewards', 'Telegram rewards',
    'free message credits', 'endless loop free messages', 'AI gaming rewards', 'blockchain airdrop'
  ],
  openGraph: {
    title: 'NRX Token Airdrop | Earn Free Tokens & Message Credits',
    description: 'Join the NRX Token Airdrop and earn rewards through 4 levels. Connect wallet, engage socially, and claim NRX tokens plus free message credits.',
    url: '/airdrop',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRX Token Airdrop | Earn Free Tokens & Message Credits',
    description: 'Join the NRX Token Airdrop! 4 levels of rewards including NRX tokens and free message credits for AI gaming.',
  }
};

export default function AirdropLayout({
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