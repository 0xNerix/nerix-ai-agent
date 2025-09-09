"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Coins, Wallet, AlertTriangle } from "lucide-react";
import { useSession } from 'next-auth/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from "framer-motion";
import { GameWithCurrentState } from "@/database/type";
import { UseGameReturn } from "@/lib/hooks/use-game";
import { TransactionDialog } from "./transaction-dialog";

interface ChatInputProps {
  onSendMessage: (content: string, txHash?: string) => void;
  game: GameWithCurrentState;
  gameData: UseGameReturn;
  disabled?: boolean;
  onTransactionDialogChange?: (isOpen: boolean) => void;
}

export function ChatInput({ onSendMessage, game, gameData, disabled = false, onTransactionDialogChange }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showTransaction, setShowTransaction] = useState(false);
  const { data: session } = useSession();

  // Character limit and fee from game data
  const maxCharacters = Number(gameData.maxMessageLength || game.gameplayConfig?.baseCharacterLimit || 500);
  const messageFee = gameData.userFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && session?.address) {
      setShowTransaction(true);
      onTransactionDialogChange?.(true);
    }
  };

  const handleTransactionSuccess = (txHash?: string) => {
    // For smart contract games, the transaction itself sends the message
    const messageContent = message;
    setMessage("");
    setShowTransaction(false);
    onTransactionDialogChange?.(false);
    
    // Trigger any additional logic
    if (typeof onSendMessage === 'function') {
      onSendMessage(messageContent, txHash);
    }
  };

  // Check if user can send message
  const canSendMessage = () => {
    if (!session?.address) return false;
    if (!message.trim()) return false;
    if (message.length > maxCharacters) return false;
    if (!gameData.canSendMessage) return false;
    return true;
  };

  // Updated gradient styles
  const buttonStyles = {
    background: `linear-gradient(
      90deg,
      hsl(var(--primary)) 0%,
      hsl(var(--secondary)) 33%,
      hsl(var(--accent)) 66%,
      hsl(var(--primary)) 100%
    )`,
    backgroundSize: '400% 100%',
  };

  // Warning states
  const showGameStatusWarning = !gameData.canSendMessage;
  const showCharacterLimitWarning = message.length > maxCharacters;

  return (
    <>
      <form onSubmit={handleSubmit} className="border-t p-4 bg-background/50 backdrop-blur-sm">
        {/* Game Status Warning */}
        {showGameStatusWarning && (
          <div className="mb-3 p-2 bg-destructive/10 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
            <span className="text-sm text-destructive">
              {gameData.statusMessage}
            </span>
          </div>
        )}

        {showCharacterLimitWarning && (
          <div className="mb-3 p-2 bg-destructive/10 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
            <span className="text-sm text-destructive">
              Message exceeds character limit ({message.length}/{maxCharacters})
            </span>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-3">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={session?.address 
              ? `Type your message...`
              : "Connect your wallet to send messages"
            }
            className="flex-1 min-h-[60px] max-h-[120px] resize-none bg-background"
            maxLength={maxCharacters}
            disabled={disabled || showGameStatusWarning || !session?.address}
          />
          
          {session?.address ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Button 
                type="submit" 
                className="h-[60px] px-4 flex flex-col items-center gap-1 relative overflow-hidden min-w-[80px]"
                disabled={!canSendMessage() || disabled}
                style={buttonStyles}
              >
                {/* Rainbow Animation */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundPosition: ['0% 0%', '-300% 0%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: 9999,
                    ease: "linear",
                    repeatType: "loop"
                  }}
                  style={buttonStyles}
                />
                
                {/* Content */}
                <span className="relative flex flex-col items-center gap-1 text-white">
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm">Send</span>
                  </div>
                  <span className="text-xs opacity-90">{messageFee} BNB</span>
                </span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-[60px]"
            >
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button
                    type="button"
                    onClick={openConnectModal}
                    className="h-full px-4 flex items-center gap-2 relative overflow-hidden"
                    disabled={disabled}
                    style={buttonStyles}
                  >
                    {/* Rainbow Animation */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        backgroundPosition: ['0% 0%', '-300% 0%'],
                      }}
                      transition={{
                        duration: 8,
                        repeat: 9999,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                      style={buttonStyles}
                    />
                    
                    {/* Content */}
                    <span className="relative flex items-center gap-2 text-white">
                      <Wallet className="w-4 h-4" />
                      Connect
                    </span>
                  </Button>
                )}
              </ConnectButton.Custom>
            </motion.div>
          )}
        </div>

        {/* Footer Info - Character Count Only */}
        <div className="mt-2 text-xs text-muted-foreground text-center">
          <span>
            {message.length}/{maxCharacters} characters
            {gameData.maxMessageLength && Number(gameData.maxMessageLength) > game.gameplayConfig?.baseCharacterLimit && (
              <span className="text-primary ml-1">
                (+{Number(gameData.maxMessageLength) - game.gameplayConfig?.baseCharacterLimit} from NFT)
              </span>
            )}
          </span>
        </div>
      </form>

      {/* Smart Contract Transaction Dialog */}
      <TransactionDialog
        game={game}
        gameData={gameData}
        message={message}
        isOpen={showTransaction}
        onClose={() => {
          setShowTransaction(false);
          onTransactionDialogChange?.(false);
        }}
        onSuccess={handleTransactionSuccess}
      />
    </>
  );
}