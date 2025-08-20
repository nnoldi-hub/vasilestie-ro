'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/contexts/admin-context';
import { TeamMember, UserRole, UserStatus } from '@/lib/types/admin';
import { ROLES } from '@/lib/types/admin';
import { MemberFormDialog } from './member-form-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  Key,
  Filter,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TeamManagement() {
  const { state, actions } = useAdmin();
  const { teamMembers, filters, loading } = state;
  
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // Filter helpers
  const handleSearchChange = (value: string) => {
    actions.setFilters({ search: value });
  };

  const handleRoleFilter = (role: string) => {
    actions.setFilters({ role: role === 'all' ? undefined : role as UserRole });
  };

  const handleStatusFilter = (status: string) => {
    actions.setFilters({ status: status === 'all' ? undefined : status as UserStatus });
  };

  const clearFilters = () => {
    actions.clearFilters();
  };

  // Actions
  const handleToggleStatus = async (member: TeamMember) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    await actions.toggleMemberStatus(member.id, newStatus);
  };

  const handleResetPassword = async (member: TeamMember) => {
    if (confirm(`Resetați parola pentru ${member.firstName} ${member.lastName}?`)) {
      await actions.resetPassword(member.id);
    }
  };

  const handleDeleteMember = async () => {
    if (memberToDelete) {
      const success = await actions.deleteTeamMember(memberToDelete.id);
      if (success) {
        setMemberToDelete(null);
        setShowDeleteDialog(false);
      }
    }
  };

  const openDeleteDialog = (member: TeamMember) => {
    setMemberToDelete(member);
    setShowDeleteDialog(true);
  };

  const openEditDialog = (member: TeamMember) => {
    setSelectedMember(member);
    setShowEditDialog(true);
  };

  const getStatusBadge = (status: UserStatus) => {
    const variants = {
      active: { variant: 'default' as const, className: 'bg-green-100 text-green-800', label: 'Activ' },
      inactive: { variant: 'secondary' as const, className: 'bg-gray-100 text-gray-800', label: 'Inactiv' },
      pending: { variant: 'secondary' as const, className: 'bg-orange-100 text-orange-800', label: 'În așteptare' },
      suspended: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800', label: 'Suspendat' },
    };
    
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getRoleLabel = (role: UserRole) => {
    return ROLES[role].name;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestionare Echipă
          </h1>
          <p className="text-gray-600 mt-1">
            Administrați membrii echipei și rolurile lor
          </p>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adaugă Membru
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtrare și Căutare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <Label htmlFor="search">Căutare</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Nume, email..."
                  value={filters.search || ''}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <Label htmlFor="role">Rol</Label>
              <Select value={filters.role || 'all'} onValueChange={handleRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toate rolurile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate rolurile</SelectItem>
                  {Object.entries(ROLES).map(([value, config]) => (
                    <SelectItem key={value} value={value}>
                      {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status || 'all'} onValueChange={handleStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toate statusurile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate statusurile</SelectItem>
                  <SelectItem value="active">Activ</SelectItem>
                  <SelectItem value="inactive">Inactiv</SelectItem>
                  <SelectItem value="pending">În așteptare</SelectItem>
                  <SelectItem value="suspended">Suspendat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-end space-x-2">
              <Button variant="outline" onClick={clearFilters} size="sm">
                Resetează
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Membri Echipă ({teamMembers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                Nu s-au găsit membri care să corespundă criteriilor
              </div>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="mt-4"
              >
                Resetează filtrele
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membru</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Departament</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ultima activitate</TableHead>
                  <TableHead className="text-right">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.firstName[0]}{member.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.firstName} {member.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                          {member.phone && (
                            <div className="text-xs text-gray-400">
                              {member.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getRoleLabel(member.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {member.department || '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(member.status)}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {member.lastLogin 
                          ? member.lastLogin.toLocaleDateString('ro-RO')
                          : 'Niciodată'
                        }
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(member)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editează
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(member)}>
                            {member.status === 'active' ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Dezactivează
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activează
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(member)}>
                            <Key className="w-4 h-4 mr-2" />
                            Resetează parola
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => openDeleteDialog(member)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Șterge
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmare Ștergere</AlertDialogTitle>
            <AlertDialogDescription>
              Sunteți sigur că doriți să ștergeți membrul{' '}
              <strong>
                {memberToDelete?.firstName} {memberToDelete?.lastName}
              </strong>
              ? Această acțiune nu poate fi anulată.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMember}
              className="bg-red-600 hover:bg-red-700"
            >
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add/Edit Member Dialog */}
      <MemberFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        mode="create"
      />

      <MemberFormDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        member={selectedMember}
        mode="edit"
      />
    </div>
  );
}
