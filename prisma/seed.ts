import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Import enums directly from Prisma generated types
type UserRole = 'USER' | 'CRAFTSMAN' | 'ADMIN' | 'SUPER_ADMIN' | 'MODERATOR' | 'SUPPORT';
type AdminAction = 'USER_CREATED' | 'USER_UPDATED' | 'USER_DELETED' | 'CRAFTSMAN_VERIFIED' | 'CRAFTSMAN_REJECTED' | 'REVIEW_MODERATED' | 'BOOKING_UPDATED' | 'CATEGORY_CREATED' | 'CATEGORY_UPDATED' | 'SYSTEM_CONFIG_CHANGED' | 'LOGIN' | 'LOGOUT';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories first
  const categories = [
    {
      name: 'Instalator',
      slug: 'instalator',
      icon: 'wrench',
      description: 'Instalații sanitare și termice'
    },
    {
      name: 'Electrician',
      slug: 'electrician', 
      icon: 'zap',
      description: 'Instalații electrice și reparații'
    },
    {
      name: 'Constructor',
      slug: 'constructor',
      icon: 'home',
      description: 'Construcții și renovări'
    },
    {
      name: 'Zugrav',
      slug: 'zugrav',
      icon: 'paintbrush',
      description: 'Vopsitorii și finisaje'
    },
    {
      name: 'Grădinar',
      slug: 'gradinar',
      icon: 'flower',
      description: 'Amenajări peisagistice și grădinărit'
    },
    {
      name: 'Curățenie',
      slug: 'curatenie',
      icon: 'sparkles',
      description: 'Servicii de curățenie'
    }
  ];

  // Create categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@vasilestie.ro' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@vasilestie.ro',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date()
    }
  });

  // Create some regular users
  const users = [
    {
      name: 'Ion Popescu',
      email: 'ion@example.com',
      role: 'USER'
    },
    {
      name: 'Maria Ionescu', 
      email: 'maria@example.com',
      role: 'USER'
    },
    {
      name: 'Vasile Georgescu',
      email: 'vasile@example.com', 
      role: 'CRAFTSMAN'
    },
    {
      name: 'Ana Stoica',
      email: 'ana@example.com',
      role: 'CRAFTSMAN'
    }
  ] as const;

  for (const userData of users) {
    const password = await bcrypt.hash('password123', 12);
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password,
        emailVerified: new Date()
      }
    });
  }

  // Create craftsmen profiles
  const craftsmanUsers = await prisma.user.findMany({
    where: { role: 'CRAFTSMAN' }
  });

  const craftsmenData = [
    {
      businessName: 'Instalații Vasile SRL',
      description: 'Oferim servicii complete de instalații sanitare și termice. Cu peste 10 ani experiență în domeniu.',
      phone: '0721234567',
      address: 'Str. Meșterilor nr. 15',
      city: 'București',
      county: 'București',
      experience: 10,
      verified: true,
      rating: 4.8
    },
    {
      businessName: 'Electro Ana',
      description: 'Servicii profesionale de electricitate pentru casă și birou. Intervenții rapide 24/7.',
      phone: '0722345678', 
      address: 'Bd. Libertății nr. 45',
      city: 'Cluj-Napoca',
      county: 'Cluj',
      experience: 8,
      verified: true,
      rating: 4.6
    }
  ];

  for (let i = 0; i < craftsmanUsers.length && i < craftsmenData.length; i++) {
    const craftsman = await prisma.craftsman.upsert({
      where: { userId: craftsmanUsers[i].id },
      update: {},
      create: {
        userId: craftsmanUsers[i].id,
        ...craftsmenData[i]
      }
    });

    // Add categories to craftsmen
    const categoryIds = await prisma.category.findMany({
      select: { id: true },
      take: 2
    });

    for (const cat of categoryIds) {
      await prisma.craftsmanCategory.upsert({
        where: {
          craftsmanId_categoryId: {
            craftsmanId: craftsman.id,
            categoryId: cat.id
          }
        },
        update: {},
        create: {
          craftsmanId: craftsman.id,
          categoryId: cat.id
        }
      });
    }
  }

  // Create some admin logs
  await prisma.adminLog.create({
    data: {
      userId: adminUser.id,
      action: 'SYSTEM_CONFIG_CHANGED',
      details: 'Database initialized with seed data'
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`👤 Admin login: admin@vasilestie.ro / admin123`);
  console.log(`📊 Created ${categories.length} categories`);
  console.log(`👥 Created ${users.length + 1} users`);
  console.log(`🔨 Created ${craftsmenData.length} craftsmen`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
