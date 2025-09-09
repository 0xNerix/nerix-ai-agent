import { api } from '../api/client'
import { logger } from './logger'

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      return registration
    } catch (error) {
      logger.error('Service Worker registration failed:', error)
      throw error
    }
  }
  throw new Error('Service Worker not supported')
}

export async function getSubscription() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready
      return await registration.pushManager.getSubscription()
    } catch (error) {
      logger.error('Get subscription failed:', error)
      return null
    }
  }
  return null
}

export async function subscribeToNotifications() {
  try {
    // Validate VAPID key exists
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      throw new Error('VAPID public key not configured')
    }
    
    // Check if Notification API is supported
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported in this browser')
    }

    const registration = await registerServiceWorker()
    
    // Handle both callback and promise-based requestPermission APIs for mobile compatibility
    let permission: NotificationPermission
    if (Notification.requestPermission.length === 0) {
      // Modern promise-based API
      permission = await Notification.requestPermission()
    } else {
      // Legacy callback-based API (some mobile browsers)
      permission = await new Promise((resolve) => {
        Notification.requestPermission((result) => {
          resolve(result)
        })
      })
    }
    if (permission === 'denied') {
      throw new Error('Notification permission was denied. Please enable notifications in your browser settings.')
    }
    if (permission === 'default') {
      throw new Error('Notification permission was not granted. Please allow notifications to continue.')
    }
    if (permission !== 'granted') {
      throw new Error('Notification permission is required to receive updates.')
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })

    const result = await api.notifications.subscribe({
      subscription,
      // Server determines user identity (wallet address or generates GUID)
    })

    return { subscription, result }
  } catch (error) {
    logger.error('Subscribe to notifications failed:', error)
    throw error
  }
}

export async function unsubscribeFromNotifications() {
  try {
    // Unsubscribe from browser
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    if (subscription) {
      await subscription.unsubscribe()
    }

    // Try to remove from server (only works for authenticated users)
    try {
      const result = await api.notifications.unsubscribe()
      return result
    } catch (serverError: any) {
      if (serverError.message?.includes('401') || serverError.message?.includes('Unauthorized')) {
        // Anonymous user - only browser unsubscription needed
        logger.info('Anonymous user unsubscribed from browser only')
        return { success: true, message: 'Browser unsubscription completed' }
      }
      logger.warn('Server unsubscription failed, browser unsubscription completed:', serverError)
      return { success: true, message: 'Browser unsubscription completed' }
    }
  } catch (error) {
    logger.error('Unsubscribe from notifications failed:', error)
    throw error
  }
}

// Removed: Migration functionality

export function checkNotificationSupport() {
  return {
    isSupported: 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window,
    permission: 'Notification' in window ? Notification.permission : 'denied',
    serviceWorker: 'serviceWorker' in navigator,
    pushManager: 'PushManager' in window,
  }
}

// Note: Consider using useNotificationManager hook instead for unified state management