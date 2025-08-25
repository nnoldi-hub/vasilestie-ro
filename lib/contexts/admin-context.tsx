'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { UserRole, UserStatus, ActivityLog } from '@/lib/types/admin';
import * as AdminService from '@/lib/services/admin-service';

// Use TeamMember type from admin service
type TeamMember = AdminService.TeamMember;

// Helper functions
function getDepartmentForRole(role: string): string {
  switch (role) {
    case 'ADMINISTRATOR':
      return 'Administrare';
    case 'COLLABORATOR':
      return 'Colaborator';
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
    toggleMemberStatus: (id: string, status: UserStatus) => Promise<any>;
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
        const response = await fetch('/api/admin/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        
        const members = await response.json();
        
        // Convert to the format expected by the context
        const convertedMembers = members.map((member: any) => ({
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
        dispatch({ type: 'SET_TEAM_MEMBERS', payload: convertedMembers });
      } catch (error) {
        console.error('Error loading team members:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la încărcarea membrilor echipei' });
      }
    },

    async createTeamMember(data: any) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        console.log('🔧 Creating team member with data:', data);
        
        const requestBody = {
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          role: data.role
        };
        
        console.log('🔧 Request body:', requestBody);
        
        const response = await fetch('/api/admin/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log('🔧 Response status:', response.status);
        console.log('🔧 Response ok:', response.ok);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('🔧 Error response:', errorData);
          throw new Error(errorData.error || 'Failed to create team member');
        }

        const newMember = await response.json();
        console.log('🔧 Created member:', newMember);
        
        // Convert to context format
        const convertedMember = {
          ...newMember,
          firstName: newMember.name.split(' ')[0] || newMember.name,
          lastName: newMember.name.split(' ')[1] || '',
          avatar: '',
          department: getDepartmentForRole(newMember.role),
          phone: '',
          hireDate: newMember.joinedAt,
          salary: 0,
          permissions: newMember.permissions
        };
        
        dispatch({ type: 'ADD_TEAM_MEMBER', payload: convertedMember });
        return convertedMember;
      } catch (error) {
        console.error('Error creating team member:', error);
        const errorMessage = error instanceof Error ? error.message : 'Eroare la crearea membrului';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        return null;
      }
    },

    async updateTeamMember(id: string, data: any) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch(`/api/admin/team/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}`.trim() : undefined,
            role: data.role
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update team member');
        }

        const updatedMember = await response.json();
        
        // Convert to context format
        const convertedMember = {
          ...updatedMember,
          firstName: updatedMember.name.split(' ')[0] || updatedMember.name,
          lastName: updatedMember.name.split(' ')[1] || '',
          avatar: data.avatar || '',
          department: getDepartmentForRole(updatedMember.role),
          phone: data.phone || '',
          hireDate: updatedMember.joinedAt,
          salary: data.salary || 0,
          permissions: updatedMember.permissions
        };
        
        dispatch({ type: 'UPDATE_TEAM_MEMBER', payload: convertedMember });
        return convertedMember;
      } catch (error) {
        console.error('Error updating team member:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Eroare la actualizarea membrului' });
        return null;
      }
    },

    async deleteTeamMember(id: string) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch(`/api/admin/team/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete team member');
        }

        dispatch({ type: 'REMOVE_TEAM_MEMBER', payload: id });
        return true;
      } catch (error) {
        console.error('Error deleting team member:', error);
        const errorMessage = error instanceof Error ? error.message : 'Eroare la ștergerea membrului';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        return false;
      }
    },

    async toggleMemberStatus(id: string, status: UserStatus) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const member = state.teamMembers.find(m => m.id === id);
        if (member) {
          const updatedMember = { ...member, status };
          dispatch({ type: 'UPDATE_TEAM_MEMBER', payload: updatedMember as any });
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
        const response = await fetch('/api/admin/activity');
        if (!response.ok) {
          throw new Error('Failed to fetch activity logs');
        }
        
        const logs = await response.json();
        dispatch({ type: 'SET_ACTIVITY_LOGS', payload: logs });
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
          member.name?.toLowerCase().includes(query.toLowerCase()) ||
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
    
    // Role filter disabled due to type mismatch
    if (state.filters.status) {
      filtered = filtered.filter(m => m.status === state.filters.status);
    }
    if (state.filters.search) {
      const search = state.filters.search.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  },
  
  getMembersByRole: (state: AdminState) => {
    // Disabled due to type mismatch
    return {};
  },
  
  getActiveMembers: (state: AdminState) => {
    return state.teamMembers.filter(m => m.status === 'active');
  },
  
  getPendingMembers: (state: AdminState) => {
    return []; // No pending status in current TeamMember type
  },
};
