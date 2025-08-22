'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Star, Plus, X, Check, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CraftsmanData {
  id: string;
  businessName: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  experience: number;
  verified: boolean;
  rating: number;
  reviewCount: number;
  subscriptionStatus: string;
  subscriptionPlan: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  categories: Array<{
    category: {
      id: string;
      name: string;
      slug: string;
    }
  }>;
  portfolio: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
  contacts: Array<{
    id: string;
    service: string;
    status: string;
    clientName: string;
    createdAt: string;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    user: { name: string };
    createdAt: string;
  }>;
}

export default function ProfilMesterias() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [craftsmanData, setCraftsmanData] = useState<CraftsmanData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  // Form data pentru editare
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    description: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    experience: 0
  });

  // Încarcă datele meseriaș-ului
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user.role !== 'CRAFTSMAN') {
      router.push('/auth/signin');
      return;
    }

    fetchCraftsmanData();
  }, [session, status, router]);

  const fetchCraftsmanData = async () => {
    try {
      const response = await fetch('/api/craftsman');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Eroare la încărcarea datelor');
      }

      setCraftsmanData(result.data);
      
      // Populează formularul cu datele existente
      setFormData({
        name: result.data.user.name || '',
        businessName: result.data.businessName || '',
        description: result.data.description || '',
        phone: result.data.phone || '',
        address: result.data.address || '',
        city: result.data.city || '',
        county: result.data.county || '',
        experience: result.data.experience || 0
      });

    } catch (error: any) {
      setError(error.message || 'Eroare la încărcarea profilului');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/craftsman', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Eroare la actualizarea profilului');
      }

      setSuccess('Profilul a fost actualizat cu succes!');
      
      // Refresh datele
      await fetchCraftsmanData();
      
      // Șterge mesajul de succes după 3 secunde
      setTimeout(() => setSuccess(''), 3000);

    } catch (error: any) {
      setError(error.message || 'Eroare la salvarea profilului');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Se încarcă profilul...</p>
        </div>
      </div>
    );
  }

  if (error && !craftsmanData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/auth/signin')} 
              className="w-full mt-4"
            >
              Înapoi la autentificare
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!craftsmanData) return null;

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
              {craftsmanData.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="h-3 w-3 mr-1" />
                  Verificat
                </Badge>
              )}
              <Badge variant={craftsmanData.subscriptionStatus === 'ACTIVE' ? "default" : "secondary"}>
                {craftsmanData.subscriptionStatus === 'ACTIVE' ? 'Activ' : 'Inactiv'}
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
                      <span className="text-2xl font-bold text-blue-600">
                        {craftsmanData.user.name?.charAt(0) || 'M'}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{craftsmanData.user.name}</h2>
                  <p className="text-gray-600">{craftsmanData.businessName}</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{craftsmanData.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({craftsmanData.reviewCount} recenzii)</span>
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{craftsmanData.experience}</div>
                    <div className="text-sm text-gray-500">Ani experiență</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{craftsmanData.contacts.length}</div>
                    <div className="text-sm text-gray-500">Cereri primite</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{craftsmanData.categories.length}</div>
                    <div className="text-sm text-gray-500">Categorii servicii</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Messages */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Informații generale</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Recenzii</TabsTrigger>
              </TabsList>

              {/* General Information */}
              <TabsContent value="general">
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
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Numele tău complet"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Numele afacerii *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          placeholder="Ex: Instalații Popescu SRL"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+40 722 123 456"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experiență (ani)</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value) || 0})}
                          placeholder="5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">Oraș *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="București"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="county">Județ</Label>
                        <Input
                          id="county"
                          value={formData.county}
                          onChange={(e) => setFormData({...formData, county: e.target.value})}
                          placeholder="Ilfov"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresă completă</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Strada Exemplu, nr. 10, Sector 1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrierea serviciilor *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        placeholder="Descrie experiența ta, specialitățile și ce te face special. Ex: Meseriaș cu experiență de 15 ani în instalații sanitare și încălzire..."
                      />
                      <p className="text-sm text-gray-500">
                        {formData.description.length}/500 caractere
                      </p>
                    </div>

                    {/* Categories */}
                    {craftsmanData.categories.length > 0 && (
                      <div className="space-y-2">
                        <Label>Categorii de servicii</Label>
                        <div className="flex flex-wrap gap-2">
                          {craftsmanData.categories.map(({ category }) => (
                            <Badge key={category.id} variant="secondary">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveProfile} 
                        disabled={isSaving}
                        className="px-8"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Se salvează...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Salvează modificările
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Portfolio */}
              <TabsContent value="portfolio">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                    <CardDescription>
                      Prezintă lucrările tale pentru a atrage mai mulți clienți
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {craftsmanData.portfolio.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Nu ai încă lucrări în portfolio</p>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Adaugă prima lucrare
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {craftsmanData.portfolio.map((item) => (
                          <div key={item.id} className="border rounded-lg overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="font-medium mb-2">{item.title}</h3>
                              {item.description && (
                                <p className="text-sm text-gray-600">{item.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Recenzii de la clienți</CardTitle>
                    <CardDescription>
                      Feedback-ul primit de la clienții cu care ai lucrat
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {craftsmanData.reviews.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Nu ai încă recenzii</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {craftsmanData.reviews.map((review) => (
                          <div key={review.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{review.user.name}</span>
                                <div className="flex items-center">
                                  {[1,2,3,4,5].map((star) => (
                                    <Star 
                                      key={star} 
                                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString('ro-RO')}
                              </span>
                            </div>
                            {review.comment && (
                              <p className="text-gray-700">{review.comment}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
