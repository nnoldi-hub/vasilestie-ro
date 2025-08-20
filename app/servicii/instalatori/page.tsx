'use client';

import { useState } from 'react';
import { Droplets, Shield, Clock, Star, MapPin, Phone, CheckCircle, AlertCircle, Info, Wrench } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function InstaliatoriPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const services = [
    {
      title: 'Instalații sanitare complete',
      description: 'Proiectare și execuție instalații sanitare pentru băi, bucătării și case noi',
      price: 'de la 120 RON/mp',
      urgent: false
    },
    {
      title: 'Reparații țevi și scurgeri',
      description: 'Intervenții rapide pentru țevi sparte, scurgeri, deblocări canalizări',
      price: 'de la 100 RON',
      urgent: true
    },
    {
      title: 'Montaj obiecte sanitare',
      description: 'Instalare căzi, dușuri, toalete, lavoare, bidee',
      price: 'de la 80 RON/buc',
      urgent: false
    },
    {
      title: 'Instalații termice',
      description: 'Montaj și întreținere sisteme de încălzire, radiatoare, încălzire în pardoseală',
      price: 'de la 200 RON/mp',
      urgent: false
    },
    {
      title: 'Instalații de gaze',
      description: 'Montaj și verificare instalații de gaze naturale, certificate ISCIR',
      price: 'de la 300 RON',
      urgent: false
    },
    {
      title: 'Întreținere și verificări',
      description: 'Verificări periodice, întreținere instalații, certificări',
      price: 'de la 150 RON',
      urgent: false
    }
  ];

  const topInstallers = [
    {
      name: 'Mihai Constantinescu',
      rating: 4.9,
      reviews: 178,
      speciality: 'Instalații sanitare și termice',
      experience: '14 ani',
      verified: true,
      location: 'Sector 4, București',
      phone: '0724.567.890',
      certifications: ['ISCIR', 'ANRE']
    },
    {
      name: 'Daniel Popa',
      rating: 4.8,
      reviews: 142,
      speciality: 'Reparații urgente',
      experience: '10 ani',
      verified: true,
      location: 'Sector 6, București',
      phone: '0725.678.901',
      certifications: ['ISCIR']
    },
    {
      name: 'Cristian Marinescu',
      rating: 4.7,
      reviews: 95,
      speciality: 'Instalații de gaze',
      experience: '18 ani',
      verified: true,
      location: 'Ilfov',
      phone: '0726.789.012',
      certifications: ['ISCIR', 'ANRGN']
    }
  ];

  const areas = [
    'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6',
    'Ilfov', 'Voluntari', 'Otopeni', 'Bragadiru', 'Pantelimon'
  ];

  const benefits = [
    { icon: Shield, title: 'Instalatori autorizați', description: 'Certificări ISCIR și ANRGN valide' },
    { icon: Clock, title: 'Disponibilitate 24/7', description: 'Intervenții urgente oricând' },
    { icon: Star, title: 'Garanție lucrări', description: 'Garanție extinsă pentru toate lucrările' },
    { icon: CheckCircle, title: 'Materiale incluse', description: 'Oferte cu tot inclus, fără surprize' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Droplets className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Instalatori sanitari și termici în București
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Profesioniști autorizați pentru instalații sanitare, termice și de gaze. 
              Intervenții rapide, garanție extinsă, prețuri corecte.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selectează zona</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <Droplets className="w-4 h-4 mr-2" />
                  Găsește instalatori
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Servicii de instalații disponibile
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                De la reparații urgente la instalații complete, profesioniști 
                autorizați pentru toate tipurile de instalații.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      {service.urgent && (
                        <Badge variant="destructive" className="ml-2">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-600">
                        {service.price}
                      </span>
                      <Button variant="outline" size="sm">
                        Solicită ofertă
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Installers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Instalatori de top în București
              </h2>
              <p className="text-gray-600">
                Profesioniști autorizați cu cele mai bune evaluări
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topInstallers.map((installer, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="relative inline-block">
                        <div className="w-20 h-20 rounded-full mx-auto bg-blue-100 flex items-center justify-center">
                          <Wrench className="w-8 h-8 text-blue-600" />
                        </div>
                        {installer.verified && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {installer.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {installer.speciality}
                      </p>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{installer.rating}</span>
                        <span className="text-gray-500">({installer.reviews} recenzii)</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Experiență: {installer.experience}
                      </p>
                      
                      {/* Certifications */}
                      <div className="flex justify-center gap-1 mb-3">
                        {installer.certifications.map((cert) => (
                          <Badge key={cert} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{installer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{installer.phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Contactează
                      </Button>
                      <Button variant="outline" size="icon">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              De ce să alegi instalatori prin ȘtiuPeCineva.ro?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Scurgere sau țeavă spartă?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Instalatori de urgență disponibili 24/7. Intervenții rapide 
              în maxim 45 de minute pentru orice problemă sanitară.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Apel urgență: 0800.MESERII
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Droplets className="w-5 h-5 mr-2" />
                Solicită intervenție
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Info */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sfaturi pentru instalațiile din casă
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Verifică periodic robineții și țevile pentru scurgeri</li>
                  <li>• Nu lăsa niciodată robinetele să îngheț iarna</li>
                  <li>• Programează verificări anuale pentru instalațiile de gaze</li>
                  <li>• Folosește doar instalatori autorizați pentru lucrările complexe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}