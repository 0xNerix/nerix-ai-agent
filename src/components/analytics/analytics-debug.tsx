'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Activity, Target, Settings } from 'lucide-react';
import { useConsent } from '../consent/consent-provider';
import { event } from '@/lib/gtm';
import { getConsentTimestamp } from '@/lib/consent-manager';

export function AnalyticsDebug() {
  const { preferences, hasUserConsented } = useConsent();
  const [events, setEvents] = useState<Array<{ name: string; time: string }>>([]);
  const [consentDate, setConsentDate] = useState<Date | null>(null);

  useEffect(() => {
    setConsentDate(getConsentTimestamp());
  }, [hasUserConsented]);

  const trackTestEvent = (eventName: string) => {
    event({
      action: eventName,
      category: 'Debug',
      label: 'Analytics Test',
    });
    
    setEvents(prev => [...prev, {
      name: eventName,
      time: new Date().toLocaleTimeString()
    }]);
  };

  if (!hasUserConsented) {
    return (
      <Card className="p-6 border-orange-200 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800">
        <div className="text-center">
          <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">
            Analytics Debug Panel
          </h3>
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Accept cookies to test analytics functionality
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold">Analytics Debug Panel</h3>
        <Badge variant="secondary" className="ml-auto">
          {hasUserConsented ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Analytics:</span>{' '}
            <Badge variant={preferences?.analytics ? 'default' : 'secondary'}>
              {preferences?.analytics ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div>
            <span className="font-medium">Marketing:</span>{' '}
            <Badge variant={preferences?.marketing ? 'default' : 'secondary'}>
              {preferences?.marketing ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className="col-span-2 text-xs text-gray-600 dark:text-gray-400">
            Consent given: {consentDate?.toLocaleString() || 'Unknown'}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Test Events</h4>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => trackTestEvent('button_click')}
              disabled={!preferences?.analytics}
            >
              <Eye className="w-3 h-3 mr-1" />
              Track View
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => trackTestEvent('engagement')}
              disabled={!preferences?.analytics}
            >
              <Target className="w-3 h-3 mr-1" />
              Track Engagement
            </Button>
          </div>
        </div>

        {events.length > 0 && (
          <div className="space-y-1">
            <h4 className="font-medium text-sm">Recent Events</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {events.slice(-5).map((event, index) => (
                <div
                  key={index}
                  className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded flex justify-between"
                >
                  <span>{event.name}</span>
                  <span className="text-gray-500">{event.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
