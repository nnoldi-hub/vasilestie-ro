import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Signup API Called ===');
    
    // Import dependencies dynamically to avoid build-time issues
    const bcrypt = await import('bcryptjs');
    const { PrismaClient } = await import('@prisma/client');
    
    console.log('Dependencies imported successfully');
    
    const prisma = new PrismaClient();
    console.log('Prisma client created');

    const { name, email, password, role } = await request.json();
    console.log('Request data parsed:', { name, email, role, hasPassword: !!password });

    // Validări
    if (!name || !email || !password) {
      console.log('Validation failed: missing fields');
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short');
      return NextResponse.json(
        { error: 'Parola trebuie să aibă cel puțin 6 caractere' },
        { status: 400 }
      );
    }

    console.log('Starting database operations...');
    
    // Verifică dacă email-ul există deja
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    console.log('Existing user check completed:', !!existingUser);

    if (existingUser) {
      await prisma.$disconnect();
      console.log('User already exists, returning error');
      return NextResponse.json(
        { error: 'Un cont cu acest email există deja' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Password hashed successfully');

    // Validează rolul
    const validRoles = ['USER', 'CRAFTSMAN'];
    const userRole = validRoles.includes(role) ? role : 'USER';
    console.log('User role determined:', userRole);

    // Creează utilizatorul
    console.log('Creating user...');
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
    console.log('User created successfully:', user.id);

    // Dacă e meseriaș, creează și profilul de craftsman
    if (userRole === 'CRAFTSMAN') {
      console.log('Creating craftsman profile...');
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
      console.log('Craftsman profile created successfully');
    }

    await prisma.$disconnect();
    console.log('Database connection closed');

    console.log('Signup completed successfully');
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
  }
}
