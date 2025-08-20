'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const { login, register, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'client' as 'client' | 'craftsman',
    city: '',
    category: '',
    hourlyRate: '',
    description: '',
    agreeToTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginData.email || !loginData.password) {
      setError('Te rog să completezi toate câmpurile.');
      return;
    }

    const result = await login(loginData.email, loginData.password);

    if (result.success) {
      toast.success('Te-ai conectat cu succes!');
      onClose();
      setLoginData({ email: '', password: '' });
    } else {
      setError(result.error || 'Eroare la conectare');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validări
    if (registerData.password !== registerData.confirmPassword) {
      setError('Parolele nu coincid');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere');
      return;
    }

    if (!registerData.agreeToTerms) {
      setError('Trebuie să accepti termenii și condițiile');
      return;
    }

    const result = await register({
      email: registerData.email,
      password: registerData.password,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      phone: registerData.phone,
      role: registerData.role,
      city: registerData.city,
      category: registerData.role === 'craftsman' ? registerData.category : undefined,
      hourlyRate: registerData.role === 'craftsman' && registerData.hourlyRate ? 
        parseInt(registerData.hourlyRate) : undefined,
      description: registerData.role === 'craftsman' ? registerData.description : undefined,
    });
    
    if (result.success) {
      toast.success('Contul a fost creat cu succes! Te-ai conectat automat.');
      setTimeout(() => {
        onClose();
        setRegisterData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          phone: '',
          role: 'client',
          city: '',
          category: '',
          hourlyRate: '',
          description: '',
          agreeToTerms: false,
        });
        setSuccess('');
      }, 1000);
    } else {
      setError(result.error || 'Eroare la înregistrare');
    }
  };

  const categories = [
    { id: 'electrician', name: 'Electrician' },
    { id: 'instalator', name: 'Instalator' },
    { id: 'constructor', name: 'Constructor' },
    { id: 'zugrav', name: 'Zugrav' },
    { id: 'gradinar', name: 'Grădinar' },
    { id: 'curatenie', name: 'Curățenie' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bine ai venit pe Mesteras.ro</DialogTitle>
          <DialogDescription>
            Conectează-te sau creează un cont nou pentru a accesa toate funcționalitățile.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Conectare</TabsTrigger>
            <TabsTrigger value="register">Înregistrare</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="nume@exemplu.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parolă</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Parola ta"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Conectare
              </Button>

              <div className="text-center text-sm text-gray-600">
                <p>Pentru testare folosește:</p>
                <p><strong>Client:</strong> client@test.com / password123</p>
                <p><strong>Meseriași:</strong> mesterias@test.com / password123</p>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
            <form onSubmit={handleRegister} className="space-y-3">
              {/* Tip cont */}
              <div className="space-y-1">
                <Label className="text-sm">Tip cont</Label>
                <Select 
                  value={registerData.role} 
                  onValueChange={(value: 'client' | 'craftsman') => 
                    setRegisterData(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client - caut servicii</SelectItem>
                    <SelectItem value="craftsman">Meseriași - ofer servicii</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Informații personale */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-sm">Prenume</Label>
                  <Input
                    id="firstName"
                    className="h-9"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-sm">Nume</Label>
                  <Input
                    id="lastName"
                    className="h-9"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="register-email" className="text-sm">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  className="h-9"
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-sm">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+40 123 456 789"
                    className="h-9"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city" className="text-sm">Oraș</Label>
                  <Input
                    id="city"
                    className="h-9"
                    value={registerData.city}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="register-password" className="text-sm">Parolă</Label>
                  <Input
                    id="register-password"
                    type="password"
                    className="h-9"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password" className="text-sm">Confirmă</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="h-9"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Informații pentru meseriași */}
              {registerData.role === 'craftsman' && (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="category" className="text-sm">Categorie</Label>
                      <Select 
                        value={registerData.category} 
                        onValueChange={(value) => setRegisterData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Alege categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="hourlyRate" className="text-sm">Tarif/oră (RON)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="80"
                        className="h-9"
                        value={registerData.hourlyRate}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="description" className="text-sm">Descriere scurtă</Label>
                    <textarea
                      id="description"
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                      placeholder="Serviciile tale în câteva cuvinte..."
                      value={registerData.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRegisterData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={registerData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setRegisterData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  Sunt de acord cu termenii și condițiile
                </Label>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !registerData.agreeToTerms}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Înregistrează-te
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}