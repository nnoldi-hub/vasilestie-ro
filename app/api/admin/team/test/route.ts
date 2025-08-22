import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// POST /api/admin/team/test - Test endpoint for creating team members without auth
export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Test endpoint called');
    
    const data = await request.json();
    console.log('📊 Received data:', data);
    
    // Validate required fields
    if (!data.name || !data.email || !data.role) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, role' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT'];
    if (!validRoles.includes(data.role)) {
      return NextResponse.json(
        { error: `Invalid role. Valid roles: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Import AdminService dynamically
    const AdminService = await import('@/lib/services/admin-service');
    const newMember = await AdminService.createTeamMember({
      name: data.name,
      email: data.email,
      role: data.role
    });

    console.log('✅ Member created:', newMember);

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating team member:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
