'use client';

import { useState } from 'react';
import { Hammer, Shield, Clock, Star, MapPin, Phone, CheckCircle, AlertCircle, Info, HardHat } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ConstructoriPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const services = [
    {
      title: 'Renovări complete',
      description: 'Renovări apartamente, case, spații comerciale cu proiect complet',
      price: 'de la 400 RON/mp',
      urgent: false,
      duration: '2-6 luni'
    },
    {
      title: 'Construcții case noi',
      description: 'Construcție case la roșu și la cheie, proiecte personalizate',
      price: 'de la 800 RON/mp',
      urgent: false,
      duration: '6-12 luni'
    },
    {
      title: 'Extensii și mansarde',
      description: 'Extinderi locuințe, amenajări mansarde, terase acoperite',
      price: 'de la 600 RON/mp',
      urgent: false,
      duration: '2-4 luni'
    },
    {
      title: 'Reparații structurale',
      description: 'Consolidări, reparații fundații, înlocuire grinzi',
      price: 'de la 200 RON/mp',
      urgent: true,
      duration: '1-2 luni'
    },
    {
      title: 'Amenajări interioare',
      description: 'Compartimentări, demolări, finisaje interioare',
      price: 'de la 150 RON/mp',
      urgent: false,
      duration: '2-8 săptămâni'
    },
    {
      title: 'Lucrări de zidărie',
      description: 'Ziduri, garduri, alei, pavaje, lucrări exterioare',
      price: 'de la 80 RON/mp',
      urgent: false,
      duration: '1-4 săptămâni'
    }
  ];

  const topConstructors = [
    {
      name: 'SC BuildPro SRL',
      rating: 4.9,
      reviews: 234,
      speciality: 'Construcții case și renovări',
      experience: '20 ani',
      verified: true,
      location: 'București și Ilfov',
      phone: '0727.890.123',
      team: '15 specialiști'
    },
    {
      name: 'Adrian Construct',
      rating: 4.8,
      reviews: 167,
      speciality: 'Renovări apartamente',
      experience: '12 ani',
      verified: true,
      location: 'Sectoare 1-4, București',
      phone: '0728.901.234',
      team: '8 specialiști'
    },
    {
      name: 'Master Builder Team',
      rating: 4.7,
      reviews: 198,
      speciality: 'Construcții și extensii',
      experience: '16 ani',
      verified: true,
      location: 'București și împrejurimi',
      phone: '0729.012.345',
      team: '22 specialiști'
    }
  ];

  const areas = [
    'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6',
    'Ilfov', 'Voluntari', 'Otopeni', 'Bragadiru', 'Pantelimon'
  ];

  const benefits = [
    { icon: Shield, title: 'Constructori autorizați', description: 'Licențe de construcție valide și asigurări' },
    { icon: Clock, title: 'Respectăm termenele', description: 'Proiecte finalizate la timp cu garanție' },
    { icon: Star, title: 'Calitate superioară', description: 'Materiale premium și execuție impecabilă' },
    { icon: CheckCircle, title: 'Proiecte complete', description: 'De la proiect la predarea la cheie' }
  ];

  const projectTypes = [
    { name: 'Case noi', projects: '150+ proiecte', icon: '🏠' },
    { name: 'Renovări', projects: '300+ renovări', icon: '🔨' },
    { name: 'Extensii', projects: '80+ extensii', icon: '📐' },
    { name: 'Amenajări', projects: '200+ amenajări', icon: '🎨' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Hammer className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Constructori și antreprenori în București
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Echipe profesioniste pentru construcții, renovări și amenajări. 
              Proiecte complete de la A la Z, cu garanție și respectarea termenelor.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Selectează zona</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                  <Hammer className="w-4 h-4 mr-2" />
                  Găsește constructori
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Proiecte realizate cu succes
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projectTypes.map((type, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.name}
                  </h3>
                  <p className="text-orange-600 font-medium">
                    {type.projects}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Servicii de construcții disponibile
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                De la proiectare la finalizare, echipe complete pentru 
                orice tip de construcție sau renovare.
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
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-orange-600">
                          {service.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Durată: {service.duration}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Solicită ofertă
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Constructors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Constructori de top în București
              </h2>
              <p className="text-gray-600">
                Echipe profesioniste cu experiență și rezultate dovedite
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topConstructors.map((constructor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="relative inline-block">
                        <div className="w-20 h-20 rounded-full mx-auto bg-orange-100 flex items-center justify-center">
                          <HardHat className="w-8 h-8 text-orange-600" />
                        </div>
                        {constructor.verified && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {constructor.name}
                      </h3>
                      <p className="text-orange-600 font-medium mb-2">
                        {constructor.speciality}
                      </p>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{constructor.rating}</span>
                        <span className="text-gray-500">({constructor.reviews} recenzii)</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Experiență: {constructor.experience}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        Echipă: {constructor.team}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{constructor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{constructor.phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Vezi portofoliu
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              De ce să alegi constructori prin ȘtiuPeCineva.ro?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-orange-600" />
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

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Procesul nostru de lucru
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Consultanță', description: 'Discutăm proiectul și cerințele' },
                { step: '2', title: 'Proiect', description: 'Elaborăm proiectul și devizul' },
                { step: '3', title: 'Execuție', description: 'Realizăm lucrarea cu echipe specializate' },
                { step: '4', title: 'Finalizare', description: 'Predăm lucrarea cu garanție' }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Gata să îți transformi visul în realitate?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Obține oferte gratuite de la constructori verificați. 
              Consultanță gratuită pentru proiectul tău.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Solicită consultanță gratuită
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                <Hammer className="w-5 h-5 mr-2" />
                Vezi portofoliul
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sfaturi pentru proiectul de construcție
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Verifică întotdeauna licențele și autorizațiile constructorului</li>
                  <li>• Cere referințe de la proiecte anterioare similare</li>
                  <li>• Asigură-te că ai un contract clar cu termene și prețuri fixe</li>
                  <li>• Planifică un buget suplimentar de 10-15% pentru imprevizite</li>
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