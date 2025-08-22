const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createDemoUsers() {
  console.log('🔐 Creating demo users with authentication...')

  try {
    // Check if demo users already exist
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@vasilestie.ro' }
    })

    if (existingAdmin) {
      console.log('✅ Demo users already exist!')
      return
    }

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 12)
    const craftsmanPassword = await bcrypt.hash('mester123', 12)
    const userPassword = await bcrypt.hash('user123', 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: 'Admin VasileStie',
        email: 'admin@vasilestie.ro',
        password: adminPassword,
        emailVerified: new Date(),
        role: 'SUPER_ADMIN'
      }
    })

    // Create craftsman user
    const craftsman = await prisma.user.create({
      data: {
        name: 'Vasile Meșterul',
        email: 'mester@vasilestie.ro',
        password: craftsmanPassword,
        emailVerified: new Date(),
        role: 'CRAFTSMAN'
      }
    })

    // Create regular user
    const user = await prisma.user.create({
      data: {
        name: 'Ion Client',
        email: 'user@vasilestie.ro',
        password: userPassword,
        emailVerified: new Date(),
        role: 'USER'
      }
    })

    // Create craftsman profile
    await prisma.craftsman.create({
      data: {
        userId: craftsman.id,
        businessName: 'Vasile - Servicii Complete',
        description: 'Meseriaș cu experiență în instalații sanitare și construcții. Servicii de calitate cu garanție.',
        phone: '0740123456',
        address: 'Str. Meseriilor, nr. 10',
        city: 'București',
        county: 'Ilfov',
        experience: 15,
        rating: 4.8,
        reviewCount: 25,
        verified: true,
        subscriptionStatus: 'ACTIVE',
        subscriptionPlan: 'PREMIUM'
      }
    })

    console.log('✅ Demo users created successfully!')
    console.log('🔑 Login credentials:')
    console.log('   Admin: admin@vasilestie.ro / admin123')
    console.log('   Meseriaș: mester@vasilestie.ro / mester123')
    console.log('   Client: user@vasilestie.ro / user123')

  } catch (error) {
    console.error('❌ Error creating demo users:', error)
  }
}

createDemoUsers()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
