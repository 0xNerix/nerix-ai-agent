"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Wallet,
  GamepadIcon,
  Trophy,
  Coins,
  ChevronRight,
  Play,
  MessageCircle,
  Clock,
  TrendingUp,
  Shield,
  Gift,
  Target,
  Zap,
  CheckCircle,
  BookOpen,
  Users,
  Star,
  Crown
} from 'lucide-react';

export default function HowToPlayPage() {
  const [activeStep, setActiveStep] = useState<number | null>(1); // Start with first step active

  const steps = [
    {
      id: 1,
      icon: <Wallet className="w-8 h-8" />,
      title: "Connect Your Wallet",
      shortDesc: "Link your BNB Chain wallet to start playing",
      details: [
        "Click 'Connect Wallet' button in the top right corner",
        "Choose your wallet (MetaMask, Trust Wallet, WalletConnect, etc.)",
        "Make sure you're on BNB Chain network (BSC)",
        "You'll need some BNB for game fees (starting at 0.01 BNB per message)",
        "No registration needed - your wallet is your account!"
      ],
      tips: [
        "New to crypto? MetaMask is beginner-friendly",
        "Make sure you have at least 0.1 BNB to play comfortably"
      ]
    },
    {
      id: 2,
      icon: <GamepadIcon className="w-8 h-8" />,
      title: "Choose a Game",
      shortDesc: "Browse active games and join one that interests you",
      details: [
        "Visit the Games page to see all available games",
        "Each game offers unique challenges and experiences",
        "Browse different game types and themes",
        "Read the game description to understand the objective",
        "Select a game that matches your interest and skill level"
      ],
      tips: [
        "Checkmate Paradox is our flagship introductory game - free to try!",
        "Start with simpler games to learn the mechanics"
      ]
    },
    {
      id: 3,
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Challenge the AI",
      shortDesc: "Send messages to try and outsmart Nerix",
      details: [
        "Type your message in the chat interface",
        "Each message may have a small fee depending on the game",
        "You have character limits that can be expanded with NFTs",
        "Wait for cooldown periods between messages",
        "Use creative arguments, logic, or persuasion to win",
        "Study the AI's responses to improve your strategy"
      ],
      tips: [
        "Be creative - AI responds to unexpected approaches",
        "Study previous messages to understand what works",
        "The AI evolves and gets smarter over time"
      ]
    },
    {
      id: 4,
      icon: <Trophy className="w-8 h-8" />,
      title: "Win & Collect Rewards",
      shortDesc: "Win prizes and collect powerful NFTs",
      details: [
        "Successfully convince the AI to win the game",
        "All participants can earn Community NFTs",
        "Most active players may receive Challenger NFTs",
        "Winners get exclusive Winner NFTs with special benefits",
        "NFTs provide gameplay advantages in future games",
        "Collect and build your NFT portfolio over time"
      ],
      tips: [
        "Even if you don't win, you can still earn valuable NFTs",
        "NFTs carry over to future games with bonuses"
      ]
    }
  ];

  const gameFeatures = [
    {
      icon: <Coins className="w-6 h-6 text-yellow-500" />,
      title: "Exciting Rewards",
      description: "Win valuable prizes and cryptocurrency rewards"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "Evolving AI",
      description: "Challenge an AI that learns and adapts over time"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "Blockchain Powered",
      description: "Secure and transparent gameplay on BNB Chain"
    },
    {
      icon: <Gift className="w-6 h-6 text-purple-500" />,
      title: "NFT Collection",
      description: "Collect unique NFTs that enhance your gaming experience"
    }
  ];

  const nftTypes = [
    {
      name: "Community NFT",
      description: "Earned by game participants",
      benefits: ["Enhanced character limits"],
      color: "bg-blue-500/20 border-blue-500/30",
      icon: <Users className="w-8 h-8 text-blue-500" />
    },
    {
      name: "Challenger NFT", 
      description: "For most active players",
      benefits: ["Increased character limits", "Special discounts"],
      color: "bg-purple-500/20 border-purple-500/30",
      icon: <Star className="w-8 h-8 text-purple-500" />
    },
    {
      name: "Winner NFT",
      description: "Exclusive to game winners",
      benefits: ["Maximum character limits", "Premium benefits", "Special bonuses"],
      color: "bg-yellow-500/20 border-yellow-500/30",
      icon: <Crown className="w-8 h-8 text-yellow-500" />
    }
  ];

  return (
    <div className="min-h-screen gradient-bg py-20 px-4 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl opacity-80" style={{ animation: 'gentleFloat 20s ease-in-out infinite' }} />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-secondary/8 rounded-full blur-2xl opacity-70" style={{ animation: 'slowOrbit 25s ease-in-out infinite 5s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/8 rounded-full blur-xl opacity-60" style={{ animation: 'pulseGlow 18s ease-in-out infinite 10s' }} />
        
        {/* Secondary floating elements */}
        <div className="absolute top-1/6 right-1/3 w-48 h-48 bg-primary/6 opacity-50" style={{ 
          animation: 'morphShape 22s ease-in-out infinite 3s',
          borderRadius: '50%'
        }} />
        <div className="absolute bottom-1/4 left-1/6 w-56 h-56 bg-secondary/6 rounded-full blur-xl opacity-40" style={{ animation: 'fadeInOut 24s ease-in-out infinite 8s' }} />
        
        {/* Tertiary elements */}
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-accent/6 rounded-full blur-lg opacity-30" style={{ animation: 'gentleWave 16s ease-in-out infinite 12s' }} />
        <div className="absolute bottom-1/6 left-3/4 w-40 h-40 bg-primary/5 rounded-full blur-xl opacity-25" style={{ animation: 'slowSpin 28s ease-in-out infinite 15s' }} />
      </div>

      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl shadow-lg hover:bg-card/95 hover:border-primary/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Back to Home
            </span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="relative">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              How to Join Nerix
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg blur opacity-25 animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Challenge an evolving AI and collect powerful NFTs. 
            <br />
            <span className="text-primary font-semibold">Follow these interactive steps to start your AI gaming adventure.</span>
          </p>
        </motion.div>

        {/* Step-by-Step Guide */}
        <div className="space-y-12">

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/60 backdrop-blur-md overflow-hidden group hover:border-primary/30 transition-all duration-300">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                          {step.icon}
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-3 text-lg">
                            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                              Step {step.id}
                            </Badge>
                            {step.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-base">
                            {step.shortDesc}
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`w-6 h-6 text-muted-foreground transition-all duration-300 ${
                          activeStep === step.id ? 'rotate-90 text-primary' : 'group-hover:text-primary/70'
                        }`} 
                      />
                    </div>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardContent className="pt-0 space-y-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              What to do:
                            </h4>
                            <ul className="space-y-2">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {step.tips.length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-border/50">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                Pro Tips:
                              </h4>
                              <ul className="space-y-1">
                                {step.tips.map((tip, idx) => (
                                  <li key={idx} className="text-sm text-yellow-600 dark:text-yellow-400">
                                    💡 {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Next Step Button */}
                          {step.id < 4 && (
                            <div className="pt-4 border-t border-border/50">
                              <div className="flex justify-end">
                                <Button
                                  onClick={() => setActiveStep(step.id + 1)}
                                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group"
                                >
                                  <span>Continue</span>
                                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Final CTA for Step 4 */}
                          {step.id === 4 && (
                            <div className="pt-4 border-t border-border/50">
                              <Link href="/games">
                                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                                  <Trophy className="w-4 h-4 mr-2" />
                                  Challenge the AI
                                </Button>
                              </Link>
                            </div>
                          )}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>


        </div>

        {/* Quick Overview - MOVED AFTER STEPS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              What Makes Nerix Special
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the unique features that make our AI gaming experience extraordinary
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="border-border/50 bg-card/60 backdrop-blur-md hover:bg-card/80 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 text-center space-y-4 relative z-10 h-full flex flex-col justify-center">
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NFT Rewards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NFT Rewards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Collect unique NFTs that enhance your gaming experience and provide lasting benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nftTypes.map((nft, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`border-2 ${nft.color} hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative z-10 text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-xl bg-background/50 group-hover:bg-background/70 transition-colors duration-300">
                        {nft.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{nft.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {nft.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <div className="text-center">
                      <h4 className="font-semibold mb-3 text-primary">Benefits:</h4>
                      <ul className="space-y-2">
                        {nft.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm bg-background/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/30">
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-8 py-16"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-50 animate-pulse" />
            <Card className="relative bg-card/80 backdrop-blur-md border-2 border-primary/20 hover:border-primary/40 transition-all duration-500">
              <CardContent className="p-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Ready to Challenge the AI?
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Join the adventure and test your wit against an evolving artificial intelligence. 
                    <span className="text-primary font-semibold"> Your journey starts now!</span>
                  </p>
                  <div className="flex items-center justify-center gap-6 pt-4">
                    <Link href="/games">
                      <Button size="lg" className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3">
                        <GamepadIcon className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                        <span className="text-lg font-semibold">Join Now</span>
                      </Button>
                    </Link>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/support">
                        <Button variant="outline" size="lg" className="border-2 hover:border-primary/50 hover:bg-primary/5 px-8 py-3">
                          <MessageCircle className="w-6 h-6 mr-3" />
                          <span className="text-lg">Get Help</span>
                        </Button>
                      </Link>
                      <Link href="/system-overview">
                        <Button variant="outline" size="lg" className="border-2 hover:border-primary/50 hover:bg-primary/5 px-8 py-3">
                          <BookOpen className="w-6 h-6 mr-3" />
                          <span className="text-lg">Learn More</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}