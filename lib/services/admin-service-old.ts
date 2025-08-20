import { 
  TeamMember, 
  CreateTeamMemberRequest, 
  UpdateTeamMemberRequest, 
  ActivityLog,
  UserRole,
  UserStatus 
} from '@/lib/types/admin';

// Mock data pentru dezvoltare
let teamMembers: TeamMember[] = [
  {
    id: '1',
    firstName: 'Vasile',
    lastName: 'Administrator',
    email: 'admin@vasilestie.ro',
    role: 'admin',
    status: 'active',
    avatar: '/avatars/admin.jpg',
    phone: '+40 123 456 789',
    department: 'Management',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    lastLogin: new Date(),
    createdBy: 'system',
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Verificatoru',
    email: 'maria@vasilestie.ro',
    role: 'verificator',
    status: 'active',
    phone: '+40 123 456 790',
    department: 'Quality Assurance',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 ore în urmă
    createdBy: '1',
  },
  {
    id: '3',
    firstName: 'Ion',
    lastName: 'Suportescu',
    email: 'ion@vasilestie.ro',
    role: 'suport',
    status: 'active',
    phone: '+40 123 456 791',
    department: 'Customer Support',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
    createdBy: '1',
  },
];

let activityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'user.create',
    description: 'A creat un nou membru în echipă',
    targetId: '2',
    targetType: 'user',
    timestamp: new Date('2024-02-15'),
  },
  {
    id: '2',
    userId: '2',
    action: 'craftsman.verify',
    description: 'A verificat un meseriaș',
    targetId: 'craft-123',
    targetType: 'craftsman',
    timestamp: new Date(),
  },
];

export class AdminService {
  // ===== TEAM MEMBERS =====
  
  static async getTeamMembers(filters?: {
    role?: UserRole;
    status?: UserStatus;
    department?: string;
    search?: string;
  }): Promise<TeamMember[]> {
    let filtered = [...teamMembers];

    if (filters) {
      if (filters.role) {
        filtered = filtered.filter(member => member.role === filters.role);
      }
      if (filters.status) {
        filtered = filtered.filter(member => member.status === filters.status);
      }
      if (filters.department) {
        filtered = filtered.filter(member => member.department === filters.department);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(member => 
          member.firstName.toLowerCase().includes(search) ||
          member.lastName.toLowerCase().includes(search) ||
          member.email.toLowerCase().includes(search)
        );
      }
    }

    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  static async getTeamMember(id: string): Promise<TeamMember | null> {
    return teamMembers.find(member => member.id === id) || null;
  }

  static async createTeamMember(
    data: CreateTeamMemberRequest, 
    createdBy: string
  ): Promise<TeamMember> {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      status: 'pending',
      phone: data.phone,
      department: data.department,
      permissions: data.customPermissions,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy,
    };

    teamMembers.push(newMember);

    // Log activitatea
    await this.logActivity({
      userId: createdBy,
      action: 'user.create',
      description: `A creat un nou membru: ${data.firstName} ${data.lastName}`,
      targetId: newMember.id,
      targetType: 'user',
    });

    // TODO: Trimite email de bun venit dacă sendWelcomeEmail === true
    if (data.sendWelcomeEmail) {
      await this.sendWelcomeEmail(newMember);
    }

    return newMember;
  }

  static async updateTeamMember(
    id: string, 
    data: UpdateTeamMemberRequest,
    updatedBy: string
  ): Promise<TeamMember | null> {
    const memberIndex = teamMembers.findIndex(member => member.id === id);
    if (memberIndex === -1) return null;

    const member = teamMembers[memberIndex];
    const updatedMember = {
      ...member,
      ...data,
      updatedAt: new Date(),
    };

    teamMembers[memberIndex] = updatedMember;

    // Log activitatea
    await this.logActivity({
      userId: updatedBy,
      action: 'user.update',
      description: `A actualizat membrul: ${updatedMember.firstName} ${updatedMember.lastName}`,
      targetId: id,
      targetType: 'user',
      metadata: data,
    });

    return updatedMember;
  }

