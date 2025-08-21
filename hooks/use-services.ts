'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (expects NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to be set)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Service {
  id: string;
  craftsmanId: string;
  title: string;
  description: string;
  category: string;
  priceMin: number;
  priceMax: number;
  priceType: 'hourly' | 'fixed';
  location: string;
  availability: string;
  tags: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Detalii meseriași (din join)
  craftsman?: {
    firstName: string;
    lastName: string;
    avatar?: string;
    rating?: number;
    reviewCount?: number;
    isVerified: boolean;
    responseTime?: string;
  };
}

export interface ServiceFilters {
  category?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  searchQuery?: string;
  sortBy?: 'rating' | 'price-low' | 'price-high' | 'reviews' | 'availability';
}

// Mock data pentru demo
const mockServices: Service[] = [
  {
    id: '1',
    craftsmanId: '2',
    title: 'Instalații electrice complete',
    description: 'Instalații electrice pentru case și apartamente. Tablouri electrice, prize, întrerupătoare, iluminat.',
    category: 'electrician',
    priceMin: 80,
    priceMax: 120,
    priceType: 'hourly',
    location: 'București, Sector 1',
    availability: 'Disponibil astăzi',
    tags: ['Instalații noi', 'Reparații', 'Întreținere'],
    images: ['https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'Mihai',
      lastName: 'Popescu',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.9,
      reviewCount: 127,
      isVerified: true,
      responseTime: '< 2 ore',
    },
  },
  {
    id: '2',
    craftsmanId: '3',
    title: 'Design interior și amenajări',
    description: 'Proiecte complete de design interior pentru locuințe moderne. Consultanță, planificare și execuție.',
    category: 'designer',
    priceMin: 150,
    priceMax: 250,
    priceType: 'hourly',
    location: 'Cluj-Napoca',
    availability: 'Disponibilă mâine',
    tags: ['Design modern', 'Amenajări complete', 'Consultanță'],
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'Ana',
      lastName: 'Georgescu',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.8,
      reviewCount: 89,
      isVerified: true,
      responseTime: '< 1 oră',
    },
  },
  {
    id: '3',
    craftsmanId: '4',
    title: 'Instalații sanitare și reparații',
    description: 'Instalații sanitare complete, reparații țevi, centrale termice, apometre.',
    category: 'plumber',
    priceMin: 70,
    priceMax: 110,
    priceType: 'hourly',
    location: 'București, Sector 3',
    availability: 'Disponibil astăzi',
    tags: ['Instalații sanitare', 'Reparații urgente', 'Centrale termice'],
    images: ['https://images.pexels.com/photos/1126384/pexels-photo-1126384.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'Radu',
      lastName: 'Ionescu',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.7,
      reviewCount: 92,
      isVerified: true,
      responseTime: '< 3 ore',
    },
  },
  {
    id: '4',
    craftsmanId: '5',
    title: 'Dulgherie și mobilier personalizat',
    description: 'Mobilier pe comandă, renovări lemn, uși personalizate, scări interioare.',
    category: 'carpenter',
    priceMin: 100,
    priceMax: 180,
    priceType: 'hourly',
    location: 'Timișoara',
    availability: 'Disponibil în 2 zile',
    tags: ['Mobilier personalizat', 'Renovări', 'Lemn masiv'],
    images: ['https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'Cristian',
      lastName: 'Marinescu',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.9,
      reviewCount: 74,
      isVerified: true,
      responseTime: '< 4 ore',
    },
  },
  {
    id: '5',
    craftsmanId: '6',
    title: 'Zugrăveli și vopsitorii',
    description: 'Vopsitorii interioare și exterioare, zugrăveli, decoruri artistice.',
    category: 'painter',
    priceMin: 60,
    priceMax: 90,
    priceType: 'hourly',
    location: 'Iași',
    availability: 'Disponibil astăzi',
    tags: ['Vopsitorii', 'Zugrăveli', 'Decoruri artistice'],
    images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'Elena',
      lastName: 'Dumitrescu',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.6,
      reviewCount: 58,
      isVerified: true,
      responseTime: '< 5 ore',
    },
  },
  {
    id: '6',
    craftsmanId: '7',
    title: 'Reparații auto și mecanic',
    description: 'Reparații auto complete, service periodic, diagnoza computerizată.',
    category: 'mechanic',
    priceMin: 90,
    priceMax: 150,
    priceType: 'hourly',
    location: 'Constanța',
    availability: 'Disponibil mâine',
    tags: ['Reparații auto', 'Service periodic', 'Diagnoza'],
    images: ['https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'Adrian',
      lastName: 'Popa',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.8,
      reviewCount: 103,
      isVerified: true,
      responseTime: '< 2 ore',
    },
  },
  {
    id: '7',
    craftsmanId: '8',
    title: 'Electrician cu experiență',
    description: 'Instalații electrice industriale și rezidențiale, sisteme de securitate.',
    category: 'electrician',
    priceMin: 85,
    priceMax: 130,
    priceType: 'hourly',
    location: 'Cluj-Napoca',
    availability: 'Disponibil astăzi',
    tags: ['Instalații industriale', 'Sisteme securitate', 'Urgente'],
    images: ['https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'Marian',
      lastName: 'Constantinescu',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.9,
      reviewCount: 145,
      isVerified: true,
      responseTime: '< 1 oră',
    },
  },
  {
    id: '8',
    craftsmanId: '9',
    title: 'Instalații sanitare Brașov',
    description: 'Instalații sanitare, încălzire, climatizare pentru case și apartamente.',
    category: 'plumber',
    priceMin: 75,
    priceMax: 105,
    priceType: 'hourly',
    location: 'Brașov',
    availability: 'Disponibil mâine',
    tags: ['Instalații sanitare', 'Încălzire', 'Climatizare'],
    images: ['https://images.pexels.com/photos/1126384/pexels-photo-1126384.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    craftsman: {
      firstName: 'George',
      lastName: 'Alexandrescu',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 4.7,
      reviewCount: 67,
      isVerified: true,
      responseTime: '< 3 ore',
    },
  },
];

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const user = session?.user;

  const fetchServices = useCallback(async (filters?: ServiceFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      // În dezvoltare folosim mock data
      if (process.env.NODE_ENV === 'development') {
        // Simulăm delay de network
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredServices = [...mockServices];
        
        // Aplică filtrele
        if (filters) {
          if (filters.category) {
            filteredServices = filteredServices.filter(s => s.category === filters.category);
          }
          if (filters.location) {
            filteredServices = filteredServices.filter(s => 
              s.location.toLowerCase().includes(filters.location!.toLowerCase())
            );
          }
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filteredServices = filteredServices.filter(s => 
              s.title.toLowerCase().includes(query) ||
              s.description.toLowerCase().includes(query) ||
              s.craftsman?.firstName.toLowerCase().includes(query) ||
              s.craftsman?.lastName.toLowerCase().includes(query) ||
              s.location.toLowerCase().includes(query)
            );
          }
          if (filters.priceMin) {
            filteredServices = filteredServices.filter(s => s.priceMax >= filters.priceMin!);
          }
          if (filters.priceMax) {
            filteredServices = filteredServices.filter(s => s.priceMin <= filters.priceMax!);
          }
          if (filters.rating) {
            filteredServices = filteredServices.filter(s => 
              (s.craftsman?.rating || 0) >= filters.rating!
            );
          }
          
          // Sortare
          if (filters.sortBy) {
            switch (filters.sortBy) {
              case 'rating':
                filteredServices.sort((a, b) => (b.craftsman?.rating || 0) - (a.craftsman?.rating || 0));
                break;
              case 'price-low':
                filteredServices.sort((a, b) => a.priceMin - b.priceMin);
                break;
              case 'price-high':
                filteredServices.sort((a, b) => b.priceMax - a.priceMax);
                break;
              case 'reviews':
                filteredServices.sort((a, b) => (b.craftsman?.reviewCount || 0) - (a.craftsman?.reviewCount || 0));
                break;
              case 'availability':
                // Sortează după disponibilitate (astăzi primul)
                filteredServices.sort((a, b) => {
                  if (a.availability.includes('astăzi') && !b.availability.includes('astăzi')) return -1;
                  if (!a.availability.includes('astăzi') && b.availability.includes('astăzi')) return 1;
                  return 0;
                });
                break;
            }
          }
        }
        
        setServices(filteredServices);
      } else {
        // Pentru producție, folosește Supabase
        let query = supabase
          .from('services')
          .select(`
            *,
            profiles!services_craftsman_id_fkey (
              first_name,
              last_name,
              avatar_url,
              rating,
              review_count,
              is_verified
            )
          `)
          .eq('is_active', true);

        // Aplică filtrele
        if (filters?.category) {
          query = query.eq('category', filters.category);
        }
        if (filters?.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }
        if (filters?.searchQuery) {
          query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        const transformedServices: Service[] = data?.map((item: any) => ({
          id: item.id,
          craftsmanId: item.craftsman_id,
          title: item.title,
          description: item.description,
          category: item.category,
          priceMin: item.price_min,
          priceMax: item.price_max,
          priceType: item.price_type,
          location: item.location,
          availability: item.availability,
          tags: item.tags,
          images: item.images,
          isActive: item.is_active,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          craftsman: item.profiles ? {
            firstName: item.profiles.first_name,
            lastName: item.profiles.last_name,
            avatar: item.profiles.avatar_url,
            rating: item.profiles.rating,
            reviewCount: item.profiles.review_count,
            isVerified: item.profiles.is_verified,
          } : undefined,
        })) || [];

        setServices(transformedServices);
      }
    } catch (err: any) {
      setError(err.message || 'Eroare la încărcarea serviciilor');
      console.error('Error fetching services:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createService = async (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'craftsman'>) => {
    if (!user || user.role !== 'craftsman') {
      return { success: false, error: 'Nu ai permisiunea să creezi servicii' };
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          craftsman_id: user.id,
          title: serviceData.title,
          description: serviceData.description,
          category: serviceData.category,
          price_min: serviceData.priceMin,
          price_max: serviceData.priceMax,
          price_type: serviceData.priceType,
          location: serviceData.location,
          availability: serviceData.availability,
          tags: serviceData.tags,
          images: serviceData.images,
          is_active: serviceData.isActive,
        })
        .select()
        .single();

      if (error) throw error;

      // Reîncarcă serviciile
      fetchServices();

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateService = async (serviceId: string, updates: Partial<Service>) => {
    if (!user) {
      return { success: false, error: 'Nu ești autentificat' };
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .update({
          title: updates.title,
          description: updates.description,
          category: updates.category,
          price_min: updates.priceMin,
          price_max: updates.priceMax,
          price_type: updates.priceType,
          location: updates.location,
          availability: updates.availability,
          tags: updates.tags,
          images: updates.images,
          is_active: updates.isActive,
          updated_at: new Date().toISOString(),
        })
        .eq('id', serviceId)
        .eq('craftsman_id', user.id) // Doar proprietarul poate actualiza
        .select()
        .single();

      if (error) throw error;

      // Reîncarcă serviciile
      fetchServices();

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  // Încarcă serviciile la mount
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Funcție pentru a obține orașele disponibile
  const getAvailableLocations = () => {
    const locations = new Set<string>();
    mockServices.forEach(service => {
      // Extrage orașul din locație (ex: "București, Sector 1" -> "București")
      const city = service.location.split(',')[0].trim();
      locations.add(city);
    });
    return Array.from(locations).sort();
  };

  return {
    services,
    isLoading,
    error,
    fetchServices,
    createService,
    updateService,
    refetch: fetchServices,
    getAvailableLocations,
  };
}
