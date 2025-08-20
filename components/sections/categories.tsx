'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  TreePine,
  Sparkles,
  Car,
  Home,
  Laptop,
  Camera,
  Scissors,
  Utensils,
} from 'lucide-react';

export function Categories() {
  const categories = [
    {
      id: 'electricieni',
      name: 'Electricieni',
      icon: Zap,
      count: 245,
      color: 'bg-yellow-100 text-yellow-700',
      description: 'Instalații electrice, reparații, întreținere',
    },
    {
      id: 'instalatori',
      name: 'Instalatori',
      icon: Wrench,
      count: 189,
      color: 'bg-blue-100 text-blue-700',
      description: 'Instalații sanitare, încălzire, climatizare',
    },
    {
      id: 'constructori',
      name: 'Constructori',
      icon: Hammer,
      count: 156,
      color: 'bg-orange-100 text-orange-700',
      description: 'Construcții, renovări, amenajări',
    },
    {
      id: 'zugravi',
      name: 'Zugravi',
      icon: Paintbrush,
      count: 134,
      color: 'bg-purple-100 text-purple-700',
      description: 'Vopsitorii, zugraveli, finisaje',
    },
    {
      id: 'gradinari',
      name: 'Grădinari',
      icon: TreePine,
      count: 98,
      color: 'bg-green-100 text-green-700',
      description: 'Amenajări peisagistice, întreținere grădini',
    },
    {
      id: 'curatenie',
      name: 'Curățenie',
      icon: Sparkles,
      count: 87,
      color: 'bg-cyan-100 text-cyan-700',
      description: 'Curățenie profesională, menaj',
    },
    {
      id: 'auto',
      name: 'Service Auto',
      icon: Car,
      count: 76,
      color: 'bg-red-100 text-red-700',
      description: 'Reparații auto, întreținere, diagnosticare',
    },
    {
      id: 'mobila',
      name: 'Mobilier',
      icon: Home,
      count: 65,
      color: 'bg-amber-100 text-amber-700',
      description: 'Mobilier la comandă, reparații, montaj',
    },
    {
      id: 'it',
      name: 'IT & Tech',
      icon: Laptop,
      count: 54,
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Reparații electronice, instalări software',
    },
    {
      id: 'foto',
      name: 'Fotografie',
      icon: Camera,
      count: 43,
      color: 'bg-pink-100 text-pink-700',
      description: 'Fotografie evenimente, portrete, produse',
    },
    {
      id: 'beauty',
      name: 'Beauty',
      icon: Scissors,
      count: 38,
      color: 'bg-rose-100 text-rose-700',
      description: 'Coafură, manichiură, servicii de înfrumusețare',
    },
    {
      id: 'catering',
      name: 'Catering',
      icon: Utensils,
      count: 29,
      color: 'bg-emerald-100 text-emerald-700',
      description: 'Catering evenimente, chef personal',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Explorează serviciile noastre
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            De la reparații casnice la servicii specializate, găsești tot ce ai nevoie
            într-un singur loc.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/servicii/${category.id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/servicii/toate">
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Vezi toate serviciile
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}