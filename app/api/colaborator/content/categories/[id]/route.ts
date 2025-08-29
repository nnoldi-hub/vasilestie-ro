import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/content/categories/[id] - Get specific category
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

    const category = await prisma.blogCategory.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Categoria nu a fost găsită' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category: {
        ...category,
        postsCount: category._count.posts
      }
    });

  } catch (error) {
    console.error('Error getting category:', error);
    return NextResponse.json(
      { error: 'Failed to get category' },
      { status: 500 }
    );
  }
}

// PUT /api/colaborator/content/categories/[id] - Update category
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

    const { name, slug, description, color } = await request.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Numele categoriei este obligatoriu' },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await prisma.blogCategory.findUnique({
      where: { id: params.id }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Categoria nu a fost găsită' },
        { status: 404 }
      );
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

    // Check if slug already exists (excluding current category)
    const slugExists = await prisma.blogCategory.findFirst({
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

    const updatedCategory = await prisma.blogCategory.update({
      where: { id: params.id },
      data: {
        name,
        slug: finalSlug,
        description: description || null,
        color: color || null,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Categoria a fost actualizată cu succes',
      category: updatedCategory
    });

  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/colaborator/content/categories/[id] - Delete category
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

    // Check if category exists and get posts count
    const category = await prisma.blogCategory.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Categoria nu a fost găsită' },
        { status: 404 }
      );
    }

    // Check if category has posts
    if (category._count.posts > 0) {
      return NextResponse.json(
        { error: `Nu se poate șterge categoria. Există ${category._count.posts} articole asociate cu această categorie.` },
        { status: 400 }
      );
    }

    await prisma.blogCategory.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Categoria a fost ștearsă cu succes'
    });

  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
