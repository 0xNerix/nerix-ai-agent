import { Users, Star, Trophy } from "lucide-react";

export type NFTTier = 'common' | 'rare' | 'legendary';
export type NFTType = 'community' | 'challenger' | 'winner';

export const getNFTTierColors = (tier: NFTTier, withOpacity = false) => {
  const baseColors = {
    common: 'from-zinc-500 to-zinc-300',
    rare: 'from-blue-500 to-purple-500', 
    legendary: 'from-yellow-500 to-amber-500'
  };

  if (withOpacity) {
    const opacityColors = {
      common: 'from-zinc-500/20 to-zinc-300/20 border-zinc-500/30',
      rare: 'from-blue-500/20 to-purple-500/20 border-blue-500/30',
      legendary: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
    };
    return opacityColors[tier];
  }

  return baseColors[tier];
};

export const getNFTTypeIcon = (type: NFTType, className = "w-5 h-5") => {
  const icons = {
    community: <Users className={className} />,
    challenger: <Star className={className} />,
    winner: <Trophy className={className} />
  };

  return icons[type];
};

export const getNFTTypeIconComponent = (type: NFTType) => {
  const iconComponents = {
    community: Users,
    challenger: Star,
    winner: Trophy
  };

  return iconComponents[type];
};

export const getNFTRarityLabel = (type: NFTType) => {
  const rarityLabels = {
    community: 'Common',
    challenger: 'Rare', 
    winner: 'Legendary'
  };

  return rarityLabels[type];
};