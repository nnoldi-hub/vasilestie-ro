'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Bell, 
  Settings,
  Eye,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Request {
  id: string;
  clientName: string;
  service: string;
  location: string;
  date: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  budget: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

interface Job {
  id: string;
  clientName: string;
  service: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  payment: string;
  rating?: number;
  review?: string;
}

export default function DashboardMesterias() {
  const router = useRouter();
  
  // Mock data - în realitate ar veni din API
  const [stats] = useState({
    totalEarnings: 5240,
    completedJobs: 127,
    averageRating: 4.8,
    responseRate: 95,
    thisMonth: {
      jobs: 18,
      earnings: 2100,
      newClients: 12
    }
  });

  const [requests] = useState<Request[]>([
    {
      id: '1',
      clientName: 'Maria Ionescu',
      service: 'Instalații electrice',
      location: 'Sector 1, București',
      date: '2024-01-20',
      status: 'pending',
      budget: '800-1200 RON',
      description: 'Înlocuire instalație electrică apartament 3 camere',
      urgency: 'high'
    },
    {
      id: '2',
      clientName: 'Alexandru Popa',
      service: 'Reparații prize',
      location: 'Sector 2, București', 
      date: '2024-01-22',
      status: 'pending',
      budget: '150-200 RON',
      description: 'Reparare 3 prize defecte în bucătărie',
      urgency: 'medium'
    },
    {
      id: '3',
      clientName: 'Elena Dumitrescu',
      service: 'Instalații electrice noi',
      location: 'Pipera, București',
      date: '2024-01-25',
      status: 'accepted',
      budget: '1500-2000 RON',
      description: 'Instalație electrică completă pentru casă nouă',
      urgency: 'low'
    }
  ]);

  const [recentJobs] = useState<Job[]>([
    {
      id: '1',
      clientName: 'Ion Popescu',
      service: 'Instalații electrice',
      date: '2024-01-15',
      status: 'completed',
      payment: '1200 RON',
      rating: 5,
      review: 'Lucrare excelentă, foarte profesionist!'
    },
    {
      id: '2',
      clientName: 'Ana Marinescu',
      service: 'Reparații siguranțe',
      date: '2024-01-18',
      status: 'completed',
      payment: '180 RON',
      rating: 4.5,
      review: 'Rapiditate și profesionalism. Recomand!'
    },
    {
      id: '3',
      clientName: 'Gheorghe Radu',
      service: 'Întreținere instalații',
      date: '2024-01-21',
      status: 'in-progress',
      payment: '300 RON'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'În așteptare', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      accepted: { label: 'Acceptat', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Finalizat', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Anulat', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
      scheduled: { label: 'Programat', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      'in-progress': { label: 'În progres', variant: 'default' as const, color: 'bg-orange-100 text-orange-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800', 
      high: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      low: 'Scăzută',
      medium: 'Medie',
      high: 'Urgentă'
    };

    return (
      <Badge className={colors[urgency as keyof typeof colors]}>
        {labels[urgency as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bună ziua, Ion Popescu!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificări
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/mesterias/profil')}
              >
                <User className="h-4 w-4 mr-2" />
                Profil
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Setări
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Câștiguri totale</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()} RON</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-green-600">
                  +{stats.thisMonth.earnings} RON luna aceasta
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lucrări finalizate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedJobs}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-blue-600">
                  +{stats.thisMonth.jobs} luna aceasta
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating mediu</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= stats.averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rata de răspuns</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-purple-600">
                  +{stats.thisMonth.newClients} clienți noi
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Cereri noi ({requests.filter(r => r.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="jobs">Lucrări active ({recentJobs.filter(j => j.status !== 'completed').length})</TabsTrigger>
            <TabsTrigger value="history">Istoric</TabsTrigger>
          </TabsList>

          {/* New Requests */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Cereri noi de la clienți</CardTitle>
                <CardDescription>
                  Răspunde rapid la cererile noi pentru a îmbunătăți rata de conversie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{request.clientName}</h3>
                            {getUrgencyBadge(request.urgency)}
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-lg text-blue-600 font-medium mb-1">{request.service}</p>
                          <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {request.date}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {request.budget}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-700 mb-2">{request.description}</p>
                        <p className="text-sm text-gray-500">📍 {request.location}</p>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex items-center space-x-3">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Acceptă cererea
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Vezi detalii
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            <XCircle className="h-4 w-4 mr-2" />
                            Refuză
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Jobs */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Lucrări active</CardTitle>
                <CardDescription>
                  Urmărește progresul lucrărilor în desfășurare
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.filter(job => job.status !== 'completed').map((job) => (
                    <div key={job.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{job.clientName}</h3>
                            {getStatusBadge(job.status)}
                          </div>
                          <p className="text-lg text-blue-600 font-medium mb-1">{job.service}</p>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {job.date}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.payment}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contactează clientul
                        </Button>
                        {job.status === 'in-progress' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Marchează ca finalizat
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Istoric lucrări</CardTitle>
                <CardDescription>
                  Toate lucrările finalizate și feedback-ul primit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.filter(job => job.status === 'completed').map((job) => (
                    <div key={job.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{job.clientName}</h3>
                            {getStatusBadge(job.status)}
                          </div>
                          <p className="text-lg text-blue-600 font-medium mb-1">{job.service}</p>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {job.date}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.payment}
                            </span>
                          </div>
                        </div>
                      </div>

                      {job.rating && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium">Rating:</span>
                            <div className="flex items-center">
                              {[1,2,3,4,5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${star <= job.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">({job.rating})</span>
                            </div>
                          </div>
                          {job.review && (
                            <p className="text-sm text-gray-700 italic">"{job.review}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
