const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function activateSubscription() {
  try {
    // Activez abonamentul pentru utilizatorul tău
    const updatedCraftsman = await prisma.craftsman.update({
      where: { userId: 'cmelb8hay0000kuowy7o6u6kl' },
      data: {
        subscriptionStatus: 'ACTIVE',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 zile
        verified: true // Și te verific ca meseriaș
      }
    });

    console.log('✅ Abonament activat cu succes!');
    console.log('📋 Status:', updatedCraftsman.subscriptionStatus);
    console.log('🗓️ Valabil până la:', updatedCraftsman.subscriptionEndDate);
    console.log('✅ Verificat:', updatedCraftsman.verified);

  } catch (error) {
    console.error('❌ Eroare:', error);
  } finally {
    await prisma.$disconnect();
  }
}

activateSubscription();
