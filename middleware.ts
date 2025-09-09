import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { applyRateLimit } from '@/lib/utils/rate-limit-middleware'

// Define allowed origins from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim())

// Helper function to set CORS headers
function setCORSHeaders(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigin = allowedOrigins?.includes(origin) ? origin : allowedOrigins?.[0]
  
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin || origin)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-Requested-With')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Max-Age', '86400')
  response.headers.set('Vary', 'Origin')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Handle CORS preflight requests for API routes
  if (pathname.startsWith('/api/') && request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    setCORSHeaders(response, request)
    return response
  }
  
  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const rateLimitResponse = await applyRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  }
  
  const response = NextResponse.next()
  
  // Generate trace ID and set CORS headers for API requests
  if (pathname.startsWith('/api/')) {
    const traceId = crypto.randomUUID()
    response.headers.set('X-Trace-Id', traceId)
    setCORSHeaders(response, request)
  }
  
  // Skip CSP for service worker (handled in next.config.js)
  if (pathname === '/sw.js') {
    return response
  }
  
  // Generate nonce for dynamic CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  
  // Structured CSP directives for better maintainability
  const cspDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", 'https://vercel.live'],
    'style-src': ["'self'", `'nonce-${nonce}'`],
    'img-src': ["'self'", 'blob:', 'data:', 'https:', '*.vercel-analytics.com', '*.vercel-insights.com', '*.public.blob.vercel-storage.com'],
    'font-src': ["'self'", 'data:'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'frame-src': ["'self'", 'https://verify.walletconnect.com', 'https://secure.walletconnect.com'],
    'connect-src': ["'self'", 'https:', 'wss:', 'blob:', '*.walletconnect.com', '*.binance.org', '*.bsc.nodereal.io', '*.ankr.com', '*.vercel-analytics.com', '*.vercel-insights.com', '*.public.blob.vercel-storage.com'],
    'media-src': ["'self'", 'blob:', 'data:'],
    'upgrade-insecure-requests': [],
    'block-all-mixed-content': []
  }
  
  const cspHeader = Object.entries(cspDirectives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ')
  
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-Nonce', nonce)
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match API routes for CORS, rate limiting, and trace ID
     * Match all other pages for CSP nonce (except API routes, static files and sw.js)
     * - api routes: explicit match for API functionality
     * - other routes: CSP nonce (API routes excluded to prevent double execution)
     * - _next/static (static files) - excluded
     * - _next/image (image optimization files) - excluded  
     * - favicon.ico (favicon file) - excluded
     * - sw.js (service worker) - excluded (handled in next.config.js)
     */
    '/api/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js).*)',
  ],
}