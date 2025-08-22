'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import VasileLogo from '@/components/brand/vasile-logo';
import { LocationButton } from '@/components/ui/location-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  MapPin,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Hammer,
  Star,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [headerLocation, setHeaderLocation] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileLocation, setMobileLocation] = useState('');

  const handleHeaderSearch = () => {
    const params = new URLSearchParams();
    if (headerSearchQuery.trim()) {
      params.set('q', headerSearchQuery.trim());
    }
    if (headerLocation.trim()) {
      params.set('location', headerLocation.trim());
    }
    const url = `/servicii${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(url);
  };

  const handleMobileSearch = () => {
    const params = new URLSearchParams();
    if (mobileSearchQuery.trim()) {
      params.set('q', mobileSearchQuery.trim());
    }
    if (mobileLocation.trim()) {
      params.set('location', mobileLocation.trim());
    }
    const url = `/servicii${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent, isMobile: boolean) => {
    if (e.key === 'Enter') {
      if (isMobile) {
        handleMobileSearch();
      } else {
        handleHeaderSearch();
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center">
          {/* Logo */}
          <div className="mr-4">
            <Link href="/" className="flex items-center space-x-2">
              <VasileLogo size="md" />
            </Link>
          </div>

          {/* Center Search Bar - Hidden on mobile */}
          <div className="hidden mx-auto max-w-2xl flex-1 items-center justify-center md:flex">
            <div className="flex w-full max-w-xl items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Ce serviciu cauți?"
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, false)}
                  className="pl-10 pr-4 h-11 border-gray-200 focus:border-brand-primary/50"
                />
              </div>
              <div className="relative flex gap-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Oraș"
                    value={headerLocation}
                    onChange={(e) => setHeaderLocation(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, false)}
                    className="pl-10 pr-4 h-11 w-32 border-gray-200 focus:border-brand-primary/50"
                  />
                </div>
                <LocationButton
                  size="md"
                  showText={false}
                  onLocationDetected={(city) => setHeaderLocation(city)}
                  className="h-11 w-11 flex-shrink-0"
                />
              </div>
              <Button 
                className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                onClick={handleHeaderSearch}
              >
                Caută
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="/servicii"
              className="text-gray-700 hover:text-brand-primary font-medium"
            >
              Servicii
            </Link>
            <Link
              href="/devino-mesterias"
              className="text-gray-700 hover:text-brand-primary font-medium"
            >
              Devino meseriaș
            </Link>

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || undefined} alt={session.user.name || 'User'} />
                      <AvatarFallback>
                        {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {(session.user.role === 'SUPER_ADMIN' || session.user.role === 'ADMIN') && (
                    <DropdownMenuItem onClick={() => router.push('/admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  {session.user.role === 'CRAFTSMAN' ? (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/mesterias/dashboard')}>
                        <Hammer className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/mesterias/profil')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profilul meu</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/profil')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/comenzi')}>
                        <Hammer className="mr-2 h-4 w-4" />
                        <span>Comenzile mele</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notificări</span>
                    <Badge variant="destructive" className="ml-auto h-6 w-6 justify-center p-0">
                      3
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/setari')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Setări</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Ieșire</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-brand-primary font-medium"
                  >
                    Conectare
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
                  >
                    Înregistrare
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="ml-auto h-10 w-10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t bg-white md:hidden">
            <div className="container py-4">
              {/* Mobile Search */}
              <div className="space-y-3 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Ce serviciu cauți?"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, true)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Oraș"
                      value={mobileLocation}
                      onChange={(e) => setMobileLocation(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, true)}
                      className="pl-10"
                    />
                  </div>
                  <LocationButton
                    size="md"
                    showText={false}
                    onLocationDetected={(city) => setMobileLocation(city)}
                    className="flex-shrink-0"
                  />
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  onClick={handleMobileSearch}
                >
                  Caută
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                <Link
                  href="/servicii"
                  className="block py-2 text-gray-700 hover:text-brand-primary"
                >
                  Servicii
                </Link>
                <Link
                  href="/devino-mesterias"
                  className="block py-2 text-gray-700 hover:text-brand-primary"
                >
                  Devino meseriaș
                </Link>
              </div>

              {/* Mobile Auth */}
              {session?.user ? (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || undefined} alt={session.user.name || 'User'} />
                      <AvatarFallback>
                        {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-sm text-gray-500">{session.user.email}</p>
                    </div>
                  </div>
                  {(session.user.role === 'SUPER_ADMIN' || session.user.role === 'ADMIN') && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => router.push('/admin')}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Button>
                  )}
                  {session.user.role === 'CRAFTSMAN' ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => router.push('/mesterias/dashboard')}
                      >
                        <Hammer className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => router.push('/mesterias/profil')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profilul meu
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => router.push('/profil')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profil
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => router.push('/comenzi')}
                      >
                        <Hammer className="mr-2 h-4 w-4" />
                        Comenzile mele
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Ieșire
                  </Button>
                </div>
              ) : (
                <div className="mt-6 space-y-2">
                  <Link href="/auth/signin">
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      Conectare
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button
                      className="w-full bg-brand-primary hover:bg-brand-primary/90"
                    >
                      Înregistrare
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}