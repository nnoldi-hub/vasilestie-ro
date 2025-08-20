import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Users, Download, Calendar } from 'lucide-react';

export default function ResursePage() {
  const resources = [
    {
      category: 'Ghiduri pentru meseriași',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      items: [
        'Cum să îți creezi profilul perfect',
        'Strategii de stabilire a prețurilor',
        'Gestionarea relațiilor cu clienții',
        'Marketing pentru meseriași'
      ]
    },
    {
      category: 'Video tutoriale',
      icon: Video,
      color: 'bg-purple-100 text-purple-600',
      items: [
        'Folosirea platformei pas cu pas',
        'Optimizarea profilului pentru căutări',
        'Comunicarea eficientă cu clienții',
        'Gestionarea proiectelor'
      ]
    },
    {
      category: 'Documente utile',
      icon: FileText,
      color: 'bg-green-100 text-green-600',
      items: [
        'Șabloane de contracte',
        'Lista de prețuri recomandate',
        'Formulare de feedback',
        'Ghid de siguranță'
      ]
    },
    {
      category: 'Comunitate',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      items: [
        'Forum pentru meseriași',
        'Grup WhatsApp',
        'Evenimente lunare',
        'Networking local'
      ]
    }
  ];

  const tools = [
    {
      name: 'Calculator de prețuri',
      description: 'Calculează prețurile optime pentru serviciile tale',
      icon: '🧮'
    },
    {
      name: 'Planificator de proiecte',
      description: 'Organizează-ți proiectele eficient',
      icon: '📅'
    },
    {
      name: 'Generator de facturi',
      description: 'Creează facturi profesionale rapid',
      icon: '📄'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700">📚 Resurse gratuite</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Resurse pentru meseriași
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tot ce ai nevoie să reușești ca meseriași pe ȘtiuPeCineva.ro.
            Ghiduri, tutoriale, instrumente și o comunitate activă.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Card key={resource.category} className="h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{resource.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {resource.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tools Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Instrumente gratuite
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.name} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center bg-blue-50 rounded-2xl p-8">
          <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Descarcă ghidul complet
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Un ghid complet de 50+ pagini cu tot ce trebuie să știi pentru a fi un meseriași de succes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge className="bg-green-100 text-green-700 text-sm px-4 py-2">
              ✓ 100% Gratuit
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 text-sm px-4 py-2">
              ✓ Actualizat lunar
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 text-sm px-4 py-2">
              ✓ Format PDF
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
