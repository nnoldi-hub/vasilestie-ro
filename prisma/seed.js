const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')
  
  // Clear existing data in proper order (respecting foreign keys)
  await prisma.adminLog.deleteMany({})
  await prisma.portfolioItem.deleteMany({})
  await prisma.subscriptionPayment.deleteMany({})
  await prisma.contactRequest.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.craftsmanCategory.deleteMany({})
  await prisma.craftsman.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.account.deleteMany({})
  await prisma.session.deleteMany({})
  
  // Clear blog data
  await prisma.blogComment.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.blogTag.deleteMany({})
  await prisma.blogCategory.deleteMany({})
  await prisma.newsletter.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('🗑️  Database cleared!')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Instalații Sanitare',
        description: 'Servicii complete de instalații sanitare și reparații',
        icon: '🔧',
        slug: 'instalatii-sanitare'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Construcții',
        description: 'Servicii de construcții și renovări',
        icon: '🏗️',
        slug: 'constructii'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Grădinărit',
        description: 'Servicii de grădinărit și amenajări exterioare',
        icon: '🌱',
        slug: 'gradinarit'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Electricitate',
        description: 'Servicii electrice și automatizări',
        icon: '⚡',
        slug: 'electricitate'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Curățenie',
        description: 'Servicii de curățenie profesională',
        icon: '🧹',
        slug: 'curatenie'
      }
    })
  ])

  console.log(`✅ Created ${categories.length} categories`)

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: '1',
        name: 'Ion Popescu',
        email: 'ion.popescu@email.com',
        emailVerified: new Date(),
        image: '/images/users/ion-popescu.jpg',
        role: 'USER'
      }
    }),
    prisma.user.create({
      data: {
        id: '2',
        name: 'Maria Ionescu',
        email: 'maria.ionescu@email.com',
        emailVerified: new Date(),
        image: '/images/users/maria-ionescu.jpg',
        role: 'USER'
      }
    }),
    prisma.user.create({
      data: {
        id: '3',
        name: 'Admin User',
        email: 'admin@meserii.com',
        emailVerified: new Date(),
        image: '/images/users/admin.jpg',
        role: 'ADMIN'
      }
    }),
    prisma.user.create({
      data: {
        id: '4',
        name: 'Andrei Ciobanu',
        email: 'andrei.ciobanu@email.com',
        emailVerified: new Date(),
        image: '/images/users/andrei-ciobanu.jpg',
        role: 'USER'
      }
    }),
    prisma.user.create({
      data: {
        id: '5',
        name: 'Elena Stoica',
        email: 'elena.stoica@email.com',
        emailVerified: new Date(),
        image: '/images/users/elena-stoica.jpg',
        role: 'USER'
      }
    })
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create blog categories
  const blogCategories = await Promise.all([
    prisma.blogCategory.create({
      data: {
        name: 'Sfaturi & Ghiduri',
        slug: 'sfaturi-ghiduri',
        description: 'Sfaturi practice și ghiduri step-by-step pentru proiecte DIY și colaborarea cu meșteșugarii.',
        color: '#3B82F6'
      }
    }),
    prisma.blogCategory.create({
      data: {
        name: 'Meseriași & Experți',
        slug: 'meseriasi-experti',
        description: 'Povești de succes, interviuri și sfaturi de la meșteșugarii profesioniști.',
        color: '#10B981'
      }
    }),
    prisma.blogCategory.create({
      data: {
        name: 'Tendințe & Inovații',
        slug: 'tendinte-inovatii',
        description: 'Ultimele tendințe în construcții, renovări și tehnologiile din industrie.',
        color: '#8B5CF6'
      }
    }),
    prisma.blogCategory.create({
      data: {
        name: 'Case Studies',
        slug: 'case-studies',
        description: 'Proiecte reale realizate prin platforma noastră cu detalii și rezultate.',
        color: '#F59E0B'
      }
    }),
    prisma.blogCategory.create({
      data: {
        name: 'Întreținere & Reparații',
        slug: 'intretinere-reparatii',
        description: 'Ghiduri pentru întreținerea casei și reparații minore pe care le poți face singur.',
        color: '#EF4444'
      }
    })
  ])

  console.log(`✅ Created ${blogCategories.length} blog categories`)

  // Create blog tags
  const blogTags = await Promise.all([
    prisma.blogTag.create({
      data: { name: 'Sfaturi', slug: 'sfaturi' }
    }),
    prisma.blogTag.create({
      data: { name: 'Meseriași', slug: 'meseriasi' }
    }),
    prisma.blogTag.create({
      data: { name: 'Bucătărie', slug: 'bucatarie' }
    }),
    prisma.blogTag.create({
      data: { name: 'Planificare', slug: 'planificare' }
    }),
    prisma.blogTag.create({
      data: { name: 'Buget', slug: 'buget' }
    }),
    prisma.blogTag.create({
      data: { name: 'Siguranță', slug: 'siguranta' }
    }),
    prisma.blogTag.create({
      data: { name: 'Electricitate', slug: 'electricitate' }
    }),
    prisma.blogTag.create({
      data: { name: 'DIY', slug: 'diy' }
    })
  ])

  console.log(`✅ Created ${blogTags.length} blog tags`)

  // Create blog posts with realistic content
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: '10 Sfaturi Esențiale pentru Renovarea Bucătăriei',
        slug: '10-sfaturi-esentiale-renovarea-bucatariei',
        excerpt: 'Descoperiți secretele unei renovări de bucătărie reușite, de la planificarea bugetului la alegerea materialelor potrivite.',
        content: 'Renovarea bucătăriei este unul dintre proiectele cele mai provocatoare, dar și cele mai satisfăcătoare pentru casa ta. Planificarea este cheia succesului - fă un plan detaliat înainte să începi.',
        featuredImage: '/images/blog/renovare-bucatarie-cover.jpg',
        published: true,
        featured: true,
        views: 1247,
        readTime: 8,
        authorId: users[2].id,
        categoryId: blogCategories[0].id,
        tags: {
          connect: [
            { id: blogTags[0].id }, // Sfaturi
            { id: blogTags[2].id }, // Bucătărie
            { id: blogTags[3].id }, // Planificare
            { id: blogTags[4].id }  // Buget
          ]
        }
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Cum să Alegi Electricianul Potrivit pentru Casa Ta',
        slug: 'cum-sa-alegi-electricianul-potrivit',
        excerpt: 'Ghid complet pentru selectarea unui electrician de încredere. Află ce întrebări să pui și ce verificări să faci înainte de angajare.',
        content: 'Alegerile greșite în privința instalațiilor electrice pot fi costisitoare și periculoase. Un electrician calificat nu doar că îți economisește bani, dar îți poate salva viața.',
        featuredImage: '/images/blog/electrician-lucru-cover.jpg',
        published: true,
        featured: false,
        views: 892,
        readTime: 6,
        authorId: users[2].id,
        categoryId: blogCategories[1].id,
        tags: {
          connect: [
            { id: blogTags[1].id }, // Meseriași
            { id: blogTags[5].id }, // Siguranță
            { id: blogTags[6].id }, // Electricitate
            { id: blogTags[0].id }  // Sfaturi
          ]
        }
      }
    }),
    prisma.blogPost.create({
      data: {
        title: '5 Proiecte DIY Sigure pe Care Le Poți Face Singur',
        slug: '5-proiecte-diy-sigure',
        excerpt: 'Proiecte simple de îmbunătățire a casei pe care le poți realiza fără ajutorul unui meșteșugar, cu instrumente de bază și puțină îndemânare.',
        content: 'Nu toate îmbunătățirile casei necesită un meșteșugar professional. Iată 5 proiecte DIY sigure și satisfăcătoare pentru începători.',
        featuredImage: '/images/blog/diy-proiecte-cover.jpg',
        published: true,
        featured: true,
        views: 1546,
        readTime: 7,
        authorId: users[2].id,
        categoryId: blogCategories[0].id,
        tags: {
          connect: [
            { id: blogTags[7].id }, // DIY
            { id: blogTags[0].id }, // Sfaturi
            { id: blogTags[5].id }, // Siguranță
            { id: blogTags[4].id }  // Buget
          ]
        }
      }
    })
  ])

  console.log(`✅ Created ${blogPosts.length} blog posts`)

  // Create newsletter subscriptions
  const newsletterSubscriptions = await Promise.all([
    prisma.newsletter.create({
      data: {
        email: 'alex.newsletter@email.com',
        subscribed: true,
        confirmed: true
      }
    }),
    prisma.newsletter.create({
      data: {
        email: 'maria.updates@email.com',
        subscribed: true,
        confirmed: true
      }
    }),
    prisma.newsletter.create({
      data: {
        email: 'ion.news@email.com',
        subscribed: true,
        confirmed: true
      }
    }),
    prisma.newsletter.create({
      data: {
        email: 'carmen.blog@email.com',
        subscribed: false,
        confirmed: false
      }
    })
  ])

  console.log(`✅ Created ${newsletterSubscriptions.length} newsletter subscriptions`)

  // Print summary with blog statistics
  const userCount = await prisma.user.count()
  const categoryCount = await prisma.category.count()
  const blogPostCount = await prisma.blogPost.count()
  const blogCategoryCount = await prisma.blogCategory.count()
  const blogTagCount = await prisma.blogTag.count()
  const newsletterCount = await prisma.newsletter.count()
  
  console.log(`
📊 Database Summary:
   👥 Users: ${userCount}
   📂 Categories: ${categoryCount}
   
   📝 Blog Posts: ${blogPostCount}
   📂 Blog Categories: ${blogCategoryCount}
   🏷️  Blog Tags: ${blogTagCount}
   📧 Newsletter Subscriptions: ${newsletterCount}
  `)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })