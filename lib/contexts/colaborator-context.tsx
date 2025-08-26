'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

// Types pentru colaboratori
interface CollaboratorPermissions {
  canViewUsers: boolean;
  canEditUsers: boolean;
  canViewCraftsmen: boolean;
  canEditCraftsmen: boolean;
  canViewContent: boolean;
  canEditContent: boolean;
  canViewAnalytics: boolean;
  canViewLogs: boolean;
}

interface CollaboratorStats {
  totalUsers: number;
  totalCraftsmen: number;
  pendingApprovals: number;
  recentActivity: number;
}

interface CollaboratorState {
  // Permissions based on role
  permissions: CollaboratorPermissions;
  
  // Stats
  stats: CollaboratorStats | null;
  
  // UI state
  loading: boolean;
  error: string | null;
  
  // Current section
  activeSection: CollaboratorSection;
}

type CollaboratorSection = 'dashboard' | 'craftsmen' | 'users' | 'content' | 'analytics';

type CollaboratorAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_STATS'; payload: CollaboratorStats }
  | { type: 'SET_PERMISSIONS'; payload: CollaboratorPermissions }
  | { type: 'SET_ACTIVE_SECTION'; payload: CollaboratorSection };

// Initial state
const initialState: CollaboratorState = {
  permissions: {
    canViewUsers: false,
    canEditUsers: false,
    canViewCraftsmen: false,
    canEditCraftsmen: false,
    canViewContent: false,
    canEditContent: false,
    canViewAnalytics: false,
    canViewLogs: false,
  },
  stats: null,
  loading: false,
  error: null,
  activeSection: 'dashboard',
};

// Reducer
function colaboratorReducer(state: CollaboratorState, action: CollaboratorAction): CollaboratorState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_PERMISSIONS':
      return { ...state, permissions: action.payload };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    default:
      return state;
  }
}

// Context
interface CollaboratorContextType {
  state: CollaboratorState;
  actions: {
    setActiveSection: (section: CollaboratorSection) => void;
    loadStats: () => Promise<void>;
    loadPermissions: () => Promise<void>;
  };
}

const CollaboratorContext = createContext<CollaboratorContextType | undefined>(undefined);

// Provider
export function CollaboratorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(colaboratorReducer, initialState);
  const { data: session } = useSession();
  const { toast } = useToast();

  // Load permissions based on user role
  const loadPermissions = async () => {
    try {
      if (!session?.user) return;
      
      const userRole = session.user.role;
      let permissions: CollaboratorPermissions;

      if (userRole === 'ADMINISTRATOR') {
        // Administrators have all permissions
        permissions = {
          canViewUsers: true,
          canEditUsers: true,
          canViewCraftsmen: true,
          canEditCraftsmen: true,
          canViewContent: true,
          canEditContent: true,
          canViewAnalytics: true,
          canViewLogs: true,
        };
      } else {
        // Load collaborator permissions from API
        const response = await fetch('/api/colaborator/permissions');
        if (response.ok) {
          const data = await response.json();
          permissions = data.permissions;
        } else {
          // Default limited permissions for collaborators
          permissions = {
            canViewUsers: true,
            canEditUsers: false,
            canViewCraftsmen: true,
            canEditCraftsmen: false,
            canViewContent: true,
            canEditContent: false,
            canViewAnalytics: false,
            canViewLogs: false,
          };
        }
      }

      dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
    } catch (error) {
      console.error('Error loading permissions:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca permisiunile",
        variant: "destructive"
      });
    }
  };

  // Load dashboard stats
  const loadStats = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await fetch('/api/colaborator/stats');
      if (response.ok) {
        const stats = await response.json();
        dispatch({ type: 'SET_STATS', payload: stats });
      } else {
        throw new Error('Failed to load stats');
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Nu s-au putut încărca statisticile' });
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca statisticile",
        variant: "destructive"
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Set active section
  const setActiveSection = (section: CollaboratorSection) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  };

  // Load initial data
  useEffect(() => {
    if (session?.user) {
      loadPermissions();
      loadStats();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]); // loadPermissions and loadStats are stable functions

  const contextValue: CollaboratorContextType = {
    state,
    actions: {
      setActiveSection,
      loadStats,
      loadPermissions,
    },
  };

  return (
    <CollaboratorContext.Provider value={contextValue}>
      {children}
    </CollaboratorContext.Provider>
  );
}

// Hook
export function useCollaborator() {
  const context = useContext(CollaboratorContext);
  if (context === undefined) {
    throw new Error('useCollaborator must be used within a CollaboratorProvider');
  }
  return context;
}

// Helper functions pentru verificare permisiuni
export function hasPermission(permissions: CollaboratorPermissions, action: keyof CollaboratorPermissions): boolean {
  return permissions[action];
}

export function canAccess(userRole: string, requiredPermissions: (keyof CollaboratorPermissions)[]): boolean {
  if (userRole === 'ADMINISTRATOR') return true;
  
  // Pentru colaboratori, verificăm permisiunile specifice
  // Această logică va fi extinsă când avem permisiunile din API
  return true; // Placeholder
}
