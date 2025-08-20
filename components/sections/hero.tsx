'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LocationButton } from '@/components/ui/location-button';
import { Search, MapPin, Star, Users, CheckCircle } from 'lucide-react';

export function Hero() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }
    if (location.trim()) {
      params.set('location', location.trim());
    }
    
    const url = `/servicii${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const stats = [
    { label: 'Meseriași verificați', value: '2,500+', icon: CheckCircle },
    { label: 'Servicii completate', value: '15,000+', icon: Star },
    { label: 'Clienți mulțumiți', value: '12,000+', icon: Users },
  ];

  const popularSearches = [
    'Electrician',
    'Instalator',
    'Zugrav',
    'Constructor',
    'Grădinar',
    'Curățenie',
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <Badge className="mb-4 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20">
              ✨ Vasile știe pe toată lumea bună
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              {user ? (
                <>
                  Bună, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {user.name?.split(' ')[0] || 'Utilizator'}
                  </span>!
                  <br />
                  {user.role === 'CRAFTSMAN' ? 'Gestionează-ți' : 'Găsește'}{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {user.role === 'CRAFTSMAN' ? 'afacerea' : 'meseriașul'}
                  </span>{' '}
                  {user.role === 'CRAFTSMAN' ? 'ta' : 'potrivit'}
                </>
              ) : (
                <>
                  Când nu știi pe cine să chemi,{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Vasile știe
                  </span>
                </>
              )}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              {user ? (
                user.role === 'CRAFTSMAN' ? (
                  `Bine ai revenit! Gestionează-ți profilul și comenzile din panoul de control.`
                ) : (
                  `Bine ai revenit! Lasă că știe Vasile pe cineva bun pentru proiectul tău.`
                )
              ) : (
                'Lasă că știu eu pe cineva bun la asta. Meseriași verificați, recomandați personal de Vasile pentru casa ta.'
              )}
            </p>
          </div>

          {/* Search Form */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Ce serviciu cauți?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 pl-12 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="relative sm:w-48 flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Orașul tău"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="h-12 pl-12 pr-4 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <LocationButton
                  size="lg"
                  showText={false}
                  onLocationDetected={(city) => setLocation(city)}
                  className="h-12 w-12 flex-shrink-0 bg-white border border-gray-200 hover:bg-brand-primary/5"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white font-medium sm:w-auto"
              >
                Întreabă-l pe Vasile
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="mt-6">
              <p className="mb-3 text-sm text-gray-500">Căutări populare:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((search) => (
                  <Badge
                    key={search}
                    variant="secondary"
                    className="cursor-pointer hover:bg-brand-primary/10 hover:text-brand-primary"
                    onClick={() => {
                      setSearchQuery(search);
                      const params = new URLSearchParams();
                      params.set('q', search);
                      if (location.trim()) {
                        params.set('location', location.trim());
                      }
                      router.push(`/servicii?${params.toString()}`);
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                  <stat.icon className="h-6 w-6 text-brand-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <div className="rounded-full bg-yellow-100 p-3">
          <Star className="h-6 w-6 text-yellow-600" />
        </div>
      </div>
      <div className="absolute top-32 right-10 hidden lg:block">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
      </div>
    </section>
  );
}