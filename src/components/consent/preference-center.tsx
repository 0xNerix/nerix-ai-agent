'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, BarChart3, Target, User, X, Info } from 'lucide-react';
import { getConsentPreferences, saveConsentPreferences } from '@/lib/consent-manager';
import { updateConsent, grantConsent, pageview } from '@/lib/gtm';
import { CookiePreferences } from '@/types/gtm';

interface PreferenceCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function PreferenceCenter({ isOpen, onClose, onSave }: PreferenceCenterProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    if (isOpen) {
      const savedPreferences = getConsentPreferences();
      if (savedPreferences) {
        setPreferences(savedPreferences);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    saveConsentPreferences(preferences);
    updateConsent(grantConsent(preferences));
    
    // Send initial pageview if analytics enabled
    if (preferences.analytics) {
      setTimeout(() => {
        pageview(window.location.pathname);
      }, 100);
    }
    
    onSave();
  };

  const cookieCategories = [
    {
      id: 'necessary' as keyof CookiePreferences,
      title: 'Necessary Cookies',
      description: 'Essential for website functionality and security. These cannot be disabled.',
      icon: Shield,
      required: true,
      examples: 'Session management, security, basic functionality',
    },
    {
      id: 'analytics' as keyof CookiePreferences,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website to improve user experience.',
      icon: BarChart3,
      required: false,
      examples: 'Google Analytics, page views, user interactions',
    },
    {
      id: 'marketing' as keyof CookiePreferences,
      title: 'Marketing Cookies',
      description: 'Used for advertising and remarketing purposes across websites and platforms.',
      icon: Target,
      required: false,
      examples: 'Ad targeting, conversion tracking, remarketing',
    },
    {
      id: 'preferences' as keyof CookiePreferences,
      title: 'Preference Cookies',
      description: 'Remember your settings and preferences for a personalized experience.',
      icon: User,
      required: false,
      examples: 'Theme preferences, language settings, layout choices',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Cookie Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Manage your cookie preferences below. You can change these settings at any time.
          </div>

          <div className="space-y-4">
            {cookieCategories.map((category) => {
              const Icon = category.icon;
              const isEnabled = preferences[category.id];

              return (
                <Card key={category.id} className="p-4 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isEnabled ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {category.title}
                            </h4>
                            {category.required && (
                              <Badge variant="secondary" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="ml-13 pl-3 border-l border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Info className="w-3 h-3" />
                          <span>Examples: {category.examples}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => {
                          if (!category.required) {
                            setPreferences(prev => ({
                              ...prev,
                              [category.id]: checked
                            }));
                          }
                        }}
                        disabled={category.required}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => {
                setPreferences({
                  necessary: true,
                  analytics: false,
                  marketing: false,
                  preferences: false,
                });
              }}
              variant="outline"
              className="flex-1"
            >
              Reject All
            </Button>
            
            <Button
              onClick={() => {
                setPreferences({
                  necessary: true,
                  analytics: true,
                  marketing: true,
                  preferences: true,
                });
              }}
              variant="outline"
              className="flex-1"
            >
              Accept All
            </Button>
            
            <Button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
