import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, ExternalLink, Newspaper, FileText, Image } from 'lucide-react';

export default function PresaPage() {
  const pressReleases = [
    {
      title: 'Mesteras.ro atinge pragul de 2,500 de meseriași activi',
      date: '15 August 2025',
      category: 'Creștere',
      description: 'Platforma românească de servicii pentru casă înregistrează o creștere de 300% față de anul trecut.',
      downloadUrl: '/press/mesteras-2500-meseriasi.pdf'
    },
    {
      title: 'Lansarea noului sistem de verificare a meseriaților',
      date: '2 August 2025', 
      category: 'Produs',
      description: 'Mesteras.ro introduce un sistem inovator de verificare în 3 pași pentru siguranța clienților.',
      downloadUrl: '/press/sistem-verificare-meseriasi.pdf'
    },
    {
      title: 'Parteneriat strategic cu Camera Meseriaților din România',
      date: '20 Iulie 2025',
      category: 'Parteneriate',
      description: 'Colaborare pentru standardizarea și digitalizarea serviciilor de meserii din România.',
      downloadUrl: '/press/parteneriat-camera-meseriasilor.pdf'
    },
    {
      title: 'Mesteras.ro primește investiție de 2 milioane euro',
      date: '5 Iulie 2025',
      category: 'Finanțare',
      description: 'Runda de finanțare Seria A va accelera expansiunea în întreaga țară.',
      downloadUrl: '/press/investitie-2-milioane-euro.pdf'
    }
  ];

  const mediaKit = [
    {
      name: 'Logo-uri Mesteras.ro',
      description: 'Logo-uri în diferite formate și culori',
      type: 'ZIP',
      size: '2.5 MB'
    },
    {
      name: 'Poze echipă și birou',
      description: 'Imagini high-res cu echipa și spațiul de lucru',
      type: 'ZIP',
      size: '15.2 MB'
    },
    {
      name: 'Screenshots aplicație',
      description: 'Capturi de ecran din platforma Mesteras.ro',
      type: 'ZIP',
      size: '8.7 MB'
    },
    {
      name: 'Fact sheet companie',
      description: 'Informații esențiale despre Mesteras.ro',
      type: 'PDF',
      size: '1.1 MB'
    }
  ];

  const awards = [
    {
      year: '2024',
      award: 'Startup-ul Anului',
      organization: 'Romanian Startup Awards',
      description: 'Pentru inovația în digitalizarea serviciilor'
    },
    {
      year: '2024',
      award: 'Best Digital Platform',
      organization: 'TechCrunch Disrupt Europe',
      description: 'Categoria Servicii și Marketplace'
    },
    {
      year: '2023',
      award: 'Innovation Award',
      organization: 'Bucharest Tech Week',
      description: 'Pentru soluția de conectare meseriași-clienți'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700">📰 Centrul de presă</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Presă și Media
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Informații pentru jurnaliști, blogeri și reprezentanți media.
            Descarcă materiale de presă și află ultimele noutăți despre Mesteras.ro.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Contact presă
            </h2>
            <p className="text-blue-800">
              Pentru întrebări media, interviuri sau informații suplimentare
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Andreea Stancu</h3>
                <p className="text-gray-600 mb-2">Head of Marketing</p>
                <p className="text-brand-primary">presa@mesteras.ro</p>
                <p className="text-gray-600">+40 21 123 4567</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Maria Popescu</h3>
                <p className="text-gray-600 mb-2">PR Specialist</p>
                <p className="text-brand-primary">media@mesteras.ro</p>
                <p className="text-gray-600">+40 21 123 4568</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Comunicate de presă
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge className="mr-3 bg-gray-100 text-gray-700">
                          {release.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {release.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{release.title}</CardTitle>
                      <CardDescription>{release.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Descarcă PDF
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Citește online
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Kit */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Kit media
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Image className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Badge variant="outline" className="mr-2">{item.type}</Badge>
                        <span>{item.size}</span>
                      </div>
                    </div>
                    <Button size="sm" className="ml-4">
                      <Download className="h-4 w-4 mr-1" />
                      Descarcă
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Premii și recunoașteri
          </h2>
          <div className="max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-yellow-100 text-yellow-600 rounded-full w-16 h-16 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                  {award.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {award.award}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {award.organization}
                  </p>
                  <p className="text-gray-600">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Mesteras.ro în cifre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Meseriași activi</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">25,000+</div>
              <div className="text-gray-600">Clienți mulțumiți</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-gray-600">Proiecte finalizate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">42</div>
              <div className="text-gray-600">Județe acoperite</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
