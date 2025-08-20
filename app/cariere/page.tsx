import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, TrendingUp, Award } from 'lucide-react';

export default function CarierePage() {
  const positions = [
    {
      title: 'Frontend Developer',
      department: 'Tehnologie',
      type: 'Full-time',
      location: 'București / Remote',
      description: 'Dezvoltă interfețe utilizator moderne și responsive pentru platforma MeseriiRO.'
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      type: 'Full-time', 
      location: 'București',
      description: 'Gestionează campaniile de marketing digital și dezvoltă strategii de creștere.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Suport Clienți',
      type: 'Full-time',
      location: 'Cluj-Napoca / Remote',
      description: 'Ajută meseriașii să își dezvolte afacerile și să obțină cele mai bune rezultate.'
    },
    {
      title: 'Backend Developer',
      department: 'Tehnologie',
      type: 'Full-time',
      location: 'București / Remote',
      description: 'Construiește și menține sistemele backend care susțin platforma MeseriiRO.'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Salariu competitiv',
      description: 'Oferim salarii de top în industrie plus bonusuri bazate pe performanță'
    },
    {
      icon: Users,
      title: 'Echipă fantastică',
      description: 'Lucrează cu oameni talentați și pasionați de tehnologie'
    },
    {
      icon: Award,
      title: 'Dezvoltare profesională',
      description: 'Buget dedicat pentru cursuri, conferințe și certificări'
    },
    {
      icon: Briefcase,
      title: 'Flexibilitate',
      description: 'Program flexibil de lucru și posibilitatea de remote work'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700">💼 Alătură-te echipei</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Cariere la MeseriiRO
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Construim viitorul serviciilor din România. Dacă vrei să faci parte
            din această misiune, explorează oportunitățile de carieră.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            De ce să lucrezi cu noi?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={benefit.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Poziții deschise
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {positions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{position.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {position.department} • {position.type} • {position.location}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      Deschisă
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  <Button className="w-full sm:w-auto">
                    Aplică acum
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Position Match */}
        <div className="text-center bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Nu găsești poziția potrivită?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Trimite-ne CV-ul tău și ne vom lua legătura cu tine când va apărea
            o oportunitate care se potrivește cu experiența ta.
          </p>
          <Button variant="outline" size="lg">
            Trimite CV-ul spontan
          </Button>
        </div>

        {/* Company Culture */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Cultura companiei
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Inovație</h3>
              <p className="text-gray-600 text-sm">
                Încurajăm ideile noi și experimentarea cu tehnologii moderne
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Colaborare</h3>
              <p className="text-gray-600 text-sm">
                Lucrăm împreună ca o echipă unită pentru a atinge obiectivele
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Viteză</h3>
              <p className="text-gray-600 text-sm">
                Livrăm rapid și eficient, menținând standardele de calitate ridicate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
