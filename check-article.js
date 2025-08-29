const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkArticle() {
  try {
    const slug = 'alegerea-culorii-potrivite-pentru-camera-copilului-ghidul-prinilor-creativi';
    
    // Check if article exists
    const article = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        publishedAt: true,
        createdAt: true
      }
    });
    
    console.log('Article found:', article);
    
    if (!article) {
      console.log('Article not found with slug:', slug);
      
      // List all articles to see what exists
      const allArticles = await prisma.blogPost.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          published: true
        }
      });
      
      console.log('All articles:', allArticles);
    } else if (!article.published) {
      console.log('Article exists but is not published!');
      
      // Update to published
      const updated = await prisma.blogPost.update({
        where: { slug },
        data: { 
          published: true,
          publishedAt: new Date()
        }
      });
      
      console.log('Article updated to published:', updated);
    }
    
  } catch (error) {
    console.error('Error checking article:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkArticle();
