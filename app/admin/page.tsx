import { AdminLayout } from '@/components/admin/admin-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - VasileStie.ro',
  description: 'Panou de administrare pentru gestionarea echipei și platformei VasileStie.ro',
  robots: 'noindex, nofollow', // Nu indexa paginile admin
};

export default function AdminPage() {
  // TODO: Adaugă verificare de autentificare
  // În viitor, aici va fi logica pentru a verifica dacă utilizatorul
  // este autentificat și are permisiuni de admin
  
  return <AdminLayout />;
}
