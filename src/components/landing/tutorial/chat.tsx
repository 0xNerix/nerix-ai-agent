"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, User, Coins, Trophy } from "lucide-react";
import { Message } from "@/types/chat";
import { GAME_DATA } from "./tutorial-data";

interface ChatProps {
  messages: Message[];
  inputValue: string;
  isTyping: boolean;
}

export function Chat({ messages, inputValue, isTyping }: ChatProps) {
  return (
    <motion.div
      key="chat"
      className="h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-16 border-b p-4 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Checkmate Paradox - Nerix AI</h3>
              <p className="text-sm text-muted-foreground">AI Opponent</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Prize Pool</p>
              <p className="text-lg font-bold text-primary">{GAME_DATA.prizePool} BNB</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 pb-2">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className={`flex gap-3 max-w-[80%] mb-4 ${
              message.role === "user" ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              message.role === "user" ? "bg-primary/10" : "bg-secondary/10"
            }`}>
              {message.role === "user" ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Brain className="w-4 h-4 text-secondary" />
              )}
            </div>
            <div className={`rounded-lg p-4 ${
              message.role === "user" ? "bg-primary/10" : "bg-muted"
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1 h-[60px] rounded-lg bg-muted p-4 font-mono text-sm relative flex items-center">
            {inputValue}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: 9999 }}
              >
                |
              </motion.span>
            )}
          </div>
          <Button 
            className="w-[120px] h-[60px] group"
          >
            <Coins className="w-5 h-5 mr-2 text-emerald-500" />
            <span className="text-emerald-500">FREE</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}