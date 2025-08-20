'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Phone, Mail, Clock, HelpCircle, FileText } from 'lucide-react';
import { ChatLive } from '@/components/chat/chat-live';

export default function SuportPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const supportOptions = [
    {
      title: 'Chat Live',
      description: 'Răspuns imediat pentru întrebări urgente',
      icon: MessageCircle,
      availability: 'Luni-Vineri, 9:00-18:00',
      color: 'bg-blue-100 text-blue-600',
      action: () => setIsChatOpen(true)
    },
    {
      title: 'Suport Telefonic',
      description: 'Vorbește direct cu echipa noastră',
      icon: Phone,
      availability: '+40 74 017 3581',
      color: 'bg-green-100 text-green-600',
      action: () => window.open('tel:+40740173581')
    },
    {
      title: 'Email Suport',
      description: 'Pentru probleme complexe și detaliate',
      icon: Mail,
      availability: 'suport@vasilestie.ro',
      color: 'bg-purple-100 text-purple-600',
      action: () => window.open('mailto:suport@vasilestie.ro')
    }
  ];

  const faqItems = [
    {
      question: 'Cum îmi creez profilul de meseriași?',
      answer: 'Accesează pagina "Devino Meseriași", completează formularul de înregistrare cu datele tale și alege categoria de servicii. Profilul va fi activat în max 24 de ore.'
    },
    {
      question: 'Cât costă să fiu pe platformă?',
      answer: 'Planul de bază este complet gratuit. Oferim și planuri premium cu funcționalități avansate, începând de la 49 lei/lună.'
    },
    {
      question: 'Cum primesc plățile de la clienți?',
      answer: 'Plățile se fac direct între tine și client. Mesteras.ro nu ia comision din tranzacțiile din planul gratuit.'
    },
    {
      question: 'Pot să îmi modific prețurile după înregistrare?',
      answer: 'Da, poți actualiza prețurile și serviciile oricând din panoul tău de control.'
    },
    {
      question: 'Ce fac dacă am o problemă cu un client?',
      answer: 'Contactează echipa de suport imediat. Avem proceduri de mediere și protecție pentru meseriași.'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700">🤝 Suntem aici pentru tine</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Suport pentru meseriași
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Echipa noastră de suport este disponibilă să te ajute cu orice întrebare
            sau problemă. Alege modul de contact preferat.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card key={option.title} className="text-center">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto rounded-full ${option.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 mb-4">
                    {option.availability}
                  </div>
                  <Button 
                    className="w-full"
                    onClick={option.action}
                  >
                    Contactează
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <HelpCircle className="h-6 w-6 mr-3 text-blue-600" />
              Întrebări frecvente
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <FileText className="h-6 w-6 mr-3 text-blue-600" />
              Trimite-ne un mesaj
            </h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Numele tău
                    </label>
                    <Input
                      id="name"
                      placeholder="Introdu numele complet"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="adresa@email.com"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subiectul mesajului
                    </label>
                    <Input
                      id="subject"
                      placeholder="Despre ce este mesajul"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajul tău
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Descrie problema sau întrebarea ta în detaliu..."
                      className="w-full h-32"
                    />
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Trimite mesajul
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
          <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Timp de răspuns garantat
          </h3>
          <p className="text-gray-600">
            Răspundem în maximum 2 ore în timpul programului de lucru
            și în maximum 24 de ore în weekend.
          </p>
        </div>
      </div>

      {/* Chat Live Component */}
      <ChatLive
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        isMinimized={isChatMinimized}
        onToggleMinimize={() => {
          if (isChatMinimized) {
            setIsChatMinimized(false);
            setIsChatOpen(true);
          } else {
            setIsChatMinimized(true);
            setIsChatOpen(false);
          }
        }}
      />
    </div>
  );
}
