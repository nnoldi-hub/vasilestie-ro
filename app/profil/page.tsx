'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';client';

import { useSession } from 'next-auth/react'                    <Badge variant={user.role === 'CRAFTSMAN' ? 'default' : 'secondary'}>
                      {user.role === 'CRAFTSMAN' ? 'Meseriași' : 'Client'}
                    </Badge>ort { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle,
  Settings,
  Star,
  Briefcase,
} from 'lucide-react';

function ProfileContent() {
  const { data: session } = useSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  const user = session.user;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profilul meu</h1>
            <p className="text-gray-600">
              Gestionează informațiile tale personale și setările contului.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                  <AvatarFallback className="text-2xl">
                    {user.name?.[0] || 'U'}{user.name?.split(' ')[1]?.[0] || ''}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {user.name || 'Utilizator'}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant={user.role === 'craftsman' ? 'default' : 'secondary'}>
                      {user.role === 'craftsman' ? 'Meseriași' : 'Client'}
                    </Badge>
                    {user.isVerified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="truncate">{user.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informații personale</CardTitle>
                <CardDescription>
                  Datele tale de profil și contact.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nume</Label>
                    <Input value={user.name || ''} disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email || ''} disabled className="bg-gray-50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rol</Label>
                  <Input value={user.role || ''} disabled className="bg-gray-50" />
                </div>

                <div className="pt-6 border-t">
                  <Button className="w-full md:w-auto">
                    <Settings className="h-4 w-4 mr-2" />
                    Editează profilul
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return <ProfileContent />;
}
