'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Bell, BellRing, Check, X, Trash2, BellOff, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useNotificationManager } from '@/lib/hooks/use-notification-manager'
import { PreferenceCenter } from '@/components/consent/preference-center'
import { api } from '@/lib/api/client'
import { logger, handleError } from '@/lib/utils/logger'

interface Notification {
  id: number
  title: string
  message: string
  createdAt: string
  isRead: boolean
  type: 'game' | 'reward' | 'system' | 'social'
  actionUrl?: string
}

const getWelcomeNotification = (isSubscribed: boolean): Notification[] => {
  if (!isSubscribed) return []
  
  const welcomeDeletedKey = 'nerix_welcome_notification_deleted'
  const isWelcomeDeleted = localStorage.getItem(welcomeDeletedKey) === 'true'
  
  if (isWelcomeDeleted) return []
  
  const welcomeReadKey = 'nerix_welcome_notification_read'
  const isWelcomeRead = localStorage.getItem(welcomeReadKey) === 'true'
  
  return [
    {
      id: 0,
      title: '🎉 Welcome to Nerix!',
      message: 'You\'ve successfully enabled push notifications! Connect your wallet to see game updates and rewards.',
      createdAt: '2024-01-01T00:00:00.000Z',
      isRead: isWelcomeRead,
      type: 'system',
      actionUrl: '/games'
    }
  ]
}

// Fetch notifications from API (wallet users only)
const fetchNotifications = async (): Promise<{ notifications: Notification[], hasActiveSubscription: boolean }> => {
  try {
    const data = await api.notifications.getAll()
    return {
      notifications: data.notifications || [],
      hasActiveSubscription: data.hasActiveSubscription || false
    }
  } catch (error: any) {
    if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      // Not authenticated, return empty array
      return { notifications: [], hasActiveSubscription: false }
    }
    logger.error('Error fetching notifications:', error);
    return { notifications: [], hasActiveSubscription: false }
  }
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'game':
      return '🎮'
    case 'reward':
      return '💰'
    case 'system':
      return '⚙️'
    case 'social':
      return '👥'
    default:
      return '🔔'
  }
}

const formatTimestamp = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return date.toLocaleDateString()
}


