import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Nerix AI Gaming Platform. Understand your rights, obligations, and rules for AI gaming, BNB transactions, NFT ownership, and smart contract interactions.',
  keywords: [
    'terms of service', 'terms and conditions', 'user agreement', 'AI gaming terms', 'blockchain gaming terms',
    'BNB transaction terms', 'NFT ownership terms', 'smart contract terms', 'legal agreement',
    'platform rules', 'gaming regulations', 'crypto gaming terms', 'Web3 gaming agreement'
  ],
  openGraph: {
    title: 'Terms of Service | Nerix AI Gaming Platform',
    description: 'Read the terms and conditions for using Nerix AI Gaming Platform, covering AI gaming, blockchain interactions, and NFT ownership.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Nerix AI Gaming Platform',
    description: 'Terms and conditions for Nerix AI Gaming Platform covering gaming, blockchain, and NFT interactions.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function TermsOfServiceLayout({
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