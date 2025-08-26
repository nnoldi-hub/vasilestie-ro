import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// POST /api/colaborator/craftsmen/[id]/reject - Reject a craftsman
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMINISTRATOR', 'COLLABORATOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const craftsmanId = params.id;
    
    // Import Prisma dynamically
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      // For now, just verify the user exists
      const craftsman = await prisma.user.findUnique({
        where: {
          id: craftsmanId,
          role: 'CRAFTSMAN'
        }
      });

      if (!craftsman) {
        return NextResponse.json(
          { error: 'Craftsman not found' },
          { status: 404 }
        );
      }

      // TODO: Implement rejection logic when we have craftsman approval system
      // For now, just return success
      console.log(`Craftsman ${craftsmanId} rejected by ${session.user.email}`);

      return NextResponse.json({
        success: true,
        message: 'Craftsman rejected successfully'
      });

    } finally {
      await prisma.$disconnect();
    }

  } catch (error) {
    console.error('Error rejecting craftsman:', error);
    return NextResponse.json(
      { error: 'Failed to reject craftsman' },
      { status: 500 }
    );
  }
}
