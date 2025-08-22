import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Nu ești autentificat' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'CRAFTSMAN') {
      return NextResponse.json(
        { error: 'Acces interzis - doar pentru meseriaș' },
        { status: 403 }
      );
    }

    // Preia datele meseriaș-ului
    const craftsman = await prisma.craftsman.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true
          }
        },
        categories: {
          include: {
            category: true
          }
        },
        portfolio: true,
        subscriptionPayments: {
          where: {
            status: 'COMPLETED',
          },
          orderBy: {
            paymentDate: 'desc'
          },
          take: 1
        },
        contacts: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10,
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        reviews: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10,
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!craftsman) {
      return NextResponse.json(
        { error: 'Profilul de meseriaș nu a fost găsit' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: craftsman
    });

  } catch (error) {
    console.error('GET /api/craftsman error:', error);
    return NextResponse.json(
      { error: 'Eroare la preluarea datelor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Nu ești autentificat' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'CRAFTSMAN') {
      return NextResponse.json(
        { error: 'Acces interzis - doar pentru meseriaș' },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validări
    if (!data.businessName || !data.description || !data.phone) {
      return NextResponse.json(
        { error: 'Câmpurile obligatorii lipsesc: businessName, description, phone' },
        { status: 400 }
      );
    }

    // Actualizează datele meseriaș-ului
    const updatedCraftsman = await prisma.craftsman.update({
      where: { userId: session.user.id },
      data: {
        businessName: data.businessName,
        description: data.description,
        phone: data.phone,
        address: data.address || '',
        city: data.city || '',
        county: data.county || '',
        experience: data.experience || 0,
      }
    });

    // Dacă numele user-ului s-a schimbat, actualizează și în tabela users
    if (data.name && data.name !== session.user.name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name: data.name }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profilul a fost actualizat cu succes',
      data: updatedCraftsman
    });

  } catch (error) {
    console.error('PUT /api/craftsman error:', error);
    return NextResponse.json(
      { error: 'Eroare la actualizarea profilului' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
