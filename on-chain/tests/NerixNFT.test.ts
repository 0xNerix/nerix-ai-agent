import { expect } from "chai";
import { ethers } from "hardhat";
import { ZeroAddress } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { NerixGame, NerixNFT } from "../typechain-types";
import { deployNerixGame, deployNerixNFT } from "./utils/helpers";

describe("NerixNFT Contract", function () {
  // Constants matching the contract
  const TRANSFER_LOCK_ITERATIONS = 1n;
  const NFT_BASE_URI = "https://nerixai.com/api/nft/";
  
  // Test variables
  let nerixNFT: NerixNFT;
  let nerixGame: NerixGame;
  let owner: HardhatEthersSigner;
  let gameContract: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let user3: HardhatEthersSigner;
  let addresses: {
    owner: string;
    gameContract: string;
    user1: string;
    user2: string;
    user3: string;
  };

  // Set up before each test
  beforeEach(async function () {
    // Get signers
    [owner, gameContract, user1, user2, user3] = await ethers.getSigners();
    
    // Store addresses for convenience
    addresses = {
      owner: await owner.getAddress(),
      gameContract: await gameContract.getAddress(),
      user1: await user1.getAddress(),
      user2: await user2.getAddress(),
      user3: await user3.getAddress(),
    };

    // Deploy contracts
    nerixNFT = await deployNerixNFT(owner);
    nerixGame = await deployNerixGame(owner);
    
    // Set game contract in NFT contract (for testing, we'll use both the actual game contract and a signer as mock game)
    await nerixNFT.setGameContract(addresses.gameContract);
  });


  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await nerixNFT.owner()).to.equal(addresses.owner);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await nerixNFT.name()).to.equal("Nerix NFT");
      expect(await nerixNFT.symbol()).to.equal("NRIX");
    });

    it("Should start at iteration 1", async function () {
      expect(await nerixNFT.gameCurrentIteration()).to.equal(1n);
    });
  });

  describe("Game Contract Management", function () {
    it("Should set and get the game contract correctly", async function () {
      expect(await nerixNFT.gameContract()).to.equal(addresses.gameContract);
      
      // Change to the actual game contract
      const gameContractAddress = await nerixGame.getAddress();
      await nerixNFT.setGameContract(gameContractAddress);
      
      expect(await nerixNFT.gameContract()).to.equal(gameContractAddress);
    });

    it("Should only allow the owner to set the game contract", async function () {
      await expect(
        nerixNFT.connect(user1).setGameContract(addresses.user1)
      ).to.be.reverted;
    });

    it("Should revert when setting the zero address as game contract", async function () {
      await expect(
        nerixNFT.setGameContract(ZeroAddress)
      ).to.be.revertedWithCustomError(nerixNFT, "ZeroAddressNotAllowed");
    });

    it("Should emit GameContractSet event when setting game contract", async function () {
      const newGameAddress = await nerixGame.getAddress();
      
      await expect(nerixNFT.setGameContract(newGameAddress))
        .to.emit(nerixNFT, "GameContractSet")
        .withArgs(addresses.gameContract, newGameAddress);
    });
  });

  describe("Iteration Management", function () {
    it("Should only allow the game contract to increment iteration", async function () {
      // Try to increment from a non-game account
      await expect(
        nerixNFT.connect(user1).incrementIteration()
      ).to.be.revertedWithCustomError(nerixNFT, "OnlyGameContract");
      
      // Try to increment from the owner (still not the game contract)
      await expect(
        nerixNFT.incrementIteration()
      ).to.be.revertedWithCustomError(nerixNFT, "OnlyGameContract");
      
      // Increment from the configured game contract address
      await expect(
        nerixNFT.connect(gameContract).incrementIteration()
      ).to.emit(nerixNFT, "IterationIncremented")
        .withArgs(1n, 2n);
      
      expect(await nerixNFT.gameCurrentIteration()).to.equal(2n);
    });
  });

  describe("Base URI Management", function () {
    it("Should set the base URI correctly", async function () {
      const newBaseURI = "https://updated-nerixai.com/nft/";
      await nerixNFT.setBaseURI(newBaseURI);
      
      // Mint an NFT to check the URI
      await nerixNFT.connect(gameContract).mintCommunityNFT(addresses.user1, 1);
      
      const tokenURI = await nerixNFT.tokenURI(1);
      
      expect(tokenURI).to.include(newBaseURI);
      expect(tokenURI).to.include("community/1/1");
      // No longer includes .json extension in the updated contract
      expect(tokenURI).not.to.include(".json");
    });

    it("Should emit BaseURISet event when setting base URI", async function () {
      const newBaseURI = "https://updated-nerixai.com/nft/";
      
      await expect(nerixNFT.setBaseURI(newBaseURI))
        .to.emit(nerixNFT, "BaseURISet")
        .withArgs(newBaseURI);
    });

    it("Should only allow the owner to set the base URI", async function () {
      await expect(
        nerixNFT.connect(user1).setBaseURI("https://hacked-uri.com/")
      ).to.be.reverted;
    });
  });

  describe("NFT Minting", function () {
    it("Should mint Community NFT correctly", async function () {
      await expect(
        nerixNFT.connect(gameContract).mintCommunityNFT(addresses.user1, 1)
      ).to.emit(nerixNFT, "NFTMinted")
        .withArgs(addresses.user1, 1n, 0, 1n); // 0 is COMMUNITY type
      
      expect(await nerixNFT.balanceOf(addresses.user1)).to.equal(1n);
      
      const [nftType, iteration, mintTime] = await nerixNFT.getNFTInfo(1);
      expect(nftType).to.equal(0); // COMMUNITY type
      expect(iteration).to.equal(1n);
      expect(mintTime).to.be.gt(0n); // Just check it's set to some timestamp
    });

    it("Should mint Challenger NFT correctly", async function () {
      await expect(
        nerixNFT.connect(gameContract).mintChallengerNFT(addresses.user2, 1)
      ).to.emit(nerixNFT, "NFTMinted")
        .withArgs(addresses.user2, 1n, 1, 1n); // 1 is CHALLENGER type
      
      expect(await nerixNFT.balanceOf(addresses.user2)).to.equal(1n);
      
      const [nftType, iteration, mintTime] = await nerixNFT.getNFTInfo(1);
      expect(nftType).to.equal(1); // CHALLENGER type
      expect(iteration).to.equal(1n);
    });

    it("Should mint Winner NFT correctly", async function () {
      await expect(
        nerixNFT.connect(gameContract).mintWinnerNFT(addresses.user3, 1)
      ).to.emit(nerixNFT, "NFTMinted")
        .withArgs(addresses.user3, 1n, 2, 1n); // 2 is WINNER type
      
      expect(await nerixNFT.balanceOf(addresses.user3)).to.equal(1n);
      
      const [nftType, iteration, mintTime] = await nerixNFT.getNFTInfo(1);
      expect(nftType).to.equal(2); // WINNER type
      expect(iteration).to.equal(1n);
    });

    it("Should reject minting to zero address", async function () {
      await expect(
        nerixNFT.connect(gameContract).mintCommunityNFT(ZeroAddress, 1)
      ).to.be.revertedWithCustomError(nerixNFT, "ZeroAddressNotAllowed");

      await expect(
        nerixNFT.connect(gameContract).mintChallengerNFT(ZeroAddress, 1)
      ).to.be.revertedWithCustomError(nerixNFT, "ZeroAddressNotAllowed");

      await expect(
        nerixNFT.connect(gameContract).mintWinnerNFT(ZeroAddress, 1)
      ).to.be.revertedWithCustomError(nerixNFT, "ZeroAddressNotAllowed");
    });
  });

  describe("NFT Ownership", function () {
    beforeEach(async function () {
      // Mint multiple NFTs to different users
      await nerixNFT.connect(gameContract).mintCommunityNFT(addresses.user1, 1);
      await nerixNFT.connect(gameContract).mintCommunityNFT(addresses.user1, 1);
      await nerixNFT.connect(gameContract).mintChallengerNFT(addresses.user2, 1);
      await nerixNFT.connect(gameContract).mintWinnerNFT(addresses.user3, 1);
    });

    it("Should correctly report NFT balances", async function () {
      expect(await nerixNFT.balanceOf(addresses.user1)).to.equal(2n);
      expect(await nerixNFT.balanceOf(addresses.user2)).to.equal(1n);
      expect(await nerixNFT.balanceOf(addresses.user3)).to.equal(1n);
      expect(await nerixNFT.balanceOf(addresses.owner)).to.equal(0n);
    });

    it("Should return correct NFT info", async function () {
      // Get NFT info for the second NFT minted to user1
      const [nftType, iteration, mintTime] = await nerixNFT.getNFTInfo(2);
      
      expect(nftType).to.equal(0); // COMMUNITY type
      expect(iteration).to.equal(1n); // Iteration 1
      expect(mintTime).to.be.gt(0n); // Minted at some valid timestamp
    });
    
    it("Should revert when querying non-existent NFT", async function () {
      // Try to get info for a non-existent token
      const nonExistentTokenId = 999;
      await expect(
        nerixNFT.getNFTInfo(nonExistentTokenId)
      ).to.be.reverted;
    });
    
    it("Should format token URIs correctly", async function () {
      // We'll test with separate NFTs to avoid ordering issues
      // First, check the current minted NFTs
      const tokenURI1 = await nerixNFT.tokenURI(1);
      const tokenURI2 = await nerixNFT.tokenURI(2);
      const tokenURI3 = await nerixNFT.tokenURI(3);
      const tokenURI4 = await nerixNFT.tokenURI(4);
      
      console.log("Token URIs:", tokenURI1, tokenURI2, tokenURI3, tokenURI4);
      
      // Mint new NFTs with very specific iterations to test URI format
      await nerixNFT.connect(gameContract).mintCommunityNFT(addresses.user1, 5);
      await nerixNFT.connect(gameContract).mintChallengerNFT(addresses.user2, 6);
      await nerixNFT.connect(gameContract).mintWinnerNFT(addresses.user3, 7);
      
      // Get token URIs for the new NFTs
      const communityURI = await nerixNFT.tokenURI(5);
      const challengerURI = await nerixNFT.tokenURI(6);
      const winnerURI = await nerixNFT.tokenURI(7);
      
      console.log("New specific NFT URIs:", communityURI, challengerURI, winnerURI);
      
      // Check correct format - based on actual contract behavior
      // We expect iteration and token ID in each URI
      expect(communityURI).to.include("community/5/5"); // Format: type/iteration/tokenId
      expect(challengerURI).to.include("challenger/6/6");
      expect(winnerURI).to.include("winner/7/7");
    });
  });

  describe("NFT Transfer Restrictions", function () {
    beforeEach(async function () {
      // Mint NFTs for testing
      await nerixNFT.connect(gameContract).mintCommunityNFT(addresses.user1, 1);
      await nerixNFT.connect(gameContract).mintChallengerNFT(addresses.user2, 1); 
      await nerixNFT.connect(gameContract).mintWinnerNFT(addresses.user3, 1);
    });

    it("Should prevent Community NFT transfers", async function () {
      const communityNFTId = 1; // First minted NFT should be Community
      
      // Verify it's a Community NFT
      const [nftType] = await nerixNFT.getNFTInfo(communityNFTId);
      expect(nftType).to.equal(0); // COMMUNITY type
      
      // Try to transfer - should fail
      await expect(
        nerixNFT.connect(user1).transferFrom(addresses.user1, addresses.user2, communityNFTId)
      ).to.be.revertedWith("Community NFTs are non-transferable");
    });

    it("Should prevent Winner/Challenger NFT transfer in same iteration", async function () {
      const challengerNFTId = 2; // Second minted NFT should be Challenger
      
      // Verify it's a Challenger NFT from iteration 1
      const [nftType, iteration] = await nerixNFT.getNFTInfo(challengerNFTId);
      expect(nftType).to.equal(1); // CHALLENGER type
      expect(iteration).to.equal(1n);
      
      // Current game iteration should be 1, so transfer should fail
      const currentIteration = await nerixNFT.gameCurrentIteration();
      expect(currentIteration).to.equal(1n);
      
      // Try to transfer in same iteration - should fail
      await expect(
        nerixNFT.connect(user2).transferFrom(addresses.user2, addresses.user1, challengerNFTId)
      ).to.be.revertedWith("NFT locked: wait 1 iteration after mint");
    });

    it("Should allow Winner/Challenger NFT transfer after 1 iteration", async function () {
      const winnerNFTId = 3; // Third minted NFT should be Winner
      
      // Verify it's a Winner NFT from iteration 1
      const [nftType, iteration] = await nerixNFT.getNFTInfo(winnerNFTId);
      expect(nftType).to.equal(2); // WINNER type
      expect(iteration).to.equal(1n);
      
      // Increment iteration to simulate next game iteration
      await nerixNFT.connect(gameContract).incrementIteration();
      
      // Now transfer should work
      await expect(
        nerixNFT.connect(user3).transferFrom(addresses.user3, addresses.user1, winnerNFTId)
      ).to.not.be.reverted;
      
      // Verify transfer was successful
      const newOwner = await nerixNFT.ownerOf(winnerNFTId);
      expect(newOwner).to.equal(addresses.user1);
    });

    it("Should calculate transfer lock correctly for multiple iterations", async function () {
      // Mint NFTs in different iterations
      await nerixNFT.connect(gameContract).incrementIteration(); // Now iteration 2
      await nerixNFT.connect(gameContract).mintWinnerNFT(addresses.user1, 2);
      
      const iter2NFTId = 4; // Fourth minted NFT in iteration 2
      
      // Should be locked since current iteration = mint iteration + 1 (2)
      await expect(
        nerixNFT.connect(user1).transferFrom(addresses.user1, addresses.user2, iter2NFTId)
      ).to.be.revertedWith("NFT locked: wait 1 iteration after mint");
      
      // Increment to iteration 3
      await nerixNFT.connect(gameContract).incrementIteration();
      
      // Now should be transferable (current=3, mint=2, lock=1, so 3 >= 2+1)
      await expect(
        nerixNFT.connect(user1).transferFrom(addresses.user1, addresses.user2, iter2NFTId)
      ).to.not.be.reverted;
    });

    it("Should allow minting and burning regardless of restrictions", async function () {
      // Minting should always work (tested in beforeEach)
      expect(await nerixNFT.balanceOf(addresses.user1)).to.equal(1n);
      
      // TODO: Add burning test if burn functionality is implemented in the future
      // This test verifies that _update allows minting (from == address(0))
      // and would allow burning (to == address(0)) if implemented
    });
  });

  describe("Interface Support", function () {
    it("Should support ERC721 interface", async function () {
      const ERC721_INTERFACE_ID = "0x80ac58cd";
      expect(await nerixNFT.supportsInterface(ERC721_INTERFACE_ID)).to.be.true;
    });
    
    it("Should support ERC721Metadata interface", async function () {
      const ERC721_METADATA_INTERFACE_ID = "0x5b5e139f";
      expect(await nerixNFT.supportsInterface(ERC721_METADATA_INTERFACE_ID)).to.be.true;
    });
  });
});