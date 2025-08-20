'use client';

import { useState, useEffect } from 'react';
import { Upload, CheckCircle, Clock, AlertCircle, User, FileText, Users, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DocumentStatus = 'not-uploaded' | 'uploaded' | 'approved' | 'rejected';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: DocumentStatus;
  required: boolean;
}

export default function VerificarePage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isApproved, setIsApproved] = useState(false); // Mock status - în realitate vine din API
  
  // Date pentru formularul de înregistrare
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: '',
    location: '',
    experience: '',
    description: '',
  });

  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'identity',
      title: 'Verificarea documentelor',
      description: 'Încarcă copia actului de identitate (CI/Pașaport)',
      icon: <User className="h-5 w-5" />,
      status: 'not-uploaded',
      required: true,
    },
    {
      id: 'experience',
      title: 'Validarea experienței',
      description: 'Documente care atestă experiența (diplome, certificate)',
      icon: <FileText className="h-5 w-5" />,
      status: 'not-uploaded',
      required: true,
    },
    {
      id: 'references',
      title: 'Verificarea referințelor',
      description: 'Contact persoane de referință (foști clienți/angajatori)',
      icon: <Users className="h-5 w-5" />,
      status: 'not-uploaded',
      required: false,
    },
    {
      id: 'portfolio',
      title: 'Aprobare finală',
      description: 'Poze cu lucrări anterioare (portfolio)',
      icon: <Briefcase className="h-5 w-5" />,
      status: 'uploaded',
      required: false,
    },
  ]);

  const categories = [
    { id: 'electrician', label: 'Electrician' },
    { id: 'plumber', label: 'Instalator' },
    { id: 'carpenter', label: 'Dulgherie' },
    { id: 'painter', label: 'Zugrav' },
    { id: 'designer', label: 'Designer' },
    { id: 'mechanic', label: 'Mecanic' },
  ];

  const locations = ['București', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova', 'Brașov', 'Galați'];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileUpload = (stepId: string) => {
    setVerificationSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status: 'uploaded' }
        : step
    ));
  };

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'not-uploaded':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'uploaded':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
    const config = {
      'not-uploaded': { label: 'Neîncărcat', variant: 'secondary' as const },
      'uploaded': { label: 'În verificare', variant: 'default' as const },
      'approved': { label: 'Aprobat', variant: 'default' as const },
      'rejected': { label: 'Respins', variant: 'destructive' as const },
    };

    const { label, variant } = config[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {label}
      </Badge>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aici ar fi logica pentru trimiterea cererii
    alert('Cererea a fost trimisă cu succes! Vei primi un email de confirmare.');
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            2
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Verificare și aprobare
            </h1>
            <p className="text-blue-600 font-semibold">24-48 ore</p>
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Verificăm documentele și experiența ta pentru a ne asigura de calitatea serviciilor.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Formular de înregistrare */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informații personale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Prenume *
                    </label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Ion"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Nume *
                    </label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Popescu"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ion.popescu@email.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Telefon *
                  </label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="0721234567"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Categorie *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Alege categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Orașul *
                  </label>
                  <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Alege orașul" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Ani de experiență *
                  </label>
                  <Input
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="5 ani"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Descrierea serviciilor
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrie pe scurt serviciile pe care le oferi..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Salvează informațiile
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Pașii de verificare */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresul verificării</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-blue-600">
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {step.title}
                            </h3>
                            {step.required && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Obligatoriu
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {step.description}
                          </p>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(step.status)}
                            {step.status === 'not-uploaded' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleFileUpload(step.id)}
                                className="text-xs"
                              >
                                <Upload className="h-3 w-3 mr-1" />
                                Încarcă
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-semibold">Verificarea se face în 24-48 ore</span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Verificarea documentelor</li>
                    <li>• Validarea experienței</li>
                    <li>• Verificarea referințelor</li>
                    <li>• Aprobare finală</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Status general */}
            <Card>
              <CardHeader>
                <CardTitle>Status general</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="mb-4">
                    {isApproved ? (
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-semibold">Verificare completă - Aprobat</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">În proces de verificare</span>
                      </div>
                    )}
                  </div>
                  
                  {isApproved ? (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        🎉 Felicitări! Contul tău a fost verificat cu succes. Acum poți să-ți completezi profilul și să începi să primești cereri de la clienți.
                      </p>
                      <div className="space-y-3">
                        <Button 
                          onClick={() => window.location.href = '/mesterias/dashboard'}
                          className="w-full"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Accesează Dashboard
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => window.location.href = '/mesterias/profil'}
                          className="w-full"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Completează-ți profilul
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsApproved(false)}
                          className="w-full text-xs"
                        >
                          Simulează status în așteptare (demo)
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        Documentele tale sunt în curs de verificare. Vei primi un email cu rezultatul în maximum 48 de ore.
                      </p>
                      <Button 
                        onClick={() => setIsApproved(true)}
                        variant="outline"
                        className="text-xs mb-4"
                      >
                        Simulează aprobare (demo)
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Cererea depusă la: 16 ianuarie 2024, 10:30
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
