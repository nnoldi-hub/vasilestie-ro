import { NextRequest, NextResponse } from 'next/server';

// Debug endpoint for NextAuth configuration
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log('=== NextAuth Debug Check ===');
    
    // Check environment variables
    const nextAuthSecret = process.env.NEXTAUTH_SECRET;
    const nextAuthUrl = process.env.NEXTAUTH_URL;
    const databaseUrl = process.env.DATABASE_URL;
    
    console.log('Environment variables:');
    console.log('NEXTAUTH_SECRET exists:', !!nextAuthSecret);
    console.log('NEXTAUTH_URL:', nextAuthUrl);
    console.log('DATABASE_URL exists:', !!databaseUrl);
    
    // Try to import and test auth configuration
    const { authOptions } = await import('@/lib/auth');
    console.log('Auth options imported successfully');
    console.log('Auth providers:', authOptions.providers?.length || 0);
    console.log('Auth adapter configured:', !!authOptions.adapter);
    
    // Test database connection for auth
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const accountCount = await prisma.account.count();
    const sessionCount = await prisma.session.count();
    const userCount = await prisma.user.count();
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      success: true,
      environment: {
        hasNextAuthSecret: !!nextAuthSecret,
        nextAuthUrl: nextAuthUrl,
        hasDatabaseUrl: !!databaseUrl,
        nodeEnv: process.env.NODE_ENV
      },
      authConfig: {
        providersCount: authOptions.providers?.length || 0,
        hasAdapter: !!authOptions.adapter,
        sessionStrategy: authOptions.session?.strategy || 'unknown'
      },
      databaseCounts: {
        accounts: accountCount,
        sessions: sessionCount,
        users: userCount
      }
    });
    
  } catch (error) {
    console.error('NextAuth debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST() {
  return GET(); // Same logic for both GET and POST
}
