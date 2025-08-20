import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Euro, Clock, Users } from 'lucide-react';

export default function PreturiPage() {
  const plans = [
    {
      name: 'Plan de Bază',
      price: 'Gratuit',
      description: 'Perfect pentru meseriașii care încep',
      features: [
        'Profil meseriași gratuit',
        'Până la 5 proiecte pe lună',
        'Suport prin email',
        'Vizibilitate de bază'
      ],
      badge: 'Gratuit',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      name: 'Plan Profesional',
      price: '49 lei/lună',
      description: 'Pentru meseriașii activi',
      features: [
        'Proiecte nelimitate',
        'Profil prioritar în căutări',
        'Statistici detaliate',
        'Suport telefonic',
        'Badge „Verificat"',
        'Galerie foto extinsă'
      ],
      badge: 'Recomandat',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Plan Premium',
      price: '99 lei/lună',
      description: 'Pentru cei mai activi meseriași',
      features: [
        'Toate beneficiile Profesional',
        'Profil evidențiat',
        'Analize avansate',
        'Manager dedicat',
        'Publicitate personalizată',
        'Acces prioritar la proiecte noi'
      ],
      badge: 'Premium',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700">💰 Prețuri transparente</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Alege planul potrivit pentru tine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fără costuri ascunse. Poți să începi gratuit și să upgradezi oricând.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card key={plan.name} className={`relative ${index === 1 ? 'scale-105 shadow-xl' : ''}`}>
              <CardHeader className="text-center">
                <Badge className={`mb-2 ${plan.badgeColor} w-fit mx-auto`}>
                  {plan.badge}
                </Badge>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {plan.price}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <Euro className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">0% comision</h3>
            <p className="text-gray-600">pe primele 3 luni</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-lg mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
            <p className="text-gray-600">suport pentru meseriași</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2,500+</h3>
            <p className="text-gray-600">meseriași activi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
