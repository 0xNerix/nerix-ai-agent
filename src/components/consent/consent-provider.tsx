'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getConsentPreferences, hasConsented, isConsentStale } from '@/lib/consent-manager';
import { updateConsent, grantConsent, pageview } from '@/lib/gtm';
import { CookiePreferences } from '@/types/gtm';
import { usePathname } from 'next/navigation';

interface ConsentContextType {
  preferences: CookiePreferences | null;
  hasUserConsented: boolean;
  refreshConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType>({
  preferences: null,
  hasUserConsented: false,
  refreshConsent: () => {},
});

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasUserConsented, setHasUserConsented] = useState(false);
  const pathname = usePathname();

  const refreshConsent = () => {
    const savedPreferences = getConsentPreferences();
    setPreferences(savedPreferences);
    setHasUserConsented(hasConsented());
    
    if (savedPreferences) {
      updateConsent(grantConsent(savedPreferences));
    }
  };

  useEffect(() => {
    refreshConsent();
    
    // Check if consent is stale and show banner again
    if (hasConsented() && isConsentStale()) {
      setHasUserConsented(false);
    }
  }, []);

  // Track page views with consent
  useEffect(() => {
    if (hasUserConsented && preferences?.analytics) {
      pageview(pathname);
    }
  }, [pathname, hasUserConsented, preferences?.analytics]);

  return (
    <ConsentContext.Provider value={{ preferences, hasUserConsented, refreshConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export const useConsent = () => useContext(ConsentContext);
