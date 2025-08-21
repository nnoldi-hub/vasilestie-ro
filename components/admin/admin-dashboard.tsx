'use client';

import { useAdmin } from '@/lib/contexts/admin-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Activity,
  Shield,
  Settings,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export function AdminDashboard() {
  const { state, actions } = useAdmin();
  const { stats, teamMembers, activityLogs, loading } = state;

  const handleAddMember = () => {
    // This will trigger the team management modal
    actions.setSelectedMember(null); // null means "add new member"
    // We need to notify the parent component to switch to team management
    // For now, we'll use a simple approach
    window.location.hash = '#team';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleViewTeam = () => {
    window.location.hash = '#team';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleViewActivity = () => {
    window.location.hash = '#activity';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleManageRoles = () => {
    window.location.hash = '#team';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  // Quick stats cards
  const statsCards = [
    {
      title: 'Total Membri',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Membri Activi',
      value: stats?.activeMembers || 0,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'În Așteptare',
      value: 0, // No pending status in current TeamMember type
      icon: UserPlus,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Activitate Recentă',
      value: stats?.recentActivity || 0,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  if (loading && !stats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Admin
          </h1>
          <p className="text-gray-600 mt-1">
            Gestionarea echipei și monitorizarea activității
          </p>
        </div>
        <Button 
          onClick={handleAddMember}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Adaugă Membru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value.toLocaleString()}
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-gray-600">
                  {stat.title === 'Activitate Recentă' ? 'ultimele 24h' : 'față de luna trecută'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuția pe roluri */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-orange-500" />
              Distribuția pe Roluri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.membersByRole && Object.entries(stats.membersByRole).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium capitalize">
                      {role === 'admin' ? 'Administrator' :
                       role === 'verificator' ? 'Verificator' :
                       role === 'suport' ? 'Suport' :
                       role === 'marketing' ? 'Marketing' :
                       role === 'moderator' ? 'Moderator' :
                       'Content Manager'}
                    </span>
                  </div>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membri Recenți */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-500" />
              Membri Recenți
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {member.role}
                    </p>
                  </div>
                  <Badge 
                    variant={member.status === 'active' ? 'default' : 'secondary'}
                    className={member.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {member.status === 'active' ? 'Activ' : 'Inactiv'}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={handleViewTeam}
              >
                Vezi toți membrii
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activitate Recentă */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-orange-500" />
              Activitate Recentă
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityLogs.slice(0, 5).map((log) => {
                const member = teamMembers.find(m => m.id === log.userId);
                return (
                  <div key={log.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">
                          {member ? member.name : 'Unknown'}
                        </span>{' '}
                        {log.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {log.timestamp.toLocaleDateString('ro-RO')} la{' '}
                        {log.timestamp.toLocaleTimeString('ro-RO', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={handleViewActivity}
              >
                Vezi toate activitățile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertă pentru membri în așteptare */}
      {false && ( // No pending status in current TeamMember type
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center p-4">
            <AlertCircle className="w-5 h-5 text-orange-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-800">
                Aveți 0 membri în așteptarea aprobării
              </p>
              <p className="text-xs text-orange-600">
                Verificați și activați conturile noi pentru a le permite accesul la platformă
              </p>
            </div>
            <Button 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleViewTeam}
            >
              Vezi membrii
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-orange-500" />
            Acțiuni Rapide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start" onClick={handleAddMember}>
              <UserPlus className="w-4 h-4 mr-2" />
              Adaugă Membru Nou
            </Button>
            <Button variant="outline" className="justify-start" onClick={handleManageRoles}>
              <Shield className="w-4 h-4 mr-2" />
              Gestionează Roluri
            </Button>
            <Button variant="outline" className="justify-start" onClick={handleViewActivity}>
              <Activity className="w-4 h-4 mr-2" />
              Raport Activitate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
