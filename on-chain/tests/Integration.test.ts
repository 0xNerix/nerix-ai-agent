import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { NerixGame, NerixNFT } from "../typechain-types";
import { 
  setupNerixSystem, 
  sendGameMessage, 
  advanceTime, 
  generateMultipleMessages,
  declareWinner,
  findUserNFTs,
  getNFTDetails
} from "./utils/helpers";

describe("Nerix System Integration Tests", function () {
  // Constants matching the actual contract values for realistic testing
  const BASE_MESSAGE_FEE = ethers.parseEther("0.01"); // ~10 USD worth
  const INITIAL_REWARD_POOL = ethers.parseEther("0.1"); // ~200 USD worth
  const MAX_MESSAGE_FEE = ethers.parseEther("2"); // ~500-600 USD worth
  const MESSAGE_COOLDOWN = 30; // 30 seconds between messages
  
  let nerixNFT: NerixNFT;
  let nerixGame: NerixGame;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let user3: HardhatEthersSigner;
  let user4: HardhatEthersSigner;
  let user5: HardhatEthersSigner;
  let addresses: {
    owner: string;
    user1: string;
    user2: string;
    user3: string;
    user4: string;
    user5: string;
  };
  let allAddresses: string[];

  before(async function () {
    [owner, user1, user2, user3, user4, user5] = await ethers.getSigners();
    
    addresses = {
      owner: await owner.getAddress(),
      user1: await user1.getAddress(),
      user2: await user2.getAddress(),
      user3: await user3.getAddress(),
      user4: await user4.getAddress(),
      user5: await user5.getAddress(),
    };
    
    allAddresses = Object.values(addresses);
  });

  beforeEach(async function() {
    // Fresh setup for each test to avoid interference
    const setup = await setupNerixSystem(owner);
    nerixGame = setup.game;
    nerixNFT = setup.nft;
  });

  describe("Complete Game Lifecycle", function () {
    it("Should handle a full game cycle with multiple users and iterations", async function () {
      expect(await nerixGame.currentIteration()).to.equal(1n);
      expect(await nerixGame.gameActive()).to.equal(true);
      
      // First iteration - send messages
      await sendGameMessage(nerixGame, user1, "User1 first message");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "User2 first message");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user3, "User3 first message");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user1, "User1 second message");
      await advanceTime(31);
      
      expect(await nerixGame.totalMessages()).to.equal(4n);
      
      // Declare winner for first iteration
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Verify transition to second iteration
      expect(await nerixGame.currentIteration()).to.equal(2n);
      expect(await nerixGame.gameActive()).to.equal(true);
      expect(await nerixGame.totalMessages()).to.equal(0n);
      
      // Check NFT minting
      const user1NFTCount = await nerixNFT.balanceOf(addresses.user1);
      expect(user1NFTCount).to.be.at.least(1n);
      
      const user2NFTCount = await nerixNFT.balanceOf(addresses.user2);
      expect(user2NFTCount).to.be.at.least(1n);
      
      const user3NFTCount = await nerixNFT.balanceOf(addresses.user3);
      expect(user3NFTCount).to.be.at.least(1n);
      
      // Find user1's NFTs from iteration 1
      const user1NFTs = await findUserNFTs(nerixNFT, addresses.user1);
      
      // Find the Winner NFT for user1
      let user1WinnerNFTId = 0n;
      for (const nftId of user1NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2 && details.iteration === 1n) { // 2 = WINNER type
          user1WinnerNFTId = nftId;
          break;
        }
      }
      
      expect(user1WinnerNFTId).to.not.equal(0n, "Failed to find User1's Winner NFT");
      
      // Second iteration - send messages
      await sendGameMessage(nerixGame, user1, "User1 message in Iteration 2", user1WinnerNFTId);
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "User2 message in Iteration 2");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "User2 second message in Iteration 2");
      await advanceTime(31);
      
      // Declare winner for second iteration
      await declareWinner(nerixGame, owner, addresses.user2, allAddresses);
      
      // Verify transition to third iteration
      expect(await nerixGame.currentIteration()).to.equal(3n);
      expect(await nerixGame.gameActive()).to.equal(true);
      
      // Verify NFT balance increases
      const user1NFTCount2 = await nerixNFT.balanceOf(addresses.user1);
      expect(user1NFTCount2).to.be.gt(user1NFTCount);
      
      const user2NFTCount2 = await nerixNFT.balanceOf(addresses.user2);
      expect(user2NFTCount2).to.be.gt(user2NFTCount);
      
      // user3 didn't participate in iteration 2, should have same NFT count
      const user3NFTCount2 = await nerixNFT.balanceOf(addresses.user3);
      expect(user3NFTCount2).to.equal(user3NFTCount);
      
      // Find user2's Winner NFT from iteration 2
      const user2NFTs = await findUserNFTs(nerixNFT, addresses.user2);
      let user2WinnerNFTId = 0n;
      for (const nftId of user2NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2 && details.iteration === 2n) { // 2 = WINNER type
          user2WinnerNFTId = nftId;
          break;
        }
      }
      
      expect(user2WinnerNFTId).to.not.equal(0n, "Failed to find User2's Winner NFT");
      
      // Verify fee discounts with NFTs
      const baseFee = await nerixGame.getCurrentMessageFee();
      const user1Fee = await nerixGame.calculateMessageFee(addresses.user1, user1WinnerNFTId);
      const user2Fee = await nerixGame.calculateMessageFee(addresses.user2, user2WinnerNFTId);
      
      expect(user1Fee).to.be.lt(baseFee);
      expect(user2Fee).to.be.lt(baseFee);
      
      // Verify message length bonuses
      const baseLimit = 500;
      const user1MaxLength = await nerixGame.getMaxMessageLength(addresses.user1, user1WinnerNFTId);
      expect(user1MaxLength).to.be.gte(BigInt(baseLimit + 300)); 
      
      const user2MaxLength = await nerixGame.getMaxMessageLength(addresses.user2, user2WinnerNFTId);
      expect(user2MaxLength).to.be.gte(BigInt(baseLimit + 300));
      
      // Test sending a long message with NFT bonus
      const longMessage = "A".repeat(Number(user1MaxLength) - 1);
      await expect(
        sendGameMessage(nerixGame, user1, longMessage, user1WinnerNFTId)
      ).to.not.be.reverted;
      
      // Verify context size bonuses
      const baseContext = 4;
      const user1ContextSize = await nerixGame.getContextSize(addresses.user1, user1WinnerNFTId);
      expect(user1ContextSize).to.be.gte(BigInt(baseContext + 3));
      
      const user2ContextSize = await nerixGame.getContextSize(addresses.user2, user2WinnerNFTId);
      expect(user2ContextSize).to.be.gte(BigInt(baseContext + 3));
      
      // Verify team funds withdrawal
      const teamPoolBefore = await nerixGame.teamPool();
      expect(teamPoolBefore).to.be.gt(0n);
      
      await nerixGame.withdrawTeamFunds();
      
      const teamPoolAfter = await nerixGame.teamPool();
      expect(teamPoolAfter).to.equal(0n);
    });
  });

  describe("Edge Case: Fee Inflation and Discount Interaction", function () {
    it("Should correctly handle high message fees with NFT discounts", async function () {
      // First iteration - create a winner
      await sendGameMessage(nerixGame, user1, "Initial message");
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Find user1's Winner NFT
      const user1NFTs = await findUserNFTs(nerixNFT, addresses.user1);
      let user1WinnerNFTId = 0n;
      for (const nftId of user1NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2) { // 2 = WINNER type
          user1WinnerNFTId = nftId;
          break;
        }
      }
      
      expect(user1WinnerNFTId).to.not.equal(0n, "Failed to find User1's Winner NFT");
      
      // Generate many messages to inflate fee
      const signers = [user2, user3, user4];
      await generateMultipleMessages(nerixGame, signers, 50, "Inflation message");
      
      // Verify fee inflation
      const inflatedFee = await nerixGame.getCurrentMessageFee();
      expect(inflatedFee).to.be.gt(BASE_MESSAGE_FEE);
      
      // Calculate fee with NFT discount
      const user1Fee = await nerixGame.calculateMessageFee(addresses.user1, user1WinnerNFTId);
      
      // Verify discount is applied
      expect(user1Fee).to.be.lt(inflatedFee);
      
      // Test message with discount
      await expect(
        nerixGame.connect(user1).sendMessage("Message with discount", user1WinnerNFTId, { value: user1Fee })
      ).to.not.be.reverted;
    });
  });


  describe("NFT Legacy Bonus Verification", function () {
    it("Should correctly apply legacy bonuses for NFTs from earlier iterations", async function () {
      // Play through multiple iterations to create NFTs from different periods
      // Iteration 1
      await sendGameMessage(nerixGame, user1, "User1 message in iteration 1");
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      await advanceTime(31);
      
      // Iteration 2
      await sendGameMessage(nerixGame, user2, "User2 message in iteration 2");
      await declareWinner(nerixGame, owner, addresses.user2, allAddresses);
      await advanceTime(31);
      
      // Iteration 3
      await sendGameMessage(nerixGame, user3, "User3 message in iteration 3");
      await declareWinner(nerixGame, owner, addresses.user3, allAddresses);
      await advanceTime(31);
      
      // Find Winner NFTs for each user
      // User1's Winner NFT from iteration 1
      const user1NFTs = await findUserNFTs(nerixNFT, addresses.user1);
      let user1NFTId = 0n;
      for (const nftId of user1NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2 && details.iteration === 1n) {
          user1NFTId = nftId;
          break;
        }
      }
      
      // User2's Winner NFT from iteration 2
      const user2NFTs = await findUserNFTs(nerixNFT, addresses.user2);
      let user2NFTId = 0n;
      for (const nftId of user2NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2 && details.iteration === 2n) {
          user2NFTId = nftId;
          break;
        }
      }
      
      // User3's Winner NFT from iteration 3
      const user3NFTs = await findUserNFTs(nerixNFT, addresses.user3);
      let user3NFTId = 0n;
      for (const nftId of user3NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2 && details.iteration === 3n) {
          user3NFTId = nftId;
          break;
        }
      }
      
      expect(user1NFTId).to.not.equal(0n, "Failed to find User1's Winner NFT");
      expect(user2NFTId).to.not.equal(0n, "Failed to find User2's Winner NFT");
      expect(user3NFTId).to.not.equal(0n, "Failed to find User3's Winner NFT");
      
      // Now we're in iteration 4, check fee discounts
      const baseFee = await nerixGame.getCurrentMessageFee();
      const user1Fee = await nerixGame.calculateMessageFee(addresses.user1, user1NFTId);
      const user2Fee = await nerixGame.calculateMessageFee(addresses.user2, user2NFTId);
      const user3Fee = await nerixGame.calculateMessageFee(addresses.user3, user3NFTId);
      
      // Verify that older NFTs get higher discounts (larger discount = lower fee)
      // The logic is that (baseFee - fee) measures the discount amount
      const user1Discount = baseFee - user1Fee;
      const user2Discount = baseFee - user2Fee;
      const user3Discount = baseFee - user3Fee;
      
      // Older NFTs should provide higher discounts
      expect(user1Discount).to.be.gt(user2Discount, "Iteration 1 NFT should give higher discount than Iteration 2");
      expect(user2Discount).to.be.gt(user3Discount, "Iteration 2 NFT should give higher discount than Iteration 3");
      
      // Check message length bonuses
      const user1MaxLength = await nerixGame.getMaxMessageLength(addresses.user1, user1NFTId);
      const user2MaxLength = await nerixGame.getMaxMessageLength(addresses.user2, user2NFTId);
      const user3MaxLength = await nerixGame.getMaxMessageLength(addresses.user3, user3NFTId);
      
      // Older NFTs should provide larger message length bonuses
      expect(user1MaxLength).to.be.gt(user2MaxLength, "Iteration 1 NFT should give larger message length than Iteration 2");
      expect(user2MaxLength).to.be.gt(user3MaxLength, "Iteration 2 NFT should give larger message length than Iteration 3");
      
      // Send a message with the legacy NFT
      await sendGameMessage(nerixGame, user1, "User1 message with legacy NFT", user1NFTId);
    });
  });

  describe("Multi-NFT Strategy", function () {
    it("Should allow users to selectively use different NFTs for different benefits", async function () {
      // Iteration 1 - make user1 the winner to get a Winner NFT
      await sendGameMessage(nerixGame, user1, "User1 message in iteration 1");
      await advanceTime(31);
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Iteration 2 - make user1 a participant to get a Community NFT, then another user the winner
      await sendGameMessage(nerixGame, user1, "User1 message in iteration 2");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "User2 message in iteration 2");
      await declareWinner(nerixGame, owner, addresses.user2, allAddresses);
      await advanceTime(31);
      
      // Find user1's NFTs
      const user1NFTs = await findUserNFTs(nerixNFT, addresses.user1);
      
      // Find the Winner NFT and Community NFT
      let user1WinnerNFTId = 0n;
      let user1CommunityNFTId = 0n;
      
      for (const nftId of user1NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        
        if (details.type === 2 && details.iteration === 1n) { // Winner from iteration 1
          user1WinnerNFTId = nftId;
        } else if (details.type === 0 && details.iteration === 2n) { // Community from iteration 2
          user1CommunityNFTId = nftId;
        }
      }
      
      expect(user1WinnerNFTId).to.not.equal(0n, "Failed to find User1's Winner NFT");
      expect(user1CommunityNFTId).to.not.equal(0n, "Failed to find User1's Community NFT");
      
      // Verify NFT types and iterations
      const winnerDetails = await getNFTDetails(nerixNFT, user1WinnerNFTId);
      expect(winnerDetails.type).to.equal(2); // WINNER type is 2
      expect(winnerDetails.iteration).to.equal(1n); // From iteration 1
      
      const communityDetails = await getNFTDetails(nerixNFT, user1CommunityNFTId);
      expect(communityDetails.type).to.equal(0); // COMMUNITY type is 0 
      expect(communityDetails.iteration).to.equal(2n); // From iteration 2
      
      // Compare fees with different NFTs
      const feeWithWinnerNFT = await nerixGame.calculateMessageFee(addresses.user1, user1WinnerNFTId);
      const feeWithCommunityNFT = await nerixGame.calculateMessageFee(addresses.user1, user1CommunityNFTId);
      
      // Winner NFT should give better discount
      expect(feeWithWinnerNFT).to.be.lt(feeWithCommunityNFT, "Winner NFT should provide better fee discount");
      
      // Compare message lengths with different NFTs
      const lengthWithWinnerNFT = await nerixGame.getMaxMessageLength(addresses.user1, user1WinnerNFTId);
      const lengthWithCommunityNFT = await nerixGame.getMaxMessageLength(addresses.user1, user1CommunityNFTId);
      
      // Winner NFT should give longer message length
      expect(lengthWithWinnerNFT).to.be.gt(lengthWithCommunityNFT, "Winner NFT should provide longer message length");
      
      // Try sending messages with both NFTs
      await sendGameMessage(nerixGame, user1, "Using Winner NFT for better discount", user1WinnerNFTId);
      await advanceTime(31);
      await sendGameMessage(nerixGame, user1, "Using Community NFT", user1CommunityNFTId);
    });
  });
});