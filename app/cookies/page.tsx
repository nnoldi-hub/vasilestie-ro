import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cookie, Settings, Eye, Shield } from 'lucide-react';

export default function CookiesPage() {
  const cookieTypes = [
    {
      type: 'Cookies esențiale',
      icon: Shield,
      description: 'Necesare pentru funcționarea de bază a site-ului',
      examples: [
        'Cookie-uri de sesiune pentru autentificare',
        'Preferințe de limbă și regiune',
        'Coș de cumpărături și preferințe utilizator',
        'Setări de securitate și protecție CSRF'
      ],
      required: true,
      color: 'bg-red-100 text-red-600'
    },
    {
      type: 'Cookies de performanță',
      icon: Settings,
      description: 'Ne ajută să îmbunătățim performanța site-ului',
      examples: [
        'Analize de trafic și comportament utilizator',
        'Monitorizarea timpilor de încărcare',
        'Detectarea erorilor și problemelor',
        'Optimizarea conținutului și funcționalităților'
      ],
      required: false,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'Cookies funcționale',
      icon: Cookie,
      description: 'Oferă funcționalități îmbunătățite și personalizare',
      examples: [
        'Preferințe de afișare personalizate',
        'Integrări cu rețele sociale',
        'Widget-uri și conținut interactiv',
        'Funcții de chat și suport live'
      ],
      required: false,
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'Cookies de marketing',
      icon: Eye,
      description: 'Folosite pentru publicitate personalizată',
      examples: [
        'Urmărirea comportamentului pentru reclame',
        'Retargeting și remarketing',
        'Măsurarea eficacității campaniilor',
        'Profilarea pentru publicitate personalizată'
      ],
      required: false,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-700">🍪 Politica Cookies</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Politica de utilizare a Cookie-urilor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Această pagină explică ce sunt cookie-urile, cum le folosim pe MeseriiRO
            și cum poți controla preferințele tale de cookie-uri.
          </p>
        </div>

        {/* What are cookies */}
        <div className="mb-16">
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900 flex items-center">
                <Cookie className="h-6 w-6 mr-3" />
                Ce sunt cookie-urile?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 leading-relaxed">
                Cookie-urile sunt fișiere mici de text care se stochează pe dispozitivul tău
                atunci când vizitezi un site web. Ele ajută site-ul să-și amintească
                informații despre vizita ta, cum ar fi limba preferată și alte setări.
                Acest lucru poate face următoarea vizită mai ușoară și site-ul mai util pentru tine.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cookie Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Tipuri de cookie-uri pe care le folosim
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {cookieTypes.map((cookieType) => {
              const IconComponent = cookieType.icon;
              return (
                <Card key={cookieType.type} className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-lg ${cookieType.color} flex items-center justify-center mr-4`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{cookieType.type}</CardTitle>
                      </div>
                      {cookieType.required ? (
                        <Badge className="bg-red-100 text-red-700">Obligatoriu</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-700">Opțional</Badge>
                      )}
                    </div>
                    <CardDescription>{cookieType.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3">Exemple:</h4>
                    <ul className="space-y-2">
                      {cookieType.examples.map((example, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Third-party cookies */}
        <div className="mb-16">
          <Card className="bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-900">
                Cookie-uri de la terțe părți
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800 mb-4">
                MeseriiRO folosește și servicii de la terțe părți care pot seta cookie-uri
                proprii pe dispozitivul tău:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Google Analytics</h4>
                  <p className="text-sm text-yellow-800">
                    Pentru analiza traficului și îmbunătățirea experienței utilizatorului
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Rețele sociale</h4>
                  <p className="text-sm text-yellow-800">
                    Pentru integrări cu Facebook, Twitter și alte platforme
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cookie Management */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Cum poți gestiona cookie-urile
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-3 text-blue-600" />
                  Setări browser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Majoritatea browserelor îți permit să controlezi cookie-urile prin setări:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Dezactivarea cookie-urilor pentru anumite site-uri</li>
                  <li>• Ștergerea cookie-urilor existente</li>
                  <li>• Setarea de alerte când se primesc cookie-uri</li>
                  <li>• Blocarea cookie-urilor de la terțe părți</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-green-600" />
                  Preferințe pe MeseriiRO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Poți gestiona preferințele de cookie-uri direct pe site-ul nostru:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Centrul de preferințe cookies</li>
                  <li>• Acceptarea selectivă pe categorii</li>
                  <li>• Modificarea setărilor oricând</li>
                  <li>• Informații detaliate pentru fiecare tip</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Updates */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Actualizări ale politicii
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Această politică de cookie-uri poate fi actualizată periodic pentru a
            reflecta modificările în utilizarea cookie-urilor sau din motive legale.
            Te vom informa despre schimbări semnificative.
          </p>
          <div className="text-sm text-gray-500">
            Ultima actualizare: 15 August 2025
          </div>
        </div>
      </div>
    </div>
  );
}
