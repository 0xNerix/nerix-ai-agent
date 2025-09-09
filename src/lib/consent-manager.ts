import { CookiePreferences } from '@/types/gtm';

const CONSENT_COOKIE = 'cookie-preferences';
const CONSENT_TIMESTAMP = 'consent-timestamp';

export const saveConsentPreferences = (preferences: CookiePreferences) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONSENT_COOKIE, JSON.stringify(preferences));
    localStorage.setItem(CONSENT_TIMESTAMP, new Date().toISOString());
    
    // Also set a cookie for server-side access
    const cookieValue = JSON.stringify(preferences);
    document.cookie = `${CONSENT_COOKIE}=${cookieValue}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  }
};

export const getConsentPreferences = (): CookiePreferences | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CONSENT_COOKIE);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse consent preferences:', e);
      }
    }
  }
  return null;
};

export const hasConsented = (): boolean => {
  return getConsentPreferences() !== null;
};

export const clearConsentPreferences = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONSENT_COOKIE);
    localStorage.removeItem(CONSENT_TIMESTAMP);
    document.cookie = `${CONSENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};

export const getConsentTimestamp = (): Date | null => {
  if (typeof window !== 'undefined') {
    const timestamp = localStorage.getItem(CONSENT_TIMESTAMP);
    if (timestamp) {
      return new Date(timestamp);
    }
  }
  return null;
};

export const isConsentStale = (maxAgeMonths: number = 12): boolean => {
  const timestamp = getConsentTimestamp();
  if (!timestamp) return true;
  
  const now = new Date();
  const monthsAgo = new Date(now);
  monthsAgo.setMonth(monthsAgo.getMonth() - maxAgeMonths);
  
  return timestamp < monthsAgo;
};
