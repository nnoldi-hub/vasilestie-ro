'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CollaboratorLayout } from '@/components/colaborator/colaborator-layout';
import { CollaboratorProvider } from '@/lib/contexts/colaborator-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ColaboratorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated or not a collaborator
  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (!['COLLABORATOR', 'ADMINISTRATOR'].includes(session.user?.role || '')) {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Se încarcă dashboard-ul...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session || !['COLLABORATOR', 'ADMINISTRATOR'].includes(session.user?.role || '')) {
    return null; // Will redirect
  }

  return (
    <CollaboratorProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <CollaboratorLayout />
        </main>
        <Footer />
      </div>
    </CollaboratorProvider>
  );
}
