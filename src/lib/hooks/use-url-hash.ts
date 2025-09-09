"use client";

import { useCallback } from "react";

export type Section = 'hero' | 'games' | 'nfts' | 'airdrop' | 'gallery' | 'technologies' | 'community';

export function useUrlHash() {

  const getCurrentHashSection = useCallback((): Section => {
    if (typeof window === 'undefined') return 'hero';
    const hash = window.location.hash.slice(1);
    const validSections: Section[] = ['hero', 'games', 'nfts', 'airdrop', 'gallery', 'technologies', 'community'];
    return validSections.includes(hash as Section) ? (hash as Section) : 'hero';
  }, []);

  const updateHash = useCallback((section: Section) => {
    if (typeof window !== 'undefined') {
      const newHash = section === 'hero' ? '' : `#${section}`;
      
      if (window.location.hash !== newHash) {
        const newUrl = `${window.location.pathname}${window.location.search}${newHash}`;
        window.history.replaceState(null, '', newUrl);
      }
    }
  }, []);

  const onHashChange = useCallback((callback: (section: Section) => void) => {
    const handleHashChange = () => {
      const newSection = getCurrentHashSection();
      callback(newSection);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [getCurrentHashSection]);

  return {
    getCurrentHashSection,
    updateHash,
    onHashChange
  };
}