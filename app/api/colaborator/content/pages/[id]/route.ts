import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/content/pages/[id] - Get specific page
export async function GET(
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

    const page = await prisma.staticPage.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Pagina nu a fost găsită' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      page
    });

  } catch (error) {
    console.error('Error getting page:', error);
    return NextResponse.json(
      { error: 'Failed to get page' },
      { status: 500 }
    );
  }
}

// PUT /api/colaborator/content/pages/[id] - Update page
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

    // Check if page exists
    const existingPage = await prisma.staticPage.findUnique({
      where: { id: params.id }
    });

    if (!existingPage) {
      return NextResponse.json(
        { error: 'Pagina nu a fost găsită' },
        { status: 404 }
      );
    }

    const finalSlug = slug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

    // Check if slug already exists (excluding current page)
    const slugExists = await prisma.staticPage.findFirst({
      where: {
        slug: finalSlug,
        id: { not: params.id }
      }
    });

    if (slugExists) {
      return NextResponse.json(
        { error: 'URL slug-ul există deja' },
        { status: 400 }
      );
    }

    const updatedPage = await prisma.staticPage.update({
      where: { id: params.id },
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt: excerpt || null,
        published: published || false,
        template: template || 'default',
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        updatedAt: new Date()
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
      message: 'Pagina a fost actualizată cu succes',
      page: updatedPage
    });

  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE /api/colaborator/content/pages/[id] - Delete page
export async function DELETE(
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

    // Check if page exists
    const page = await prisma.staticPage.findUnique({
      where: { id: params.id }
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Pagina nu a fost găsită' },
        { status: 404 }
      );
    }

    await prisma.staticPage.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Pagina a fost ștearsă cu succes'
    });

  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
