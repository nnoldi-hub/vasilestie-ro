'use client';

import { useState, useEffect } from 'react';
import { AdminProvider } from '@/lib/contexts/admin-context';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { TeamManagement } from '@/components/admin/team-management';
import { ActivitySection } from '@/components/admin/activity-section';
import { ReportsSection } from '@/components/admin/reports-section';
import { SettingsSection } from '@/components/admin/settings-section';
import { CraftsmenManagement } from '@/components/admin/craftsmen-management';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Settings, 
  Shield,
  BarChart3,
  MessageSquare,
  FileText,
  Hammer
} from 'lucide-react';

type AdminSection = 'dashboard' | 'team' | 'craftsmen' | 'activity' | 'settings' | 'reports';

const navigation = [
  {
    id: 'dashboard' as AdminSection,
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Vizualizare generală',
  },
  {
    id: 'team' as AdminSection,
    name: 'Echipa',
    icon: Users,
    description: 'Gestionare membri',
  },
  {
    id: 'craftsmen' as AdminSection,
    name: 'Meșteșugari',
    icon: Hammer,
    description: 'Aprobare conturi',
  },
  {
    id: 'activity' as AdminSection,
    name: 'Activitate',
    icon: Activity,
    description: 'Log-uri și istoric',
  },
  {
    id: 'reports' as AdminSection,
    name: 'Rapoarte',
    icon: BarChart3,
    description: 'Statistici și analize',
  },
  {
    id: 'settings' as AdminSection,
    name: 'Setări',
    icon: Settings,
    description: 'Configurări sistem',
  },
];

export function AdminLayout() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  // Handle hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && navigation.find(nav => nav.id === hash)) {
        setActiveSection(hash as AdminSection);
      }
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'team':
        return <TeamManagement />;
      case 'craftsmen':
        return <CraftsmenManagement />;
      case 'activity':
        return <ActivitySection />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    VasileStie.ro Admin
                  </h1>
                  <p className="text-sm text-gray-600">
                    Panou de administrare
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Super Admin
                </Badge>
                <Button variant="outline" size="sm">
                  Înapoi la site
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {navigation.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          window.location.hash = item.id;
                        }}
                        className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                          activeSection === item.id
                            ? 'bg-orange-50 text-orange-700 border border-orange-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 mr-3 ${
                          activeSection === item.id ? 'text-orange-500' : 'text-gray-400'
                        }`} />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
}
