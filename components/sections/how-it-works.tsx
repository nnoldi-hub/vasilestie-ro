'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, UserCheck, Calendar, Star } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'Caută serviciul',
      description: 'Descrie ce ai nevoie și alege din sute de meseriași verificați din zona ta.',
      icon: Search,
      color: 'bg-brand-primary/10 text-brand-primary',
      details: [
        'Căutare avansată cu filtre',
        'Comparare prețuri și recenzii',
        'Meseriași verificați și asigurați'
      ]
    },
    {
      step: 2,
      title: 'Alege meseriașul',
      description: 'Compară profilurile, citește recenziile și alege meseriașul potrivit pentru tine.',
      icon: UserCheck,
      color: 'bg-green-100 text-green-600',
      details: [
        'Profiluri detaliate cu portofoliu',
        'Recenzii reale de la clienți',
        'Prețuri transparente'
      ]
    },
    {
      step: 3,
      title: 'Rezervă serviciul',
      description: 'Stabilește detaliile lucrării și programează o întâlnire la momentul potrivit.',
      icon: Calendar,
      color: 'bg-brand-accent/10 text-brand-accent',
      details: [
        'Programare flexibilă',
        'Comunicare directă',
        'Plată securizată'
      ]
    },
    {
      step: 4,
      title: 'Evaluează experiența',
      description: 'După finalizarea lucrării, lasă o recenzie pentru a ajuta comunitatea.',
      icon: Star,
      color: 'bg-purple-100 text-purple-600',
      details: [
        'Sistem de rating transparent',
        'Recenzii verificate',
        'Garanție pentru servicii'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-brand-primary/10 text-brand-primary">
            Simplu și sigur
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Cum funcționează VasileStie.ro
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            În doar 4 pași simpli, găsești și rezervi serviciile de care ai nevoie, 
            cu încredere și transparență totală.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0" />
              )}
              
              <Card className="relative z-10 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-white border-4 border-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-primary">{step.step}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Gata să începi?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Alătură-te celor peste 12,000 de clienți mulțumiți care au găsit 
              meseriașii potriviți prin Mesteras.ro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-brand-primary rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Caută un meseriași
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-primary transition-colors">
                Devino meseriași
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}