export interface ConversationItem {
  id: string;
  content: string;
  gameId: string;
  gameName: string;
  createdAt: string;
  iteration: number;
  messageFee?: string;
  transactionHash?: string;
  aiResponse?: {
    id: string;
    content: string;
    createdAt: string;
    isWinningMessage: boolean;
  };
}

export interface NFTItem {
  id: string;
  tokenId: string;
  name: string;
  nftType: 'community' | 'challenger' | 'winner';
  iteration: number;
  mintTime: string;
}

export interface ProfileData {
  user: {
    address: string;
    displayName?: string;
    avatar?: string;
    createdAt: string;
    hasBetaAccess: boolean;
  };
  stats: {
    totalGames: number;
    totalMessages: number;
    totalNFTs: number;
  };
  conversations: ConversationItem[];
  nfts: NFTItem[];
}

export interface ProfileError {
  error: string;
  message?: string;
}

export type ProfileResponse = ProfileData | ProfileError;