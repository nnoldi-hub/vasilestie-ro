'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Calendar,
  User
} from 'lucide-react';

interface Order {
  id: string;
  serviceTitle: string;
  craftsmanName: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: Date;
  price: number;
  description: string;
}

// Mock data pentru comenzi
const mockOrders: Order[] = [
  {
    id: '1',
    serviceTitle: 'Instalații electrice apartament',
    craftsmanName: 'Ion Popescu',
    status: 'confirmed',
    date: new Date('2025-08-20'),
    price: 450,
    description: 'Instalare prize și întrerupătoare în living și dormitor'
  },
  {
    id: '2',
    serviceTitle: 'Reparații instalații sanitare',
    craftsmanName: 'Maria Ionescu',
    status: 'in_progress',
    date: new Date('2025-08-18'),
    price: 280,
    description: 'Înlocuire robinete și reparare scurgere'
  },
  {
    id: '3',
    serviceTitle: 'Vopsire exterior casă',
    craftsmanName: 'Gheorghe Marinescu',
    status: 'completed',
    date: new Date('2025-08-15'),
    price: 1200,
    description: 'Vopsire completă exterior casă cu vopsea lavabilă'
  }
];

function getStatusColor(status: Order['status']) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'in_progress':
      return 'bg-orange-100 text-orange-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusText(status: Order['status']) {
  switch (status) {
    case 'pending':
      return 'În așteptare';
    case 'confirmed':
      return 'Confirmat';
    case 'in_progress':
      return 'În progres';
    case 'completed':
      return 'Finalizat';
    case 'cancelled':
      return 'Anulat';
    default:
      return 'Necunoscut';
  }
}

function getStatusIcon(status: Order['status']) {
  switch (status) {
    case 'pending':
      return Clock;
    case 'confirmed':
      return CheckCircle;
    case 'in_progress':
      return Package;
    case 'completed':
      return CheckCircle;
    case 'cancelled':
      return XCircle;
    default:
      return Clock;
  }
}

export default function ComenziPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Comenzile mele
            </h1>
            <p className="text-gray-600">
              Urmărește statusul comenzilor tale și gestionează solicitările de servicii.
            </p>
          </div>

          {mockOrders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nu ai încă comenzi
                </h3>
                <p className="text-gray-600 mb-6">
                  Când vei solicita servicii de la meseriași, ele vor apărea aici.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Caută servicii
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-white border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <StatusIcon className="w-5 h-5 text-gray-500" />
                          <div>
                            <CardTitle className="text-lg">
                              {order.serviceTitle}
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                              Comandă #{order.id}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">Meseriași: </span>
                            <span className="ml-1">{order.craftsmanName}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="font-medium">Data: </span>
                            <span className="ml-1">
                              {order.date.toLocaleDateString('ro-RO')}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">Descriere: </span>
                            {order.description}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">
                              {order.price} RON
                            </span>
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Detalii
                            </Button>
                            
                            {order.status === 'completed' && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Evaluează
                              </Button>
                            )}
                            
                            {order.status === 'pending' && (
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                Anulează
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
