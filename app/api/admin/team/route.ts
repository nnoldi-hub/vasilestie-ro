import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/admin/team - Get all team members
export async function GET() {
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

    const AdminService = await import('@/lib/services/admin-service');
    const teamMembers = await AdminService.getTeamMembers();
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/team - Create new team member
export async function POST(request: NextRequest) {
  try {
    // Import dependencies dynamically
    const { getServerSession } = await import('next-auth/next');
    const { authOptions } = await import('@/lib/auth');
    
    const session = await getServerSession(authOptions);
    
    // În development, permitem și cereri fără sesiune pentru testare
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasValidSession = session?.user && ['SUPER_ADMIN', 'ADMIN'].includes(session.user.role);
    
    if (!hasValidSession && !isDevelopment) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Loghează informații despre autentificare în development
    if (isDevelopment) {
      console.log('🔧 Development mode - session:', {
        hasSession: !!session,
        user: session?.user ? {
          email: session.user.email,
          role: session.user.role
        } : null
      });
    }

    const data = await request.json();
    console.log('🔧 Received data:', data);
    
    // Extract only the fields we need for User model
    const userData = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      role: data.role
    };
    
    console.log('🔧 Cleaned user data:', userData);
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.role) {
      console.error('🔧 Missing required fields:', { name: !!userData.name, email: !!userData.email, role: !!userData.role });
      return NextResponse.json(
        { error: 'Missing required fields: name, email, role' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT'];
    if (!validRoles.includes(userData.role)) {
      console.error('🔧 Invalid role:', userData.role);
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    console.log('🔧 Creating member with AdminService...');

    const AdminService = await import('@/lib/services/admin-service');
    const newMember = await AdminService.createTeamMember({
      name: userData.name,
      email: userData.email,
      role: userData.role
    });

    console.log('🔧 Member created successfully:', newMember);

    // Log the activity (doar dacă avem sesiune validă)
    if (session?.user?.id) {
      await AdminService.createActivityLog({
        userId: session.user.id,
        action: 'TEAM_MEMBER_CREATED',
        details: `Created team member: ${newMember.name} (${newMember.email})`
      });
    } else if (isDevelopment) {
      console.log('🔧 Development: No session for activity logging');
    }

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
