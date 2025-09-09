import { NextRequest } from 'next/server'
import { db } from '@/database'
import { notificationSubscriptions } from '@/database/schema'
import { eq, and } from 'drizzle-orm'
import { getCurrentUser, requireAuth } from '@/lib/auth/server-auth'
import { randomUUID } from 'crypto'
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting handled by middleware
    const { userAddress } = await getCurrentUser()
    const body = await request.json()
    const { subscription } = body

    if (!subscription || !subscription.endpoint) {
      throw new ApiError(ErrorCode.INVALID_INPUT, 'Invalid subscription data');
    }

    // Use session address if authenticated, otherwise generate GUID
    let userIdentifier: string
    if (userAddress) {
      userIdentifier = userAddress
    } else {
      userIdentifier = `guid_${randomUUID()}`
    }
    const { endpoint, keys } = subscription
    const { p256dh, auth: authKey } = keys

    // Check if subscription already exists
    const existingSubscription = await db
      .select()
      .from(notificationSubscriptions)
      .where(
        and(
          eq(notificationSubscriptions.walletAddress, userIdentifier),
          eq(notificationSubscriptions.endpoint, endpoint)
        )
      )
      .limit(1)

    if (existingSubscription.length > 0) {
      // Update existing subscription
      await db
        .update(notificationSubscriptions)
        .set({
          p256dh,
          auth: authKey,
          subscription: subscription,
          isActive: 'true',
          updatedAt: new Date(),
        })
        .where(eq(notificationSubscriptions.id, existingSubscription[0].id))

      return createSuccessResponse({
        success: true,
        message: 'Subscription updated successfully',
      }, request);
    }

    // Create new subscription
    await db.insert(notificationSubscriptions).values({
      walletAddress: userIdentifier,
      endpoint,
      p256dh,
      auth: authKey,
      subscription: subscription,
      userAgent: request.headers.get('user-agent') || undefined,
      isActive: 'true',
    })

    return createSuccessResponse({
      success: true,
      message: 'Subscription created successfully',
      userIdentifier: userAddress ? undefined : userIdentifier, // Return generated ID for anonymous users
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authentication required (rate limiting handled by middleware)
    await requireAuth()

    const { userAddress } = await getCurrentUser()
    const userIdentifier = userAddress!

    // Unsubscribe all subscriptions for authenticated user
    await db
      .update(notificationSubscriptions)
      .set({
        isActive: 'false',
        updatedAt: new Date(),
      })
      .where(eq(notificationSubscriptions.walletAddress, userIdentifier))

    return createSuccessResponse({
      success: true,
      message: 'All subscriptions deactivated successfully',
    }, request);
  } catch (error) {
    return handleApiError(error, request);
  }
}