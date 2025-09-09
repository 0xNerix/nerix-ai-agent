import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ApiError, createSuccessResponse, handleApiError, ErrorCode } from '@/lib/api';
import { db } from '@/database';
import { supportRequests } from '@/database/schema';
import { logger } from '@/lib/utils/logger';


// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  type: z.enum(['general', 'support', 'bug', 'feature', 'partnership']),
  // Simple spam protection
  honeypot: z.string().optional(), // Should be empty if filled by human
  timestamp: z.number(), // Used for rate limiting
});


export async function POST(request: NextRequest) {
  
  
  try {
    const body = await request.json();
    
    // Get client IP for logging
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Validate form data
    const validatedData = contactFormSchema.parse(body);

    // Spam protection checks
    // 1. Honeypot field should be empty
    if (validatedData.honeypot && validatedData.honeypot.trim() !== '') {
      logger.warn('Spam detected: Honeypot field filled', { ip, honeypot: validatedData.honeypot });
      // Return success to not reveal spam detection
      return NextResponse.json({ success: true });
    }

    // 2. Check timestamp (form should take at least 3 seconds to fill)
    const formFillTime = Date.now() - validatedData.timestamp;
    if (formFillTime < 3000) {
      logger.warn('Spam detected: Form filled too quickly', { ip, fillTime: formFillTime });
      // Return success to not reveal spam detection
      return NextResponse.json({ success: true });
    }

    // 3. Basic content filtering
    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/gi, // URLs in message
      /buy now|click here|free money|make money fast/gi, // Common spam phrases
      /\b\d{10,}\b/g, // Long numbers (potential phone numbers)
    ];

    const fullText = `${validatedData.name} ${validatedData.subject} ${validatedData.message}`.toLowerCase();
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(fullText));

    if (hasSuspiciousContent) {
      logger.warn('Spam detected: Suspicious content', { ip, type: validatedData.type });
      // Return success to not reveal spam detection
      return NextResponse.json({ success: true });
    }

    // Get user agent for logging
    const userAgent = request.headers.get('user-agent') || undefined;

    // Save to database
    const [savedRequest] = await db.insert(supportRequests).values({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      type: validatedData.type,
      ip: ip,
      userAgent: userAgent,
      status: 'new',
    }).returning();

    // TODO: In production, send notification email to team
    // await sendNotificationEmail(savedRequest);

    // TODO: In production, send confirmation email to user
    // await sendConfirmationEmail(validatedData.email, validatedData.name);

    return createSuccessResponse({
      message: 'Thank you for your message! We\'ll get back to you soon.',
      id: savedRequest.id
    }, request);

  } catch (error) {
    return handleApiError(error, request);
  }
}

// Health check endpoint
export async function GET(request: Request) {
  return createSuccessResponse({
    status: 'operational',
    timestamp: new Date().toISOString()
  }, request);
}