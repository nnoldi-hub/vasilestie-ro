// Mock Prisma Client for build - will be replaced when network allows Prisma generation
interface User {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: 'USER' | 'CRAFTSMAN' | 'ADMIN' | 'SUPER_ADMIN' | 'MODERATOR' | 'SUPPORT';
  createdAt: Date;
  updatedAt: Date;
}

interface AdminLog {
  id: string;
  userId: string;
  action: string;
  details?: string;
  createdAt: Date;
  user?: User;
}

interface MockPrismaClient {
  user: {
    findUnique: (args: any) => Promise<User | null>;
    create: (args: any) => Promise<User>;
    update: (args: any) => Promise<User>;
    delete: (args: any) => Promise<User>;
    findMany: (args?: any) => Promise<User[]>;
    upsert: (args: any) => Promise<User>;
    count: (args?: any) => Promise<number>;
  };
  adminLog: {
    findMany: (args?: any) => Promise<AdminLog[]>;
    create: (args: any) => Promise<AdminLog>;
  };
  craftsman: {
    count: (args?: any) => Promise<number>;
  };
  booking: {
    count: (args?: any) => Promise<number>;
  };
  $disconnect: () => Promise<void>;
}

// Mock implementation for build
const mockPrisma: MockPrismaClient = {
  user: {
    findUnique: async () => null,
    create: async () => ({} as User),
    update: async () => ({} as User),
    delete: async () => ({} as User),
    findMany: async () => [],
    upsert: async () => ({} as User),
    count: async () => 0,
  },
  adminLog: {
    findMany: async () => [],
    create: async () => ({} as AdminLog),
  },
  craftsman: {
    count: async () => 0,
  },
  booking: {
    count: async () => 0,
  },
  $disconnect: async () => {},
};

export const prisma = mockPrisma;
