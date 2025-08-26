import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Team Management
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'ADMINISTRATOR' | 'COLLABORATOR';
  status: 'active' | 'inactive';
  lastActive: Date;
  joinedAt: Date;
  permissions: string[];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: ['ADMINISTRATOR', 'COLLABORATOR']
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return users.map(user => ({
    id: user.id,
    name: user.name || 'Unknown',
    email: user.email,
    role: user.role as TeamMember['role'],
    status: 'active' as const,
    lastActive: new Date(),
    joinedAt: user.createdAt,
    permissions: getPermissionsForRole(user.role)
  }));
}

export async function createTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
  console.log('🔧 AdminService.createTeamMember called with:', data);
  
  // Generate a temporary password for the new team member
  const tempPassword = generateTemporaryPassword();
  const hashedPassword = await bcrypt.hash(tempPassword, 12);
  
  const user = await prisma.user.create({
    data: {
      name: data.name || '',
      email: data.email!,
      role: data.role || 'COLLABORATOR',
      password: hashedPassword,
      emailVerified: new Date()
    }
  });

  console.log('🔧 User created in database with temporary password:', { ...user, tempPassword });

  return {
    id: user.id,
    name: user.name || 'Unknown',
    email: user.email,
    role: user.role as TeamMember['role'],
    status: 'active',
    lastActive: new Date(),
    joinedAt: user.createdAt,
    permissions: getPermissionsForRole(user.role)
  };
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role
    }
  });

  return {
    id: user.id,
    name: user.name || 'Unknown',
    email: user.email,
    role: user.role as TeamMember['role'],
    status: 'active',
    lastActive: new Date(),
    joinedAt: user.createdAt,
    permissions: getPermissionsForRole(user.role)
  };
}

export async function deleteTeamMember(id: string): Promise<void> {
  await prisma.user.delete({
    where: { id }
  });
}

export async function resetTeamMemberPassword(id: string, newPassword?: string): Promise<{ success: boolean; temporaryPassword?: string; error?: string }> {
  try {
    // Generate a temporary password if none provided
    const tempPassword = newPassword || generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    // Update user password
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });

    return {
      success: true,
      temporaryPassword: tempPassword
    };
  } catch (error) {
    console.error('Error resetting password:', error);
    return {
      success: false,
      error: 'Failed to reset password'
    };
  }
}

// Activity Logs
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details?: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'login' | 'system';
}

export async function getActivityLogs(filters?: {
  userId?: string;
  action?: any; // Use any to avoid Prisma type issues
  dateFrom?: Date;
  dateTo?: Date;
}): Promise<ActivityLog[]> {
  const logs = await prisma.adminLog.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    },
    where: {
      ...(filters?.userId && { userId: filters.userId }),
      ...(filters?.action && { action: filters.action as any }),
      ...(filters?.dateFrom && {
        createdAt: {
          gte: filters.dateFrom,
          ...(filters.dateTo && { lte: filters.dateTo })
        }
      })
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 100
  });

  return logs.map(log => ({
    id: log.id,
    userId: log.userId,
    userName: (log as any).user?.name || (log as any).user?.email || 'Unknown',
    action: log.action,
    details: log.details || undefined,
    timestamp: log.createdAt,
    type: getActionType(log.action)
  }));
}

export async function createActivityLog(data: {
  userId: string;
  action: string;
  details?: string;
}): Promise<void> {
  await prisma.adminLog.create({
    data: {
      userId: data.userId,
      action: data.action as any,
      details: data.details
    }
  });
}

// Statistics
export interface AdminStats {
  totalUsers: number;
  totalCraftsmen: number;
  totalBookings: number;
  monthlyRevenue: number;
  userGrowth: {
    current: number;
    previous: number;
    change: number;
  };
  craftsmenGrowth: {
    current: number;
    previous: number;
    change: number;
  };
  bookingGrowth: {
    current: number;
    previous: number;
    change: number;
  };
  revenueGrowth: {
    current: number;
    previous: number;
    change: number;
  };
}

export async function getAdminStats(): Promise<AdminStats> {
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalUsers,
    totalCraftsmen,
    totalContactRequests,
    currentMonthUsers,
    previousMonthUsers,
    currentMonthCraftsmen,
    previousMonthCraftsmen,
    currentMonthContactRequests,
    previousMonthContactRequests
  ] = await Promise.all([
    prisma.user.count(),
    prisma.craftsman.count(),
    0, // Placeholder for contact requests
    prisma.user.count({
      where: {
        createdAt: { gte: currentMonthStart }
      }
    }),
    prisma.user.count({
      where: {
        createdAt: { gte: previousMonthStart, lte: previousMonthEnd }
      }
    }),
    prisma.craftsman.count({
      where: {
        createdAt: { gte: currentMonthStart }
      }
    }),
    prisma.craftsman.count({
      where: {
        createdAt: { gte: previousMonthStart, lte: previousMonthEnd }
      }
    }),
    0, // Placeholder for current month contact requests
    0  // Placeholder for previous month contact requests
  ]);

  // Calculate mock revenue for now
  const monthlyRevenue = 284500; // Mock data
  const currentRevenue = monthlyRevenue;
  const previousRevenue = 245000; // Mock data

  return {
    totalUsers,
    totalCraftsmen,
    totalBookings: totalContactRequests, // Using contact requests instead of bookings
    monthlyRevenue,
    userGrowth: {
      current: currentMonthUsers,
      previous: previousMonthUsers,
      change: calculatePercentChange(currentMonthUsers, previousMonthUsers)
    },
    craftsmenGrowth: {
      current: currentMonthCraftsmen,
      previous: previousMonthCraftsmen,
      change: calculatePercentChange(currentMonthCraftsmen, previousMonthCraftsmen)
    },
    bookingGrowth: {
      current: currentMonthContactRequests,
      previous: previousMonthContactRequests,
      change: calculatePercentChange(currentMonthContactRequests, previousMonthContactRequests)
    },
    revenueGrowth: {
      current: currentRevenue,
      previous: previousRevenue,
      change: calculatePercentChange(currentRevenue, previousRevenue)
    }
  };
}

// Helper functions
function getPermissionsForRole(role: string): string[] {
  const permissions = {
    SUPER_ADMIN: ['all'],
    ADMIN: ['users.read', 'users.write', 'craftsmen.read', 'craftsmen.write', 'bookings.read', 'bookings.write'],
    MODERATOR: ['users.read', 'craftsmen.read', 'bookings.read', 'reviews.moderate'],
    SUPPORT: ['users.read', 'bookings.read', 'support.respond']
  };
  
  return permissions[role as keyof typeof permissions] || [];
}

function getActionType(action: string): ActivityLog['type'] {
  if (action.includes('CREATED')) return 'create';
  if (action.includes('UPDATED')) return 'update';
  if (action.includes('DELETED')) return 'delete';
  if (action.includes('LOGIN')) return 'login';
  return 'system';
}

function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function generateTemporaryPassword(): string {
  // Generate a secure temporary password
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
}
