'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  Clock,
  CreditCard,
  Smartphone,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  TreePine,
  Sparkles,
} from 'lucide-react';

export default function BecomeCraftsmanPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    category: '',
    experience: '',
    description: '',
    hourlyRate: '',
    hasInsurance: false,
    hasLicense: false,
    agreeToTerms: false,
  });

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Funcție pentru scroll către formular
  const scrollToRegistration = () => {
    setShowRegistrationForm(true);
    setTimeout(() => {
      const formElement = document.getElementById('registration-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Funcție pentru scroll către secțiunea "Cum funcționează"
  const scrollToHowItWorks = () => {
    const howItWorksElement = document.getElementById('how-it-works');
    if (howItWorksElement) {
      howItWorksElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const benefits = [
    {
      icon: Users,
      title: 'Acces la mii de clienți',
      description: 'Conectează-te cu peste 12,000 de clienți activi care caută serviciile tale.',
    },
    {
      icon: TrendingUp,
      title: 'Creșterea veniturilor',
      description: 'Meseriașii noștri câștigă în medie cu 40% mai mult decât prin metodele tradiționale.',
    },
    {
      icon: Shield,
      title: 'Plăți garantate',
      description: 'Sistem de plăți securizat cu protecție împotriva neplăților.',
    },
    {
      icon: Clock,
      title: 'Program flexibil',
      description: 'Lucrezi când vrei tu. Controlezi complet programul și disponibilitatea.',
    },
    {
      icon: CreditCard,
      title: 'Fără taxe ascunse',
      description: 'Comision transparent de doar 8% din valoarea serviciului.',
    },
    {
      icon: Smartphone,
      title: 'Aplicație mobilă',
      description: 'Gestionează comenzile, comunică cu clienții și primește plăți din aplicație.',
    },
  ];

  const categories = [
    { id: 'electrician', name: 'Electrician', icon: Zap },
    { id: 'instalator', name: 'Instalator', icon: Wrench },
    { id: 'constructor', name: 'Constructor', icon: Hammer },
    { id: 'zugrav', name: 'Zugrav', icon: Paintbrush },
    { id: 'gradinar', name: 'Grădinar', icon: TreePine },
    { id: 'curatenie', name: 'Curățenie', icon: Sparkles },
  ];

  const steps = [
    {
      step: 1,
      title: 'Înregistrează-te',
      description: 'Completează formularul cu datele tale și serviciile oferite.',
    },
    {
      step: 2,
      title: 'Verificare',
      description: 'Echipa noastră verifică documentele și experiența ta.',
    },
    {
      step: 3,
      title: 'Profil activ',
      description: 'Profilul tău devine vizibil și poți primi primele comenzi.',
    },
    {
      step: 4,
      title: 'Începe să câștigi',
      description: 'Primești notificări pentru comenzi și începi să lucrezi.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200">
                🚀 Alătură-te celor 2,500+ meseriași
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                Devino meseriași pe{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ȘtiuPeCineva.ro
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transformă-ți pasiunea într-o afacere profitabilă. Conectează-te cu mii de clienți 
                și câștigă mai mult lucrând la proiecte care îți plac.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                  onClick={scrollToRegistration}
                >
                  Înregistrează-te gratuit
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8"
                  onClick={scrollToHowItWorks}
                >
                  Vezi cum funcționează
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
                  <div className="text-gray-600">Meseriași activi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
                  <div className="text-gray-600">Servicii completate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">4.9★</div>
                  <div className="text-gray-600">Rating mediu</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                De ce să alegi ȘtiuPeCineva.ro?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Oferim cele mai bune condiții pentru meseriași și te ajutăm să îți dezvolți afacerea.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6">
                      <benefit.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8"
                onClick={scrollToRegistration}
              >
                Începe acum - Gratuit
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Cum funcționează?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                În doar 4 pași simpli, poți începe să câștigi bani cu serviciile tale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.step} className="relative text-center">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0" />
                  )}
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        {showRegistrationForm && (
        <section id="registration-form" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Înregistrează-te acum
                </h2>
                <p className="text-lg text-gray-600">
                  Completează formularul și începe să câștigi în mai puțin de 24 de ore.
                </p>
              </div>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">Informații personale</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prenume *
                        </label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Prenumele tău"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nume *
                        </label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Numele tău"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="email@exemplu.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+40 123 456 789"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Orașul *
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="București"
                        required
                      />
                    </div>

                    {/* Professional Info */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Informații profesionale
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categoria principală *
                          </label>
                          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Alege categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experiența (ani) *
                          </label>
                          <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Ani de experiență" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1">0-1 ani</SelectItem>
                              <SelectItem value="2-5">2-5 ani</SelectItem>
                              <SelectItem value="6-10">6-10 ani</SelectItem>
                              <SelectItem value="10+">Peste 10 ani</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tarif orar (RON) *
                        </label>
                        <Input
                          type="number"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                          placeholder="80"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrierea serviciilor *
                        </label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Descrie serviciile pe care le oferi, experiența ta și ce te diferențiază..."
                          rows={4}
                          required
                        />
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Certificări și asigurări
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="insurance"
                            checked={formData.hasInsurance}
                            onCheckedChange={(checked) => handleInputChange('hasInsurance', checked as boolean)}
                          />
                          <label htmlFor="insurance" className="text-sm text-gray-700">
                            Am asigurare de răspundere civilă profesională
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="license"
                            checked={formData.hasLicense}
                            onCheckedChange={(checked) => handleInputChange('hasLicense', checked as boolean)}
                          />
                          <label htmlFor="license" className="text-sm text-gray-700">
                            Am autorizații/licențe necesare pentru activitate
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="border-t pt-6">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                          Sunt de acord cu{' '}
                          <a href="/termeni" className="text-blue-600 hover:underline">
                            Termenii și condițiile
                          </a>{' '}
                          și{' '}
                          <a href="/confidentialitate" className="text-blue-600 hover:underline">
                            Politica de confidențialitate
                          </a>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
                      disabled={!formData.agreeToTerms}
                    >
                      Înregistrează-te gratuit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        )}

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Povești de succes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Vezi cum meseriașii din comunitatea noastră și-au transformat afacerile.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Mihai Popescu',
                  profession: 'Electrician',
                  story: 'În primul an pe ȘtiuPeCineva.ro am reușit să îmi dublez veniturile și să îmi construiesc o echipă de 3 persoane.',
                  earnings: '+150% venituri',
                  rating: 4.9,
                  jobs: 156,
                },
                {
                  name: 'Ana Georgescu',
                  profession: 'Designer Interior',
                  story: 'Platforma mi-a oferit acces la proiecte mari pe care nu le-aș fi găsit altfel. Acum lucrez cu clienți din toată țara.',
                  earnings: '+200% proiecte',
                  rating: 4.8,
                  jobs: 94,
                },
                {
                  name: 'Radu Ionescu',
                  profession: 'Instalator',
                  story: 'Sistemul de recenzii m-a ajutat să îmi construiesc reputația. Acum am comenzi rezervate pentru următoarele 2 luni.',
                  earnings: '+180% comenzi',
                  rating: 4.9,
                  jobs: 278,
                },
              ].map((story, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {story.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.profession}</p>
                    </div>
                    
                    <p className="text-gray-700 mb-6 italic">
                      &ldquo;{story.story}&rdquo;
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Creștere:</span>
                        <span className="font-semibold text-green-600">{story.earnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold">{story.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lucrări:</span>
                        <span className="font-semibold">{story.jobs}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }