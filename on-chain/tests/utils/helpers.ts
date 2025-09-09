import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { NerixGame, NerixNFT } from "../../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

// Helper to advance blockchain time
export async function advanceTime(seconds: number): Promise<void> {
  await time.increase(seconds);
}

// Helper to deploy the NFT contract
export async function deployNerixNFT(
  deployer: HardhatEthersSigner
): Promise<NerixNFT> {
  const name = "Nerix NFT";
  const symbol = "NRIX";
  const baseURI = "https://nerixai.com/api/nft/";
  
  const NerixNFTFactory = await ethers.getContractFactory("NerixNFT", deployer);
  const transferLockIterations = 1;
  return await NerixNFTFactory.deploy(name, symbol, baseURI, transferLockIterations) as unknown as NerixNFT;
}

// Helper to deploy the game contract
export async function deployNerixGame(
  deployer: HardhatEthersSigner
): Promise<NerixGame> {
  const NerixGameFactory = await ethers.getContractFactory("NerixGame", deployer);
  
  // Configuration values matching the original contract constants
  const isIterative = true;
  const baseMessageFee = ethers.parseEther("0.01");
  const messageGrowthRate = 78;
  const messageCooldown = 30;
  const initialRewardPool = ethers.parseEther("0.1");
  const currentPoolShare = 60;
  const nextPoolShare = 20;
  const teamPoolShare = 20;
  const maxFeeDiscount = 80;
  const baseCharacterLimit = 500;
  const firstMoverDiscount = 10;
  const maxMessageFee = ethers.parseEther("2");
  
  return await NerixGameFactory.deploy(
    isIterative,
    baseMessageFee,
    messageGrowthRate,
    messageCooldown,
    initialRewardPool,
    currentPoolShare,
    nextPoolShare,
    teamPoolShare,
    maxFeeDiscount,
    baseCharacterLimit,
    firstMoverDiscount,
    maxMessageFee
  ) as unknown as NerixGame;
}

// Helper to set up the full game system with connected contracts
export async function setupNerixSystem(
  deployer: HardhatEthersSigner
): Promise<{ game: NerixGame; nft: NerixNFT }> {
  // Deploy contracts
  const nerixGame = await deployNerixGame(deployer);
  const nerixNFT = await deployNerixNFT(deployer);
  
  // Set up connections between contracts
  await nerixNFT.setGameContract(await nerixGame.getAddress());
  await nerixGame.setNerixNFTAddress(await nerixNFT.getAddress());
  
  // Set initial system prompt
  const initialPrompt = "Welcome to Nerix AI Gaming Platform! Test your skills against the AI.";
  await nerixGame.setInitialPrompt(Buffer.from(initialPrompt));
  
  // Start the first game
  await nerixGame.startFirstGame();
  
  // Send some initial funds to the game contract
  await deployer.sendTransaction({
    to: await nerixGame.getAddress(),
    value: ethers.parseEther("10.0")
  });
  
  return { game: nerixGame, nft: nerixNFT };
}

// Helper to send a message with proper fee calculation
export async function sendGameMessage(
  game: NerixGame,
  sender: HardhatEthersSigner,
  messageContent: string,
  nftId: bigint = 0n // Default NFT ID is 0 (no NFT)
): Promise<any> {
  const senderAddress = await sender.getAddress();
  const messageFee = await game.calculateMessageFee(senderAddress, nftId);
  
  return game.connect(sender).sendMessage(messageContent, nftId, { value: messageFee });
}

// Helper to generate multiple messages from different users
export async function generateMultipleMessages(
  game: NerixGame,
  senders: HardhatEthersSigner[],
  count: number,
  messagePrefix: string = "Test message"
): Promise<void> {
  for (let i = 0; i < count; i++) {
    const sender = senders[i % senders.length];
    await sendGameMessage(game, sender, `${messagePrefix} ${i + 1}`);
    
    // Add a small delay to get past the message cooldown
    await advanceTime(31); // Just over the 30-second cooldown
  }
}

