import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    // Validări
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Parola trebuie să aibă cel puțin 6 caractere' },
        { status: 400 }
      );
    }

    // Verifică dacă email-ul există deja
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un cont cu acest email există deja' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Validează rolul
    const validRoles = ['USER', 'CRAFTSMAN'];
    const userRole = validRoles.includes(role) ? role : 'USER';

    // Creează utilizatorul
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole as any,
        emailVerified: new Date(), // Pentru simplicitate, marcăm email-ul ca verificat
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    // Dacă e meseriaș, creează și profilul de craftsman
    if (userRole === 'CRAFTSMAN') {
      await prisma.craftsman.create({
        data: {
          user: {
            connect: {
              id: user.id
            }
          },
          businessName: `${name} - Servicii`,
          description: 'Profil nou de meseriaș. Completați informațiile în dashboard.',
          phone: '',
          address: '',
          city: '',
          county: '',
          experience: 0,
          rating: 0,
          reviewCount: 0,
          verified: false,
          subscriptionStatus: 'INACTIVE',
          subscriptionPlan: 'BASIC'
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Contul a fost creat cu succes',
      user
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la crearea contului' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
