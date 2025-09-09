import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Checkmate Paradox',
  description: 'Explore the fascinating Checkmate Paradox in AI gaming - how strategic decision-making creates unpredictable outcomes in human vs AI interactions.',
  keywords: 'checkmate paradox, AI strategy, game theory, artificial intelligence, strategic decision making, human vs AI, chess strategy',
  openGraph: {
    title: 'The Checkmate Paradox | Nerix AI Gaming Platform',
    description: 'Explore the fascinating Checkmate Paradox in AI gaming and strategic decision-making.',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'The Checkmate Paradox | Nerix AI Gaming Platform',
    description: 'Explore the fascinating Checkmate Paradox in AI gaming and strategic decision-making.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function CheckmateParadoxLayout({
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