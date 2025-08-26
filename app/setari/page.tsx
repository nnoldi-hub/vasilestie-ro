'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Mail,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SetariPage() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  
  const [settings, setSettings] = useState({
    // Profile settings - initialize empty, will be loaded from API
    name: '',
    email: '',
    phone: '',
    city: '',
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    
    // Privacy settings
    profilePublic: false,
    showPhone: true,
    showEmail: false,
    
    // Password - NEVER pre-populate passwords
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user) return;
      
      try {
        setProfileLoading(true);
        const response = await fetch('/api/user/profile');
        
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          
          // Update settings with actual user data
          setSettings(prev => ({
            ...prev,
            name: user.name || '',
            email: user.email || '',
            // Don't pre-populate phone and city as these might come from wrong sources
            // Let user fill these manually if needed
          }));
        } else {
          console.error('Failed to load profile');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    if (session) {
      loadProfile();
    }
  }, [session]);

  if (status === 'loading' || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save profile information
      if (settings.name !== session?.user?.name) {
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: settings.name,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
      }

      // TODO: Save other settings (notifications, privacy, etc.)
      
      toast({
        title: "Succes!",
        description: "Setările au fost salvate cu succes.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut salva setările.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Settings className="w-8 h-8 mr-3 text-blue-600" />
              Setări cont
            </h1>
            <p className="text-gray-600">
              Gestionează informațiile tale personale și preferințele contului.
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Informații personale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nume complet</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => handleSettingChange('name', e.target.value)}
                      placeholder="Introduceti numele complet"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange('email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => handleSettingChange('phone', e.target.value)}
                      placeholder="+40 123 456 789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Orașul
                    </Label>
                    <Input
                      id="city"
                      value={settings.city}
                      onChange={(e) => handleSettingChange('city', e.target.value)}
                      placeholder="București, Cluj, etc."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-blue-600" />
                  Notificări
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Notificări email</div>
                    <div className="text-sm text-gray-500">
                      Primești notificări despre comenzi și mesaje
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Notificări SMS</div>
                    <div className="text-sm text-gray-500">
                      Primești SMS-uri pentru comenzi urgente
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Notificări push</div>
                    <div className="text-sm text-gray-500">
                      Notificări în browser pentru activități importante
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Email-uri marketing</div>
                    <div className="text-sm text-gray-500">
                      Oferte speciale și noutăți despre platformă
                    </div>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Confidențialitate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Profil public</div>
                    <div className="text-sm text-gray-500">
                      Permite altor utilizatori să-ți vadă profilul
                    </div>
                  </div>
                  <Switch
                    checked={settings.profilePublic}
                    onCheckedChange={(checked) => handleSettingChange('profilePublic', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Afișează telefonul</div>
                    <div className="text-sm text-gray-500">
                      Meseriașii pot vedea numărul tău de telefon
                    </div>
                  </div>
                  <Switch
                    checked={settings.showPhone}
                    onCheckedChange={(checked) => handleSettingChange('showPhone', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Afișează email-ul</div>
                    <div className="text-sm text-gray-500">
                      Email-ul tău va fi vizibil în profil
                    </div>
                  </div>
                  <Switch
                    checked={settings.showEmail}
                    onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Schimbare parolă
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Parola curentă</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={settings.currentPassword}
                      onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
                      placeholder="Introduceti parola curentă"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Introduceti parola actuală pentru a putea schimba parola
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">Parola nouă</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={settings.newPassword || ''}
                        onChange={(e) => handleSettingChange('newPassword', e.target.value)}
                        placeholder="Parola nouă"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Minim 6 caractere
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmă parola</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={settings.confirmPassword || ''}
                        onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
                        placeholder="Confirmă parola nouă"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {settings.newPassword && settings.confirmPassword && 
                     settings.newPassword !== settings.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        Parolele nu se potrivesc
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Se salvează...' : 'Salvează modificările'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
