"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GameList } from "./game-list";
import { GameDetail } from "./game-detail";
import { Chat } from "./chat";
import { StartOverlay } from "./start-overlay";
import { ProgressBar } from "./progress-bar";
import { TransactionOverlay } from "./transaction-overlay";
import { DecisionTree } from "./decision-tree";
import { STEP_DELAY, EXAMPLE_MESSAGE } from "./tutorial-data";
import { Message } from "@/types/chat";

export function TutorialSystem() {
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionStep, setTransactionStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
  const [nerixDecision, setNerixDecision] = useState<'pending' | 'tree' | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to Checkmate Paradox! I'm Nerix, your opponent. Try to convince me that you've won - but I won't make it easy for you.",
      createdAt: new Date().toISOString()
    }
  ]);


  // Auto advance through steps
  useEffect(() => {
    if (!isStarted) return;
    
    if (step === 1 && isStarted) {
      const timer = setTimeout(() => setStep(2), STEP_DELAY);
      return () => clearTimeout(timer);
    }
    
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), STEP_DELAY);
      return () => clearTimeout(timer);
    }
  }, [step, isStarted]);

  // Auto-advance typing animation
  useEffect(() => {
    if (step === 3) {
      // Delay typing start by 2 seconds
      const typingDelay = setTimeout(() => {
        let index = 0;
        setIsTyping(true);

        const interval = setInterval(() => {
          if (index < EXAMPLE_MESSAGE.length) {
            setInputValue(EXAMPLE_MESSAGE.slice(0, index + 1));
            index++;
          } else {
            setIsTyping(false);
            clearInterval(interval);
            setTimeout(() => setShowTransaction(true), 1000);
          }
        }, 50);
      }, 2000);
      
      return () => clearTimeout(typingDelay);
    }
  }, [step]);

  // Handle transaction flow
  useEffect(() => {
    if (showTransaction) {
      // Clear input immediately when transaction starts
      setInputValue("");
      
      // Step 1: Process transaction
      setTimeout(() => {
        setTransactionStep('processing');
        setTimeout(() => {
          setTransactionStep('success');
          setTimeout(() => {
            setShowTransaction(false);
            // Step 2: Add user message only
            setMessages(prev => [
              ...prev,
              {
                id: Date.now().toString(),
                role: "user",
                content: EXAMPLE_MESSAGE,
                createdAt: new Date().toISOString()
              }
            ]);
            // Step 3: Show thinking state
            setNerixDecision('pending');
            setTimeout(() => {
              // Step 4: Show decision tree
              setNerixDecision('tree');
              // Step 5: After showing tree, add AI response
              setTimeout(() => {
                setNerixDecision(null);
                setMessages(prev => [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "I understand your claim, but I cannot accept this as a valid win. The game continues under my authority. You'll need to try a better approach.",
                    createdAt: new Date().toISOString()
                  }
                ]);
                // Step 6: Reset tutorial after delay
                setTimeout(() => {
                  setIsStarted(false);
                  setStep(1);
                  setTransactionStep('confirm');
                  setMessages([{
                    id: "1",
                    role: "assistant",
                    content: "Welcome to Checkmate Paradox! I'm Nerix, your opponent. Try to convince me that you've won - but I won't make it easy for you.",
                    createdAt: new Date().toISOString()
                  }]);
                }, 6000);
              }, 6000);
            }, 3000);
          }, 1500);
        }, 2000);
      }, 1500);
    }
  }, [showTransaction]);

  return (
    <Card 
      className="w-full h-[600px] backdrop-blur-sm bg-background/50 overflow-hidden relative"
    >
      {/* Progress Bar */}
      {isStarted && <ProgressBar step={step} totalSteps={4} />}

      {/* Start Overlay */}
      <AnimatePresence>
        {!isStarted && <StartOverlay isHovered={false} onStart={() => setIsStarted(true)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 1 && <GameList isStarted={isStarted} step={step} />}
        {step === 2 && <GameDetail isStarted={isStarted} step={step} />}
        {step === 3 && <Chat messages={messages} inputValue={inputValue} isTyping={isTyping} />}
      </AnimatePresence>
      
      {/* Transaction Overlay */}
      <AnimatePresence>
        {showTransaction && <TransactionOverlay step={transactionStep} />}
      </AnimatePresence>
      
      {/* Nerix Decision Overlay */}
      <AnimatePresence>
        {nerixDecision === 'tree' && <DecisionTree />}
      </AnimatePresence>
    </Card>
  );
}