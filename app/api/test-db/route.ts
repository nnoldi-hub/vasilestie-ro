import { NextRequest, NextResponse } from 'next/server';

// Test endpoint for debugging database connection on Vercel
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log('=== Database Connection Test ===');
    
    // Check environment variables
    const dbUrl = process.env.DATABASE_URL;
    console.log('DATABASE_URL exists:', !!dbUrl);
    console.log('DATABASE_URL starts with:', dbUrl ? dbUrl.substring(0, 20) + '...' : 'undefined');
    
    // Import Prisma dynamically
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    console.log('Prisma client created');
    
    // Test database connection
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      hasDbUrl: !!dbUrl,
      dbUrlPrefix: dbUrl ? dbUrl.substring(0, 20) + '...' : 'undefined'
    });
    
  } catch (error) {
    console.error('Database test error:', error);
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
