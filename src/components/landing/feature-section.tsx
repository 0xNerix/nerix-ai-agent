"use client";

import { Card } from "@/components/ui/card";
import { Brain, Coins, Trophy, Users, Shield, Sparkles, Zap, Lock, Layers, Timer } from "lucide-react";
import { motion } from "framer-motion";

export function FeatureSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "Neural Core",
      description: "Powered by state-of-the-art language models and neural networks for unparalleled AI decision-making and strategic gameplay."
    },
    {
      icon: <Coins className="w-6 h-6 text-secondary" />,
      title: "Dynamic Prize Pools",
      description: "Sustainable economic model with growing prize pools where 60% of message fees contribute to rewards."
    },
    {
      icon: <Trophy className="w-6 h-6 text-accent" />,
      title: "NFT Reward System",
      description: "Earn unique NFTs with functional benefits that grow stronger over time, providing strategic advantages in gameplay."
    },
    {
      icon: <Timer className="w-6 h-6 text-primary" />,
      title: "Legacy Bonus System",
      description: "Early NFTs gain increasing power over time, with bonuses scaling based on iteration gaps to reward early adopters."
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary" />,
      title: "AI Security Testing",
      description: "A gamified red teaming protocol where players attempt to exploit AI systems, strengthening security with each iteration."
    },
    {
      icon: <Layers className="w-6 h-6 text-accent" />,
      title: "Iteration System",
      description: "Continuous evolution through game iterations, where each cycle improves AI resilience and increases strategic depth."
    }
  ];

  const advancedFeatures = [
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "Self-Evolving AI",
      description: "Nerix continuously analyzes player strategies, learns, and adapts—making each iteration more challenging than the last."
    },
    {
      icon: <Shield className="w-6 h-6 text-secondary" />,
      title: "Blockchain Security",
      description: "All transactions and game outcomes are recorded on the blockchain, ensuring complete transparency and security."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent" />,
      title: "Community-Driven Growth",
      description: "Player actions directly shape the evolution of the platform, creating a dynamic and ever-changing landscape."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-accent/15 via-emerald-500/10 to-emerald-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
              style={{
                top: `${25 + i * 25}%`,
                opacity: 0.5,
                scale: 0.8,
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: 9999,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >

          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-emerald-500 to-accent blur-2xl opacity-30" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-accent via-emerald-500 to-accent animate-gradient-x">
                Next-Gen AI Gaming, Fully On-Chain
              </span>
            </span>
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge a self-evolving AI with natural language. Win BNB prize pools and collect NFTs that grow stronger every round.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group p-6 backdrop-blur-sm bg-background/50 hover:bg-background/60 transition-all duration-300 border-primary/10 h-full"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Advanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Advanced Platform Capabilities</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nerix combines cutting-edge technologies to create a secure, transparent, and continuously evolving gaming ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="relative overflow-hidden h-full group backdrop-blur-sm bg-background/20 border-white/10">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/5 via-background/10 to-background/5 opacity-100 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 animate-gradient-x" />
                  </div>
                  
                  <div className="relative p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}