'use client';

import { FileText, Calendar, Shield, Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TermeniPage() {
  const lastUpdated = "19 August 2025";

  const sections = [
    {
      id: "1",
      title: "Definiții și interpretare",
      content: [
        "În acești Termeni și Condiții, următorii termeni au următoarele înțelesuri:",
        "• **Mesteras.ro** - platforma online operată de SC Mesteras.ro SRL, prin intermediul căreia se oferă servicii de conectare între clienți și meseriași.",
        "• **Utilizator** - orice persoană fizică sau juridică care accesează și utilizează platforma Mesteras.ro.",
        "• **Client** - utilizatorul care caută și rezervă servicii prin intermediul platformei.",
        "• **Meseriași** - profesioniștii care oferă servicii prin intermediul platformei.",
        "• **Servicii** - activitățile profesionale oferite de meseriași prin intermediul platformei.",
        "• **Cont** - contul de utilizator creat pe platformă pentru accesarea serviciilor."
      ]
    },
    {
      id: "2",
      title: "Acceptarea termenilor",
      content: [
        "Prin accesarea și utilizarea platformei Mesteras.ro, declarați că acceptați în totalitate acești Termeni și Condiții.",
        "Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați platforma.",
        "Ne rezervăm dreptul de a modifica acești termeni în orice moment, iar modificările vor fi comunicate utilizatorilor prin email sau notificare pe platformă.",
        "Continuarea utilizării platformei după modificările aduse termenilor constituie acceptarea acestora."
      ]
    },
    {
      id: "3",
      title: "Înregistrarea și contul de utilizator",
      content: [
        "Pentru a utiliza anumite funcționalități ale platformei, trebuie să vă creați un cont de utilizator.",
        "Sunteți responsabil pentru menținerea confidențialității datelor de acces ale contului dumneavoastră.",
        "Sunteți responsabil pentru toate activitățile care au loc prin intermediul contului dumneavoastră.",
        "Trebuie să furnizați informații corecte, complete și actualizate în timpul procesului de înregistrare.",
        "Ne rezervăm dreptul de a suspenda sau închide conturile care încalcă acești termeni."
      ]
    },
    {
      id: "4",
      title: "Serviciile platformei",
      content: [
        "Mesteras.ro facilitează conectarea între clienți și meseriași, dar nu prestează direct serviciile oferite de meseriași.",
        "Nu garantăm calitatea, siguranța sau legalitatea serviciilor oferite de meseriași.",
        "Relațiile contractuale pentru servicii se stabilesc direct între client și meseriași.",
        "Platforma poate include funcționalități de căutare, comunicare, rezervare și plăți.",
        "Ne rezervăm dreptul de a modifica sau întrerupe anumite servicii cu o notificare prealabilă."
      ]
    },
    {
      id: "5",
      title: "Obligațiile utilizatorilor",
      content: [
        "**Pentru toți utilizatorii:**",
        "• Să utilizeze platforma în conformitate cu legea și acești termeni",
        "• Să nu transmită conținut ilegal, ofensator sau dăunător",
        "• Să nu încerce să afecteze securitatea sau funcționarea platformei",
        "• Să respecte drepturile celorlalți utilizatori",
        "",
        "**Pentru clienți:**",
        "• Să furnizeze informații corecte despre proiectele solicitate",
        "• Să comunice respectuos cu meseriaștii",
        "• Să efectueze plățile conform termenilor agreați",
        "",
        "**Pentru meseriași:**",
        "• Să dețină licențele și autorizațiile necesare pentru serviciile oferite",
        "• Să furnizeze servicii de calitate și în termenul convenit",
        "• Să respecte prețurile și condițiile anunțate"
      ]
    },
    {
      id: "6",
      title: "Plățile și taxele",
      content: [
        "Plățile pentru servicii se efectuează prin sistemul de plăți integrat al platformei sau direct către meseriași.",
        "Mesteras.ro poate percepe comisioane pentru facilitarea tranzacțiilor, conform tarifelor afișate.",
        "Toate prețurile afișate pe platformă includ TVA, unde este cazul.",
        "Rambursările se fac conform politicii de rambursare afișate pe platformă.",
        "Ne rezervăm dreptul de a modifica structura de taxe cu o notificare prealabilă de 30 de zile."
      ]
    },
    {
      id: "7",
      title: "Proprietatea intelectuală",
      content: [
        "Toate drepturile de proprietate intelectuală asupra platformei, inclusiv design, logo, text și cod, aparțin ȘtiuPeCineva.ro sau licențiatorilor săi.",
        "Utilizatorii acordă ȘtiuPeCineva.ro o licență neexclusivă de utilizare a conținutului încărcat pe platformă.",
        "Este interzisă reproducerea, distribuirea sau modificarea conținutului platformei fără acordul scris al ȘtiuPeCineva.ro.",
        "Utilizatorii sunt responsabili pentru respectarea drepturilor de proprietate intelectuală ale terților."
      ]
    },
    {
      id: "8",
      title: "Limitarea răspunderii",
      content: [
        "ȘtiuPeCineva.ro nu este responsabilă pentru calitatea, siguranța sau legalitatea serviciilor oferite de meseriași.",
        "Nu suntem responsabili pentru daunele directe, indirecte sau consecințiale rezultate din utilizarea platformei.",
        "Răspunderea noastră este limitată la valoarea taxelor plătite de utilizator pentru serviciile platformei.",
        "Nu garantăm disponibilitatea neîntreruptă a platformei și nu suntem responsabili pentru întreruperile temporare.",
        "Această limitare se aplică în măsura permisă de legislația în vigoare."
      ]
    },
    {
      id: "9",
      title: "Încetarea serviciilor",
      content: [
        "Puteți înceta utilizarea platformei în orice moment prin ștergerea contului.",
        "Ne rezervăm dreptul de a suspenda sau închide conturi care încalcă acești termeni.",
        "În cazul încetării serviciilor, obligațiile financiare rămân valabile.",
        "Anumite prevederi din acești termeni vor rămâne în vigoare și după încetarea serviciilor."
      ]
    },
    {
      id: "10",
      title: "Soluționarea disputelor",
      content: [
        "Orice dispută va fi soluționată prin negociere și mediare înainte de a recurge la instanțele judecătorești.",
        "Pentru disputele care nu pot fi rezolvate amiabil, sunt competente instanțele din București, România.",
        "Se aplică legea română pentru interpretarea și executarea acestor termeni.",
        "Platforma oferă un sistem intern de soluționare a disputelor pentru anumite tipuri de conflicte."
      ]
    },
    {
      id: "11",
      title: "Prevederi finale",
      content: [
        "Dacă oricare dintre prevederile acestor termeni devine nulă sau inaplicabilă, restul prevederilor rămân în vigoare.",
        "Acești termeni constituie întregul acord între utilizator și ȘtiuPeCineva.ro cu privire la utilizarea platformei.",
        "Orice modificări ale acestor termeni trebuie să fie făcute în scris și să fie semnate de ambele părți.",
        "Pentru întrebări privind acești termeni, ne puteți contacta la legal@mesteras.ro."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Termeni și Condiții
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Termenii și condițiile de utilizare a platformei ȘtiuPeCineva.ro
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-200">
              <Calendar className="w-4 h-4" />
              <span>Ultima actualizare: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Introducere
                    </h2>
                    <div className="text-gray-600 leading-relaxed space-y-4">
                      <p>
                        Bine ați venit pe ȘtiuPeCineva.ro! Acești Termeni și Condiții guvernează utilizarea platformei noastre 
                        și a serviciilor oferite. Vă rugăm să citiți cu atenție aceste prevederi înainte de a utiliza platforma.
                      </p>
                      <p>
                        Prin accesarea sau utilizarea platformei ȘtiuPeCineva.ro, sunteți de acord să respectați acești termeni 
                        în totalitate. Dacă nu sunteți de acord cu oricare dintre aceste prevederi, vă rugăm să nu utilizați platforma.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={section.id}>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {section.id}. {section.title}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      {section.content.map((paragraph, paragraphIndex) => (
                        <div key={paragraphIndex}>
                          {paragraph === "" ? (
                            <br />
                          ) : paragraph.startsWith("•") ? (
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-700 leading-relaxed"
                                 dangerouslySetInnerHTML={{
                                   __html: paragraph.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                 }}
                              />
                            </div>
                          ) : paragraph.startsWith("**") ? (
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3"
                                dangerouslySetInnerHTML={{
                                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '$1')
                                }}
                            />
                          ) : (
                            <p className="text-gray-700 leading-relaxed mb-4"
                               dangerouslySetInnerHTML={{
                                 __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                               }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Info */}
            <Card className="mt-12 border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Ai întrebări despre termenii și condițiile?
                </h3>
                <p className="text-gray-600 mb-6">
                  Dacă aveți întrebări sau nelămuriri referitoare la acești termeni și condiții, 
                  nu ezitați să ne contactați.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:legal@mesteras.ro"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Contactează departamentul juridic
                  </a>
                  <a 
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Contact general
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
