"use client";

import { useState } from "react";
import { Brain, LayoutGrid, View, Shield, Users, Trophy, MessageCircle, Activity, Code, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { GameWithCurrentState } from "@/database/type";
import { UseGameReturn } from "@/lib/hooks/use-game";

interface ChatHeaderProps {
  game: GameWithCurrentState;
  gameData: UseGameReturn;
  isCompact?: boolean;
  onViewInfo?: () => void;
  onToggleView?: () => void;
  extraInfo?: {
    currentIteration?: string;
    gameActive?: boolean;
    prizePool?: string;
    isParticipant?: boolean;
    totalAttempts?: number;
    uniquePlayers?: number;
  };
}

export function ChatHeader({ 
  game,
  gameData,
  isCompact = false,
  onViewInfo,
  onToggleView,
  extraInfo
}: ChatHeaderProps) {
  const [showStatusDashboard, setShowStatusDashboard] = useState(false);
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);
  const [copiedContract, setCopiedContract] = useState<'game' | 'nft' | null>(null);

  const getStatusColor = () => {
    if (gameData.canSendMessage) return 'bg-emerald-500';
    if (gameData.gameStatus === 'processing_winner') return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getStatusText = () => {
    if (gameData.canSendMessage) return 'Active';
    if (gameData.gameStatus === 'processing_winner') return 'Processing';
    if (gameData.minutesRemaining > 0) return `Cooldown ${gameData.minutesRemaining}m`;
    return 'Inactive';
  };

  const handleCopyContract = async (contractAddress: string, type: 'game' | 'nft') => {
    await navigator.clipboard.writeText(contractAddress);
    setCopiedContract(type);
    setTimeout(() => setCopiedContract(null), 2000);
  };

  return (
    <div className="relative">
      {/* Main Header */}
      <div className="border-b p-4 flex-none bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Game Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                Chat with {game.name}
                <Shield className="w-4 h-4 text-primary" />
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>AI Opponent</span>
                <span>•</span>
                <span>Iteration {extraInfo?.currentIteration || gameData.currentIteration}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                  <span>{getStatusText()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Info */}
          <div className="flex items-center gap-3">
            {/* Total Attempts */}
            {extraInfo && extraInfo.totalAttempts !== undefined && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  {(extraInfo?.totalAttempts || gameData.totalAttempts).toLocaleString()}
                </span>
              </div>
            )}
            
            {/* Unique Players */}
            {extraInfo && extraInfo.uniquePlayers !== undefined && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">
                  {(extraInfo?.uniquePlayers || gameData.uniqueParticipants).toLocaleString()}
                </span>
              </div>
            )}
            
            {/* Prize Pool */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border border-yellow-500/20">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-bold text-white">
                {gameData.currentPrizePool}
              </span>
            </div>

            {/* View Controls */}
            {onToggleView && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onToggleView}
                className="flex items-center gap-2"
              >
                {isCompact ? (
                  <>
                    <LayoutGrid className="w-4 h-4" />
                    Full
                  </>
                ) : (
                  <>
                    <View className="w-4 h-4" />
                    Focus
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Chat Controls - Thin horizontal bar */}
        {!isCompact && (
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStatusDashboard(!showStatusDashboard)}
                className="flex items-center gap-2 text-xs h-7 px-2 hover:bg-primary/5"
              >
                <Activity className="w-3 h-3" />
                Game Status
                {showStatusDashboard ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSystemPrompt(!showSystemPrompt)}
                className="flex items-center gap-2 text-xs h-7 px-2 hover:bg-primary/5"
              >
                <Code className="w-3 h-3" />
                System Prompt
                {showSystemPrompt ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Network: BNB Smart Chain</span>
              <span>Iteration: {extraInfo?.currentIteration || gameData.currentIteration}</span>
              {gameData.minutesRemaining > 0 && (
                <span>Cooldown: {gameData.minutesRemaining}m</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dropdown Panels */}
      <AnimatePresence>
        {/* Game Status Dashboard */}
        {showStatusDashboard && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="p-4">
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Game Status Dashboard
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* Game Status */}
                <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                  <div className="text-xs text-muted-foreground mb-1">Game Status</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                    <span className="text-sm font-medium">{getStatusText()}</span>
                  </div>
                </div>

                {/* Current Iteration */}
                <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                  <div className="text-xs text-muted-foreground mb-1">Iteration</div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">#{extraInfo?.currentIteration || gameData.currentIteration}</span>
                  </div>
                </div>

                {/* Prize Pool */}
                <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                  <div className="text-xs text-muted-foreground mb-1">Prize Pool</div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{gameData.currentPrizePool}</span>
                  </div>
                </div>

                {/* Total Attempts */}
                <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                  <div className="text-xs text-muted-foreground mb-1">Total Attempts</div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">{gameData.totalAttempts?.toLocaleString() || '0'}</span>
                  </div>
                </div>

                {/* Unique Players */}
                <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                  <div className="text-xs text-muted-foreground mb-1">Participants</div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">{gameData.uniqueParticipants?.toLocaleString() || '0'}</span>
                  </div>
                </div>

                {/* Network */}
                <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                  <div className="text-xs text-muted-foreground mb-1">Network</div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">BNB Chain</span>
                  </div>
                </div>
              </div>

              {/* Additional Game Info */}
              {extraInfo && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {/* Game Active Status */}
                    <div className="p-2 rounded-lg bg-background/30">
                      <div className="text-xs text-muted-foreground mb-1">Game Active</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${extraInfo.gameActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-xs font-medium">{extraInfo.gameActive ? 'Yes' : 'No'}</span>
                      </div>
                    </div>

                    {/* User Participation */}
                    <div className="p-2 rounded-lg bg-background/30">
                      <div className="text-xs text-muted-foreground mb-1">You Joined</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${extraInfo.isParticipant ? 'bg-blue-500' : 'bg-gray-500'}`} />
                        <span className="text-xs font-medium">{extraInfo.isParticipant ? 'Yes' : 'No'}</span>
                      </div>
                    </div>

                    {/* Cooldown Time */}
                    {gameData.minutesRemaining > 0 && (
                      <div className="p-2 rounded-lg bg-background/30">
                        <div className="text-xs text-muted-foreground mb-1">Cooldown</div>
                        <span className="text-xs font-medium">{gameData.minutesRemaining} minutes</span>
                      </div>
                    )}

                    {/* Game Contract */}
                    <div className="p-2 rounded-lg bg-background/30">
                      <div className="text-xs text-muted-foreground mb-1">Game Contract</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono">
                          {game.contractAddress ? `${game.contractAddress.slice(0, 6)}...${game.contractAddress.slice(-4)}` : 'N/A'}
                        </span>
                        {game.contractAddress && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyContract(game.contractAddress!, 'game')}
                            className="h-4 w-4 p-0 hover:bg-primary/10"
                          >
                            {copiedContract === 'game' ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* NFT Contract */}
                    <div className="p-2 rounded-lg bg-background/30">
                      <div className="text-xs text-muted-foreground mb-1">NFT Contract</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono">
                          {game.nftContractAddress ? `${game.nftContractAddress.slice(0, 6)}...${game.nftContractAddress.slice(-4)}` : 'N/A'}
                        </span>
                        {game.nftContractAddress && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyContract(game.nftContractAddress!, 'nft')}
                            className="h-4 w-4 p-0 hover:bg-primary/10"
                          >
                            {copiedContract === 'nft' ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* System Prompt Panel */}
        {showSystemPrompt && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="p-4">
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                System Prompt - {game.name}
              </h4>
              <div className="p-4 rounded-lg bg-background/50 border border-white/10 max-h-60 overflow-y-auto">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {game.gameplayConfig?.systemPrompt || "System prompt not available"}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}