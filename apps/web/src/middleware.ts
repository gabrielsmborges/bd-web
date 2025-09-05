import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { SAFE_ROUTES, UNSAFE_ROUTES } from './constants/routes'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  `/${UNSAFE_ROUTES.SIGN_IN}(.*)`,
  `/${UNSAFE_ROUTES.SIGN_UP}(.*)`
])

export default clerkMiddleware(async (auth, req) => {
  const isProtectedRoute = !isPublicRoute(req)

  const { orgSlug } = await auth()

  const hasActiveOrg = !!orgSlug


  if (isProtectedRoute) {
    await auth.protect()

    if (!hasActiveOrg && req.nextUrl.pathname !== SAFE_ROUTES.SELECT_ORGANIZATION) {
      return NextResponse.redirect(new URL(SAFE_ROUTES.SELECT_ORGANIZATION, req.url))
    }
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/'
  ]
}
