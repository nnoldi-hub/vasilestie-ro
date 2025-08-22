import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/admin/activity - Get activity logs
export async function GET(request: NextRequest) {
  try {
    // Import dependencies dynamically to avoid build-time issues
    const { getServerSession } = await import('next-auth/next');
    const { authOptions } = await import('@/lib/auth');
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Import Prisma dynamically to avoid build-time connection issues
    const { prisma } = await import('@/lib/prisma');

    // Parse parameters safely
    const userId = request.nextUrl.searchParams.get('userId') || undefined;
    const action = request.nextUrl.searchParams.get('action') || undefined;
    const dateFromParam = request.nextUrl.searchParams.get('dateFrom');
    const dateToParam = request.nextUrl.searchParams.get('dateTo');
    
    const dateFrom = dateFromParam ? new Date(dateFromParam) : undefined;
    const dateTo = dateToParam ? new Date(dateToParam) : undefined;

    // Query activity logs with error handling
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
        ...(userId && { userId }),
        ...(action && { action: action as any }),
        ...(dateFrom && {
          createdAt: {
            gte: dateFrom,
            ...(dateTo && { lte: dateTo })
          }
        })
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    });

    // Transform logs to match expected format
    const transformedLogs = logs.map(log => ({
      id: log.id,
      userId: log.userId,
      userName: (log as any).user?.name || (log as any).user?.email || 'Unknown',
      action: log.action,
      details: log.details || undefined,
      timestamp: log.createdAt,
      type: getActionType(log.action)
    }));

    return NextResponse.json(transformedLogs);
    
  } catch (error) {
    console.error('Error in activity route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to determine action type
function getActionType(action: string): 'create' | 'update' | 'delete' | 'login' | 'system' {
  if (action.includes('CREATED')) return 'create';
  if (action.includes('UPDATED')) return 'update';
  if (action.includes('DELETED')) return 'delete';
  if (action.includes('LOGIN')) return 'login';
  return 'system';
}
