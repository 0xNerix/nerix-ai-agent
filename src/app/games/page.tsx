import { GameSection } from "@/components/landing/games-section";
import { LandingDock } from "@/components/layout/landing-dock";
import { HeaderAuth } from "@/components/layout/header-auth";
import { serverApi } from '@/lib/api/server-client';

async function getGames() {
  return serverApi.games.getAll();
}

export default async function GamesPage() {
  const gamesData = await getGames();
  
  return (
    <main className="min-h-screen gradient-bg">
      <HeaderAuth />
      <LandingDock alwaysVisible={true} />
      <GameSection games={gamesData.games || gamesData} />
    </main>
  );
}