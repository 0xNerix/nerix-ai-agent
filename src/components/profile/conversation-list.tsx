"use client";

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar, Crown, Zap, Bot, User } from 'lucide-react';
import type { ConversationItem } from '@/components/profile/types';

interface ConversationListProps {
  conversations: ConversationItem[];
}

export function ConversationList({ conversations }: ConversationListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
          {conversations.length > 0 ? (
            <div className="space-y-4">
              {conversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-4 bg-background/30 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <Badge className="bg-accent/20 text-accent border-accent/30 w-fit">
                        {conversation.gameName}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(conversation.createdAt)}
                      </span>
                    </div>
                    {conversation.messageFee && (
                      <Badge variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        {conversation.messageFee} BNB
                      </Badge>
                    )}
                  </div>

                  {/* User Message */}
                  <div className="mb-3 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-400">You</span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {conversation.content}
                    </p>
                  </div>

                  {/* AI Response */}
                  {conversation.aiResponse && (
                    <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-400">AI</span>
                        </div>
                        {conversation.aiResponse.isWinningMessage && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            <Crown className="h-3 w-3 mr-1" />
                            Winner
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {conversation.aiResponse.content}
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {formatDate(conversation.aiResponse.createdAt)}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="p-4 rounded-full bg-muted/20 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-1">No conversations yet</p>
              <p className="text-sm text-muted-foreground/60">
                Start playing games to see your conversations!
              </p>
            </div>
          )}
    </motion.div>
  );
}