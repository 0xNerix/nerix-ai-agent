'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { handleError } from '@/lib/utils/logger'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [userEngagement, setUserEngagement] = useState(0)
  
  const hasShownPrompt = useRef(false)
  const engagementTimer = useRef<NodeJS.Timeout>()
  const delayTimer = useRef<NodeJS.Timeout>()

  // PWA prompt should work independently of notification system

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true
      setIsInstalled(isInstalled)
    }
    
    checkInstalled()

    // Check if user dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const daysSince = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
      if (daysSince < 7) { // Don't show for 7 days after dismiss
        setIsDismissed(true)
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

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      setDeferredPrompt(promptEvent)
      
      // Show our custom prompt if conditions are met
      if (!isInstalled && !isDismissed && !hasShownPrompt.current) {
        // Set up delay timer for better UX
        delayTimer.current = setTimeout(() => {
          // Additional delay to check engagement (3+ interactions in 30 seconds)
          engagementTimer.current = setTimeout(() => {
            if (userEngagement >= 3 && !hasShownPrompt.current) {
              setShowPrompt(true)
              hasShownPrompt.current = true
            }
          }, 2000)
        }, 30000) // 30 seconds
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      if (engagementTimer.current) {
        clearTimeout(engagementTimer.current)
      }
      if (delayTimer.current) {
        clearTimeout(delayTimer.current)
      }
      events.forEach(event => {
        window.removeEventListener(event, trackEngagement)
      })
    }
  }, [isInstalled, isDismissed, userEngagement])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setShowPrompt(false)
        setIsInstalled(true)
      }
      
      setDeferredPrompt(null)
    } catch (error) {
      handleError(error, 'App install failed', {
        toastDescription: 'Could not install the app. Please try again.'
      });
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    setShowPrompt(false)
    setIsDismissed(true)
  }

  const handleNotNow = () => {
    setShowPrompt(false)
  }

  if (!deferredPrompt || isInstalled || !showPrompt) {
    return null
  }

  return (
  <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="
          fixed z-50
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
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                <CardTitle className="text-base sm:text-lg font-semibold">
                  Install App
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
              Add Nerix to your home screen for faster access and better performance!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleInstall}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-sm h-11 sm:h-10 rounded-xl"
              >
                Install
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
              You can always install later from your browser menu.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}