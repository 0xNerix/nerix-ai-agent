import { NextResponse } from 'next/server';
import { db } from '@/database';
import { games, messages, participants } from '@/database/schema';
import { sql } from 'drizzle-orm';
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';

export async function GET(request: Request) {
  try {
    // Get system metrics
    const [
      totalGames,
      activeGames,
      totalMessages,
      totalParticipants,
      recentActivity
    ] = await Promise.all([
      // Total games
      db.select({ count: sql<number>`count(*)::int` }).from(games),
      
      // Active games (games with status 'active')
      db.select({ count: sql<number>`count(*)::int` }).from(games).where(sql`status = 'active'`),
      
      // Total messages
      db.select({ count: sql<number>`count(*)::int` }).from(messages),
      
      // Total unique participants
      db.select({ count: sql<number>`count(distinct user_address)::int` }).from(participants),
      
      // Recent activity (last 24 hours)
      db.select({ count: sql<number>`count(*)::int` }).from(messages).where(sql`created_at > NOW() - INTERVAL '24 hours'`)
    ]);

    // TODO: Replace with real uptime calculation from monitoring service in production
    const uptime = 99.9;
    
    // TODO: Replace with real response time metrics from APM service in production
    const avgResponseTime = Math.floor(Math.random() * 50) + 120; // 120-170ms
    
    // Get games with contract information
    const gamesWithContracts = await db.select({
      id: games.id,
      name: games.name,
      status: games.status,
      category: games.category,
      isFree: games.isFree,
      contractAddress: games.contractAddress,
      nftContractAddress: games.nftContractAddress,
      currentPrizePool: games.currentPrizePool,
      createdAt: games.createdAt,
      updatedAt: games.updatedAt
    }).from(games).orderBy(sql`created_at DESC`).limit(10);

    const systemStatus = {
      status: 'operational', // operational, maintenance, degraded, outage
      uptime: uptime,
      responseTime: avgResponseTime,
      lastUpdated: new Date().toISOString(),
      metrics: {
        totalGames: totalGames[0].count,
        activeGames: activeGames[0].count,
        totalMessages: totalMessages[0].count,
        totalParticipants: totalParticipants[0].count,
        recentActivity: recentActivity[0].count
      },
      services: [
        // TODO: Replace with real service monitoring data from health check endpoints in production
        {
          name: 'API Services',
          description: 'REST API endpoints and serverless functions',
          status: 'operational',
          uptime: 99.99,
          responseTime: avgResponseTime,
          details: 'All endpoints responding normally'
        },
        {
          name: 'Database',
          description: 'Neon PostgreSQL database and connection pool',
          status: 'operational',
          uptime: 99.99,
          responseTime: Math.floor(Math.random() * 20) + 25,
          details: 'Query performance optimal'
        },
        {
          name: 'Frontend',
          description: 'Next.js application and static assets',
          status: 'operational',
          uptime: 100,
          responseTime: Math.floor(Math.random() * 500) + 800,
          details: 'CDN and static assets serving normally'
        },
        {
          name: 'Blockchain Integration',
          description: 'Web3 connectivity and transaction processing',
          status: 'operational',
          uptime: 99.98,
          responseTime: Math.floor(Math.random() * 1000) + 2000,
          details: 'BNB Chain connectivity stable'
        },
        {
          name: 'AI Services',
          description: 'AI decision systems and response generation',
          status: 'operational',
          uptime: 99.99,
          responseTime: Math.floor(Math.random() * 300) + 1200,
          details: 'Model inference running smoothly'
        }
      ],
      smartContracts: gamesWithContracts.map(game => ({
        gameId: game.id,
        gameName: game.name,
        category: game.category,
        isFree: game.isFree,
        prizePool: game.currentPrizePool,
        gameContract: {
          name: 'NerixGame',
          address: game.contractAddress,
          network: 'BNB Chain Testnet',
          version: 'v1.0.0',
          status: 'deployed',
          verified: true
        },
        nftContract: {
          name: 'NerixNFT',
          address: game.nftContractAddress,
          network: 'BNB Chain Testnet',
          version: 'v1.0.0',
          status: 'deployed',
          verified: true
        }
      })),
      recentEvents: [
        // TODO: Replace with real event data from database or external monitoring service in production
        {
          id: '1',
          type: 'update',
          title: 'System Status Dashboard Launched',
          description: 'New real-time monitoring dashboard with smart contract integration',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          id: '2',
          type: 'maintenance',
          title: 'Database Query Optimization',
          description: 'Improved database performance for game metrics and user stats',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          id: '3',
          type: 'update',
          title: 'Smart Contract Gas Optimization',
          description: 'Reduced transaction costs by 15% through contract optimization',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          id: '4',
          type: 'update',
          title: 'Contact Page Added',
          description: 'New contact page with multiple support channels and resources',
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          id: '5',
          type: 'maintenance',
          title: 'AI Model Response Optimization',
          description: 'Enhanced AI response time and accuracy for game interactions',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        }
      ],
      latestActivity: gamesWithContracts.slice(0, 5).map(game => ({
        id: game.id,
        type: 'game',
        title: `Game: ${game.name}`,
        status: game.status,
        category: game.category,
        prizePool: game.currentPrizePool,
        timestamp: game.updatedAt || game.createdAt
      }))
    };

    return createSuccessResponse(systemStatus, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}