import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    const { id } = params;
    const { status } = await request.json();

    // Verifică dacă statusul este valid
    if (!['ACTIVE', 'INACTIVE', 'SUSPENDED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status invalid' },
        { status: 400 }
      );
    }

    // Nu permite colaboratorului să modifice administratorii
    if (session.user.role === 'COLLABORATOR') {
      const targetUser = await prisma.user.findUnique({
        where: { id },
        select: { role: true }
      });

      if (!targetUser) {
        return NextResponse.json(
          { error: 'Utilizatorul nu a fost găsit' },
          { status: 404 }
        );
      }

      if (targetUser.role === 'ADMINISTRATOR') {
        return NextResponse.json(
          { error: 'Nu puteți modifica statusul unui administrator' },
          { status: 403 }
        );
      }
    }

    // Actualizează statusul utilizatorului
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        lastLogin: true,
      }
    });

    return NextResponse.json({
      message: `Statusul utilizatorului a fost ${status === 'ACTIVE' ? 'activat' : status === 'INACTIVE' ? 'dezactivat' : 'suspendat'}`,
      user: updatedUser
    });

  } catch (error) {
    console.error('Eroare la actualizarea statusului utilizatorului:', error);
    return NextResponse.json(
      { error: 'Eroare internă de server' },
      { status: 500 }
    );
  }
}
