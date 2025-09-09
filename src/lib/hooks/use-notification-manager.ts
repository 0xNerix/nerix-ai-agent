'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { 
  subscribeToNotifications, 
  unsubscribeFromNotifications, 
  getSubscription,
  checkNotificationSupport
} from '@/lib/utils/notification-utils'
import { handleError } from '@/lib/utils/error-handler'

export interface NotificationManagerState {
  isSubscribed: boolean
  hasPermission: boolean
  isLoading: boolean
  isSupported: boolean
}

export interface NotificationManagerActions {
  subscribe: (successMessage?: string) => Promise<void>
  unsubscribe: () => Promise<void>
  checkStatus: () => Promise<void>
}

export type NotificationManager = NotificationManagerState & NotificationManagerActions

export function useNotificationManager(): NotificationManager {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const { data: session } = useSession()

  // Check notification support and status
  const checkStatus = useCallback(async () => {
    const support = checkNotificationSupport()
    setIsSupported(support.isSupported)
    setHasPermission(support.permission === 'granted')

    if (support.permission === 'granted') {
      try {
        const subscription = await getSubscription()
        setIsSubscribed(!!subscription)
      } catch (error) {
        handleError(error, 'Failed to check notification status', { showToast: false })
        setIsSubscribed(false)
      }
    } else {
      setIsSubscribed(false)
    }
  }, [])

  // Initialize status on mount
  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  // Subscribe to notifications with unified logic
  const subscribe = useCallback(async (successMessage?: string) => {
    setIsLoading(true)
    try {
      await subscribeToNotifications()
      
      setIsSubscribed(true)
      setHasPermission(true)
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('notificationSubscriptionChanged', { 
        detail: { subscribed: true } 
      }))
      
      // Show success notification
      const defaultMessage = session?.user?.address 
        ? 'You\'ll now receive updates about your games and rewards.'
        : 'Connect your wallet to see personalized game updates!'
        
      new Notification('🎉 Notifications enabled!', {
        body: successMessage || defaultMessage,
        icon: '/android-icon-192x192.png',
      })
    } catch (error) {
      handleError(error, 'Notification subscription failed', { toastDescription: 'Failed to subscribe to notifications. Please try again.' })
      const errorMessage = error instanceof Error ? error.message : 'Failed to enable notifications'
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.address])

  // Unsubscribe from notifications with unified logic
  const unsubscribe = useCallback(async () => {
    setIsLoading(true)
    try {
      await unsubscribeFromNotifications()
      setIsSubscribed(false)
      
      // Dispatch event to notify other components  
      window.dispatchEvent(new CustomEvent('notificationSubscriptionChanged', { 
        detail: { subscribed: false } 
      }))
    } catch (error) {
      handleError(error, 'Notification unsubscription failed', { toastDescription: 'Failed to unsubscribe from notifications. Please try again.' })
      throw new Error('Failed to disable notifications. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Removed: Migration functionality

  // Listen for subscription changes from other sources
  useEffect(() => {
    const handleSubscriptionChange = (event: CustomEvent) => {
      const { subscribed } = event.detail
      setIsSubscribed(subscribed)
      setHasPermission(subscribed)
    }

    window.addEventListener('notificationSubscriptionChanged', handleSubscriptionChange as EventListener)
    
    return () => {
      window.removeEventListener('notificationSubscriptionChanged', handleSubscriptionChange as EventListener)
    }
  }, [])

  return {
    // State
    isSubscribed,
    hasPermission,
    isLoading,
    isSupported,
    // Actions
    subscribe,
    unsubscribe,
    checkStatus,
  }
}