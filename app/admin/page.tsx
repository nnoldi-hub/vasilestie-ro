'use client';

import { useState, useEffect } from 'react';
import { Shield, User, CheckCircle, XCircle, Clock, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

// Tipuri pentru verificare
type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'reviewing';

interface VerificationRequest {
  id: string;
  craftsman: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    category: string;
    location: string;
    avatar?: string;
  };
  documents: {
    identity: { uploaded: boolean; url?: string; status: VerificationStatus };
    experience: { uploaded: boolean; url?: string; status: VerificationStatus };
    references: { uploaded: boolean; url?: string; status: VerificationStatus };
    portfolio: { uploaded: boolean; url?: string; status: VerificationStatus };
  };
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  overallStatus: VerificationStatus;
  notes?: string;
}

export default function AdminPage() {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<VerificationRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  // Date mock pentru demonstrație
  const mockRequests: VerificationRequest[] = [
    {
      id: '1',
      craftsman: {
        firstName: 'Ion',
        lastName: 'Popescu',
        email: 'ion.popescu@email.com',
        phone: '0721234567',
        category: 'electrician',
        location: 'București',
      },
      documents: {
        identity: { uploaded: true, status: 'approved' },
        experience: { uploaded: true, status: 'approved' },
        references: { uploaded: true, status: 'pending' },
        portfolio: { uploaded: false, status: 'pending' },
      },
      submittedAt: '2024-01-15T10:30:00Z',
      overallStatus: 'reviewing',
    },
    {
      id: '2',
      craftsman: {
        firstName: 'Maria',
        lastName: 'Ionescu',
        email: 'maria.ionescu@email.com',
        phone: '0731234567',
        category: 'designer',
        location: 'Cluj-Napoca',
      },
      documents: {
        identity: { uploaded: true, status: 'approved' },
        experience: { uploaded: true, status: 'approved' },
        references: { uploaded: true, status: 'approved' },
        portfolio: { uploaded: true, status: 'approved' },
      },
      submittedAt: '2024-01-14T15:20:00Z',
      reviewedAt: '2024-01-15T09:15:00Z',
      reviewedBy: 'Admin',
      overallStatus: 'approved',
    },
    {
      id: '3',
      craftsman: {
        firstName: 'Alexandru',
        lastName: 'Drăgan',
        email: 'alex.dragan@email.com',
        phone: '0741234567',
        category: 'carpenter',
        location: 'Timișoara',
      },
      documents: {
        identity: { uploaded: true, status: 'pending' },
        experience: { uploaded: true, status: 'pending' },
        references: { uploaded: false, status: 'pending' },
        portfolio: { uploaded: true, status: 'pending' },
      },
      submittedAt: '2024-01-16T08:45:00Z',
      overallStatus: 'pending',
    },
  ];

  useEffect(() => {
    setMounted(true);
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  useEffect(() => {
    let filtered = requests;

    if (searchQuery) {
      filtered = filtered.filter(req => 
        req.craftsman.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.craftsman.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.craftsman.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.overallStatus === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(req => req.craftsman.category === categoryFilter);
    }

    setFilteredRequests(filtered);
  }, [searchQuery, statusFilter, categoryFilter, requests]);

  const categories = [
    { id: 'electrician', label: 'Electrician' },
    { id: 'plumber', label: 'Instalator' },
    { id: 'carpenter', label: 'Dulgherie' },
    { id: 'painter', label: 'Zugrav' },
    { id: 'designer', label: 'Designer' },
    { id: 'mechanic', label: 'Mecanic' },
  ];

  const getStatusBadge = (status: VerificationStatus) => {
    const statusConfig = {
      pending: { label: 'În așteptare', variant: 'secondary' as const, icon: <Clock className="h-3 w-3" /> },
      reviewing: { label: 'În verificare', variant: 'default' as const, icon: <Shield className="h-3 w-3" /> },
      approved: { label: 'Aprobat', variant: 'default' as const, icon: <CheckCircle className="h-3 w-3" /> },
      rejected: { label: 'Respins', variant: 'destructive' as const, icon: <XCircle className="h-3 w-3" /> },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, overallStatus: 'approved' as VerificationStatus, reviewedAt: new Date().toISOString(), reviewedBy: 'Admin' }
        : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, overallStatus: 'rejected' as VerificationStatus, reviewedAt: new Date().toISOString(), reviewedBy: 'Admin' }
        : req
    ));
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.overallStatus === 'pending').length,
    reviewing: requests.filter(r => r.overallStatus === 'reviewing').length,
    approved: requests.filter(r => r.overallStatus === 'approved').length,
    rejected: requests.filter(r => r.overallStatus === 'rejected').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Admin - Verificări
          </h1>
        </div>
        <p className="text-gray-600">
          Gestionează cererile de verificare pentru meseriași
        </p>
      </div>

      {/* Statistici */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total cereri</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">În așteptare</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.reviewing}</div>
            <div className="text-sm text-gray-600">În verificare</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Aprobate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Respinse</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtre */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Filtre și Căutare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Caută după nume sau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="pending">În așteptare</SelectItem>
                <SelectItem value="reviewing">În verificare</SelectItem>
                <SelectItem value="approved">Aprobate</SelectItem>
                <SelectItem value="rejected">Respinse</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate categoriile</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabel cereri */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Cereri de Verificare</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meseriaș</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Categorie</TableHead>
                  <TableHead>Documente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data cererii</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold">
                          {request.craftsman.firstName.charAt(0)}{request.craftsman.lastName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">
                            {request.craftsman.firstName} {request.craftsman.lastName}
                          </div>
                          <div className="text-sm text-gray-600">
                            📍 {request.craftsman.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{request.craftsman.email}</div>
                        <div className="text-gray-600">{request.craftsman.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {categories.find(c => c.id === request.craftsman.category)?.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {Object.entries(request.documents).map(([key, doc]) => (
                          <div key={key} className="flex items-center gap-2 text-xs">
                            {doc.uploaded ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <XCircle className="h-3 w-3 text-gray-400" />
                            )}
                            <span className="capitalize">{key}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(request.overallStatus)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(request.submittedAt).toLocaleDateString('ro-RO')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {request.overallStatus !== 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {request.overallStatus !== 'rejected' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nu au fost găsite cereri cu criteriile selectate.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
