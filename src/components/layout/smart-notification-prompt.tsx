'use client'

import { useState, useEffect, useRef } from 'react'
import { useNotificationManager } from '@/lib/hooks/use-notification-manager'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { logger, handleError } from '@/lib/utils/logger'


interface SmartNotificationPromptProps {
  delayMs?: number
  engagementThreshold?: number
}

export function SmartNotificationPrompt({ 
  delayMs = 15000, 
  engagementThreshold = 3 
}: SmartNotificationPromptProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [userEngagement, setUserEngagement] = useState(0)
  const {
    hasPermission,
    isLoading,
    subscribe
  } = useNotificationManager()
  
  const hasShownPrompt = useRef(false)
  const engagementTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      return
    }

    // Don't show if already granted or denied
    if (hasPermission) {
      return
    }

    // Check if user has dismissed prompt before
    const dismissedDate = localStorage.getItem('notification-prompt-dismissed')
    if (dismissedDate) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24)
      // Don't show again for 7 days after dismissal
      if (daysSinceDismissed < 7) {
        return
      }
    }

    // Set up engagement tracking
    const trackEngagement = () => {
      setUserEngagement(prev => prev + 1)
    }

    // Track meaningful user interactions
    const events = ['scroll', 'click', 'keydown', 'mousemove']
    events.forEach(event => {
      window.addEventListener(event, trackEngagement, { passive: true })
    })

    // Set up delay timer
    const delayTimer = setTimeout(() => {
      if (!hasShownPrompt.current) {
        setShouldShow(true)
        
        // Additional delay to check engagement
        engagementTimer.current = setTimeout(() => {
          if (userEngagement >= engagementThreshold && !hasShownPrompt.current) {
            setIsVisible(true)
            hasShownPrompt.current = true
          }
        }, 2000)
      }
    }, delayMs)

    return () => {
      clearTimeout(delayTimer)
      if (engagementTimer.current) {
        clearTimeout(engagementTimer.current)
      }
      events.forEach(event => {
        window.removeEventListener(event, trackEngagement)
      })
    }
  }, [delayMs, engagementThreshold, userEngagement, hasPermission])

  const handleAllow = async () => {
    try {
      await subscribe('You\'ll now receive notifications for game updates and rewards.')
      localStorage.removeItem('notification-prompt-dismissed')
      setIsVisible(false)
    } catch (error) {
      logger.error('Notification setup failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to enable notifications'
      handleError(error, 'Notification setup failed', {
        toastDescription: errorMessage
      });
      setIsVisible(false)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('notification-prompt-dismissed', Date.now().toString())
    setIsVisible(false)
  }

  const handleNotNow = () => {
    setIsVisible(false)
    // Don't set dismissed flag, so it can show again later
  }

  if (!shouldShow || !isVisible || hasPermission) {
    return null
  }

  return (
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="fixed z-40
          left-2 right-2
          bottom-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]
          mx-auto max-w-md
          sm:bottom-4 sm:right-6 sm:left-auto sm:max-w-sm
        "
      >
        <Card className="border-emerald-500/20 bg-background/95 backdrop-blur-xl shadow-2xl rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3 px-4 py-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                <CardTitle className="text-base sm:text-lg font-semibold">
                  Stay Updated
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-9 w-9 p-0 rounded-full hover:bg-red-500/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0 space-y-3 sm:space-y-4 px-4 pb-3 sm:px-6 sm:pb-4">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Get notified about game results, rewards, and new challenges!
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleAllow}
                disabled={isLoading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-sm h-11 sm:h-10 rounded-xl"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Allow'
                )}
              </Button>
              <Button
                onClick={handleNotNow}
                variant="outline"
                className="flex-1 text-sm h-11 sm:h-10 rounded-xl"
              >
                Not Now
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground/70 text-center">
              You can change this anytime in your browser settings.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

