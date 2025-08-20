'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { isAdmin, hasPermission } from '@/lib/auth/permissions';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  fallbackUrl?: string;
  allowedRoles?: string[];
}

export function AdminProtectedRoute({
  children,
  requiredPermission,
  fallbackUrl = '/admin/login',
  allowedRoles = ['ADMIN', 'SUPER_ADMIN', 'MODERATOR', 'SUPPORT']
}: AdminProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      router.push(fallbackUrl);
      return;
    }

    // Check if user has admin access
    if (!isAdmin(session.user.role)) {
      router.push(fallbackUrl);
      return;
    }

    // Check specific role requirements
    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      router.push('/admin'); // Redirect to main admin instead of login
      return;
    }

    // Check specific permission requirements
    if (requiredPermission && !hasPermission(session.user.role, requiredPermission)) {
      router.push('/admin'); // Redirect to main admin instead of login
      return;
    }
  }, [session, status, router, requiredPermission, fallbackUrl, allowedRoles]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Verificare autentificare...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!session?.user) {
    return null; // Will redirect via useEffect
  }

  // Not admin
  if (!isAdmin(session.user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Acces interzis</h1>
          <p className="text-gray-600">Nu aveți permisiuni de administrare.</p>
        </div>
      </div>
    );
  }

  // Insufficient permissions
  if (requiredPermission && !hasPermission(session.user.role, requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Permisiuni insuficiente</h1>
          <p className="text-gray-600">Nu aveți permisiunea necesară pentru această secțiune.</p>
        </div>
      </div>
    );
  }

  // Role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Acces restricționat</h1>
          <p className="text-gray-600">Rolul dumneavoastră nu are acces la această secțiune.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}