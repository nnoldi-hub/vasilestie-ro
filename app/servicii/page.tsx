'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, Star, Filter, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ServiciiPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const categories = useMemo(() => [
    { id: 'electrician', label: 'Electrician', icon: '⚡' },
    { id: 'plumber', label: 'Instalator', icon: '🔧' },
    { id: 'carpenter', label: 'Dulgherie', icon: '🔨' },
    { id: 'painter', label: 'Zugrav', icon: '🎨' },
    { id: 'designer', label: 'Designer', icon: '✏️' },
    { id: 'mechanic', label: 'Mecanic', icon: '🔩' },
  ], []);

  useEffect(() => {
    setMounted(true);
    
    // Citește parametrii din URL când componenta se încarcă
    const urlSearchQuery = searchParams.get('q') || '';
    const urlLocation = searchParams.get('location') || '';
    
    setSearchQuery(urlSearchQuery);
    setSelectedLocation(urlLocation);
    
    // Dacă termenul de căutare se potrivește cu o categorie, setează categoria automat
    if (urlSearchQuery) {
      const matchingCategory = categories.find(cat => 
        cat.label.toLowerCase() === urlSearchQuery.toLowerCase() ||
        cat.id.toLowerCase() === urlSearchQuery.toLowerCase()
      );
      if (matchingCategory) {
        setSelectedCategory(matchingCategory.id);
      }
    }
  }, [searchParams, categories]);

  const locations = ['București', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova'];

  const mockServices = [
    {
      id: '1',
      title: 'Instalații electrice rezidențiale',
      description: 'Realizez instalații electrice complete pentru case și apartamente. Experiență de 10 ani în domeniu.',
      category: 'electrician',
      location: 'București',
      priceMin: 50,
      priceMax: 100,
      priceType: 'hourly',
      images: ['/api/placeholder/400/300'],
      craftsman: {
        firstName: 'Ion',
        lastName: 'Popescu',
        avatar: '/api/placeholder/32/32',
        rating: 4.8,
        reviewCount: 45,
        isVerified: true
      }
    },
    {
      id: '2',
      title: 'Instalații sanitare și termice',
      description: 'Montez și repar instalații sanitare, calorifere, boilere. Intervenții rapide.',
      category: 'plumber',
      location: 'Cluj-Napoca',
      priceMin: 60,
      priceMax: 120,
      priceType: 'hourly',
      images: ['/api/placeholder/400/300'],
      craftsman: {
        firstName: 'Marian',
        lastName: 'Ionescu',
        avatar: '/api/placeholder/32/32',
        rating: 4.9,
        reviewCount: 67,
        isVerified: true
      }
    },
    {
      id: '3',
      title: 'Mobilier din lemn masiv',
      description: 'Creez mobilier personalizat din lemn masiv. Rafturi, dulapuri, mese pe comandă.',
      category: 'carpenter',
      location: 'Timișoara',
      priceMin: 200,
      priceMax: 1500,
      priceType: 'project',
      images: ['/api/placeholder/400/300'],
      craftsman: {
        firstName: 'Alexandru',
        lastName: 'Drăgan',
        avatar: '/api/placeholder/32/32',
        rating: 4.7,
        reviewCount: 23,
        isVerified: false
      }
    },
    {
      id: '4',
      title: 'Zugraveli interioare și exterioare',
      description: 'Vopsesc apartamente, case, birouri. Folosesc numai vopsele de calitate premium.',
      category: 'painter',
      location: 'București',
      priceMin: 15,
      priceMax: 25,
      priceType: 'hourly',
      images: ['/api/placeholder/400/300'],
      craftsman: {
        firstName: 'Vasile',
        lastName: 'Gheorghe',
        avatar: '/api/placeholder/32/32',
        rating: 4.6,
        reviewCount: 34,
        isVerified: true
      }
    },
    {
      id: '5',
      title: 'Design interior modern',
      description: 'Amenajări interioare complete. Redau personalitatea spațiului tău cu stil contemporan.',
      category: 'designer',
      location: 'Cluj-Napoca',
      priceMin: 500,
      priceMax: 3000,
      priceType: 'project',
      images: ['/api/placeholder/400/300'],
      craftsman: {
        firstName: 'Ana',
        lastName: 'Mureșan',
        avatar: '/api/placeholder/32/32',
        rating: 4.9,
        reviewCount: 18,
        isVerified: true
      }
    },
    {
      id: '6',
      title: 'Reparații auto complete',
      description: 'Service auto cu echipament de ultimă generație. Reparații motoare, cutie viteze, frâne.',
      category: 'mechanic',
      location: 'Iași',
      priceMin: 80,
      priceMax: 150,
      priceType: 'hourly',
      images: ['/api/placeholder/400/300'],
      craftsman: {
        firstName: 'Cristian',
        lastName: 'Stanciu',
        avatar: '/api/placeholder/32/32',
        rating: 4.8,
        reviewCount: 56,
        isVerified: true
      }
    }
  ];

  // Filtrare servicii
  const filteredServices = mockServices.filter(service => {
    const categoryLabel = categories.find(c => c.id === service.category)?.label || service.category;
    
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.craftsman.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.craftsman.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !selectedLocation || selectedLocation === 'all' || service.location === selectedLocation;
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleSearch = () => {
    // Funcționalitatea de căutare este gestionată în timp real prin filteredServices
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedCategory('');
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Găsește meseriaștii potriviți
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descoperă profesioniștii din zona ta și rezervă servicii de calitate
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Caută servicii, meseriaši sau cuvinte cheie..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <div className="md:w-64">
            <Select value={selectedLocation || undefined} onValueChange={(value) => setSelectedLocation(value || '')}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Alege orașul" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate orașele</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSearch} className="md:w-32">
            <Search className="h-4 w-4 mr-2" />
            Caută
          </Button>
        </div>

        {/* Rezultate și filtre active */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">
              {!isLoading && `${filteredServices.length} servicii găsite`}
            </span>
            
            {/* Filtre active */}
            {selectedCategory && (
              <Badge variant="secondary">
                {categories.find(c => c.id === selectedCategory)?.label}
                <button 
                  onClick={() => setSelectedCategory('')}
                  className="ml-2 text-xs hover:text-red-500"
                >
                  ✕
                </button>
              </Badge>
            )}
            
            {selectedLocation && selectedLocation !== 'all' && (
              <Badge variant="secondary">
                📍 {selectedLocation}
                <button 
                  onClick={() => setSelectedLocation('')}
                  className="ml-2 text-xs hover:text-red-500"
                >
                  ✕
                </button>
              </Badge>
            )}
            
            {searchQuery && (
              <Badge variant="secondary">
                🔍 &quot;{searchQuery}&quot;
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-xs hover:text-red-500"
                >
                  ✕
                </button>
              </Badge>
            )}
            
            {(selectedCategory || (selectedLocation && selectedLocation !== 'all') || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Șterge toate filtrele
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryFilter(category.id)}
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă serviciile...</p>
        </div>
      )}

      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {service.images && service.images.length > 0 && (
                <div 
                  className="h-48 bg-gray-200 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop')` 
                  }}
                />
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">
                    {service.title}
                  </CardTitle>
                  <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {categories.find(c => c.id === service.category)?.label || service.category}
                  </span>
                </div>
                
                {service.craftsman && (
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold">
                      {service.craftsman.firstName.charAt(0)}{service.craftsman.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {service.craftsman.firstName} {service.craftsman.lastName}
                        {service.craftsman.isVerified && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Verificat
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        {service.craftsman.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{service.craftsman.rating}</span>
                            <span>({service.craftsman.reviewCount} recenzii)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{service.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-2xl font-bold text-blue-600">
                      {service.priceMin}
                      {service.priceMin !== service.priceMax && ` - ${service.priceMax}`}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        lei/{service.priceType === 'hourly' ? 'oră' : 'proiect'}
                      </span>
                    </span>
                  </div>
                  <Button size="sm">Contactează</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nu am găsit servicii
          </h3>
          <p className="text-gray-600 mb-4">
            {selectedCategory || (selectedLocation && selectedLocation !== 'all') || searchQuery 
              ? 'Încearcă să modifici filtrele pentru a găsi mai multe rezultate'
              : 'Nu există servicii disponibile momentan'
            }
          </p>
          {(selectedCategory || (selectedLocation && selectedLocation !== 'all') || searchQuery) && (
            <Button variant="outline" onClick={clearFilters}>
              Resetează toate filtrele
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
