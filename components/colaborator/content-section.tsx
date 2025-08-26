'use client';

import { useState, useEffect } from 'react';
import { useCollaborator } from '@/lib/contexts/colaborator-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  Image,
  Globe,
  FolderOpen
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    email: string;
  };
  category?: {
    name: string;
    slug: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postsCount: number;
}

export function ContentSection() {
  const { state } = useCollaborator();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('articles');
  
  // Articles state
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Dialog states
  const [showArticleDialog, setShowArticleDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form states
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
    categoryId: '',
    tags: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: ''
  });

  // Load articles
  const loadArticles = async () => {
    try {
      setArticlesLoading(true);
      const response = await fetch('/api/colaborator/content/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      } else {
        throw new Error('Failed to load articles');
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca articolele",
        variant: "destructive"
      });
    } finally {
      setArticlesLoading(false);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const response = await fetch('/api/colaborator/content/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // Handle article form submission
  const handleArticleSubmit = async () => {
    if (!articleForm.title.trim() || !articleForm.content.trim()) {
      toast({
        title: "Eroare",
        description: "Titlul și conținutul sunt obligatorii",
        variant: "destructive"
      });
      return;
    }

    try {
      setActionLoading('article');
      
      const method = editingArticle ? 'PUT' : 'POST';
      const url = editingArticle 
        ? `/api/colaborator/content/articles/${editingArticle.id}`
        : '/api/colaborator/content/articles';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleForm),
      });

      if (response.ok) {
        await loadArticles();
        setShowArticleDialog(false);
        resetArticleForm();
        toast({
          title: "Succes",
          description: `Articolul a fost ${editingArticle ? 'actualizat' : 'creat'} cu succes`
        });
      } else {
        throw new Error('Failed to save article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva articolul",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Handle category form submission
  const handleCategorySubmit = async () => {
    if (!categoryForm.name.trim()) {
      toast({
        title: "Eroare",
        description: "Numele categoriei este obligatoriu",
        variant: "destructive"
      });
      return;
    }

    try {
      setActionLoading('category');
      
      const method = editingCategory ? 'PUT' : 'POST';
      const url = editingCategory 
        ? `/api/colaborator/content/categories/${editingCategory.id}`
        : '/api/colaborator/content/categories';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      });

      if (response.ok) {
        await loadCategories();
        setShowCategoryDialog(false);
        resetCategoryForm();
        toast({
          title: "Succes",
          description: `Categoria a fost ${editingCategory ? 'actualizată' : 'creată'} cu succes`
        });
      } else {
        throw new Error('Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva categoria",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Reset forms
  const resetArticleForm = () => {
    setArticleForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      categoryId: '',
      tags: ''
    });
    setEditingArticle(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      slug: '',
      description: ''
    });
    setEditingCategory(null);
  };

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Toggle article published status
  const toggleArticleStatus = async (article: BlogPost) => {
    try {
      setActionLoading(article.id);
      
      const response = await fetch(`/api/colaborator/content/articles/${article.id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !article.published }),
      });

      if (response.ok) {
        await loadArticles();
        toast({
          title: "Succes",
          description: `Articolul a fost ${article.published ? 'retras' : 'publicat'} cu succes`
        });
      }
    } catch (error) {
      console.error('Error toggling article status:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza statusul articolului",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Delete article
  const deleteArticle = async (article: BlogPost) => {
    if (!confirm('Sigur doriți să ștergeți acest articol?')) return;

    try {
      setActionLoading(article.id);
      
      const response = await fetch(`/api/colaborator/content/articles/${article.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadArticles();
        toast({
          title: "Succes",
          description: "Articolul a fost șters cu succes"
        });
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge articolul",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Edit article
  const editArticle = (article: BlogPost) => {
    setArticleForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      published: article.published,
      categoryId: article.category?.slug || '',
      tags: article.tags.map(tag => tag.name).join(', ')
    });
    setEditingArticle(article);
    setShowArticleDialog(true);
  };

  // Edit category
  const editCategory = (category: BlogCategory) => {
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    });
    setEditingCategory(category);
    setShowCategoryDialog(true);
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && article.published) ||
                         (statusFilter === 'draft' && !article.published);
    const matchesCategory = categoryFilter === 'all' || 
                           article.category?.slug === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  useEffect(() => {
    loadArticles();
    loadCategories();
  }, []);

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

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Articole
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Categorii
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Pagini
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Media
          </TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Articole Blog ({filteredArticles.length})
                </CardTitle>
                {state.permissions.canEditContent && (
                  <Button 
                    onClick={() => {
                      resetArticleForm();
                      setShowArticleDialog(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Articol Nou
                  </Button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Căutare articole..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toate statusurile</SelectItem>
                    <SelectItem value="published">Publicate</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toate categoriile</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              {articlesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Nu există articole de afișat</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titlu</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data publicării</TableHead>
                        <TableHead>Acțiuni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredArticles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold">{article.title}</p>
                              <p className="text-sm text-gray-500 line-clamp-2">
                                {article.excerpt}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              {article.author.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            {article.category ? (
                              <Badge variant="outline" className="flex items-center gap-1 w-fit">
                                <Tag className="h-3 w-3" />
                                {article.category.name}
                              </Badge>
                            ) : (
                              <span className="text-gray-400">Fără categorie</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {article.published ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Publicat
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {article.publishedAt ? 
                                new Date(article.publishedAt).toLocaleDateString('ro-RO') :
                                'Nepublicat'
                              }
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  disabled={actionLoading === article.id}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => editArticle(article)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editează
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => toggleArticleStatus(article)}
                                  disabled={actionLoading === article.id}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  {article.published ? 'Retrage' : 'Publică'}
                                </DropdownMenuItem>
                                {state.permissions.canEditContent && (
                                  <DropdownMenuItem 
                                    onClick={() => deleteArticle(article)}
                                    disabled={actionLoading === article.id}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Șterge
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab - Placeholder */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="h-5 w-5 mr-2" />
                Categorii Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Gestionare categorii în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages Tab - Placeholder */}
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Pagini Statice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Globe className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Gestionare pagini în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab - Placeholder */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Fișiere Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Image className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Upload și gestionare media în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Article Dialog */}
      <Dialog open={showArticleDialog} onOpenChange={setShowArticleDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? 'Editează Articol' : 'Articol Nou'}
            </DialogTitle>
            <DialogDescription>
              {editingArticle ? 'Modificați informațiile articolului' : 'Completați informațiile pentru noul articol'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Title and Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="article-title">Titlu *</Label>
                <Input
                  id="article-title"
                  value={articleForm.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setArticleForm(prev => ({
                      ...prev,
                      title: newTitle,
                      slug: prev.slug || generateSlug(newTitle)
                    }));
                  }}
                  placeholder="Titlul articolului"
                />
              </div>
              <div>
                <Label htmlFor="article-slug">URL Slug *</Label>
                <Input
                  id="article-slug"
                  value={articleForm.slug}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-slug-articol"
                />
              </div>
            </div>

            {/* Category and Published */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="article-category">Categorie</Label>
                <Select 
                  value={articleForm.categoryId} 
                  onValueChange={(value) => setArticleForm(prev => ({ ...prev, categoryId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Fără categorie</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="article-tags">Tag-uri</Label>
                <Input
                  id="article-tags"
                  value={articleForm.tags}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <Label htmlFor="article-excerpt">Descriere scurtă</Label>
              <Textarea
                id="article-excerpt"
                value={articleForm.excerpt}
                onChange={(e) => setArticleForm(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Descrierea scurtă a articolului"
                rows={3}
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="article-content">Conținut *</Label>
              <Textarea
                id="article-content"
                value={articleForm.content}
                onChange={(e) => setArticleForm(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Conținutul complet al articolului"
                rows={12}
                className="font-mono"
              />
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="article-published"
                checked={articleForm.published}
                onChange={(e) => setArticleForm(prev => ({ ...prev, published: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="article-published">Publică articolul imediat</Label>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowArticleDialog(false)}
            >
              Anulează
            </Button>
            <Button 
              onClick={handleArticleSubmit}
              disabled={actionLoading === 'article'}
            >
              {actionLoading === 'article' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvează...
                </>
              ) : (
                editingArticle ? 'Actualizează' : 'Creează'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
