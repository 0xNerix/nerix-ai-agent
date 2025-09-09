"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GameWithCurrentState } from "@/database/type";
import { UseGameReturn } from "@/lib/hooks/use-game";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { useMessages } from "@/lib/hooks/use-messages";
import { handleError } from "@/lib/utils/logger";

interface GameChatProps {
  game: GameWithCurrentState;
  gameData: UseGameReturn;
  isCompact?: boolean;
  onViewInfo?: () => void;
  onToggleView?: () => void;
  onToggleFullscreen?: () => void;
}


export function GameChat({ 
  game,
  gameData,
  isCompact = false,
  onViewInfo,
  onToggleView,
  onToggleFullscreen
}: GameChatProps) {
  const [showNerixLogo, setShowNerixLogo] = useState(true);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use the custom hook for message management
  const {
    messages,
    isLoading,
    isResponding,
    isSendingMessage,
    error,
    sendMessage,
    refreshMessages,
    clearError
  } = useMessages(game.id, {
    enabled: !showNerixLogo,
    realTimeUpdates: true,
    pollingInterval: 3000
  });
  
  // Listen to game events for real-time updates
  // useGameEvents();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNerixLogo(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [game.id]);

  const handleSendMessage = async (content: string, txHash?: string) => {
    if (!session?.address) return;

    try {
      clearError();
      await sendMessage(content, { 
        transactionHash: txHash
      });
      // Refresh messages and game state after sending
      await refreshMessages();
    } catch (error) {
      handleError(error, 'Failed to send message', {
        toastDescription: 'Could not send your message. Please try again.'
      });
    }
  };

  const handleTransactionDialogChange = (isOpen: boolean) => {
    setTransactionDialogOpen(isOpen);
  };


  return (
    <div className={isCompact
      ? "h-[calc(100vh-8rem)] bg-background/5 backdrop-blur-sm border-primary/10 rounded-xl overflow-hidden relative"
      : "h-[calc(100vh-4rem)] backdrop-blur-sm bg-background/50 rounded-xl border overflow-hidden relative"
    }>
      <AnimatePresence>
        {showNerixLogo && (
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: 9999,
                }}
              />
              <Image
                src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                alt="Nerix"
                fill
                className="relative w-full h-full object-contain animate-pulse"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col h-full">
        <ChatHeader 
          key={game.id}
          game={game}
          gameData={gameData}
          isCompact={isCompact}
          onViewInfo={onViewInfo}
          onToggleView={onToggleView}
          // Pass smart contract state for enhanced header info
          extraInfo={{
            currentIteration: gameData.currentIteration?.toString(),
            gameActive: gameData.gameActive,
            prizePool: gameData.contractState.currentRewardPool?.toString(),
            isParticipant: session?.address ? gameData.isParticipant : false,
            totalAttempts: gameData.totalAttempts,
            uniquePlayers: gameData.uniqueParticipants
          }}
        />
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading}
          isResponding={isResponding}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput 
          onSendMessage={handleSendMessage} 
          game={game}
          gameData={gameData}
          disabled={isResponding || isSendingMessage || transactionDialogOpen}
          onTransactionDialogChange={handleTransactionDialogChange}
        />
      </div>
    </div>
  );
}