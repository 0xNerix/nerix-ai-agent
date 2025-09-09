import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Nerix AI Gaming Platform protects your privacy and handles personal information. Our comprehensive privacy policy covers wallet data, gaming interactions, AI communications, and blockchain transaction privacy.',
  keywords: [
    'privacy policy', 'data protection', 'wallet privacy', 'gaming privacy', 'blockchain privacy',
    'AI interaction privacy', 'personal data protection', 'GDPR compliance', 'data security',
    'user privacy rights', 'crypto gaming privacy', 'Web3 privacy'
  ],
  openGraph: {
    title: 'Privacy Policy | Nerix AI Gaming Platform',
    description: 'Learn how Nerix AI Gaming Platform protects your privacy and handles personal information in blockchain gaming.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Nerix AI Gaming Platform',
    description: 'Learn how Nerix protects your privacy in AI gaming and blockchain interactions.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function PrivacyPolicyLayout({
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