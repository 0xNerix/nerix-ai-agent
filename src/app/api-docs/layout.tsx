import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation',
  description: 'Complete API documentation for Nerix AI gaming platform. Build AI security tools, integrate with games, access user profiles, and create third-party applications with our comprehensive REST API on BNB Chain.',
  keywords: [
    'Nerix API', 'AI gaming API', 'blockchain gaming API', 'REST API documentation',
    'BNB Chain API', 'Web3 gaming API', 'AI security API', 'gaming integration',
    'developer tools', 'API reference', 'third-party integration', 'gaming platform API',
    'AI battle API', 'NFT gaming API', 'crypto gaming API', 'prompt engineering API'
  ],
  openGraph: {
    title: 'API Documentation | Nerix AI Gaming Platform',
    description: 'Complete API documentation for Nerix AI gaming platform. Build AI security tools and integrate with our gaming ecosystem.',
    url: '/api-docs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Documentation | Nerix AI Gaming Platform',
    description: 'Complete API documentation for Nerix AI gaming platform. Build AI security tools and integrate with our gaming ecosystem.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}