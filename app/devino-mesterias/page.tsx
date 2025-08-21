'use client';

import { HowItWorksCraftsmen } from '@/components/sections/how-it-works-craftsmen';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function BecomeCraftsmanPage() {
  const benefits = [
    {
      icon: Star,
      title: 'Vizibilitate garantată',
      description: 'Profilul tău va fi vizibil clienților care caută serviciile tale',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Users,
      title: 'Contact direct cu clienții',
      description: 'Comunici direct cu clienții, fără intermediari sau restricții',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Fără comisioane din vânzări',
      description: 'Plătești doar abonamentul lunar, restul banilor îi păstrezi',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Shield,
      title: 'Badge de încredere',
      description: 'Profilul tău va avea badge de meseriași verificat și de încredere',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Meseriași parteneri' },
    { number: '12,000+', label: 'Clienți activi' },
    { number: '50,000+', label: 'Proiecte finalizate' },
    { number: '4.8/5', label: 'Rating mediu' }
  ];

  const testimonials = [
    {
      name: 'Vasile Ionescu',
      profession: 'Instalator sanitare',
      rating: 5,
      comment: 'De când sunt pe platformă primesc în medie 15-20 de cereri pe lună. Sistemul de abonament este mult mai transparent decât comisioanele.',
      avatar: '🔧'
    },
    {
      name: 'Maria Popescu',
      profession: 'Curățenie profesională',
      rating: 5,
      comment: 'Perfect! Nu mai plătesc comisioane din fiecare lucrare. Abonamentul de 50 RON/lună îmi aduce clienți în valoare de peste 3000 RON.',
      avatar: '🧹'
    },
    {
      name: 'Gheorghe Munteanu',
      profession: 'Constructor',
      rating: 5,
      comment: 'Platforma îmi oferă exact ce aveam nevoie - vizibilitate și acces direct la clienți serioși. Recomand cu încredere!',
      avatar: '🏗️'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-primary to-brand-primary/90 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Pentru Meseriași Profesioniști
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Devino meseriași partner pe VasileStie.ro
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Primește cereri directe de la clienți prin sistemul nostru de abonament - 
              <strong> fără comisioane din vânzările tale!</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100">
                Înregistrează-te acum
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-primary"
              >
                Vezi planurile de preț
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-brand-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              De ce să alegi VasileStie.ro?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferim cea mai transparentă și profitabilă platformă pentru meseriași din România
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${benefit.color} mb-6`}>
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <HowItWorksCraftsmen />

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ce spun meseriașii noștri parteneri
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Feedback real de la meseriășii care folosesc platforma noastră
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-2xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.profession}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Întrebări frecvente
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "Care este diferența față de alte platforme?",
                  a: "Spre deosebire de alte platforme care iau comisioane din fiecare vânzare (10-20%), noi folosim sistem de abonament fix lunar. Tu păstrezi 100% din banii câștigați de la clienți."
                },
                {
                  q: "Cum funcționează plata abonamentului?",
                  a: "Abonamentul se plătește lunar prin card bancar sau transfer. Poți să-ți anulezi abonamentul oricând, fără penalități."
                },
                {
                  q: "Ce se întâmplă dacă nu primesc cereri?",
                  a: "Oferim garanție: dacă în prima lună nu primești minimum 3 cereri relevante, îți returnăm abonamentul."
                },
                {
                  q: "Pot comunica direct cu clienții?",
                  a: "Da! După ce clientul te contactează prin platformă, puteți comunica direct (telefon, WhatsApp, email) și vă înțelegeți direct pentru preț și modalitate de plată."
                }
              ].map((faq, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Gata să începi să primești mai mulți clienți?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Înregistrează-te acum și începe să primești cereri de la clienți din zona ta
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100">
              Înregistrează-te acum - GRATUIT
            </Button>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5" />
              <span>Fără taxe de înregistrare</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-white/80">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>0800 123 456</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>meseriasi@vasilestie.ro</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Disponibil în toată România</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}