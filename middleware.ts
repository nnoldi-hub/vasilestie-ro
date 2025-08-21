import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith('/auth/')) {
          return true;
        }
        
        // Allow access to public pages
        if (req.nextUrl.pathname === '/' || 
            req.nextUrl.pathname.startsWith('/servicii') ||
            req.nextUrl.pathname.startsWith('/devino-mesterias')) {
          return true;
        }
        
        // Require authentication for admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'SUPER_ADMIN' || token?.role === 'ADMIN';
        }
        
        // Require authentication for profile routes
        if (req.nextUrl.pathname.startsWith('/profil')) {
          return !!token;
        }
        
        return true;
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/profil/:path*'
  ]
}
