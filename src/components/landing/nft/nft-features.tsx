"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Timer,
  Coins,
  Layers,
  Zap,
  Sparkles,
  Trophy,
  Users,
  Star,
  Brain,
  MessageCircle,
  ScrollText,
  Crown,
  Calculator,
} from "lucide-react";

export function NFTFeatures() {
  // NFT Types with updated data
  const nftTypes = [
    {
      title: "Community NFTs",
      icon: <Users className="w-6 h-6 text-primary" />,
      description: "Awarded to all participants at the end of each iteration",
      features: [
        {
          name: "Character Bonus",
          value: "+100 characters per message",
          icon: <MessageCircle className="w-4 h-4" />,
        },
        {
          name: "Rarity",
          value: "Common",
          icon: <Star className="w-4 h-4" />,
        },
        {
          name: "Prestige Level",
          value: "Low",
          icon: <Crown className="w-4 h-4" />,
        },
      ],
      color: "from-primary/20 to-primary/5",
    },
    {
      title: "Challenger NFTs",
      icon: <Star className="w-6 h-6 text-secondary" />,
      description: "Reserved for top 3 players with highest attempt counts",
      features: [
        {
          name: "Character Bonus",
          value: "+200 characters per message",
          icon: <MessageCircle className="w-4 h-4" />,
        },
        {
          name: "Fee Reduction",
          value: "10% message fee reduction",
          icon: <Coins className="w-4 h-4" />,
        },
        {
          name: "Rarity",
          value: "Rare",
          icon: <Star className="w-4 h-4" />,
        },
        {
          name: "Prestige Level",
          value: "Medium",
          icon: <Crown className="w-4 h-4" />,
        },
      ],
      color: "from-secondary/20 to-secondary/5",
    },
    {
      title: "Winner NFTs",
      icon: <Trophy className="w-6 h-6 text-accent" />,
      description: "Exclusive to iteration winners",
      features: [
        {
          name: "Character Bonus",
          value: "+300 characters per message",
          icon: <MessageCircle className="w-4 h-4" />,
        },
        {
          name: "Fee Reduction",
          value: "20% message fee reduction",
          icon: <Coins className="w-4 h-4" />,
        },
        {
          name: "Context Bonus",
          value: "+3 context messages",
          icon: <ScrollText className="w-4 h-4" />,
        },
        {
          name: "Special Ability",
          value: "Priority message processing",
          icon: <Zap className="w-4 h-4" />,
        },
        {
          name: "Rarity",
          value: "Legendary",
          icon: <Star className="w-4 h-4" />,
        },
        {
          name: "Prestige Level",
          value: "Highest",
          icon: <Crown className="w-4 h-4" />,
        },
      ],
      color: "from-accent/20 to-accent/5",
    },
  ];

  // Example NFT progression data
  const exampleProgression = [
    {
      iteration: 1,
      currentIteration: 1,
      bonusMultiplier: "1x (Base)",
      messageLimit: "300",
      feeReduction: "20%",
      contextBonus: "+3",
    },
    {
      iteration: 1,
      currentIteration: 5,
      bonusMultiplier: "1.4x (+40%)",
      messageLimit: "420",
      feeReduction: "28%",
      contextBonus: "+4.2",
    },
    {
      iteration: 1,
      currentIteration: 10,
      bonusMultiplier: "1.65x (+65%)",
      messageLimit: "495",
      feeReduction: "33%",
      contextBonus: "+5",
    },
    {
      iteration: 1,
      currentIteration: 50,
      bonusMultiplier: "2.5x (+150%)",
      messageLimit: "750",
      feeReduction: "50%",
      contextBonus: "+7.5",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Main Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">NFT System & Benefits</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Each NFT type provides unique advantages. NFTs from earlier iterations
          grant stronger bonuses.
        </p>
      </div>

      {/* NFT Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nftTypes.map((type, index) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 backdrop-blur-sm bg-background/50 border-primary/10 hover:bg-background/60 transition-all duration-300">
              {/* NFT Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                  {type.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{type.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>

              {/* NFT Features */}
              <div className="space-y-3">
                {type.features.map((feature, i) => (
                  <div
                    key={feature.name}
                    className={`p-3 rounded-lg bg-gradient-to-r ${type.color}`}
                  >
                    <div className="flex items-center gap-2">
                      {feature.icon}
                      <div>
                        <p className="text-sm font-medium">{feature.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {feature.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Legacy Bonus System Highlight */}
      <Card className="p-8 backdrop-blur-sm bg-background/50 border-primary/10 overflow-hidden relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Timer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Legacy Bonus System</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Nerix&apos;s unique Legacy Bonus system ensures that early NFTs
              retain their value while maintaining balanced growth for newer
              iterations.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Progressive Scaling</p>
                  <p className="text-sm text-muted-foreground">
                    Bonuses scale based on iteration gap, with early NFTs
                    gaining the most value over time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">All-Around Benefits</p>
                  <p className="text-sm text-muted-foreground">
                    Legacy bonus applies to all NFT attributes, enhancing
                    every feature from message limits to fee reductions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-background/50 border border-primary/10">
            <h4 className="text-lg font-semibold mb-4 text-center">
              Legacy Bonus Scaling
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                <span>Iterations 1-5</span>
                <span className="font-bold text-primary">
                  +10% per iteration
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                <span>Iterations 6-10</span>
                <span className="font-bold text-primary">
                  +5% per iteration
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                <span>Iterations 11-20</span>
                <span className="font-bold text-primary">
                  +2.5% per iteration
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                <span>Iterations 21-100</span>
                <span className="font-bold text-primary">
                  +1% per iteration
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                <span>Iterations 100+</span>
                <span className="font-bold text-primary">
                  +0.5% per iteration
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Legacy Bonus Example */}
      <Card className="p-6 backdrop-blur-sm bg-background/50 border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">Legacy Bonus Example</h4>
            <p className="text-sm text-muted-foreground">
              See how an Iteration 1 Winner NFT grows stronger over time
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Example Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/10">
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                    Current Iteration
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                    Bonus Multiplier
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                    Message Limit
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                    Fee Reduction
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                    Context Bonus
                  </th>
                </tr>
              </thead>
              <tbody>
                {exampleProgression.map((row, index) => (
                  <tr key={index} className="border-b border-primary/5">
                    <td className="py-3">Iteration {row.currentIteration}</td>
                    <td className="py-3 text-primary">{row.bonusMultiplier}</td>
                    <td className="py-3">{row.messageLimit} chars</td>
                    <td className="py-3">{row.feeReduction}</td>
                    <td className="py-3">{row.contextBonus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Explanation Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-5 h-5 text-primary" />
                <h5 className="font-medium">Time-Based Growth</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Earlier NFTs gain stronger bonuses as new iterations are
                released
              </p>
            </div>

            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-secondary" />
                <h5 className="font-medium">Progressive Scaling</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Bonuses scale based on iteration gap, with early NFTs gaining
                the most
              </p>
            </div>

            <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-accent" />
                <h5 className="font-medium">All-Around Benefits</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Legacy bonus applies to all NFT attributes, enhancing every
                feature
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Important Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-background/50 border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-primary" />
            <h4 className="font-semibold">Strategic Value</h4>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Early iteration NFTs become increasingly valuable over time. For
              example, a Winner NFT from iteration 1 will have significantly
              stronger bonuses by iteration 50 compared to newer NFTs.
            </p>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-background/50 border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-secondary" />
            <h4 className="font-semibold">Balanced Growth</h4>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              The progressive scaling system ensures that while early NFTs
              maintain their advantage, newer NFTs remain competitive through
              adjusted base values and specialized abilities.
            </p>
          </div>
        </Card>
      </div>
      {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl italic text-muted-foreground max-w-3xl mx-auto">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary blur-2xl opacity-10" />
              <span className="relative">
                &quot;Owning an early iteration NFT in Nerix isn&apos;t just a flex—it&apos;s a long-term strategic advantage.&quot;
              </span>
            </span>
          </blockquote>
        </motion.div>
    </div>
  );
}
