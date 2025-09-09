"use client";

import { useState, useEffect } from "react";
import { useUrlHash, Section } from "./use-url-hash";

export function useMobileNavigation() {
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [isMobile, setIsMobile] = useState(false);
  const { getCurrentHashSection, updateHash, onHashChange } = useUrlHash();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const initialSection = getCurrentHashSection();
    setCurrentSection(initialSection);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const cleanup = onHashChange((newSection) => {
      setCurrentSection(newSection);
    });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      cleanup();
    };
  }, [getCurrentHashSection, onHashChange]);

  const navigateToSection = (section: Section) => {
    updateHash(section);
    
    if (isMobile) {
      setCurrentSection(section);
    } else {
      const element = document.getElementById(section);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToTop = () => {
    updateHash('hero');
    
    if (isMobile) {
      setCurrentSection('hero');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return {
    currentSection,
    isMobile,
    navigateToSection,
    scrollToTop,
    setCurrentSection: (section: Section) => {
      updateHash(section);
      setCurrentSection(section);
    }
  };
}