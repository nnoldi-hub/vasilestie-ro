import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, User, Clock, Search, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function BlogPage() {
  const featuredPost = {
    title: '10 Sfaturi pentru a alege meseriaștii potriviți pentru locuința ta',
    excerpt: 'Ghidul complet pentru a găsi și angaja cei mai buni meseriași. Învață cum să evaluezi ofertele, să verifici referințele și să eviți capcanele comune.',
    author: 'Andreea Stancu',
    date: '18 August 2025',
    readTime: '8 min',
    image: '🏠',
    category: 'Ghiduri',
    featured: true
  };

  const blogPosts = [
    {
      title: 'Renovarea bucătăriei: De la planificare la execuție',
      excerpt: 'Totul despre renovarea bucătăriei: buget, timp, materiale și pași esențiali pentru un proiect reușit.',
      author: 'Marius Ionescu',
      date: '15 August 2025',
      readTime: '12 min',
      image: '🔨',
      category: 'Renovări'
    },
    {
      title: 'Instalația electrică în casă: Când să apelezi la specialist',
      excerpt: 'Semne că ai nevoie de un electrician, tipuri de probleme comune și cum să previi avariyle electrice.',
      author: 'Elena Popescu',
      date: '12 August 2025', 
      readTime: '6 min',
      image: '⚡',
      category: 'Instalații'
    },
    {
      title: 'Grădinăritul urban: Transformă balconul într-o oază verde',
      excerpt: 'Idei creative pentru grădinărit pe balcon, plante potrivite și sfaturi de îngrijire pentru începători.',
      author: 'Cristina Gheorghe',
      date: '10 August 2025',
      readTime: '5 min',
      image: '🌱',
      category: 'Grădinărit'
    },
    {
      title: 'Winterizarea casei: Pregătește-ți locuința pentru iarnă',
      excerpt: 'Lista de verificare pentru pregătirea casei pentru sezonul rece. Izolație, încălzire și mici reparații.',
      author: 'Alexandru Dumitrescu',
      date: '8 August 2025',
      readTime: '10 min',
      image: '❄️',
      category: 'Întreținere'
    },
    {
      title: 'Designul interior pe buget mic: Maxim de impact cu minim de costuri',
      excerpt: 'Trucuri și tehnici pentru a-ți reamenaja casa fără să cheltui o avere. DIY și soluții creative.',
      author: 'Ioana Marinescu',
      date: '5 August 2025',
      readTime: '7 min',
      image: '🎨',
      category: 'Design'
    },
    {
      title: 'Problemele comune de instalații sanitare și soluțiile lor',
      excerpt: 'Ghid practic pentru rezolvarea problemelor simple de plumberie și când să apelezi la specialist.',
      author: 'Valentin Radu',
      date: '3 August 2025',
      readTime: '9 min',
      image: '🚿',
      category: 'Instalații'
    }
  ];

  const categories = [
    { name: 'Toate', count: 24, active: true },
    { name: 'Ghiduri', count: 8 },
    { name: 'Renovări', count: 6 },
    { name: 'Instalații', count: 5 },
    { name: 'Design', count: 3 },
    { name: 'Grădinărit', count: 2 }
  ];

  const popularPosts = [
    {
      title: 'Cum să negociezi prețul cu un meseriași',
      views: '12.5K',
      image: '💰'
    },
    {
      title: 'Erori comune în renovări și cum să le eviți',
      views: '9.2K',
      image: '⚠️'
    },
    {
      title: 'Ghidul complet pentru amenajarea băii',
      views: '8.7K',
      image: '🛁'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700">📝 Blog MeseriiRO</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Ghiduri și sfaturi pentru casa ta
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descoperă articole utile despre renovări, reparații, design interior
            și tot ce ai nevoie să știi pentru a-ți îmbunătăți locuința.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Caută articole despre renovări, instalații, design..."
              className="pl-12 py-3 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
                <Badge className="bg-white/20 text-white mb-4">
                  ⭐ Articol recomandat
                </Badge>
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-blue-100">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Citește acum
                  </Button>
                </div>
              </div>
            </Card>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "default" : "outline"}
                  size="sm"
                  className={category.active ? "bg-blue-600" : ""}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="text-4xl">{post.image}</div>
                    </div>
                    <CardTitle className="text-lg leading-tight hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Încarcă mai multe articole
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                  Cele mai citite
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="text-2xl">{post.image}</div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-tight hover:text-blue-600">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {post.views} vizualizări
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Newsletter săptămânal
                </CardTitle>
                <CardDescription className="text-blue-800">
                  Primește cele mai noi articole și sfaturi direct în inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input 
                    placeholder="Adresa ta de email" 
                    className="bg-white"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Abonează-te gratuit
                  </Button>
                  <p className="text-xs text-blue-700 text-center">
                    Fără spam. Poți să te dezabonezi oricând.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-900">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Sfat rapid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Verifică întotdeauna referințele!</strong> Înainte să angajezi un meseriași, 
                  cere cel puțin 3 referințe de la clienți anteriori și verifică-le telefonic.
                </p>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categorii</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <div key={category.name} className="flex justify-between items-center py-2 hover:bg-gray-50 px-2 rounded cursor-pointer">
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
