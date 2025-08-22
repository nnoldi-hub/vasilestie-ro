const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteUserRecords() {
  try {
    console.log('🗑️ Șterg înregistrările tale din baza de date...');

    // Șterg toate înregistrările legate de conturile tale
    
    // 1. Șterg craftsman profiles pentru conturile tale
    const deletedCraftsmen = await prisma.craftsman.deleteMany({
      where: {
        OR: [
          { user: { email: 'iproiect2014@gmail.com' } },
          { user: { email: 'office@conectica-it.ro' } }
        ]
      }
    });
    console.log(`✅ Șterse ${deletedCraftsmen.count} profile de meseriaș`);

    // 2. Șterg sesiunile pentru conturile tale
    const deletedSessions = await prisma.session.deleteMany({
      where: {
        user: {
          OR: [
            { email: 'iproiect2014@gmail.com' },
            { email: 'office@conectica-it.ro' }
          ]
        }
      }
    });
    console.log(`✅ Șterse ${deletedSessions.count} sesiuni`);

    // 3. Șterg accounts pentru conturile tale
    const deletedAccounts = await prisma.account.deleteMany({
      where: {
        user: {
          OR: [
            { email: 'iproiect2014@gmail.com' },
            { email: 'office@conectica-it.ro' }
          ]
        }
      }
    });
    console.log(`✅ Șterse ${deletedAccounts.count} conturi OAuth`);

    // 4. Șterg utilizatorii tăi
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        OR: [
          { email: 'iproiect2014@gmail.com' },
          { email: 'office@conectica-it.ro' }
        ]
      }
    });
    console.log(`✅ Șterse ${deletedUsers.count} utilizatori`);

    // 5. Pentru siguranță, șterg toate sesiunile rămase
    await prisma.session.deleteMany({});
    console.log('✅ Șterse toate sesiunile rămase');

    console.log('\n🎉 Curățenie completă! Acum ai doar datele demo originale.');
    console.log('🔄 Refreshează browser-ul și vei vedea doar utilizatorii demo.');

  } catch (error) {
    console.error('❌ Eroare:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUserRecords();
