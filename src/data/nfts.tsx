import { Trophy, Users, Star, Timer, Coins, Layers, Zap, Sparkles } from "lucide-react";
import { NFT, NFTStat, NFTFeature } from "@/types/nft";

// Base values for each NFT type that remain constant across iterations
const BASE_VALUES = {
  community: {
    message_limit: 100, // Base 100 characters
  },
  challenger: {
    message_limit: 200, // Base 200 characters
    fee_reduction: 10, // Base 10% reduction
    context_message_limit: 0, // No context bonus
  },
  winner: {
    message_limit: 300, // Base 300 characters
    fee_reduction: 20, // Base 20% reduction
    context_message_limit: 3, // Base +3 messages
  }
};

// Legacy bonus calculation based on new progressive scaling
export const calculateIterationBonus = (currentIteration: number, nftIteration: number): number => {
  if (nftIteration >= currentIteration) return 1;
  
  const iterationDiff = currentIteration - nftIteration;
  
  let bonus = 1;
  
  if (iterationDiff <= 5) {
    bonus += iterationDiff * 0.10; // +10% per iteration for 1-5
  } else if (iterationDiff <= 10) {
    bonus += 0.5 + ((iterationDiff - 5) * 0.05); // +5% per iteration for 6-10
  } else if (iterationDiff <= 20) {
    bonus += 0.75 + ((iterationDiff - 10) * 0.025); // +2.5% per iteration for 11-20
  } else if (iterationDiff <= 100) {
    bonus += 1 + ((iterationDiff - 20) * 0.01); // +1% per iteration for 21-100
  } else {
    bonus += 1.8 + ((iterationDiff - 100) * 0.005); // +0.5% per iteration for 100+
  }
  
  return bonus;
};

// Helper function to generate NFTs for each iteration
const generateNFTsForIteration = (iteration: number): NFT[] => [
  {
    id: `community-${iteration}`,
    name: `Community Guardian ${iteration}`,
    type: "community",
    tier: "common",
    iteration,
    image: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-community.png",
    description: `Awarded to dedicated community members who participated in iteration ${iteration}`,
    bonuses: [
      {
        type: "message_limit",
        value: BASE_VALUES.community.message_limit,
        description: `+${BASE_VALUES.community.message_limit} characters per message`
      }
    ],
    isLocked: true, // All NFTs are locked initially
    openSeaLink: `https://opensea.io/assets/ethereum/nerix/community-${iteration}`
  },
  {
    id: `challenger-${iteration}`,
    name: `Master Strategist ${iteration}`,
    type: "challenger",
    tier: "rare",
    iteration,
    image: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-challanger.png",
    description: `Reserved for the most persistent challengers who demonstrated exceptional dedication with the highest number of attempts in iteration ${iteration}`,
    bonuses: [
      {
        type: "message_limit",
        value: BASE_VALUES.challenger.message_limit,
        description: `+${BASE_VALUES.challenger.message_limit} characters per message`
      },
      {
        type: "fee_reduction",
        value: BASE_VALUES.challenger.fee_reduction,
        description: `${BASE_VALUES.challenger.fee_reduction}% message fee reduction`
      }
    ],
    isLocked: true, // All NFTs are locked initially
    openSeaLink: `https://opensea.io/assets/ethereum/nerix/challenger-${iteration}`
  },
  {
    id: `winner-${iteration}`,
    name: `Grand Champion ${iteration}`,
    type: "winner",
    tier: "legendary",
    iteration,
    image: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-winner.png",
    description: `Awarded to the ultimate champion who conquered iteration ${iteration}`,
    bonuses: [
      {
        type: "message_limit",
        value: BASE_VALUES.winner.message_limit,
        description: `+${BASE_VALUES.winner.message_limit} characters per message`
      },
      {
        type: "fee_reduction",
        value: BASE_VALUES.winner.fee_reduction,
        description: `${BASE_VALUES.winner.fee_reduction}% message fee reduction`
      },
      {
        type: "context_message_limit",
        value: BASE_VALUES.winner.context_message_limit,
        description: `+${BASE_VALUES.winner.context_message_limit} context messages`
      }
    ],
    isLocked: true, // All NFTs are locked initially
    openSeaLink: `https://opensea.io/assets/ethereum/nerix/winner-${iteration}`
  }
];

// Generate NFTs for all iterations
export const nfts: NFT[] = [
  ...generateNFTsForIteration(1),

];

export const nftStats: NFTStat[] = [
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    label: "Community NFTs",
    value: "0",
    description: "Distributed to participants"
  },
  {
    icon: <Star className="w-5 h-5 text-secondary" />,
    label: "Challenger NFTs",
    value: "0",
    description: "For dedicated players"
  },
  {
    icon: <Trophy className="w-5 h-5 text-accent" />,
    label: "Winner NFTs",
    value: "0",
    description: "Exclusive to winners"
  }
];

export const nftFeatures: NFTFeature[] = [
  {
    icon: <Timer className="w-6 h-6 text-primary" />,
    title: "Legacy Bonus",
    description: "Earlier iteration NFTs provide stronger bonuses"
  },
  {
    icon: <Layers className="w-6 h-6 text-secondary" />,
    title: "Unique Abilities",
    description: "Each NFT type has special abilities"
  },
  {
    icon: <Coins className="w-6 h-6 text-accent" />,
    title: "Fee Reduction",
    description: "Reduce message fees and increase earnings"
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Enhanced Abilities",
    description: "Increase message limits and context window"
  },
  {
    icon: <Trophy className="w-6 h-6 text-secondary" />,
    title: "Exclusive Rewards",
    description: "Earn unique rewards and privileges"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-accent" />,
    title: "Rare Benefits",
    description: "Access special features and bonuses"
  }
];