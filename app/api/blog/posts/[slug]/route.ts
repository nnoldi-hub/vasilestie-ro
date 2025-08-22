import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // Import Prisma dynamically to avoid build-time issues
  const { prisma } = await import('@/lib/prisma');

  try {
    const { slug } = params;

    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        published: true
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            icon: true
          }
        },
        comments: {
          where: {
            approved: true,
            parentId: null // Only top-level comments
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            replies: {
              where: {
                approved: true
              },
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true
                  }
                }
              },
              orderBy: {
                createdAt: 'asc'
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Articolul nu a fost găsit' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    });

    // Get related posts
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        categoryId: post.categoryId,
        id: { not: post.id }
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        readTime: true,
        views: true,
        publishedAt: true,
        author: {
          select: {
            name: true
          }
        },
        category: {
          select: {
            name: true,
            color: true,
            icon: true
          }
        }
      },
      orderBy: {
        views: 'desc'
      },
      take: 3
    });

    return NextResponse.json({
      success: true,
      data: {
        post: {
          ...post,
          views: post.views + 1 // Return incremented view count
        },
        relatedPosts
      }
    });

  } catch (error) {
    console.error('GET /api/blog/posts/[slug] error:', error);
    return NextResponse.json(
      { error: 'Eroare la preluarea articolului' },
      { status: 500 }
    );
  }
}
