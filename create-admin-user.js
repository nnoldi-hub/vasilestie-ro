const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('🔧 Creez cont de administrator...');

    // Verifică dacă admin-ul există deja
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'admin@vasilestie.ro'
      }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin-ul există deja!');
      console.log('📧 Email: admin@vasilestie.ro');
      console.log('🔐 Parolă: admin123');
      
      // Actualizez rolul să fie ADMIN dacă nu este deja
      if (existingAdmin.role !== 'ADMIN') {
        await prisma.user.update({
          where: { id: existingAdmin.id },
          data: { role: 'ADMIN' }
        });
        console.log('✅ Rolul actualizat la ADMIN');
      }
      
      return;
    }

    // Hash parola
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Creez utilizatorul admin
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@vasilestie.ro',
        name: 'Administrator',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(), // Cont verificat automat
      }
    });

    console.log('🎉 Cont de administrator creat cu succes!');
    console.log('📧 Email: admin@vasilestie.ro');
    console.log('🔐 Parolă: admin123');
    console.log('👤 Nume: Administrator'); 
    console.log('🆔 User ID:', adminUser.id);
    console.log('🛡️  Rol: ADMIN');
    
    console.log('');
    console.log('🚀 Pași pentru testare:');
    console.log('1. Mergi la https://vasilestie-ro.vercel.app/auth/signin');
    console.log('2. Folosește: admin@vasilestie.ro / admin123');
    console.log('3. Accesează funcțiile de admin');

  } catch (error) {
    console.error('❌ Eroare la crearea adminului:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
