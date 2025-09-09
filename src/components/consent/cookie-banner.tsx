'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, Cookie, Shield, X } from 'lucide-react';
import { hasConsented, saveConsentPreferences } from '@/lib/consent-manager';
import { updateConsent, grantConsent, pageview } from '@/lib/gtm';
import { CookiePreferences } from '@/types/gtm';
import { PreferenceCenter } from './preference-center';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(!hasConsented());
    }, 7000); // 7 seconds delay to let user see content

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    saveConsentPreferences(preferences);
    updateConsent(grantConsent(preferences));
    
    // Send initial pageview after consent granted
    if (preferences.analytics) {
      setTimeout(() => {
        pageview(window.location.pathname);
      }, 100);
    }
    
    setShowBanner(false);
    
    new Notification('🍪 Cookies Accepted', {
        body: "All cookies have been enabled. You'll get the best experience with personalized content and analytics!",
        icon: '/android-icon-192x192.png',
    })
  };

  const handleRejectAll = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    saveConsentPreferences(preferences);
    updateConsent(grantConsent(preferences));
    setShowBanner(false);
    
    new Notification('🍪 Cookies Accepted', {
        body: "All cookies have been enabled. You'll get the best experience with personalized content and analytics!",
        icon: '/android-icon-192x192.png',
    })
  };

  const handlePreferencesSaved = () => {
    setShowPreferences(false);
    setShowBanner(false);
    
    new Notification('🍪 Preferences Saved', {
        body: "Your cookie preferences have been updated successfully.",
        icon: '/android-icon-192x192.png',
    })
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      <Card className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:max-w-2xl lg:left-auto lg:right-6 z-50 shadow-2xl border-2 animate-in slide-in-from-bottom-4 duration-500">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, 
                  analyze site traffic, and personalize content. You can choose to accept all 
                  cookies or customize your preferences.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAcceptAll}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Accept All
                </Button>
                
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="px-6"
                >
                  Reject All
                </Button>
                
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  className="px-6"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By continuing to browse, you agree to our{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                {' '}and{' '}
                <a href="/terms-of-service" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
            
            <Button
              onClick={handleRejectAll}
              variant="ghost"
              size="sm"
              className="flex-shrink-0 p-1 h-8 w-8"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      </Card>

      <PreferenceCenter
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handlePreferencesSaved}
      />
    </>
  );
}
