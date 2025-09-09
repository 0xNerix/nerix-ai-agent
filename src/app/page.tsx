import HomeClient from "@/components/home-client";
import { serverApi } from "@/lib/api/server-client";
import { logger } from '@/lib/utils/logger';

export const dynamic = 'force-dynamic';

async function getAirdropData() {
  try {
    return await serverApi.airdrop.getStats();
  } catch (error) {
    logger.error('Failed to fetch airdrop data:', error);
    // Return default data structure on error
    return {
      levels: [],
      stats: {
        totalParticipants: 0,
        totalTokensDistributed: 0,
        totalMessageCreditsDistributed: 0,
        airdropEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        prelaunchEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        isPrelaunch: true
      }
    };
  }
}

async function getGames() {
  return serverApi.games.getAll();
}

export default async function Home() {
  const [airdropData, gamesData] = await Promise.all([
    getAirdropData(),
    getGames()
  ]);

  return <HomeClient airdropData={airdropData} gamesData={gamesData} />;
}