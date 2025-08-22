const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createCraftsmanProfile() {
  try {
    // Găsește utilizatorul cu email-ul tău
    const user = await prisma.user.findUnique({
      where: {
        email: 'iproiect2014@gmail.com'
      }
    });

    if (!user) {
      console.error('❌ Utilizatorul cu email-ul iproiect2014@gmail.com nu a fost găsit');
      return;
    }

    console.log('✅ Utilizator găsit:', user.name);

    // Verifică dacă nu există deja profilul de meseriaș
    const existingCraftsman = await prisma.craftsman.findUnique({
      where: { userId: user.id }
    });

    if (existingCraftsman) {
      console.log('⚠️  Profilul de meseriaș există deja');
      return;
    }

    // Creează profilul de meseriaș
    const craftsman = await prisma.craftsman.create({
      data: {
        userId: user.id,
        businessName: user.name + ' Services', // Va fi editat apoi
        description: 'Profil nou de meseriaș',
        phone: '', // Va fi completat la editare
        address: '',
        city: '',
        county: '',
        experience: 0,
        rating: 0,
        reviewCount: 0,
        verified: false,
        subscriptionStatus: 'ACTIVE', // Activez abonamentul pentru test
        subscriptionPlan: 'BASIC',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 zile
      }
    });

    console.log('🎉 Profil de meseriaș creat cu succes!');
    console.log('📧 Email:', user.email);
    console.log('👤 Nume:', user.name);
    console.log('🆔 ID Craftsman:', craftsman.id);
    console.log('📋 Plan abonament:', craftsman.subscriptionPlan);

  } catch (error) {
    console.error('❌ Eroare la crearea profilului de meseriaș:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCraftsmanProfile();
