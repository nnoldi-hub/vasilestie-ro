'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, UserPlus, Shield } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validări
    if (formData.password !== formData.confirmPassword) {
      setError('Parolele nu se potrivesc');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'A apărut o eroare');
      }

      setSuccess('Contul a fost creat cu succes! Vă rugăm să vă conectați.');
      
      // Redirect după 2 secunde
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);

    } catch (error: any) {
      setError(error.message || 'A apărut o eroare. Încercați din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-orange-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Creează cont nou
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sau{' '}
            <Link href="/auth/signin" className="font-medium text-orange-600 hover:text-orange-500">
              conectează-te cu un cont existent
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Înregistrare</CardTitle>
            <CardDescription>
              Completează formularul pentru a crea un cont nou
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="name">Nume complet</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ion Popescu"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="exemplu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="role">Tip cont</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alege tipul de cont" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">Client</SelectItem>
                    <SelectItem value="CRAFTSMAN">Meseriaș</SelectItem>
                  </SelectContent>
                </Select>
                {formData.role === 'CRAFTSMAN' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Ca meseriaș, vei avea acces la dashboard-ul pentru gestionarea profilului și comenzilor.
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Parolă</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Minimum 6 caractere"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmă parola</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Rescrie parola"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se creează contul...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Creează cont
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Conturi demo existente</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Admin:</span>
                    <span className="font-mono">admin@vasilestie.ro / admin123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meseriaș:</span>
                    <span className="font-mono">mester@vasilestie.ro / mester123</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-orange-600 hover:text-orange-500"
              >
                ← Înapoi la pagina principală
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
