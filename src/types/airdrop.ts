export interface AirdropReward {
  type: 'token' | 'message_credit';
  amount: number;
  label: string;
}

export interface AirdropLevel {
  id: number;
  name: string;
  description: string;
  reward: number;
  type: 'wallet' | 'twitter' | 'discord' | 'telegram';
  action: string;
  verificationField?: string;
  socialLink?: string;
  rewards: AirdropReward[];
}

export interface AirdropStats {
  totalParticipants: number;
  totalTokensDistributed: number;
  daysLeft: number;
}

export interface AirdropRegistration {
  id: string;
  walletAddress: string;
  completedLevels: number[];
  twitterUsername?: string;
  discordUsername?: string;
  telegramUsername?: string;
  createdAt: string;
  updatedAt: string;
}
