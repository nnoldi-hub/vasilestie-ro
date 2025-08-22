import { NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/admin/stats - Get admin dashboard statistics
export async function GET() {
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

    // Import AdminService dynamically 
    const AdminService = await import('@/lib/services/admin-service');
    const stats = await AdminService.getAdminStats();
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
