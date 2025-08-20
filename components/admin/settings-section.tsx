'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Settings, 
  Globe, 
  Mail, 
  Shield, 
  Database,
  Bell,
  Palette,
  Users,
  MessageSquare,
  Upload,
  Download,
  RefreshCcw,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Save
} from 'lucide-react';

// Tipuri pentru setările sistemului
interface SystemSettings {
  // Generale
  siteName: string;
  siteDescription: string;
  defaultLanguage: string;
  timezone: string;
  maintenanceMode: boolean;
  
  // Email
  smtpServer: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  
  // Notificări
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  adminAlerts: boolean;
  
  // Securitate
  passwordMinLength: number;
  requireEmailVerification: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  
  // Platformă
  autoApproveCraftsmen: boolean;
  commissionRate: number;
  maxBookingsPerUser: number;
  allowGuestBookings: boolean;
  requirePhoneVerification: boolean;
}

// Setări mock pentru demonstrație
const mockSettings: SystemSettings = {
  siteName: 'VasileStie.ro',
  siteDescription: 'Platforma care conectează clienții cu cei mai buni meseriași din România',
  defaultLanguage: 'ro',
  timezone: 'Europe/Bucharest',
  maintenanceMode: false,
  
  smtpServer: 'smtp.gmail.com',
  smtpPort: 587,
  smtpUsername: 'admin@vasilestie.ro',
  smtpPassword: '',
  fromEmail: 'noreply@vasilestie.ro',
  fromName: 'VasileStie.ro',
  
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  adminAlerts: true,
  
  passwordMinLength: 8,
  requireEmailVerification: true,
  twoFactorAuth: false,
  sessionTimeout: 120,
  maxLoginAttempts: 5,
  
  autoApproveCraftsmen: false,
  commissionRate: 5,
  maxBookingsPerUser: 10,
  allowGuestBookings: true,
  requirePhoneVerification: true,
};

