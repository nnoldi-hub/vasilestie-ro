'use client';

import { 
  Zap, Droplets, Hammer, Brush, TreePine, Car, Wrench, 
  Shield, Scissors, Trash2, Camera, BookOpen 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ToateServiciiPage() {
  const serviceCategories = [
    {
      title: 'Electricieni',
      icon: Zap,
      description: 'Instalații electrice, reparații, automatizări',
      servicesCount: '200+ specialiști',
      link: '/servicii/electricieni',
      color: 'yellow'
    },
    {
      title: 'Instalatori',
      icon: Droplets,
      description: 'Instalații sanitare, termice și de gaze',
      servicesCount: '150+ specialiști',
      link: '/servicii/instalatori',
      color: 'blue'
    },
    {
      title: 'Constructori',
      icon: Hammer,
      description: 'Construcții, renovări, amenajări',
      servicesCount: '100+ echipe',
      link: '/servicii/constructori',
      color: 'orange'
    },
    {
      title: 'Zugravi',
      icon: Brush,
      description: 'Vopsit interior/exterior, tapet, finisaje',
      servicesCount: '120+ specialiști',
      link: '/servicii/zugravi',
      color: 'purple'
    },
    {
      title: 'Grădinari',
      icon: TreePine,
      description: 'Amenajări grădini, întreținere spații verzi',
      servicesCount: '80+ peisagiști',
      link: '/servicii/gradinari',
      color: 'green'
    },
    {
      title: 'Mecanici auto',
      icon: Car,
      description: 'Reparații auto, întreținere, diagnosticare',
      servicesCount: '60+ service-uri',
      link: '/servicii/mecanici',
      color: 'gray'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-600',
      blue: 'bg-blue-100 text-blue-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Toate serviciile disponibile
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Descoperă întreaga gamă de servicii profesionale disponibile în București și împrejurimi.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((category, index) => (
                <Link key={index} href={category.link}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(category.color)}`}>
                        <category.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {category.description}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {category.servicesCount}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
