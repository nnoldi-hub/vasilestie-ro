import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/permissions - Get collaborator permissions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMINISTRATOR', 'COLLABORATOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const userRole = session.user.role;
    let permissions;

    if (userRole === 'ADMINISTRATOR') {
      // Administrators have all permissions
      permissions = {
        canViewUsers: true,
        canEditUsers: true,
        canViewCraftsmen: true,
        canEditCraftsmen: true,
        canViewContent: true,
        canEditContent: true,
        canViewAnalytics: true,
        canViewLogs: true,
      };
    } else {
      // Collaborators have limited permissions
      // TODO: Load custom permissions from database
      permissions = {
        canViewUsers: true,
        canEditUsers: false,
        canViewCraftsmen: true,
        canEditCraftsmen: true, // Allow craftsmen management
        canViewContent: true,
        canEditContent: false,
        canViewAnalytics: false,
        canViewLogs: false,
      };
    }

    return NextResponse.json({
      success: true,
      permissions
    });

  } catch (error) {
    console.error('Error getting permissions:', error);
    return NextResponse.json(
      { error: 'Failed to get permissions' },
      { status: 500 }
    );
  }
}
