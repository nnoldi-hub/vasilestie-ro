// Tipuri pentru sistemul de administrare VasileStie.ro

export type UserRole = 
  | 'ADMINISTRATOR' 
  | 'COLLABORATOR';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'craftsmen' | 'bookings' | 'content' | 'marketing' | 'system';
}

export interface RoleConfig {
  id: UserRole;
  name: string;
  description: string;
  color: string;
  permissions: string[];
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  createdBy: string; // ID-ul adminului care l-a creat
  permissions?: string[]; // permisiuni custom suplimentare
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  targetId?: string; // ID-ul obiectului afectat
  targetType?: 'user' | 'craftsman' | 'booking' | 'content';
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface CreateTeamMemberRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
  customPermissions?: string[];
  sendWelcomeEmail?: boolean;
}

export interface UpdateTeamMemberRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  phone?: string;
  department?: string;
  customPermissions?: string[];
}

// Configurarea rolurilor și permisiunilor
export const PERMISSIONS: Permission[] = [
  // Utilizatori
  { id: 'users.view', name: 'Vezi utilizatori', description: 'Poate vizualiza lista utilizatorilor', category: 'users' },
  { id: 'users.create', name: 'Creează utilizatori', description: 'Poate crea noi utilizatori', category: 'users' },
  { id: 'users.edit', name: 'Editează utilizatori', description: 'Poate edita informațiile utilizatorilor', category: 'users' },
  { id: 'users.delete', name: 'Șterge utilizatori', description: 'Poate șterge utilizatori', category: 'users' },
  { id: 'users.roles', name: 'Gestionează roluri', description: 'Poate atribui și modifica roluri', category: 'users' },

  // Meșteri
  { id: 'craftsmen.view', name: 'Vezi meșteri', description: 'Poate vizualiza lista meșterilor', category: 'craftsmen' },
  { id: 'craftsmen.verify', name: 'Verifică meșteri', description: 'Poate aproba și verifica meșteri', category: 'craftsmen' },
  { id: 'craftsmen.edit', name: 'Editează meșteri', description: 'Poate edita profilurile meșterilor', category: 'craftsmen' },
  { id: 'craftsmen.suspend', name: 'Suspendă meșteri', description: 'Poate suspenda sau activa meșteri', category: 'craftsmen' },

  // Rezervări
  { id: 'bookings.view', name: 'Vezi rezervări', description: 'Poate vizualiza rezervările', category: 'bookings' },
  { id: 'bookings.manage', name: 'Gestionează rezervări', description: 'Poate modifica și anula rezervări', category: 'bookings' },
  { id: 'bookings.support', name: 'Suport rezervări', description: 'Poate oferi suport pentru rezervări', category: 'bookings' },

  // Conținut
  { id: 'content.view', name: 'Vezi conținut', description: 'Poate vizualiza conținutul', category: 'content' },
  { id: 'content.create', name: 'Creează conținut', description: 'Poate crea nou conținut', category: 'content' },
  { id: 'content.edit', name: 'Editează conținut', description: 'Poate edita conținutul existent', category: 'content' },
  { id: 'content.publish', name: 'Publică conținut', description: 'Poate publica și depublica conținut', category: 'content' },

  // Marketing
  { id: 'marketing.campaigns', name: 'Gestionează campanii', description: 'Poate crea și gestiona campanii', category: 'marketing' },
  { id: 'marketing.analytics', name: 'Vezi analitica', description: 'Poate accesa rapoartele de marketing', category: 'marketing' },
  { id: 'marketing.emails', name: 'Gestionează email-uri', description: 'Poate trimite campanii email', category: 'marketing' },

  // Sistem
  { id: 'system.settings', name: 'Setări sistem', description: 'Poate modifica setările sistemului', category: 'system' },
  { id: 'system.logs', name: 'Vezi log-uri', description: 'Poate vizualiza log-urile sistemului', category: 'system' },
  { id: 'system.backup', name: 'Backup sistem', description: 'Poate face și restaura backup-uri', category: 'system' },
];

export const ROLES: Record<UserRole, RoleConfig> = {
  ADMINISTRATOR: {
    id: 'ADMINISTRATOR',
    name: 'Administrator',
    description: 'Acces complet la toate funcționalitățile sistemului',
    color: '#DC2626', // red-600
    permissions: PERMISSIONS.map(p => p.id), // Toate permisiunile
  },
  COLLABORATOR: {
    id: 'COLLABORATOR',
    name: 'Colaborator',
    description: 'Acces la funcționalități selectate de administrator',
    color: '#2563EB', // blue-600
    permissions: [
      // Permisiuni de bază - pot fi modificate de administrator
      'users.view',
      'craftsmen.view',
      'system.logs',
    ],
  },
};

// Helper functions
export function getRoleConfig(role: UserRole): RoleConfig {
  return ROLES[role];
}

export function hasPermission(userRole: UserRole, permission: string, customPermissions: string[] = []): boolean {
  const rolePermissions = ROLES[userRole]?.permissions || [];
  return rolePermissions.includes(permission) || customPermissions.includes(permission);
}

export function getPermissionsByCategory(category: Permission['category']): Permission[] {
  return PERMISSIONS.filter(p => p.category === category);
}

export function getFullName(member: TeamMember): string {
  return `${member.firstName} ${member.lastName}`;
}

export function getStatusColor(status: UserStatus): string {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100';
    case 'inactive':
      return 'text-red-600 bg-red-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}
