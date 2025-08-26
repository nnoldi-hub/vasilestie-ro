import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// PATCH /api/colaborator/content/articles/[id]/toggle - Toggle article published status
export async function PATCH(
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
    const { published } = await request.json();

    // Check if article exists
    const existingArticle = await prisma.blogPost.findUnique({
      where: { id }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Articolul nu a fost găsit' },
        { status: 404 }
      );
    }

    // Update published status
    const updateData: any = {
      published,
      updatedAt: new Date()
    };

    if (published && !existingArticle.published) {
      updateData.publishedAt = new Date();
    } else if (!published) {
      updateData.publishedAt = null;
    }

    const article = await prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        tags: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: `Articolul a fost ${published ? 'publicat' : 'retras'} cu succes`,
      article
    });

  } catch (error) {
    console.error('Error toggling article status:', error);
    return NextResponse.json(
      { error: 'Failed to toggle article status' },
      { status: 500 }
    );
  }
}
