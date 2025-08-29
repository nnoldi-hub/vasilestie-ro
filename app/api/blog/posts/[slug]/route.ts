import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
        tags: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        comments: {
          where: {
            approved: true,
            parentId: null // Only top-level comments
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            guestName: true,
            guestEmail: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            },
            replies: {
              where: {
                approved: true
              },
              select: {
                id: true,
                content: true,
                createdAt: true,
                guestName: true,
                guestEmail: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
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
      post: {
        ...post,
        views: post.views + 1, // Return incremented view count
        comments: post.comments.map(comment => ({
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt.toISOString(),
          author: {
            name: comment.user?.name || comment.guestName || null,
            email: comment.user?.email || comment.guestEmail || 'anonymous@example.com'
          },
          replies: comment.replies.map(reply => ({
            id: reply.id,
            content: reply.content,
            createdAt: reply.createdAt.toISOString(),
            author: {
              name: reply.user?.name || reply.guestName || null,
              email: reply.user?.email || reply.guestEmail || 'anonymous@example.com'
            }
          }))
        })),
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
