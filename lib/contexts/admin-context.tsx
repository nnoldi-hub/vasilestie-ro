'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { TeamMember, UserRole, UserStatus, ActivityLog } from '@/lib/types/admin';
import * as AdminService from '@/lib/services/admin-service';

// Helper functions
function getDepartmentForRole(role: string): string {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'ADMIN':
      return 'Administrare';
    case 'MODERATOR':
      return 'Moderare';
    case 'SUPPORT':
      return 'Suport Client';
    default:
      return 'General';
  }
}

// State interface
interface AdminState {
  // Team members
  teamMembers: TeamMember[];
  selectedMember: TeamMember | null;
  
  // Filters și căutare
  filters: {
    role?: UserRole;
    status?: UserStatus;
    department?: string;
    search?: string;
  };
  
  // Activity logs
  activityLogs: ActivityLog[];
  
  // UI state
  loading: boolean;
  error: string | null;
  
  // Stats
  stats: {
    totalMembers: number;
    activeMembers: number;
    membersByRole: Record<UserRole, number>;
    recentActivity: number;
  } | null;
}

// Actions
type AdminAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TEAM_MEMBERS'; payload: TeamMember[] }
  | { type: 'ADD_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'UPDATE_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'REMOVE_TEAM_MEMBER'; payload: string }
  | { type: 'SET_SELECTED_MEMBER'; payload: TeamMember | null }
  | { type: 'SET_FILTERS'; payload: Partial<AdminState['filters']> }
  | { type: 'SET_ACTIVITY_LOGS'; payload: ActivityLog[] }
  | { type: 'ADD_ACTIVITY_LOG'; payload: ActivityLog }
  | { type: 'SET_STATS'; payload: AdminState['stats'] };

// Initial state
const initialState: AdminState = {
  teamMembers: [],
  selectedMember: null,
  filters: {},
  activityLogs: [],
  loading: false,
  error: null,
  stats: null,
};

// Reducer
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_TEAM_MEMBERS':
      return { ...state, teamMembers: action.payload, loading: false };
    
    case 'ADD_TEAM_MEMBER':
      return {
        ...state,
        teamMembers: [action.payload, ...state.teamMembers],
        loading: false,
      };
    
    case 'UPDATE_TEAM_MEMBER':
      return {
        ...state,
        teamMembers: state.teamMembers.map(member =>
          member.id === action.payload.id ? action.payload : member
        ),
        selectedMember: state.selectedMember?.id === action.payload.id 
          ? action.payload 
          : state.selectedMember,
        loading: false,
      };
    
    case 'REMOVE_TEAM_MEMBER':
      return {
        ...state,
        teamMembers: state.teamMembers.filter(member => member.id !== action.payload),
        selectedMember: state.selectedMember?.id === action.payload 
          ? null 
          : state.selectedMember,
        loading: false,
      };
    
    case 'SET_SELECTED_MEMBER':
      return { ...state, selectedMember: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'SET_ACTIVITY_LOGS':
      return { ...state, activityLogs: action.payload };
    
    case 'ADD_ACTIVITY_LOG':
      return {
        ...state,
        activityLogs: [action.payload, ...state.activityLogs.slice(0, 99)],
      };
    
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    
    default:
      return state;
  }
}

// Context
const AdminContext = createContext<{
  state: AdminState;
  actions: {
    // Team members
    loadTeamMembers: () => Promise<void>;
    createTeamMember: (data: any) => Promise<TeamMember | null>;
    updateTeamMember: (id: string, data: any) => Promise<TeamMember | null>;
    deleteTeamMember: (id: string) => Promise<boolean>;
    toggleMemberStatus: (id: string, status: UserStatus) => Promise<TeamMember | null>;
    resetPassword: (id: string) => Promise<boolean>;
    
    // Selection și filters
    setSelectedMember: (member: TeamMember | null) => void;
    setFilters: (filters: Partial<AdminState['filters']>) => void;
    clearFilters: () => void;
    
    // Activity logs
    loadActivityLogs: () => Promise<void>;
    
    // Stats
    loadStats: () => Promise<void>;
    
    // Utility
    searchMembers: (query: string) => Promise<TeamMember[]>;
    setError: (error: string | null) => void;
  };
} | null>(null);

