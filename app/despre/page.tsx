import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Target, Heart, Award, Calendar, MapPin } from 'lucide-react';

export default function DesprePage() {
  const values = [
    {
      icon: Heart,
      title: 'Calitate',
      description: 'Ne dedicăm să oferim doar servicii de cea mai înaltă calitate'
    },
    {
      icon: Users,
      title: 'Comunitate',
      description: 'Construim o comunitate puternică de meseriași și clienți mulțumiți'
    },
    {
      icon: Target,
      title: 'Inovație',
      description: 'Folosim tehnologia pentru a conecta mai eficient meseriașii cu clienții'
    },
    {
      icon: Award,
      title: 'Excelență',
      description: 'Urmărim să fim cea mai bună platformă pentru servicii din România'
    }
  ];

  const team = [
    {
      name: 'Alexandru Popescu',
      role: 'CEO & Co-fondator',
      image: '👨‍💼',
      description: 'Expert în tehnologie cu 15 ani experiență în platforme digitale'
    },
    {
      name: 'Maria Ionescu',
      role: 'CTO & Co-fondator',
      image: '👩‍💻',
      description: 'Inginer software cu pasiune pentru soluții inovatoare'
    },
    {
      name: 'Cătălin Gheorghe',
      role: 'Head of Operations',
      image: '👨‍🔧',
      description: 'Fost meseriași cu experiență în managementul operațiunilor'
    },
    {
      name: 'Andreea Stancu',
      role: 'Head of Marketing',
      image: '👩‍🎨',
      description: 'Specialist în marketing digital și dezvoltare comunități'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Lansarea platformei',
      description: 'Am lansat MeseriiRO cu primii 100 de meseriași'
    },
    {
      year: '2024',
      title: 'Expansiune națională',
      description: 'Am ajuns la 1,000+ meseriași în toate județele României'
    },
    {
      year: '2024',
      title: '10,000 proiecte finalizate',
      description: 'Prima noastră bornă majoră - 10,000 de proiecte reușite'
    },
    {
      year: '2025',
      title: '2,500+ meseriași activi',
      description: 'Comunitatea noastră continuă să crească rapid'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700">🏢 Despre noi</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Construim viitorul serviciilor din România
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MeseriiRO este platforma care revoluționează modul în care românii găsesc
            și angajează meseriași. Misiunea noastră este să conectăm talentul cu nevoia.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Misiunea noastră</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Să democratizăm accesul la servicii de calitate în România, oferind
                o platformă sigură, transparentă și eficientă care conectează
                meseriașii cu clienții care au nevoie de serviciile lor.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-2xl text-green-900">Viziunea noastră</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                Să devenim cea mai mare și de încredere platformă pentru servicii
                din România, unde fiecare meseriași își poate dezvolta afacerea
                și fiecare client poate găsi soluția perfectă pentru nevoile sale.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Valorile noastre
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Povestea noastră
          </h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex items-start mb-8 last:mb-0">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Echipa noastră
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vrei să faci parte din povestea noastră?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Alătură-te comunității noastre de meseriași și contribuie la
            transformarea industriei serviciilor din România.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Devino Meseriași
            </Button>
            <Button size="lg" variant="outline">
              Contactează-ne
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
