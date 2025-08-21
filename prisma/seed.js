const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
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
        name: 'Reparații Electronice',
        description: 'Reparații și mentenanță echipamente electronice',
        icon: '⚡',
        slug: 'reparatii-electronice'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Curățenie',
        description: 'Servicii profesionale de curățenie',
        icon: '🧽',
        slug: 'curatenie'
      }
    })
  ])

  console.log('✅ Categories created!')

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@vasilestie.ro',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
      image: null
    }
  })

  // Create regular users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Ion Popescu',
        email: 'ion@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'USER',
        emailVerified: new Date()
      }
    }),
    prisma.user.create({
      data: {
        name: 'Maria Ionescu',
        email: 'maria@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'USER',
        emailVerified: new Date()
      }
    })
  ])

  console.log('✅ Users created!')

  // Create craftsman users first
  const craftsmanUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Vasile Meseriaș',
        email: 'vasile@meseriasi.ro',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'CRAFTSMAN',
        emailVerified: new Date()
      }
    }),
    prisma.user.create({
      data: {
        name: 'Gheorghe Constructor',
        email: 'gheorghe@constructii.ro',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'CRAFTSMAN',
        emailVerified: new Date()
      }
    }),
    prisma.user.create({
      data: {
        name: 'Ana Grădinărița',
        email: 'ana@gradinarit.ro',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        role: 'CRAFTSMAN',
        emailVerified: new Date()
      }
    })
  ])

  // Create craftsmen
  const craftsmen = await Promise.all([
    prisma.craftsman.create({
      data: {
        userId: craftsmanUsers[0].id,
        businessName: 'Vasile Instalații SRL',
        description: 'Meseriaș cu experiență de 15 ani în instalații sanitare și încălzire.',
        phone: '0722123456',
        address: 'Str. Exemplu nr. 10',
        city: 'București',
        county: 'Ilfov',
        experience: 15,
        rating: 4.8,
        reviewCount: 24,
        verified: true,
        subscriptionStatus: 'ACTIVE',
        subscriptionPlan: 'PREMIUM',
        subscriptionStartDate: new Date('2024-12-01'),
        subscriptionEndDate: new Date('2025-01-01')
      }
    }),
    prisma.craftsman.create({
      data: {
        userId: craftsmanUsers[1].id,
        businessName: 'Constructor Pro SRL',
        description: 'Specialist în construcții rezidențiale și comerciale cu peste 20 de ani experiență.',
        phone: '0722654321',
        address: 'Str. Construcției nr. 5',
        city: 'București',
        county: 'Ilfov',
        experience: 20,
        rating: 4.9,
        reviewCount: 45,
        verified: true,
        subscriptionStatus: 'ACTIVE',
        subscriptionPlan: 'PROFESSIONAL',
        subscriptionStartDate: new Date('2024-11-15'),
        subscriptionEndDate: new Date('2025-02-15')
      }
    }),
    prisma.craftsman.create({
      data: {
        userId: craftsmanUsers[2].id,
        businessName: 'Grădini Frumoase',
        description: 'Peisagist cu experiență în amenajări de grădini și întreținere spații verzi.',
        phone: '0722789123',
        address: 'Str. Verde nr. 3',
        city: 'București',
        county: 'Ilfov',
        experience: 8,
        rating: 4.7,
        reviewCount: 18,
        verified: true,
        subscriptionStatus: 'ACTIVE',
        subscriptionPlan: 'BASIC',
        subscriptionStartDate: new Date('2024-12-10'),
        subscriptionEndDate: new Date('2025-01-10')
      }
    })
  ])

  console.log('✅ Craftsmen created!')

  // Create craftsman-category relationships
  const craftsmanCategories = await Promise.all([
    prisma.craftsmanCategory.create({
      data: {
        craftsmanId: craftsmen[0].id,
        categoryId: categories[0].id
      }
    }),
    prisma.craftsmanCategory.create({
      data: {
        craftsmanId: craftsmen[1].id,
        categoryId: categories[1].id
      }
    }),
    prisma.craftsmanCategory.create({
      data: {
        craftsmanId: craftsmen[2].id,
        categoryId: categories[2].id
      }
    })
  ])

  console.log('✅ Craftsman categories linked!')

  // Create subscription payments
  const subscriptionPayments = await Promise.all([
    prisma.subscriptionPayment.create({
      data: {
        craftsmanId: craftsmen[0].id,
        amount: 49.99,
        plan: 'PREMIUM',
        paymentMethod: 'Card',
        validFrom: new Date('2024-12-01'),
        validUntil: new Date('2025-01-01'),
        status: 'COMPLETED',
        invoiceNumber: 'INV-2024-001'
      }
    }),
    prisma.subscriptionPayment.create({
      data: {
        craftsmanId: craftsmen[1].id,
        amount: 99.99,
        plan: 'PROFESSIONAL',
        paymentMethod: 'Transfer bancar',
        validFrom: new Date('2024-11-15'),
        validUntil: new Date('2025-02-15'),
        status: 'COMPLETED',
        invoiceNumber: 'INV-2024-002'
      }
    }),
    prisma.subscriptionPayment.create({
      data: {
        craftsmanId: craftsmen[2].id,
        amount: 29.99,
        plan: 'BASIC',
        paymentMethod: 'Card',
        validFrom: new Date('2024-12-10'),
        validUntil: new Date('2025-01-10'),
        status: 'COMPLETED',
        invoiceNumber: 'INV-2024-003'
      }
    })
  ])

  console.log('✅ Subscription payments created!')

  // Create contact requests (înlocuiește bookings)
  const contactRequests = await Promise.all([
    prisma.contactRequest.create({
      data: {
        userId: users[0].id,
        craftsmanId: craftsmen[0].id,
        service: 'Reparație țeavă spartă',
        description: 'Se necesită reparația unei țevi sparte în bucătărie',
        status: 'ACCEPTED',
        clientName: 'Ion Popescu',
        clientPhone: '0722111222',
        clientEmail: 'ion@example.com',
        location: 'Str. Exemplu nr. 1, Sector 1',
        scheduledAt: new Date('2024-12-25T10:00:00Z')
      }
    }),
    prisma.contactRequest.create({
      data: {
        userId: users[1].id,
        craftsmanId: craftsmen[1].id,
        service: 'Renovare baie',
        description: 'Renovare completă baie - gresie, faianță, instalații',
        status: 'PENDING',
        clientName: 'Maria Ionescu',
        clientPhone: '0722333444',
        clientEmail: 'maria@example.com',
        location: 'Str. Test nr. 10, Sector 2',
        scheduledAt: new Date('2024-12-26T09:00:00Z')
      }
    }),
    prisma.contactRequest.create({
      data: {
        userId: users[0].id,
        craftsmanId: craftsmen[2].id,
        service: 'Amenajare grădină',
        description: 'Amenajare completă grădină cu sistem de irigații',
        status: 'IN_PROGRESS',
        clientName: 'Ion Popescu',
        clientPhone: '0722111222',
        clientEmail: 'ion@example.com',
        location: 'Str. Verde nr. 5, Sector 3',
        scheduledAt: new Date('2024-12-28T08:00:00Z')
      }
    })
  ])

  console.log('✅ Contact requests created!')

  // Create reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        userId: users[0].id,
        craftsmanId: craftsmen[0].id,
        rating: 5,
        comment: 'Serviciu excelent! A venit la timp și a rezolvat problema rapid.'
      }
    }),
    prisma.review.create({
      data: {
        userId: users[1].id,
        craftsmanId: craftsmen[1].id,
        rating: 4,
        comment: 'Lucrare de calitate, recomand!'
      }
    }),
    prisma.review.create({
      data: {
        userId: users[0].id,
        craftsmanId: craftsmen[2].id,
        rating: 5,
        comment: 'Foarte mulțumit de serviciile oferite. Profesionalism maxim!'
      }
    })
  ])

  console.log('✅ Reviews created!')

  console.log('🎉 Database seeded successfully!')
  
  // Print summary
  const userCount = await prisma.user.count()
  const craftsmanCount = await prisma.craftsman.count()
  const categoryCount = await prisma.category.count()
  const contactCount = await prisma.contactRequest.count()
  const reviewCount = await prisma.review.count()
  const subscriptionPaymentCount = await prisma.subscriptionPayment.count()
  
  console.log(`
📊 Database Summary:
   👥 Users: ${userCount}
   🔨 Craftsmen: ${craftsmanCount}
   📂 Categories: ${categoryCount}
   � Contact Requests: ${contactCount}
   ⭐ Reviews: ${reviewCount}
   � Subscription Payments: ${subscriptionPaymentCount}
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
