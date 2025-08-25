'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
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
  Save,
  ArrowLeft,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  createdAt: string;
  emailVerified?: string;
}

function EditProfileContent() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/profile');
      
      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to signin if not authenticated
          router.push('/auth/signin');
          return;
        }
        throw new Error('Failed to fetch profile');
      }
      
      const data = await response.json();
      setProfile(data.user);
      setFormData({
        name: data.user.name || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut încărca profilul.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [router, toast]);

  useEffect(() => {
    // Wait for session to load before checking
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Dacă e meseriaș, redirecționează la pagina lui specifică
    if (session.user?.role === ('CRAFTSMAN' as any)) {
      router.push('/mesterias/profil');
      return;
    }

    fetchProfile();
  }, [session, status, router, fetchProfile]);

  // Show loading while session is loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
      
      // Update the local profile state
      setProfile(data.user);
      
      // Update the session with new user data
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: data.user.name,
          }
        });
      }
      
      toast({
        title: "Succes!",
        description: "Profilul a fost actualizat cu succes.",
      });
      
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "Nu s-a putut salva profilul.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Înapoi
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Editează profilul</h1>
              </div>
              <p className="text-gray-600">
                Modifică informațiile tale personale.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profile?.image || ''} alt={profile?.name || 'User'} />
                  <AvatarFallback className="text-2xl">
                    {profile?.name?.[0] || 'U'}{profile?.name?.split(' ')[1]?.[0] || ''}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {profile?.name || 'Utilizator'}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant={profile?.role === 'ADMIN' || profile?.role === 'SUPER_ADMIN' ? 'default' : 'secondary'}>
                      {profile?.role === 'SUPER_ADMIN' ? 'Super Admin' : 
                       profile?.role === 'ADMIN' ? 'Admin' : 'Client'}
                    </Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="truncate">{profile?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="truncate">{profile?.role}</span>
                </div>
              </CardContent>
            </Card>

            {/* Edit Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informații personale</CardTitle>
                <CardDescription>
                  Modifică informațiile tale de profil.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nume complet</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Introduceți numele complet"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      value={profile?.email || ''} 
                      disabled 
                      className="bg-gray-50" 
                    />
                    <p className="text-xs text-gray-500">
                      Email-ul nu poate fi modificat.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Rol</Label>
                    <Input 
                      value={profile?.role === 'SUPER_ADMIN' ? 'Super Admin' : 
                             profile?.role === 'ADMIN' ? 'Admin' : 'Client'} 
                      disabled 
                      className="bg-gray-50" 
                    />
                    <p className="text-xs text-gray-500">
                      Rolul nu poate fi modificat.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t flex gap-4">
                  <Button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? 'Se salvează...' : 'Salvează modificările'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Anulează
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

export default function EditProfilePage() {
  return <EditProfileContent />;
}
