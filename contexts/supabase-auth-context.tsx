'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'client' | 'craftsman';
  isVerified: boolean;
  city?: string;
  // Pentru meseriași
  category?: string;
  hourlyRate?: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'client' | 'craftsman';
  city?: string;
  // Pentru meseriași
  category?: string;
  hourlyRate?: number;
  description?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Funcție pentru a obține profilul utilizatorului
  const getUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return {
        id: data.user_id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        avatar: data.avatar_url,
        role: data.role,
        isVerified: data.is_verified,
        city: data.city,
        category: data.category,
        hourlyRate: data.hourly_rate,
        rating: data.rating,
        reviewCount: data.review_count,
        description: data.description,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  };

  // Funcție pentru a crea/actualiza profilul
  const upsertProfile = async (authUser: any, additionalData?: Partial<RegisterData>) => {
    const profileData = {
      user_id: authUser.id,
      email: authUser.email,
      first_name: additionalData?.firstName || authUser.user_metadata?.firstName || '',
      last_name: additionalData?.lastName || authUser.user_metadata?.lastName || '',
      phone: additionalData?.phone || authUser.user_metadata?.phone || null,
      city: additionalData?.city || authUser.user_metadata?.city || null,
      role: additionalData?.role || authUser.user_metadata?.role || 'client',
      is_verified: false,
      category: additionalData?.category || authUser.user_metadata?.category || null,
      hourly_rate: additionalData?.hourlyRate || authUser.user_metadata?.hourlyRate || null,
      description: additionalData?.description || authUser.user_metadata?.description || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(profileData);

    if (error) {
      console.error('Error upserting profile:', error);
    }
  };

  // Inițializare - verifică sesiunea existentă
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }

        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          setUser(profile);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Ascultă schimbările de autentificare
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await getUserProfile(session.user.id);
        setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile = await getUserProfile(data.user.id);
        setUser(profile);
      }
      
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: 'Eroare de conectare. Încearcă din nou.' };
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            phone: data.phone,
            city: data.city,
            category: data.category,
            hourlyRate: data.hourlyRate,
            description: data.description,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (authData.user) {
        // Creează profilul în baza de date
        await upsertProfile(authData.user, data);
        
        const profile = await getUserProfile(authData.user.id);
        setUser(profile);
      }
      
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: 'Eroare la înregistrare. Încearcă din nou.' };
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setUser(null);
  };

  const updateProfile = async (updateData: Partial<User>) => {
    if (!user) return { success: false, error: 'Nu ești autentificat' };

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: updateData.firstName,
          last_name: updateData.lastName,
          phone: updateData.phone,
          city: updateData.city,
          category: updateData.category,
          hourly_rate: updateData.hourlyRate,
          description: updateData.description,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      // Actualizează starea locală
      const updatedUser = { ...user, ...updateData };
      setUser(updatedUser);
      
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: 'Eroare la actualizarea profilului' };
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    
    const updatedProfile = await getUserProfile(user.id);
    if (updatedProfile) {
      setUser(updatedProfile);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
