'use client';

import { useSession } from 'next-auth/react';
import { useCollaborator } from '@/lib/contexts/colaborator-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Hammer, 
  FileCheck, 
  Activity,
  TrendingUp,
  Clock,
  Shield,
  Eye
} from 'lucide-react';

export function CollaboratorDashboard() {
  const { data: session } = useSession();
  const { state, actions } = useCollaborator();

  const quickStats = [
    {
      name: 'Utilizatori Total',
      value: state.stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      trend: 'up'
    },
    {
      name: 'Meșteșugari',
      value: state.stats?.totalCraftsmen || 0,
      icon: Hammer,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      trend: 'up'
    },
    {
      name: 'Aprobare Necesară',
      value: state.stats?.pendingApprovals || 0,
      icon: FileCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-3%',
      trend: 'down'
    },
    {
      name: 'Activitate Recentă',
      value: state.stats?.recentActivity || 0,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%',
      trend: 'up'
    },
  ];

  const quickActions = [
    {
      title: 'Gestionează Meșteșugari',
      description: 'Vezi și aprobă cereri de înregistrare',
      icon: Hammer,
      action: () => actions.setActiveSection('craftsmen'),
      permission: 'canViewCraftsmen',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Vezi Utilizatori',
      description: 'Administrează conturile de utilizatori',
      icon: Users,
      action: () => actions.setActiveSection('users'),
      permission: 'canViewUsers',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Gestionează Conținut',
      description: 'Moderează și editează conținutul',
      icon: FileCheck,
      action: () => actions.setActiveSection('content'),
      permission: 'canViewContent',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Vezi Analiză',
      description: 'Rapoarte și statistici detaliate',
      icon: TrendingUp,
      action: () => actions.setActiveSection('analytics'),
      permission: 'canViewAnalytics',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
  ];

  // Filter actions based on permissions
  const availableActions = quickActions.filter(action => 
    state.permissions[action.permission as keyof typeof state.permissions]
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bună ziua, {session?.user?.name}!
          </h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Dashboard Colaborator - {session?.user?.role === 'ADMINISTRATOR' ? 'Administrator' : 'Colaborator'}
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Clock className="h-4 w-4 mr-2" />
          {new Date().toLocaleDateString('ro-RO', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <p className={`text-xs mt-1 flex items-center ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`h-3 w-3 mr-1 ${
                        stat.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      {stat.change} față de luna trecută
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Acțiuni Rapide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={action.action}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 rounded-full ${action.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>

          {availableActions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nu aveți permisiuni pentru acțiuni rapide.</p>
              <p className="text-sm">Contactați administratorul pentru mai multe drepturi de acces.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permissions Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Permisiunile Tale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(state.permissions).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  value ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <span className="text-sm text-gray-700">
                  {key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Preview */}
      {state.permissions.canViewLogs && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Activitate Recentă
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">Nou utilizator înregistrat</p>
                  <p className="text-xs text-gray-500">Acum 2 ore</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">Meșteșugar aprobat</p>
                  <p className="text-xs text-gray-500">Acum 4 ore</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">Conținut moderat</p>
                  <p className="text-xs text-gray-500">Acum 6 ore</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
