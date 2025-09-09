"use client";

import { motion } from "framer-motion";

export function ProfileBackground() {
  return (
    <div className="absolute inset-0">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-accent/15 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 left-1/3 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }} />
      
      {/* Animated Lines */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent w-full"
            style={{
              top: `${20 + i * 20}%`,
              opacity: 0.4,
              scale: 0.8,
            }}
            animate={{
              x: [-1000, 1000],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: 9999,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: 9999,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-teal-500/5 pointer-events-none" />
      
      {/* Corner Highlights */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-2xl" />
    </div>
  );
}