import { AirdropLevel } from "@/types/airdrop";

export const AIRDROP_LEVELS: AirdropLevel[] = [
  {
    id: 1,
    name: "Connect Wallet",
    description: "Connect your wallet to start earning NRX tokens and message credits",
    reward: 100,
    type: "wallet",
    action: "Connect your wallet",
    rewards: [
      {
        type: "token",
        amount: 100,
        label: "NRX Tokens"
      }
    ]
  },
  {
    id: 2,
    name: "Share on Twitter",
    description: "Share about Nerix on Twitter to earn tokens and message credits",
    reward: 100,
    type: "twitter",
    action: "Share and verify",
    verificationField: "Tweet URL",
    socialLink: "https://twitter.com/intent/tweet?text=I'm%20excited%20to%20join%20@0xNerix's%20revolutionary%20AI-powered%20gaming%20platform!%20🎮✨%0A%0AChallenge%20AI%20guardians,%20earn%20rewards,%20and%20be%20part%20of%20the%20future%20of%20blockchain%20gaming.%0A%0A%23Nerix%20%23GameFi%20%23Web3Gaming",
    rewards: [
      {
        type: "token",
        amount: 100,
        label: "NRX Tokens"
      }
    ]
  },
  {
    id: 3,
    name: "Join Discord",
    description: "Join our Discord community to earn tokens and message credits",
    reward: 300,
    type: "discord",
    action: "Join and verify",
    verificationField: "Discord Username",
    socialLink: "https://discord.gg/bvxzdHgBPW",
    rewards: [
      {
        type: "token",
        amount: 300,
        label: "NRX Tokens"
      }
    ]
  },
  {
    id: 4,
    name: "Join Telegram",
    description: "Join our Telegram group to earn tokens and message credits",
    reward: 500,
    type: "telegram",
    action: "Join and verify",
    verificationField: "Telegram Username",
    socialLink: "https://t.me/nerixaiprotocol",
    rewards: [
      {
        type: "token",
        amount: 500,
        label: "NRX Tokens"
      },
      {
        type: "message_credit",
        amount: 1,
        label: "Free Message in Endless Mode"
      }
    ]
  }
];

export const AIRDROP_STATS = {
  totalParticipants: 0,
  totalTokensDistributed: 0
};

export const AIRDROP_CONFIG = {
  prelaunchEndDate: "2025-08-15T12:00:00Z", 
  airdropEndDate: "2025-09-30T23:59:59Z", 
};