export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false)
  const [showCookiePreferences, setShowCookiePreferences] = useState(false)
  const {
    isSubscribed,
    hasPermission, 
    isLoading,
    subscribe,
    unsubscribe
  } = useNotificationManager()
  const { data: session } = useSession()
  const router = useRouter()
  const loadingRef = useRef(false)

  // Removed: Migration functionality

  const loadNotifications = useCallback(async () => {
    if (loadingRef.current) return // Prevent race condition
    loadingRef.current = true
    setIsLoadingNotifications(true)
    
    try {
      if (session?.user?.address) {
        // Authenticated user - load from database
        const { notifications: apiNotifications, hasActiveSubscription } = await fetchNotifications()
        setNotifications(apiNotifications)
        
        // Removed: Migration logic
      } else {
        // Anonymous user - show static welcome notification if subscribed
        const welcomeNotifications = getWelcomeNotification(isSubscribed)
        setNotifications(welcomeNotifications)
      }
    } catch (error) {
      logger.error('Failed to load notifications:', error);
    } finally {
      loadingRef.current = false
      setIsLoadingNotifications(false)
    }
  }, [session?.user?.address, isSubscribed])

  // Notification status is now managed by the hook

  useEffect(() => {
    // PWA install detection (silent check)
    if (typeof window !== 'undefined') {
      // Check install status silently - could be used for analytics
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true
    }
  }, [])

  // Handle Service Worker messages for notification reload
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const messageHandler = (event: MessageEvent) => {
        if (event.data?.type === 'RELOAD_NOTIFICATIONS' && session?.user?.address) {
          // Only reload for authenticated users when push notification arrives
          loadNotifications()
        }
      }

      navigator.serviceWorker.addEventListener('message', messageHandler)
      
      return () => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.removeEventListener('message', messageHandler)
        }
      }
    }
  }, [session?.user?.address, loadNotifications])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  // Listen for subscription changes to reload notifications
  useEffect(() => {
    const handleSubscriptionChange = () => {
      loadNotifications()
    }

    window.addEventListener('notificationSubscriptionChanged', handleSubscriptionChange)
    
    return () => {
      window.removeEventListener('notificationSubscriptionChanged', handleSubscriptionChange)
    }
  }, [loadNotifications])

  const unreadCount = hasPermission ? notifications.filter(n => !n.isRead).length : 0

  const markAsRead = async (id: number) => {
    if (session?.user?.address) {
      try {
        await api.notifications.markAsRead(id)
      } catch (error) {
        logger.error('Failed to mark notification as read:', error);
      }
    } else {
      if (id === 0) {
        localStorage.setItem('nerix_welcome_notification_read', 'true')
      }
    }
    
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  const markAllAsRead = async () => {
    if (session?.user?.address) {
      try {
        await api.notifications.markAsRead()
      } catch (error) {
        logger.error('Failed to mark all notifications as read:', error);
      }
    } else {
      localStorage.setItem('nerix_welcome_notification_read', 'true')
    }
    
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    )
  }

  const deleteNotification = async (id: number) => {
    if (!session?.user?.address && id === 0) {
      localStorage.setItem('nerix_welcome_notification_deleted', 'true')
      setNotifications(prev => prev.filter(n => n.id !== id))
      return
    }
    
    // For authenticated users, delete from server
    if (session?.user?.address) {
      try {
        await api.notifications.delete(id)
      } catch (error) {
        handleError(error, 'Failed to delete notification', {
          toastDescription: 'Could not delete notification. Please try again.'
        });
        return
      }
    }
    
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.actionUrl) {
      // Validate internal URLs only for security
      if (notification.actionUrl.startsWith('/') || 
          notification.actionUrl.startsWith(window.location.origin)) {
        router.push(notification.actionUrl)
      } else {
        // For external URLs, use window.open for security
        window.open(notification.actionUrl, '_blank', 'noopener,noreferrer')
      }
    }
    setIsOpen(false)
  }


  const handleSubscribe = async () => {
    try {
      await subscribe()
    } catch (error) {
      handleError(error, 'Failed to enable notifications', {
        toastDescription: error instanceof Error ? error.message : 'Could not enable notifications. Please try again.'
      });
    }
  }

  const handleUnsubscribe = async () => {
    try {
      await unsubscribe()
    } catch (error) {
      handleError(error, 'Failed to disable notifications', {
        toastDescription: error instanceof Error ? error.message : 'Could not disable notifications. Please try again.'
      });
    }
  }

  // Always show notification center, even if permissions not granted yet

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative p-2.5 rounded-lg bg-background/60 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-background/80"
            aria-label="Open notifications"
          >
            <div className="text-muted-foreground group-hover:text-foreground transition-all duration-300">
              {unreadCount > 0 ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 15,
                    duration: 0.4 
                  }}
                >
                  <BellRing className="w-4 h-4 text-emerald-400 drop-shadow-sm animate-pulse" />
                </motion.div>
              ) : (
                <Bell className="w-4 h-4 drop-shadow-sm" />
              )}
            </div>
            
            {/* Glow effect for active state */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </motion.button>
          
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 600,
                damping: 12,
                delay: 0.1
              }}
              className="absolute -top-2 -right-2 z-10"
            >
              <div className="relative">
                <Badge 
                  variant="destructive" 
                  className="h-6 w-6 p-0 flex items-center justify-center text-xs font-bold bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-2 border-background shadow-xl rounded-full animate-bounce"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-30" />
              </div>
            </motion.div>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent 
        align="end" 
        className="w-80 p-0 bg-background/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl overflow-hidden"
        sideOffset={8}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        
        <div className="relative space-y-0">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs hover:bg-emerald-500/20 hover:text-emerald-300 h-6 px-2"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark all
                </Button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <ScrollArea className="h-64">
            <div className="p-3 space-y-2">
              <AnimatePresence mode="popLayout">
                {isLoadingNotifications ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Loading notifications...</p>
                  </motion.div>
                ) : notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 100, scale: 0.95 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      <Card 
                        className={`group cursor-pointer transition-all duration-300 border rounded-xl overflow-hidden ${
                          !notification.isRead 
                            ? 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30 shadow-lg hover:shadow-xl hover:border-emerald-500/50' 
                            : 'bg-gradient-to-br from-background/80 to-background/60 border-white/10 hover:border-white/20 hover:bg-gradient-to-br hover:from-background/90 hover:to-background/70 shadow-md hover:shadow-lg'
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <CardContent className="p-2">
                          <div className="flex gap-2">
                            {/* Notification type indicator */}
                            <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs ${
                              !notification.isRead 
                                ? 'bg-emerald-500/20 border border-emerald-500/30' 
                                : 'bg-background/60 border border-white/10'
                            }`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1">
                                <div className="flex-1 min-w-0">
                                  <h4 className={`text-xs font-medium mb-0.5 leading-tight ${
                                    !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mb-1 line-clamp-1 leading-tight">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <p className="text-xs text-muted-foreground/60">
                                      {formatTimestamp(notification.createdAt)}
                                    </p>
                                    {!notification.isRead && (
                                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                      className="h-5 w-5 p-0 rounded hover:bg-emerald-500/20"
                                    >
                                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    className="h-5 w-5 p-0 rounded hover:bg-red-500/20"
                                  >
                                    <Trash2 className="w-2.5 h-2.5 text-red-400" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-center py-8"
                  >
                    <div className="p-4 rounded-xl bg-background/60 border border-white/10">
                      <Bell className="w-6 h-6 text-muted-foreground/60 mx-auto mb-2" />
                      <h3 className="text-sm font-semibold text-foreground mb-1">All caught up!</h3>
                      <p className="text-xs text-muted-foreground">
                        No new notifications right now.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
          
          {/* Bottom Settings */}
          <div className="p-3 border-t border-white/10 space-y-2">
            {/* Cookie Settings */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-background/40 border border-white/10">
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">Cookie Settings</p>
                <p className="text-xs text-muted-foreground">Manage privacy preferences</p>
              </div>
              <Button
                onClick={() => setShowCookiePreferences(true)}
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs rounded-lg border-white/20 hover:border-white/30"
              >
                <Settings className="w-3 h-3 mr-1" />
                Manage
              </Button>
            </div>

            {/* Push Notifications Container */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-background/40 border border-white/10">
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    {isSubscribed ? 'Enabled' : 'Get game updates'}
                  </p>
                </div>
                
                <Button
                  onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
                  disabled={isLoading}
                  size="sm"
                  variant={isSubscribed ? "destructive" : "default"}
                  className={`h-7 px-3 text-xs rounded-lg ${
                    isSubscribed ? 
                      "bg-red-600 hover:bg-red-700" : 
                      "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSubscribed ? (
                    <>
                      <BellOff className="w-3 h-3 mr-1" />
                      Off
                    </>
                  ) : (
                    <>
                      <Bell className="w-3 h-3 mr-1" />
                      On
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
      </PopoverContent>

      {/* Cookie Preferences Modal */}
      <PreferenceCenter
        isOpen={showCookiePreferences}
        onClose={() => setShowCookiePreferences(false)}
        onSave={() => setShowCookiePreferences(false)}
      />
    </Popover>
  )
}