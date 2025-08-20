'use client';

import { useState } from 'react';
import { Zap, Shield, Clock, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ElectricieniPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const services = [
    {
      title: 'Instalații electrice',
      description: 'Montaj și întreținere instalații electrice complete',
      price: 'de la 150 RON'
    },
    {
      title: 'Reparații electrocasnice',
      description: 'Service și reparații aparate electrice',
      price: 'de la 80 RON'
    },
    {
      title: 'Instalații LED',
      description: 'Montaj corpuri de iluminat și benzi LED',
      price: 'de la 100 RON'
    },
    {
      title: 'Prize și întrerupătoare',
      description: 'Montaj și înlocuire prize, întrerupătoare',
      price: 'de la 50 RON'
    },
    {
      title: 'Tablourile electrice',
      description: 'Montaj și modernizare tablouri electrice',
      price: 'de la 200 RON'
    },
    {
      title: 'Urgențe electrice',
      description: 'Intervenții urgente 24/7',
      price: 'de la 120 RON'
    }
  ];

  const areas = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6', 'Ilfov'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Electricieni în București
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Servicii electrice profesionale cu garanție. Siguranța și calitatea la cel mai bun preț.
              </p>
              
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
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                    <Zap className="w-4 h-4 mr-2" />
                    Caută electricieni
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Servicii electrice disponibile
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  De la instalații noi la reparații urgente, electricienii noștri certificați sunt pregătiți să rezolve orice problemă electrică.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {services.map((service) => (
                  <Card key={service.title} className="border border-gray-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-orange-600">
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

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  De ce să alegi electricienii noștri?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Autorizați ANRE</h4>
                    <p className="text-gray-600">Toți electricienii sunt certificați și autorizați conform normelor în vigoare</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Disponibilitate 24/7</h4>
                    <p className="text-gray-600">Intervenții urgente în orice moment, inclusiv weekenduri și sărbători</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Garanție 2 ani</h4>
                    <p className="text-gray-600">Toate lucrările beneficiază de garanție extinsă și service post-vânzare</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
