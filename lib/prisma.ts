import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Configurare optimizată pentru producție și dezvoltare
const createPrismaClient = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });

  // Conectează la baza de date și gestionează erorile
  client.$connect().catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

  return client;
};

// Singleton pattern pentru conexiunea la baza de date
export const prisma = globalThis.__prisma || createPrismaClient();

// În dezvoltare, salvează instanța în global pentru hot reload
if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}

// Închide conexiunea când aplicația se închide
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Gestionează graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
