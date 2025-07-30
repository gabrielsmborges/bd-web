import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { UNSAFE_ROUTES } from './constants/routes'
import { redirect } from 'next/navigation'

const isPublicRoute = createRouteMatcher([
  `/${UNSAFE_ROUTES.SIGN_IN}(.*)`,
  `/${UNSAFE_ROUTES.SIGN_UP}(.*)`
])

export default clerkMiddleware(async (auth, req) => {
  const isProtectedRoute = !isPublicRoute(req)

  const { orgSlug } = await auth()

  if (isProtectedRoute) {
    await auth.protect()

    if (!orgSlug) {
      return redirect('/select-org')
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
