const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugAuth() {
  try {
    // Listez toți utilizatorii
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true
      }
    });

    console.log('👥 TOȚI UTILIZATORII:');
    users.forEach(user => {
      console.log(`- ID: ${user.id}`);
      console.log(`  Nume: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Rol: ${user.role}`);
      console.log(`  Are parolă: ${!!user.password}`);
      console.log('---');
    });

    // Verific sesiunile active
    const sessions = await prisma.session.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    console.log('\n🔐 SESIUNI ACTIVE:');
    if (sessions.length === 0) {
      console.log('Nu există sesiuni active');
    } else {
      sessions.forEach(session => {
        console.log(`- User: ${session.user?.name} (${session.user?.email})`);
        console.log(`  Expires: ${session.expires}`);
      });
    }

  } catch (error) {
    console.error('❌ Eroare:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugAuth();
