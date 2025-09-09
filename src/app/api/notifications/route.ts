import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/database'
import { notifications, notificationSubscriptions } from '@/database/schema'
import { eq, and, desc, isNull, or, gt } from 'drizzle-orm'
import { requireAuth, getCurrentUser, requireAdmin } from '@/lib/auth/server-auth'
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api'
import { createNotification, createGameNotification, createRewardNotification, createSystemNotification, createBroadcastNotification } from '@/lib/services/notification-service';

// Validation schemas
const notificationPatchSchema = z.object({
  notificationId: z.union([z.number().int().positive(), z.literal('all')]),
  action: z.literal('markAsRead')
});

const notificationDeleteSchema = z.object({
  notificationId: z.number().int().positive()
});

const notificationCreateSchema = z.object({
  type: z.enum(['game', 'reward', 'system', 'broadcast']),
  recipientId: z.string().optional(),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  actionUrl: z.string().optional(),
  gameId: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  sendPush: z.boolean().default(true)
});

export async function GET(request: NextRequest) {
  try {
    // Authentication required (rate limiting handled by middleware)
    await requireAuth()

    const { userAddress } = await getCurrentUser()
    const userIdentifier = userAddress!
    const { searchParams } = new URL(request.url)

    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    // Build query conditions
    let whereCondition = or(
      eq(notifications.recipientId, userIdentifier),
      eq(notifications.recipientType, 'broadcast')
    )

    if (unreadOnly) {
      whereCondition = and(
        whereCondition,
        eq(notifications.isRead, false)
      )
    }

    // Also include non-expired notifications
    whereCondition = and(
      whereCondition,
      or(
        isNull(notifications.expiresAt),
        gt(notifications.expiresAt, new Date())
      )
    )

    const userNotifications = await db
      .select()
      .from(notifications)
      .where(whereCondition)
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset)

    // Check if user has active subscription
    const hasActiveSubscription = await db
      .select()
      .from(notificationSubscriptions)
      .where(
        and(
          eq(notificationSubscriptions.walletAddress, userIdentifier),
          eq(notificationSubscriptions.isActive, 'true')
        )
      )
      .then(results => results.length > 0)

    return createSuccessResponse({
      notifications: userNotifications,
      hasActiveSubscription
    }, request)
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Authentication required (rate limiting handled by middleware)
    await requireAuth()

    const { userAddress } = await getCurrentUser()
    const userIdentifier = userAddress!
    const body = await request.json()
    const { notificationId, action } = notificationPatchSchema.parse(body)

    if (action === 'markAsRead') {
      if (notificationId === 'all') {
        // Mark all as read
        await db
          .update(notifications)
          .set({ isRead: true, updatedAt: new Date() })
          .where(
            and(
              or(
                eq(notifications.recipientId, userIdentifier),
                eq(notifications.recipientType, 'broadcast')
              ),
              eq(notifications.isRead, false)
            )
          )
      } else {
        // Mark specific notification as read
        await db
          .update(notifications)
          .set({ isRead: true, updatedAt: new Date() })
          .where(
            and(
              eq(notifications.id, notificationId),
              or(
                eq(notifications.recipientId, userIdentifier),
                eq(notifications.recipientType, 'broadcast')
              )
            )
          )
      }

      return createSuccessResponse({ success: true }, request)
    }

    throw new ApiError(ErrorCode.INVALID_INPUT, 'Invalid action')
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authentication required (rate limiting handled by middleware)
    await requireAuth()

    const { userAddress } = await getCurrentUser()
    const userIdentifier = userAddress!
    const body = await request.json()
    const { notificationId } = notificationDeleteSchema.parse(body)

    // Soft delete: set expiration date to past (notification becomes expired)
    await db
      .update(notifications)
      .set({ 
        expiresAt: new Date(Date.now() - 1000), // Set to 1 second ago
        updatedAt: new Date() 
      })
      .where(
        and(
          eq(notifications.id, notificationId),
          or(
            eq(notifications.recipientId, userIdentifier),
            eq(notifications.recipientType, 'broadcast')
          )
        )
      )

    return createSuccessResponse({ success: true }, request)
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Admin authentication required
    await requireAdmin();
    
    const body = await request.json()
    const { 
      type, 
      recipientId, 
      title, 
      message, 
      actionUrl, 
      gameId, 
      amount, 
      currency, 
      sendPush 
    } = notificationCreateSchema.parse(body)

    let result;

    // Use appropriate service function based on type
    switch (type) {
      case 'game':
        result = await createGameNotification(
          recipientId || 'broadcast',
          title,
          message,
          gameId,
          actionUrl
        );
        break;

      case 'reward':
        result = await createRewardNotification(
          recipientId || 'broadcast',
          title,
          message,
          amount,
          currency
        );
        break;

      case 'system':
        result = await createSystemNotification(
          recipientId || 'broadcast',
          title,
          message,
          actionUrl
        );
        break;

      case 'broadcast':
        result = await createBroadcastNotification(
          title,
          message,
          actionUrl,
          'system'
        );
        break;

      default:
        throw new ApiError(ErrorCode.INVALID_INPUT, 'Invalid notification type');
    }

    return createSuccessResponse({
      message: 'Notification created successfully',
      notification: { id: result.id, success: result.success }
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}