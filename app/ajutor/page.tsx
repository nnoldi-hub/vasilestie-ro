'use client';

import { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  CreditCard,
  Shield,
  FileText,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AjutorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('');

  const categories = [
    {
      id: 'cont',
      icon: User,
      title: 'Cont și profil',
      description: 'Gestionarea contului, setări profil, autentificare',
      articles: 12,
      color: 'blue',
    },
    {
      id: 'servicii',
      icon: Settings,
      title: 'Servicii și rezervări',
      description: 'Căutare servicii, rezervări, anulări',
      articles: 8,
      color: 'green',
    },
    {
      id: 'plati',
      icon: CreditCard,
      title: 'Plăți și facturare',
      description: 'Metode de plată, facturi, rambursări',
      articles: 6,
      color: 'yellow',
    },
    {
      id: 'siguranta',
      icon: Shield,
      title: 'Siguranță și încredere',
      description: 'Verificări, politici, reclamații',
      articles: 5,
      color: 'red',
    },
    {
      id: 'mesterias',
      icon: FileText,
      title: 'Pentru meseriași',
      description: 'Înregistrare, comisioane, instrumente',
      articles: 15,
      color: 'purple',
    },
    {
      id: 'suport',
      icon: Headphones,
      title: 'Suport tehnic',
      description: 'Probleme tehnice, aplicație, site',
      articles: 7,
      color: 'indigo',
    },
  ];

  const faqData = [
    {
      category: 'cont',
      questions: [
        {
          question: 'Cum îmi creez un cont?',
          answer: 'Poți să îți creezi un cont accesând butonul "Înregistrează-te" din header. Completează formularul cu datele tale și confirmă adresa de email.',
        },
        {
          question: 'Am uitat parola. Cum o resetez?',
          answer: 'Accesează pagina de login și apasă pe "Am uitat parola". Vei primi un email cu instrucțiunile pentru resetarea parolei.',
        },
        {
          question: 'Cum îmi schimb informațiile din profil?',
          answer: 'Mergi în secțiunea "Profilul meu" din contul tău și editează informațiile dorite. Nu uita să salvezi modificările.',
        },
      ],
    },
    {
      category: 'servicii',
      questions: [
        {
          question: 'Cum caut un meseriași?',
          answer: 'Folosește bara de căutare din pagina principală sau accesează secțiunea "Servicii" pentru a naviga pe categorii.',
        },
        {
          question: 'Cum fac o rezervare?',
          answer: 'După ce găsești meseriaștiul potrivit, apasă pe "Contactează" și completează detaliile proiectului tău.',
        },
        {
          question: 'Pot anula o rezervare?',
          answer: 'Da, poți anula o rezervare din secțiunea "Rezervările mele" cu cel puțin 24 ore înainte de data programată.',
        },
      ],
    },
    {
      category: 'plati',
      questions: [
        {
          question: 'Ce metode de plată acceptați?',
          answer: 'Acceptăm carduri de credit/debit, transfer bancar și plata cash la finalizarea lucrării.',
        },
        {
          question: 'Când se efectuează plata?',
          answer: 'Plata se efectuează după confirmarea finalizării lucrării de către ambele părți.',
        },
        {
          question: 'Cum primesc factura?',
          answer: 'Factura se generează automat în contul tău după finalizarea plății și poate fi descărcată oricând.',
        },
      ],
    },
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: 'Telefon',
      description: 'Sună-ne pentru suport imediat',
      contact: '+40 21 123 4567',
      availability: 'Luni-Vineri: 09:00-18:00',
      action: 'Sună acum',
    },
    {
      icon: MessageCircle,
      title: 'Chat live',
      description: 'Vorbește cu un agent live',
      contact: 'Chat disponibil',
      availability: 'Luni-Vineri: 09:00-18:00',
      action: 'Începe chat',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Trimite-ne un mesaj detaliat',
      contact: 'support@stiupecineva.ro',
      availability: 'Răspundem în 24 ore',
      action: 'Trimite email',
    },
  ];

  const filteredFAQ = faqData.filter(category => 
    !searchQuery || category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Centru de ajutor
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Găsește răspunsuri rapide la întrebările tale
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Caută în centrul de ajutor..."
                className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-blue-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${category.color}-100`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {category.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {category.articles} articole
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Întrebări frecvente
            </h2>
            
            <div className="space-y-8">
              {filteredFAQ.map((categoryData) => {
                const category = categories.find(c => c.id === categoryData.category);
                return (
                  <div key={categoryData.category}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                      {category && <category.icon className="w-6 h-6 text-blue-600" />}
                      {category?.title}
                    </h3>
                    
                    <div className="space-y-4">
                      {categoryData.questions
                        .filter(q => 
                          !searchQuery || 
                          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((qa, index) => (
                        <Card key={index}>
                          <CardContent className="p-0">
                            <button
                              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                              onClick={() => setExpandedCategory(
                                expandedCategory === `${categoryData.category}-${index}` 
                                  ? null 
                                  : `${categoryData.category}-${index}`
                              )}
                            >
                              <span className="font-medium text-gray-900 pr-4">
                                {qa.question}
                              </span>
                              {expandedCategory === `${categoryData.category}-${index}` ? (
                                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              )}
                            </button>
                            
                            {expandedCategory === `${categoryData.category}-${index}` && (
                              <div className="px-6 pb-6 pt-0 border-t">
                                <p className="text-gray-600 leading-relaxed">
                                  {qa.answer}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nu ai găsit răspunsul?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Echipa noastră de suport este aici să te ajute
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {option.description}
                    </p>
                    <p className="font-medium text-gray-900 mb-2">
                      {option.contact}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {option.availability}
                    </p>
                    <Button className="w-full">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
