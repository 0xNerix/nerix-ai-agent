# Nerix AI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![BNB Chain](https://img.shields.io/badge/blockchain-BNB%20Chain-f0b90b.svg)](https://bnbchain.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.6+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/next.js-15+-black.svg)](https://nextjs.org/)

**Challenge the AI. Win BNB. Collect Evolving NFTs.**

Nerix is an experimental AI-powered gaming platform where players challenge a self-evolving AI system through natural language interactions. This project represents a unique experiment where a single developer attempted to build an entire full-stack Web3 platform in **8 months using only AI tools, without writing a single line of code manually**. Built on BNB Chain, it combines strategic thinking with blockchain technology to create a unique gaming experience that rewards creativity and persistence.

📖 **Read the full development story**: [Building Nerix: 8 Months, 1 Developer, 0 Lines of Manual Code](https://medium.com/@0xNerix/i-tried-building-something-without-writing-any-code-just-using-ai-tools-the-result-e911fce9f5a6)

## What is Nerix?

Nerix transforms the concept of AI interaction into competitive gameplay. Players attempt to outsmart an AI system called Nerix through strategic conversations and logical challenges. Each game operates similarly to bug bounty programs in cybersecurity — participants search for weaknesses in the AI's logic and reasoning, but instead of security vulnerabilities, they're looking for ways to convince the AI to acknowledge defeat.

Just like security researchers are rewarded for finding system vulnerabilities, Nerix players are rewarded with cryptocurrency and NFTs for successfully challenging the AI. The platform creates a gamified environment where human creativity meets machine intelligence, fostering innovation in AI testing and evaluation.

**The Endless Loop** represents our flagship challenge where players compete against an evolving AI system. This main game demonstrates the platform's core mechanics through strategic AI interactions and cryptocurrency rewards.

Successful players earn evolving NFTs that provide permanent gameplay advantages and serve as functional tools for future challenges. The platform features a comprehensive reward system with multiple NFT tiers and legacy bonuses detailed in the economic model below.

## Technology Stack

Built on modern web technologies including Next.js 15, TypeScript, and Tailwind CSS for the frontend with App Router architecture for optimal performance. Web3 integration uses RainbowKit and Wagmi for seamless wallet connections on BNB Chain. The backend leverages Neon PostgreSQL with Drizzle ORM for type-safe database operations. Multiple AI providers including OpenAI GPT models, Anthropic Claude, and Grok power the intelligent gameplay systems. Smart contracts handle all cryptocurrency transactions, NFT operations, and prize pool distributions.

### Smart Contract System
Two primary Solidity smart contracts power the platform: the main game contract for prize pool management and fee distribution, and the NFT contract for minting and managing evolving NFTs. Currently deployed on BNB Chain, the contracts are designed to be EVM-compatible for future multi-chain expansion. The platform features a **flexible challenge definition system** that allows for new AI challenges to be added over time. While system prompts, rewards, and difficulty levels may vary between challenges, all games operate on the **same core economic model** and smart contract infrastructure. This scalable architecture enables continuous expansion of the platform with diverse AI testing scenarios.

### Economic Model & Game Mechanics

All challenges on the platform follow a sophisticated economic model where each player interaction contributes to growing prize pools. Using **The Endless Loop** as our primary example:

**🎯 Prize Pool Structure**
- Starting amount: **2.5 BNB (~$2,000)** plus carried-over funds
- Fee structure: **0.012 BNB (~$10)** with **0.78%** exponential growth
- Potential: Prize pools can exceed **220 BNB (~$188,000)**

**💰 Fee Distribution (60/20/20 Model)**
- **60%** → Current prize pool (immediate rewards)
- **20%** → Next iteration seed funding  
- **20%** → Platform development & operations

When a player successfully challenges the AI, they claim the entire accumulated prize pool, which can grow substantially after hundreds of attempts. This creates a continuous cycle of adaptation where both human creativity and AI sophistication evolve together.

Each completed game marks a new **iteration** where the AI updates its defenses based on discovered vulnerabilities. NFTs from earlier iterations gain progressive legacy bonuses with diminishing returns over time, creating substantial long-term investment value.

The system features comprehensive **NFT** rewards: Winner and Challenger NFTs provide enhanced gameplay benefits and are **valuable, tradeable assets**, while Community NFTs are **soulbound tokens** with basic improvements. The most critical advantage of Winner and Challenger NFTs is their **fee reduction capability**, providing significant cost savings especially as message fees reach hundreds of dollars in later game stages. The **legacy bonus system** applies to all NFT attributes, making older NFTs exponentially more powerful over time - an iteration 1 Winner NFT can grow from 300 to 900 characters and 20% to 60% fee reduction by iteration 100.

**For more detailed technical documentation and system architecture, visit our** [System Overview](https://nerixai.com/system-overview)

## AI Bug Bounty & Security Research

Nerix operates on principles similar to responsible disclosure in cybersecurity. Players act as researchers testing AI systems for logical vulnerabilities and reasoning flaws. The platform rewards successful "exploits" of the AI's decision-making process, creating a legitimate marketplace for AI testing and evaluation.

This approach benefits the broader AI community by identifying potential weaknesses in AI reasoning and decision-making. Each successful challenge contributes to understanding how AI systems can be improved and made more robust against manipulation.

**Note:** Some critical configuration files and proprietary components have been excluded from this public repository to prevent direct cloning and unauthorized deployment. However, the core architecture and implementation patterns are available for learning and reference.

---

<div align="center">

## 🚀 Explore Nerix

[![Website](https://img.shields.io/badge/🌐_Website-nerixai.com-blue?style=for-the-badge)](https://nerixai.com)
[![Play Now](https://img.shields.io/badge/🎮_Play_Now-Start_Playing-green?style=for-the-badge)](https://nerixai.com/games)

[![Twitter](https://img.shields.io/badge/🐦_Twitter-@0xNerix-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/0xNerix)
[![Discord](https://img.shields.io/badge/💬_Discord-Join_Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/bvxzdHgBPW)

---

### 🤖 *"Challenge the AI. Win the Future."*
*An experimental journey in AI-assisted development*

📖 [Development Story](https://medium.com/@0xNerix/i-tried-building-something-without-writing-any-code-just-using-ai-tools-the-result-e911fce9f5a6) • 🔍 [Technical Docs](https://nerixai.com/system-overview) • 📧 [Contact](mailto:hello@nerixai.com)

</div>
