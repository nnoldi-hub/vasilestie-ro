'use client';

import { useAuth } from '@/contexts/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';
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
  const { user } = useAuth();

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
                  <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="text-2xl">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {user.firstName} {user.lastName}
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
                {user.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.city && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.city}</span>
                  </div>
                )}
                {user.role === 'craftsman' && (
                  <>
                    <div className="flex items-center space-x-2 text-sm">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span>{user.category}</span>
                    </div>
                    {user.rating && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{user.rating} ({user.reviewCount} recenzii)</span>
                      </div>
                    )}
                  </>
                )}
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
                    <Label>Prenume</Label>
                    <Input value={user.firstName} disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nume</Label>
                    <Input value={user.lastName} disabled className="bg-gray-50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user.email} disabled className="bg-gray-50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefon</Label>
                    <Input value={user.phone || 'Nu a fost adăugat'} disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Oraș</Label>
                    <Input value={user.city || 'Nu a fost adăugat'} disabled className="bg-gray-50" />
                  </div>
                </div>

                {user.role === 'craftsman' && (
                  <>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Input value={user.category || ''} disabled className="bg-gray-50" />
                    </div>
                    
                    {user.hourlyRate && (
                      <div className="space-y-2">
                        <Label>Tarif orar</Label>
                        <Input value={`${user.hourlyRate} RON`} disabled className="bg-gray-50" />
                      </div>
                    )}

                    {user.description && (
                      <div className="space-y-2">
                        <Label>Descrierea serviciilor</Label>
                        <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                          {user.description}
                        </div>
                      </div>
                    )}
                  </>
                )}

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
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
