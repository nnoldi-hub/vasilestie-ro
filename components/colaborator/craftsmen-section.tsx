'use client';

import { useState, useEffect } from 'react';
import { useCollaborator } from '@/lib/contexts/colaborator-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Hammer, 
  Search, 
  Filter,
  UserCheck,
  UserX,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Craftsman {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  status: 'pending' | 'approved' | 'rejected';
  verificationStatus: 'unverified' | 'pending' | 'verified';
  createdAt: string;
  city: string;
}

export function CraftsmenSection() {
  const { state } = useCollaborator();
  const { toast } = useToast();
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadCraftsmen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loadCraftsmen is stable

  const loadCraftsmen = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/colaborator/craftsmen');
      if (response.ok) {
        const data = await response.json();
        setCraftsmen(data.craftsmen);
      } else {
        throw new Error('Failed to load craftsmen');
      }
    } catch (error) {
      console.error('Error loading craftsmen:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca meșteșugarii",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (craftsmanId: string) => {
    if (!state.permissions.canEditCraftsmen) {
      toast({
        title: "Eroare",
        description: "Nu aveți permisiunea să aprobați meșteșugari",
        variant: "destructive"
      });
      return;
    }

    try {
      setActionLoading(craftsmanId);
      const response = await fetch(`/api/colaborator/craftsmen/${craftsmanId}/approve`, {
        method: 'POST',
      });

      if (response.ok) {
        await loadCraftsmen();
        toast({
          title: "Succes",
          description: "Meșteșugarul a fost aprobat cu succes"
        });
      } else {
        throw new Error('Failed to approve craftsman');
      }
    } catch (error) {
      console.error('Error approving craftsman:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut aproba meșteșugarul",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (craftsmanId: string) => {
    if (!state.permissions.canEditCraftsmen) {
      toast({
        title: "Eroare",
        description: "Nu aveți permisiunea să respingeți meșteșugari",
        variant: "destructive"
      });
      return;
    }

    try {
      setActionLoading(craftsmanId);
      const response = await fetch(`/api/colaborator/craftsmen/${craftsmanId}/reject`, {
        method: 'POST',
      });

      if (response.ok) {
        await loadCraftsmen();
        toast({
          title: "Succes",
          description: "Meșteșugarul a fost respins"
        });
      } else {
        throw new Error('Failed to reject craftsman');
      }
    } catch (error) {
      console.error('Error rejecting craftsman:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut respinge meșteșugarul",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" />În așteptare</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Aprobat</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Respins</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredCraftsmen = craftsmen.filter(craftsman => {
    const matchesSearch = craftsman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         craftsman.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         craftsman.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || craftsman.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (!state.permissions.canViewCraftsmen) {
    return (
      <div className="p-6 text-center">
        <Hammer className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold mb-2">Acces restricționat</h2>
        <p className="text-gray-600">Nu aveți permisiunea să vedeți secțiunea de meșteșugari.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestionare Meșteșugari
          </h1>
          <p className="text-gray-600 mt-1">
            Administrați cererile și profilurile meșteșugarilor
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
                  placeholder="Căutare după nume, email sau oraș..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Toți
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                În așteptare
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('approved')}
              >
                Aprobați
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('rejected')}
              >
                Respinși
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Hammer className="h-5 w-5 mr-2" />
            Lista Meșteșugari ({filteredCraftsmen.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Se încarcă meșteșugarii...</p>
            </div>
          ) : filteredCraftsmen.length === 0 ? (
            <div className="text-center py-8">
              <Hammer className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Nu s-au găsit meșteșugari</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nume</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Oraș</TableHead>
                  <TableHead>Servicii</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data înregistrării</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCraftsmen.map((craftsman) => (
                  <TableRow key={craftsman.id}>
                    <TableCell className="font-medium">{craftsman.name}</TableCell>
                    <TableCell>{craftsman.email}</TableCell>
                    <TableCell>{craftsman.phone}</TableCell>
                    <TableCell>{craftsman.city}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {craftsman.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {craftsman.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{craftsman.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(craftsman.status)}
                    </TableCell>
                    <TableCell>
                      {new Date(craftsman.createdAt).toLocaleDateString('ro-RO')}
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
                              setSelectedCraftsman(craftsman);
                              setShowDetailsDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Vezi detalii
                          </DropdownMenuItem>
                          {state.permissions.canEditCraftsmen && craftsman.status === 'pending' && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleApprove(craftsman.id)}
                                disabled={actionLoading === craftsman.id}
                              >
                                <UserCheck className="h-4 w-4 mr-2" />
                                Aprobă
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleReject(craftsman.id)}
                                disabled={actionLoading === craftsman.id}
                              >
                                <UserX className="h-4 w-4 mr-2" />
                                Respinge
                              </DropdownMenuItem>
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

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalii Meșteșugar</DialogTitle>
            <DialogDescription>
              Informații complete despre meșteșugar
            </DialogDescription>
          </DialogHeader>
          {selectedCraftsman && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Nume:</p>
                  <p>{selectedCraftsman.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>{selectedCraftsman.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Telefon:</p>
                  <p>{selectedCraftsman.phone}</p>
                </div>
                <div>
                  <p className="font-semibold">Oraș:</p>
                  <p>{selectedCraftsman.city}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Servicii oferite:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCraftsman.services.map((service, index) => (
                    <Badge key={index} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold">Status:</p>
                  {getStatusBadge(selectedCraftsman.status)}
                </div>
                <div>
                  <p className="font-semibold">Verificare:</p>
                  <Badge variant={selectedCraftsman.verificationStatus === 'verified' ? 'default' : 'secondary'}>
                    {selectedCraftsman.verificationStatus}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Închide
            </Button>
            {state.permissions.canEditCraftsmen && selectedCraftsman?.status === 'pending' && (
              <>
                <Button
                  onClick={() => {
                    handleApprove(selectedCraftsman.id);
                    setShowDetailsDialog(false);
                  }}
                  disabled={actionLoading === selectedCraftsman.id}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Aprobă
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleReject(selectedCraftsman.id);
                    setShowDetailsDialog(false);
                  }}
                  disabled={actionLoading === selectedCraftsman.id}
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Respinge
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
