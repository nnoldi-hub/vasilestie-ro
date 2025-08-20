import { createClient } from '@supabase/supabase-js'

// Pentru demo, vom folosi o instanță publică de test
// În producție, folosește propriile chei de mediu
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

// Pentru demo local, vom crea un client mock
const isDev = process.env.NODE_ENV === 'development'

let supabase: any

if (isDev) {
  // Mock Supabase pentru dezvoltare locală
  supabase = {
    auth: {
      signUp: async (credentials: any) => {
        // Simulăm înregistrarea
        const userData = {
          id: Date.now().toString(),
          email: credentials.email,
          user_metadata: {
            firstName: credentials.options?.data?.firstName,
            lastName: credentials.options?.data?.lastName,
            role: credentials.options?.data?.role,
          }
        }
        return { data: { user: userData }, error: null }
      },
      signInWithPassword: async (credentials: any) => {
        // Mock pentru login
        const mockUsers = [
          {
            id: '1',
            email: 'client@test.com',
            user_metadata: {
              firstName: 'Andrei',
              lastName: 'Nicolae',
              role: 'client',
            }
          },
          {
            id: '2',
            email: 'mesterias@test.com',
            user_metadata: {
              firstName: 'Mihai',
              lastName: 'Popescu',
              role: 'craftsman',
            }
          }
        ]
        
        const user = mockUsers.find(u => u.email === credentials.email)
        if (user && credentials.password === 'password123') {
          return { data: { user }, error: null }
        }
        return { data: null, error: { message: 'Email sau parolă incorectă' } }
      },
      signOut: async () => {
        return { error: null }
      },
      getSession: async () => {
        const storedUser = localStorage.getItem('meserii_user')
        if (storedUser) {
          return { data: { session: { user: JSON.parse(storedUser) } }, error: null }
        }
        return { data: { session: null }, error: null }
      },
      onAuthStateChange: (callback: any) => {
        // Mock pentru auth state changes
        return { data: { subscription: { unsubscribe: () => {} } } }
      }
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => {
            // Mock pentru profiluri
            const mockProfiles = [
              {
                id: '1',
                user_id: '1',
                phone: '+40 123 456 789',
                city: 'București',
                avatar_url: null,
              },
              {
                id: '2',
                user_id: '2',
                phone: '+40 123 456 788',
                city: 'București',
                avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                category: 'electrician',
                hourly_rate: 80,
                rating: 4.9,
                review_count: 127,
                description: 'Electrician cu peste 10 ani experiență.',
                is_verified: true,
              }
            ]
            return { data: mockProfiles[0], error: null }
          }
        })
      }),
      insert: async (data: any) => {
        return { data, error: null }
      },
      update: async (data: any) => {
        return { data, error: null }
      },
      upsert: async (data: any) => {
        return { data, error: null }
      }
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  }
} else {
  // Client Supabase real pentru producție
  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          city: string | null
          avatar_url: string | null
          role: 'client' | 'craftsman'
          is_verified: boolean
          created_at: string
          updated_at: string
          // Pentru meseriași
          category: string | null
          hourly_rate: number | null
          description: string | null
          rating: number | null
          review_count: number | null
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          city?: string | null
          avatar_url?: string | null
          role: 'client' | 'craftsman'
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          category?: string | null
          hourly_rate?: number | null
          description?: string | null
          rating?: number | null
          review_count?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          city?: string | null
          avatar_url?: string | null
          role?: 'client' | 'craftsman'
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          category?: string | null
          hourly_rate?: number | null
          description?: string | null
          rating?: number | null
          review_count?: number | null
        }
      }
      services: {
        Row: {
          id: string
          craftsman_id: string
          title: string
          description: string
          category: string
          price_min: number
          price_max: number
          price_type: 'hourly' | 'fixed'
          location: string
          availability: string
          tags: string[]
          images: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      bookings: {
        Row: {
          id: string
          client_id: string
          craftsman_id: string
          service_id: string
          status: 'pending' | 'accepted' | 'completed' | 'cancelled'
          scheduled_date: string
          description: string
          total_price: number
          created_at: string
          updated_at: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
