import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
import "solidity-coverage";
import "hardhat-gas-reporter";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const TEST_PRIVATE_KEY_1 = process.env.TEST_PRIVATE_KEY_1 || PRIVATE_KEY;
const TEST_PRIVATE_KEY_2 = process.env.TEST_PRIVATE_KEY_2 || PRIVATE_KEY;
const TEST_PRIVATE_KEY_3 = process.env.TEST_PRIVATE_KEY_3 || PRIVATE_KEY;
const BNB_TESTNET_RPC_URL = process.env.BNB_TESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545/";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    bnbTestnet: {
      url: process.env.RPC_URL_TESTNET || "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [
        PRIVATE_KEY,        // deployer
        TEST_PRIVATE_KEY_1, // player1
        TEST_PRIVATE_KEY_2, // player2
        TEST_PRIVATE_KEY_3, // player3
      ],
      gasPrice: 10000000000, // 10 gwei
    },
    bnb: {
      url: process.env.RPC_URL_MAINNET || "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [PRIVATE_KEY],
      gasPrice: 5000000000, // 5 gwei
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
    },
  },
};

export default config;