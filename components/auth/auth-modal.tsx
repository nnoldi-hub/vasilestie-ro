'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const router = useRouter();

  const handleSignIn = () => {
    onClose();
    router.push('/auth/signin');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bine ai venit pe VasileStie.ro</DialogTitle>
          <DialogDescription>
            Conectează-te sau creează un cont nou pentru a accesa toate funcționalitățile.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button onClick={handleSignIn} className="w-full" size="lg">
            <User className="mr-2 h-4 w-4" />
            Mergi la pagina de conectare
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            <p>Pentru testare folosește:</p>
            <p><strong>Admin:</strong> admin@vasile.ro / admin123</p>
            <p><strong>Client:</strong> client@test.com / password123</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}