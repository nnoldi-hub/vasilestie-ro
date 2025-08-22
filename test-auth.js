const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    // Testez să găsesc utilizatorul admin
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@vasilestie.ro' }
    });
    
    if (!admin) {
      console.log('❌ Admin nu găsit!');
      return;
    }
    
    console.log('✅ Admin găsit:', admin.name);
    console.log('📧 Email:', admin.email);
    console.log('🔑 Are parolă:', !!admin.password);
    
    // Testez parola
    const isPasswordValid = await bcrypt.compare('password', admin.password);
    console.log('🔐 Parola "password" este validă:', isPasswordValid);
    
    // Testez și meseriaș
    const craftsman = await prisma.user.findUnique({
      where: { email: 'vasile@meseriasi.ro' }
    });
    
    if (craftsman) {
      console.log('\n✅ Meseriaș găsit:', craftsman.name);
      const isCraftsmanPasswordValid = await bcrypt.compare('password', craftsman.password);
      console.log('🔐 Parola meseriaș validă:', isCraftsmanPasswordValid);
    }
    
  } catch (error) {
    console.error('❌ Eroare:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
