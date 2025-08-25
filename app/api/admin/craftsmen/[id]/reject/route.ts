import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and authorization
    const session = await getServerSession();
    if (!session?.user || (session.user as any).role !== 'ADMIN' && (session.user as any).role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const craftsmanId = params.id;

    // Reject the craftsman (mark as not verified and inactive)
    const updatedCraftsman = await prisma.craftsman.update({
      where: { id: craftsmanId },
      data: {
        verified: false,
        subscriptionStatus: 'INACTIVE',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    // Log the admin action
    await prisma.adminLog.create({
      data: {
        userId: (session.user as any).id,
        action: 'CRAFTSMAN_REJECTED',
        details: `Rejected craftsman: ${updatedCraftsman.user.name} (${updatedCraftsman.user.email})`,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Craftsman rejected successfully',
      craftsman: updatedCraftsman
    });
  } catch (error) {
    console.error('Error rejecting craftsman:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
