"use client";

import { useState } from "react";
import { GameHero } from "./game-hero";
import { GameChat } from "./chat/game-chat";
import { GameNavigationBar } from "./game-navigation-bar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GameWithCurrentState } from "@/database/type";
import { GameInfoDialog } from "./game-info-dialog";
import { useGame } from "@/lib/hooks/use-game";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Key } from "lucide-react";
import { BetaCodeModal } from "@/components/layout/beta-code-modal";
import { useBetaAccess } from "@/lib/hooks/use-beta-access";

interface GameDetailLayoutProps {
  game: GameWithCurrentState;
}

export function GameDetailLayout({ game }: GameDetailLayoutProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"split" | "chat-only">("split");
  const [dialogContent, setDialogContent] = useState<"info" | null>(null);
  const [showGameInfoDialog, setShowGameInfoDialog] = useState(false);
  const [gameInfoDefaultTab, setGameInfoDefaultTab] = useState("overview");
  const [showBetaCodeModal, setShowBetaCodeModal] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  const { hasBetaAccess, isLoading: isBetaLoading } = useBetaAccess();

  // Use the game hook once at the layout level, passing initial data to avoid duplicate fetch
  const gameData = useGame(game.id, { 
    initialGameData: game 
  });

  const toggleViewMode = () => {
    setViewMode(viewMode === "split" ? "chat-only" : "split");
  };

  // If beta game and user doesn't have beta access, show access required screen
  const showBetaAccessRequired = game.isBeta && (
    !session?.address || 
    (session?.address && !isBetaLoading && !hasBetaAccess)
  );
  
  if (showBetaAccessRequired) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 backdrop-blur-sm mx-auto mb-6 flex items-center justify-center">
            <Lock className="w-10 h-10 text-orange-400" />
          </div>
          
          <div className="mb-4">
            <div className="inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 backdrop-blur-sm mb-4">
              <span className="text-sm font-semibold text-orange-400">BETA</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-3">{game.name}</h1>
          <p className="text-muted-foreground mb-6">
            This is a beta game. You need beta access to play.
          </p>
          
          <div className="space-y-3">
            {session?.address ? (
              <Button 
                onClick={() => setShowBetaCodeModal(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                <Key className="w-4 h-4 mr-2" />
                Enter Beta Code
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Please connect your wallet to enter a beta code.
              </p>
            )}
            
            <Button 
              onClick={() => router.push('/games')}
              variant="ghost"
              className="w-full"
            >
              Back to Games
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Full Background Effects - Fixed position */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        {animationsEnabled ? (
          <>
            {/* Animated Color Background */}
            <div 
              className="absolute inset-0"
              style={{
                animation: 'backgroundColorShift 30s ease-in-out infinite',
                backgroundSize: '400% 400%'
              }}
            />
            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/12 via-blue-900/8 to-indigo-900/12" />
            <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/10 via-transparent to-cyan-900/12" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/6 via-transparent to-green-900/10" />
          </>
        ) : (
          <>
            {/* Simple Background */}
            <div className="absolute inset-0 bg-background" />
          </>
        )}
        
        {animationsEnabled ? (
          <>
            {/* Multi-layer Animated Grids */}
            <div 
              className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:20px_20px]"
              style={{ 
                animation: 'gridFloat1 6s ease-in-out infinite',
                animationDelay: '0s',
                animationFillMode: 'both'
              }}
            />
            <div 
              className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff12_1px,transparent_1px),linear-gradient(to_bottom,#00ffff12_1px,transparent_1px)] bg-[size:35px_35px]"
              style={{ 
                animation: 'gridFloat2 8s ease-in-out infinite',
                animationDelay: '2s',
                animationFillMode: 'both'
              }}
            />
            <div 
              className="absolute inset-0 bg-[linear-gradient(to_right,#ff00ff08_1px,transparent_1px),linear-gradient(to_bottom,#ff00ff08_1px,transparent_1px)] bg-[size:50px_50px]"
              style={{ 
                animation: 'gridFloat3 10s ease-in-out infinite',
                animationDelay: '4s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 1: Floating Geometric Circle */}
            <div 
              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-blue-400/30"
              style={{ 
                left: '20%', 
                top: '25%', 
                animation: 'gentleFloat 8s ease-in-out infinite',
                animationDelay: '0s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 2: Morphing Shape */}
            <div 
              className="absolute w-16 h-16 bg-gradient-to-br from-pink-400/15 to-rose-400/15 border border-pink-400/25"
              style={{ 
                left: '75%', 
                top: '15%', 
                animation: 'morphShape 12s ease-in-out infinite',
                animationDelay: '1s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 3: Orbiting Element */}
            <div 
              className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/25 to-teal-400/25"
              style={{ 
                left: '60%', 
                top: '60%', 
                animation: 'slowOrbit 20s linear infinite',
                animationDelay: '2s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 4: Glowing Pulse */}
            <div 
              className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-violet-400/10 to-indigo-400/10"
              style={{ 
                left: '15%', 
                top: '70%', 
                animation: 'pulseGlow 10s ease-in-out infinite',
                animationDelay: '3s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 5: Fade In/Out Square */}
            <div 
              className="absolute w-14 h-14 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-lg border border-emerald-400/30"
              style={{ 
                left: '85%', 
                top: '75%', 
                animation: 'fadeInOut 14s ease-in-out infinite',
                animationDelay: '4s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 6: Wave Movement */}
            <div 
              className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 border border-amber-400/30"
              style={{ 
                left: '40%', 
                top: '20%', 
                animation: 'gentleWave 16s ease-in-out infinite',
                animationDelay: '5s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 7: Slow Spinning Triangle */}
            <div 
              className="absolute w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-fuchsia-400/25"
              style={{ 
                left: '30%', 
                top: '45%', 
                animation: 'slowSpin 18s linear infinite',
                animationDelay: '6s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 8: Breathing Scale */}
            <div 
              className="absolute w-18 h-18 rounded-full bg-gradient-to-r from-lime-400/15 to-green-400/15 border border-lime-400/25"
              style={{ 
                left: '70%', 
                top: '35%', 
                animation: 'breatheScale 11s ease-in-out infinite',
                animationDelay: '7s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 9: 3D Float Movement */}
            <div 
              className="absolute w-12 h-12 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-lg border border-red-400/30"
              style={{ 
                left: '50%', 
                top: '80%', 
                animation: 'floatUpDown 13s ease-in-out infinite',
                animationDelay: '8s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 10: Gentle Drift Diamond */}
            <div 
              className="absolute w-10 h-10 bg-gradient-to-r from-sky-400/20 to-blue-400/20 border border-sky-400/30 transform rotate-45"
              style={{ 
                left: '10%', 
                top: '50%', 
                animation: 'gentleDrift 15s ease-in-out infinite',
                animationDelay: '9s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Additional Elements for Show Mode */}
            {/* Element 11: Orbiting Star */}
            <div 
              className="absolute w-6 h-6 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 transform rotate-45"
              style={{ 
                left: '35%', 
                top: '30%', 
                animation: 'slowOrbit 15s linear infinite reverse',
                animationDelay: '1s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 12: Pulsing Hexagon */}
            <div 
              className="absolute w-8 h-8 bg-gradient-to-br from-teal-400/25 to-blue-400/25"
              style={{ 
                left: '90%', 
                top: '45%', 
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                animation: 'pulseGlow 9s ease-in-out infinite',
                animationDelay: '2s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 13: Floating Rectangle */}
            <div 
              className="absolute w-6 h-16 bg-gradient-to-t from-purple-400/20 to-pink-400/20 rounded-lg border border-purple-400/30"
              style={{ 
                left: '5%', 
                top: '20%', 
                animation: 'gentleFloat 7s ease-in-out infinite',
                animationDelay: '3s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 14: Morphing Oval */}
            <div 
              className="absolute w-20 h-12 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full border border-indigo-400/25"
              style={{ 
                left: '80%', 
                top: '25%', 
                animation: 'morphShape 14s ease-in-out infinite',
                animationDelay: '5s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 15: Spinning Pentagon */}
            <div 
              className="absolute w-10 h-10 bg-gradient-to-br from-green-400/25 to-emerald-400/25 border border-green-400/35"
              style={{ 
                left: '25%', 
                top: '65%', 
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                animation: 'slowSpin 16s linear infinite',
                animationDelay: '7s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 16: Drifting Circle */}
            <div 
              className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-rose-400/20 to-red-400/20 border border-rose-400/30"
              style={{ 
                left: '95%', 
                top: '85%', 
                animation: 'gentleDrift 11s ease-in-out infinite',
                animationDelay: '4s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 17: Breathing Triangle */}
            <div 
              className="absolute w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-cyan-400/30"
              style={{ 
                left: '55%', 
                top: '10%', 
                animation: 'breatheScale 12s ease-in-out infinite',
                animationDelay: '6s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 18: Wave Square */}
            <div 
              className="absolute w-12 h-12 bg-gradient-to-br from-orange-400/18 to-yellow-400/18 rounded-md border border-orange-400/28"
              style={{ 
                left: '12%', 
                top: '40%', 
                animation: 'gentleWave 13s ease-in-out infinite',
                animationDelay: '8s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 19: Orbiting Mini Circle */}
            <div 
              className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-violet-400/35 to-purple-400/35"
              style={{ 
                left: '45%', 
                top: '75%', 
                animation: 'slowOrbit 18s linear infinite',
                animationDelay: '9s',
                animationFillMode: 'both'
              }}
            />
            
            {/* Element 20: Fade Diamond */}
            <div 
              className="absolute w-8 h-8 bg-gradient-to-br from-lime-400/22 to-green-400/22 border border-lime-400/32 transform rotate-45"
              style={{ 
                left: '88%', 
                top: '60%', 
                animation: 'fadeInOut 16s ease-in-out infinite',
                animationDelay: '10s',
                animationFillMode: 'both'
              }}
            />
          </>
        ) : (
          <>
            {/* Simple Static Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
          </>
        )}
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        {viewMode === "split" ? (
          <div className="space-y-2">
            {/* Top Navigation Bar - Full Width */}
            <GameNavigationBar 
              game={game}
              gameData={gameData}
              onOpenGameInfo={() => {
                setGameInfoDefaultTab("overview");
                setShowGameInfoDialog(true);
              }}
              onOpenSystemPrompt={() => {
                setGameInfoDefaultTab("system");
                setShowGameInfoDialog(true);
              }}
              onAnimationToggle={setAnimationsEnabled}
            />

            {/* Game Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
              {/* Game Info */}
              <div className="lg:col-span-1 space-y-6">
                <GameHero 
                  game={game}
                  gameData={gameData}
                  hideNavigationBar={true}
                  onOpenGameInfo={() => {
                    setGameInfoDefaultTab("overview");
                    setShowGameInfoDialog(true);
                  }}
                  onOpenSystemPrompt={() => {
                    setGameInfoDefaultTab("system");
                    setShowGameInfoDialog(true);
                  }}
                />
              </div>

              {/* Chat */}
              <div className="lg:col-span-2">
                <GameChat 
                  game={game}
                  gameData={gameData}
                  isCompact={false}
                  onToggleView={toggleViewMode}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <GameChat 
              game={game}
              gameData={gameData}
              isCompact={true}
              onViewInfo={() => setDialogContent("info")}
              onToggleView={toggleViewMode}
            />
          </div>
        )}
      </div>

      {/* Combined Game Info Dialog */}
      <GameInfoDialog 
        isOpen={showGameInfoDialog}
        onClose={() => setShowGameInfoDialog(false)}
        game={game}
        defaultTab={gameInfoDefaultTab}
      />

      {/* Mobile Info Modal */}
      <Dialog open={!!dialogContent} onOpenChange={() => setDialogContent(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {dialogContent === "info" && (
            <div className="space-y-6">
              <GameHero 
                game={game}
                gameData={gameData}
                onOpenGameInfo={() => {
                  setDialogContent(null);
                  setGameInfoDefaultTab("overview");
                  setShowGameInfoDialog(true);
                }}
                onOpenSystemPrompt={() => {
                  setDialogContent(null);
                  setGameInfoDefaultTab("system");
                  setShowGameInfoDialog(true);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Beta Code Modal */}
      <BetaCodeModal 
        open={showBetaCodeModal}
        onOpenChange={setShowBetaCodeModal}
      />
    </div>
  );
}