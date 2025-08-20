import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

export default function ConfidentialitateePage() {
  const sections = [
    {
      id: '1',
      title: 'Ce informații colectăm',
      content: `Colectăm următoarele tipuri de informații:
      
      • Informații personale: nume, adresă de email, număr de telefon, adresă
      • Informații profesionale: specializarea, experiența, certificările
      • Informații de utilizare: cum folosești platforma, paginile vizitate
      • Informații tehnice: adresa IP, tipul browserului, dispozitivul folosit`
    },
    {
      id: '2', 
      title: 'Cum folosim informațiile tale',
      content: `Folosim informațiile colectate pentru:
      
      • Crearea și gestionarea contului tău
      • Conectarea ta cu clienți potențiali sau meseriași
      • Îmbunătățirea serviciilor noastre
      • Comunicarea cu tine despre actualizări și oportunități
      • Asigurarea siguranței și securității platformei`
    },
    {
      id: '3',
      title: 'Cum protejăm informațiile tale',
      content: `Implementăm măsuri de securitate robuste:
      
      • Criptarea datelor în transmisie și la stocare
      • Accesul restricționat la informațiile personale
      • Monitorizarea regulată pentru activități suspecte
      • Backup-uri securizate și planuri de recuperare
      • Actualizări regulare de securitate`
    },
    {
      id: '4',
      title: 'Partajarea informațiilor',
      content: `Nu vindem informațiile tale personale. Le partajăm doar:
      
      • Cu meseriașii sau clienții pentru realizarea serviciilor
      • Cu furnizorii de servicii care ne ajută să operăm platforma
      • Când este necesar legal sau pentru protejarea drepturilor
      • Cu acordul tău explicit pentru alte scopuri`
    },
    {
      id: '5',
      title: 'Drepturile tale',
      content: `Ai următoarele drepturi:
      
      • Accesul la informațiile personale stocate
      • Corectarea informațiilor inexacte
      • Ștergerea contului și a datelor asociate
      • Restricționarea procesării în anumite circumstanțe
      • Portabilitatea datelor către alte servicii`
    },
    {
      id: '6',
      title: 'Cookies și tehnologii similare',
      content: `Folosim cookies pentru:
      
      • Să îți ținem minte preferințele
      • Să analizăm traficul și comportamentul utilizatorilor
      • Să îmbunătățim experiența de utilizare
      • Să personalizăm conținutul și reclamele
      
      Poți gestiona setările de cookies din browserul tău.`
    },
    {
      id: '7',
      title: 'Retenția datelor',
      content: `Păstrăm informațiile tale:
      
      • Cât timp îți menții contul activ
      • Pentru o perioadă rezonabilă după închiderea contului
      • Conform obligațiilor legale de păstrare
      • Pentru rezolvarea disputelor și aplicarea acordurilor
      
      Poți solicita ștergerea anticipată a datelor în anumite condiții.`
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700">🔒 Confidențialitate</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Politica de Confidențialitate
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 mb-4">
              La MeseriiRO, confidențialitatea și securitatea datelor tale sunt prioritatea noastră.
              Această politică explică cum colectăm, folosim și protejăm informațiile tale personale.
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <FileText className="h-4 w-4 mr-2" />
              Ultima actualizare: 15 August 2025
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Rezumatul politicii noastre
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Protecție maximă</h3>
              <p className="text-blue-800 text-sm">
                Folosim tehnologii avansate pentru protejarea datelor tale
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Transparență totală</h3>
              <p className="text-blue-800 text-sm">
                Îți explicăm clar ce date colectăm și cum le folosim
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Control complet</h3>
              <p className="text-blue-800 text-sm">
                Tu decizi ce informații partajezi și cu cine
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <Card key={section.id} className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                    {section.id}
                  </span>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Întrebări despre confidențialitate?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Dacă ai întrebări despre această politică de confidențialitate sau
            despre cum îți gestionăm datele, nu ezita să ne contactezi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">
                privacy@meserii.ro
              </span>
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">
                +40 21 123 4567
              </span>
            </div>
          </div>
        </div>

        {/* GDPR Compliance */}
        <div className="text-center mt-12">
          <Badge className="bg-green-100 text-green-700 mb-4">
            ✓ Conform GDPR
          </Badge>
          <p className="text-gray-500 text-sm">
            MeseriiRO respectă integral Regulamentul General privind Protecția Datelor (GDPR)
            și legislația română în vigoare privind protecția datelor cu caracter personal.
          </p>
        </div>
      </div>
    </div>
  );
}
