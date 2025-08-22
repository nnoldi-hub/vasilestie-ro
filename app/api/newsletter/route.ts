import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import crypto from 'crypto';

const subscribeSchema = z.object({
  email: z.string().email('Email invalid'),
  categories: z.array(z.string()).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, categories } = subscribeSchema.parse(body);

    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (existingSubscription) {
      if (existingSubscription.subscribed) {
        return NextResponse.json({
          success: false,
          message: 'Ești deja abonat la newsletter'
        }, { status: 400 });
      } else {
        // Reactivate subscription
        const confirmToken = crypto.randomBytes(32).toString('hex');
        
        await prisma.newsletter.update({
          where: { email },
          data: {
            subscribed: true,
            confirmed: false,
            confirmToken,
            categories: categories ? JSON.stringify(categories) : null,
            subscribedAt: new Date()
          }
        });

        // TODO: Send confirmation email here
        console.log(`Confirmation token for ${email}: ${confirmToken}`);

        return NextResponse.json({
          success: true,
          message: 'Abonarea a fost reactivată! Verifică emailul pentru confirmare.'
        });
      }
    }

    // Create new subscription
    const confirmToken = crypto.randomBytes(32).toString('hex');
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');

    await prisma.newsletter.create({
      data: {
        email,
        subscribed: true,
        confirmed: false,
        confirmToken,
        unsubscribeToken,
        categories: categories ? JSON.stringify(categories) : null
      }
    });

    // TODO: Send confirmation email here
    console.log(`Confirmation token for ${email}: ${confirmToken}`);

    return NextResponse.json({
      success: true,
      message: 'Abonare reușită! Verifică emailul pentru confirmare.'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Datele introduse sunt invalide',
        errors: error.errors
      }, { status: 400 });
    }

    console.error('POST /api/newsletter error:', error);
    return NextResponse.json({
      success: false,
      message: 'Eroare la procesarea abonării'
    }, { status: 500 });
  }
}

// Confirm subscription
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Token lipsă'
      }, { status: 400 });
    }

    const subscription = await prisma.newsletter.findFirst({
      where: { confirmToken: token }
    });

    if (!subscription) {
      return NextResponse.json({
        success: false,
        message: 'Token invalid sau expirat'
      }, { status: 400 });
    }

    await prisma.newsletter.update({
      where: { id: subscription.id },
      data: {
        confirmed: true,
        confirmToken: null,
        confirmedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Abonarea a fost confirmată cu succes!'
    });

  } catch (error) {
    console.error('PATCH /api/newsletter error:', error);
    return NextResponse.json({
      success: false,
      message: 'Eroare la confirmarea abonării'
    }, { status: 500 });
  }
}
