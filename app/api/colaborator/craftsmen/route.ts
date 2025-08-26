import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/craftsmen - Get craftsmen for collaborator dashboard
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
      const craftsmen = await prisma.user.findMany({
        where: {
          role: 'CRAFTSMAN'
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          emailVerified: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Transform data for frontend (mock some fields for now)
      const transformedCraftsmen = craftsmen.map(craftsman => ({
        id: craftsman.id,
        name: craftsman.name || 'Meșteșugar anonim',
        email: craftsman.email,
        phone: '+40 XXX XXX XXX', // Mock data
        services: ['Instalații sanitare', 'Reparații'], // Mock data
        status: Math.random() > 0.3 ? 'approved' : 'pending', // Mock status
        verificationStatus: Math.random() > 0.5 ? 'verified' : 'pending',
        createdAt: craftsman.createdAt.toISOString(),
        city: 'București' // Mock data
      }));

      return NextResponse.json({
        success: true,
        craftsmen: transformedCraftsmen
      });

    } finally {
      await prisma.$disconnect();
    }

  } catch (error) {
    console.error('Error getting craftsmen:', error);
    return NextResponse.json(
      { error: 'Failed to get craftsmen' },
      { status: 500 }
    );
  }
}
