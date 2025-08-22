import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import * as AdminService from '@/lib/services/admin-service';

// GET /api/admin/team - Get all team members
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

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
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    const newMember = await AdminService.createTeamMember({
      name: data.name,
      email: data.email,
      role: data.role
    });

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
