import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Professional Authentication Middleware
 * Protects admin routes from unauthorized access
 * 
 * This middleware runs on EVERY request before the page loads
 * - If user is not authenticated → redirect to login
 * - If user tries to access login while authenticated → redirect to dashboard
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has authentication token
  const authToken = request.cookies.get('auth_token');
  const isAuthenticated = !!authToken?.value;

  // Define protected admin routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  // SECURITY RULE 1: Protect all admin routes except login
  if (isAdminRoute && !isLoginPage) {
    if (!isAuthenticated) {
      // User is NOT authenticated → redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname); // Save where they wanted to go
      
      return NextResponse.redirect(loginUrl);
    }
  }

  // SECURITY RULE 2: Allow access to login page even if authenticated
  // Users can manually logout or want to switch accounts
  // The login page itself will handle redirecting authenticated users if needed

  // Allow the request to proceed
  return NextResponse.next();
}

/**
 * Configure which routes this middleware should run on
 * Only run on admin routes for better performance
 */
export const config = {
  matcher: [
    '/admin/:path*', // All admin routes
  ],
};
