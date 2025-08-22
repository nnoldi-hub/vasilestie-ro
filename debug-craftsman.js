const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugCraftsman() {
  try {
    // Găsește utilizatorul
    const user = await prisma.user.findUnique({
      where: { email: 'iproiect2014@gmail.com' },
      include: {
        craftsman: true
      }
    });

    console.log('👤 User:', {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role
    });

    console.log('🔨 Craftsman:', user?.craftsman);

    // Încearcă să găsească prin userId
    const craftsmanDirect = await prisma.craftsman.findUnique({
      where: { userId: user?.id }
    });

    console.log('🔍 Craftsman găsit direct:', !!craftsmanDirect);
    
    if (craftsmanDirect) {
      console.log('📋 Detalii craftsman:', {
        id: craftsmanDirect.id,
        businessName: craftsmanDirect.businessName,
        subscriptionStatus: craftsmanDirect.subscriptionStatus
      });
    }

  } catch (error) {
    console.error('❌ Eroare:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugCraftsman();
