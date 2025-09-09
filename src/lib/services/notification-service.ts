import { db } from '@/database'
import { notifications, notificationSubscriptions } from '@/database/schema'
import { eq, and } from 'drizzle-orm'
import webpush from 'web-push'
import { logger } from '@/lib/utils/logger'

// Initialize VAPID details
if (process.env.VAPID_PRIVATE_KEY && process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
}

export interface NotificationData {
  recipientId: string
  recipientType?: 'wallet' | 'anonymous' | 'broadcast'
  title: string
  message: string
  type?: 'game' | 'reward' | 'system' | 'social'
  actionUrl?: string
  icon?: string
  data?: Record<string, any>
  expiresAt?: Date
}

export async function createNotification(
  notificationData: NotificationData,
  sendPush: boolean = true
): Promise<{ id: number; success: boolean }> {
  try {
    const {
      recipientId,
      recipientType = 'wallet',
      title,
      message,
      type = 'system',
      actionUrl,
      icon = '/android-icon-192x192.png',
      data,
      expiresAt
    } = notificationData

    // Create notification in database
    const [newNotification] = await db.insert(notifications).values({
      recipientId,
      recipientType,
      title,
      message,
      type,
      actionUrl,
      icon,
      data,
      expiresAt,
    }).returning()

    // Send push notification if requested
    if (sendPush) {
      await sendPushNotification(newNotification)
    }

    return { id: newNotification.id, success: true }
  } catch (error) {
    logger.error('Failed to create notification:', error)
    throw error
  }
}

export async function sendPushNotification(notification: any): Promise<void> {
  try {
    if (!process.env.VAPID_PRIVATE_KEY) {
      logger.warn('VAPID keys not configured, skipping push notification')
      return
    }

    let subscriptions: any[] = []

    if (notification.recipientType === 'broadcast') {
      // Get all active subscriptions for broadcast
      subscriptions = await db
        .select()
        .from(notificationSubscriptions)
        .where(eq(notificationSubscriptions.isActive, 'true'))
    } else {
      // Get active subscriptions for specific recipient
      subscriptions = await db
        .select()
        .from(notificationSubscriptions)
        .where(
          and(
            eq(notificationSubscriptions.walletAddress, notification.recipientId),
            eq(notificationSubscriptions.isActive, 'true')
          )
        )
    }

    if (subscriptions.length === 0) {
      logger.info('No active subscriptions found for notification')
      return
    }

    const payload = JSON.stringify({
      title: notification.title,
      body: notification.message,
      icon: notification.icon,
      badge: '/android-icon-96x96.png',
      url: notification.actionUrl || '/',
      data: {
        timestamp: Date.now(),
        url: notification.actionUrl || '/',
        notificationId: notification.id,
        ...notification.data
      },
    })

    // Send to all user's active subscriptions
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          return await webpush.sendNotification(sub.subscription as any, payload)
        } catch (error) {
          // If subscription is invalid, mark as inactive
          if (error instanceof webpush.WebPushError && error.statusCode === 410) {
            await db
              .update(notificationSubscriptions)
              .set({ isActive: 'false', updatedAt: new Date() })
              .where(eq(notificationSubscriptions.id, sub.id))
          }
          throw error
        }
      })
    )

    const successCount = results.filter(result => result.status === 'fulfilled').length
    
    // Update notification as sent
    await db
      .update(notifications)
      .set({ isSent: true, sentAt: new Date() })
      .where(eq(notifications.id, notification.id))

    logger.info('Push notification sent', { successCount, total: subscriptions.length })
  } catch (error) {
    logger.error('Failed to send push notification:', error)
  }
}

// Convenience functions for common notification types
export async function createGameNotification(
  recipientId: string,
  title: string,
  message: string,
  gameId?: string,
  actionUrl?: string
) {
  return createNotification({
    recipientId,
    title,
    message,
    type: 'game',
    actionUrl: actionUrl || (gameId ? `/games/${gameId}` : undefined),
    data: { gameId }
  })
}

export async function createRewardNotification(
  recipientId: string,
  title: string,
  message: string,
  amount?: number,
  currency?: string
) {
  return createNotification({
    recipientId,
    title,
    message,
    type: 'reward',
    icon: '/android-icon-192x192.png',
    data: { amount, currency }
  })
}

export async function createSystemNotification(
  recipientId: string,
  title: string,
  message: string,
  actionUrl?: string
) {
  return createNotification({
    recipientId,
    title,
    message,
    type: 'system',
    actionUrl
  })
}

export async function createBroadcastNotification(
  title: string,
  message: string,
  actionUrl?: string,
  type: 'game' | 'reward' | 'system' | 'social' = 'system'
) {
  return createNotification({
    recipientId: 'broadcast',
    recipientType: 'broadcast',
    title,
    message,
    type,
    actionUrl
  })
}