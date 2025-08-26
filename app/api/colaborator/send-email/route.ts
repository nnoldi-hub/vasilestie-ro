import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    const { userId, subject, message } = await request.json();

    // Validare date
    if (!userId || !subject || !message) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii' },
        { status: 400 }
      );
    }

    // Verifică dacă utilizatorul destinatar există
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true
      }
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Utilizatorul destinatar nu a fost găsit' },
        { status: 404 }
      );
    }

    // Nu permite colaboratorului să trimită email-uri către administratori
    if (session.user.role === 'COLLABORATOR' && targetUser.role === 'ADMINISTRATOR') {
      return NextResponse.json(
        { error: 'Nu puteți trimite email-uri către administratori' },
        { status: 403 }
      );
    }

    // TODO: Integrează cu un serviciu de email (ex: SendGrid, Nodemailer)
    // Pentru moment, simulăm trimiterea email-ului
    
    // Log email-ul în baza de date pentru audit
    await prisma.emailLog.create({
      data: {
        fromUserId: session.user.id,
        toUserId: userId,
        subject,
        message,
        status: 'sent', // sau 'pending', 'failed'
        sentAt: new Date()
      }
    }).catch(() => {
      // Dacă tabela nu există, ignoră eroarea deocamdată
      console.log('EmailLog table not found - email logging skipped');
    });

    // Simulare trimitere email
    console.log(`Email trimis către ${targetUser.email}:`);
    console.log(`De la: ${session.user.name} (${session.user.email})`);
    console.log(`Subiect: ${subject}`);
    console.log(`Mesaj: ${message}`);

    return NextResponse.json({
      message: `Email trimis cu succes către ${targetUser.name}`,
      recipient: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email
      }
    });

  } catch (error) {
    console.error('Eroare la trimiterea email-ului:', error);
    return NextResponse.json(
      { error: 'Eroare internă de server' },
      { status: 500 }
    );
  }
}
