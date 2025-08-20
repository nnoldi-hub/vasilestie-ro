'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
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

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'client@test.com',
    password: 'password123',
    firstName: 'Andrei',
    lastName: 'Nicolae',
    phone: '+40 123 456 789',
    role: 'client',
    isVerified: true,
    city: 'București',
  },
  {
    id: '2',
    email: 'mesterias@test.com',
    password: 'password123',
    firstName: 'Mihai',
    lastName: 'Popescu',
    phone: '+40 123 456 788',
    role: 'craftsman',
    isVerified: true,
    city: 'București',
    category: 'electrician',
    hourlyRate: 80,
    rating: 4.9,
    reviewCount: 127,
    description: 'Electrician cu peste 10 ani experiență în instalații electrice.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('meserii_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('meserii_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        setIsLoading(false);
        return { success: false, error: 'Email sau parolă incorectă' };
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('meserii_user', JSON.stringify(userWithoutPassword));
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Eroare de conectare. Încearcă din nou.' };
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        setIsLoading(false);
        return { success: false, error: 'Un cont cu această adresă de email există deja' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role,
        isVerified: false,
        city: data.city,
        category: data.category,
        hourlyRate: data.hourlyRate,
        description: data.description,
      };

      // Add to mock users (in real app, this would be sent to API)
      mockUsers.push({ ...newUser, password: data.password });

      setUser(newUser);
      localStorage.setItem('meserii_user', JSON.stringify(newUser));
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Eroare la înregistrare. Încearcă din nou.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('meserii_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { success: false, error: 'Nu ești autentificat' };

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('meserii_user', JSON.stringify(updatedUser));
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Eroare la actualizarea profilului' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
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
