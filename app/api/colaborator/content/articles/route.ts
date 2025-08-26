import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/content/articles - Get all articles
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    const articles = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      articles
    });

  } catch (error) {
    console.error('Error getting articles:', error);
    return NextResponse.json(
      { error: 'Failed to get articles' },
      { status: 500 }
    );
  }
}

// POST /api/colaborator/content/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    const { title, slug, excerpt, content, published, categoryId, tags } = await request.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titlul și conținutul sunt obligatorii' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'URL slug-ul există deja' },
        { status: 400 }
      );
    }

    // Create the article
    const articleData: any = {
      title,
      slug: slug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
      excerpt: excerpt || '',
      content,
      published: published || false,
      publishedAt: published ? new Date() : null,
      authorId: session.user.id
    };

    if (categoryId) {
      articleData.categoryId = categoryId;
    }

    const article = await prisma.blogPost.create({
      data: articleData,
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

    // Handle tags if provided
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
          where: { id: article.id },
          data: {
            tags: {
              connect: { id: tag.id }
            }
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Articolul a fost creat cu succes',
      article
    });

  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
