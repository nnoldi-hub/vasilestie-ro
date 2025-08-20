'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, CheckCircle, Heart } from 'lucide-react';
import { useState } from 'react';

export function FeaturedCraftsmen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const craftsmen = [
    {
      id: '1',
      name: 'Mihai Popescu',
      profession: 'Electrician',
      rating: 4.9,
      reviewCount: 127,
      location: 'București, Sector 1',
      hourlyRate: { min: 80, max: 120 },
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isVerified: true,
      responseTime: '< 2 ore',
      completedJobs: 156,
      specialties: ['Instalații electrice', 'Automatizări', 'Iluminat'],
      description: 'Electrician cu experiență de 8 ani în instalații rezidențiale și comerciale.',
      availability: 'Disponibil astăzi',
    },
    {
      id: '2',
      name: 'Ana Georgescu',
      profession: 'Designer Interior',
      rating: 4.8,
      reviewCount: 89,
      location: 'Cluj-Napoca',
      hourlyRate: { min: 150, max: 250 },
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isVerified: true,
      responseTime: '< 1 oră',
      completedJobs: 94,
      specialties: ['Design modern', 'Amenajări complete', 'Consultanță'],
      description: 'Designer cu pasiune pentru spații funcționale și estetice.',
      availability: 'Disponibilă mâine',
    },
    {
      id: '3',
      name: 'Radu Ionescu',
      profession: 'Instalator',
      rating: 4.9,
      reviewCount: 203,
      location: 'Timișoara',
      hourlyRate: { min: 70, max: 100 },
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isVerified: true,
      responseTime: '< 3 ore',
      completedJobs: 278,
      specialties: ['Instalații sanitare', 'Încălzire', 'Climatizare'],
      description: 'Instalator cu 12 ani experiență în sisteme de încălzire și sanitare.',
      availability: 'Disponibil astăzi',
    },
    {
      id: '4',
      name: 'Elena Dumitrescu',
      profession: 'Zugrav',
      rating: 4.7,
      reviewCount: 156,
      location: 'Iași',
      hourlyRate: { min: 60, max: 90 },
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isVerified: true,
      responseTime: '< 4 ore',
      completedJobs: 189,
      specialties: ['Vopsitorii', 'Finisaje decorative', 'Restaurări'],
      description: 'Specialist în finisaje interioare și exterioare de calitate superioară.',
      availability: 'Disponibilă în 2 zile',
    },
    {
      id: '5',
      name: 'Cristian Marin',
      profession: 'Constructor',
      rating: 4.8,
      reviewCount: 98,
      location: 'Constanța',
      hourlyRate: { min: 90, max: 140 },
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isVerified: true,
      responseTime: '< 6 ore',
      completedJobs: 134,
      specialties: ['Renovări', 'Construcții noi', 'Amenajări'],
      description: 'Constructor cu experiență în proiecte rezidențiale și comerciale.',
      availability: 'Disponibil în 3 zile',
    },
    {
      id: '6',
      name: 'Maria Stanciu',
      profession: 'Grădinar',
      rating: 4.9,
      reviewCount: 67,
      location: 'Brașov',
      hourlyRate: { min: 50, max: 80 },
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isVerified: true,
      responseTime: '< 5 ore',
      completedJobs: 87,
      specialties: ['Amenajări peisagistice', 'Întreținere', 'Consultanță'],
      description: 'Specialist în amenajări peisagistice și întreținerea grădinilor.',
      availability: 'Disponibilă astăzi',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Meseriași de top
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descoperă cei mai apreciați meseriași din comunitatea noastră, 
            verificați și cu recenzii excelente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {craftsmen.map((craftsman) => (
            <Card key={craftsman.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                {/* Header with Avatar and Basic Info */}
                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <button
                    onClick={() => toggleFavorite(craftsman.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.includes(craftsman.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>

                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 ring-4 ring-white">
                        <AvatarImage src={craftsman.avatar} alt={craftsman.name} />
                        <AvatarFallback>{craftsman.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {craftsman.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {craftsman.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {craftsman.profession}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium text-gray-900">{craftsman.rating}</span>
                          <span className="ml-1">({craftsman.reviewCount})</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{craftsman.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {craftsman.description}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {craftsman.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {craftsman.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{craftsman.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{craftsman.responseTime}</span>
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium text-gray-900">{craftsman.completedJobs}</span> lucrări
                    </div>
                  </div>

                  {/* Pricing and Availability */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {craftsman.hourlyRate.min}-{craftsman.hourlyRate.max} RON
                      </div>
                      <div className="text-xs text-gray-500">pe oră</div>
                    </div>
                    <Badge 
                      variant={craftsman.availability.includes('astăzi') ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {craftsman.availability}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Contactează
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Vezi profil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Vezi toți meseriașii
          </Button>
        </div>
      </div>
    </section>
  );
}