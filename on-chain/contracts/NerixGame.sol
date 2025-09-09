// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

// Interface for NerixNFT
interface INerixNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
    function getNFTInfo(uint256 tokenId) external view returns (uint8 nftType, uint256 iteration, uint256 mintTime);
    function mintCommunityNFT(address to, uint256 iteration) external;
    function mintChallengerNFT(address to, uint256 iteration) external;
    function mintWinnerNFT(address to, uint256 iteration) external;
    function incrementIteration() external;
}

/**
 * @title PromptData
 * @dev SSTORE2 pattern for efficient prompt storage
 */
contract PromptData {
    constructor(bytes memory data) {
        assembly {
            return(add(data, 0x20), mload(data))
        }
    }
}

/**
 * @title NerixGame
 * @dev Main game contract for managing message sending, rewards, and game iterations
 * @notice Optimized version with gas improvements
 */
contract NerixGame is Ownable, ReentrancyGuard, Pausable {
    // NFT type constants
    uint8 public constant NFT_TYPE_COMMUNITY = 0;
    uint8 public constant NFT_TYPE_CHALLENGER = 1;
    uint8 public constant NFT_TYPE_WINNER = 2;
    
    // Iteration tracking
    uint256 public currentIteration;
    
    // Reward pools
    uint256 public currentRewardPool;
    uint256 public nextIterationPool;
    uint256 public teamPool;
    
    // Message fee configuration (configurable at deployment)
    uint256 public immutable BASE_MESSAGE_FEE; // Base message fee
    uint256 public immutable MESSAGE_GROWTH_RATE; // Growth rate per message (78 = 0.78%)
    uint256 public immutable MESSAGE_COOLDOWN; // Seconds between messages
    
    // Reward pool configuration (configurable at deployment)
    uint256 public immutable INITIAL_REWARD_POOL; // Initial reward pool amount
    uint256 public immutable CURRENT_POOL_SHARE; // Percentage for current iteration (60%)
    uint256 public immutable NEXT_POOL_SHARE; // Percentage for next iteration (20%)
    uint256 public immutable TEAM_POOL_SHARE; // Percentage for team (20%)
    uint256 public immutable MAX_FEE_DISCOUNT; // Maximum fee discount percentage (80%)
    uint256 public immutable BASE_CHARACTER_LIMIT; // Default character limit
    uint256 public immutable FIRST_MOVER_DISCOUNT; // Discount for first message (10%)
    
    // Maximum message fee protection (configurable at deployment)
    uint256 public immutable MAX_MESSAGE_FEE;
    
    // Game state
    bool public gameActive;
    uint256 public totalMessages;
    uint256 public totalParticipants;
    bool public isIterative;  // true = endless game, false = single game
    
    // NerixNFT contract
    INerixNFT public nerixNFT;
    
    // System prompt storage using SSTORE2 pattern
    address public currentPromptPtr;
    mapping(uint256 => address) public iterationPromptPtr; // Historical prompts by iteration
    
    // User data tracking for current iteration (optimized storage)
    struct UserData {
        uint128 lastMessageTime;    // Last message timestamp (sufficient until 2106)
        uint128 participantIteration; // The iteration in which the user is a participant
        mapping(uint256 => uint256) iterationAttempts; // Attempts per iteration
    }
    
    // Mapping for user data
    mapping(address => UserData) public userData;
    
    /**
     * @dev Check if user is participant in current iteration
     * @param user User address to check
     * @return True if user is participant in current iteration
     */
    function isParticipant(address user) public view returns (bool) {
        return userData[user].participantIteration == currentIteration;
    }
    
    /**
     * @dev Get attempt count for user in specific iteration
     * @param user User address
     * @param iteration Iteration number (0 for current)
     * @return Number of attempts
     */
    function getAttemptCount(address user, uint256 iteration) public view returns (uint256) {
        uint256 targetIteration = iteration == 0 ? currentIteration : iteration;
        return userData[user].iterationAttempts[targetIteration];
    }
    
    // Events
    event GameStarted(uint256 indexed iteration, uint256 initialReward);
    event MessageSent(address indexed sender, uint256 fee, uint256 discountedFee, uint256 messageLength);
    event GameWon(address indexed winner, uint256 indexed iteration, uint256 reward);
    event FeeDistributed(uint256 currentPool, uint256 nextPool, uint256 teamPool);
    event NFTContractSet(address indexed oldContract, address indexed newContract);
    event TeamFundsWithdrawn(address indexed recipient, uint256 amount);
    event NFTMinted(address indexed recipient, uint8 nftType, uint256 iteration);
    event PromptUpdated(uint256 indexed iteration, address promptContract);
    
    // Errors
    error GameNotActive();
    error InsufficientPayment(uint256 required, uint256 provided);
    error GameAlreadyActive();
    error CharacterLimitExceeded(uint256 contentLength, uint256 maxLength);
    error MessageCooldownNotMet(uint256 remainingTime);
    error ZeroAddressNotAllowed();
    error TransferFailed();
    error ParticipantNotFound();
    error OnlyOwnerAllowed();
    error NotOwner();
    error InvalidNFTType();
    error NoFunds();
    error PromptDeploymentFailed();

    /**
     * @dev Constructor with configurable game parameters
     * @param _isIterative Whether this is an iterative game (true) or single game (false)
     * @param _baseMessageFee Base message fee (e.g., 0.01 ether)
     * @param _messageGrowthRate Message fee growth rate (78 = 0.78%)
     * @param _messageCooldown Cooldown between messages in seconds
     * @param _initialRewardPool Initial reward pool amount
     * @param _currentPoolShare Current iteration pool share percentage
     * @param _nextPoolShare Next iteration pool share percentage
     * @param _teamPoolShare Team pool share percentage
     * @param _maxFeeDiscount Maximum fee discount percentage
     * @param _baseCharacterLimit Default character limit
     * @param _firstMoverDiscount First message discount percentage
     * @param _maxMessageFee Maximum message fee cap
     */
    constructor(
        bool _isIterative,
        uint256 _baseMessageFee,
        uint256 _messageGrowthRate,
        uint256 _messageCooldown,
        uint256 _initialRewardPool,
        uint256 _currentPoolShare,
        uint256 _nextPoolShare,
        uint256 _teamPoolShare,
        uint256 _maxFeeDiscount,
        uint256 _baseCharacterLimit,
        uint256 _firstMoverDiscount,
        uint256 _maxMessageFee
    ) Ownable(msg.sender) {
        require(_currentPoolShare + _nextPoolShare + _teamPoolShare == 100, "Pool shares must sum to 100");
        require(_maxFeeDiscount <= 100, "Max fee discount cannot exceed 100%");
        require(_firstMoverDiscount <= 100, "First mover discount cannot exceed 100%");
        require(_baseMessageFee > 0, "Base message fee must be greater than 0");
        require(_initialRewardPool > 0, "Initial reward pool must be greater than 0");
        require(_maxMessageFee >= _baseMessageFee, "Max message fee must be >= base message fee");
        require(_baseCharacterLimit > 0, "Base character limit must be greater than 0");
        
        isIterative = _isIterative;
        BASE_MESSAGE_FEE = _baseMessageFee;
        MESSAGE_GROWTH_RATE = _messageGrowthRate;
        MESSAGE_COOLDOWN = _messageCooldown;
        INITIAL_REWARD_POOL = _initialRewardPool;
        CURRENT_POOL_SHARE = _currentPoolShare;
        NEXT_POOL_SHARE = _nextPoolShare;
        TEAM_POOL_SHARE = _teamPoolShare;
        MAX_FEE_DISCOUNT = _maxFeeDiscount;
        BASE_CHARACTER_LIMIT = _baseCharacterLimit;
        FIRST_MOVER_DISCOUNT = _firstMoverDiscount;
        MAX_MESSAGE_FEE = _maxMessageFee;
    }
    
    /**
     * @dev Start the first game
     */
    function startFirstGame() external onlyOwner whenNotPaused {
        if (gameActive) revert GameAlreadyActive();
        if (currentIteration > 0) revert GameAlreadyActive();
        
        // Initialize game state
        currentIteration = 1;
        currentRewardPool = INITIAL_REWARD_POOL;
        gameActive = true;
        totalMessages = 0;
        totalParticipants = 0;
        
        emit GameStarted(currentIteration, currentRewardPool);
    }
    
    /**
     * @dev Calculate the current message fee based on total messages
     * @return The current base message fee (before discounts)
     */
    function _calculateBaseFee() internal view returns (uint256) {
        if (totalMessages == 0) {
            return BASE_MESSAGE_FEE;
        }
        
        uint256 calculatedFee = BASE_MESSAGE_FEE + (BASE_MESSAGE_FEE * totalMessages * MESSAGE_GROWTH_RATE / 10000);
        return calculatedFee > MAX_MESSAGE_FEE ? MAX_MESSAGE_FEE : calculatedFee;
    }
    
    /**
     * @dev Get the current message fee
     * @return The current base message fee (before discounts)
     */
    function getCurrentMessageFee() public view returns (uint256) {
        return _calculateBaseFee();
    }
    
    /**
     * @dev Calculate legacy bonus based on iteration difference
     * @param iteraiton Current game iteration
     * @param nftIteration NFT's iteration
     * @return Legacy bonus percentage
     */
    function _calculateLegacyBonus(uint256 iteraiton, uint256 nftIteration) internal pure returns (uint256) {
        if (nftIteration >= iteraiton) {
            return 0;
        }
        
        // Calculate iteration difference
        uint256 iterationDiff = iteraiton - nftIteration;
        
        // Different bonus rates for different iteration ranges
        if (iterationDiff <= 5) {
            return iterationDiff * 10; // 10% per iteration for 1-5
        } else if (iterationDiff <= 10) {
            return 50 + (iterationDiff - 5) * 5; // 5% per iteration for 6-10
        } else if (iterationDiff <= 20) {
            return 75 + (iterationDiff - 10) * 25 / 10; // 2.5% per iteration for 11-20
        } else if (iterationDiff <= 100) {
            return 100 + (iterationDiff - 20); // 1% per iteration for 21-100
        } else {
            return 180 + (iterationDiff - 100) / 2; // 0.5% per iteration for 100+
        }
    }
    
    /**
     * @dev Calculate NFT bonuses based on NFT type and iteration
     * @param nftType Type of NFT (0=Community, 1=Challenger, 2=Winner)
     * @param nftIteration NFT's iteration
     * @return characterBonus Character limit bonus
     * @return feeDiscount Fee discount percentage
     * @return contextBonus Context size bonus
     */
    function _calculateNFTBonuses(
        uint8 nftType, 
        uint256 nftIteration
    ) internal view returns (
        uint256 characterBonus, 
        uint256 feeDiscount,
        uint256 contextBonus
    ) {
        // Calculate base bonuses based on NFT type
        if (nftType == NFT_TYPE_COMMUNITY) {
            characterBonus = 100;
            feeDiscount = 0;
            contextBonus = 0;
        } else if (nftType == NFT_TYPE_CHALLENGER) {
            characterBonus = 200;
            feeDiscount = 10;
            contextBonus = 0;
        } else if (nftType == NFT_TYPE_WINNER) {
            characterBonus = 300;
            feeDiscount = 20;
            contextBonus = 3;
        }
        
        // Apply legacy bonus based on iteration difference
        if (nftIteration < currentIteration) {
            uint256 legacyBonus = _calculateLegacyBonus(currentIteration, nftIteration);
            
            uint256 characterBonusAdd = (characterBonus * legacyBonus) / 100;
            uint256 feeDiscountAdd = (feeDiscount * legacyBonus) / 100;
            uint256 contextBonusAdd = (contextBonus * legacyBonus) / 100;
            
            characterBonus += characterBonusAdd;
            feeDiscount += feeDiscountAdd;
            contextBonus += contextBonusAdd;
        }

        return (characterBonus, feeDiscount, contextBonus);
    }
    
    /**
     * @dev Calculate the final fee for a specific user, including all discounts
     * @param user The address of the user
     * @param nftId The NFT ID to use for bonuses (0 for none)
     * @return The final discounted fee that the user needs to pay
     */
    function calculateMessageFee(address user, uint256 nftId) external view returns (uint256) {
        if (!gameActive) revert GameNotActive();
        
        uint256 fee = _calculateBaseFee();
        uint256 feeDiscount = 0;
        
        // Calculate discount if NFT contract is set and NFT ID is provided
        if (address(nerixNFT) != address(0) && nftId != 0) {
            // Check ownership
            if (nerixNFT.ownerOf(nftId) == user) {
                // Get NFT info
                (uint8 nftType, uint256 iteration,) = nerixNFT.getNFTInfo(nftId);
                
                // Calculate discount
                (,feeDiscount,) = _calculateNFTBonuses(nftType, iteration);
                
                // Cap fee discount
                if (feeDiscount > MAX_FEE_DISCOUNT) {
                    feeDiscount = MAX_FEE_DISCOUNT;
                }
            }
        }
        
        // Apply discount
        uint256 discountedFee = fee;
        if (feeDiscount > 0) {
            discountedFee = fee - ((fee * feeDiscount) / 100);
        }
        
        // First message of an iteration gets additional discount
        if (totalMessages == 0) {
            discountedFee = discountedFee - ((discountedFee * FIRST_MOVER_DISCOUNT) / 100);
        }
        
        return discountedFee;
    }
    
    /**
     * @dev Send a message to attempt the challenge
     * @param content Message content (for character limit check)
     * @param nftId NFT ID to use for bonuses (0 for none)
     */
    function sendMessage(string calldata content, uint256 nftId) external payable nonReentrant whenNotPaused {
        if (!gameActive) revert GameNotActive();
        
        // Get user data
        UserData storage user = userData[msg.sender];
        
        // Check message cooldown
        if (user.lastMessageTime > 0 && block.timestamp < user.lastMessageTime + MESSAGE_COOLDOWN) {
            revert MessageCooldownNotMet(user.lastMessageTime + MESSAGE_COOLDOWN - block.timestamp);
        }
        
        // Check character limit
        uint256 characterBonus = 0;
        uint256 feeDiscount = 0;
        
        // Calculate bonuses if NFT contract is set and NFT ID is provided
        if (address(nerixNFT) != address(0) && nftId != 0) {
            // Check ownership
            if (nerixNFT.ownerOf(nftId) != msg.sender) revert NotOwner();
            
            // Get NFT info
            (uint8 nftType, uint256 iteration,) = nerixNFT.getNFTInfo(nftId);
            
            // Calculate bonuses
            (characterBonus, feeDiscount,) = _calculateNFTBonuses(nftType, iteration);
            
            // Cap fee discount
            if (feeDiscount > MAX_FEE_DISCOUNT) {
                feeDiscount = MAX_FEE_DISCOUNT;
            }
        }
        
        // Check total character limit
        uint256 totalCharacterLimit = BASE_CHARACTER_LIMIT + characterBonus;
        if (bytes(content).length > totalCharacterLimit) {
            revert CharacterLimitExceeded(bytes(content).length, totalCharacterLimit);
        }
        
        // Get current fee using common calculation method
        uint256 fee = _calculateBaseFee();
        
        // Calculate discounted message fee
        uint256 discountedFee = fee;
        if (feeDiscount > 0) {
            discountedFee = fee - ((fee * feeDiscount) / 100);
        }
        
        // First mover bonus for the first message of an iteration
        if (totalMessages == 0) {
            discountedFee = discountedFee - ((discountedFee * FIRST_MOVER_DISCOUNT) / 100);
        }
        
        // Random bonus - TEMPORARILY DISABLED FOR SECURITY
        // TODO: Implement secure random number generation (Chainlink VRF)
        bool isFreeLuckyMessage = false;
        /* 
        uint256 randomValue = uint256(keccak256(abi.encodePacked(
            block.timestamp, 
            block.prevrandao, 
            msg.sender,
            address(this),
            totalMessages
        ))) % 1000;
        
        if (randomValue == 0) {
            isFreeLuckyMessage = true;
            discountedFee = 0;
        }
        */
        
        // Only enforce payment check if not a free message
        if (!isFreeLuckyMessage) {
            if (msg.value < discountedFee) {
                revert InsufficientPayment(discountedFee, msg.value);
            }
            
            // Distribute fee
            uint256 currentPoolAmount = (discountedFee * CURRENT_POOL_SHARE) / 100;
            uint256 nextPoolAmount = (discountedFee * NEXT_POOL_SHARE) / 100;
            uint256 teamPoolAmount = discountedFee - currentPoolAmount - nextPoolAmount;
            
            currentRewardPool += currentPoolAmount;
            nextIterationPool += nextPoolAmount;
            teamPool += teamPoolAmount;
            
            emit FeeDistributed(currentPoolAmount, nextPoolAmount, teamPoolAmount);
            
            // Refund excess payment
            uint256 excessPayment = msg.value - discountedFee;
            if (excessPayment > 0) {
                (bool success, ) = payable(msg.sender).call{value: excessPayment}("");
                if (!success) revert TransferFailed();
            }
        }
        
        // Update user data
        user.lastMessageTime = uint128(block.timestamp);
        user.iterationAttempts[currentIteration]++;

        // If first participation in this iteration, increment total participants
        if (user.participantIteration != currentIteration) {
            user.participantIteration = uint128(currentIteration);
            totalParticipants++;
        }
        
        // Update total messages count
        totalMessages++;
        
        emit MessageSent(
            msg.sender,
            fee,
            discountedFee,
            bytes(content).length
        );
    }
    
    /**
     * @dev Mint NFTs for the current iteration
     * @param winner Winner address
     * @param topChallengers Top 3 challengers
     * @param participants All participants
     * @param iteration Current iteration
     */
    function mintIterationNFTs(
        address winner,
        address[3] memory topChallengers,
        address[] memory participants,
        uint256 iteration
    ) internal {
          if (address(nerixNFT) == address(0)) return;
    
    // Mint Winner NFT - only for the winner
    if (winner != address(0) && userData[winner].participantIteration == currentIteration) {
        nerixNFT.mintWinnerNFT(winner, iteration);
        emit NFTMinted(winner, NFT_TYPE_WINNER, iteration);
    }
    
    // Mint Challenger NFTs for top challengers
    for (uint256 i = 0; i < topChallengers.length; i++) {
        address challenger = topChallengers[i];
        // Check if participant is valid for this iteration
        if (challenger != address(0) && 
            userData[challenger].participantIteration == currentIteration && 
            userData[challenger].iterationAttempts[currentIteration] > 0) {
            
            nerixNFT.mintChallengerNFT(challenger, iteration);
            emit NFTMinted(challenger, NFT_TYPE_CHALLENGER, iteration);
        }
    }
    
    // Mint Community NFTs for all participants
    for (uint256 i = 0; i < participants.length; i++) {
        address participant = participants[i];
        // Check if participant is valid for this iteration
        if (participant != address(0) && 
            userData[participant].participantIteration == currentIteration) {
            
            nerixNFT.mintCommunityNFT(participant, iteration);
            emit NFTMinted(participant, NFT_TYPE_COMMUNITY, iteration);
        }
    }
    }
    
    /**
     * @dev Declare a winner (only callable by owner)
     * @param winner Address of the winning player
     * @param topChallengers Top 3 challengers
     * @param participants All participants
     * @param nextPrompt Next iteration's system prompt (empty to keep current)
     */
    function declareWinner(
        address winner, 
        address[3] memory topChallengers,
        address[] memory participants,
        bytes calldata nextPrompt
    ) external onlyOwner nonReentrant whenNotPaused {
        if (!gameActive) revert GameNotActive();
        if (winner == address(0)) revert ZeroAddressNotAllowed();
        
        // Check if the winner has participated in the current iteration
        if (userData[winner].participantIteration != currentIteration) {
            revert ParticipantNotFound();
        }
        
        // Save state variables to memory for gas efficiency and security
        uint256 reward = currentRewardPool;
        uint256 iteration = currentIteration;
        
        // Update state BEFORE external calls to follow checks-effects-interactions pattern
        gameActive = false;
        
        // Mint NFTs only for iterative games
        if (isIterative) {
            mintIterationNFTs(winner, topChallengers, participants, iteration);
        }
        
        // Send reward to winner after state updates
        (bool success, ) = payable(winner).call{value: reward}("");
        if (!success) revert TransferFailed();
        
        emit GameWon(winner, iteration, reward);
        
        // Store current prompt in history
        iterationPromptPtr[iteration] = currentPromptPtr;
        
        // Prepare next iteration for iterative games
        if (isIterative) {
            _prepareNextIteration();
            
            // Deploy and set new prompt if provided
            if (nextPrompt.length > 0) {
                address nextPtr = _storePrompt(nextPrompt);
                currentPromptPtr = nextPtr;
                emit PromptUpdated(currentIteration, nextPtr);
            }
        }
    }
    
    /**
     * @dev Set NFT contract address
     * @param _nftAddress Address of the NerixNFT contract
     */
    function setNerixNFTAddress(address _nftAddress) external onlyOwner {
        if (_nftAddress == address(0)) revert ZeroAddressNotAllowed();
        
        address oldNftAddress = address(nerixNFT);
        nerixNFT = INerixNFT(_nftAddress);
        
        emit NFTContractSet(oldNftAddress, _nftAddress);
    }
    
    /**
     * @dev Prepare for the next iteration
     * @notice Called internally after a game is won
     */
    function _prepareNextIteration() internal {
        currentIteration++;
        currentRewardPool = nextIterationPool;
        nextIterationPool = 0;
        totalMessages = 0;
        totalParticipants = 0;
        gameActive = true;
        
        // Increment iteration in NFT contract if set
        if (address(nerixNFT) != address(0)) {
            nerixNFT.incrementIteration();
        }
        // No need to clear participant data individually
        // Next time a user interacts, they'll get a fresh entry
        
        emit GameStarted(currentIteration, currentRewardPool);
    }
    
    /**
     * @dev Withdraw team funds
     * @notice Sends accumulated team funds to n the contract owner
     */
    function withdrawTeamFunds() external onlyOwner nonReentrant {
        uint256 amount = teamPool;
        if (amount == 0) revert InsufficientPayment(1, 0);
        
        // Update state before transfer
        teamPool = 0;
        
        // Transfer funds
        (bool success, ) = payable(owner()).call{value: amount}("");
        if (!success) revert TransferFailed();
        
        emit TeamFundsWithdrawn(owner(), amount);
    }
    
    /**
     * @dev Pause the game
     * @notice This prevents sending messages and declaring winners
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the game
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Return context size (how many previous messages to include)
     * @param user User address
     * @param nftId NFT ID to use for bonuses (0 for none)
     * @return Context size including any bonuses
     */
    function getContextSize(address user, uint256 nftId) external view returns (uint256) {
        uint256 baseContextSize = 4; // Base context size
        uint256 contextBonus = 0;
        
        if (address(nerixNFT) != address(0) && nftId != 0) {
            // Check ownership
            if (nerixNFT.ownerOf(nftId) == user) {
                // Get NFT info
                (uint8 nftType, uint256 iteration,) = nerixNFT.getNFTInfo(nftId);
                
                // Calculate context bonus
                (,,contextBonus) = _calculateNFTBonuses(nftType, iteration);
            }
        }
        
        return baseContextSize + contextBonus;
    }
    
    /**
     * @dev Get maximum message length for a user including bonuses
     * @param user User address
     * @param nftId NFT ID to use for bonuses (0 for none)
     * @return Maximum allowed characters
     */
    function getMaxMessageLength(address user, uint256 nftId) external view returns (uint256) {
        uint256 characterBonus = 0;
        
        if (address(nerixNFT) != address(0) && nftId != 0) {
            // Check ownership
            if (nerixNFT.ownerOf(nftId) == user) {
                // Get NFT info
                (uint8 nftType, uint256 iteration,) = nerixNFT.getNFTInfo(nftId);
                
                // Calculate character bonus
                (characterBonus,,) = _calculateNFTBonuses(nftType, iteration);
            }
        }
        
        return BASE_CHARACTER_LIMIT + characterBonus;
    }
    
    /**
     * @dev Check if an address is a participant in the current iteration
     * @param participant Address to check
     * @return True if participant
     */
    
    /**
    * @dev Get the total attempts across all iterations for a participant
    * @param participant Address to check
    * @return Total number of attempts
    */
    function getTotalAttemptCount(address participant) external view returns (uint256) {
        return userData[participant].iterationAttempts[currentIteration];
    }
    /**
     * @dev Get the total number of participants
     * @return Number of participants
     */
    function getParticipantCount() external view returns (uint256) {
        return totalParticipants;
    }
    
    /**
     * @dev Store prompt data using SSTORE2 pattern
     * @param data Prompt data to store
     * @return ptr Address of deployed PromptData contract
     */
    function _storePrompt(bytes memory data) internal returns (address ptr) {
        ptr = address(new PromptData(data));
    }
    
    /**
     * @dev Read prompt from SSTORE2 pointer
     * @param ptr Address of PromptData contract
     * @return out The stored prompt string
     */
    function _readPrompt(address ptr) internal view returns (string memory out) {
        if (ptr == address(0)) return "";
        uint256 size;
        assembly { size := extcodesize(ptr) }
        if (size == 0) return "";
        bytes memory buf = new bytes(size);
        assembly { extcodecopy(ptr, add(buf, 0x20), 0, size) }
        out = string(buf);
    }
    
    /**
     * @dev Get current system prompt
     * @return Current prompt string
     */
    function getCurrentPrompt() external view returns (string memory) {
        return _readPrompt(currentPromptPtr);
    }
    
    /**
     * @dev Get prompt for specific iteration
     * @param iteration Iteration number
     * @return Prompt string for that iteration
     */
    function getIterationPrompt(uint256 iteration) external view returns (string memory) {
        return _readPrompt(iterationPromptPtr[iteration]);
    }
    
    /**
     * @dev Set initial system prompt (only owner, only if not set)
     * @param initialPrompt Initial prompt data
     */
    function setInitialPrompt(bytes calldata initialPrompt) external onlyOwner {
        if (currentPromptPtr != address(0)) {
            revert("Initial prompt already set");
        }
        
        address ptr = _storePrompt(initialPrompt);
        currentPromptPtr = ptr;
        emit PromptUpdated(0, ptr);
    }

    /**
     * @dev Handle incoming native tokens
     */
    receive() external payable {
        // Required to receive native tokens
    }
    
    /**
     * @dev Fallback function
     */
    fallback() external payable {
        // Required to receive native tokens
    }
}