"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Gamepad2, ChevronLeft, ChevronRight, X, Play, Image as ImageIcon, Film } from "lucide-react";
import Image from "next/image";

interface Asset {
  id: string;
  type: 'image' | 'video' | 'gif' | 'iframe';
  thumbnail?: string;
  source: string;
  title: string;
  description: string;
}

const assets: Asset[] = [
    {
        id: "nerix-chess-paradox",
        type: "video",
        thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-chess-paradox.png",
        source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-chess-paradox.mp4",
        title: "Nerix Chess Paradox",
        description: "Explore the chess paradox gameplay"
    },
    {
      id: "nerix-nft-winner",
      type: "video",
      thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-winner.png",
      source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-winner.mp4",
      title: "Nerix NFT Winner",
      description: "Winning NFT showcase"
    },
    {
      id: "nerix-nft-challanger",
      type: "video",
      thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-challanger.png",
      source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-challanger.mp4",
      title: "Nerix NFT Challenger",
      description: "NFT Challenger video showcase"
    },
    {
      id: "nerix-nft-community",
      type: "video",
      thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-community.png",
      source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-nft-community.mp4",
      title: "Nerix NFT Community",
      description: "Community features in NFTs"
    },
    {
        id: "nerix-assets-history",
        type: "iframe",
        source: "https://streamable.com/e/jcacy5",
        title: "Nerix - Assets History",
        description: "Historical overview of Nerix assets"
    },
    {
        id: "nerix-visual-timeline",
        type: "iframe",
        source: "https://streamable.com/e/gfq8fy",
        title: "Nerix - Visual Timeline",
        description: "Visual timeline of Nerix development"
    },
    {
        id: "nerix-nft-showcase-mix",
        type: "iframe",
        source: "https://streamable.com/e/qbznws",
        title: "Nerix - NFT Showcase Mix",
        description: "Mixed showcase of Nerix NFTs"
    },
    {
      id: "nerix-intro-video",
      type: "video",
      thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-logo.png",
      source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-intro-video-4k.mp4",
      title: "Nerix Intro Video",
      description: "Introduction to Nerix"
    },
    {
      id: "nerix-512-logo",
      type: "image",
      thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png",
      source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-512-logo.png",
      title: "Nerix Logo 512",
      description: "High-resolution Nerix logo"
    },
    {
      id: "logo-text-dark",
      type: "image",
      thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg",
      source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-dark.svg",
      title: "Logo Text Dark",
      description: "Dark themed logo text"
    },
    {
      id: "logo-text-light",
      type: "image",
      thumbnail: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg",
      source: "https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/logo-text-light.svg",
      title: "Logo Text Light",
      description: "Light themed logo text"
    }
  ];

