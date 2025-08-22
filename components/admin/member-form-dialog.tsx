'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/contexts/admin-context';
import { TeamMember, UserRole, CreateTeamMemberRequest, UpdateTeamMemberRequest } from '@/lib/types/admin';
import { ROLES } from '@/lib/types/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield, Mail, Phone, Building, Key, Upload } from 'lucide-react';

interface MemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: TeamMember | null;
  mode: 'create' | 'edit';
}

export function MemberFormDialog({ open, onOpenChange, member, mode }: MemberFormDialogProps) {
  const { actions, state } = useAdmin();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<CreateTeamMemberRequest | UpdateTeamMemberRequest>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'suport',
    department: '',
    sendWelcomeEmail: true,
  });

  const [selectedRole, setSelectedRole] = useState<UserRole>('suport');
  const [customPermissions, setCustomPermissions] = useState<string[]>([]);

  // Reset form when dialog opens/closes or member changes
  useEffect(() => {
    if (open) {
      if (mode === 'edit' && member) {
        setFormData({
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          phone: member.phone || '',
          department: member.department || '',
        });
        setSelectedRole(member.role);
        setCustomPermissions(member.permissions || []);
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          role: 'suport',
          department: '',
          sendWelcomeEmail: true,
        });
        setSelectedRole('suport');
        setCustomPermissions([]);
      }
    }
  }, [open, mode, member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        const createData: CreateTeamMemberRequest = {
          ...formData as CreateTeamMemberRequest,
          role: selectedRole,
          customPermissions: customPermissions.length > 0 ? customPermissions : undefined,
        };
        
        const success = await actions.createTeamMember(createData);
        if (success) {
          onOpenChange(false);
        }
      } else if (mode === 'edit' && member) {
        const updateData: UpdateTeamMemberRequest = {
          ...formData as UpdateTeamMemberRequest,
          role: selectedRole,
        };
        
        const success = await actions.updateTeamMember(member.id, updateData);
        if (success) {
          onOpenChange(false);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionToggle = (permission: string) => {
    setCustomPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const roleConfig = ROLES[selectedRole];
  const allPermissions = [
    'users.create', 'users.read', 'users.update', 'users.delete',
    'craftsmen.create', 'craftsmen.read', 'craftsmen.update', 'craftsmen.delete', 'craftsmen.verify',
    'services.create', 'services.read', 'services.update', 'services.delete', 'services.moderate',
    'content.create', 'content.read', 'content.update', 'content.delete', 'content.publish',
    'analytics.read', 'analytics.export',
    'settings.read', 'settings.update', 'system.backup', 'system.maintenance'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-orange-500" />
            {mode === 'create' ? 'Adaugă Membru Nou' : 'Editează Membru'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Completați informațiile pentru noul membru al echipei'
              : `Actualizați informațiile pentru ${member?.firstName} ${member?.lastName}`
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Informații Personale</TabsTrigger>
              <TabsTrigger value="role">Rol și Permisiuni</TabsTrigger>
              <TabsTrigger value="settings">Setări</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="w-4 h-4 mr-2" />
                    Informații de Bază
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prenume *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName">Nume *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10"
                        placeholder="+40 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="department">Departament</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="department"
                        value={formData.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="pl-10"
                        placeholder="ex: Customer Support, Marketing, etc."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Avatar Upload (placeholder) */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avatar</CardTitle>
                  <CardDescription>
                    Încărcați o fotografie pentru profil (opțional)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member?.avatar} />
                      <AvatarFallback>
                        {(formData.firstName || 'U')[0]}{(formData.lastName || 'U')[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Încarcă Fotografie
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Role and Permissions Tab */}
            <TabsContent value="role" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="w-4 h-4 mr-2" />
                    Rol și Accesuri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="role">Rol *</Label>
                    <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ROLES).map(([value, config]) => (
                          <SelectItem key={value} value={value}>
                            <span>{config.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-1">
                      {roleConfig.description}
                    </p>
                  </div>

                  {/* Role Permissions Preview */}
                  <div>
                    <Label>Permisiuni Implicite pentru Rol</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {roleConfig.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Custom Permissions */}
                  <div>
                    <Label>Permisiuni Suplimentare</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Adăugați permisiuni suplimentare față de cele implicite pentru rol
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {allPermissions
                        .filter(perm => !roleConfig.permissions.includes(perm))
                        .map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission}
                              checked={customPermissions.includes(permission)}
                              onCheckedChange={() => handlePermissionToggle(permission)}
                            />
                            <Label htmlFor={permission} className="text-sm">
                              {permission}
                            </Label>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Key className="w-4 h-4 mr-2" />
                    Setări Cont
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mode === 'create' && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sendWelcomeEmail"
                        checked={(formData as CreateTeamMemberRequest).sendWelcomeEmail || false}
                        onCheckedChange={(checked) => handleInputChange('sendWelcomeEmail', checked as boolean)}
                      />
                      <Label htmlFor="sendWelcomeEmail">
                        Trimite email de bun venit cu instrucțiuni de activare
                      </Label>
                    </div>
                  )}

                  {mode === 'edit' && (
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Informații Cont</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Creat: {member?.createdAt ? new Date(member.createdAt).toLocaleDateString('ro-RO') : 'N/A'}</p>
                          <p>Ultima actualizare: {member?.updatedAt ? new Date(member.updatedAt).toLocaleDateString('ro-RO') : 'N/A'}</p>
                          <p>Ultima autentificare: {member?.lastLogin ? new Date(member.lastLogin).toLocaleDateString('ro-RO') : 'Niciodată'}</p>
                        </div>
                      </div>
                      
                      <Button type="button" variant="outline" size="sm">
                        Resetează Parola
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Anulează
            </Button>
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? 'Se procesează...' : (mode === 'create' ? 'Creează Membru' : 'Actualizează Membru')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
