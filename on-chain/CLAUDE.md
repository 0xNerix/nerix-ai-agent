# Nerix On-Chain Smart Contracts

This directory contains the blockchain integration smart contracts for the Nerix AI gaming platform. These contracts operate on BNB Chain (BSC) and handle AI challenge system, reward pool management, and NFT system functionalities.

## 📋 Contents

- **smart-contracts/**: Main smart contract files
- **tests/**: Comprehensive test files
- **scripts/**: Deployment and utility scripts
- **hardhat.config.ts**: Hardhat configuration file

## 🚀 Setup and Execution

### Requirements
- Node.js (v16+)
- npm or yarn
- BNB Testnet/Mainnet account and private key

### Installation
```bash
cd on-chain
npm install
```

### Environment Variables
Create a `.env` file:
```bash
PRIVATE_KEY=your_private_key_here
TEST_PRIVATE_KEY_1=test_account_1_private_key
TEST_PRIVATE_KEY_2=test_account_2_private_key  
TEST_PRIVATE_KEY_3=test_account_3_private_key
RPC_URL_TESTNET=https://data-seed-prebsc-1-s1.binance.org:8545
RPC_URL_MAINNET=https://bsc-dataseed.binance.org/
BSCSCAN_API_KEY=your_bscscan_api_key
```

## 🔧 Development Commands

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to local Hardhat network
npm run deploy:local

# Deploy to BNB Testnet
npm run deploy:testnet

# Deploy to BNB Mainnet (Production)
npm run deploy:mainnet

# Verify on testnet
npm run verify:testnet

# Verify on mainnet
npm run verify:mainnet
```

## 📜 Smart Contracts

### NerixGame.sol
Main game contract. Key features:

**Core Features:**
- **Message Sending**: Users send messages to AI for a fee
- **Dynamic Pricing**: Fee increases as message count grows (0.78% increase rate)
- **NFT Bonuses**: NFT holders get discounts and character limit bonuses
- **Reward Pool**: 60% of fees go to current reward pool, 20% to next iteration, 20% to team
- **Iteration System**: New iteration starts after winner is declared

**Important Constants:**
- `BASE_MESSAGE_FEE`: 0.01 BNB (~$10 USD)
- `MESSAGE_GROWTH_RATE`: 78 (0.78% increase per message)
- `MESSAGE_COOLDOWN`: 30 seconds
- `BASE_CHARACTER_LIMIT`: 500 characters
- `INITIAL_REWARD_POOL`: 0.1 BNB (~$200 USD)

**NFT Bonuses:**
- **Community NFT**: +100 character limit
- **Challenger NFT**: +200 characters, 10% fee discount
- **Winner NFT**: +300 characters, 20% fee discount, +3 context bonus

**Legacy Bonus System:**
- NFTs from older iterations receive bonuses
- 1-5 iteration difference: 10% bonus per iteration
- 6-10 iteration difference: 5% bonus per iteration
- 11-20 iteration difference: 2.5% bonus per iteration
- 21-100 iteration difference: 1% bonus per iteration
- 100+ iteration difference: 0.5% bonus per iteration

### NerixNFT.sol
NFT management contract. Features:

**NFT Types:**
- **Community NFT (0)**: Given to all participants
- **Challenger NFT (1)**: Given to top 3 active participants  
- **Winner NFT (2)**: Given to the winner

**Metadata Structure:**
- Stores NFT type, iteration number, and mint time
- Dynamic token URI: `baseURI/type/iteration/tokenId`
- Example: `https://api.nerix.com/nft/winner/5/123`

## 📄 Deployment Scripts

### scripts/deploy.ts
Comprehensive deployment script that:

**Deployment Process:**
1. **Deploy NerixNFT**: Deploys NFT contract with name, symbol, and base URI
2. **Deploy NerixGame**: Deploys main game contract
3. **Connect Contracts**: Links NFT and Game contracts together
4. **Initialize Game**: Starts the first game iteration
5. **Verify Contracts**: Automatically verifies contracts on BSCScan (non-localhost)

**Script Features:**
- Automatic contract verification
- Balance and network validation
- Comprehensive deployment summary
- Error handling and logging
- Constructor argument validation

**Usage:**
```bash
# Deploy to testnet
npx hardhat run scripts/deploy.ts --network bnbTestnet

# Deploy to mainnet  
npx hardhat run scripts/deploy.ts --network bnb
```

**Deployment Output:**
```
=== Deployment Summary ===
Network: bnbTestnet
NerixNFT: 0x1234...
NerixGame: 0x5678...
Initial Reward Pool: 0.1 BNB
Current Iteration: 1
Game Active: true
```

## 🔬 Test System

Comprehensive test suite includes:

### Test Categories:
- **NerixGame.test.ts**: Main game contract tests
- **NerixNFT.test.ts**: NFT contract tests
- **Integration.test.ts**: Inter-contract integration tests
- **BnbTestnet.test.ts**: Testnet-specific tests

### Test Scenarios:
- Message sending and fee calculation
- NFT bonus calculations
- Winner declaration and reward distribution
- Iteration transitions
- Security checks (reentrancy, access control)
- Edge cases and error conditions

## 🌐 Network Configuration

### BNB Testnet (ChainID: 97)
- RPC: `https://data-seed-prebsc-1-s1.binance.org:8545`
- Gas Price: 10 gwei
- Explorer: https://testnet.bscscan.com

### BNB Mainnet (ChainID: 56)  
- RPC: `https://bsc-dataseed.binance.org/`
- Gas Price: 5 gwei
- Explorer: https://bscscan.com

## 🔐 Security Features

- **ReentrancyGuard**: Protection against reentrancy attacks
- **Pausable**: Ability to pause contracts in emergencies
- **Ownable**: Access control for admin functions
- **Custom Errors**: Gas-efficient error messages
- **Checks-Effects-Interactions Pattern**: Safe state updates
- **Input Validation**: All input parameters are validated

## 📊 Gas Optimizations

- Packed structs usage
- Memory vs storage optimization
- Batch operations
- Custom errors (instead of revert strings)
- Efficient loops and conditionals
- Event-based data storage

## 🚀 Production Deployment

### Deployment Checklist:
1. Verify all tests pass
2. Check gas limits
3. Prepare API keys for contract verification
4. Validate deployment parameters
5. Use multi-sig wallet (recommended)
6. Perform post-deployment functionality tests

### Post-Deployment:
1. Verify contracts on BSCScan
2. Add contract addresses to frontend
3. Start first game (`startFirstGame()`)
4. Set NFT contract address (`setNerixNFTAddress()`)
5. Set base URI (`setBaseURI()`)

## 📚 API Reference

### NerixGame Main Functions:
- `sendMessage(string content, uint256 nftId)`: Send message
- `calculateMessageFee(address user, uint256 nftId)`: Calculate fee
- `declareWinner(address winner, address[3] topChallengers, address[] participants)`: Declare winner
- `getMaxMessageLength(address user, uint256 nftId)`: Get max character limit
- `getContextSize(address user, uint256 nftId)`: Get context size

### NerixNFT Main Functions:
- `mintCommunityNFT(address to, uint256 iteration)`: Mint Community NFT
- `mintChallengerNFT(address to, uint256 iteration)`: Mint Challenger NFT  
- `mintWinnerNFT(address to, uint256 iteration)`: Mint Winner NFT
- `getNFTInfo(uint256 tokenId)`: Get NFT information

## 🔧 Troubleshooting

### Common Issues:
- **"GameNotActive"**: Game not started or paused
- **"InsufficientPayment"**: Insufficient fee sent
- **"MessageCooldownNotMet"**: 30-second cooldown period
- **"CharacterLimitExceeded"**: Character limit exceeded
- **"OnlyGameContract"**: Only game contract can call

### Debug Tips:
- Check event logs
- Increase gas limits
- Verify network connection
- Check private key format

## 🔍 Contract Addresses

### Testnet Deployment
After deployment, contract addresses will be displayed in console output and should be saved for frontend integration.

### Environment Integration
Update your frontend `.env` with deployed contract addresses:
```
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```