// Helper to get all participants from the game
export async function getParticipants(
  game: NerixGame,
  potentialParticipants: string[]
): Promise<string[]> {
  const participants: string[] = [];
  
  for (const address of potentialParticipants) {
    if (await game.isParticipant(address)) {
      participants.push(address);
    }
  }
  
  return participants;
}

// Helper to get top challengers by attempt count
export async function getTopChallengers(
  game: NerixGame,
  participants: string[]
): Promise<[string, string, string]> {
  // Create a list of participants and their attempt counts
  const challengersWithCounts: {address: string; attempts: bigint}[] = [];
  
  for (const participant of participants) {
    if (await game.isParticipant(participant)) {
      const attempts = await game.getAttemptCount(participant, await game.currentIteration());
      challengersWithCounts.push({address: participant, attempts});
    }
  }
  
  // Sort by attempt count (descending)
  challengersWithCounts.sort((a, b) => {
    if (b.attempts > a.attempts) return 1;
    if (b.attempts < a.attempts) return -1;
    return 0;
  });
  
  // Get top 3 (or fewer if there are not enough participants)
  const topChallengers: [string, string, string] = [
    ethers.ZeroAddress,
    ethers.ZeroAddress,
    ethers.ZeroAddress
  ];
  
  for (let i = 0; i < Math.min(3, challengersWithCounts.length); i++) {
    topChallengers[i] = challengersWithCounts[i].address;
  }
  
  return topChallengers;
}

// Helper to declare a winner with all required parameters
export async function declareWinner(
  game: NerixGame,
  owner: HardhatEthersSigner,
  winner: string,
  allAddresses: string[],
  nextPrompt: string = ""
): Promise<any> {
  // Get participants
  const participants = await getParticipants(game, allAddresses);
  
  // Get top challengers
  const topChallengers = await getTopChallengers(game, participants);
  
  // Call declareWinner with all required parameters including next prompt
  const nextPromptBytes = nextPrompt ? Buffer.from(nextPrompt) : Buffer.from("");
  return game.connect(owner).declareWinner(winner, topChallengers, participants, nextPromptBytes);
}

// Helper to debug NFT ownership
export async function debugNFTOwnership(
  nft: NerixNFT,
  user: string,
  tokenId: bigint
): Promise<void> {
  try {
    const owner = await nft.ownerOf(tokenId);
    console.log(`NFT ${tokenId} is owned by: ${owner}`);
    console.log(`Expected owner: ${user}`);
    console.log(`Match: ${owner.toLowerCase() === user.toLowerCase()}`);
    
    const [nftType, iteration, mintTime] = await nft.getNFTInfo(tokenId);
    console.log(`NFT Type: ${nftType}, Iteration: ${iteration}, Mint Time: ${mintTime}`);
  } catch (error) {
    console.error(`Error checking NFT ${tokenId}:`, error);
  }
}

// Helper to find NFTs owned by a user
export async function findUserNFTs(
  nft: NerixNFT,
  userAddress: string
): Promise<bigint[]> {
  const balance = await nft.balanceOf(userAddress);
  const nftIds: bigint[] = [];
  
  // This is a simplified approach - in a real scenario you might need 
  // to query events or iterate through all NFTs
  let nextTokenId = 1n;
  let found = 0n;
  
  // Search for NFTs (with a reasonable limit)
  while (found < balance && nextTokenId < 100n) {
    try {
      const owner = await nft.ownerOf(nextTokenId);
      if (owner.toLowerCase() === userAddress.toLowerCase()) {
        nftIds.push(nextTokenId);
        found++;
      }
    } catch (error) {
      // Skip non-existent tokens
    }
    nextTokenId++;
  }
  
  return nftIds;
}

// Helper to get NFT type and iteration for testing
export async function getNFTDetails(
  nft: NerixNFT,
  tokenId: bigint
): Promise<{type: number; iteration: bigint}> {
  const [nftType, iteration] = await nft.getNFTInfo(tokenId);
  return {
    type: Number(nftType),
    iteration
  };
}