export function SettingsSection() {
  const [settings, setSettings] = useState<SystemSettings>(mockSettings);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaving(true);
    
    // Simulează salvarea setărilor
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLastSaved(new Date());
    setSaving(false);
  };

  const resetToDefaults = () => {
    setSettings(mockSettings);
  };

  const systemInfo = {
    version: '2.1.0',
    environment: 'production',
    database: 'PostgreSQL 15.2',
    server: 'Ubuntu 22.04 LTS',
    phpVersion: 'N/A (Next.js)',
    diskUsage: '15.2 GB / 100 GB',
    lastBackup: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 ore în urmă
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Setări Sistem
          </h1>
          <p className="text-gray-600 mt-1">
            Configurări generale ale platformei și parametri administrativi
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {lastSaved && (
            <span className="text-sm text-gray-600">
              Ultima salvare: {lastSaved.toLocaleTimeString('ro-RO')}
            </span>
          )}
          <Button 
            onClick={saveSettings} 
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {saving ? (
              <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Se salvează...' : 'Salvează Modificările'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notificări</TabsTrigger>
          <TabsTrigger value="security">Securitate</TabsTrigger>
          <TabsTrigger value="platform">Platformă</TabsTrigger>
          <TabsTrigger value="system">Sistem</TabsTrigger>
        </TabsList>

        {/* Setări Generale */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-orange-500" />
                  Informații Site
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Nume Site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="siteDescription">Descriere Site</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="defaultLanguage">Limba Implicită</Label>
                  <Select 
                    value={settings.defaultLanguage} 
                    onValueChange={(value) => handleSettingChange('defaultLanguage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ro">Română</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hu">Magyar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Fus Orar</Label>
                  <Select 
                    value={settings.timezone} 
                    onValueChange={(value) => handleSettingChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Bucharest">Europa/București</SelectItem>
                      <SelectItem value="Europe/London">Europa/Londra</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-orange-500" />
                  Configurări Operaționale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Mod Mentenanță</Label>
                    <p className="text-sm text-gray-600">
                      Dezactivează temporar accesul public la site
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                  />
                </div>

                {settings.maintenanceMode && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="font-medium text-orange-800">Atenție!</span>
                    </div>
                    <p className="text-sm text-orange-700 mt-1">
                      Site-ul este în modul mentenanță. Utilizatorii nu pot accesa platforma.
                    </p>
                  </div>
                )}

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Acțiuni Rapide</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button variant="outline" size="sm">
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Curăță Cache-ul
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Backup Complet
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Resetează Setările
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmare Resetare</AlertDialogTitle>
                          <AlertDialogDescription>
                            Toate setările vor fi resetate la valorile implicite. 
                            Această acțiune nu poate fi anulată.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Anulează</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={resetToDefaults}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Resetează
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Setări Email */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-orange-500" />
                Configurări SMTP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="smtpServer">Server SMTP</Label>
                    <Input
                      id="smtpServer"
                      value={settings.smtpServer}
                      onChange={(e) => handleSettingChange('smtpServer', e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPort">Port SMTP</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => handleSettingChange('smtpPort', parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpUsername">Utilizator SMTP</Label>
                    <Input
                      id="smtpUsername"
                      value={settings.smtpUsername}
                      onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPassword">Parolă SMTP</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fromEmail">Email Expeditor</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={settings.fromEmail}
                      onChange={(e) => handleSettingChange('fromEmail', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="fromName">Nume Expeditor</Label>
                    <Input
                      id="fromName"
                      value={settings.fromName}
                      onChange={(e) => handleSettingChange('fromName', e.target.value)}
                    />
                  </div>

                  <div className="pt-6">
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Testează Configurația
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      Trimite un email de test pentru a verifica setările SMTP
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Setări Notificări */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-500" />
                Preferințe Notificări
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificări Email</Label>
                    <p className="text-sm text-gray-600">
                      Trimite notificări importante prin email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificări Push</Label>
                    <p className="text-sm text-gray-600">
                      Notificări în timp real în browser
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificări SMS</Label>
                    <p className="text-sm text-gray-600">
                      Trimite SMS pentru acțiuni critice
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Alerte Administratori</Label>
                    <p className="text-sm text-gray-600">
                      Notifică administratorii pentru evenimente importante
                    </p>
                  </div>
                  <Switch
                    checked={settings.adminAlerts}
                    onCheckedChange={(checked) => handleSettingChange('adminAlerts', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Setări Securitate */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-orange-500" />
                  Politici Parole
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="passwordMinLength">Lungime Minimă Parolă</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    min="6"
                    max="20"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="maxLoginAttempts">Încercări Maximum Login</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    min="3"
                    max="10"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Timeout Sesiune (minute)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="30"
                    max="480"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Opțiuni Securitate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Verificare Email Obligatorie</Label>
                    <p className="text-sm text-gray-600">
                      Utilizatorii trebuie să confirme email-ul la înregistrare
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Autentificare cu Doi Factori</Label>
                    <p className="text-sm text-gray-600">
                      Activează 2FA pentru toate conturile admin
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Setări Platformă */}
        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-500" />
                Configurări Platformă
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Auto-aprobare Meseriași</Label>
                      <p className="text-sm text-gray-600">
                        Aprobă automat meseriașii după înregistrare
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoApproveCraftsmen}
                      onCheckedChange={(checked) => handleSettingChange('autoApproveCraftsmen', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Permite Rezervări Oaspeți</Label>
                      <p className="text-sm text-gray-600">
                        Utilizatorii neînregistrați pot face rezervări
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowGuestBookings}
                      onCheckedChange={(checked) => handleSettingChange('allowGuestBookings', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Verificare Telefon Obligatorie</Label>
                      <p className="text-sm text-gray-600">
                        Meseriașii trebuie să verifice numărul de telefon
                      </p>
                    </div>
                    <Switch
                      checked={settings.requirePhoneVerification}
                      onCheckedChange={(checked) => handleSettingChange('requirePhoneVerification', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="commissionRate">Rata Comision (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={settings.commissionRate}
                      onChange={(e) => handleSettingChange('commissionRate', parseFloat(e.target.value))}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Comisionul luat din fiecare rezervare finalizată
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="maxBookingsPerUser">Maximum Rezervări per Utilizator</Label>
                    <Input
                      id="maxBookingsPerUser"
                      type="number"
                      min="1"
                      max="50"
                      value={settings.maxBookingsPerUser}
                      onChange={(e) => handleSettingChange('maxBookingsPerUser', parseInt(e.target.value))}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Numărul maximum de rezervări simultane per utilizator
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Informații Sistem */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-orange-500" />
                  Informații Sistem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Versiune</span>
                    <Badge variant="outline">{systemInfo.version}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Mediu</span>
                    <Badge variant={systemInfo.environment === 'production' ? 'default' : 'secondary'}>
                      {systemInfo.environment}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Bază de Date</span>
                    <span className="text-sm text-gray-900">{systemInfo.database}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Server</span>
                    <span className="text-sm text-gray-900">{systemInfo.server}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Spațiu Disk</span>
                    <span className="text-sm text-gray-900">{systemInfo.diskUsage}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Ultimul Backup</span>
                    <span className="text-sm text-gray-900">
                      {systemInfo.lastBackup.toLocaleDateString('ro-RO')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Servicii</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Server Web</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Bază de Date</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Conectată</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Cache Redis</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Activ</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Email SMTP</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Funcțional</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">SSL Certificate</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-600">Valid</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
