"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  const handleRefresh = () => {
    try {
      reset();
    } catch {
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen gradient-bg">
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Hero-style Nerix Logo */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative rounded-3xl px-3 pt-2 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group hover:from-primary/30 hover:to-secondary/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png"
                  alt="Nerix Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain relative"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg"
                  alt="Nerix"
                  height={24}
                  width={80}
                  className="h-6 hidden dark:block relative"
                />
                <Image
                  src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg"
                  alt="Nerix"
                  height={24}
                  width={80}
                  className="h-6 dark:hidden relative"
                />
              </div>
            </div>
          </div>

          {/* Error Content */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              An unexpected error occurred. Please try refreshing the page or return to the homepage.
            </p>

            {error.message && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-mono text-red-500">{error.message}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRefresh} size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}