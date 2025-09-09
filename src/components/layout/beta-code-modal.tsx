"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Key, Sparkles, CheckCircle } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '@/lib/api/client';

interface BetaCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BetaCodeModal({ open, onOpenChange }: BetaCodeModalProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [betaCode, setBetaCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const betaCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      return api.auth.activateBetaAccess(code.trim());
    },
    onSuccess: () => {
      setIsSuccess(true);
      setError(null);
      
      // Invalidate beta access queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: queryKeys.betaAccess.all });
      
      // Success state for 2 seconds then close
      setTimeout(() => {
        setIsSuccess(false);
        setBetaCode('');
        onOpenChange(false);
        // Reload the page to ensure all components get updated data
        window.location.reload();
      }, 2000);
    },
    onError: (err: any) => {
      setError(err.message || 'Beta code could not be verified');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    if (!session?.address) {
      setError('Please connect your wallet first');
      return;
    }

    setError(null);
    betaCodeMutation.mutate(betaCode);
  };

  const handleClose = () => {
    setBetaCode('');
    setError(null);
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border border-white/10">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl font-semibold">
            <div className="p-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20">
              <Key className="w-5 h-5 text-orange-500" />
            </div>
            Beta Access Code
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your code to access beta games
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-8 space-y-4"
            >
              <div className="p-4 rounded-full bg-green-500/20">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-600 mb-1">
                  Beta Access Activated!
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can now access beta games
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="beta-code" className="text-sm font-medium">
                  Beta Code
                </Label>
                <div className="relative">
                  <Input
                    id="beta-code"
                    type="text"
                    placeholder="BETA-XXXX-XXXX"
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value.toUpperCase())}
                    className="pr-10 bg-background/50"
                    disabled={betaCodeMutation.isPending}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Sparkles className="w-4 h-4 text-orange-500/60" />
                  </div>
                </div>
              </div>

              {error && (
                <Alert className="border-red-500/20 bg-red-500/10">
                  <AlertDescription className="text-red-600 text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={betaCodeMutation.isPending}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={betaCodeMutation.isPending || !betaCode.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  {betaCodeMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Activate'
                  )}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>Beta codes can be shared and used by multiple people.</p>
                <p>Each user can only activate one beta code.</p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}