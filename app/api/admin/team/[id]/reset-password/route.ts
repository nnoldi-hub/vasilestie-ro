import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// POST /api/admin/team/[id]/reset-password - Reset team member password
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Import dependencies dynamically
    const { getServerSession } = await import('next-auth/next');
    const { authOptions } = await import('@/lib/auth');
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMINISTRATOR', 'COLLABORATOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Only administrators can reset passwords
    if (session.user.role !== 'ADMINISTRATOR') {
      return NextResponse.json(
        { error: 'Only administrators can reset passwords' },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { newPassword, sendEmail = true } = body;

    // Generate a temporary password if none provided
    const tempPassword = newPassword || generateTemporaryPassword();
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    // Update user password
    const user = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    // Log the activity
    await prisma.adminLog.create({
      data: {
        userId: session.user.id,
        action: 'USER_UPDATED',
        details: `Reset password for ${user.name} (${user.email})`
      }
    });

    // TODO: Send email with new password (if sendEmail is true)
    // This would require email service integration

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
      temporaryPassword: tempPassword, // In production, this should only be sent via email
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateTemporaryPassword(): string {
  // Generate a secure temporary password
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
}
