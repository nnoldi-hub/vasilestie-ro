'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, User, Clock, Search, TrendingUp, BookOpen, Lightbulb, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  featured: boolean;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string | null;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  _count?: {
    comments: number;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: {
    posts: number;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, [page, selectedCategory, searchTerm]);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        ...(selectedCategory && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/blog/posts?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.posts);
        setTotalPages(data.pagination.totalPages);
      } else {
        toast.error('Eroare la încărcarea articolelor');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Eroare la încărcarea articolelor');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories');
      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Te rog să introduci o adresă de email');
      return;
    }

    setSubscribing(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message || 'Eroare la abonare');
      }
    } catch (error) {
      console.error('Newsletter subscribe error:', error);
      toast.error('Eroare la abonare');
    } finally {
      setSubscribing(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  const handleCategoryFilter = (categorySlug: string) => {
    setSelectedCategory(categorySlug === selectedCategory ? '' : categorySlug);
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

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
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută articole despre renovări, instalații, design..."
              className="pl-12 py-3 text-lg"
            />
          </form>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {featuredPost && (
              <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
                  <Badge className="bg-white/20 text-white mb-4">
                    ⭐ Articol recomandat
                  </Badge>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-3xl font-bold mb-4 hover:text-blue-200 cursor-pointer">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-blue-100">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {featuredPost.author.name || featuredPost.author.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {featuredPost.publishedAt && formatDate(featuredPost.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        {featuredPost.views} vizualizări
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        Citește acum
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryFilter('')}
                className={!selectedCategory ? "bg-blue-600" : ""}
              >
                Toate ({categories.reduce((sum, cat) => sum + cat._count.posts, 0)})
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={selectedCategory === category.slug ? "bg-blue-600" : ""}
                >
                  {category.name} ({category._count.posts})
                </Button>
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Blog Posts Grid */}
            {!loading && (
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {post.category && (
                          <Badge variant="outline" className="text-xs">
                            {post.category.name}
                          </Badge>
                        )}
                        {post.tags.length > 0 && (
                          <div className="flex gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag.id} variant="secondary" className="text-xs">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <CardTitle className="text-lg leading-tight hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {post.author.name || post.author.email}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {post.views}
                          </div>
                          {post._count && (
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {post._count.comments}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.publishedAt && formatDate(post.publishedAt)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && regularPosts.length === 0 && !featuredPost && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nu au fost găsite articole
                </h3>
                <p className="text-gray-600">
                  Încearcă să schimbi termenii de căutare sau categoria selectată.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        onClick={() => setPage(pageNum)}
                        className={page === pageNum ? "bg-blue-600" : ""}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Următorul
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
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
                <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
                  <Input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresa ta de email" 
                    className="bg-white"
                    disabled={subscribing}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={subscribing}
                  >
                    {subscribing ? 'Se abonează...' : 'Abonează-te gratuit'}
                  </Button>
                  <p className="text-xs text-blue-700 text-center">
                    Fără spam. Poți să te dezabonezi oricând.
                  </p>
                </form>
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
                  {categories.map((category) => (
                    <div 
                      key={category.id} 
                      onClick={() => handleCategoryFilter(category.slug)}
                      className={`flex justify-between items-center py-2 px-2 rounded cursor-pointer transition-colors ${
                        selectedCategory === category.slug ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category._count.posts}
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
