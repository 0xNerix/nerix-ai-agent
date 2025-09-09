import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { wallets, messages, userNfts, participants, games, betaAccessLogs } from '@/database/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { z } from 'zod';
import { isAddress } from 'viem';
import type { ProfileData } from '@/components/profile/types';
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    // Validate address parameter
    if (!address || !isAddress(address)) {
      throw new ApiError(ErrorCode.INVALID_WALLET_ADDRESS, 'Valid wallet address is required', 400, { address });
    }

    // Check if wallet exists
    const wallet = await db.query.wallets.findFirst({
      where: eq(wallets.address, address)
    });

    // Check for beta access from logs
    const betaAccessResult = await db
      .select({
        hasBetaAccess: sql<boolean>`COUNT(*) > 0`,
        firstBetaCode: sql<string>`MIN(${betaAccessLogs.betaCodeId})`,
        firstUsedAt: sql<Date>`MIN(${betaAccessLogs.usedAt})`
      })
      .from(betaAccessLogs)
      .where(eq(betaAccessLogs.walletAddress, address));

    const betaAccess = betaAccessResult[0] || { hasBetaAccess: false, firstBetaCode: null, firstUsedAt: null };

    // If no wallet found, return empty profile data
    if (!wallet) {
      const emptyProfileData: ProfileData = {
        user: {
          address,
          displayName: undefined,
          avatar: undefined,
          createdAt: new Date().toISOString(),
          hasBetaAccess: betaAccess.hasBetaAccess
        },
        stats: {
          totalGames: 0,
          totalMessages: 0,
          totalNFTs: 0
        },
        conversations: [],
        nfts: []
      };
      
      return NextResponse.json(emptyProfileData);
    }

    // Get user messages (user only)
    const userMessages = await db
      .select({
        id: messages.id,
        content: messages.content,
        gameId: messages.gameId,
        gameName: games.name,
        createdAt: messages.createdAt,
        iteration: messages.iteration,
        messageFee: messages.messageFee,
        transactionHash: messages.transactionHash
      })
      .from(messages)
      .innerJoin(participants, eq(messages.participantId, participants.id))
      .innerJoin(games, eq(messages.gameId, games.id))
      .where(and(
        eq(participants.userAddress, address),
        eq(messages.role, 'user')
      ))
      .orderBy(desc(messages.createdAt))
      .limit(50);

    // Get AI responses
    const aiResponses = await db
      .select({
        id: messages.id,
        content: messages.content,
        createdAt: messages.createdAt,
        parentMessageId: messages.parentMessageId,
        isWinningMessage: messages.isWinningMessage
      })
      .from(messages)
      .where(eq(messages.role, 'assistant'));

    // Get user NFTs
    const userNFTsList = await db
      .select({
        id: userNfts.id,
        tokenId: userNfts.tokenId,
        nftType: userNfts.nftType,
        iteration: userNfts.iteration,
        mintTime: userNfts.mintTime
      })
      .from(userNfts)
      .where(and(
        eq(userNfts.ownerAddress, address),
        eq(userNfts.isActive, true)
      ))
      .orderBy(desc(userNfts.mintTime));

    // Create AI response lookup
    const aiResponseMap = new Map();
    aiResponses.forEach(response => {
      if (response.parentMessageId) {
        aiResponseMap.set(response.parentMessageId, response);
      }
    });

    // Build conversations
    const conversations = userMessages.map(msg => ({
      id: msg.id,
      content: msg.content,
      gameId: msg.gameId,
      gameName: msg.gameName,
      createdAt: msg.createdAt.toISOString(),
      iteration: msg.iteration,
      messageFee: msg.messageFee || undefined,
      transactionHash: msg.transactionHash || undefined,
      aiResponse: aiResponseMap.has(msg.id) ? {
        id: aiResponseMap.get(msg.id).id,
        content: aiResponseMap.get(msg.id).content,
        createdAt: aiResponseMap.get(msg.id).createdAt.toISOString(),
        isWinningMessage: aiResponseMap.get(msg.id).isWinningMessage
      } : undefined
    }));

    // Build NFTs
    const nfts = userNFTsList.map(nft => ({
      id: nft.id,
      tokenId: nft.tokenId.toString(),
      name: getNFTName(nft.nftType, nft.iteration),
      nftType: nft.nftType,
      iteration: nft.iteration,
      mintTime: nft.mintTime.toISOString()
    }));

    // Calculate stats
    const stats = {
      totalGames: new Set(userMessages.map(m => m.gameId)).size,
      totalMessages: userMessages.length,
      totalNFTs: nfts.length
    };

    const profileData: ProfileData = {
      user: {
        address,
        displayName: wallet?.displayName || undefined,
        avatar: wallet?.profileImage || undefined,
        createdAt: wallet?.createdAt?.toISOString() || new Date().toISOString(),
        hasBetaAccess: betaAccess.hasBetaAccess
      },
      stats,
      conversations,
      nfts
    };

    return NextResponse.json(profileData);

  } catch (error) {
    return handleApiError(error, request);
  }
}

// Helper function
function getNFTName(nftType: string, iteration: number): string {
  const typeNames = {
    community: 'Community Member',
    challenger: 'Top Challenger', 
    winner: 'Game Winner'
  };
  return `${typeNames[nftType as keyof typeof typeNames] || 'NFT'} #${iteration}`;
}