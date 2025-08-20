'use client';

import { useState } from 'react';
import { TreePine, Shield, Clock, Star, MapPin, Phone, CheckCircle, Flower } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GradinariPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const services = [
    {
      title: 'Amenajări grădini',
      description: 'Proiectare și execuție grădini, spații verzi, peisagistică',
      price: 'de la 50 RON/mp'
    },
    {
      title: 'Întreținere spații verzi',
      description: 'Tuns gazon, îngrijire plante, fertilizare, tratamente',
      price: 'de la 80 RON/oră'
    },
    {
      title: 'Plantare arbori și arbuști',
      description: 'Consiliere și plantare arbori ornamentali, pomi fructiferi',
      price: 'de la 30 RON/buc'
    },
    {
      title: 'Sisteme de irigații',
      description: 'Instalare și întreținere sisteme automate de udare',
      price: 'de la 25 RON/mp'
    }
  ];

  const areas = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6', 'Ilfov'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <TreePine className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Grădinari și peisagiști în București
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Transformă-ți spațiul exterior într-o oază de verdeață și frumusețe.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Selectează zona</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  <TreePine className="w-4 h-4 mr-2" />
                  Găsește grădinari
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
                Servicii de grădinărit disponibile
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
                      <span className="text-lg font-semibold text-green-600">
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