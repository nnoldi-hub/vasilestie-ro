import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/users - Get users for collaborator dashboard
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMINISTRATOR', 'COLLABORATOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Import Prisma dynamically
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          emailVerified: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Transform data for frontend
      const transformedUsers = users.map(user => ({
        id: user.id,
        name: user.name || 'Utilizator anonim',
        email: user.email,
        role: user.role,
        status: user.emailVerified ? 'active' : 'inactive',
        createdAt: user.createdAt.toISOString(),
        lastLogin: null // We don't track this yet
      }));

      return NextResponse.json({
        success: true,
        users: transformedUsers
      });

    } finally {
      await prisma.$disconnect();
    }

  } catch (error) {
    console.error('Error getting users:', error);
    return NextResponse.json(
      { error: 'Failed to get users' },
      { status: 500 }
    );
  }
}
