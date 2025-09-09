"use client";

import { Card } from "@/components/ui/card";

export function SmartContractsSection() {
  return (
    <Card className="p-8 backdrop-blur-sm bg-background/50">
      <h3 className="text-2xl font-semibold mb-6 text-center">Smart Contract Architecture</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-muted/50">
          <h4 className="text-xl font-semibold mb-4">NerixGame.sol</h4>
          <p className="text-muted-foreground mb-4">
            Main game contract handling message fees, prize pools, and reward distribution
          </p>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-background/50">
              <h5 className="font-medium mb-2">Key Functions</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <div>
                    <code className="font-mono">startFirstGame()</code>
                    <p className="text-xs text-muted-foreground">Initializes the first game iteration with the initial prize pool</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <div>
                    <code className="font-mono">sendMessage(string calldata content, uint256 nftId)</code>
                    <p className="text-xs text-muted-foreground">Processes message fees, applies NFT bonuses, and updates prize pool</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <div>
                    <code className="font-mono">declareWinner(address winner, address[3] memory topChallengers, address[] memory participants)</code>
                    <p className="text-xs text-muted-foreground">Distributes prize to winner, mints NFTs, and prepares next iteration</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <div>
                    <code className="font-mono">calculateMessageFee(address user, uint256 nftId)</code>
                    <p className="text-xs text-muted-foreground">Calculates message fee with NFT discounts and growth rate</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <div>
                    <code className="font-mono">_prepareNextIteration()</code>
                    <p className="text-xs text-muted-foreground">Internal function to set up the next game iteration</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <h5 className="font-medium mb-2">Security Features</h5>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Reentrancy protection with nonReentrant modifier</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Access control with onlyOwner modifier</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Pausable functionality for emergency stops</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Checks-effects-interactions pattern</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Integer overflow protection with SafeMath</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-muted/50">
          <h4 className="text-xl font-semibold mb-4">NerixNFT.sol</h4>
          <p className="text-muted-foreground mb-4">
            NFT contract for minting and managing functional NFTs with gameplay benefits
          </p>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-background/50">
              <h5 className="font-medium mb-2">Key Functions</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">mintCommunityNFT(address to, uint256 iteration)</code>
                    <p className="text-xs text-muted-foreground">Mints Community NFTs for all participants</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">mintChallengerNFT(address to, uint256 iteration)</code>
                    <p className="text-xs text-muted-foreground">Mints Challenger NFTs for top 3 players</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">mintWinnerNFT(address to, uint256 iteration)</code>
                    <p className="text-xs text-muted-foreground">Mints Winner NFT for the game winner</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">_calculateLegacyBonus(uint256 currentIteration, uint256 nftIteration)</code>
                    <p className="text-xs text-muted-foreground">Calculates legacy bonuses based on iteration gap</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">incrementIteration()</code>
                    <p className="text-xs text-muted-foreground">Updates the current iteration counter</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <h5 className="font-medium mb-2">NFT Metadata Structure</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">struct NFTInfo</code>
                    <p className="text-xs text-muted-foreground">
                      {`{
  NFTType nftType;      // Community, Challenger, or Winner
  uint256 iteration;    // Game iteration when minted
  uint256 mintTime;     // Timestamp of minting
}`}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">getNFTInfo(uint256 tokenId)</code>
                    <p className="text-xs text-muted-foreground">Returns NFT type, iteration, and mint time</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                  <div>
                    <code className="font-mono">tokenURI(uint256 tokenId)</code>
                    <p className="text-xs text-muted-foreground">Generates dynamic metadata URI based on NFT properties</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}