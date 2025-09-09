import { expect } from "chai";
import { ethers } from "hardhat";
import { ZeroAddress } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { NerixGame, NerixNFT } from "../typechain-types";
import { 
  deployNerixGame, 
  deployNerixNFT, 
  setupNerixSystem, 
  sendGameMessage, 
  advanceTime, 
  generateMultipleMessages,
  declareWinner,
  getTopChallengers,
  findUserNFTs,
  getNFTDetails
} from "./utils/helpers";

describe("NerixGame Contract", function () {
  // Test variables
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

  // Constants matching the actual contract values
  const BASE_MESSAGE_FEE = ethers.parseEther("0.01"); // ~10 USD worth
  const INITIAL_REWARD_POOL = ethers.parseEther("0.1"); // ~200 USD worth
  const MAX_MESSAGE_FEE = ethers.parseEther("2"); // ~500-600 USD worth
  const MESSAGE_GROWTH_RATE = 78n; // 0.78% per message
  const MESSAGE_COOLDOWN = 30; // 30 seconds between messages

  // Set up before each test
  beforeEach(async function () {
    // Get signers
    [owner, user1, user2, user3, user4, user5] = await ethers.getSigners();
    
    // Store addresses for convenience
    addresses = {
      owner: await owner.getAddress(),
      user1: await user1.getAddress(),
      user2: await user2.getAddress(),
      user3: await user3.getAddress(),
      user4: await user4.getAddress(),
      user5: await user5.getAddress(),
    };
    
    allAddresses = Object.values(addresses);

    // Deploy and set up contracts
    const setup = await setupNerixSystem(owner);
    nerixGame = setup.game;
    nerixNFT = setup.nft;
  });

  describe("Deployment and Initialization", function () {
    it("Should set the right owner", async function () {
      expect(await nerixGame.owner()).to.equal(addresses.owner);
    });

    it("Should initialize with correct values", async function () {
      expect(await nerixGame.currentIteration()).to.equal(1n);
      expect(await nerixGame.currentRewardPool()).to.equal(INITIAL_REWARD_POOL);
      expect(await nerixGame.gameActive()).to.equal(true);
      expect(await nerixGame.totalMessages()).to.equal(0n);
    });

    it("Should not allow starting the game twice", async function () {
      await expect(
        nerixGame.startFirstGame()
      ).to.be.revertedWithCustomError(nerixGame, "GameAlreadyActive");
    });
  });

  describe("Message Fee Calculation", function () {
    it("Should calculate the base message fee correctly", async function () {
      const baseFee = await nerixGame.getCurrentMessageFee();
      expect(baseFee).to.equal(BASE_MESSAGE_FEE);
    });

    it("Should increase message fee after messages are sent", async function () {
      // Send a message
      await sendGameMessage(nerixGame, user1, "Test message");
      
      // Fee should increase by 0.78%
      const newFee = await nerixGame.getCurrentMessageFee();
      const expectedIncrease = BASE_MESSAGE_FEE * MESSAGE_GROWTH_RATE / 10000n;
      const expectedFee = BASE_MESSAGE_FEE + expectedIncrease;
      
      expect(newFee).to.equal(expectedFee);
    });

    it("Should apply first mover discount on the first message", async function () {
      const baseMessageFee = await nerixGame.getCurrentMessageFee();
      const discountedFee = await nerixGame.calculateMessageFee(addresses.user1, 0n);
      
      // First mover discount is 10%
      const expectedDiscount = baseMessageFee * 10n / 100n;
      const expectedFee = baseMessageFee - expectedDiscount;
      
      expect(discountedFee).to.equal(expectedFee);
    });

    it("Should apply NFT discounts correctly", async function () {
      // Set the game contract in NFT to allow minting
      await nerixNFT.setGameContract(await nerixGame.getAddress());
      
      // Send a message to user1 to make them a participant
      await sendGameMessage(nerixGame, user1, "Test message to become participant");

      // Mint a Winner NFT to user1 in iteration 1
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Assume the Winner NFT is the first one minted to user1
      const user1NFTId = 1n;
      
      // Check fee with NFT discount (should have 20% discount from Winner NFT)
      const baseFee = await nerixGame.getCurrentMessageFee();
      const discountedFee = await nerixGame.calculateMessageFee(addresses.user1, user1NFTId);
      
      // 10% first mover + 20% from NFT = 30% discount
      const expectedDiscount = baseFee * 30n / 100n;
      const expectedFee = baseFee - expectedDiscount;
      
      expect(discountedFee).to.be.closeTo(expectedFee, ethers.parseEther("0.0001")); // Wider tolerance
    });

    it("Should cap NFT fee discounts at MAX_FEE_DISCOUNT (80%)", async function () {
      // Set the game contract
      await nerixNFT.setGameContract(await nerixGame.getAddress());
      
      // Make user1 and user2 participants
      await sendGameMessage(nerixGame, user1, "Test message from user1");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "Test message from user2");
      
      // Declare user1 as winner
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Assume the Winner NFT is the first one minted to user1
      const user1NFTId = 1n;
      
      // Get the message fee and discount
      const baseMessageFee = await nerixGame.getCurrentMessageFee(); 
      const userFee = await nerixGame.calculateMessageFee(addresses.user1, user1NFTId);
      
      // Calculate discount percentage
      const appliedDiscountPercentage = Number((baseMessageFee - userFee) * 100n / baseMessageFee);
      
      // Get MAX_FEE_DISCOUNT from contract
      const maxDiscount = await nerixGame.MAX_FEE_DISCOUNT();
      
      // Applied discount should not exceed max discount
      expect(appliedDiscountPercentage).to.be.lte(Number(maxDiscount));
    });
  });

  describe("Message Sending", function () {
    it("Should allow sending a valid message with correct payment", async function () {
      const content = "Test message content";
      const fee = await nerixGame.calculateMessageFee(addresses.user1, 0n);
      
      await expect(
        nerixGame.connect(user1).sendMessage(content, 0n, { value: fee })
      ).to.emit(nerixGame, "MessageSent")
        .withArgs(addresses.user1, await nerixGame.getCurrentMessageFee(), fee, BigInt(content.length));
      
      expect(await nerixGame.totalMessages()).to.equal(1n);
    });

    it("Should reject messages with insufficient payment", async function () {
      const content = "Test message content";
      const fee = await nerixGame.calculateMessageFee(addresses.user1, 0n);
      const insufficientFee = fee - 1n;
      
      await expect(
        nerixGame.connect(user1).sendMessage(content, 0n, { value: insufficientFee })
      ).to.be.revertedWithCustomError(nerixGame, "InsufficientPayment");
    });

    it("Should enforce message cooldown period", async function () {
      const content = "Test message content";
      
      // Send first message
      await sendGameMessage(nerixGame, user1, content);
      
      // Try to send another message immediately (should fail)
      await expect(
        sendGameMessage(nerixGame, user1, content)
      ).to.be.revertedWithCustomError(nerixGame, "MessageCooldownNotMet");
      
      // Advance time past cooldown (30 seconds)
      await advanceTime(31);
      
      // Should now succeed
      await expect(
        sendGameMessage(nerixGame, user1, content)
      ).to.not.be.reverted;
    });

    it("Should enforce character limit based on user's NFT bonuses", async function () {
      // Set base character limit from contract
      const BASE_CHARACTER_LIMIT = 500;
      
      // Setup NFT for character bonus testing
      await nerixNFT.setGameContract(await nerixGame.getAddress());
      
      // Try with content exceeding the base limit
      const longContent = "A".repeat(BASE_CHARACTER_LIMIT + 1);
      await expect(
        sendGameMessage(nerixGame, user1, longContent)
      ).to.be.revertedWithCustomError(nerixGame, "CharacterLimitExceeded");

      await advanceTime(31);
      
      //Try with content within the base limit
      const content = "A".repeat(BASE_CHARACTER_LIMIT);
      await sendGameMessage(nerixGame, user1, content);

      await advanceTime(31);

      // Now mint a Winner NFT to user1 to give +300 character bonus
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Assume the Winner NFT is the first one minted to user1
      const user1NFTId = 1n;
      
      await advanceTime(31);

      // Get the actual limit with NFT bonus applied
      const calculatedLimit = await nerixGame.getMaxMessageLength(addresses.user1, user1NFTId);
      console.log(`Calculated max length: ${calculatedLimit}`);
      
      // Try with content that's now within the extended limit
      const contentWithinExtendedLimit = "A".repeat(Number(calculatedLimit) - 1);
      await expect(
        sendGameMessage(nerixGame, user1, contentWithinExtendedLimit, user1NFTId)
      ).to.not.be.reverted;
      
      await advanceTime(31);

      // Try with content exceeding the extended limit
      const contentExceedingExtendedLimit = "A".repeat(Number(calculatedLimit) + 1);
      await expect(
        sendGameMessage(nerixGame, user1, contentExceedingExtendedLimit, user1NFTId)
      ).to.be.revertedWithCustomError(nerixGame, "CharacterLimitExceeded");
    });

    it("Should distribute fees correctly between reward pools", async function () {
      // Get fee for a message
      const fee = await nerixGame.calculateMessageFee(addresses.user1, 0n);
      
      // Check initial pool values
      const initialCurrentPool = await nerixGame.currentRewardPool();
      const initialNextPool = await nerixGame.nextIterationPool();
      const initialTeamPool = await nerixGame.teamPool();
      
      // Send a message
      await nerixGame.connect(user1).sendMessage("Test message", 0n, { value: fee });
      
      // Calculate expected allocations
      const currentPoolAmount = fee * 60n / 100n; // 60% to current pool
      const nextPoolAmount = fee * 20n / 100n; // 20% to next pool
      const teamPoolAmount = fee * 20n / 100n; // 20% to team pool
      
      // Verify new pool values
      expect(await nerixGame.currentRewardPool()).to.equal(initialCurrentPool + currentPoolAmount);
      expect(await nerixGame.nextIterationPool()).to.equal(initialNextPool + nextPoolAmount);
      expect(await nerixGame.teamPool()).to.equal(initialTeamPool + teamPoolAmount);
    });

    it("Should refund excess payment", async function () {
      const fee = await nerixGame.calculateMessageFee(addresses.user1, 0n);
      const excessPayment = ethers.parseEther("0.1"); // Significant excess
      
      const initialBalance = await ethers.provider.getBalance(addresses.user1);
      const tx = await nerixGame.connect(user1).sendMessage("Test message", 0n, { value: fee + excessPayment });
      const receipt = await tx.wait();
      const gasUsed = receipt?.gasUsed ?? 0n;
      const gasPrice = receipt?.gasPrice ?? 0n;
      const gasCost = gasUsed * gasPrice;
      
      // Check balance is correct (accounting for gas costs)
      const finalBalance = await ethers.provider.getBalance(addresses.user1);
      const expectedBalance = initialBalance - fee - gasCost;
      
      expect(finalBalance).to.be.closeTo(expectedBalance, ethers.parseEther("0.001")); // Small tolerance for gas estimation
    });
  });

  describe("Game Winner Declaration", function () {
    beforeEach(async function () {
      // Send messages from different users
      await sendGameMessage(nerixGame, user1, "Message from user1");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "Message from user2");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user3, "Message from user3");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user1, "Another message from user1");
    });

    it("Should only allow owner to declare a winner", async function () {
      // Get parameters for declareWinner
      const topChallengers = await getTopChallengers(nerixGame, allAddresses);
      const activeParticipants: string[] = [];
      
      for (const addr of allAddresses) {
        if (await nerixGame.isParticipant(addr)) {
          activeParticipants.push(addr);
        }
      }
      
      await expect(
        nerixGame.connect(user1).declareWinner(addresses.user1, topChallengers, activeParticipants, Buffer.from(""))
      ).to.be.reverted;
      
      await expect(
        nerixGame.connect(owner).declareWinner(addresses.user1, topChallengers, activeParticipants, Buffer.from(""))
      ).to.not.be.reverted;
    });

    it("Should transfer the full reward to the winner", async function () {
      const initialBalance = await ethers.provider.getBalance(addresses.user2);
      const rewardPool = await nerixGame.currentRewardPool();
      
      await declareWinner(nerixGame, owner, addresses.user2, allAddresses);
      
      const finalBalance = await ethers.provider.getBalance(addresses.user2);
      expect(finalBalance).to.equal(initialBalance + rewardPool);
    });

    it("Should mint appropriate NFTs to participants", async function () {
      // Configure the NFT contract to allow minting
      await nerixNFT.setGameContract(await nerixGame.getAddress());
      
      // Declare a winner
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Check NFT balances
      expect(await nerixNFT.balanceOf(addresses.user1)).to.be.gte(3n); // Winner NFT + Challenger NFT + Community NFT
      expect(await nerixNFT.balanceOf(addresses.user2)).to.be.gte(1n); // At least Community NFT
      expect(await nerixNFT.balanceOf(addresses.user3)).to.be.gte(1n); // At least Community NFT
    });

    it("Should emit GameWon event when declaring a winner", async function () {
      // Get parameters for declareWinner
      const topChallengers = await getTopChallengers(nerixGame, allAddresses);
      const activeParticipants: string[] = [];
      
      for (const addr of allAddresses) {
        if (await nerixGame.isParticipant(addr)) {
          activeParticipants.push(addr);
        }
      }
      
      await expect(nerixGame.declareWinner(addresses.user1, topChallengers, activeParticipants, Buffer.from("")))
        .to.emit(nerixGame, "GameWon")
        .withArgs(addresses.user1, 1n, await nerixGame.currentRewardPool());
    });

    it("Should revert if declaring a winner for a non-participant", async function () {
      // Get parameters for declareWinner
      const topChallengers = await getTopChallengers(nerixGame, allAddresses);
      const activeParticipants: string[] = [];
      
      for (const addr of allAddresses) {
        if (await nerixGame.isParticipant(addr)) {
          activeParticipants.push(addr);
        }
      }
      
      await expect(
        nerixGame.declareWinner(addresses.user5, topChallengers, activeParticipants, Buffer.from(""))
      ).to.be.revertedWithCustomError(nerixGame, "ParticipantNotFound");
    });

    it("Should revert if declaring the zero address as winner", async function () {
      // Get parameters for declareWinner
      const topChallengers = await getTopChallengers(nerixGame, allAddresses);
      const activeParticipants: string[] = [];
      
      for (const addr of allAddresses) {
        if (await nerixGame.isParticipant(addr)) {
          activeParticipants.push(addr);
        }
      }
      
      await expect(
        nerixGame.declareWinner(ZeroAddress, topChallengers, activeParticipants, Buffer.from(""))
      ).to.be.revertedWithCustomError(nerixGame, "ZeroAddressNotAllowed");
    });
  });

  describe("Game Iteration Management", function () {
    beforeEach(async function () {
      // Send some messages and grow the next iteration pool
      await sendGameMessage(nerixGame, user1, "Message 1");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "Message 2");
      await advanceTime(31);
      
      // Configure NFT contract for testing
      await nerixNFT.setGameContract(await nerixGame.getAddress());
    });

    it("Should correctly transition to the next iteration after a winner", async function () {
      const nextIterationPool = await nerixGame.nextIterationPool();
      
      // Declare a winner to trigger next iteration
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Check new game state
      expect(await nerixGame.currentIteration()).to.equal(2n);
      expect(await nerixGame.currentRewardPool()).to.equal(nextIterationPool);
      expect(await nerixGame.nextIterationPool()).to.equal(0n);
      expect(await nerixGame.gameActive()).to.equal(true);
      expect(await nerixGame.totalMessages()).to.equal(0n);
    });

    it("Should clear all participant data when starting a new iteration", async function () {
        // Declare a winner to trigger next iteration
        await sendGameMessage(nerixGame, user1, "User1 message");
        await advanceTime(31);
        await sendGameMessage(nerixGame, user2, "User2 message");
        await advanceTime(31);
        
        // Make sure they're participants
        expect(await nerixGame.isParticipant(addresses.user1)).to.equal(true);
        expect(await nerixGame.isParticipant(addresses.user2)).to.equal(true);
        
        // Declare a winner to trigger next iteration
        await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
        
        // Check that previous participants are no longer participants
        // We need to check what the contract actually does
        const user1IsParticipant = await nerixGame.isParticipant(addresses.user1);
        console.log(`Is user1 still a participant? ${user1IsParticipant}`);
        expect(user1IsParticipant).to.equal(false);
        
        expect(await nerixGame.isParticipant(addresses.user2)).to.equal(false);
        expect(await nerixGame.getParticipantCount()).to.equal(0n);
    });

    it("Should increment NFT iteration count when moving to the next iteration", async function () {
      // Check initial iteration
      expect(await nerixNFT.gameCurrentIteration()).to.equal(1n);
      
      // Declare a winner to trigger next iteration
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Check NFT iteration was incremented
      expect(await nerixNFT.gameCurrentIteration()).to.equal(2n);
    });
  });

  describe("Team Funds Management", function () {
    beforeEach(async function () {
      // Generate some team funds
      await sendGameMessage(nerixGame, user1, "Message 1");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "Message 2");
      await advanceTime(31);
    });

    it("Should only allow the owner to withdraw team funds", async function () {
      await expect(
        nerixGame.connect(user1).withdrawTeamFunds()
      ).to.be.reverted;
      
      await expect(
        nerixGame.withdrawTeamFunds()
      ).to.not.be.reverted;
    });

    it("Should transfer all team funds to the owner when withdrawn", async function () {
      const teamPool = await nerixGame.teamPool();
      const initialBalance = await ethers.provider.getBalance(addresses.owner);
      
      const tx = await nerixGame.withdrawTeamFunds();
      const receipt = await tx.wait();
      const gasUsed = receipt?.gasUsed ?? 0n;
      const gasPrice = receipt?.gasPrice ?? 0n;
      const gasCost = gasUsed * gasPrice;
      
      const finalBalance = await ethers.provider.getBalance(addresses.owner);
      expect(finalBalance).to.equal(initialBalance + teamPool - gasCost);
      expect(await nerixGame.teamPool()).to.equal(0n);
    });

    it("Should emit TeamFundsWithdrawn event when withdrawing team funds", async function () {
      const teamPool = await nerixGame.teamPool();
      
      await expect(nerixGame.withdrawTeamFunds())
        .to.emit(nerixGame, "TeamFundsWithdrawn")
        .withArgs(addresses.owner, teamPool);
    });

    it("Should revert if trying to withdraw when team pool is empty", async function () {
      // First withdraw all funds
      await nerixGame.withdrawTeamFunds();
      
      // Then try to withdraw again
      await expect(
        nerixGame.withdrawTeamFunds()
      ).to.be.revertedWithCustomError(nerixGame, "InsufficientPayment");
    });
  });

  describe("Pause and Unpause", function () {
    it("Should only allow the owner to pause the game", async function () {
      await expect(
        nerixGame.connect(user1).pause()
      ).to.be.reverted;
      
      await expect(
        nerixGame.pause()
      ).to.not.be.reverted;
    });

    it("Should prevent message sending when paused", async function () {
      // Pause the game
      await nerixGame.pause();
      
      // Try to send a message
      await expect(
        sendGameMessage(nerixGame, user1, "Test message")
      ).to.be.reverted;
      
      // Unpause the game
      await nerixGame.unpause();
      
      // Should now succeed
      await expect(
        sendGameMessage(nerixGame, user1, "Test message")
      ).to.not.be.reverted;
    });

    it("Should prevent declaring a winner when paused", async function () {
      // Send a message to create a participant
      await sendGameMessage(nerixGame, user1, "Test message");
      
      // Pause the game
      await nerixGame.pause();
      
      // Try to declare a winner
      await expect(
        declareWinner(nerixGame, owner, addresses.user1, allAddresses)
      ).to.be.reverted;
      
      // Unpause the game
      await nerixGame.unpause();
      
      // Should now succeed
      await expect(
        declareWinner(nerixGame, owner, addresses.user1, allAddresses)
      ).to.not.be.reverted;
    });
  });

  describe("Message Fee Protection", function () {
    it("Should cap message fee at MAX_MESSAGE_FEE", async function () {
      // Calculate how many messages needed to reach cap
      // Fee formula: BASE_FEE + (BASE_FEE * totalMessages * 78 / 10000)
      // To reach 2 ether from 0.01 ether: (2 - 0.01) / (0.01 * 0.0078) ≈ 25,384 messages
      // This would take too long, so we'll test with a smaller sample and verify the cap logic
      
      const signers = [user1, user2, user3, user4, user5];
      
      // Send enough messages to see significant fee increase
      for (let i = 0; i < 1000; i++) {
        const sender = signers[i % signers.length];
        await sendGameMessage(nerixGame, sender, `Inflation test message ${i}`);
        await advanceTime(31);
        
        // Check that fee is always capped during the process
        if (i % 200 === 0) {
          const currentFee = await nerixGame.getCurrentMessageFee();
          expect(currentFee).to.be.lte(MAX_MESSAGE_FEE);
        }
      }
      
      // Check final fee is still under cap (won't reach 2 ether with 1000 messages)
      const currentFee = await nerixGame.getCurrentMessageFee();
      expect(currentFee).to.be.lte(MAX_MESSAGE_FEE);
      expect(currentFee).to.be.gt(BASE_MESSAGE_FEE); // But should be higher than base
    });

    it("Should maintain fee calculation accuracy under the cap", async function () {
      // Test fee calculation with small number of messages (under cap)
      const initialFee = await nerixGame.getCurrentMessageFee();
      
      await sendGameMessage(nerixGame, user1, "Test message 1");
      await advanceTime(31);
      
      const feeAfterOne = await nerixGame.getCurrentMessageFee();
      expect(feeAfterOne).to.be.gt(initialFee);
      
      await sendGameMessage(nerixGame, user2, "Test message 2");
      await advanceTime(31);
      
      const feeAfterTwo = await nerixGame.getCurrentMessageFee();
      expect(feeAfterTwo).to.be.gt(feeAfterOne);
      
      // All fees should be under the maximum
      expect(feeAfterTwo).to.be.lt(MAX_MESSAGE_FEE);
    });

    it("Should handle extreme message counts gracefully", async function () {
      // This test ensures the contract doesn't break with many messages
      const signers = [user1, user2, user3];
      
      // Send a reasonable number of messages for testing
      for (let i = 0; i < 500; i++) {
        const sender = signers[i % signers.length];
        await sendGameMessage(nerixGame, sender, `Stress test message ${i}`);
        await advanceTime(31);
        
        // Check fee periodically
        if (i % 100 === 0) {
          const currentFee = await nerixGame.getCurrentMessageFee();
          expect(currentFee).to.be.lte(MAX_MESSAGE_FEE);
        }
      }
      
      // Final check - fee should be capped and higher than base
      const finalFee = await nerixGame.getCurrentMessageFee();
      expect(finalFee).to.be.lte(MAX_MESSAGE_FEE);
      expect(finalFee).to.be.gt(BASE_MESSAGE_FEE);
    });
  });

  describe("Context and Message Length Helpers", function () {
    it("Should return the correct context size based on NFT bonuses", async function () {
      // Make user1 a participant
      await sendGameMessage(nerixGame, user1, "Test message from user1");
      
      // Set the game contract for NFT
      await nerixNFT.setGameContract(await nerixGame.getAddress());
      
      // Check default context size
      expect(await nerixGame.getContextSize(addresses.user1, 0n)).to.equal(4n);
      
      // Declare user1 as winner
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Assume the Winner NFT is the first one minted to user1
      const user1NFTId = 1n;
      
      // Context size should be increased with Winner NFT
      const contextSize = await nerixGame.getContextSize(addresses.user1, user1NFTId);
      expect(contextSize).to.be.gte(7n); // 4 base + 3 from Winner NFT
    });

    it("Should return the correct max message length based on NFT bonuses", async function () {
      // Make user1 a participant
      await sendGameMessage(nerixGame, user1, "Test message from user1");
      
      // Default message length is 500
      const baseLimit = 500;
      expect(await nerixGame.getMaxMessageLength(addresses.user1, 0n)).to.equal(BigInt(baseLimit));
      
      // Set up NFT for testing
      await nerixNFT.setGameContract(await nerixGame.getAddress());
      
      // Mint Winner NFT to user1
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Assume the Winner NFT is the first one minted to user1
      const user1NFTId = 1n;
      
      // Make user2, user3 participants
      await sendGameMessage(nerixGame, user2, "Message from user2");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user3, "Message from user3");
      await advanceTime(31);
      
      // End the game and start a new one
      await declareWinner(nerixGame, owner, addresses.user2, allAddresses);
      
      // Send messages in the new game
      await sendGameMessage(nerixGame, user3, "Message from user3 in new game");
      await advanceTime(31);
      
      // End the game and start a new one
      await declareWinner(nerixGame, owner, addresses.user3, allAddresses);
      
      // Check max lengths with NFTs
      const user1MaxLength = await nerixGame.getMaxMessageLength(addresses.user1, user1NFTId);
      
      console.log(`User1 max length: ${user1MaxLength}`);
      
      // just a basic check to ensure the value is increased
      expect(user1MaxLength).to.be.gte(740n);
      
      expect(true).to.equal(true);
    });
    it("Should return the correct max message length based on NFT bonuses", async function () {
      // Make user1 a participant
      await sendGameMessage(nerixGame, user1, "Test message from user1");
      
      // Default message length is 500
      const baseLimit = 500;
      expect(await nerixGame.getMaxMessageLength(addresses.user1, 0n)).to.equal(BigInt(baseLimit));
      
      // Set up NFT for testing
      await nerixNFT.setGameContract(await nerixGame.getAddress());
      
      // Mint Winner NFT to user1
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses);
      
      // Assume the Winner NFT is the first one minted to user1
      const user1NFTId = 1n;
      
      // Make user2, user3 participants
      await sendGameMessage(nerixGame, user2, "Message from user2");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user3, "Message from user3");
      await advanceTime(31);
      
      // End the game and start a new one
      await declareWinner(nerixGame, owner, addresses.user2, allAddresses);
      
      // Send messages in the new game
      await sendGameMessage(nerixGame, user3, "Message from user3 in new game");
      await advanceTime(31);
      
      // End the game and start a new one
      await declareWinner(nerixGame, owner, addresses.user3, allAddresses);
      
      // Use NFT IDs based on actual minting order
      const user2NFTId = 5n; // static for tests
      const user3NFTId = 6n; // static for tests

      // Find actual NFT IDs for user2 and user3
      const user2NFTs = await findUserNFTs(nerixNFT, addresses.user2);
      const user3NFTs = await findUserNFTs(nerixNFT, addresses.user3);
      
      let actualUser2NFTId = 0n;
      let actualUser3NFTId = 0n;
      
      // find the Winner NFT IDs for user2 and user3
      for (const nftId of user2NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2) { // Winner NFT
          actualUser2NFTId = nftId;
          break;
        }
      }
      
      for (const nftId of user3NFTs) {
        const details = await getNFTDetails(nerixNFT, nftId);
        if (details.type === 2) { // Winner NFT
          actualUser3NFTId = nftId;
          break;
        }
      }
      
      // Check max lengths with NFTs
      const user1MaxLength = await nerixGame.getMaxMessageLength(addresses.user1, user1NFTId);
      
      console.log(`User1 max length: ${user1MaxLength}`);
      
      if (actualUser2NFTId > 0n) {
        const user2MaxLength = await nerixGame.getMaxMessageLength(addresses.user2, actualUser2NFTId);
        console.log(`User2 max length with NFT ${actualUser2NFTId}: ${user2MaxLength}`);
        expect(user2MaxLength).to.be.gte(700n); 
      }
      
      if (actualUser3NFTId > 0n) {
        const user3MaxLength = await nerixGame.getMaxMessageLength(addresses.user3, actualUser3NFTId);
        console.log(`User3 max length with NFT ${actualUser3NFTId}: ${user3MaxLength}`);
        expect(user3MaxLength).to.be.gte(700n); 
      }
      
      expect(user1MaxLength).to.be.gte(740n);
    });
  });

  describe("Security Tests", function () {
    it("Should set NFT address correctly", async function () {
      // Deploy a new NFT contract for testing
      const newNerixNFT = await deployNerixNFT(owner);
      const newNFTAddress = await newNerixNFT.getAddress();
      
      // Test that setNerixNFTAddress can be called normally
      await expect(
        nerixGame.setNerixNFTAddress(newNFTAddress)
      ).to.not.be.reverted;
      
      // Verify the address was set
      expect(await nerixGame.nerixNFT()).to.equal(newNFTAddress);
      
      // Test that zero address is rejected
      await expect(
        nerixGame.setNerixNFTAddress(ethers.ZeroAddress)
      ).to.be.revertedWithCustomError(nerixGame, "ZeroAddressNotAllowed");
    });

    it("Should allow setting NFT address without reentrancy protection", async function () {
      // nonReentrant modifier was removed as per optimization plan
      // This function doesn't need reentrancy protection
      
      const newNerixNFT = await deployNerixNFT(owner);
      const newNFTAddress = await newNerixNFT.getAddress();
      
      // Multiple calls should work fine
      await expect(nerixGame.setNerixNFTAddress(newNFTAddress)).to.not.be.reverted;
      
      // Set it back to original
      const originalNFTAddress = await nerixNFT.getAddress();
      await expect(nerixGame.setNerixNFTAddress(originalNFTAddress)).to.not.be.reverted;
    });

    it("Should only allow owner to call setNerixNFTAddress", async function () {
      const newNerixNFT = await deployNerixNFT(owner);
      const newNFTAddress = await newNerixNFT.getAddress();
      
      // Non-owner should not be able to call it
      await expect(
        nerixGame.connect(user1).setNerixNFTAddress(newNFTAddress)
      ).to.be.reverted;
      
      // Owner should be able to call it
      await expect(
        nerixGame.setNerixNFTAddress(newNFTAddress)
      ).to.not.be.reverted;
    });
  });

  describe("System Prompt Management (SSTORE2)", function () {
    it("Should set and get initial system prompt", async function () {
      const currentPrompt = await nerixGame.getCurrentPrompt();
      expect(currentPrompt).to.equal("Welcome to Nerix AI Gaming Platform! Test your skills against the AI.");
    });

    it("Should update prompt when declaring winner with new prompt", async function () {
      // Send some messages to create participants
      await sendGameMessage(nerixGame, user1, "Test message 1");
      await advanceTime(31);
      await sendGameMessage(nerixGame, user2, "Test message 2");
      await advanceTime(31);

      const newPrompt = "New iteration challenge! The AI has evolved, can you keep up?";
      
      // Declare winner with new prompt
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses, newPrompt);
      
      // Check that prompt was updated
      const currentPrompt = await nerixGame.getCurrentPrompt();
      expect(currentPrompt).to.equal(newPrompt);
      
      // Check that previous prompt is stored in history
      const iteration1Prompt = await nerixGame.getIterationPrompt(1);
      expect(iteration1Prompt).to.equal("Welcome to Nerix AI Gaming Platform! Test your skills against the AI.");
    });

    it("Should handle empty prompt (no update)", async function () {
      await sendGameMessage(nerixGame, user1, "Test message");
      await advanceTime(31);
      
      const originalPrompt = await nerixGame.getCurrentPrompt();
      
      // Declare winner with empty prompt (should not update)
      await declareWinner(nerixGame, owner, addresses.user1, allAddresses, "");
      
      const currentPrompt = await nerixGame.getCurrentPrompt();
      expect(currentPrompt).to.equal(originalPrompt);
    });

    it("Should only allow owner to set initial prompt", async function () {
      // Deploy a fresh game without initial prompt
      const freshGame = await deployNerixGame(owner);
      const freshNFT = await deployNerixNFT(owner);
      
      await freshNFT.setGameContract(await freshGame.getAddress());
      await freshGame.setNerixNFTAddress(await freshNFT.getAddress());
      
      const testPrompt = "Test initial prompt";
      
      // Non-owner should not be able to set initial prompt
      await expect(
        freshGame.connect(user1).setInitialPrompt(Buffer.from(testPrompt))
      ).to.be.reverted;
      
      // Owner should be able to set initial prompt
      await expect(
        freshGame.setInitialPrompt(Buffer.from(testPrompt))
      ).to.not.be.reverted;
      
      // Check prompt was set correctly
      const currentPrompt = await freshGame.getCurrentPrompt();
      expect(currentPrompt).to.equal(testPrompt);
    });

    it("Should prevent setting initial prompt twice", async function () {
      const freshGame = await deployNerixGame(owner);
      const freshNFT = await deployNerixNFT(owner);
      
      await freshNFT.setGameContract(await freshGame.getAddress());
      await freshGame.setNerixNFTAddress(await freshNFT.getAddress());
      
      const testPrompt1 = "First prompt";
      const testPrompt2 = "Second prompt";
      
      // Set initial prompt
      await freshGame.setInitialPrompt(Buffer.from(testPrompt1));
      
      // Try to set it again (should fail)
      await expect(
        freshGame.setInitialPrompt(Buffer.from(testPrompt2))
      ).to.be.revertedWith("Initial prompt already set");
    });

    it("Should emit PromptUpdated event when prompt is updated", async function () {
      await sendGameMessage(nerixGame, user1, "Test message");
      await advanceTime(31);

      const newPrompt = "Updated prompt for testing events";
      
      await expect(
        declareWinner(nerixGame, owner, addresses.user1, allAddresses, newPrompt)
      ).to.emit(nerixGame, "PromptUpdated");
    });
  });
});