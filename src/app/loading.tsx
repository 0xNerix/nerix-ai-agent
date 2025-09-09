"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background/95 to-background flex items-center justify-center overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Single subtle glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: 9999,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo - Hero Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
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
          
          <p className="text-muted-foreground text-sm">
            Loading amazing things for you...
          </p>
        </motion.div>

        {/* Simple loading indicator */}
        <motion.div 
          className="flex justify-center items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Brain className="w-5 h-5 text-primary" />
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary/60 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: 9999,
                  delay: index * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}