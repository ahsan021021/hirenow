import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get token from localStorage instead of cookies
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/about",
    "/contact",
    "/terms",
    "/privacy-policy",
    "/verify-email",
  ]

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, we'll check auth on the client side
  // This is because we're using localStorage for auth, which isn't accessible in middleware
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
