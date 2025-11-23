import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ajPublic, ajAPI } from './src/lib/arcjet'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])
const isAPIRoute = createRouteMatcher(['/api(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Apply Arcjet protection based on route type
  const decision = isAPIRoute(req)
    ? await ajAPI.protect(req)
    : await ajPublic.protect(req)

  // Check if Arcjet denied the request
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: 'Too Many Requests', message: 'Please slow down and try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }
    
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: 'Bot Detected', message: 'Automated access is not allowed.' },
        { status: 403 }
      )
    }
    
    // Other security blocks (shield, etc.)
    return NextResponse.json(
      { error: 'Forbidden', message: 'Request blocked for security reasons.' },
      { status: 403 }
    )
  }

  // Protect non-public routes with Clerk authentication
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}