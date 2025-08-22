import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import * as AdminService from '@/lib/services/admin-service';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// GET /api/admin/activity - Get activity logs
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Use nextUrl.searchParams instead of new URL(request.url)
    const userId = request.nextUrl.searchParams.get('userId') || undefined;
    const action = request.nextUrl.searchParams.get('action') || undefined;
    const dateFromParam = request.nextUrl.searchParams.get('dateFrom');
    const dateToParam = request.nextUrl.searchParams.get('dateTo');
    
    const dateFrom = dateFromParam ? new Date(dateFromParam) : undefined;
    const dateTo = dateToParam ? new Date(dateToParam) : undefined;

    const logs = await AdminService.getActivityLogs({
      userId,
      action,
      dateFrom,
      dateTo
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
