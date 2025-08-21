'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/contexts/admin-context';
import { ActivityLog, UserRole } from '@/lib/types/admin';
import { ROLES } from '@/lib/types/admin';
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
  Activity, 
  Search, 
  Filter, 
  Download,
  Calendar,
  User,
  Users,
  Shield,
  FileText,
  MessageSquare,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';

// Mapare acțiuni la iconuri și culori
const actionConfig = {
  'user.create': { icon: Users, color: 'text-green-600', bg: 'bg-green-100', label: 'Utilizator creat' },
  'user.update': { icon: User, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Utilizator actualizat' },
  'user.delete': { icon: Users, color: 'text-red-600', bg: 'bg-red-100', label: 'Utilizator șters' },
  'user.status_change': { icon: Shield, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Status schimbat' },
  'user.password_reset': { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Parolă resetată' },
  'craftsman.verify': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Meseriaș verificat' },
  'craftsman.create': { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Meseriaș creat' },
  'craftsman.update': { icon: User, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Meseriaș actualizat' },
  'content.create': { icon: FileText, color: 'text-green-600', bg: 'bg-green-100', label: 'Conținut creat' },
  'content.update': { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Conținut actualizat' },
  'system.settings': { icon: Settings, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Setări modificate' },
  'system.backup': { icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-100', label: 'Backup creat' },
  default: { icon: Activity, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Activitate' }
};

export function ActivitySection() {
  const { state } = useAdmin();
  const { activityLogs, teamMembers, loading } = state;
  
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    action: 'all',
    userId: 'all',
    dateFrom: '',
    dateTo: '',
  });

  // Actualizează logs filtrate când se schimbă filtrele sau datele
  useEffect(() => {
    let filtered = [...activityLogs];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(log => 
        log.description.toLowerCase().includes(search) ||
        log.action.toLowerCase().includes(search)
      );
    }

    if (filters.action && filters.action !== 'all') {
      filtered = filtered.filter(log => log.action === filters.action);
    }

    if (filters.userId && filters.userId !== 'all') {
      filtered = filtered.filter(log => log.userId === filters.userId);
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(log => log.timestamp >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // Sfârșitul zilei
      filtered = filtered.filter(log => log.timestamp <= toDate);
    }

    setFilteredLogs(filtered);
  }, [activityLogs, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      action: 'all',
      userId: 'all',
      dateFrom: '',
      dateTo: '',
    });
  };

  const getActionConfig = (action: string) => {
    return actionConfig[action as keyof typeof actionConfig] || actionConfig.default;
  };

  const getMemberName = (userId: string) => {
    const member = teamMembers.find(m => m.id === userId);
    return member ? member.name : 'Necunoscut';
  };

  const getMemberRole = (userId: string) => {
    const member = teamMembers.find(m => m.id === userId);
    if (!member) return '';
    
    // Map service roles to display names
    const roleNames: Record<string, string> = {
      'SUPER_ADMIN': 'Super Administrator',
      'ADMIN': 'Administrator',
      'MODERATOR': 'Moderator',
      'SUPPORT': 'Suport'
    };
    
    return roleNames[member.role] || member.role;
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Acum';
    if (diffInMinutes < 60) return `${diffInMinutes} min în urmă`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ore în urmă`;
    
    return timestamp.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Statistici pentru activitate
  const stats = {
    total: activityLogs.length,
    today: activityLogs.filter(log => {
      const today = new Date();
      const logDate = new Date(log.timestamp);
      return logDate.toDateString() === today.toDateString();
    }).length,
    thisWeek: activityLogs.filter(log => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return log.timestamp >= weekAgo;
    }).length,
    uniqueUsers: new Set(activityLogs.map(log => log.userId)).size,
  };

  // Acțiuni unice pentru filtru
  const uniqueActions = Array.from(new Set(activityLogs.map(log => log.action))).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Jurnal de Activitate
          </h1>
          <p className="text-gray-600 mt-1">
            Monitorizează toate acțiunile efectuate în sistem
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Statistici */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Activități</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Astăzi</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ultima săptămână</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilizatori Activi</p>
                <p className="text-2xl font-bold text-gray-900">{stats.uniqueUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtre */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtrare Activități
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Căutare */}
            <div className="md:col-span-2">
              <Label htmlFor="search">Căutare</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Căută în descrieri..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tip acțiune */}
            <div>
              <Label>Tip Acțiune</Label>
              <Select value={filters.action} onValueChange={(value) => handleFilterChange('action', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Toate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate acțiunile</SelectItem>
                  {uniqueActions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {getActionConfig(action).label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Utilizator */}
            <div>
              <Label>Utilizator</Label>
              <Select value={filters.userId} onValueChange={(value) => handleFilterChange('userId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Toți" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toți utilizatorii</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Data de la */}
            <div>
              <Label htmlFor="dateFrom">Data de la</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>

            {/* Data până la */}
            <div>
              <Label htmlFor="dateTo">Data până la</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              {filteredLogs.length} din {activityLogs.length} activități
            </span>
            <Button variant="outline" onClick={clearFilters} size="sm">
              Resetează filtrele
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de activități */}
      <Card>
        <CardHeader>
          <CardTitle>Activități Recente</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nicio activitate găsită
              </h3>
              <p className="text-gray-600">
                Nu există activități care să corespundă criteriilor de filtrare
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log) => {
                const config = getActionConfig(log.action);
                const IconComponent = config.icon;
                
                return (
                  <div key={log.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${config.bg}`}>
                      <IconComponent className={`w-5 h-5 ${config.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {getMemberName(log.userId)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {getMemberRole(log.userId)}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        {log.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Acțiune: {config.label}</span>
                          {log.targetType && (
                            <span>Tip: {log.targetType}</span>
                          )}
                          {log.targetId && (
                            <span>ID: {log.targetId}</span>
                          )}
                        </div>
                        
                        {log.metadata && (
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Eye className="w-3 h-3 mr-1" />
                            Detalii
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
