const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function fixPassword() {
  try {
    // Hash-uiesc parola ta corect
    const hashedPassword = await bcrypt.hash('idlon03Dorina', 10);
    
    // Actualizez utilizatorul tău cu parola hash-uită corect
    const updatedUser = await prisma.user.update({
      where: { email: 'iproiect2014@gmail.com' },
      data: { 
        password: hashedPassword,
        emailVerified: new Date() // Mă asigur că email-ul este verificat
      }
    });

    console.log('✅ Parola actualizată cu succes pentru:', updatedUser.email);
    console.log('👤 Nume:', updatedUser.name);
    console.log('🔑 Rol:', updatedUser.role);
    console.log('✉️ Email verificat:', !!updatedUser.emailVerified);

  } catch (error) {
    console.error('❌ Eroare:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixPassword();
