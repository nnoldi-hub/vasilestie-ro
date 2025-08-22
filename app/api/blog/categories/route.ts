import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Add "Toate" category at the beginning
    const allPostsCount = await prisma.blogPost.count({
      where: { published: true }
    });

    const categoriesWithAll = [
      {
        id: 'toate',
        name: 'Toate',
        slug: 'toate',
        description: 'Toate articolele',
        color: '#6B7280',
        icon: '📚',
        _count: {
          posts: allPostsCount
        }
      },
      ...categories
    ];

    return NextResponse.json({
      success: true,
      data: categoriesWithAll
    });

  } catch (error) {
    console.error('GET /api/blog/categories error:', error);
    return NextResponse.json(
      { error: 'Eroare la preluarea categoriilor' },
      { status: 500 }
    );
  }
}
