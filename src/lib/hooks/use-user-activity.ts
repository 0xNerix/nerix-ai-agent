import { useState, useEffect, useCallback, useRef } from 'react';

interface UseUserActivityOptions {
  inactiveTimeout?: number; // milliseconds
}

interface UseUserActivityReturn {
  isActive: boolean;
  isPageVisible: boolean;
  lastActivity: number;
}

export function useUserActivity({ 
  inactiveTimeout = 5 * 60 * 1000 // 5 minutes default
}: UseUserActivityOptions = {}): UseUserActivityReturn {
  const [isActive, setIsActive] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(() => {
    if (typeof document !== 'undefined') {
      return !document.hidden;
    }
    return true;
  });
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const mountedRef = useRef(true);

  // Throttle activity updates to prevent excessive re-renders
  const lastUpdateRef = useRef(0);
  const THROTTLE_DELAY = 1000; // 1 second throttle

  // Reset activity timer
  const resetActivityTimer = useCallback(() => {
    if (!mountedRef.current) return;
    
    const now = Date.now();
    
    // Throttle updates - only update once per second
    if (now - lastUpdateRef.current < THROTTLE_DELAY) {
      return;
    }
    
    lastUpdateRef.current = now;
    setLastActivity(now);
    setIsActive(true);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setIsActive(false);
      }
    }, inactiveTimeout);
  }, [inactiveTimeout]);

  // Handle page visibility change
  const handleVisibilityChange = useCallback(() => {
    if (!mountedRef.current || typeof document === 'undefined') return;
    
    const visible = !document.hidden;
    setIsPageVisible(visible);

    if (visible) {
      // Page became visible, reset activity
      resetActivityTimer();
    } else {
      // Page became hidden, mark as inactive
      setIsActive(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [resetActivityTimer]);

  // Activity event handlers
  const handleUserActivity = useCallback(() => {
    if (!mountedRef.current || typeof document === 'undefined' || document.hidden) return;
    resetActivityTimer();
  }, [resetActivityTimer]);

  useEffect(() => {
    mountedRef.current = true;

    if (typeof document === 'undefined') return;

    // Activity events to track (optimized list)
    const events = [
      'mousedown',
      'keypress',
      'touchstart',
      'click'
    ];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    // Add visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initialize activity timer
    resetActivityTimer();

    // Cleanup
    return () => {
      mountedRef.current = false;
      
      // Remove event listeners
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleUserActivity, handleVisibilityChange, resetActivityTimer]);

  return {
    isActive,
    isPageVisible,
    lastActivity
  };
}