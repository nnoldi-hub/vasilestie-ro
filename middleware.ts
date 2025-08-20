import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // If user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.nextauth.token;
      
      // Allow access to admin login page without authentication
      if (req.nextUrl.pathname === '/admin/login') {
        return NextResponse.next();
      }
      
      // Check if user has admin role
      if (!token?.role || !['ADMIN', 'SUPER_ADMIN', 'MODERATOR', 'SUPPORT'].includes(token.role)) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to admin login page without token
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        
        // For other admin routes, require valid token
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*']
};