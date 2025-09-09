# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Nerix**, an AI-powered on-chain gaming platform built on BNB Chain where users challenge a self-evolving AI using natural language to win BNB prize pools and collect evolving NFTs. The application is a Next.js 15 web application with Web3 integration, database management, and AI gaming mechanics.

## Tech Stack

- **Frontend**: Next.js 15 with React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Web3**: RainbowKit + Wagmi for wallet connection, BNB Chain (BSC) integration
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with custom theme and animations
- **Analytics**: Vercel Analytics
- **Forms**: React Hook Form with Zod validation

## Development Commands

```bash
# Start development server
npm run dev

# Start development server with HTTPS
npm run dev:https

# Build for production
npm run build

# Build with bundle analyzer
npm run build:analyze

# Start production server
npm start

# Run linting
npm run lint

# Database operations
npm run db:generate    # Generate migrations from schema
npm run db:push        # Push schema changes to database
npm run db:migrate     # Run database migrations
npm run db:studio      # Open Drizzle Studio
```

## Project Architecture

### Core Application Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components including shadcn/ui components
- `src/lib/` - Utility functions, hooks, configurations, and services
- `src/data/` - Static data files (legal content, NFT metadata, airdrop config)
- `src/types/` - TypeScript type definitions

### Web3 Integration

The application uses RainbowKit and Wagmi for Web3 functionality:
- Wallet connection configured in `src/lib/wagmi.ts`
- Supports BNB Chain (BSC) mainnet and testnet
- Web3 providers wrapped in `src/app/providers.tsx`

### Database Architecture

The application uses Neon PostgreSQL with Drizzle ORM:
- Database configuration in `drizzle.config.ts`
- Schema migrations in `./src/database/migrations`
- Core entities include Games, Messages, Participants, NFTs, and Wallets
- Authentication system with wallet signature verification

### API Architecture

RESTful API routes in `src/app/api/`:
- `/api/games` - Game management and listing
- `/api/games/[id]` - Individual game operations and details
- `/api/games/[id]/messages` - Game messaging and AI interactions
- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/auth/beta-access` & `/api/auth/beta-status` - Beta access management
- `/api/profile/[address]` - User profile data
- `/api/airdrop` & `/api/airdrop/check` - Airdrop system
- `/api/notifications` & `/api/notifications/subscribe` - Push notifications
- `/api/support` - Support system
- `/api/system-status` - Platform health monitoring

### UI and Theming

- Uses shadcn/ui component system with Radix UI primitives
- Dark/light theme support via next-themes
- Custom CSS variables for theming in `src/app/globals.css`
- Component configuration in `components.json`

### Key Features

1. **AI Gaming**: Natural language challenges against evolving AI
2. **Prize Pools**: BNB rewards distributed via smart contracts
3. **Evolving NFTs**: NFTs that grow stronger with gameplay
4. **Wallet Authentication**: Signature-based auth with nonces
5. **Game Iterations**: Rounds with cooldown periods

## Environment Variables Required

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_API_URL` - API base URL (defaults to localhost:3000)
- Additional OpenAI, notification service, and analytics environment variables may be required

## Key Architecture Patterns

### Component Architecture
- Landing page organized into feature-based sections (`src/components/landing/`)
- Game detail components modularized by functionality (`src/components/games/game-detail/`)
- Reusable UI components follow shadcn/ui patterns
- Profile system with address-based routing

### Service Layer
- AI integration through OpenAI API (`src/lib/ai/`)
- Contract services for Web3 interactions (`src/lib/hooks/use-contract-services.ts`)
- Notification system with push notification support
- Evolution system for NFT mechanics

### Authentication & Security
- Wallet-based authentication with NextAuth.js
- Server-side auth utilities in `src/lib/auth/`
- Beta access control system
- Rate limiting middleware

### Data Management
- Static game data in `src/data/`
- Consent management for GDPR compliance
- Analytics integration with GTM and Vercel Analytics

## Smart Contract Integration

Games have associated smart contracts:
- `contractAddress` - Main game contract for prize pools
- `nftContractAddress` - NFT contract for rewards
- BNB Chain (BSC) integration for all transactions