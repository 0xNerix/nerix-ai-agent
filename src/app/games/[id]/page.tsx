import { GameDetailLayout } from "@/components/games/game-detail/game-detail-layout";
import { GameWithCurrentState } from "@/database/type";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { serverApi } from "@/lib/api/server-client";

interface GamePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = await getGame(id);
  
  if (!game || game.isLocked) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found or is not available.',
      robots: { index: false, follow: false }
    };
  }

  const prizePool = game.currentPrizePool ? `${game.currentPrizePool} BNB` : 'TBD';
  
  return {
    title: `${game.name}`,
    description: `Join ${game.name} challenge! Current prize pool: ${prizePool}. Challenge the AI, win BNB, and collect evolving NFTs on Nerix gaming platform.`,
    keywords: `${game.name}, AI challenge, BNB gaming, crypto rewards, blockchain gaming, prize pool, NFT rewards, game challenge`,
    openGraph: {
      title: `${game.name} | Nerix AI Gaming Platform`,
      description: `Challenge the AI in ${game.name}! Prize pool: ${prizePool}`,
      type: 'website',
      images: game.coverImage ? [{ url: game.coverImage, alt: game.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} | Nerix AI Gaming Platform`,
      description: `Challenge the AI in ${game.name}! Prize pool: ${prizePool}`,
      images: game.coverImage ? [game.coverImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}


async function getGame(id: string) {
  try {
    return await serverApi.games.getById(id) as GameWithCurrentState;
  } catch (error) {
    return null;
  }
}

export default async function GamePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const game = await getGame(params.id);

  if (!game || game.isLocked) {
    notFound();
  }

  return <GameDetailLayout game={game} />;
}