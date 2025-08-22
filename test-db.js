const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔗 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Check if users exist
    const userCount = await prisma.user.count()
    console.log(`👥 Users in database: ${userCount}`)
    
    // Check if categories exist  
    const categoryCount = await prisma.category.count()
    console.log(`📂 Categories in database: ${categoryCount}`)
    
    // Check if craftsmen exist
    const craftsmanCount = await prisma.craftsman.count()
    console.log(`🔨 Craftsmen in database: ${craftsmanCount}`)
    
    if (userCount === 0) {
      console.log('⚠️  No users found - need to run seed script')
    } else {
      console.log('✅ Database has data')
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
