import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import VasileLogo from '@/components/brand/vasile-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Servicii',
      links: [
        { name: 'Electricieni', href: '/servicii?category=electrician' },
        { name: 'Instalatori', href: '/servicii?category=plumber' },
        { name: 'Dulgheri', href: '/servicii?category=carpenter' },
        { name: 'Zugravi', href: '/servicii?category=painter' },
        { name: 'Designeri', href: '/servicii?category=designer' },
        { name: 'Mecanici', href: '/servicii?category=mechanic' },
      ],
    },
    {
      title: 'Pentru Meseriași',
      links: [
        { label: 'Înregistrează-te', href: '/devino-mesterias' },
        { label: 'Cum funcționează', href: '/mesterias/cum-functioneaza' },
        { label: 'Verificare cont', href: '/mesterias/verificare' },
        { label: 'Susținere', href: '/mesterias/suport' },
      ],
    },
    {
      title: 'Companie',
      links: [
        { label: 'Despre noi', href: '/despre' },
        { label: 'Blog', href: '/blog' },
        { label: 'Presă', href: '/presa' },
        { label: 'Cariere', href: '/cariere' },
      ],
    },
    {
      title: 'Suport',
      links: [
        { label: 'Centru de ajutor', href: '/ajutor' },
        { label: 'Siguranță', href: '/siguranta' },
        { label: 'Termeni și condiții', href: '/termeni' },
        { label: 'Politica de confidențialitate', href: '/confidentialitate' },
        { label: 'Politica cookies', href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="bg-brand-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Rămâi la curent cu cele mai noi servicii
            </h3>
            <p className="text-brand-primary/80 mb-8 max-w-2xl mx-auto">
              Abonează-te să afli primul când Vasile descoperă meseriași noi de încredere în zona ta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 bg-white text-gray-900"
              />
              <Button className="bg-brand-primary/20 hover:bg-brand-primary/30 text-white border-white/20 whitespace-nowrap">
                Abonează-te
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <VasileLogo size="md" />
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Când ai nevoie, mesteras.ro răspunde. Meseriașii de încredere, la un click distanță.
            </p>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+40 74 017 3581</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@vasilestie.ro</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Ilfov, România</span>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-brand-primary text-sm transition-colors"
                    >
                      {'label' in link ? link.label : link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} Vasilestie.ro. Toate drepturile rezervate.
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-brand-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <Link href="/admin" className="text-gray-600 hover:text-brand-primary transition-colors">
                Admin
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/api/status" className="text-gray-600 hover:text-brand-primary transition-colors">
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
