const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearSessions() {
  try {
    // Șterge toate sesiunile și conturile OAuth vechi
    await prisma.session.deleteMany({});
    await prisma.account.deleteMany({});
    
    console.log('✅ Toate sesiunile au fost șterse din baza de date');
    console.log('🔄 Acum trebuie să te reconectezi în browser');

  } catch (error) {
    console.error('❌ Eroare:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearSessions();
