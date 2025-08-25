'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Users, 
  UserCheck, 
  UserX,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter
} from 'lucide-react';

interface Craftsman {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  phone: string;
  city: string;
  county: string;
  experience: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  subscriptionPlan: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function CraftsmenManagement() {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  useEffect(() => {
    fetchCraftsmen();
  }, []);

  const fetchCraftsmen = async () => {
    try {
      const response = await fetch('/api/admin/craftsmen');
      if (response.ok) {
        const data = await response.json();
        setCraftsmen(data);
      }
    } catch (error) {
      console.error('Error fetching craftsmen:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (craftsmanId: string) => {
    try {
      const response = await fetch(`/api/admin/craftsmen/${craftsmanId}/approve`, {
        method: 'PATCH',
      });
      
      if (response.ok) {
        fetchCraftsmen(); // Refresh data
      }
    } catch (error) {
      console.error('Error approving craftsman:', error);
    }
  };

  const handleReject = async (craftsmanId: string) => {
    try {
      const response = await fetch(`/api/admin/craftsmen/${craftsmanId}/reject`, {
        method: 'PATCH',
      });
      
      if (response.ok) {
        fetchCraftsmen(); // Refresh data
      }
    } catch (error) {
      console.error('Error rejecting craftsman:', error);
    }
  };

  const handleViewDetails = (craftsman: Craftsman) => {
    setSelectedCraftsman(craftsman);
    setShowDetailsDialog(true);
  };

  const filteredCraftsmen = craftsmen.filter(craftsman =>
    craftsman.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craftsman.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craftsman.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craftsman.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: craftsmen.length,
    verified: craftsmen.filter(c => c.verified).length,
    pending: craftsmen.filter(c => !c.verified).length,
    active: craftsmen.filter(c => c.subscriptionStatus === 'ACTIVE').length,
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Se încarcă...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestionare Meșteșugari
          </h1>
          <p className="text-gray-600 mt-1">
            Aprobă și gestionează conturile meșteșugărilor
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Meșteșugari
            </CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Verificați
            </CardTitle>
            <UserCheck className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.verified}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              În Așteptare
            </CardTitle>
            <Clock className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Abonament Activ
            </CardTitle>
            <UserCheck className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Caută după nume, email, oraș..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrează
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Craftsmen Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Meșteșugari ({filteredCraftsmen.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meșteșugar</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Locație</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Abonament</TableHead>
                <TableHead>Data Înregistrării</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCraftsmen.map((craftsman) => (
                <TableRow key={craftsman.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {craftsman.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{craftsman.user.name}</div>
                        <div className="text-sm text-gray-500">{craftsman.businessName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{craftsman.user.email}</div>
                      <div className="text-gray-500">{craftsman.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {craftsman.city}, {craftsman.county}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={craftsman.verified ? 'default' : 'secondary'}
                      className={craftsman.verified ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                    >
                      {craftsman.verified ? 'Verificat' : 'În așteptare'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={craftsman.subscriptionStatus === 'ACTIVE' ? 'default' : 'secondary'}
                      className={craftsman.subscriptionStatus === 'ACTIVE' ? 'bg-blue-100 text-blue-800' : ''}
                    >
                      {craftsman.subscriptionPlan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {new Date(craftsman.createdAt).toLocaleDateString('ro-RO')}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(craftsman)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {!craftsman.verified && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleApprove(craftsman.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleReject(craftsman.id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Informații Personale</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Nume:</strong> {selectedCraftsman.user.name}</div>
                  <div><strong>Email:</strong> {selectedCraftsman.user.email}</div>
                  <div><strong>Telefon:</strong> {selectedCraftsman.phone}</div>
                  <div><strong>Business:</strong> {selectedCraftsman.businessName}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Informații Profesionale</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Experiență:</strong> {selectedCraftsman.experience} ani</div>
                  <div><strong>Rating:</strong> {selectedCraftsman.rating}/5 ({selectedCraftsman.reviewCount} recenzii)</div>
                  <div><strong>Locație:</strong> {selectedCraftsman.city}, {selectedCraftsman.county}</div>
                  <div><strong>Verificat:</strong> {selectedCraftsman.verified ? 'Da' : 'Nu'}</div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2">Descriere Servicii</h4>
                <p className="text-sm text-gray-600">{selectedCraftsman.description}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Închide
            </Button>
            {selectedCraftsman && !selectedCraftsman.verified && (
              <>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApprove(selectedCraftsman.id);
                    setShowDetailsDialog(false);
                  }}
                >
                  Aprobă
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleReject(selectedCraftsman.id);
                    setShowDetailsDialog(false);
                  }}
                >
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
