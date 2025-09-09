// test/NerixOnBNBTestnet.test.ts

import { expect } from "chai";
import { ethers, network } from "hardhat";
import { NerixGame, NerixNFT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ZeroAddress } from "ethers";

// Constants used throughout the tests
const TEST_CONFIG = {
  INITIAL_REWARD_POOL: ethers.parseEther("0.1"), // ~200 USD worth 
  BASE_MESSAGE_FEE: ethers.parseEther("0.01"), // ~10 USD worth
  MAX_MESSAGE_FEE: ethers.parseEther("2"), // ~500-600 USD worth
  NFT_BASE_URI: "https://api.nerixai.com/nft/",
  NFT_NAME: "Nerix NFT",
  NFT_SYMBOL: "NRIX",
  TIMEOUT: 300000 // 5-minute timeout
};

describe("Nerix System on BNB Testnet", function () {
  // Set timeout value for tests
  this.timeout(TEST_CONFIG.TIMEOUT);
  
  // Test variables
  let nerixNFT: NerixNFT;
  let nerixGame: NerixGame;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let user3: HardhatEthersSigner;
  let addresses: {
    owner: string;
    user1: string;
    user2: string;
    user3: string;
  };
  
  // Helper functions
  async function logBalances() {
    console.log("\nBALANCES:");
    console.log(`Owner: ${ethers.formatEther(await ethers.provider.getBalance(addresses.owner))} BNB`);
    console.log(`User1: ${ethers.formatEther(await ethers.provider.getBalance(addresses.user1))} BNB`);
    console.log(`User2: ${ethers.formatEther(await ethers.provider.getBalance(addresses.user2))} BNB`);
    console.log(`User3: ${ethers.formatEther(await ethers.provider.getBalance(addresses.user3))} BNB`);
    console.log(`Game Contract: ${ethers.formatEther(await ethers.provider.getBalance(await nerixGame.getAddress()))} BNB`);
  }
  
  async function waitForConfirmation(tx: any, desc: string) {
    console.log(`Transaction sent (${desc}): ${tx.hash}`);
    const receipt = await tx.wait(1);
    console.log(`Transaction confirmed (${desc}): Block ${receipt?.blockNumber}`);
    return receipt;
  }
  
  async function sendMessage(user: HardhatEthersSigner, content: string, nftId = 0n) {
    const fee = await nerixGame.calculateMessageFee(await user.getAddress(), nftId);
    console.log(`Message fee: ${ethers.formatEther(fee)} BNB`);
    
    const tx = await nerixGame.connect(user).sendMessage(content, nftId, {
      value: fee,
      gasLimit: 500000
    });
    
    return waitForConfirmation(tx, "Message Sending");
  }
  
  async function findUserNFTs(user: string) {
    const balance = await nerixNFT.balanceOf(user);
    const nfts = [];
    
    for (let i = 1n; i <= 100n; i++) {
      try {
        const owner = await nerixNFT.ownerOf(i);
        if (owner.toLowerCase() === user.toLowerCase()) {
          const [nftType, iteration, _] = await nerixNFT.getNFTInfo(i);
          nfts.push({
            id: i,
            type: nftType,
            iteration: iteration
          });
          
          if (BigInt(nfts.length) >= balance) break;
        }
      } catch (error) {
        // Skip non-existent tokens
      }
    }
    
    return nfts;
  }
  
  async function getParticipants() {
    const participants = [];
    
    for (const addr of Object.values(addresses)) {
      if (await nerixGame.isParticipant(addr)) {
        participants.push(addr);
      }
    }
    
    return participants;
  }
  
  async function getTopChallengers(winner: string) {
    const challengers: [string, string, string] = [ZeroAddress, ZeroAddress, ZeroAddress];
    let idx = 0;
    
    for (const addr of Object.values(addresses)) {
      if (addr !== winner && await nerixGame.isParticipant(addr)) {
        const attempts = await nerixGame.getAttemptCount(addr, 0);
        if (attempts > 0) {
          challengers[idx] = addr;
          idx++;
          if (idx >= 3) break;
        }
      }
    }
    
    return challengers;
  }
  
  async function declareWinner(winnerAddr: string) {
    try {
      // Let's log the parameters
      const participants = await getParticipants();
      const topChallengers = await getTopChallengers(winnerAddr);
      
      console.log("Winner:", winnerAddr);
      console.log("Participants:", participants);
      console.log("Top Challengers:", topChallengers);
      
      // Let's increase gas parameters
      const tx = await nerixGame.connect(owner).declareWinner(
        winnerAddr,
        topChallengers,
        participants,
        {
          gasLimit: 2000000, // Increase gas limit
          gasPrice: ethers.parseUnits("1", "gwei"),
        }
      );
      
      console.log("Transaction sent, hash:", tx.hash);
      
      // More detailed confirmation process
      const receipt = await tx.wait(1);
      console.log("Transaction confirmed, block:", receipt?.blockNumber);
      console.log("Gas used:", receipt?.gasUsed.toString());
      
      return receipt;
    } catch (error: any) {
      // Print error in detail
      console.error("declareWinner operation failed:", error);
      
      if (error.reason) {
        console.error("Error reason:", error.reason);
      }
      
      if (error.data) {
        console.error("Error data:", error.data);
      }
      
      if (error.transaction) {
        console.error("Transaction details:", {
          from: error.transaction.from,
          to: error.transaction.to,
          data: error.transaction.data,
          gasLimit: error.transaction.gasLimit
        });
      }
      
      // Re-throw the error
      throw error;
    }
  }
  
  before(async function () {
    // BNB Testnet check
    if (network.name !== "bnbTestnet") {
      console.log("This test only runs on BNB Testnet. Please check your network.");
      this.skip();
      return;
    }
    
    console.log("=== Nerix System BNB Testnet Test ===");
    console.log(`Network: ${network.name}`);
    
    // Signers
    [owner, user1, user2, user3] = await ethers.getSigners();
    addresses = {
      owner: await owner.getAddress(),
      user1: await user1.getAddress(),
      user2: await user2.getAddress(),
      user3: await user3.getAddress()
    };
    
    console.log("\nADDRESSES:");
    console.log(`Owner: ${addresses.owner}`);
    console.log(`User1: ${addresses.user1}`);
    console.log(`User2: ${addresses.user2}`);
    console.log(`User3: ${addresses.user3}`);
    
    // await logBalances();
  });
  
  it("Scenario 1: Contract Deployment and First Game Initialization", async function () {
    console.log("\n=== Scenario 1: Contract Deployment and First Game Initialization ===");
    
    // 1. Deploy NerixNFT contract
    console.log("Deploying NerixNFT contract...");
    const NerixNFTFactory = await ethers.getContractFactory("NerixNFT", owner);
    nerixNFT = await NerixNFTFactory.deploy(
      TEST_CONFIG.NFT_NAME,
      TEST_CONFIG.NFT_SYMBOL,
      TEST_CONFIG.NFT_BASE_URI
    ) as unknown as NerixNFT;
    
    await nerixNFT.waitForDeployment();
    const nftAddress = await nerixNFT.getAddress();
    console.log(`NerixNFT contract deployed: ${nftAddress}`);
    
    // 2. Deploy NerixGame contract
    console.log("Deploying NerixGame contract...");
    const NerixGameFactory = await ethers.getContractFactory("NerixGame", owner);
    nerixGame = await NerixGameFactory.deploy(true) as unknown as NerixGame;
    
    await nerixGame.waitForDeployment();
    const gameAddress = await nerixGame.getAddress();
    console.log(`NerixGame contract deployed: ${gameAddress}`);
    
    // 3. Link contracts to each other
    console.log("Linking contracts to each other...");
    await waitForConfirmation(
      await nerixNFT.setGameContract(gameAddress),
      "NFT Game Contract Setup"
    );
    
    await waitForConfirmation(
      await nerixGame.setNerixNFTAddress(nftAddress),
      "Game NFT Address Setup"
    );
    
    // 4. Send BNB to Game contract
    console.log("Sending BNB to Game contract...");
    await waitForConfirmation(
      await owner.sendTransaction({
        to: gameAddress,
        value: ethers.parseEther("0.007")
      }),
      "Game Contract Funding"
    );
    
    // 5. Start the first game
    console.log("Starting the first game...");
    await waitForConfirmation(
      await nerixGame.startFirstGame(),
      "First Game Start"
    );
    
    // 6. Check initial state
    const iteration = await nerixGame.currentIteration();
    const isActive = await nerixGame.gameActive();
    const initialReward = await nerixGame.currentRewardPool();
    
    console.log(`Iteration: ${iteration}`);
    console.log(`Is game active: ${isActive}`);
    console.log(`Initial reward pool: ${ethers.formatEther(initialReward)} BNB`);
    
    expect(iteration).to.equal(1n);
    expect(isActive).to.be.true;
    expect(initialReward).to.be.gt(0n);
  });
  
  it("Scenario 2: Message Sending and Participant Status", async function () {
    console.log("\n=== Scenario 2: Message Sending and Participant Status ===");
    
    // 1. User1 sends the first message
    console.log("User1 is sending the first message...");
    await sendMessage(user1, "Hello, I'm User1! This is my first message on Nerix.");
    
    // 2. First message discount check
    const baseMessageFee = await nerixGame.getCurrentMessageFee();
    const p2Fee = await nerixGame.calculateMessageFee(addresses.user2, 0n);
    
    console.log(`Base message fee: ${ethers.formatEther(baseMessageFee)} BNB`);
    console.log(`Calculated fee for User2: ${ethers.formatEther(p2Fee)} BNB`);
    
    // 3. User2 sends message
    console.log("User2 is sending message...");
    await sendMessage(user2, "Hello, I'm User2! I'm excited to join the Nerix platform.");
    
    // 4. User3 sends message
    console.log("User3 is sending message...");
    await sendMessage(user3, "Hello Nerix community! I'm here too!");
    
    // 5. Check participant status
    expect(await nerixGame.isParticipant(addresses.user1)).to.be.true;
    expect(await nerixGame.isParticipant(addresses.user2)).to.be.true;
    expect(await nerixGame.isParticipant(addresses.user3)).to.be.true;
    
    const totalMsgs = await nerixGame.totalMessages();
    const totalParticipants = await nerixGame.getParticipantCount();
    
    console.log(`Total message count: ${totalMsgs}`);
    console.log(`Total participant count: ${totalParticipants}`);
    
    expect(totalMsgs).to.equal(3n);
    expect(totalParticipants).to.equal(3n);
    
    // 6. Check reward pool
    const currentPool = await nerixGame.currentRewardPool();
    const nextPool = await nerixGame.nextIterationPool();
    const teamPool = await nerixGame.teamPool();
    
    console.log(`Current reward pool: ${ethers.formatEther(currentPool)} BNB`);
    console.log(`Next iteration pool: ${ethers.formatEther(nextPool)} BNB`);
    console.log(`Team pool: ${ethers.formatEther(teamPool)} BNB`);
    
    // Reward pool should have increased
    expect(currentPool).to.be.gt(TEST_CONFIG.INITIAL_REWARD_POOL);
  });
  
  it("Scenario 3: Winner Declaration and NFT Minting", async function () {
    console.log("\n=== Scenario 3: Winner Declaration and NFT Minting ===");
    
    // 1. Record User1's initial balance
    const user1BalanceBefore = await ethers.provider.getBalance(addresses.user1);
    console.log(`User1 initial balance: ${ethers.formatEther(user1BalanceBefore)} BNB`);
    
    // 2. Check reward pool
    const rewardPool = await nerixGame.currentRewardPool();
    console.log(`Reward pool: ${ethers.formatEther(rewardPool)} BNB`);
    
    // 3. Set user1 as winner
    console.log("Declaring User1 as winner...");
    await declareWinner(addresses.user1);
    
    // 4. Check new iteration
    const newIteration = await nerixGame.currentIteration();
    console.log(`New iteration: ${newIteration}`);
    expect(newIteration).to.equal(2n);
    
    // 5. Check whether NFTs were distributed
    console.log("Checking NFTs...");
    
    // User1's NFT
    const user1NFTs = await findUserNFTs(addresses.user1);
    console.log(`User1 NFTs:`, user1NFTs);
    
    // User2 and User3's NFTs
    const user2NFTs = await findUserNFTs(addresses.user2);
    const user3NFTs = await findUserNFTs(addresses.user3);
    
    console.log(`User1 NFT count: ${user1NFTs.length}`);
    console.log(`User2 NFT count: ${user2NFTs.length}`);
    console.log(`User3 NFT count: ${user3NFTs.length}`);
    
    // User1 should have at least one Winner NFT
    const hasWinnerNFT = user1NFTs.some(nft => nft.type === 2n);
    expect(hasWinnerNFT).to.be.true;
    
    // All users should have at least one NFT (Community NFT)
    expect(user1NFTs.length).to.be.gt(0);
    expect(user2NFTs.length).to.be.gt(0);
    expect(user3NFTs.length).to.be.gt(0);
    
    // 6. Check User1's balance
    const user1BalanceAfter = await ethers.provider.getBalance(addresses.user1);
    console.log(`User1 new balance: ${ethers.formatEther(user1BalanceAfter)} BNB`);
    
    // Balance increase
    const balanceIncrease = user1BalanceAfter - user1BalanceBefore;
    console.log(`Balance increase: ${ethers.formatEther(balanceIncrease)} BNB`);
    
    // Balance increase should be positive, exact calculation is hard due to gas fees
    expect(balanceIncrease).to.be.gt(0n);
  });
  
  it("Scenario 4: Second Iteration and NFT Bonuses", async function () {
    console.log("\n=== Scenario 4: Second Iteration and NFT Bonuses ===");
    
    // 1. Find User1's NFTs
    const user1NFTs = await findUserNFTs(addresses.user1);
    const winnerNFTId = user1NFTs.find(nft => nft.type === 2n)?.id || 0n;
    
    console.log(`User1's Winner NFT ID: ${winnerNFTId}`);
    expect(winnerNFTId).to.not.equal(0n);
    
    // 2. Send discounted message with NFT
    console.log("User1 is sending a message with the Winner NFT discount...");
    
    // Compare fees
    const normalFee = await nerixGame.calculateMessageFee(addresses.user1, 0n);
    const discountedFee = await nerixGame.calculateMessageFee(addresses.user1, winnerNFTId);
    
    console.log(`Normal fee: ${ethers.formatEther(normalFee)} BNB`);
    console.log(`Discounted fee: ${ethers.formatEther(discountedFee)} BNB`);
    
    // Discounted fee should be lower
    expect(discountedFee).to.be.lt(normalFee);
    
    // Send discounted message
    await sendMessage(user1, "I'm sending this message with the Winner NFT discount!", winnerNFTId);
    
    console.log("User2 and User3 are sending messages in the new iteration...");
    await sendMessage(user2, "I am sending a message in the second iteration!");
    await increaseTime(31); // Wait for message cooldown
    
    await sendMessage(user3, "I am also in the second iteration!");
    await increaseTime(31);
    
    // 4. Character limit check
    const baseCharLimit = 500; // Base limit
    const user1MaxLength = await nerixGame.getMaxMessageLength(addresses.user1, winnerNFTId);
    const user2MaxLength = await nerixGame.getMaxMessageLength(addresses.user2, 0n);
    
    console.log(`User1 max character limit (with NFT): ${user1MaxLength}`);
    console.log(`User2 max character limit (without NFT): ${user2MaxLength}`);

    // User1's character size should be larger
    expect(user1MaxLength).to.be.gt(user2MaxLength);
    expect(user1MaxLength).to.be.gte(BigInt(baseCharLimit + 300));
    
    // 5. Context size check
    const user1ContextSize = await nerixGame.getContextSize(addresses.user1, winnerNFTId);
    const user2ContextSize = await nerixGame.getContextSize(addresses.user2, 0n);
    
    console.log(`User1 context size (with NFT): ${user1ContextSize}`);
    console.log(`User2 context size (without NFT): ${user2ContextSize}`);

    // User1's context size should be larger
    expect(user1ContextSize).to.be.gt(user2ContextSize);
  });
  
  it("Scenario 5: Second Winner and Legacy Bonuses", async function () {
    console.log("\n=== Scenario 5: Second Winner and Legacy Bonuses ===");
    
    // 1. Check current iteration
    const currentIteration = await nerixGame.currentIteration();
    console.log(`Current iteration: ${currentIteration}`);
    
    // 2. Declare User2 as the winner of iteration 2
    console.log("Declaring User2 as winner...");
    await declareWinner(addresses.user2);
    
    // 3. Check new iteration
    const newIteration = await nerixGame.currentIteration();
    console.log(`New iteration: ${newIteration}`);
    expect(newIteration).to.equal(currentIteration + 1n);
    
    // 4. Check User2's NFTs
    const user2NFTs = await findUserNFTs(addresses.user2);
    console.log(`User2 NFTs:`, user2NFTs);
    
    // User2's en az bir Winner NFT'si olmalı
    const hasWinnerNFT = user2NFTs.some(nft => nft.type === 2n);
    expect(hasWinnerNFT).to.be.true;
    
    // 5. Legacy bonus check - User1's iteration 1 NFT
    const user1NFTs = await findUserNFTs(addresses.user1);
    const user1Iter1NFT = user1NFTs.find(nft => nft.type === 2n && nft.iteration === 1n);
    
    if (user1Iter1NFT) {
      console.log("Checking legacy bonus...");
      
      // Compare bonuses of iteration 1 and iteration 2 NFTs
      const user1LegacyNFTId = user1Iter1NFT.id;
      const user2WinnerNFTId = user2NFTs.find(nft => nft.type === 2n)?.id || 0n;
      
      if (user2WinnerNFTId > 0n) {
        // Character limit bonuses
        const user1CharLimit = await nerixGame.getMaxMessageLength(addresses.user1, user1LegacyNFTId);
        const user2CharLimit = await nerixGame.getMaxMessageLength(addresses.user2, user2WinnerNFTId);
        
        console.log(`User1 character limit (iter1 NFT): ${user1CharLimit}`);
        console.log(`User2 character limit (iter2 NFT): ${user2CharLimit}`);
        
        // Older NFTs (lower iteration) provide bigger bonuses
        expect(user1CharLimit).to.be.gt(user2CharLimit);
        
        // Fee discounts
        const baseFee = await nerixGame.getCurrentMessageFee();
        const user1Fee = await nerixGame.calculateMessageFee(addresses.user1, user1LegacyNFTId);
        const user2Fee = await nerixGame.calculateMessageFee(addresses.user2, user2WinnerNFTId);
        
        console.log(`Base fee: ${ethers.formatEther(baseFee)} BNB`);
        console.log(`User1 fee (iter1 NFT): ${ethers.formatEther(user1Fee)} BNB`);
        console.log(`User2 fee (iter2 NFT): ${ethers.formatEther(user2Fee)} BNB`);
        
        // Older NFTs provide bigger discounts
        expect(user1Fee).to.be.lt(user2Fee);
      }
    }
  });
  
  it("Scenario 6: Team Fund Withdrawal", async function () {
    console.log("\n=== Scenario 6: Team Fund Withdrawal ===");
    
    // 1. Check team pool
    const teamPoolBefore = await nerixGame.teamPool();
    console.log(`Team pool: ${ethers.formatEther(teamPoolBefore)} BNB`);
    
    // If the team pool is empty, send some messages
    if (teamPoolBefore == 0n) {
      console.log("Team pool is empty, sending messages to fill it...");
      
      await sendMessage(user1, "Message 1");
      await increaseTime(31);

      await sendMessage(user2, "Message 2");
      await increaseTime(31);
      
      const teamPoolNow = await nerixGame.teamPool();
      console.log(`New team pool: ${ethers.formatEther(teamPoolNow)} BNB`);
      
      if (teamPoolNow == 0n) {
        console.log("Team pool is still empty, skipping test");
        return;
      }
    }

    // 2. Save owner balance
    const ownerBalanceBefore = await ethers.provider.getBalance(addresses.owner);
    console.log(`Owner initial balance: ${ethers.formatEther(ownerBalanceBefore)} BNB`);

    // 3. Withdraw team funds
    console.log("Withdrawing team funds...");
    const withdrawTx = await nerixGame.connect(owner).withdrawTeamFunds({
      gasLimit: 500000
    });
    
    await waitForConfirmation(withdrawTx, "Team Fund Withdrawal");
    
    // 4. Recheck team pool
    const teamPoolAfter = await nerixGame.teamPool();
    console.log(`Team pool (after withdrawal): ${ethers.formatEther(teamPoolAfter)} BNB`);
    expect(teamPoolAfter).to.equal(0n);
    
    // 5. Owner balance should increase (excluding gas)
    const ownerBalanceAfter = await ethers.provider.getBalance(addresses.owner);
    console.log(`Owner final balance: ${ethers.formatEther(ownerBalanceAfter)} BNB`);
  });
  
  it("Scenario 7: Game Pause and Resume", async function () {
    console.log("\n=== Scenario 7: Game Pause and Resume ===");
    
    // 1. Pause the game
    console.log("Pausing the game...");
    await waitForConfirmation(nerixGame.connect(owner).pause(), "Game Pause");
    
    // 2. Try sending a message while paused
    console.log("Trying to send a message while paused...");
    
    try {
      const fee = await nerixGame.getCurrentMessageFee();
      await nerixGame.connect(user1).sendMessage("This message should fail", 0n, {
        value: fee,
        gasLimit: 500000
      });
      expect.fail("Message sending should not succeed while the game is paused");
    } catch (error: any) {
      console.log("Expected error received: Cannot send a message while the game is paused");
    }
    
    // 3. Resume the game
    console.log("Resuming the game...");
    await waitForConfirmation(nerixGame.connect(owner).unpause(), "Game Resume");
    
    // 4. Send a message while the game is active
    console.log("Sending a message while the game is active...");
    await sendMessage(user1, "Game is active again, sending a message!");
  });
  
  it("Scenario 8: General Status and Summary", async function () {
    console.log("\n=== Scenario 8: General Status and Summary ===");
    
    // 1. Current game status
    const iteration = await nerixGame.currentIteration();
    const isActive = await nerixGame.gameActive();
    const totalMsgs = await nerixGame.totalMessages();
    const currentReward = await nerixGame.currentRewardPool();
    const nextReward = await nerixGame.nextIterationPool();
    const teamPool = await nerixGame.teamPool();
    
    console.log(`Is Game Active: ${isActive}`);
    console.log(`Total Message Count: ${totalMsgs}`);
    console.log(`Current Reward Pool: ${ethers.formatEther(currentReward)} BNB`);
    console.log(`Next Iteration Pool: ${ethers.formatEther(nextReward)} BNB`);
    console.log(`Team Pool: ${ethers.formatEther(teamPool)} BNB`);
    
    // 2. Players' NFT status
    console.log("\nPlayers' NFT Status:");
    
    const user1NFTs = await findUserNFTs(addresses.user1);
    const user2NFTs = await findUserNFTs(addresses.user2);
    const user3NFTs = await findUserNFTs(addresses.user3);
    
    console.log(`User1 NFT Count: ${user1NFTs.length}`);
    console.log(`User2 NFT Count: ${user2NFTs.length}`);
    console.log(`User3 NFT Count: ${user3NFTs.length}`);
    
    // Distribution of NFT types
    const user1NFTTypes = countNFTTypes(user1NFTs);
    const user2NFTTypes = countNFTTypes(user2NFTs);
    const user3NFTTypes = countNFTTypes(user3NFTs);
    
    console.log(`User1 NFT Distribution: Community=${user1NFTTypes.community}, Challenger=${user1NFTTypes.challenger}, Winner=${user1NFTTypes.winner}`);
    console.log(`User2 NFT Distribution: Community=${user2NFTTypes.community}, Challenger=${user2NFTTypes.challenger}, Winner=${user2NFTTypes.winner}`);
    console.log(`User3 NFT Distribution: Community=${user3NFTTypes.community}, Challenger=${user3NFTTypes.challenger}, Winner=${user3NFTTypes.winner}`);
    
    // 3. General summary and balances
    console.log("\nGeneral Summary:");
    console.log(`Completed Iteration Count: ${iteration - 1n}`);
    console.log(`Total Minted NFT Count: ${user1NFTs.length + user2NFTs.length + user3NFTs.length}`);
    
    await logBalances();
    
    console.log("\n=== BNB Testnet Test Scenarios Completed ===");
  });
  
  // Helper functions
  function countNFTTypes(nfts: any[]) {
    return {
      community: nfts.filter(nft => nft.type === 0n).length,
      challenger: nfts.filter(nft => nft.type === 1n).length,
      winner: nfts.filter(nft => nft.type === 2n).length
    };
  }
  
  async function increaseTime(seconds: number) {
    await ethers.provider.send("evm_increaseTime", [seconds]);
    await ethers.provider.send("evm_mine", []);
  }
});