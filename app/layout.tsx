import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingChatButton } from '@/components/chat/floating-chat-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "VasileStie.ro - Vasile știe. Tu doar alegi.",
  description: "Când nu știi pe cine să chemi, Vasile știe. Meseriași verificați, recomandați personal pentru casa ta.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <FloatingChatButton />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
