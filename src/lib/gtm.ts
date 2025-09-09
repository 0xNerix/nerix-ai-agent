import { ConsentState, CookiePreferences } from '@/types/gtm';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Send page_view event instead of just config
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const updateConsent = (consent: ConsentState) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', consent);
  }
};

export const grantConsent = (preferences: CookiePreferences): ConsentState => {
  return {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
    functionality_storage: preferences.preferences ? 'granted' : 'denied',
    personalization_storage: preferences.preferences ? 'granted' : 'denied',
    security_storage: 'granted', // Always granted for necessary cookies
  };
};

export const defaultConsent: ConsentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
};
