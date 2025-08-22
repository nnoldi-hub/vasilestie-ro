import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// PUT /api/admin/team/[id] - Update team member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Import dependencies dynamically
    const { getServerSession } = await import('next-auth/next');
    const { authOptions } = await import('@/lib/auth');
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const { id } = params;

    const AdminService = await import('@/lib/services/admin-service');
    const updatedMember = await AdminService.updateTeamMember(id, data);

    // Log the activity
    await AdminService.createActivityLog({
      userId: session.user.id,
      action: 'TEAM_MEMBER_UPDATED',
      details: `Updated team member: ${updatedMember.name}`
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/team/[id] - Delete team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Import dependencies dynamically
    const { getServerSession } = await import('next-auth/next');
    const { authOptions } = await import('@/lib/auth');
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const { id } = params;

    // Don't allow deleting yourself
    if (session.user.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const AdminService = await import('@/lib/services/admin-service');
    await AdminService.deleteTeamMember(id);

    // Log the activity
    await AdminService.createActivityLog({
      userId: session.user.id,
      action: 'TEAM_MEMBER_DELETED',
      details: `Deleted team member with ID: ${id}`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
