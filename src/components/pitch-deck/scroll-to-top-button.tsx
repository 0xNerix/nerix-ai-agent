"use client";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

interface ScrollToTopButtonProps {
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export function ScrollToTopButton({ contentRef }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Always scroll the window since that's what's actually scrolling
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        size="icon" 
        onClick={scrollToTop}
        className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}