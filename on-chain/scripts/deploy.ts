import { ethers, network, run } from "hardhat";
import { NerixGame, NerixNFT } from "../typechain-types";
import * as fs from "fs";
import * as path from "path";

// Load deployment configuration
function loadConfig() {
  const configPath = path.join(__dirname, "..", "deploy-config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  
  // Merge network-specific config with default config
  const networkConfig = config.networks?.[network.name] || {};
  const gameConfig = { ...config.gameConfig, ...networkConfig.gameConfig };
  const nftConfig = { ...config.nftConfig, ...networkConfig.nftConfig };
  
  return { gameConfig, nftConfig };
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${await deployer.getAddress()}`);
  console.log(`Account balance: ${await ethers.provider.getBalance(deployer)}`);
  console.log(`Network: ${network.name}`);

  // Load configuration
  const { gameConfig, nftConfig } = loadConfig();
  console.log(`\nUsing configuration:`);
  console.log(`Game Config:`, gameConfig);
  console.log(`NFT Config:`, nftConfig);

  // Deploy NerixNFT contract
  console.log("\nDeploying NerixNFT...");
  const NerixNFTFactory = await ethers.getContractFactory("NerixNFT");
  const nerixNFT = await NerixNFTFactory.deploy(
    nftConfig.name,
    nftConfig.symbol,
    nftConfig.baseURI,
    nftConfig.transferLockIterations
  ) as NerixNFT;
  await nerixNFT.waitForDeployment();
  
  const nftAddress = await nerixNFT.getAddress();
  console.log(`NerixNFT deployed to: ${nftAddress}`);

  // Deploy NerixGame contract
  console.log("\nDeploying NerixGame...");
  const NerixGameFactory = await ethers.getContractFactory("NerixGame");
  const nerixGame = await NerixGameFactory.deploy(
    gameConfig.isIterative,
    ethers.parseEther(gameConfig.baseMessageFee.toString()),
    gameConfig.messageGrowthRate,
    gameConfig.messageCooldown,
    ethers.parseEther(gameConfig.initialRewardPool.toString()),
    gameConfig.currentPoolShare,
    gameConfig.nextPoolShare,
    gameConfig.teamPoolShare,
    gameConfig.maxFeeDiscount,
    gameConfig.baseCharacterLimit,
    gameConfig.firstMoverDiscount,
    ethers.parseEther(gameConfig.maxMessageFee.toString())
  ) as NerixGame;
  await nerixGame.waitForDeployment();
  
  const gameAddress = await nerixGame.getAddress();
  console.log(`NerixGame deployed to: ${gameAddress}`);

  // Connect the contracts to each other
  console.log("\nConnecting contracts...");
  await nerixNFT.setGameContract(gameAddress);
  console.log("Set game contract in NFT contract");
  
  await nerixGame.setNerixNFTAddress(nftAddress);
  console.log("Set NFT contract in game contract");

  // Set initial system prompt
  console.log("\nSetting initial system prompt...");
  const initialPrompt = "Welcome to Nerix AI Gaming Platform! Your challenge is to outsmart the AI using creative natural language.";
  await nerixGame.setInitialPrompt(Buffer.from(initialPrompt));
  console.log("Initial system prompt set");

  // Start the first game
  console.log("\nStarting the first game...");
  await nerixGame.startFirstGame();
  console.log("First game started");

  // Verify contracts if not on localhost
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("\nWaiting for 5 block confirmations before verification...");
    // Wait for 5 blocks for better chances of successful verification
    await nerixNFT.deploymentTransaction()?.wait(5);
    await nerixGame.deploymentTransaction()?.wait(5);
    
    console.log("\nVerifying contracts on etherscan...");
    try {
      console.log("Verifying NerixNFT...");
      await run("verify:verify", {
        address: nftAddress,
        constructorArguments: [
          nftConfig.name,
          nftConfig.symbol,
          nftConfig.baseURI,
          nftConfig.transferLockIterations
        ],
      });
      console.log("NerixNFT verified");
      
      console.log("Verifying NerixGame...");
      await run("verify:verify", {
        address: gameAddress,
        constructorArguments: [
          gameConfig.isIterative,
          ethers.parseEther(gameConfig.baseMessageFee.toString()),
          gameConfig.messageGrowthRate,
          gameConfig.messageCooldown,
          ethers.parseEther(gameConfig.initialRewardPool.toString()),
          gameConfig.currentPoolShare,
          gameConfig.nextPoolShare,
          gameConfig.teamPoolShare,
          gameConfig.maxFeeDiscount,
          gameConfig.baseCharacterLimit,
          gameConfig.firstMoverDiscount,
          ethers.parseEther(gameConfig.maxMessageFee.toString())
        ],
      });
      console.log("NerixGame verified");
    } catch (err) {
      console.error("Error during verification:", err);
    }
  }

  // Print summary
  console.log("\n=== Deployment Summary ===");
  console.log(`Network: ${network.name}`);
  console.log(`NerixNFT: ${nftAddress}`);
  console.log(`NerixGame: ${gameAddress}`);
  console.log(`Base Message Fee: ${ethers.formatEther(await nerixGame.BASE_MESSAGE_FEE())} BNB`);
  console.log(`Initial Reward Pool: ${ethers.formatEther(await nerixGame.INITIAL_REWARD_POOL())} BNB`);
  console.log(`Max Message Fee: ${ethers.formatEther(await nerixGame.MAX_MESSAGE_FEE())} BNB`);
  console.log(`Current Iteration: ${await nerixGame.currentIteration()}`);
  console.log(`Game Active: ${await nerixGame.gameActive()}`);
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });