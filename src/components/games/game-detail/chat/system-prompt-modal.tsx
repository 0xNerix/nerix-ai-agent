"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Code, Brain, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SystemPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemPrompt: string;
  gameName: string;
}

export function SystemPromptModal({
  isOpen,
  onClose,
  systemPrompt,
  gameName
}: SystemPromptModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:w-[600px] md:-translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-md border border-muted/30 rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-muted/30 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">System Prompt</h3>
                    <p className="text-xs text-muted-foreground">{gameName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">AI Instructions</span>
                  <Badge variant="secondary" className="text-xs">
                    {systemPrompt.length} characters
                  </Badge>
                </div>
                
                <ScrollArea className="h-[300px] w-full">
                  <div className="p-4 bg-muted/30 rounded-lg border border-muted/40">
                    <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap text-foreground">
                      {systemPrompt}
                    </pre>
                  </div>
                </ScrollArea>
                
                {/* Footer Info */}
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-primary/80">
                      <div className="font-medium mb-1">About System Prompts</div>
                      <div>
                        This is the core instruction set that guides the AI&apos;s behavior and decision-making process. 
                        It defines the AI&apos;s personality, objectives, and how it should interact with players.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}