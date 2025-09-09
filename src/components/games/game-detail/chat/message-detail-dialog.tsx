"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Brain, User, Clock, Wallet, ExternalLink, Coins, FileText, ArrowUp, Trophy, Calendar, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useCurrency } from "@/lib/hooks/use-currency";
import { MessageWithContext } from "@/database/type";

interface MessageDetailDialogProps {
  message: MessageWithContext | null;
  parentMessage: MessageWithContext | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageDetailDialog({
  message,
  parentMessage,
  isOpen,
  onClose,
}: MessageDetailDialogProps) {
  const { formatValue, currency, toggleCurrency } = useCurrency();
  
  if (!message) return null;

  // Extract explanation from function call for winning messages
  const getWinningExplanation = (message: MessageWithContext) => {
    if (!message.functionCall) return null;
    
    const functionCall = Array.isArray(message.functionCall) 
      ? message.functionCall[0] 
      : message.functionCall;
    
    return functionCall.arguments?.explanation || null;
  };

  // Determine relationship between messages
  const isParentChild = parentMessage && (
    (message.parentMessageId === parentMessage.id) || 
    (parentMessage.parentMessageId === message.id)
  );

  // Determine which message is the question and which is the answer
  let questionMessage = message;
  let answerMessage = parentMessage;
  
  if (parentMessage && message.role === "assistant" && parentMessage.role === "user") {
    questionMessage = parentMessage;
    answerMessage = message;
  } else if (parentMessage && message.role === "user" && parentMessage.role === "assistant") {
    questionMessage = message;
    answerMessage = parentMessage;
  }

  // Format createdAt - null safe
  const formatcreatedAt = (date: Date | string | null) => {
    if (!date) {
      return {
        date: 'Unknown date',
        time: 'Unknown time',
        full: 'Date not available'
      };
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return {
        date: 'Invalid date',
        time: 'Invalid time',
        full: 'Invalid date'
      };
    }

    return {
      date: dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: dateObj.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      }),
      full: dateObj.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-md border-muted/30">
        <DialogHeader className="p-6 border-b bg-muted/10">
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              message.isWinningMessage 
                ? "bg-gradient-to-br from-amber-500/30 to-amber-500/10" 
                : message.role === "user" 
                ? "bg-gradient-to-br from-primary/20 to-primary/10" 
                : "bg-gradient-to-br from-secondary/20 to-secondary/10"
            }`}>
              {message.role === "user" ? (
                <User className={`w-5 h-5 ${message.isWinningMessage ? "text-amber-500" : "text-primary"}`} />
              ) : message.isWinningMessage ? (
                <Trophy className="w-5 h-5 text-amber-500" />
              ) : (
                <Brain className="w-5 h-5 text-secondary" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                {message.isWinningMessage ? "🏆 Winning Message" : "Message Details"}
              </span>
              <span className="text-sm text-muted-foreground">
                {message.role === "user" ? "From User" : "From AI Assistant"}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="p-6 space-y-6">
            {/* Message Metadata Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Info */}
              <Card className="p-4 bg-muted/5 border-muted/20">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Message Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Message ID</span>
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{message.id.substring(0, 12)}...</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Iteration</span>
                    <Badge variant="outline" className="text-xs">#{message.iteration}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Created At</span>
                    <div className="text-right">
                      <div className="text-xs font-mono">{formatcreatedAt(message.createdAt).date}</div>
                      <div className="text-xs text-muted-foreground">{formatcreatedAt(message.createdAt).time}</div>
                    </div>
                  </div>
                  {message.parentMessageId && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Reply To</span>
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{message.parentMessageId.substring(0, 8)}...</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* User & Transaction Info */}
              <Card className="p-4 bg-muted/5 border-muted/20">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Transaction Details
                </h3>
                <div className="space-y-3">
                  {message.participant?.userAddress ? (
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">User Address</span>
                      <div className="font-mono text-xs bg-muted px-2 py-1 rounded break-all">
                        {message.participant.userAddress}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">User</span>
                      <Badge variant="secondary" className="text-xs">AI Assistant</Badge>
                    </div>
                  )}
                  
                  {message.messageFee && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Message Fee</span>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3" />
                        <span className="text-xs font-semibold">
                          {message.messageFee === "0" ? "Free" : `${message.messageFee} BNB`}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {message.transactionHash ? (
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">TX Hash</span>
                      <div className="flex items-center gap-2">
                        <div className="font-mono text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                          {message.transactionHash}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => window.open(`https://bscscan.com/tx/${message.transactionHash}`, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Transaction</span>
                      <Badge variant="outline" className="text-xs">No TX</Badge>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* NFT Information */}
            {/* {(message.nftUsedId || message.nftUsed) && (
              <Card className="p-4 bg-purple-500/5 border-purple-500/20">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-purple-500" />
                  NFT Used
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">NFT ID</span>
                      <Badge className="text-xs bg-purple-500/10 text-purple-700">#{message.nftUsedId || message.nftUsed?.id}</Badge>
                    </div>
                    {message.nftUsed && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Name</span>
                          <span className="text-xs font-semibold">{message.nftUsed.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Type</span>
                          <Badge variant="outline" className="text-xs capitalize">{message.nftUsed.type}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Tier</span>
                          <Badge variant="outline" className="text-xs capitalize">{message.nftUsed.tier}</Badge>
                        </div>
                      </>
                    )}
                  </div>
                  {message.nftUsed?.bonuses && (
                    <div>
                      <span className="text-xs text-muted-foreground block mb-2">Bonuses Applied</span>
                      <div className="space-y-1">
                        {message.nftUsed.bonuses.map((bonus, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <span className="capitalize">{bonus.type.replace('_', ' ')}</span>
                            <span className="font-semibold">+{bonus.totalValue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )} */}

            {/* Participant Details */}
            {message.participant && (
              <Card className="p-4 bg-blue-500/5 border-blue-500/20">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Participant Info
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{message.participant.attemptCount}</div>
                    <div className="text-xs text-muted-foreground">Total Attempts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {message.participant.isWinner ? (
                        <Trophy className="w-5 h-5 text-amber-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">Winner Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {message.participant.isTopChallenger ? (
                        <Badge className="text-xs bg-orange-500/10 text-orange-700">Top</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">Challenger</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-mono text-blue-600">
                      {new Date(message.participant.joinedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Joined</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Question Message */}
            {isParentChild && questionMessage && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Question</h3>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-xl ${
                    questionMessage.isWinningMessage
                      ? "bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30"
                      : questionMessage.role === "user"
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                      : "bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      questionMessage.isWinningMessage
                        ? "bg-amber-500/20"
                        : questionMessage.role === "user"
                        ? "bg-primary/20"
                        : "bg-secondary/20"
                    }`}>
                      {questionMessage.role === "user" ? (
                        <User className={`w-6 h-6 ${questionMessage.isWinningMessage ? "text-amber-500" : "text-primary"}`} />
                      ) : questionMessage.isWinningMessage ? (
                        <Trophy className="w-6 h-6 text-amber-500" />
                      ) : (
                        <Brain className="w-6 h-6 text-secondary" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">
                          {questionMessage.isWinningMessage ? "🏆 Winning Question" : questionMessage.role === "user" ? "User Question" : "AI Question"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatcreatedAt(questionMessage.createdAt).time}
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-background/50 text-sm whitespace-pre-wrap">
                        {questionMessage.content}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {questionMessage.tokensUsed !== undefined && (
                          <Badge variant="outline" className="text-xs">
                            Tokens: {questionMessage.tokensUsed}
                          </Badge>
                        )}
                        
                        {questionMessage.messageFee && questionMessage.role === "user" && (
                          <Badge className={`text-xs ${
                            questionMessage.messageFee !== "0" 
                              ? "bg-primary/10 text-primary" 
                              : "bg-emerald-500/10 text-emerald-500"
                          }`}>
                            <Coins className="w-3 h-3 mr-1" />
                            {questionMessage.messageFee === "0" 
                              ? "Free Message" 
                              : formatValue(parseFloat(questionMessage.messageFee))}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Connection Arrow */}
            {isParentChild && questionMessage && answerMessage && (
              <div className="flex justify-center py-2">
                <div className="w-px h-10 bg-gradient-to-b from-primary/30 to-secondary/30"></div>
              </div>
            )}

            {/* Answer Message */}
            {isParentChild && answerMessage ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Response</h3>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`p-6 rounded-xl ${
                    answerMessage.isWinningMessage
                      ? "bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30"
                      : answerMessage.role === "user"
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                      : "bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      answerMessage.isWinningMessage
                        ? "bg-amber-500/20"
                        : answerMessage.role === "user"
                        ? "bg-primary/20"
                        : "bg-secondary/20"
                    }`}>
                      {answerMessage.role === "user" ? (
                        <User className={`w-6 h-6 ${answerMessage.isWinningMessage ? "text-amber-500" : "text-primary"}`} />
                      ) : answerMessage.isWinningMessage ? (
                        <Trophy className="w-6 h-6 text-amber-500" />
                      ) : (
                        <Brain className="w-6 h-6 text-secondary" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">
                          {answerMessage.isWinningMessage ? "🏆 Winning Response" : answerMessage.role === "user" ? "User Response" : "AI Response"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatcreatedAt(answerMessage.createdAt).time}
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-background/50 text-sm whitespace-pre-wrap">
                        {answerMessage.content}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {answerMessage.tokensUsed !== undefined && (
                          <Badge variant="outline" className="text-xs">
                            Tokens: {answerMessage.tokensUsed}
                          </Badge>
                        )}
                        
                        {answerMessage.messageFee && answerMessage.role === "user" && (
                          <Badge className={`text-xs ${
                            answerMessage.messageFee !== "0" 
                              ? "bg-primary/10 text-primary" 
                              : "bg-emerald-500/10 text-emerald-500"
                          }`}>
                            <Coins className="w-3 h-3 mr-1" />
                            {answerMessage.messageFee === "0" 
                              ? "Free Message" 
                              : formatValue(parseFloat(answerMessage.messageFee))}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Function Calls */}
                      {answerMessage.functionCall && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <h4 className="font-medium text-amber-700">Winning Function Call</h4>
                          </div>
                          {getWinningExplanation(answerMessage) ? (
                            <div className="bg-background/70 p-4 rounded-lg">
                              <div className="text-sm font-medium mb-2 text-amber-700">Explanation:</div>
                              <div className="text-sm text-amber-600">{getWinningExplanation(answerMessage)}</div>
                            </div>
                          ) : (
                            <div className="bg-background/70 p-4 rounded-lg overflow-x-auto">
                              <div className="text-sm font-medium mb-2 text-amber-700">
                                Function: <span className="font-mono">{Array.isArray(answerMessage.functionCall) 
                                  ? answerMessage.functionCall[0].name 
                                  : answerMessage.functionCall.name}</span>
                              </div>
                              <div className="text-sm font-mono">
                                <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(
                                  Array.isArray(answerMessage.functionCall) 
                                    ? answerMessage.functionCall[0].arguments 
                                    : answerMessage.functionCall.arguments, 
                                  null, 2)}</pre>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              // Just show the selected message if there's no parent-child relationship
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-xl ${
                    message.isWinningMessage
                      ? "bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30"
                      : message.role === "user"
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                      : "bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.isWinningMessage
                        ? "bg-amber-500/20"
                        : message.role === "user"
                        ? "bg-primary/20"
                        : "bg-secondary/20"
                    }`}>
                      {message.role === "user" ? (
                        <User className={`w-6 h-6 ${message.isWinningMessage ? "text-amber-500" : "text-primary"}`} />
                      ) : message.isWinningMessage ? (
                        <Trophy className="w-6 h-6 text-amber-500" />
                      ) : (
                        <Brain className="w-6 h-6 text-secondary" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">
                          {message.isWinningMessage ? "🏆 Winning Message" : message.role === "user" ? "User Message" : "AI Message"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatcreatedAt(message.createdAt).full}
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-background/50 text-sm whitespace-pre-wrap">
                        {message.content}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {message.tokensUsed !== undefined && (
                          <Badge variant="outline" className="text-xs">
                            Tokens: {message.tokensUsed}
                          </Badge>
                        )}
                        
                        {message.messageFee && message.role === "user" && (
                          <Badge className={`text-xs ${
                            message.messageFee !== "0" 
                              ? "bg-primary/10 text-primary" 
                              : "bg-emerald-500/10 text-emerald-500"
                          }`}>
                            <Coins className="w-3 h-3 mr-1" />
                            {message.messageFee === "0" 
                              ? "Free Message" 
                              : formatValue(parseFloat(message.messageFee))}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Function Calls */}
                      {message.functionCall && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <h4 className="font-medium text-amber-700">Winning Function Call</h4>
                          </div>
                          {getWinningExplanation(message) ? (
                            <div className="bg-background/70 p-4 rounded-lg">
                              <div className="text-sm font-medium mb-2 text-amber-700">Explanation:</div>
                              <div className="text-sm text-amber-600">{getWinningExplanation(message)}</div>
                            </div>
                          ) : (
                            <div className="bg-background/70 p-4 rounded-lg overflow-x-auto">
                              <div className="text-sm font-medium mb-2 text-amber-700">
                                Function: <span className="font-mono">{Array.isArray(message.functionCall) 
                                  ? message.functionCall[0].name 
                                  : message.functionCall.name}</span>
                              </div>
                              <div className="text-sm font-mono">
                                <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(
                                  Array.isArray(message.functionCall) 
                                    ? message.functionCall[0].arguments 
                                    : message.functionCall.arguments, 
                                  null, 2)}</pre>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}