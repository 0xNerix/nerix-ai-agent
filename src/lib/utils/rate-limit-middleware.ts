import { NextRequest, NextResponse } from 'next/server';
import { rateLimiters } from '@/lib/services/rate-limit-service';
import { ErrorCode } from '../api';


interface RateLimitRule {
  pattern: RegExp;
  limiter: keyof typeof rateLimiters;
  methods?: string[];
}

// Rate limiting rules for different endpoints
const RATE_LIMIT_RULES: RateLimitRule[] = [
  // Public endpoints - organized by usage intensity
  
  // High frequency, low cost operations
  { pattern: /^\/api\/games$/, limiter: 'moderate', methods: ['GET'] }, // Game listing
  { pattern: /^\/api\/games\/[^\/]+$/, limiter: 'moderate', methods: ['GET'] }, // Game details
  { pattern: /^\/api\/games\/[^\/]+\/messages$/, limiter: 'generous', methods: ['GET'] }, // Message reading (main game feature)
  { pattern: /^\/api\/profile/, limiter: 'moderate', methods: ['GET'] }, // Profile views
  
  // Low frequency operations
  { pattern: /^\/api\/airdrop$/, limiter: 'moderate', methods: ['GET'] }, // Airdrop info
  
  // Monitoring/health - very generous
  { pattern: /^\/api\/system-status$/, limiter: 'generous', methods: ['GET'] }, // System status
  { pattern: /^\/api\/support$/, limiter: 'generous', methods: ['GET'] }, // Health check
  
  // Form submissions - restrictive
  { pattern: /^\/api\/support$/, limiter: 'restrictive', methods: ['POST'] }, // Contact form

];

export async function applyRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const method = request.method;
  
  // Skip rate limiting for NextAuth internal routes
  if (pathname.startsWith('/api/auth/') && pathname.includes('nextauth')) {
    return null;
  }
  
  // Find matching rule
  const rule = RATE_LIMIT_RULES.find(rule => {
    const patternMatch = rule.pattern.test(pathname);
    const methodMatch = !rule.methods || rule.methods.includes(method);
    return patternMatch && methodMatch;
  });
  
  // If no specific rule found, apply default moderate rate limiting to all API endpoints
  const limiter = rule ? 
    rateLimiters[rule.limiter] : 
    rateLimiters.moderate; // Default: 100 req/min for unmatched endpoints
  
  // Apply rate limiting
  const result = await limiter.limit(request);
  
  if (!result.success) {
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        code: ErrorCode.RATE_LIMIT_EXCEEDED,
        details: {
          limit: result.limit,
          remaining: result.remaining,
          resetTime: result.reset,
          retryAfter: result.retryAfter
        }
      }),
      { 
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(result.reset.getTime() / 1000).toString(),
          'Retry-After': result.retryAfter?.toString() || '60'
        }
      }
    );
  }
  
  return null; // Continue processing
}