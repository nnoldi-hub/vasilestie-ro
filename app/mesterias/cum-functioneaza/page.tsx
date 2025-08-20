'use client';

import { 
  UserPlus, 
  FileText, 
  CheckCircle, 
  Bell, 
  MessageSquare, 
  CreditCard, 
  Star,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CumFunctioneazaPage() {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: 'Înregistrează-te',
      description: 'Completează formularul de înregistrare cu datele tale și experiența profesională.',
      details: ['Informații personale', 'Experiență profesională', 'Certificări și licențe', 'Fotografii cu lucrările anterioare'],
      time: '5-10 minute',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      number: 2,
      icon: FileText,
      title: 'Verificare și aprobare',
      description: 'Verificăm documentele și experiența ta pentru a ne asigura de calitatea serviciilor.',
      details: ['Verificarea documentelor', 'Validarea experienței', 'Verificarea referințelor', 'Aprobare finală'],
      time: '24-48 ore',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      number: 3,
      icon: CheckCircle,
      title: 'Creează-ți profilul',
      description: 'Configurează profilul tău profesional cu serviciile oferite și zonele de acoperire.',
      details: ['Servicii oferite', 'Zone de lucru', 'Prețuri și tarife', 'Program de lucru'],
      time: '10-15 minute',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      number: 4,
      icon: Bell,
      title: 'Primește solicitări',
      description: 'Vei fi notificat când clienții caută servicii în domeniul tău de expertiză.',
      details: ['Notificări instant', 'Detalii proiect', 'Informații client', 'Deadline-uri'],
      time: 'Continuu',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      number: 5,
      icon: MessageSquare,
      title: 'Comunică cu clienții',
      description: 'Discută detaliile proiectului și negociază termenii direct cu clientul.',
      details: ['Chat securizat', 'Partajare documente', 'Videocall opțional', 'Istoricul conversațiilor'],
      time: 'La nevoie',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      number: 6,
      icon: CreditCard,
      title: 'Finalizează și primește plata',
      description: 'După finalizarea lucrării și confirmarea clientului, primești plata automată.',
      details: ['Confirmare finalizare', 'Rating și recenzie', 'Transfer automat', 'Factură generată'],
      time: 'Instant după confirmare',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Acces la mii de clienți',
      description: 'Conectează-te cu o bază mare de clienți activi care caută serviciile tale zilnic.',
      stats: '10,000+ clienți noi lunar',
    },
    {
      icon: TrendingUp,
      title: 'Creșterea veniturilor',
      description: 'Mărește-ți veniturile prin accesul la mai multe proiecte și clienți premium.',
      stats: 'Creștere medie 40% venituri',
    },
    {
      icon: Shield,
      title: 'Siguranță și protecție',
      description: 'Plăți garantate, asigurare lucrări și suport juridic pentru orice situație.',
      stats: '100% plăți garantate',
    },
    {
      icon: Star,
      title: 'Construiește-ți reputația',
      description: 'Sistemul nostru de rating îți va ajuta să îți construiești o reputație solidă.',
      stats: 'Rating mediu 4.8/5',
    },
  ];

  const features = [
    'Calendar inteligent pentru gestionarea programului',
    'Aplicație mobilă pentru gestionare on-the-go',
    'Sistem de plăți securizat și rapid',
    'Suport tehnic 24/7 pentru meseriași',
    'Instrumente de marketing pentru promovare',
    'Analize și rapoarte detaliate de performanță',
    'Sistem de backup pentru clienți secundari',
    'Comunitate activă de meseriași pentru networking',
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-6 text-lg px-6 py-2">
              ✨ Simplu și eficient
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Cum funcționează 
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                MeseriiRO
              </span>
              pentru meseriași
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Dezvoltă-ți afacerea și conectează-te cu mii de clienți în doar 
              <strong className="text-white"> 6 pași simpli</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Începe acum gratuit →
              </Button>
              <div className="text-blue-200 text-sm">
                ✓ Fără costuri inițiale ✓ Suport 24/7 ✓ Garantat 100%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4 text-lg px-6 py-2">
              📋 Procesul complet
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              6 pași simpli pentru succes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la înregistrare la primul câștig - te ghidăm pas cu pas 
              în dezvoltarea afacerii tale pe MeseriiRO
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Step Number */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          {step.number}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        {/* Icon and Title */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center`}>
                            <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {step.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                              {step.time}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 mb-4 text-lg px-6 py-2">
              🚀 Avantajele MeseriiRO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              De ce să alegi MeseriiRO?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Peste 10,000 de meseriași au ales să-și dezvolte afacerea cu noi. 
              Descoperă de ce!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm">
                    {benefit.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Instrumente și funcționalități
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-white/20 text-white mb-6 text-lg px-6 py-3">
                🎯 Timpul perfect să începi
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Gata să începi să câștigi mai mult?
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
                Alătură-te comunității de peste <strong className="text-white">10,000</strong> de meseriași 
                care și-au dezvoltat afacerea cu MeseriiRO
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,500+</div>
                <div className="text-blue-200 text-sm">Meseriași activi</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">40%</div>
                <div className="text-blue-200 text-sm">Creștere venituri</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.8★</div>
                <div className="text-blue-200 text-sm">Rating mediu</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 font-semibold">
                Înregistrează-te gratuit acum
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 font-semibold">
                Vorbește cu un consultant
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-200 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Înregistrarea este gratuită
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Fără taxe ascunse
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Suport 24/7
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
