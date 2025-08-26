'use client';

import { useState } from 'react';
import { useCollaborator } from '@/lib/contexts/colaborator-context';
import { CollaboratorDashboard } from '@/components/colaborator/colaborator-dashboard';
import { CraftsmenSection } from '@/components/colaborator/craftsmen-section';
import { UsersSection } from '@/components/colaborator/users-section';
import { ContentSection } from '@/components/colaborator/content-section';
import { AnalyticsSection } from '@/components/colaborator/analytics-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Hammer,
  FileText,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';

type CollaboratorSection = 'dashboard' | 'craftsmen' | 'users' | 'content' | 'analytics';

const navigation = [
  {
    id: 'dashboard' as CollaboratorSection,
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Vizualizare generală',
    requiredPermission: null,
  },
  {
    id: 'craftsmen' as CollaboratorSection,
    name: 'Meșteșugari',
    icon: Hammer,
    description: 'Gestionare meșteșugari',
    requiredPermission: 'canViewCraftsmen' as const,
  },
  {
    id: 'users' as CollaboratorSection,
    name: 'Utilizatori',
    icon: Users,
    description: 'Gestionare utilizatori',
    requiredPermission: 'canViewUsers' as const,
  },
  {
    id: 'content' as CollaboratorSection,
    name: 'Conținut',
    icon: FileText,
    description: 'Gestionare conținut',
    requiredPermission: 'canViewContent' as const,
  },
  {
    id: 'analytics' as CollaboratorSection,
    name: 'Analiză',
    icon: BarChart3,
    description: 'Statistici și rapoarte',
    requiredPermission: 'canViewAnalytics' as const,
  },
];

export function CollaboratorLayout() {
  const { state, actions } = useCollaborator();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSectionChange = (sectionId: CollaboratorSection) => {
    actions.setActiveSection(sectionId);
  };

  const renderActiveSection = () => {
    switch (state.activeSection) {
      case 'dashboard':
        return <CollaboratorDashboard />;
      case 'craftsmen':
        return <CraftsmenSection />;
      case 'users':
        return <UsersSection />;
      case 'content':
        return <ContentSection />;
      case 'analytics':
        return <AnalyticsSection />;
      default:
        return <CollaboratorDashboard />;
    }
  };

  // Filter navigation based on permissions
  const availableNavigation = navigation.filter(item => {
    if (!item.requiredPermission) return true;
    return state.permissions[item.requiredPermission];
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Dashboard Colaborator
                  </h2>
                  <p className="text-sm text-gray-500">
                    Panoul de control
                  </p>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="ml-auto"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {availableNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = state.activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {item.description}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {!sidebarCollapsed && (
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Colaborator
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
