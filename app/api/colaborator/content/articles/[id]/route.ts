import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// PUT /api/colaborator/content/articles/[id] - Update article
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
    const { title, slug, excerpt, content, published, categoryId, tags } = await request.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titlul și conținutul sunt obligatorii' },
        { status: 400 }
      );
    }

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

    // Check if slug is taken by another article
    if (slug && slug !== existingArticle.slug) {
      const slugTaken = await prisma.blogPost.findFirst({
        where: { 
          slug,
          id: { not: id }
        }
      });

      if (slugTaken) {
        return NextResponse.json(
          { error: 'URL slug-ul este deja folosit' },
          { status: 400 }
        );
      }
    }

    // Update article
    const updateData: any = {
      title,
      slug: slug || existingArticle.slug,
      excerpt: excerpt || '',
      content,
      published: published || false,
      updatedAt: new Date()
    };

    if (published && !existingArticle.published) {
      updateData.publishedAt = new Date();
    } else if (!published) {
      updateData.publishedAt = null;
    }

    if (categoryId) {
      updateData.categoryId = categoryId;
    } else {
      updateData.categoryId = null;
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

    // Handle tags update
    if (tags !== undefined) {
      // First, disconnect all existing tags
      await prisma.blogPost.update({
        where: { id },
        data: {
          tags: {
            set: []
          }
        }
      });

      // Then connect new tags
      if (tags && typeof tags === 'string') {
        const tagNames = tags.split(',').map(tag => tag.trim()).filter(Boolean);
        
        for (const tagName of tagNames) {
          // Create or find tag
          const tag = await prisma.blogTag.upsert({
            where: { slug: tagName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') },
            update: {},
            create: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
            }
          });

          // Connect tag to article
          await prisma.blogPost.update({
            where: { id },
            data: {
              tags: {
                connect: { id: tag.id }
              }
            }
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Articolul a fost actualizat cu succes',
      article
    });

  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE /api/colaborator/content/articles/[id] - Delete article
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

    const { id } = params;

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

    // Delete article (tags will be disconnected automatically)
    await prisma.blogPost.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Articolul a fost șters cu succes'
    });

  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