export function AssetGallery() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [visibleAssets, setVisibleAssets] = useState(3);
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      setVisibleAssets(prev => Math.min(prev + 3, assets.length));
    }
  }, [inView]);

  const openModal = (asset: Asset) => {
    const index = assets.findIndex(a => a.id === asset.id);
    setSelectedIndex(index);
    setSelectedAsset(asset);
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  const navigateAsset = useCallback((direction: 'prev' | 'next') => {
    let newIndex = direction === 'prev' ? selectedIndex - 1 : selectedIndex + 1;
    
    if (newIndex < 0) newIndex = assets.length - 1;
    if (newIndex >= assets.length) newIndex = 0;
    
    setSelectedIndex(newIndex);
    setSelectedAsset(assets[newIndex]);
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAsset) return;

      if (e.key === 'ArrowLeft') {
        navigateAsset('prev');
      } else if (e.key === 'ArrowRight') {
        navigateAsset('next');
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAsset, selectedIndex, navigateAsset]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-accent/20 via-accent/25 to-accent/15">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
              style={{
                top: `${25 + i * 25}%`,
                opacity: 0.5,
                scale: 0.8,
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: 9999,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">

          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-orange-500 to-accent blur-2xl opacity-30" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-accent via-orange-500 to-accent animate-gradient-x">
                Experience Nerix
              </span>
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore our revolutionary platform through stunning visuals and gameplay footage
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assets.slice(0, visibleAssets).map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group relative overflow-hidden backdrop-blur-sm bg-background/20 border-primary/10 hover:bg-background/30 hover:border-primary/20 transition-all duration-500 cursor-pointer"
                onClick={() => openModal(asset)}
                onMouseEnter={() => asset.type === 'iframe' && setHoveredAsset(asset.id)}
                onMouseLeave={() => asset.type === 'iframe' && setHoveredAsset(null)}
              >
                <div className="relative aspect-video overflow-hidden">
                  {asset.type === 'iframe' ? (
                    <div className="relative w-full h-full">
                      {hoveredAsset === asset.id ? (
                        <>
                          <iframe 
                            src={`${asset.source}?autoplay=1`}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            frameBorder="0" 
                            allowFullScreen
                            allow="autoplay; fullscreen"
                            style={{
                              width: '100%',
                              height: '100%',
                              border: 'none',
                              borderRadius: 'inherit'
                            }}
                          />
                          <div className="absolute inset-0 bg-transparent pointer-events-none" />
                        </>
                      ) : (
                        <>
                          <iframe 
                            src={asset.source}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            frameBorder="0" 
                            allowFullScreen
                            allow="autoplay; fullscreen"
                            style={{
                              width: '100%',
                              height: '100%',
                              border: 'none',
                              borderRadius: 'inherit'
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="bg-primary/20 p-4 rounded-full backdrop-blur-sm">
                              <Film className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : asset.type === 'video' ? (
                    <div className="relative w-full h-full group">
                      <video
                        ref={el => { videoRefs.current[index] = el }}
                        src={asset.source}
                        poster={asset.thumbnail}
                        className="w-full h-full object-contain"
                        loop
                        muted
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/0 transition-all duration-300 pointer-events-none flex items-center justify-center">
                        <div className="bg-primary/20 p-4 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full group">
                      <Image
                        src={asset.source}
                        alt={asset.title}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-primary/20 p-4 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Trigger */}
        {visibleAssets < assets.length && (
          <div ref={ref} className="h-20 flex items-center justify-center mt-8">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: 9999,
                ease: "easeInOut",
              }}
              className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <Gamepad2 className="w-6 h-6 text-primary" />
            </motion.div>
          </div>
        )}

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {selectedAsset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            >
              <div className="relative w-full h-full max-w-7xl mx-auto flex">
                {/* Left Side - Thumbnail (only for video type with thumbnail) */}
                {selectedAsset.type === 'video' && selectedAsset.thumbnail && (
                  <div className="w-1/2 h-full p-4 flex items-center">
                    <div className="w-full h-auto rounded-lg overflow-hidden">
                      <Image
                        src={selectedAsset.thumbnail}
                        alt="Video thumbnail"
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-[80vh] rounded-lg object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Right Side - Content */}
                <div className={`${selectedAsset.type === 'video' && selectedAsset.thumbnail ? 'w-1/2' : 'w-full'} h-full p-4 flex items-center justify-center`}>
                  {selectedAsset.type === 'iframe' ? (
                    <div className="w-full max-w-5xl aspect-video rounded-lg overflow-hidden">
                      <iframe 
                        src={`${selectedAsset.source}?autoplay=1`}
                        className="w-full h-full"
                        frameBorder="0" 
                        allowFullScreen
                        allow="autoplay; fullscreen"
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: 'inherit'
                        }}
                      />
                    </div>
                  ) : selectedAsset.type === 'video' ? (
                    <video
                      ref={modalVideoRef}
                      src={selectedAsset.source}
                      className="max-w-full max-h-[80vh] rounded-lg"
                      controls
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={selectedAsset.source}
                        alt={selectedAsset.title}
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-[80vh] rounded-lg object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateAsset('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateAsset('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Close Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={closeModal}
                  className="absolute right-4 top-4 bg-background/20 backdrop-blur-sm hover:bg-background/40"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}