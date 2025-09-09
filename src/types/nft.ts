// NFT types for static data and UI components

export interface NFTBonus {
  type: 'message_limit' | 'fee_reduction' | 'context_message_limit' | 'special_tools';
  value: number;
  description: string;
}

export interface NFT {
  id: string;
  name: string;
  type: 'community' | 'challenger' | 'winner';
  tier: 'common' | 'rare' | 'legendary';
  iteration: number;
  image: string;
  description: string;
  bonuses: NFTBonus[];
  isLocked: boolean;
  openSeaLink: string;
}

export interface NFTStat {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}

export interface NFTFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Extended NFT type for dynamic ownership state
export interface NFTWithOwnership extends Omit<NFT, 'isLocked'> {
  isLocked: boolean;
  isOwned: boolean;
  tokenId?: bigint;
  owner?: string;
}