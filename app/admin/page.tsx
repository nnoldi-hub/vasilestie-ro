'use client';

import { useSession } from 'next-auth/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Metadata } from 'next';

export default function AdminPage() {
  const { data: session } = useSession();
  
  // The authentication is now handled by the layout and middleware
  // This component will only render if the user is properly authenticated
  
  return (
    <div>
      <AdminLayout />
    </div>
  );
}
