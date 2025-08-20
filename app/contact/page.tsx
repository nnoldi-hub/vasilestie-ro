'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulăm trimiterea formularului
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      details: '+40 74 017 3581',
      description: 'Luni - Vineri: 09:00 - 18:00',
      badge: 'Suport rapid',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@meserii.ro',
      description: 'Răspundem în maximum 24 ore',
      badge: 'Email oficial',
    },
    {
      icon: MapPin,
      title: 'Adresa',
      details: 'Str. Slt. Petre Ionel, nr. 205, Branesti',
      description: 'Ilfov, România, 077030',
      badge: 'Sediu central',
    },
    {
      icon: Clock,
      title: 'Program',
      details: 'Luni - Vineri: 09:00 - 18:00',
      description: 'Sâmbătă: 10:00 - 14:00',
      badge: 'Disponibili',
    },
  ];

  const categories = [
    { value: '', label: 'Alege categoria' },
    { value: 'suport-tehnic', label: 'Suport tehnic' },
    { value: 'cont-meseriasi', label: 'Cont meseriași' },
    { value: 'plati', label: 'Plăți și facturare' },
    { value: 'feedback', label: 'Feedback și sugestii' },
    { value: 'partnership', label: 'Parteneriat' },
    { value: 'presa', label: 'Media și presă' },
    { value: 'altele', label: 'Altele' },
  ];

  const faqItems = [
    {
      question: 'Cum pot deveni meseriași pe platformă?',
      answer: 'Poți să te înregistrezi accesând secțiunea "Devino Meseriași" și completând formularul de aplicație.',
    },
    {
      question: 'Care este comisionul pentru meseriași?',
      answer: 'Comisionul variază în funcție de tipul serviciului și planul ales. Detaliile complete sunt disponibile în secțiunea Prețuri.',
    },
    {
      question: 'Cum funcționează plățile?',
      answer: 'Plățile se procesează automat prin platforma noastră sigură. Meseriașii primesc banii după confirmarea finalizării proiectului.',
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Mesaj trimis cu succes!
          </h1>
          <p className="text-gray-600 mb-6">
            Îți mulțumim pentru mesaj. Echipa noastră îți va răspunde în cel mai scurt timp possible.
          </p>
          <Button onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: '',
              category: '',
            });
          }}>
            Trimite alt mesaj
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactează-ne
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Suntem aici să te ajutăm. Trimite-ne un mesaj și îți vom răspunde cât mai curând!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {info.badge}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-900 font-medium mb-1">
                    {info.details}
                  </p>
                  <p className="text-sm text-gray-600">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & FAQ */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Trimite-ne un mesaj
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nume complet *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ion Popescu"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ion@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subiect *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subiectul mesajului tău"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesaj *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Descrie în detaliu problema sau întrebarea ta..."
                      rows={6}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Se trimite...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Trimite mesajul
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Întrebări frecvente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <h4 className="font-medium text-gray-900 mb-3">
                          {item.question}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Support */}
              <Card className="mt-6">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Ai nevoie de suport urgent?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Pentru probleme urgente, ne poți suna direct.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Sună acum: +40 21 123 4567
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
