'use client';

import { useState } from 'react';
import { Brush, Shield, Clock, Star, MapPin, Phone, CheckCircle, Palette } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ZugraviPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const services = [
    {
      title: 'Vopsit interior',
      description: 'Vopsit pereți, tavane, finisaje interioare cu vopsele premium',
      price: 'de la 15 RON/mp'
    },
    {
      title: 'Vopsit exterior',
      description: 'Vopsit fațade, garduri, suprafețe exterioare rezistente',
      price: 'de la 20 RON/mp'
    },
    {
      title: 'Aplicat tapet',
      description: 'Montaj tapet decorativ, îndepărtare tapet vechi',
      price: 'de la 12 RON/mp'
    },
    {
      title: 'Vopsit lemn și metal',
      description: 'Tratare și vopsire suprafețe din lemn și metal',
      price: 'de la 25 RON/mp'
    }
  ];

  const areas = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6', 'Ilfov'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Brush className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Zugravi profesioniști în București
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Servicii complete de zugraveli și finisaje. Culori perfecte pentru casa ta.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Selectează zona</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  <Brush className="w-4 h-4 mr-2" />
                  Găsește zugravi
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
                Servicii de zugraveli disponibile
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-purple-600">
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
      </main>
      <Footer />
    </div>
  );
}