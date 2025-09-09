"use client";

import { cn } from "@/lib/utils/utils";
import { Brain, User, ArrowDown, ArrowUp, Loader2, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCurrency } from "@/lib/hooks/use-currency";
import { MessageWithContext } from "@/database/type";
import { MessageDetailDialog } from "./message-detail-dialog";

interface ChatMessagesProps {
  messages: MessageWithContext[];
  isLoading?: boolean;
  isResponding?: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatMessages({ messages, isLoading = false, isResponding = false, messagesEndRef }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<MessageWithContext | null>(null);
  const [parentMessage, setParentMessage] = useState<MessageWithContext | null>(null);
  const { formatValue } = useCurrency();

  // Format message time - handles both Date objects and ISO strings
  const formatMessageTime = (date: Date | string | null) => {
    if (!date) return "Unknown time";
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return "Invalid time";
    
    return dateObj.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Scroll to bottom when new messages arrive or AI is responding
  useEffect(() => {
    const scrollToBottomInView = () => {
      if (messagesEndRef.current && containerRef.current) {
        const container = containerRef.current;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth"
        });
      }
    };
    if (messages.length > 0 || isResponding) {
      scrollToBottomInView();
    }
  }, [messages, isResponding, messagesEndRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
      const atTop = scrollTop < 10;
      
      setIsAtBottom(atBottom);
      setIsAtTop(atTop);
      setShowScrollButtons(scrollHeight > clientHeight);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMessageClick = (message: MessageWithContext) => {
    setSelectedMessage(message);
    
    // Find parent message if this is a response
    if (message.parentMessageId) {
      const parent = messages.find(m => m.id === message.parentMessageId) || null;
      setParentMessage(parent);
    } else {
      // If this is a user message, find the AI response to it
      const response = messages.find(m => m.parentMessageId === message.id) || null;
      setParentMessage(response);
    }
  };

  // Extract explanation from function call for winning messages
  const getWinningExplanation = (message: MessageWithContext) => {
    if (!message.functionCall) return null;
    
    const functionCall = Array.isArray(message.functionCall) 
      ? message.functionCall[0] 
      : message.functionCall;
    
    return functionCall.arguments?.explanation || null;
  };

  const renderLoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full space-y-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 relative">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: 9999 }}
        />
        <Loader2 className="w-full h-full text-primary animate-spin" />
      </div>
      <p className="text-muted-foreground">Loading messages...</p>
    </motion.div>
  );

  const renderRespondingState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-3 max-w-[80%]"
    >
      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
        <Brain className="w-4 h-4 text-secondary" />
      </div>
      <div className="rounded-lg p-4 bg-muted min-w-[120px]">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-secondary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: 9999 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-secondary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: 9999, delay: 0.3 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-secondary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: 9999, delay: 0.6 }}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative flex-1 min-h-0">
      {/* Messages Container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            renderLoadingState()
          ) : (
            <>
              {messages.map((message) => {
                const isWinner = message.isWinningMessage || false;
                
                // Find if this message has a winning response or is a response to a winning message
                const hasWinningRelation = message.parentMessageId 
                  ? messages.find(m => m.id === message.parentMessageId)?.isWinningMessage || false
                  : messages.some(m => m.parentMessageId === message.id && m.isWinningMessage);
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3 max-w-[80%]",
                      message.role === "user" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors duration-200",
                              isWinner 
                                ? "bg-amber-500/30 hover:bg-amber-500/40" 
                                : hasWinningRelation
                                ? "bg-amber-500/20 hover:bg-amber-500/30"
                                : message.role === "user"
                                ? "bg-primary/10 hover:bg-primary/20"
                                : "bg-secondary/10 hover:bg-secondary/20"
                            )}
                          >
                            {message.role === "user" ? (
                              <User className={cn(
                                "w-4 h-4",
                                isWinner || hasWinningRelation ? "text-amber-500" : "text-primary"
                              )} />
                            ) : isWinner ? (
                              <Trophy className="w-4 h-4 text-amber-500" />
                            ) : hasWinningRelation ? (
                              <Brain className="w-4 h-4 text-amber-500" />
                            ) : (
                              <Brain className="w-4 h-4 text-secondary" />
                            )}
                          </div>
                        </TooltipTrigger>
                        {message.role === "user" && message.participant?.userAddress && (
                          <TooltipContent>
                            <p className="font-mono text-xs">Wallet: {message.participant.userAddress}</p>
                          </TooltipContent>
                        )}
                        {isWinner && (
                          <TooltipContent>
                            <p className="text-xs font-semibold text-amber-500">Winning Message! 🏆</p>
                            {getWinningExplanation(message) && (
                              <p className="text-xs text-amber-400 mt-1">{getWinningExplanation(message)}</p>
                            )}
                          </TooltipContent>
                        )}
                        {hasWinningRelation && !isWinner && (
                          <TooltipContent>
                            <p className="text-xs text-amber-500">Part of winning conversation</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>

                    <div
                      className={cn(
                        "rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg group relative overflow-hidden",
                        isWinner
                          ? "bg-gradient-to-br from-amber-500/15 to-amber-500/5 hover:from-amber-500/20 hover:to-amber-500/8 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                          : hasWinningRelation
                          ? "bg-gradient-to-br from-amber-500/8 to-amber-500/2 hover:from-amber-500/12 hover:to-amber-500/4 border border-amber-500/20"
                          : message.role === "user"
                          ? "bg-gradient-to-br from-primary/8 to-primary/3 hover:from-primary/12 hover:to-primary/6 border border-primary/20"
                          : "bg-gradient-to-br from-muted/80 to-muted/40 hover:from-muted/90 hover:to-muted/50 border border-muted/40"
                      )}
                      onClick={() => handleMessageClick(message)}
                    >
                      {/* Winning badge */}
                      {isWinner && (
                        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-semibold text-amber-700">🏆 Winning Message</span>
                        </div>
                      )}
                      
                      {/* Winning relation badge */}
                      {hasWinningRelation && !isWinner && (
                        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-amber-500/5 border border-amber-500/20">
                          <Trophy className="w-4 h-4 text-amber-500/70" />
                          <span className="text-xs font-medium text-amber-600">Part of winning conversation</span>
                        </div>
                      )}
                      
                      {/* Message content */}
                      <div className="space-y-3">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                          {message.content}
                        </p>
                        
                        {/* Explanation for winning messages */}
                        {isWinner && getWinningExplanation(message) && (
                          <div className="p-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
                            <div className="text-xs font-medium text-amber-700 mb-1">AI Explanation:</div>
                            <div className="text-xs text-amber-600 italic">{getWinningExplanation(message)}</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Message metadata */}
                      <div className="flex items-center justify-between mt-4 pt-2 border-t border-current/10">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground font-mono">
                            {formatMessageTime(message.createdAt)}
                          </span>
                        </div>
                        
                        {message.messageFee && message.role === "user" && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs bg-primary/15 text-primary px-2.5 py-1 rounded-full font-semibold">
                              {message.messageFee === "0" ? "Free" : formatValue(parseFloat(message.messageFee))}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
              {isResponding && renderRespondingState()}
            </>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll Buttons */}
      <AnimatePresence>
        {showScrollButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-4 bottom-4 flex flex-col gap-2"
          >
            {!isAtTop && (
              <Button
                size="icon"
                variant="secondary"
                onClick={scrollToTop}
                className="rounded-full w-8 h-8 bg-background/80 backdrop-blur-sm"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            )}
            {!isAtBottom && (
              <Button
                size="icon"
                variant="secondary"
                onClick={scrollToBottom}
                className="rounded-full w-8 h-8 bg-background/80 backdrop-blur-sm"
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Detail Dialog */}
      <MessageDetailDialog
        message={selectedMessage}
        parentMessage={parentMessage}
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </div>
  );
}