"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { logger } from "@/lib/utils/logger";

interface WelcomeVideoProps {
  onComplete: () => void;
}

export function WelcomeVideo({ onComplete }: WelcomeVideoProps) {
  const [isSkipped, setIsSkipped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        logger.error("Video autoplay failed:", error);
        onComplete();
      });
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    localStorage.setItem('welcome-video-shown', 'true');
    onComplete();
  };

  const handleSkip = () => {
    setIsSkipped(true);
    localStorage.setItem('welcome-video-shown', 'true');
    onComplete();
  };

  if (isSkipped) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
          onEnded={handleVideoEnd}
        >
          <source src="https://7jsxl3xxguupi3ak.public.blob.vercel-storage.com/public/nerix-intro-video-1080.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Skip Button - Centered Bottom */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={handleSkip}
          className="bg-background/20 hover:bg-background/40 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3"
        >
          <X className="w-4 h-4 mr-2" />
          Skip Intro
        </Button>
      </div>
    </div>
  );
}