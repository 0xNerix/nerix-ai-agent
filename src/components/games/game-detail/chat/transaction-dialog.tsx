"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, AlertCircle, CheckCircle2, Loader2, Wallet, ExternalLink, MessageCircle, Brain, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { GameWithCurrentState } from "@/database/type";
import { UseGameReturn } from "@/lib/hooks/use-game";
import { useContractServices } from "@/lib/hooks/use-contract-services";
import { motion } from "framer-motion";
import { getCurrentNetwork } from "@/lib/web3/network-config";
import { handleError } from "@/lib/utils/logger";

interface TransactionDialogProps {
  game: GameWithCurrentState;
  gameData: UseGameReturn;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (txHash?: string) => void;
}

export function TransactionDialog({ 
  game,
  gameData, 
  message, 
  isOpen, 
  onClose, 
  onSuccess 
}: TransactionDialogProps) {
  const [status, setStatus] = useState<'confirm' | 'processing' | 'success' | 'finalizing' | 'error'>('confirm');
  const [txHash, setTxHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { address } = useAccount();
  const { gameService } = useContractServices(game.contractAddress, game.nftContractAddress);
  
  useEffect(() => {
    if (isOpen) {
      setStatus('confirm');
      setTxHash('');
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!address || !gameData.currentMessageFee || !gameService) return;

    try {
      setStatus('processing');
      setErrorMessage('');
      
      const nftId = gameData.bestNFT?.tokenId ? BigInt(gameData.bestNFT.tokenId) : undefined;
      const txHash = await gameService.sendMessage(message, nftId, address as `0x${string}`);
      
      setTxHash(txHash);
      setStatus('success');
      
      // Wait longer for all backend processes to complete
      setTimeout(() => {
        setStatus('finalizing');
        
        // Additional wait for wallet nonce validation and backend processing
        setTimeout(() => {
          onSuccess(txHash);
        }, 3000);
      }, 2000);
      
    } catch (error: any) {
      handleError(error, 'Smart contract transaction failed', {
        toastDescription: 'Transaction could not be completed. Please try again.'
      });
      setErrorMessage(error.message || 'Transaction failed');
      setStatus('error');
    }
  };

  const getExplorerUrl = (hash: string) => {
    const network = getCurrentNetwork();
    const baseUrl = network === 'bsc' 
      ? 'https://bscscan.com' 
      : 'https://testnet.bscscan.com';
    return `${baseUrl}/tx/${hash}`;
  };

  const renderPaidGame = () => (
    <div className="space-y-4">
      {/* NFT Bonuses Details */}
      <div className="p-4 bg-background rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <div className="text-sm font-medium">NFT Bonuses</div>
        </div>
        
        {gameData.bestNFT ? (
          <div className="space-y-3">
            {/* NFT Info */}
            <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-700">
                  Active: {gameData.bestNFT.name}
                </span>
              </div>
              <span className="text-xs text-emerald-600">
                Iteration {gameData.bestNFT.iteration}
              </span>
            </div>

            {/* Detailed Bonuses from Updated Hook */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-600 mb-2">Base NFT Effects</div>
              <div className="grid grid-cols-1 gap-2">
                {gameData.bestNFT.bonuses?.map((bonus, index) => (
                  <motion.div
                    key={bonus.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      {bonus.type === 'fee_reduction' ? (
                        <Coins className="w-3 h-3 text-gray-600" />
                      ) : bonus.type === 'message_limit' ? (
                        <MessageCircle className="w-3 h-3 text-gray-600" />
                      ) : (
                        <Brain className="w-3 h-3 text-gray-600" />
                      )}
                      <span className="text-xs font-medium text-gray-700">
                        {bonus.type === 'fee_reduction' ? 'Fee Discount:' :
                         bonus.type === 'message_limit' ? 'Message Limit:' :
                         'Context Size:'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">
                        {bonus.type === 'message_limit' ? (game.gameplayConfig?.baseCharacterLimit || 0) :
                         bonus.type === 'context_message_limit' ? (game.gameplayConfig?.baseContextSize || 0) :
                         '0%'}
                      </span>
                      <span className="text-xs text-emerald-600 font-bold">
                        +{bonus.baseValue}{bonus.type === 'fee_reduction' ? '%' : 
                                            bonus.type === 'message_limit' ? ' chars' : ' msgs'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Legacy Power Bonuses if applicable */}
              {gameData.bestNFT.bonuses?.some(b => b.legacyValue > 0) && (
                <div className="mt-3">
                  <div className="text-xs font-medium text-amber-600 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Legacy Power Bonuses
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {gameData.bestNFT.bonuses?.filter(b => b.legacyValue > 0).map((bonus, index) => (
                      <motion.div
                        key={`legacy-${bonus.type}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-2 bg-amber-50 rounded-lg border border-amber-200"
                      >
                        <div className="flex items-center gap-2">
                          {bonus.type === 'fee_reduction' ? (
                            <Coins className="w-3 h-3 text-amber-600" />
                          ) : bonus.type === 'message_limit' ? (
                            <MessageCircle className="w-3 h-3 text-amber-600" />
                          ) : (
                            <Brain className="w-3 h-3 text-amber-600" />
                          )}
                          <span className="text-xs font-medium text-amber-700">
                            Legacy {bonus.type === 'fee_reduction' ? 'Fee Boost' :
                                    bonus.type === 'message_limit' ? 'Chars' : 'Context'}:
                          </span>
                        </div>
                        <span className="text-xs font-bold text-amber-600">
                          +{bonus.legacyValue}{bonus.type === 'fee_reduction' ? '%' : 
                                               bonus.type === 'message_limit' ? ' chars' : ' msgs'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-600 text-center">
              No NFT owned. Using base pricing and limits.
            </div>
            <div className="text-xs text-gray-500 text-center mt-1">
              Get an NFT to unlock bonuses and discounts!
            </div>
          </div>
        )}
      </div>

      {/* Fee Breakdown */}
      <div className="space-y-4">
        <div className="p-3 bg-background/50 rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Base Message Fee</span>
            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
              {gameData.totalFee || '...'}
            </span>
          </div>
          
          {gameData.bestNFT && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                NFT Discount ({gameData.bestNFT.name})
              </span>
              <span className="text-emerald-600 font-medium">
                -{gameData.discountPercentage || 0}% off
              </span>
            </div>
          )}
          
          {!gameData.bestNFT && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">NFT Discount</span>
              <span className="text-muted-foreground">No NFT</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">Final Fee</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold font-mono bg-primary/10 px-3 py-1.5 rounded-lg">
                {gameData.hasNFTDiscount ? gameData.userMessageFee : gameData.currentMessageFee || '...'}
              </div>
              {gameData.hasNFTDiscount && (
                <div className="text-xs text-emerald-600 mt-1">
                  Saved {gameData.discountPercentage}% with NFT
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Current Message Status */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Current Message:</span>
          <span className={message.length > ((game.gameplayConfig?.baseCharacterLimit || 0) + 
                                            (gameData.bestNFT?.bonuses?.find(b => b.type === 'message_limit')?.totalValue || 0)) 
                          ? 'text-red-500 font-medium' : 'text-foreground'}>
            {message.length} chars
          </span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Your Limit:</span>
          <span className="text-foreground">
            {(game.gameplayConfig?.baseCharacterLimit || 0) + 
             (gameData.bestNFT?.bonuses?.find(b => b.type === 'message_limit')?.totalValue || 0)} chars
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Only allow closing if not processing, successful, or finalizing
      if (!open && status !== 'processing' && status !== 'success' && status !== 'finalizing') {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {status === 'processing' ? 'Processing Transaction...' : 
             status === 'success' ? 'Transaction Successful!' :
             status === 'finalizing' ? 'Finalizing...' :
             'Confirm Smart Contract Transaction'}
          </DialogTitle>
          <DialogDescription>
            {status === 'processing' 
              ? 'Please wait while your transaction is being processed. Do not close this window.'
              : status === 'success'
              ? 'Transaction confirmed! Please wait while we finalize the process.'
              : status === 'finalizing'
              ? 'Please wait while we complete backend validation and wallet nonce verification.'
              : `Send a message to ${game.name} by paying the smart contract fee`
            }
          </DialogDescription>
        </DialogHeader>

        {status === 'confirm' && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-muted space-y-3">
              {renderPaidGame()}
            </div>

            {!address && (
              <div className="p-3 bg-destructive/10 rounded-lg flex items-center gap-2">
                <Wallet className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">
                  Wallet connection required for smart contract interaction
                </span>
              </div>
            )}
          </div>
        )}

        {status === 'processing' && (
          <div className="py-6 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <div className="text-center">
              <p className="text-muted-foreground mb-2">
                Processing smart contract transaction...
              </p>
              <p className="text-xs text-muted-foreground">
                Please confirm the transaction in your wallet and wait for confirmation
              </p>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800 font-medium">
                  ⏳ Please wait - Do not close this window
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  The transaction is being processed on the blockchain
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="py-6 flex flex-col items-center gap-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                Smart contract transaction successful!
              </p>
              {txHash && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(getExplorerUrl(txHash), '_blank')}
                  className="gap-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  View on Explorer
                </Button>
              )}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  ⏳ Please wait - Finalizing backend processes
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Do not close this window yet
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'finalizing' && (
          <div className="py-6 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <div className="text-center">
              <p className="text-muted-foreground mb-2">
                Finalizing transaction and wallet validation...
              </p>
              <p className="text-xs text-muted-foreground">
                Almost done! This may take a few more seconds.
              </p>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800 font-medium">
                  🔄 Completing backend validation
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Please be patient while we verify your transaction
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="py-6 flex flex-col items-center gap-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
            <div className="text-center">
              <p className="text-destructive mb-2">Transaction failed</p>
              {errorMessage && (
                <p className="text-xs text-muted-foreground">{errorMessage}</p>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          {status === 'confirm' && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!address || (message.length > ((game.gameplayConfig?.baseCharacterLimit || 0) + 
                                                        (gameData.bestNFT?.bonuses?.find(b => b.type === 'message_limit')?.totalValue || 0)))}
              >
                Send Transaction
              </Button>
            </>
          )}
          {status === 'processing' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transaction in progress...</span>
            </div>
          )}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Transaction successful - Finalizing...</span>
            </div>
          )}
          {status === 'finalizing' && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Completing validation...</span>
            </div>
          )}
          {status === 'error' && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => setStatus('confirm')}>
                Try Again
              </Button>
            </>
          )}
          {status === 'finalizing' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Process will complete automatically...</span>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}