// Provider
export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Actions
  const actions = {
    // ===== TEAM MEMBERS =====
    
    async loadTeamMembers() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const members = await AdminService.getTeamMembers();
        // Convert to the format expected by the context
        const convertedMembers = members.map(member => ({
          ...member,
          firstName: member.name.split(' ')[0] || member.name,
          lastName: member.name.split(' ')[1] || '',
          avatar: '',
          department: getDepartmentForRole(member.role),
          phone: '',
          hireDate: member.joinedAt,
          salary: 0,
          permissions: member.permissions
        }));
        dispatch({ type: 'SET_TEAM_MEMBERS', payload: convertedMembers as any[] });
      } catch (error) {
        console.error('Error loading team members:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la încărcarea membrilor echipei' });
      }
    },

    async createTeamMember(data: any) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const newMember = await AdminService.createTeamMember({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          role: data.role
        });
        
        const convertedMember = {
          ...newMember,
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: '',
          department: getDepartmentForRole(newMember.role),
          phone: data.phone || '',
          hireDate: newMember.joinedAt,
          salary: 0,
          permissions: newMember.permissions
        };
        
        dispatch({ type: 'ADD_TEAM_MEMBER', payload: convertedMember as any });
        return convertedMember;
      } catch (error) {
        console.error('Error creating team member:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la crearea membrului' });
        return null;
      }
    },

    async updateTeamMember(id: string, data: any) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // For now, just update the local state
        const updatedMember = { ...state.teamMembers.find(m => m.id === id), ...data };
        dispatch({ type: 'UPDATE_TEAM_MEMBER', payload: updatedMember as any });
        return updatedMember;
      } catch (error) {
        console.error('Error updating team member:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la actualizarea membrului' });
        return null;
      }
    },

    async deleteTeamMember(id: string) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // For now, just remove from local state
        dispatch({ type: 'REMOVE_TEAM_MEMBER', payload: id });
        return true;
      } catch (error) {
        console.error('Error deleting team member:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la ștergerea membrului' });
        return false;
      }
    },

    async toggleMemberStatus(id: string, status: UserStatus) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const member = state.teamMembers.find(m => m.id === id);
        if (member) {
          const updatedMember = { ...member, status };
          dispatch({ type: 'UPDATE_TEAM_MEMBER', payload: updatedMember });
          return updatedMember;
        }
        return null;
      } catch (error) {
        console.error('Error toggling member status:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la schimbarea statusului' });
        return null;
      }
    },

    async resetPassword(id: string) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Mock implementation
        dispatch({ type: 'SET_LOADING', payload: false });
        return true;
      } catch (error) {
        console.error('Error resetting password:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la resetarea parolei' });
        return false;
      }
    },

    // ===== SELECTION & FILTERS =====
    
    setSelectedMember(member: TeamMember | null) {
      dispatch({ type: 'SET_SELECTED_MEMBER', payload: member });
    },

    setFilters(filters: Partial<AdminState['filters']>) {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    clearFilters() {
      dispatch({ type: 'SET_FILTERS', payload: {} });
    },

    // ===== ACTIVITY LOGS =====
    
    async loadActivityLogs() {
      try {
        // Mock activity logs for now
        const mockLogs: ActivityLog[] = [
          {
            id: '1',
            userId: '1',
            action: 'login',
            description: 's-a conectat la sistem',
            timestamp: new Date(),
            metadata: {}
          },
          {
            id: '2',
            userId: '2',
            action: 'create',
            description: 'a creat un nou membru',
            timestamp: new Date(Date.now() - 3600000),
            metadata: {}
          }
        ];
        dispatch({ type: 'SET_ACTIVITY_LOGS', payload: mockLogs });
      } catch (error) {
        console.error('Error loading activity logs:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la încărcarea log-urilor' });
      }
    },

    // ===== STATS =====
    
    async loadStats() {
      try {
        const members = state.teamMembers;
        const stats = {
          totalMembers: members.length,
          activeMembers: members.filter(m => m.status === 'active').length,
          membersByRole: members.reduce((acc, member) => {
            acc[member.role as UserRole] = (acc[member.role as UserRole] || 0) + 1;
            return acc;
          }, {} as Record<UserRole, number>),
          recentActivity: 5
        };
        dispatch({ type: 'SET_STATS', payload: stats });
      } catch (error) {
        console.error('Error loading stats:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la încărcarea statisticilor' });
      }
    },

    // ===== UTILITY =====
    
    async searchMembers(query: string) {
      try {
        // Mock search implementation
        const results = state.teamMembers.filter(member => 
          member.firstName?.toLowerCase().includes(query.toLowerCase()) ||
          member.lastName?.toLowerCase().includes(query.toLowerCase()) ||
          member.email?.toLowerCase().includes(query.toLowerCase())
        );
        return results;
      } catch (error) {
        console.error('Error searching members:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la căutare' });
        return [];
      }
    },

    setError(error: string | null) {
      dispatch({ type: 'SET_ERROR', payload: error });
    },
  };

  // Load initial data
  useEffect(() => {
    actions.loadTeamMembers();
    actions.loadStats();
    actions.loadActivityLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-load when filters change
  useEffect(() => {
    actions.loadTeamMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filters]);

  return (
    <AdminContext.Provider value={{ state, actions }}>
      {children}
    </AdminContext.Provider>
  );
}

// Hook
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}

// Selectors (pentru optimizare)
export const adminSelectors = {
  getFilteredMembers: (state: AdminState) => {
    let filtered = state.teamMembers;
    
    if (state.filters.role) {
      filtered = filtered.filter(m => m.role === state.filters.role);
    }
    if (state.filters.status) {
      filtered = filtered.filter(m => m.status === state.filters.status);
    }
    if (state.filters.department) {
      filtered = filtered.filter(m => m.department === state.filters.department);
    }
    if (state.filters.search) {
      const search = state.filters.search.toLowerCase();
      filtered = filtered.filter(m => 
        m.firstName.toLowerCase().includes(search) ||
        m.lastName.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  },
  
  getMembersByRole: (state: AdminState) => {
    return state.teamMembers.reduce((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = [];
      }
      acc[member.role].push(member);
      return acc;
    }, {} as Record<UserRole, TeamMember[]>);
  },
  
  getActiveMembers: (state: AdminState) => {
    return state.teamMembers.filter(m => m.status === 'active');
  },
  
  getPendingMembers: (state: AdminState) => {
    return state.teamMembers.filter(m => m.status === 'pending');
  },
};
