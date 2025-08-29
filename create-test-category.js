const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestCategory() {
  try {
    // Check if category already exists
    const existing = await prisma.blogCategory.findUnique({
      where: { slug: 'test-category' }
    });

    if (existing) {
      console.log('Categoria de test există deja:', existing);
      return existing;
    }

    const category = await prisma.blogCategory.create({
      data: {
        name: 'Test Category',
        slug: 'test-category',
        description: 'O categorie de test pentru articole de blog'
      }
    });
    console.log('Categorie creată cu succes:', category);
    return category;
  } catch (error) {
    console.error('Eroare la crearea categoriei:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestCategory();
