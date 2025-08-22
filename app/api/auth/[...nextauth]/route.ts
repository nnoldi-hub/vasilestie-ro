import NextAuth from 'next-auth';

// Force dynamic rendering for NextAuth
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Import authOptions dynamically to prevent build-time issues
async function createHandler() {
  const { authOptions } = await import('@/lib/auth');
  return NextAuth(authOptions);
}

export async function GET(request: any, context: any) {
  const handler = await createHandler();
  return handler(request, context);
}

export async function POST(request: any, context: any) {
  const handler = await createHandler();
  return handler(request, context);
}
