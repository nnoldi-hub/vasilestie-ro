'use client';

import { useCollaborator } from '@/lib/contexts/colaborator-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lock } from 'lucide-react';

export function ContentSection() {
  const { state } = useCollaborator();

  if (!state.permissions.canViewContent) {
    return (
      <div className="p-6 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold mb-2">Acces restricționat</h2>
        <p className="text-gray-600">Nu aveți permisiunea să vedeți secțiunea de conținut.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestionare Conținut
          </h1>
          <p className="text-gray-600 mt-1">
            Administrați conținutul platformei
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Conținut în dezvoltare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Această secțiune este în dezvoltare.</p>
            <p className="text-sm text-gray-500 mt-2">Veți putea gestiona articole, pagini și alte conținuturi aici.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
