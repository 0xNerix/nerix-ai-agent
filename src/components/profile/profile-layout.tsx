"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Image as Img, ArrowLeft, MessageCircle, MessagesSquare } from 'lucide-react';
import Link from 'next/link';
import { ProfileBackground } from './profile-background';
import { HeaderAuth } from '@/components/layout/header-auth';
import { ProfileHeader } from './profile-header';
import { ProfileStats } from './profile-stats';
import { ConversationList } from './conversation-list';
import { NFTGrid } from './profile-nft-grid';
import type { ProfileData } from '@/components/profile/types';

interface ProfileLayoutProps {
  profileData: ProfileData;
}

export function ProfileLayout({ profileData }: ProfileLayoutProps) {
  const [activeTab, setActiveTab] = useState<'messages' | 'nfts'>('messages');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-accent/15 via-teal-500/10 to-cyan-500/10">
      {/* Background Effects */}
      <ProfileBackground />
      
      {/* Header Auth */}
      <HeaderAuth />

      {/* Back to Home Button */}
      <div className="fixed top-4 left-6 z-50">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-4 py-2 bg-background/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg hover:bg-background/60 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                Back to Home
              </span>
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen pt-10 max-w-full">
        {/* Left Sidebar */}
        <div className="lg:w-96 w-full flex-shrink-0 p-4 lg:p-6">
          <div className="lg:sticky lg:top-6 space-y-4 lg:space-y-6">
            {/* Profile Header - Compact for Sidebar with Orange Theme */}
            <div className="bg-background/40 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-4 lg:p-6 shadow-lg shadow-orange-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 rounded-2xl" />
              <div className="relative">
                <ProfileHeader user={profileData.user} />
              </div>
            </div>

            {/* Stats */}
            <div className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <ProfileStats stats={profileData.stats} />
            </div>


            {/* Navigation Menu - Floating */}
            <nav className="flex lg:flex-col gap-2 lg:gap-3 lg:space-y-0 overflow-x-auto lg:overflow-x-visible">
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full lg:w-auto flex-shrink-0 flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl text-left transition-all duration-300 backdrop-blur-xl border shadow-lg ${
                  activeTab === 'messages'
                    ? 'bg-blue-500/20 text-blue-500 border-blue-500/30 shadow-blue-500/20'
                    : 'bg-background/40 border-white/10 text-muted-foreground hover:text-foreground hover:bg-background/60 hover:border-white/20'
                }`}
              >
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activeTab === 'messages' ? 'bg-blue-500/30' : 'bg-blue-500/20'
                }`}>
                  <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm lg:text-base font-semibold truncate">Messages</span>
                  <span className="text-xs lg:text-sm opacity-70 truncate hidden lg:block">{profileData.conversations.length} conversations</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('nfts')}
                className={`w-full lg:w-auto flex-shrink-0 flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl text-left transition-all duration-300 backdrop-blur-xl border shadow-lg ${
                  activeTab === 'nfts'
                    ? 'bg-purple-500/20 text-purple-500 border-purple-500/30 shadow-purple-500/20'
                    : 'bg-background/40 border-white/10 text-muted-foreground hover:text-foreground hover:bg-background/60 hover:border-white/20'
                }`}
              >
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activeTab === 'nfts' ? 'bg-purple-500/30' : 'bg-purple-500/20'
                }`}>
                  <Img className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm lg:text-base font-semibold truncate">NFTs</span>
                  <span className="text-xs lg:text-sm opacity-70 truncate hidden lg:block">{profileData.nfts.length} collectibles</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 p-4 lg:p-6">
          <div className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-6 min-h-full w-full">
            {activeTab === 'messages' && (
              <div className="space-y-4 lg:space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-blue-400">Conversations</h2>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Your game messages and AI responses ({profileData.conversations.length})
                    </p>
                  </div>
                </div>
                <ConversationList conversations={profileData.conversations} />
              </div>
            )}

            {activeTab === 'nfts' && (
              <div className="space-y-4 lg:space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Img className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-purple-400">NFT Collection</h2>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Your earned NFTs from games ({profileData.nfts.length})
                    </p>
                  </div>
                </div>
                <NFTGrid nfts={profileData.nfts} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}