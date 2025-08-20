import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertTriangle, Phone, FileText, Lock, Users, Eye } from 'lucide-react';

export default function SigurantaPage() {
  const safetyMeasures = [
    {
      icon: Shield,
      title: 'Verificarea meseriaților',
      description: 'Proces de verificare în 3 etape',
      details: [
        'Verificarea identității și a documentelor',
        'Controlul certificărilor și autorizațiilor',
        'Verificarea referințelor și experienței',
        'Background check pentru antecedente penale'
      ],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Lock,
      title: 'Protecția datelor',
      description: 'Securitatea informațiilor personale',
      details: [
        'Criptarea datelor cu SSL/TLS',
        'Stocarea securizată în cloud-uri verificate',
        'Acces restricționat la informații sensibile',
        'Conformitate GDPR și legislația română'
      ],
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Eye,
      title: 'Monitorizarea activității',
      description: 'Supravegherea constantă a platformei',
      details: [
        'Detectarea automată a comportamentului suspect',
        'Raportarea rapidă a problemelor',
        'Analiza feedback-ului clienților',
        'Echipă de moderatori 24/7'
      ],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Users,
      title: 'Comunitatea sigură',
      description: 'Mediu de încredere pentru toți',
      details: [
        'Sistem de rating și recenzii verificate',
        'Politici stricte împotriva abuzurilor',
        'Mecanisme de raportare rapidă',
        'Educarea utilizatorilor privind siguranța'
      ],
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const safetyTips = [
    {
      category: 'Pentru clienți',
      tips: [
        'Verifică întotdeauna profilul și recenziile meseriaților',
        'Cere o evaluare detaliată înainte de a începe lucrul',
        'Nu plăti niciodată întreaga sumă în avans',
        'Documentează toate acordurile în scris',
        'Raportează orice comportament suspect',
        'Păstrează comunicarea pe platformă pentru siguranță'
      ],
      icon: '🏠',
      color: 'bg-blue-50'
    },
    {
      category: 'Pentru meseriași',
      tips: [
        'Completează-ți profilul cu informații reale și verificabile',
        'Încarcă certificări și licențe valide',
        'Comunică transparent cu clienții',
        'Respectă termenii și condițiile platformei',
        'Nu cere informații personale inutile',
        'Raportează clienți sau situații problematice'
      ],
      icon: '🔧',
      color: 'bg-green-50'
    }
  ];

  const emergencyContacts = [
    {
      title: 'Suport urgent',
      description: 'Pentru probleme de siguranță immediate',
      contact: '+40 21 123 4567',
      email: 'urgent@mesteras.ro',
      availability: '24/7',
      icon: Phone
    },
    {
      title: 'Raportare abuzuri',
      description: 'Pentru raportarea comportamentului inadecvat',
      contact: '+40 21 123 4568', 
      email: 'abuzuri@mesteras.ro',
      availability: 'Luni-Vineri, 9:00-18:00',
      icon: AlertTriangle
    },
    {
      title: 'Protecția datelor',
      description: 'Pentru probleme legate de confidențialitate',
      contact: '+40 21 123 4569',
      email: 'privacy@mesteras.ro',
      availability: 'Luni-Vineri, 9:00-18:00',
      icon: Shield
    }
  ];

  const securityFeatures = [
    {
      feature: 'Autentificare în doi pași (2FA)',
      description: 'Protecție suplimentară pentru contul tău',
      status: 'Disponibil'
    },
    {
      feature: 'Notificări de securitate',
      description: 'Alerte pentru activități suspecte',
      status: 'Activ'
    },
    {
      feature: 'Backup automat',
      description: 'Salvarea automată a datelor importante',
      status: 'Zilnic'
    },
    {
      feature: 'Auditare regulată',
      description: 'Verificări periodice de securitate',
      status: 'Lunar'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-100 text-red-700">🛡️ Siguranță și securitate</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Siguranța ta este prioritatea noastră
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ȘtiuPeCineva.ro implementează măsuri stricte de siguranță pentru a proteja
            atât clienții, cât și meseriașii. Află cum te protejăm și cum poți să te protejezi.
          </p>
        </div>

        {/* Trust Badge */}
        <div className="bg-green-50 rounded-2xl p-8 mb-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-4">
            Platformă verificată și sigură
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">SSL Certificat</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">Conform GDPR</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">Verificări zilnice</span>
            </div>
          </div>
        </div>

        {/* Safety Measures */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Măsurile noastre de siguranță
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {safetyMeasures.map((measure) => {
              const IconComponent = measure.icon;
              return (
                <Card key={measure.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg ${measure.color} flex items-center justify-center mr-4`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{measure.title}</CardTitle>
                        <CardDescription>{measure.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {measure.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Sfaturi pentru utilizarea sigură
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {safetyTips.map((tipGroup, index) => (
              <Card key={index} className={tipGroup.color}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <span className="text-3xl mr-3">{tipGroup.icon}</span>
                    {tipGroup.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tipGroup.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Contact pentru situații de urgență
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact) => {
              const IconComponent = contact.icon;
              return (
                <Card key={contact.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{contact.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="font-medium text-blue-600">{contact.contact}</div>
                      <div className="text-blue-600">{contact.email}</div>
                      <div className="text-gray-500">{contact.availability}</div>
                    </div>
                    <Button size="sm" className="mt-4 w-full">
                      Contactează
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Funcții de securitate active
          </h2>
          <div className="max-w-4xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.feature}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {feature.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Issue */}
        <div className="bg-red-50 rounded-2xl p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-4">
            Raportează o problemă de siguranță
          </h2>
          <p className="text-red-800 mb-6 max-w-2xl mx-auto">
            Dacă ai întâmpinat o problemă de siguranță sau ai observat un comportament
            suspect pe platformă, nu ezita să ne contactezi imediat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Raportează acum
            </Button>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <FileText className="h-4 w-4 mr-2" />
              Ghid raportare
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
