import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Define admin role types
export type AdminRole = 'ADMIN' | 'SUPER_ADMIN' | 'MODERATOR' | 'SUPPORT';

// Check if user has admin access
export function isAdmin(role?: string): boolean {
  if (!role) return false;
  return ['ADMIN', 'SUPER_ADMIN', 'MODERATOR', 'SUPPORT'].includes(role);
}

// Check if user has super admin access
export function isSuperAdmin(role?: string): boolean {
  if (!role) return false;
  return role === 'SUPER_ADMIN';
}

// Get user permissions based on role
export function getUserPermissions(role?: string): string[] {
  if (!role) return [];
  
  const basePermissions = ['read'];
  
  switch (role) {
    case 'SUPER_ADMIN':
      return [
        ...basePermissions,
        'admin.full_access',
        'users.create',
        'users.update', 
        'users.delete',
        'craftsmen.verify',
        'craftsmen.suspend',
        'system.config',
        'team.manage'
      ];
      
    case 'ADMIN':
      return [
        ...basePermissions,
        'users.create',
        'users.update',
        'craftsmen.verify',
        'team.view',
        'reports.view'
      ];
      
    case 'MODERATOR':
      return [
        ...basePermissions,
        'craftsmen.verify',
        'content.moderate',
        'reports.view'
      ];
      
    case 'SUPPORT':
      return [
        ...basePermissions,
        'users.view',
        'bookings.manage',
        'support.handle'
      ];
      
    default:
      return basePermissions;
  }
}

// Check if user has specific permission
export function hasPermission(userRole: string | undefined, permission: string): boolean {
  if (!userRole) return false;
  
  const permissions = getUserPermissions(userRole);
  
  // Super admins have all permissions
  if (userRole === 'SUPER_ADMIN') return true;
  
  return permissions.includes(permission);
}

// Server-side authentication check
export async function requireAuth(requiredRole?: AdminRole) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    throw new Error('Authentication required');
  }
  
  if (requiredRole && !hasPermission(session.user.role, `admin.${requiredRole.toLowerCase()}`)) {
    throw new Error('Insufficient permissions');
  }
  
  return session;
}

// Get admin session with role validation
export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !isAdmin(session.user.role)) {
    return null;
  }
  
  return {
    ...session,
    user: {
      ...session.user,
      permissions: getUserPermissions(session.user.role),
      isAdmin: true,
      isSuperAdmin: isSuperAdmin(session.user.role),
    }
  };
}