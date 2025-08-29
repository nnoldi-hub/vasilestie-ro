import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/content/pages - Get all pages
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    const pages = await prisma.staticPage.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      pages
    });

  } catch (error) {
    console.error('Error getting pages:', error);
    return NextResponse.json(
      { error: 'Failed to get pages' },
      { status: 500 }
    );
  }
}

// POST /api/colaborator/content/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      published, 
      template, 
      metaTitle, 
      metaDescription 
    } = await request.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titlul și conținutul sunt obligatorii' },
        { status: 400 }
      );
    }

    const finalSlug = slug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

    // Check if slug already exists
    const existingPage = await prisma.staticPage.findUnique({
      where: { slug: finalSlug }
    });

    if (existingPage) {
      return NextResponse.json(
        { error: 'URL slug-ul există deja' },
        { status: 400 }
      );
    }

    const page = await prisma.staticPage.create({
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt: excerpt || null,
        published: published || false,
        template: template || 'default',
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        authorId: session.user.id
      },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Pagina a fost creată cu succes',
      page
    });

  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
