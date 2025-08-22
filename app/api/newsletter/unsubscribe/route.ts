import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Token lipsă'
      }, { status: 400 });
    }

    const subscription = await prisma.newsletter.findFirst({
      where: { 
        unsubscribeToken: token,
        subscribed: true
      }
    });

    if (!subscription) {
      return NextResponse.json({
        success: false,
        message: 'Token invalid sau deja folosit'
      }, { status: 400 });
    }

    await prisma.newsletter.update({
      where: { id: subscription.id },
      data: {
        subscribed: false
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Te-ai dezabonat cu succes de la newsletter.'
    });

  } catch (error) {
    console.error('POST /api/newsletter/unsubscribe error:', error);
    return NextResponse.json({
      success: false,
      message: 'Eroare la dezabonare'
    }, { status: 500 });
  }
}
