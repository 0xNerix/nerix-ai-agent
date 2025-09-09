"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronUp, 
  ChevronDown, 
  Wifi, 
  WifiOff, 
  Trophy, 
  Users, 
  MessageSquare, 
  Zap,
  Clock,
  Coins,
  Shield,
  Activity,
  Target,
  Gamepad2,
  ExternalLink,
  Copy,
  Link2,
  Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GameWithCurrentState } from "@/database/type";
import { UseGameReturn } from "@/lib/hooks/use-game";
import { useCurrency } from "@/lib/hooks/use-currency";
import { useSession } from "next-auth/react";

interface GameStatusDashboardProps {
  game: GameWithCurrentState;
  gameData: UseGameReturn;
  attemptCount?: number;
  isConnected?: boolean;
  isExpanded?: boolean;
  onClose?: () => void;
}

export function GameStatusDashboard({ 
  game, 
  gameData, 
  attemptCount = 0,
  isConnected = true,
  isExpanded: controlledExpanded,
  onClose
}: GameStatusDashboardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const { formatValue, currency } = useCurrency();
  const { data: session } = useSession();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-500';
      case 'processing_winner': return 'text-amber-500';
      case 'waiting_next_iteration': return 'text-blue-500';
      case 'paused': return 'text-orange-500';
      case 'completed': return 'text-gray-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4" />;
      case 'processing_winner': return <Trophy className="w-4 h-4" />;
      case 'waiting_next_iteration': return <Clock className="w-4 h-4" />;
      case 'paused': return <Shield className="w-4 h-4" />;
      case 'completed': return <Target className="w-4 h-4" />;
      default: return <Gamepad2 className="w-4 h-4" />;
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const stats = [
    {
      label: "Network Status",
      value: isConnected ? "Connected" : "Disconnected",
      icon: isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />,
      color: isConnected ? "text-emerald-500" : "text-red-500"
    },
    {
      label: "Game Status",
      value: formatStatus(game.status),
      icon: getStatusIcon(game.status),
      color: getStatusColor(game.status)
    },
    {
      label: "Your Attempts",
      value: attemptCount.toString(),
      icon: <Target className="w-4 h-4" />,
      color: "text-primary"
    },
    {
      label: "Current Iteration",
      value: `#${game.currentIteration}`,
      icon: <Zap className="w-4 h-4" />,
      color: "text-blue-500"
    },
    {
      label: "Context Messages",
      value: `${game.gameplayConfig?.baseContextSize || 10}`,
      icon: <MessageSquare className="w-4 h-4" />,
      color: "text-purple-500"
    },
    {
      label: "Total Messages",
      value: game.totalMessages.toString(),
      icon: <MessageSquare className="w-4 h-4" />,
      color: "text-purple-500"
    },
    {
      label: "Active Players",
      value: game.totalParticipants.toString(),
      icon: <Users className="w-4 h-4" />,
      color: "text-indigo-500"
    },
    {
      label: "Chain ID",
      value: "56", // BSC Mainnet
      icon: <Network className="w-4 h-4" />,
      color: "text-orange-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative border-t bg-gradient-to-r from-background/50 to-background/80 backdrop-blur-sm"
    >
      {/* Collapse/Expand Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (controlledExpanded !== undefined && onClose) {
            onClose();
          } else {
            setInternalExpanded(!internalExpanded);
          }
        }}
        className="w-full h-10 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
      >
        <Activity className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Game Status</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp className="w-4 h-4" />
        </motion.div>
      </Button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={
              controlledExpanded !== undefined 
                ? "bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-md border border-muted/30 rounded-lg shadow-xl overflow-hidden mt-2"
                : "absolute bottom-full left-0 right-0 z-50 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-md border border-muted/30 rounded-t-xl shadow-xl overflow-hidden"
            }
          >
            <div className="p-4 space-y-4">
              {/* Quick Status Overview */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(game.status)}
                  <span className={`text-sm font-semibold ${getStatusColor(game.status)}`}>
                    {formatStatus(game.status)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <Badge className="bg-emerald-500/10 text-emerald-500">
                      <Wifi className="w-3 h-3 mr-1" />
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <WifiOff className="w-3 h-3 mr-1" />
                      Offline
                    </Badge>
                  )}
                </div>
              </div>

              <Separator className="opacity-50" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="p-3 bg-gradient-to-br from-background/80 to-muted/20 border-muted/30 hover:border-muted/50 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={stat.color}>
                          {stat.icon}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {stat.label}
                        </span>
                      </div>
                      <div className={`text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              {game.statusMessage && (
                <Card className="p-3 bg-amber-500/5 border-amber-500/20">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-amber-700 mb-1">Status Message</div>
                      <div className="text-xs text-amber-600">{game.statusMessage}</div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Participant Info */}
              {session?.address && gameData.isParticipant && (
                <Card className="p-3 bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">You&apos;re participating!</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {attemptCount} attempts
                    </Badge>
                  </div>
                </Card>
              )}

              {/* Smart Contract Addresses */}
              <div className="space-y-3">
                <Separator className="opacity-50" />
                
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Link2 className="w-3 h-3" />
                    Smart Contract Addresses
                  </div>
                  
                  <div className="space-y-2">
                    {/* Game Contract */}
                    {game.contractAddress && (
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Gamepad2 className="w-3 h-3 text-primary" />
                          <span className="text-xs font-medium">Game Contract</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                            {game.contractAddress.slice(0, 6)}...{game.contractAddress.slice(-4)}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(game.contractAddress!)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => window.open(`https://bscscan.com/address/${game.contractAddress}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* NFT Contract */}
                    {game.nftContractAddress && (
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-3 h-3 text-amber-500" />
                          <span className="text-xs font-medium">NFT Contract</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                            {game.nftContractAddress.slice(0, 6)}...{game.nftContractAddress.slice(-4)}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(game.nftContractAddress!)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => window.open(`https://bscscan.com/address/${game.nftContractAddress}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Network Info */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Network className="w-3 h-3" />
                    Network Information
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-lg text-center">
                      <div className="text-xs text-muted-foreground">Chain</div>
                      <div className="text-xs font-semibold text-orange-500">BNB Smart Chain</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg text-center">
                      <div className="text-xs text-muted-foreground">Chain ID</div>
                      <div className="text-xs font-semibold text-orange-500">56</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}