  static async deleteTeamMember(id: string, deletedBy: string): Promise<boolean> {
    const memberIndex = teamMembers.findIndex(member => member.id === id);
    if (memberIndex === -1) return false;

    const member = teamMembers[memberIndex];
    teamMembers.splice(memberIndex, 1);

    // Log activitatea
    await this.logActivity({
      userId: deletedBy,
      action: 'user.delete',
      description: `A șters membrul: ${member.firstName} ${member.lastName}`,
      targetId: id,
      targetType: 'user',
    });

    return true;
  }

  static async toggleMemberStatus(
    id: string, 
    status: UserStatus,
    updatedBy: string
  ): Promise<TeamMember | null> {
    const member = await this.updateTeamMember(id, { status }, updatedBy);
    
    if (member) {
      await this.logActivity({
        userId: updatedBy,
        action: 'user.status_change',
        description: `A ${status === 'active' ? 'activat' : 'dezactivat'} membrul: ${member.firstName} ${member.lastName}`,
        targetId: id,
        targetType: 'user',
      });
    }

    return member;
  }

  static async resetPassword(id: string, resetBy: string): Promise<boolean> {
    const member = await this.getTeamMember(id);
    if (!member) return false;

    // TODO: Implementează logica de reset parolă
    // - Generează token temporar
    // - Trimite email cu link de reset
    
    await this.logActivity({
      userId: resetBy,
      action: 'user.password_reset',
      description: `A resetat parola pentru: ${member.firstName} ${member.lastName}`,
      targetId: id,
      targetType: 'user',
    });

    return true;
  }

  // ===== ACTIVITY LOGS =====
  
  static async logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<void> {
    const log: ActivityLog = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    activityLogs.unshift(log); // Adaugă la început
    
    // Păstrează doar ultimele 1000 de log-uri
    if (activityLogs.length > 1000) {
      activityLogs = activityLogs.slice(0, 1000);
    }
  }

  static async getActivityLogs(filters?: {
    userId?: string;
    action?: string;
    targetType?: string;
    limit?: number;
    offset?: number;
  }): Promise<ActivityLog[]> {
    let filtered = [...activityLogs];

    if (filters) {
      if (filters.userId) {
        filtered = filtered.filter(log => log.userId === filters.userId);
      }
      if (filters.action) {
        filtered = filtered.filter(log => log.action === filters.action);
      }
      if (filters.targetType) {
        filtered = filtered.filter(log => log.targetType === filters.targetType);
      }

      const offset = filters.offset || 0;
      const limit = filters.limit || 50;
      filtered = filtered.slice(offset, offset + limit);
    }

    return filtered;
  }

  // ===== STATISTICS =====
  
  static async getTeamStats(): Promise<{
    totalMembers: number;
    activeMembers: number;
    membersByRole: Record<UserRole, number>;
    recentActivity: number;
  }> {
    const totalMembers = teamMembers.length;
    const activeMembers = teamMembers.filter(m => m.status === 'active').length;
    
    const membersByRole = teamMembers.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<UserRole, number>);

    // Activitatea din ultimele 24 ore
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentActivity = activityLogs.filter(log => log.timestamp > yesterday).length;

    return {
      totalMembers,
      activeMembers,
      membersByRole,
      recentActivity,
    };
  }

  // ===== HELPER METHODS =====
  
  private static async sendWelcomeEmail(member: TeamMember): Promise<void> {
    // TODO: Implementează trimiterea email-ului de bun venit
    console.log(`Sending welcome email to ${member.email}`);
    
    // Email ar trebui să conțină:
    // - Link de activare cont
    // - Instrucțiuni de primul login
    // - Informații despre rol și responsabilități
  }

  static async getDepartments(): Promise<string[]> {
    const departments = teamMembers
      .map(member => member.department)
      .filter(Boolean) as string[];
    
    return [...new Set(departments)].sort();
  }

  static async searchMembers(query: string): Promise<TeamMember[]> {
    const search = query.toLowerCase();
    return teamMembers.filter(member => 
      member.firstName.toLowerCase().includes(search) ||
      member.lastName.toLowerCase().includes(search) ||
      member.email.toLowerCase().includes(search) ||
      member.role.toLowerCase().includes(search) ||
      member.department?.toLowerCase().includes(search)
    );
  }
}
