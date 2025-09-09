// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title NerixNFT
 * @dev NFT contract for the Nerix platform - Manages Community, Challenger, and Winner NFTs
 * @notice Optimized version with gas improvements
 */
contract NerixNFT is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;
    
    // NFT types
    enum NFTType { COMMUNITY, CHALLENGER, WINNER }
    
    // NFT structure
    struct NFTInfo {
        NFTType nftType;
        uint256 iteration;
        uint256 mintTime;
    }
    
    // Mapping from token ID to NFT info
    mapping(uint256 => NFTInfo) public nftInfo;
    
    // Next token ID
    uint256 private _nextTokenId = 1;
    
    // Current iteration - starts at 1 by default
    uint256 public gameCurrentIteration = 1;
    
    // Base token URI where NFT images and metadata are stored
    string private _baseTokenURI;
    
    // Game contract address - only this contract can call certain functions
    address public gameContract;
    
    // Transfer lock configuration (configurable at deployment)
    uint256 public immutable TRANSFER_LOCK_ITERATIONS;
    
    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId, NFTType nftType, uint256 indexed iteration);
    event BaseURISet(string newBaseURI);
    event GameContractSet(address indexed oldContract, address indexed newContract);
    event IterationIncremented(uint256 oldIteration, uint256 newIteration);
    
    // Errors
    error OnlyGameContract();
    error URIQueryForNonexistentToken();
    error ZeroAddressNotAllowed();
    error IndexOutOfBounds();
    
    /**
     * @dev Constructor with configurable parameters
     * @param name_ Name of the NFT collection
     * @param symbol_ Symbol of the NFT collection
     * @param baseTokenURI_ Base URI for token metadata
     * @param _transferLockIterations Number of iterations to lock NFT transfers
     */
    constructor(
        string memory name_, 
        string memory symbol_,
        string memory baseTokenURI_,
        uint256 _transferLockIterations
    ) 
        ERC721(name_, symbol_) 
        Ownable(msg.sender)
    {
        require(_transferLockIterations > 0, "Transfer lock iterations must be greater than 0");
        
        // Set the base URI
        _baseTokenURI = baseTokenURI_;
        TRANSFER_LOCK_ITERATIONS = _transferLockIterations;
    }
    
    /**
     * @dev Only game contract modifier
     */
    modifier onlyGameContract() {
        if (msg.sender != gameContract) revert OnlyGameContract();
        _;
    }
    
    /**
     * @dev Set game contract address
     * @param _gameContract Address of the game contract
     */
    function setGameContract(address _gameContract) external onlyOwner {
        if (_gameContract == address(0)) revert ZeroAddressNotAllowed();
        
        address oldGameContract = gameContract;
        gameContract = _gameContract;
        
        emit GameContractSet(oldGameContract, _gameContract);
    }
    
    /**
     * @dev Increment the current iteration (only callable by game contract)
     * @notice Called when a new game iteration starts
     */
    function incrementIteration() external onlyGameContract {
        uint256 oldIteration = gameCurrentIteration;
        gameCurrentIteration++;
        
        emit IterationIncremented(oldIteration, gameCurrentIteration);
    }
    
    /**
     * @dev Set base URI for token metadata
     * @param baseURI New base URI for token metadata
     */
    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
        
        emit BaseURISet(baseURI);
    }
    
    /**
     * @dev Return base URI
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Mint Community NFT (only callable by game contract)
     * @param to Recipient address
     * @param iteration NFT iteration
     */
    function mintCommunityNFT(address to, uint256 iteration) external onlyGameContract {
        if (to == address(0)) revert ZeroAddressNotAllowed();
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        nftInfo[tokenId] = NFTInfo({
            nftType: NFTType.COMMUNITY,
            iteration: iteration,
            mintTime: block.timestamp
        });
        
        emit NFTMinted(to, tokenId, NFTType.COMMUNITY, iteration);
    }
    
    /**
     * @dev Mint Challenger NFT (only callable by game contract)
     * @param to Recipient address
     * @param iteration NFT iteration
     */
    function mintChallengerNFT(address to, uint256 iteration) external onlyGameContract {
        if (to == address(0)) revert ZeroAddressNotAllowed();
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        nftInfo[tokenId] = NFTInfo({
            nftType: NFTType.CHALLENGER,
            iteration: iteration,
            mintTime: block.timestamp
        });
        
        emit NFTMinted(to, tokenId, NFTType.CHALLENGER, iteration);
    }
    
    /**
     * @dev Mint Winner NFT (only callable by game contract)
     * @param to Recipient address
     * @param iteration NFT iteration
     */
    function mintWinnerNFT(address to, uint256 iteration) external onlyGameContract {
        if (to == address(0)) revert ZeroAddressNotAllowed();
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        nftInfo[tokenId] = NFTInfo({
            nftType: NFTType.WINNER,
            iteration: iteration,
            mintTime: block.timestamp
        });
        
        emit NFTMinted(to, tokenId, NFTType.WINNER, iteration);
    }
    
    /**
     * @dev Admin mint NFT for testing purposes (only owner)
     * @param to Recipient address
     * @param nftType NFT type (0=Community, 1=Challenger, 2=Winner)
     * @param iteration NFT iteration
     */
    function adminMintNFT(address to, uint8 nftType, uint256 iteration) external onlyOwner {
        if (to == address(0)) revert ZeroAddressNotAllowed();
        if (nftType > 2) revert("Invalid NFT type");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        nftInfo[tokenId] = NFTInfo({
            nftType: NFTType(nftType),
            iteration: iteration,
            mintTime: block.timestamp
        });
        
        emit NFTMinted(to, tokenId, NFTType(nftType), iteration);
    }
    
    /**
     * @dev Get NFT information
     * @param tokenId Token ID to query
     * @return nftType NFT type
     * @return iteration NFT iteration
     * @return mintTime NFT mint time
     */
    function getNFTInfo(uint256 tokenId) external view returns (uint8 nftType, uint256 iteration, uint256 mintTime) {
        _requireOwned(tokenId);
        
        NFTInfo memory info = nftInfo[tokenId];
        return (uint8(info.nftType), info.iteration, info.mintTime);
    }
    
    /**
     * @dev Return token URI for a specific token ID
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        _requireOwned(tokenId);
        
        NFTInfo memory info = nftInfo[tokenId];
        string memory baseURI = _baseURI();
        
        // If there's no base URI, return empty string
        if (bytes(baseURI).length == 0) {
            return "";
        }
        
        // Determine path by NFT type
        string memory typePath;
        if (info.nftType == NFTType.COMMUNITY) {
            typePath = "community";
        } else if (info.nftType == NFTType.CHALLENGER) {
            typePath = "challenger";
        } else {
            typePath = "winner";
        }
        
        // URI format: baseURI/type/iteration/tokenId.(png/gif/jpg)
        // Format adjusted for image files
        return string(
            abi.encodePacked(
                baseURI, 
                typePath, "/", 
                info.iteration.toString(), "/", 
                tokenId.toString()
            )
        );
    }
    
    /**
     * @dev Get the number of NFTs owned by an address
     * @param owner Address to check
     * @return Number of NFTs owned
     */
    function getNFTCount(address owner) external view returns (uint256) {
        return balanceOf(owner);
    }
    
    /**
     * @dev Override to control NFT transfers
     * Community NFTs are soulbound, Winner/Challenger NFTs have 1 iteration lock
     */
    function _update(address to, uint256 tokenId, address auth) 
        internal 
        override(ERC721) 
        returns (address) 
    {
        address from = _ownerOf(tokenId);
        
        // Allow minting (from == address(0)) and burning (to == address(0))
        if (from != address(0) && to != address(0)) {
            NFTInfo memory info = nftInfo[tokenId];
            
            // Community NFTs are permanently soulbound
            if (info.nftType == NFTType.COMMUNITY) {
                revert("Community NFTs are non-transferable");
            }
            
            // Winner/Challenger NFTs: 1 iteration lock after mint
            if (gameCurrentIteration < info.iteration + TRANSFER_LOCK_ITERATIONS) {
                revert("NFT locked: wait 1 iteration after mint");
            }
        }
        
        return super._update(to, tokenId, auth);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
}