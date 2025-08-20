'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/contexts/admin-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  UserCheck, 
  Activity,
  Calendar,
  Download,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

// Tip pentru perioada de analiză
type TimePeriod = 'today' | 'week' | 'month' | 'quarter' | 'year';

// Interfață pentru statistici
interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  userGrowth: number;
  totalCraftsmen: number;
  verifiedCraftsmen: number;
  pendingVerifications: number;
  craftsmenGrowth: number;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  bookingsGrowth: number;
  revenue: number;
  revenueGrowth: number;
}

// Mock data pentru demonstrație
const mockStats: PlatformStats = {
  totalUsers: 15420,
  activeUsers: 8750,
  newUsersToday: 43,
  userGrowth: 12.5,
  totalCraftsmen: 1240,
  verifiedCraftsmen: 892,
  pendingVerifications: 67,
  craftsmenGrowth: 8.3,
  totalBookings: 5680,
  completedBookings: 4920,
  cancelledBookings: 340,
  bookingsGrowth: 15.7,
  revenue: 284500,
  revenueGrowth: 22.1,
};

// Categorii de meseriași pentru analiză
const craftsmenCategories = [
  { id: 'electrician', name: 'Electricieni', count: 245, growth: 8.2 },
  { id: 'plumber', name: 'Instalatori', count: 189, growth: 12.4 },
  { id: 'carpenter', name: 'Dulgheri', count: 167, growth: 5.8 },
  { id: 'painter', name: 'Zugravi', count: 134, growth: 15.6 },
  { id: 'mechanic', name: 'Mecanici', count: 98, growth: -2.1 },
  { id: 'cleaner', name: 'Curățenie', count: 87, growth: 18.9 },
];

// Evoluție în timp (ultimele 12 luni)
const monthlyData = [
  { month: 'Ian', users: 12450, craftsmen: 980, bookings: 3200, revenue: 185000 },
  { month: 'Feb', users: 12890, craftsmen: 1010, bookings: 3450, revenue: 195500 },
  { month: 'Mar', users: 13250, craftsmen: 1045, bookings: 3680, revenue: 208900 },
  { month: 'Apr', users: 13680, craftsmen: 1078, bookings: 3920, revenue: 221200 },
  { month: 'Mai', users: 14120, craftsmen: 1112, bookings: 4150, revenue: 234800 },
  { month: 'Iun', users: 14520, craftsmen: 1145, bookings: 4380, revenue: 247300 },
  { month: 'Iul', users: 14890, craftsmen: 1178, bookings: 4620, revenue: 259600 },
  { month: 'Aug', users: 15250, craftsmen: 1205, bookings: 4850, revenue: 271900 },
  { month: 'Sep', users: 15420, craftsmen: 1240, bookings: 5680, revenue: 284500 },
];

export function ReportsSection() {
  const { state } = useAdmin();
  const { teamMembers, loading } = state;
  
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const [stats, setStats] = useState<PlatformStats>(mockStats);

  // Simulează încărcarea datelor în funcție de perioada selectată
  useEffect(() => {
    // În viitor, aici va fi un API call pentru a obține datele pentru perioada selectată
    setStats(mockStats);
  }, [selectedPeriod]);

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return `${(amount / 1000).toFixed(0)}K RON`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Rapoarte și Analize
          </h1>
          <p className="text-gray-600 mt-1">
            Monitorizarea performanței și creșterii platformei
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as TimePeriod)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Astăzi</SelectItem>
              <SelectItem value="week">Ultima săptămână</SelectItem>
              <SelectItem value="month">Ultima lună</SelectItem>
              <SelectItem value="quarter">Ultimul trimestru</SelectItem>
              <SelectItem value="year">Ultimul an</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Raport
          </Button>
        </div>
      </div>

      {/* Statistici principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Utilizatori */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              {getTrendIcon(stats.userGrowth)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Utilizatori</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalUsers)}</p>
              <p className={`text-sm ${getTrendColor(stats.userGrowth)}`}>
                {stats.userGrowth > 0 ? '+' : ''}{stats.userGrowth}% față de perioada anterioară
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Meseriași */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-orange-600" />
              </div>
              {getTrendIcon(stats.craftsmenGrowth)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Meseriași Verificați</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.verifiedCraftsmen)}</p>
              <p className={`text-sm ${getTrendColor(stats.craftsmenGrowth)}`}>
                {stats.craftsmenGrowth > 0 ? '+' : ''}{stats.craftsmenGrowth}% față de perioada anterioară
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rezervări */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              {getTrendIcon(stats.bookingsGrowth)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Rezervări Complete</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.completedBookings)}</p>
              <p className={`text-sm ${getTrendColor(stats.bookingsGrowth)}`}>
                {stats.bookingsGrowth > 0 ? '+' : ''}{stats.bookingsGrowth}% față de perioada anterioară
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Venituri */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              {getTrendIcon(stats.revenueGrowth)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Venituri Totale</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.revenue)}</p>
              <p className={`text-sm ${getTrendColor(stats.revenueGrowth)}`}>
                {stats.revenueGrowth > 0 ? '+' : ''}{stats.revenueGrowth}% față de perioada anterioară
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuția meseriaşilor pe categorii */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
              Meseriași pe Categorii
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {craftsmenCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {category.count}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(category.count / 245) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={`ml-4 text-sm flex items-center ${getTrendColor(category.growth)}`}>
                    {category.growth > 0 ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : category.growth < 0 ? (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    ) : (
                      <Minus className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(category.growth)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistici detaliate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-orange-500" />
              Metrici Cheie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Utilizatori Activi</p>
                <p className="text-2xl font-bold text-blue-900">{formatNumber(stats.activeUsers)}</p>
                <p className="text-xs text-blue-600">din {formatNumber(stats.totalUsers)} totali</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Rata de Succes</p>
                <p className="text-2xl font-bold text-green-900">
                  {((stats.completedBookings / stats.totalBookings) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-green-600">rezervări finalizate</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600 font-medium">În Așteptare</p>
                <p className="text-2xl font-bold text-orange-900">{stats.pendingVerifications}</p>
                <p className="text-xs text-orange-600">verificări pendinte</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Utilizatori Noi</p>
                <p className="text-2xl font-bold text-purple-900">{stats.newUsersToday}</p>
                <p className="text-xs text-purple-600">înregistrați astăzi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evoluția în timp */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
            Evoluția Platformei (Ultimele 9 Luni)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Grafic simplu cu bare */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Utilizatori Înregistrați</span>
                  <span className="text-sm text-gray-500">Creștere constantă</span>
                </div>
                <div className="flex items-end space-x-1 h-20">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{ 
                          height: `${(data.users / Math.max(...monthlyData.map(d => d.users))) * 100}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Rezervări Lunare</span>
                  <span className="text-sm text-gray-500">Trend ascendent</span>
                </div>
                <div className="flex items-end space-x-1 h-20">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-green-500 rounded-t"
                        style={{ 
                          height: `${(data.bookings / Math.max(...monthlyData.map(d => d.bookings))) * 100}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Venituri (K RON)</span>
                  <span className="text-sm text-gray-500">Accelerare în ultimele luni</span>
                </div>
                <div className="flex items-end space-x-1 h-20">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-purple-500 rounded-t"
                        style={{ 
                          height: `${(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 100}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acțiuni rapide */}
      <Card>
        <CardHeader>
          <CardTitle>Acțiuni Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="font-medium">Export Complet</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Descarcă toate datele într-un raport Excel
                </p>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span className="font-medium">Analiză Detaliată</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Vezi rapoarte detaliate pe categorii
                </p>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">Programează Raport</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Primește rapoarte automate pe email
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
