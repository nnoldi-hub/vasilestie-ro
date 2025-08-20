'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Alexandra Popescu',
      location: 'București',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5,
      service: 'Instalații electrice',
      craftsman: 'Mihai Popescu',
      date: '2 săptămâni în urmă',
      review: 'Experiență excepțională! Mihai a fost foarte profesionist, punctual și a rezolvat problema electrică rapid. Prețul a fost corect și a explicat tot ce a făcut. Recomand cu încredere!',
      verified: true
    },
    {
      id: 2,
      name: 'Radu Ionescu',
      location: 'Cluj-Napoca',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5,
      service: 'Renovare baie',
      craftsman: 'Ana Georgescu',
      date: '1 lună în urmă',
      review: 'Ana a transformat complet baia noastră! Design-ul este modern și funcțional, iar execuția a fost impecabilă. A respectat bugetul și termenele stabilite. Mulțumim!',
      verified: true
    },
    {
      id: 3,
      name: 'Maria Stanciu',
      location: 'Timișoara',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5,
      service: 'Instalații sanitare',
      craftsman: 'Radu Ionescu',
      date: '3 săptămâni în urmă',
      review: 'Serviciu de calitate superioară! Radu a instalat sistemul de încălzire în pardoseală și a fost foarte atent la detalii. Comunicarea a fost excelentă pe tot parcursul proiectului.',
      verified: true
    },
    {
      id: 4,
      name: 'Cristian Marin',
      location: 'Iași',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5,
      service: 'Vopsitorii',
      craftsman: 'Elena Dumitrescu',
      date: '1 săptămână în urmă',
      review: 'Elena a făcut o treabă fantastică la vopsirea apartamentului. Foarte atentă la detalii, curată în lucru și cu prețuri corecte. Casa arată ca nouă!',
      verified: true
    },
    {
      id: 5,
      name: 'Diana Gheorghe',
      location: 'Constanța',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5,
      service: 'Amenajare grădină',
      craftsman: 'Maria Stanciu',
      date: '2 luni în urmă',
      review: 'Grădina noastră a fost transformată complet! Maria are un gust excelent și a creat un spațiu de vis. Plantele sunt sănătoase și designul este superb.',
      verified: true
    },
    {
      id: 6,
      name: 'Andrei Nicolae',
      location: 'Brașov',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5,
      service: 'Construcții',
      craftsman: 'Cristian Marin',
      date: '6 săptămâni în urmă',
      review: 'Cristian a construit terasa de vis! Foarte profesionist, cu experiență vastă și prețuri competitive. A respectat toate termenele și calitatea este excepțională.',
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Ce spun clienții noștri
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Peste 12,000 de clienți mulțumiți au găsit meseriașii potriviți prin Mesteras.ro. 
            Citește experiențele lor reale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-brand-primary opacity-20" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {testimonial.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.review}"
                </p>

                {/* Service Info */}
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.service}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    Meseriași: {testimonial.craftsman}
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  {testimonial.verified && (
                    <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                      ✓ Verificat
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">4.9</div>
              <div className="text-sm text-gray-600">Rating mediu</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">12,000+</div>
              <div className="text-sm text-gray-600">Clienți mulțumiți</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">15,000+</div>
              <div className="text-sm text-gray-600">Servicii completate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">98%</div>
              <div className="text-sm text-gray-600">Rata de satisfacție</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}