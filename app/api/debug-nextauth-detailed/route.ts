import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    console.log('=== NextAuth Detailed Debug ===');
    
    // Test environment variables
    const env = {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'SET' : 'MISSING',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    };
    
    console.log('Environment variables:', env);
    
    // Test NextAuth configuration
    let authConfigStatus = 'UNKNOWN';
    let authError = null;
    
    try {
      // Try to import the auth configuration
      const { authOptions } = await import('../../../lib/auth');
      authConfigStatus = 'LOADED';
      console.log('Auth options loaded successfully');
      
      // Check providers
      if (authOptions.providers) {
        console.log(`Providers configured: ${authOptions.providers.length}`);
      }
      
      // Check adapter
      if (authOptions.adapter) {
        console.log('Database adapter configured');
      }
      
    } catch (error) {
      authConfigStatus = 'ERROR';
      authError = error instanceof Error ? error.message : 'Unknown error';
      console.error('Auth configuration error:', error);
    }
    
    // Test NextAuth session endpoint directly
    let sessionTest = 'UNKNOWN';
    let sessionError = null;
    
    try {
      const baseUrl = process.env.NEXTAUTH_URL || req.url.replace('/api/debug-nextauth-detailed', '');
      const sessionUrl = `${baseUrl}/api/auth/session`;
      console.log('Testing session endpoint:', sessionUrl);
      
      const sessionResponse = await fetch(sessionUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      sessionTest = `STATUS_${sessionResponse.status}`;
      
      if (!sessionResponse.ok) {
        const errorText = await sessionResponse.text();
        sessionError = errorText;
        console.error('Session endpoint error:', errorText);
      } else {
        const sessionData = await sessionResponse.json();
        console.log('Session endpoint response:', sessionData);
      }
      
    } catch (error) {
      sessionTest = 'FETCH_ERROR';
      sessionError = error instanceof Error ? error.message : 'Unknown error';
      console.error('Session endpoint fetch error:', error);
    }
    
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: env,
      authConfig: {
        status: authConfigStatus,
        error: authError,
      },
      sessionEndpoint: {
        status: sessionTest,
        error: sessionError,
      },
      requestUrl: req.url,
      userAgent: req.headers.get('user-agent'),
    };
    
    console.log('=== Debug Results ===', JSON.stringify(diagnostics, null, 2));
    
    return NextResponse.json(diagnostics, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
    
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({ 
      error: 'Debug endpoint failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
