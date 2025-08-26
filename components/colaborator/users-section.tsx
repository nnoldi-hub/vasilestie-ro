'use client';

import { useState, useEffect } from 'react';
import { useCollaborator } from '@/lib/contexts/colaborator-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Filter,
  Eye,
  MoreHorizontal,
  UserCheck,
  UserX,
  Mail,
  Phone
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
  lastLogin?: string;
}

export function UsersSection() {
  const { state } = useCollaborator();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'USER' | 'CRAFTSMAN' | 'COLLABORATOR' | 'ADMINISTRATOR'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [emailContent, setEmailContent] = useState({
    subject: '',
    message: ''
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/colaborator/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        throw new Error('Failed to load users');
      }
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca utilizatorii",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loadUsers is stable

  // Toggle user status (activate/deactivate)
  const handleToggleUserStatus = async (userId: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    if (!state.permissions.canEditUsers) {
      toast({
        title: "Eroare",
        description: "Nu aveți permisiunea să modificați utilizatori",
        variant: "destructive"
      });
      return;
    }

    try {
      setActionLoading(userId);
      const response = await fetch(`/api/colaborator/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await loadUsers(); // Reload users list
        toast({
          title: "Succes",
          description: `Utilizatorul a fost ${newStatus === 'ACTIVE' ? 'activat' : 'dezactivat'} cu succes`
        });
      } else {
        throw new Error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: "Eroare",
        description: `Nu s-a putut ${newStatus === 'ACTIVE' ? 'activa' : 'dezactiva'} utilizatorul`,
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Send email to user
  const handleSendEmail = async () => {
    if (!selectedUser || !emailContent.subject.trim() || !emailContent.message.trim()) {
      toast({
        title: "Eroare",
        description: "Subiectul și mesajul sunt obligatorii",
        variant: "destructive"
      });
      return;
    }

    try {
      setActionLoading(selectedUser.id);
      const response = await fetch('/api/colaborator/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          subject: emailContent.subject,
          message: emailContent.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Succes",
          description: "Email-ul a fost trimis cu succes"
        });
        setShowEmailDialog(false);
        setEmailContent({ subject: '', message: '' });
        setSelectedUser(null);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite email-ul",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="default" className="bg-green-100 text-green-800">Activ</Badge>;
      case 'INACTIVE':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Inactiv</Badge>;
      case 'SUSPENDED':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Suspendat</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'USER': { label: 'Utilizator', color: 'bg-blue-100 text-blue-800' },
      'CRAFTSMAN': { label: 'Meșteșugar', color: 'bg-green-100 text-green-800' },
      'COLLABORATOR': { label: 'Colaborator', color: 'bg-purple-100 text-purple-800' },
      'ADMINISTRATOR': { label: 'Administrator', color: 'bg-red-100 text-red-800' },
    };
    const config = roleConfig[role as keyof typeof roleConfig] || { label: role, color: 'bg-gray-100 text-gray-800' };
    
    return <Badge variant="outline" className={config.color}>{config.label}</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  if (!state.permissions.canViewUsers) {
    return (
      <div className="p-6 text-center">
        <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold mb-2">Acces restricționat</h2>
        <p className="text-gray-600">Nu aveți permisiunea să vedeți secțiunea de utilizatori.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestionare Utilizatori
          </h1>
          <p className="text-gray-600 mt-1">
            Administrați conturile de utilizatori ale platformei
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Căutare după nume sau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={roleFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('all')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Toți
              </Button>
              <Button
                variant={roleFilter === 'USER' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('USER')}
              >
                Utilizatori
              </Button>
              <Button
                variant={roleFilter === 'CRAFTSMAN' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('CRAFTSMAN')}
              >
                Meșteșugari
              </Button>
              <Button
                variant={roleFilter === 'COLLABORATOR' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('COLLABORATOR')}
              >
                Colaboratori
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Lista Utilizatori ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Se încarcă utilizatorii...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Nu s-au găsit utilizatori</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nume</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data înregistrării</TableHead>
                  <TableHead>Ultima conectare</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('ro-RO')}
                    </TableCell>
                    <TableCell>
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ro-RO') : 'Niciodată'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setShowProfileDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Vezi profil
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEmailDialog(true);
                            }}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Trimite email
                          </DropdownMenuItem>
                          {state.permissions.canEditUsers && (
                            <>
                              {user.status === 'INACTIVE' ? (
                                <DropdownMenuItem
                                  onClick={() => handleToggleUserStatus(user.id, 'ACTIVE')}
                                  disabled={actionLoading === user.id}
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activează
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleToggleUserStatus(user.id, 'INACTIVE')}
                                  disabled={actionLoading === user.id}
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Dezactivează
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
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

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Profil Utilizator</DialogTitle>
            <DialogDescription>
              Informații detaliate despre utilizator
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Nume:</Label>
                    <p className="text-gray-900 mt-1">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Email:</Label>
                    <p className="text-gray-900 mt-1">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Rol:</Label>
                    <div className="mt-1">
                      {getRoleBadge(selectedUser.role)}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Status:</Label>
                    <div className="mt-1">
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Data înregistrării:</Label>
                    <p className="text-gray-900 mt-1">
                      {new Date(selectedUser.createdAt).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Ultima conectare:</Label>
                    <p className="text-gray-900 mt-1">
                      {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString('ro-RO') : 'Nu s-a conectat niciodată'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
              Închide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Trimite Email</DialogTitle>
            <DialogDescription>
              Trimite un email către {selectedUser?.name} ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-subject">Subiect *</Label>
              <Input
                id="email-subject"
                value={emailContent.subject}
                onChange={(e) => setEmailContent(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Introduceți subiectul email-ului"
              />
            </div>
            <div>
              <Label htmlFor="email-message">Mesaj *</Label>
              <Textarea
                id="email-message"
                value={emailContent.message}
                onChange={(e) => setEmailContent(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Introduceți mesajul email-ului"
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Anulează
            </Button>
            <Button 
              onClick={handleSendEmail}
              disabled={actionLoading === selectedUser?.id || !emailContent.subject.trim() || !emailContent.message.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {actionLoading === selectedUser?.id ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Se trimite...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Trimite Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
