'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, MapPin, Phone, Mail, Globe, Star, Plus, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

interface WorkHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export default function ProfilMesterias() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - în realitate ar veni din API
  const [profile, setProfile] = useState({
    name: 'Ion Popescu',
    email: 'ion.popescu@example.com',
    phone: '+40 721 234 567',
    profession: 'Electrician',
    experience: '8 ani',
    description: 'Electrician cu experiență în instalații rezidențiale și comerciale. Lucrez cu cele mai moderne echipamente și respect toate normele de siguranță.',
    location: 'București, Sector 1',
    website: '',
    profileImage: '',
    isAvailable: true,
    rating: 4.8,
    completedJobs: 127,
    responseTime: '2 ore',
    zones: ['Sector 1', 'Sector 2', 'Centrul Vechi']
  });

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Instalații electrice noi',
      description: 'Instalații complete pentru apartamente și case',
      price: '150-300 RON/mp',
      duration: '1-3 zile'
    },
    {
      id: '2',
      name: 'Reparații și întreținere',
      description: 'Reparații prize, întrerupătoare, siguranțe',
      price: '50-150 RON',
      duration: '1-2 ore'
    }
  ]);

  const [workHours, setWorkHours] = useState<WorkHours[]>([
    { day: 'Luni', isOpen: true, openTime: '08:00', closeTime: '18:00' },
    { day: 'Marți', isOpen: true, openTime: '08:00', closeTime: '18:00' },
    { day: 'Miercuri', isOpen: true, openTime: '08:00', closeTime: '18:00' },
    { day: 'Joi', isOpen: true, openTime: '08:00', closeTime: '18:00' },
    { day: 'Vineri', isOpen: true, openTime: '08:00', closeTime: '18:00' },
    { day: 'Sâmbătă', isOpen: true, openTime: '09:00', closeTime: '15:00' },
    { day: 'Duminică', isOpen: false, openTime: '09:00', closeTime: '15:00' }
  ]);

  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    price: '',
    duration: ''
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulăm salvarea profilului
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Profilul a fost actualizat cu succes!');
  };

  const addService = () => {
    if (newService.name && newService.description && newService.price) {
      const service: Service = {
        id: Date.now().toString(),
        ...newService
      };
      setServices([...services, service]);
      setNewService({ name: '', description: '', price: '', duration: '' });
    }
  };

  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const updateWorkHours = (index: number, field: keyof WorkHours, value: any) => {
    const updated = [...workHours];
    updated[index] = { ...updated[index], [field]: value };
    setWorkHours(updated);
  };

  const tabs = [
    { id: 'general', name: 'Informații generale', icon: '📋' },
    { id: 'services', name: 'Servicii oferite', icon: '🔧' },
    { id: 'schedule', name: 'Program de lucru', icon: '📅' },
    { id: 'zones', name: 'Zone de acoperire', icon: '🗺️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/mesterias/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Profilul meu</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Check className="h-3 w-3 mr-1" />
                Verificat
              </Badge>
              <Badge variant={profile.isAvailable ? "default" : "secondary"}>
                {profile.isAvailable ? 'Disponibil' : 'Indisponibil'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* Profile Image */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      {profile.profileImage ? (
                        <img 
                          src={profile.profileImage} 
                          alt={profile.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">
                          {profile.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600">{profile.profession}</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{profile.rating}</span>
                    <span className="text-gray-500">({profile.completedJobs} lucrări)</span>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span className="text-sm">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* General Information */}
            {activeTab === 'general' && (
              <Card>
                <CardHeader>
                  <CardTitle>Informații generale</CardTitle>
                  <CardDescription>
                    Actualizează informațiile tale de bază care vor fi vizibile clienților
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nume complet *</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profession">Meserie *</Label>
                      <Select value={profile.profession} onValueChange={(value) => setProfile({...profile, profession: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electrician">Electrician</SelectItem>
                          <SelectItem value="Instalator">Instalator</SelectItem>
                          <SelectItem value="Dulgherie">Dulgherie</SelectItem>
                          <SelectItem value="Zugrav">Zugrav</SelectItem>
                          <SelectItem value="Designer">Designer</SelectItem>
                          <SelectItem value="Mecanic">Mecanic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Locație *</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        placeholder="București, Sector 1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experiență</Label>
                      <Input
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => setProfile({...profile, experience: e.target.value})}
                        placeholder="5 ani"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (opțional)</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      placeholder="https://www.example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descriere *</Label>
                    <Textarea
                      id="description"
                      value={profile.description}
                      onChange={(e) => setProfile({...profile, description: e.target.value})}
                      rows={4}
                      placeholder="Descrie experiența ta, specialitățile și ce te face special..."
                    />
                    <p className="text-sm text-gray-500">
                      {profile.description.length}/500 caractere
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Label>Disponibilitate</Label>
                      <p className="text-sm text-gray-600">
                        Activează pentru a primi cereri noi de la clienți
                      </p>
                    </div>
                    <Switch
                      checked={profile.isAvailable}
                      onCheckedChange={(checked) => setProfile({...profile, isAvailable: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Services */}
            {activeTab === 'services' && (
              <Card>
                <CardHeader>
                  <CardTitle>Servicii oferite</CardTitle>
                  <CardDescription>
                    Adaugă și gestionează serviciile pe care le oferi clienților
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Existing Services */}
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{service.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-blue-600 font-medium">{service.price}</span>
                              <span className="text-sm text-gray-500">⏱️ {service.duration}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeService(service.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Service */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Adaugă serviciu nou</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="serviceName">Nume serviciu *</Label>
                          <Input
                            id="serviceName"
                            value={newService.name}
                            onChange={(e) => setNewService({...newService, name: e.target.value})}
                            placeholder="Ex: Instalații electrice"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="servicePrice">Preț *</Label>
                          <Input
                            id="servicePrice"
                            value={newService.price}
                            onChange={(e) => setNewService({...newService, price: e.target.value})}
                            placeholder="Ex: 150-300 RON"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="serviceDescription">Descriere *</Label>
                        <Textarea
                          id="serviceDescription"
                          value={newService.description}
                          onChange={(e) => setNewService({...newService, description: e.target.value})}
                          rows={3}
                          placeholder="Descrie detaliat ce include acest serviciu..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="serviceDuration">Durată estimată</Label>
                        <Input
                          id="serviceDuration"
                          value={newService.duration}
                          onChange={(e) => setNewService({...newService, duration: e.target.value})}
                          placeholder="Ex: 2-3 ore"
                        />
                      </div>
                      <Button onClick={addService} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Adaugă serviciu
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Schedule */}
            {activeTab === 'schedule' && (
              <Card>
                <CardHeader>
                  <CardTitle>Program de lucru</CardTitle>
                  <CardDescription>
                    Configurează programul în care ești disponibil pentru clienți
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workHours.map((day, index) => (
                      <div key={day.day} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-20">
                          <span className="font-medium text-gray-900">{day.day}</span>
                        </div>
                        <div className="flex-1 flex items-center space-x-4">
                          <Switch
                            checked={day.isOpen}
                            onCheckedChange={(checked) => updateWorkHours(index, 'isOpen', checked)}
                          />
                          {day.isOpen ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                type="time"
                                value={day.openTime}
                                onChange={(e) => updateWorkHours(index, 'openTime', e.target.value)}
                                className="w-24"
                              />
                              <span className="text-gray-500">-</span>
                              <Input
                                type="time"
                                value={day.closeTime}
                                onChange={(e) => updateWorkHours(index, 'closeTime', e.target.value)}
                                className="w-24"
                              />
                            </div>
                          ) : (
                            <span className="text-gray-500">Închis</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Zones */}
            {activeTab === 'zones' && (
              <Card>
                <CardHeader>
                  <CardTitle>Zone de acoperire</CardTitle>
                  <CardDescription>
                    Selectează zonele în care oferi servicii
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6',
                        'Centrul Vechi', 'Băneasa', 'Pipera', 'Floreasca', 'Herastrau', 'Aviatorilor'
                      ].map((zone) => (
                        <label key={zone} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={profile.zones.includes(zone)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProfile({...profile, zones: [...profile.zones, zone]});
                              } else {
                                setProfile({...profile, zones: profile.zones.filter(z => z !== zone)});
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{zone}</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Label>Zone selectate:</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.zones.map((zone) => (
                          <Badge key={zone} variant="secondary">
                            {zone}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <Button 
                onClick={handleSaveProfile} 
                disabled={isLoading}
                className="px-8"
              >
                {isLoading ? 'Se salvează...' : 'Salvează modificările'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
