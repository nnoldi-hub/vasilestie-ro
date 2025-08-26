import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/stats - Get collaborator dashboard stats
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMINISTRATOR', 'COLLABORATOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Import Prisma dynamically to avoid edge runtime issues
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      // Get basic counts
      const totalUsers = await prisma.user.count({
        where: {
          role: 'USER'
        }
      });

      const totalCraftsmen = await prisma.user.count({
        where: {
          role: 'CRAFTSMAN'
        }
      });

      // For now, we'll mock pending approvals and recent activity
      // These would be implemented when we have proper craftsman approval system
      const pendingApprovals = Math.floor(Math.random() * 10); // Mock data
      const recentActivity = Math.floor(Math.random() * 50); // Mock data

      const stats = {
        totalUsers,
        totalCraftsmen,
        pendingApprovals,
        recentActivity
      };

      return NextResponse.json(stats);

    } finally {
      await prisma.$disconnect();
    }

  } catch (error) {
    console.error('Error getting stats:', error);
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}
