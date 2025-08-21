'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, CheckCircle, Settings, Bell, MessageCircle, CreditCard } from 'lucide-react';

export function HowItWorksCraftsmen() {
  const steps = [
    {
      step: 1,
      title: 'Înregistrează-te',
      description: 'Completează formularul de înregistrare cu datele tale și experiența profesională.',
      icon: UserPlus,
      color: 'bg-brand-primary/10 text-brand-primary',
      details: [
        'Informații personale',
        'Experiența profesională',
        'Certificări și licențe',
        'Fotografii cu lucrările anterioare'
      ],
      duration: '5-10 minute'
    },
    {
      step: 2,
      title: 'Verificare și aprobare',
      description: 'Verificăm documentele și experiența ta pentru a ne asigura de calitatea serviciilor.',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      details: [
        'Verificarea documentelor',
        'Verificarea referințelor',
        'Validarea experienței',
        'Aprobare finală'
      ],
      duration: '24-48 ore'
    },
    {
      step: 3,
      title: 'Creează-ți profilul',
      description: 'Configurează profilul tău profesional cu serviciile oferite și zonele de acoperire.',
      icon: Settings,
      color: 'bg-brand-accent/10 text-brand-accent',
      details: [
        'Servicii oferite',
        'Zone de lucru',
        'Prețuri și tarife',
        'Program de lucru'
      ],
      duration: '10-15 minute'
    },
    {
      step: 4,
      title: 'Primește solicitări',
      description: 'Vei fi notificat când clienții caută servicii în domeniul tău de expertiză.',
      icon: Bell,
      color: 'bg-yellow-100 text-yellow-600',
      details: [
        'Notificări instant',
        'Detalii proiect',
        'Informații client',
        'Deadline-uri'
      ],
      duration: 'Continuu'
    },
    {
      step: 5,
      title: 'Comunică cu clienții',
      description: 'Discută detaliile proiectului și negociază termenii direct cu clientul.',
      icon: MessageCircle,
      color: 'bg-blue-100 text-blue-600',
      details: [
        'Contact direct cu clientul',
        'Negociere preț și termeni',
        'Stabilire program',
        'Fără intermediari'
      ],
      duration: 'La nevoie'
    },
    {
      step: 6,
      title: 'Plătește abonamentul',
      description: 'Alege planul de abonament potrivit pentru a fi vizibil pe platformă.',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
      details: [
        'BASIC - 29.99 RON/lună',
        'PREMIUM - 49.99 RON/lună', 
        'PROFESSIONAL - 99.99 RON/lună',
        'Fără comisioane din vânzări'
      ],
      duration: 'Monthly billing'
    }
  ];

  const subscriptionPlans = [
    {
      name: 'BASIC',
      price: '29.99',
      features: [
        'Profil pe platformă',
        'Până la 5 contacte/lună',
        'Support email',
        'Badge "Partner"'
      ],
      color: 'border-gray-200'
    },
    {
      name: 'PREMIUM',
      price: '49.99',
      features: [
        'Profil premium destacat',
        'Până la 20 contacte/lună',
        'Support prioritar',
        'Badge "Premium"',
        'Statistici avansate'
      ],
      color: 'border-brand-primary',
      popular: true
    },
    {
      name: 'PROFESSIONAL',
      price: '99.99',
      features: [
        'Profil top poziție',
        'Contacte nelimitate',
        'Support 24/7',
        'Badge "Professional"',
        'Dashboard complet',
        'API access'
      ],
      color: 'border-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-brand-primary/10 text-brand-primary">
            Pentru Meseriași
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Cum să devii meseriași partner
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            În 6 pași simpli, îți creezi profilul professional și primești cereri directe 
            de la clienți - fără comisioane din vânzări!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0" />
              )}
              
              <Card className="relative z-10 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                <CardContent className="p-6 text-center">
                  {/* Step Number & Duration */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-white border-4 border-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-primary">{step.step}</span>
                    </div>
                  </div>
                  
                  <div className="absolute -top-3 right-4">
                    <Badge variant="secondary" className="text-xs">
                      {step.duration}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${step.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-xs text-gray-500">
                        <div className="w-1 h-1 bg-brand-primary rounded-full mr-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Alege planul potrivit pentru tine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={plan.name} className={`relative ${plan.color} border-2 ${plan.popular ? 'shadow-xl' : 'shadow-md'} hover:shadow-xl transition-shadow`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-primary text-white">
                      Cel mai popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-brand-primary">{plan.price}</span>
                    <span className="text-gray-500"> RON/lună</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.popular 
                        ? 'bg-brand-primary text-white hover:bg-brand-primary/90' 
                        : 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                    }`}
                  >
                    Alege planul {plan.name}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Gata să începi să primești clienți?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Alătură-te rețelei noastre de meseriași profesioniști și primește cereri 
              directe de la clienți - fără comisioane din vânzările tale!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-brand-primary rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Înregistrează-te acum
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-primary transition-colors">
                Vezi exemple de profiluri
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
