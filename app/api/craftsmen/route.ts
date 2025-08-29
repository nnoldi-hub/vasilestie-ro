import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Returnează doar datele publice relevante pentru hartă
    const craftsmen = await prisma.craftsman.findMany({
      where: {
        verified: true
      }
    });
    return NextResponse.json({ data: craftsmen });
  } catch (error) {
    console.error('Error fetching craftsmen:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
