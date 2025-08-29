'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCollaborator } from '@/lib/contexts/colaborator-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  DropdownMenuSeparator,
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
  MoreVertical,
  Calendar,
  User,
  Tag,
  Image,
  Globe,
  FolderOpen,
  Copy,
  ExternalLink,
  Phone,
  Building,
  Star,
  Save,
  Loader2
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
  color?: string;
  postsCount: number;
}

interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  template: string;
  metaTitle?: string;
  metaDescription?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    name: string;
    image?: string;
  };
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
  const [categorySearch, setCategorySearch] = useState('');
  
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
    categoryId: 'none', // Default to 'none' instead of empty string
    tags: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3b82f6'
  });

  // Pages state
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [pagesLoading, setPagesLoading] = useState(true);
  const [pageSearch, setPageSearch] = useState('');
  const [pageFilter, setPageFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [showPageDialog, setShowPageDialog] = useState(false);
  const [editingPage, setEditingPage] = useState<StaticPage | null>(null);

  // Site settings state
  const [siteSettings, setSiteSettings] = useState<Record<string, Record<string, any>>>({});
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsForm, setSettingsForm] = useState({
    // Contact info
    phone: '+40 74 017 3581',
    email: 'contact@meserii.ro',
    address: 'Str. Slt. Petre Ionel, nr. 205, Branesti, Ilfov, România, 077030',
    program: 'Luni - Vineri: 09:00 - 18:00',
    programWeekend: 'Sâmbătă: 10:00 - 14:00',
    
    // Company info
    companyDescription: 'MeseriiRO este platforma care revoluționează modul în care românii găsesc și angajează meseriași. Misiunea noastră este să conectăm talentul cu nevoia.',
    mission: 'Să democratizăm accesul la servicii de calitate în România, oferind o platformă sigură, transparentă și eficientă care conectează meseriașii cu clienții care au nevoie de serviciile lor.',
    vision: 'Să devenim cea mai mare și de încredere platformă pentru servicii din România, unde fiecare meseriași își poate dezvolta afacerea și fiecare client poate găsi soluția perfectă pentru nevoile sale.',
    
    // Hero section
    heroTitle: 'Găsește meseriașul potrivit pentru orice proiect',
    heroSubtitle: 'Platforma care conectează clienții cu cei mai buni meseriași din România. Rapid, sigur și la prețuri corecte.'
  });

  const [pageForm, setPageForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    published: false,
    template: 'default',
    metaTitle: '',
    metaDescription: ''
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

      // Process form data for API
      const apiData = {
        ...articleForm,
        categoryId: articleForm.categoryId === 'none' ? null : articleForm.categoryId
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });      if (response.ok) {
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
      categoryId: 'none', // Default to 'none' instead of empty string
      tags: ''
    });
    setEditingArticle(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      color: '#3b82f6'
    });
    setEditingCategory(null);
  };

  const resetPageForm = () => {
    setPageForm({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      published: false,
      template: 'default',
      metaTitle: '',
      metaDescription: ''
    });
    setEditingPage(null);
  };

  // Load pages
  const loadPages = async () => {
    try {
      setPagesLoading(true);
      const response = await fetch('/api/colaborator/content/pages');
      if (response.ok) {
        const data = await response.json();
        setPages(data.pages);
      } else {
        throw new Error('Failed to load pages');
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca paginile",
        variant: "destructive"
      });
    } finally {
      setPagesLoading(false);
    }
  };

  // Handle page submit (create/edit)
  const handlePageSubmit = async () => {
    try {
      setActionLoading('page');
      
      if (!pageForm.title.trim() || !pageForm.content.trim()) {
        toast({
          title: "Eroare",
          description: "Titlul și conținutul sunt obligatorii",
          variant: "destructive"
        });
        return;
      }

      const method = editingPage ? 'PUT' : 'POST';
      const url = editingPage 
        ? `/api/colaborator/content/pages/${editingPage.id}`
        : '/api/colaborator/content/pages';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageForm),
      });

      if (response.ok) {
        await loadPages();
        setShowPageDialog(false);
        resetPageForm();
        toast({
          title: "Succes",
          description: `Pagina a fost ${editingPage ? 'actualizată' : 'creată'} cu succes`
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save page');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "Nu s-a putut salva pagina",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Edit page
  const editPage = (page: StaticPage) => {
    setPageForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      excerpt: page.excerpt || '',
      published: page.published,
      template: page.template,
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || ''
    });
    setEditingPage(page);
    setShowPageDialog(true);
  };

  // Duplicate page
  const duplicatePage = (page: StaticPage) => {
    setPageForm({
      title: `${page.title} - Copie`,
      slug: `${page.slug}-copie`,
      content: page.content,
      excerpt: page.excerpt || '',
      published: false,
      template: page.template,
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || ''
    });
    setEditingPage(null);
    setShowPageDialog(true);
  };

  // Delete page
  const handleDeletePage = async (page: StaticPage) => {
    if (!confirm(`Sigur doriți să ștergeți pagina "${page.title}"?`)) return;

    try {
      setActionLoading(`delete-page-${page.id}`);
      
      const response = await fetch(`/api/colaborator/content/pages/${page.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadPages();
        toast({
          title: "Succes",
          description: "Pagina a fost ștearsă cu succes"
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "Nu s-a putut șterge pagina",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Load site settings
  const loadSiteSettings = async () => {
    try {
      setSettingsLoading(true);
      const response = await fetch('/api/colaborator/content/settings');
      if (response.ok) {
        const data = await response.json();
        setSiteSettings(data.settings);
        
        // Update form with loaded settings
        const newForm = { ...settingsForm };
        
        // Contact settings
        if (data.settings.contact) {
          newForm.phone = data.settings.contact.phone?.value || newForm.phone;
          newForm.email = data.settings.contact.email?.value || newForm.email;
          newForm.address = data.settings.contact.address?.value || newForm.address;
          newForm.program = data.settings.contact.program?.value || newForm.program;
          newForm.programWeekend = data.settings.contact.programWeekend?.value || newForm.programWeekend;
        }
        
        // Company settings
        if (data.settings.company) {
          newForm.companyDescription = data.settings.company.description?.value || newForm.companyDescription;
          newForm.mission = data.settings.company.mission?.value || newForm.mission;
          newForm.vision = data.settings.company.vision?.value || newForm.vision;
        }
        
        // Hero settings
        if (data.settings.hero) {
          newForm.heroTitle = data.settings.hero.title?.value || newForm.heroTitle;
          newForm.heroSubtitle = data.settings.hero.subtitle?.value || newForm.heroSubtitle;
        }
        
        setSettingsForm(newForm);
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca setările site-ului",
        variant: "destructive"
      });
    } finally {
      setSettingsLoading(false);
    }
  };

  // Save contact settings
  const saveContactSettings = async () => {
    try {
      setActionLoading('contact');
      
      const contactSettings = {
        phone: {
          value: settingsForm.phone,
          type: 'text',
          label: 'Telefon',
          description: 'Numărul de telefon principal'
        },
        email: {
          value: settingsForm.email,
          type: 'email',
          label: 'Email',
          description: 'Adresa de email principală'
        },
        address: {
          value: settingsForm.address,
          type: 'text',
          label: 'Adresă',
          description: 'Adresa sediului companiei'
        },
        program: {
          value: settingsForm.program,
          type: 'text',
          label: 'Program Lucru',
          description: 'Programul de lucru săptămânal'
        },
        programWeekend: {
          value: settingsForm.programWeekend,
          type: 'text',
          label: 'Program Weekend',
          description: 'Programul de lucru weekend'
        }
      };

      const response = await fetch('/api/colaborator/content/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'contact',
          settings: contactSettings
        }),
      });

      if (response.ok) {
        await loadSiteSettings();
        toast({
          title: "Succes",
          description: "Informațiile de contact au fost actualizate cu succes"
        });
      } else {
        throw new Error('Failed to save contact settings');
      }
    } catch (error) {
      console.error('Error saving contact settings:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut salva setările de contact",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Save company settings
  const saveCompanySettings = async () => {
    try {
      setActionLoading('company');
      
      const companySettings = {
        description: {
          value: settingsForm.companyDescription,
          type: 'textarea',
          label: 'Descrierea Companiei',
          description: 'Descrierea principală a companiei'
        },
        mission: {
          value: settingsForm.mission,
          type: 'textarea',
          label: 'Misiunea Noastră',
          description: 'Misiunea companiei'
        },
        vision: {
          value: settingsForm.vision,
          type: 'textarea',
          label: 'Viziunea Noastră',
          description: 'Viziunea companiei'
        }
      };

      const response = await fetch('/api/colaborator/content/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'company',
          settings: companySettings
        }),
      });

      if (response.ok) {
        await loadSiteSettings();
        toast({
          title: "Succes",
          description: "Informațiile companiei au fost actualizate cu succes"
        });
      } else {
        throw new Error('Failed to save company settings');
      }
    } catch (error) {
      console.error('Error saving company settings:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut salva setările companiei",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Save hero settings
  const saveHeroSettings = async () => {
    try {
      setActionLoading('hero');
      
      const heroSettings = {
        title: {
          value: settingsForm.heroTitle,
          type: 'text',
          label: 'Titlu Principal',
          description: 'Titlul principal de pe pagina de start'
        },
        subtitle: {
          value: settingsForm.heroSubtitle,
          type: 'textarea',
          label: 'Subtitlu',
          description: 'Subtitlul de pe pagina de start'
        }
      };

      const response = await fetch('/api/colaborator/content/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'hero',
          settings: heroSettings
        }),
      });

      if (response.ok) {
        await loadSiteSettings();
        toast({
          title: "Succes",
          description: "Setările paginii principale au fost actualizate cu succes"
        });
      } else {
        throw new Error('Failed to save hero settings');
      }
    } catch (error) {
      console.error('Error saving hero settings:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut salva setările paginii principale",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
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
      categoryId: article.category?.slug || 'none',
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
      description: category.description || '',
      color: category.color || '#3B82F6'
    });
    setEditingCategory(category);
    setShowCategoryDialog(true);
  };

  // Handle edit category
  const handleEditCategory = (category: BlogCategory) => {
    editCategory(category);
  };

  // Handle delete category
  const handleDeleteCategory = async (category: BlogCategory) => {
    if (!confirm(`Ești sigur că vrei să ștergi categoria "${category.name}"?${category.postsCount > 0 ? ` Aceasta are ${category.postsCount} articole asociate.` : ''}`)) {
      return;
    }

    try {
      setActionLoading('delete-category');
      const response = await fetch(`/api/colaborator/content/categories/${category.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadCategories();
        toast({
          title: "Succes",
          description: "Categoria a fost ștearsă cu succes"
        });
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge categoria",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
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

  // Filter categories
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
    category.description?.toLowerCase().includes(categorySearch.toLowerCase()) ||
    category.slug.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Filter pages
  const filteredPages = pages.filter(page => {
    const matchesSearch = pageSearch === '' || 
      page.title.toLowerCase().includes(pageSearch.toLowerCase()) ||
      page.slug.toLowerCase().includes(pageSearch.toLowerCase()) ||
      page.content.toLowerCase().includes(pageSearch.toLowerCase());
    
    const matchesFilter = pageFilter === 'all' || 
      (pageFilter === 'published' && page.published) ||
      (pageFilter === 'draft' && !page.published);
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    loadArticles();
    loadCategories();
    loadPages();
    loadSiteSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <FileText className="h-4 w-4" />
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <FolderOpen className="h-5 w-5 mr-2" />
                  Categorii Blog ({categories.length})
                </CardTitle>
                <CardDescription>
                  Gestionează categoriile pentru articolele de blog
                </CardDescription>
              </div>
              <Button 
                onClick={() => {
                  setEditingCategory(null);
                  resetCategoryForm();
                  setShowCategoryDialog(true);
                }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Categorie Nouă
              </Button>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <div className="text-center py-8">
                  <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Nu există categorii</h3>
                  <p className="text-gray-600 mb-4">Creează prima categorie pentru organizarea articolelor</p>
                  <Button 
                    onClick={() => {
                      setEditingCategory(null);
                      resetCategoryForm();
                      setShowCategoryDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adaugă prima categorie
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Search Categories */}
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Caută categorii..."
                        className="pl-10"
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Categories Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCategories.map((category) => (
                      <Card key={category.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{category.name}</CardTitle>
                              {category.description && (
                                <CardDescription className="mt-1">
                                  {category.description}
                                </CardDescription>
                              )}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditCategory(category)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editează
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteCategory(category)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Șterge
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-1" />
                              <span>{category.postsCount} articole</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {category.slug}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestionare Conținut Site</h2>
            <p className="text-gray-600">Editați conținutul existent al site-ului și creați pagini noi</p>
          </div>

          {/* Sub-tabs for different content types */}
          <Tabs defaultValue="site-settings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="site-settings">Setări Site</TabsTrigger>
              <TabsTrigger value="existing-pages">Pagini Existente</TabsTrigger>
              <TabsTrigger value="custom-pages">Pagini Custom</TabsTrigger>
            </TabsList>

            {/* Site Settings Tab */}
            <TabsContent value="site-settings" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {/* Contact Information Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Informații Contact
                    </CardTitle>
                    <CardDescription>
                      Modificați datele de contact care apar pe site
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={settingsForm.phone}
                          onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                          placeholder="+40 74 017 3581"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                          placeholder="contact@meserii.ro"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Adresă</Label>
                      <Input
                        id="address"
                        value={settingsForm.address}
                        onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})}
                        placeholder="Str. Slt. Petre Ionel, nr. 205, Branesti"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="program">Program Lucru</Label>
                        <Input
                          id="program"
                          value={settingsForm.program}
                          onChange={(e) => setSettingsForm({...settingsForm, program: e.target.value})}
                          placeholder="Luni - Vineri: 09:00 - 18:00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="program-weekend">Program Weekend</Label>
                        <Input
                          id="program-weekend"
                          value={settingsForm.programWeekend}
                          onChange={(e) => setSettingsForm({...settingsForm, programWeekend: e.target.value})}
                          placeholder="Sâmbătă: 10:00 - 14:00"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={saveContactSettings}
                        disabled={actionLoading === 'contact' || settingsLoading}
                        className="min-w-[140px]"
                      >
                        {actionLoading === 'contact' ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Salvez...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Salvează Modificările
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Company Information Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Informații Companie
                    </CardTitle>
                    <CardDescription>
                      Editați descrierea companiei și informațiile principale
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="company-description">Descrierea Companiei</Label>
                      <Textarea
                        id="company-description"
                        rows={4}
                        value={settingsForm.companyDescription}
                        onChange={(e) => setSettingsForm({...settingsForm, companyDescription: e.target.value})}
                        placeholder="MeseriiRO este platforma care revoluționează..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mission">Misiunea Noastră</Label>
                        <Textarea
                          id="mission"
                          rows={3}
                          value={settingsForm.mission}
                          onChange={(e) => setSettingsForm({...settingsForm, mission: e.target.value})}
                          placeholder="Să democratizăm accesul la servicii..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="vision">Viziunea Noastră</Label>
                        <Textarea
                          id="vision"
                          rows={3}
                          value={settingsForm.vision}
                          onChange={(e) => setSettingsForm({...settingsForm, vision: e.target.value})}
                          placeholder="Să devenim cea mai mare platformă..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={saveCompanySettings}
                        disabled={actionLoading === 'company' || settingsLoading}
                        className="min-w-[140px]"
                      >
                        {actionLoading === 'company' ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Salvez...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Salvează Modificările
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Hero Section Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Pagina Principală
                    </CardTitle>
                    <CardDescription>
                      Editați textele de pe pagina principală
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hero-title">Titlu Principal</Label>
                      <Input
                        id="hero-title"
                        value={settingsForm.heroTitle}
                        onChange={(e) => setSettingsForm({...settingsForm, heroTitle: e.target.value})}
                        placeholder="Găsește meseriașul potrivit..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Subtitlu</Label>
                      <Textarea
                        id="hero-subtitle"
                        rows={2}
                        value={settingsForm.heroSubtitle}
                        onChange={(e) => setSettingsForm({...settingsForm, heroSubtitle: e.target.value})}
                        placeholder="Platforma care conectează..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={saveHeroSettings}
                        disabled={actionLoading === 'hero' || settingsLoading}
                        className="min-w-[140px]"
                      >
                        {actionLoading === 'hero' ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Salvez...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Salvează Modificările
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Existing Pages Tab */}
            <TabsContent value="existing-pages" className="space-y-6 mt-6">
              <div className="grid gap-4">
                {[
                  { name: 'Pagina Principală', url: '/', description: 'Hero section, servicii, testimoniale' },
                  { name: 'Despre Noi', url: '/despre', description: 'Misiune, viziune, echipa' },
                  { name: 'Contact', url: '/contact', description: 'Formular contact, date de contact' },
                  { name: 'Servicii', url: '/servicii', description: 'Lista serviciilor disponibile' },
                  { name: 'Devino Meseriași', url: '/devino-mesterias', description: 'Pagina de înregistrare meseriași' },
                  { name: 'Termeni și Condiții', url: '/termeni', description: 'Termeni legali' },
                  { name: 'Confidențialitate', url: '/confidentialitate', description: 'Politica de confidențialitate' }
                ].map((page) => (
                  <Card key={page.url} className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{page.name}</h3>
                        <p className="text-gray-600 text-sm mb-1">{page.url}</p>
                        <p className="text-gray-500 text-sm">{page.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Vezi
                        </Button>
                        <Button size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editează
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Custom Pages Tab */}
            <TabsContent value="custom-pages" className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Pagini Personalizate</h3>
                  <p className="text-gray-600">Creați pagini noi pentru site-ul dvs.</p>
                </div>
                <Button onClick={() => {
                  resetPageForm();
                  setShowPageDialog(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Pagină
                </Button>
              </div>

              {/* Search and filters for custom pages */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Caută pagini custom..."
                    value={pageSearch}
                    onChange={(e) => setPageSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={pageFilter} onValueChange={(value) => setPageFilter(value as 'all' | 'published' | 'draft')}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrează pagini" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toate paginile</SelectItem>
                    <SelectItem value="published">Publicate</SelectItem>
                    <SelectItem value="draft">Ciorne</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Pages Grid */}
              <div className="grid gap-4">
                {filteredPages.map((page) => (
                  <Card key={page.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{page.title}</h3>
                          <Badge variant={page.published ? "default" : "secondary"}>
                            {page.published ? "Publicată" : "Ciornă"}
                          </Badge>
                          <Badge variant="outline">
                            {page.template || 'default'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">/{page.slug}</p>
                        {page.excerpt && (
                          <p className="text-gray-600 text-sm mb-2">{page.excerpt}</p>
                        )}
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span>Creat: {new Date(page.createdAt).toLocaleDateString('ro-RO')}</span>
                          <span>Actualizat: {new Date(page.updatedAt).toLocaleDateString('ro-RO')}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => editPage(page)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editează
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => duplicatePage(page)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplică
                          </DropdownMenuItem>
                          {page.published && (
                            <DropdownMenuItem 
                              onClick={() => window.open(`/${page.slug}`, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Vezi pagina
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeletePage(page)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Șterge
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}

                {filteredPages.length === 0 && (
                  <div className="text-center py-8">
                    <Globe className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">
                      {pageSearch ? 'Nu s-au găsit pagini care să corespundă căutării.' : 'Nu există pagini personalizate create încă.'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Media Tab - Placeholder */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Fișiere Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
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
                    <SelectItem value="none">Fără categorie</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.slug}>
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

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Editează Categorie' : 'Categorie Nouă'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Modificați informațiile categoriei' : 'Completați informațiile pentru noua categorie'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Name and Slug */}
            <div>
              <Label htmlFor="category-name">Nume *</Label>
              <Input
                id="category-name"
                value={categoryForm.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setCategoryForm(prev => ({
                    ...prev,
                    name: newName,
                    slug: prev.slug || generateSlug(newName)
                  }));
                }}
                placeholder="Numele categoriei"
              />
            </div>

            <div>
              <Label htmlFor="category-slug">URL Slug *</Label>
              <Input
                id="category-slug"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-slug-categorie"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="category-description">Descriere</Label>
              <Textarea
                id="category-description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrierea categoriei"
                rows={3}
              />
            </div>

            {/* Color */}
            <div>
              <Label htmlFor="category-color">Culoare</Label>
              <Input
                id="category-color"
                type="color"
                value={categoryForm.color}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                className="h-10 w-20"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCategoryDialog(false)}
            >
              Anulează
            </Button>
            <Button 
              onClick={handleCategorySubmit}
              disabled={actionLoading === 'category'}
            >
              {actionLoading === 'category' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvează...
                </>
              ) : (
                editingCategory ? 'Actualizează' : 'Creează'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Page Dialog */}
      <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage ? 'Editează Pagină' : 'Pagină Nouă'}
            </DialogTitle>
            <DialogDescription>
              {editingPage ? 'Modificați informațiile paginii' : 'Completați informațiile pentru noua pagină'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Title and Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="page-title">Titlu *</Label>
                <Input
                  id="page-title"
                  value={pageForm.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setPageForm(prev => ({
                      ...prev,
                      title: newTitle,
                      slug: prev.slug || generateSlug(newTitle)
                    }));
                  }}
                  placeholder="Titlul paginii"
                />
              </div>
              <div>
                <Label htmlFor="page-slug">URL Slug *</Label>
                <Input
                  id="page-slug"
                  value={pageForm.slug}
                  onChange={(e) => setPageForm(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-slug-pagina"
                />
              </div>
            </div>

            {/* Template and Published */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="page-template">Template</Label>
                <Select 
                  value={pageForm.template} 
                  onValueChange={(value) => setPageForm(prev => ({ ...prev, template: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați template-ul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="about">Despre</SelectItem>
                    <SelectItem value="services">Servicii</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="page-published"
                    checked={pageForm.published}
                    onChange={(e) => setPageForm(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="page-published">Publică pagina imediat</Label>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <Label htmlFor="page-excerpt">Descriere scurtă</Label>
              <Textarea
                id="page-excerpt"
                value={pageForm.excerpt}
                onChange={(e) => setPageForm(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Descrierea scurtă a paginii"
                rows={3}
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="page-content">Conținut *</Label>
              <Textarea
                id="page-content"
                value={pageForm.content}
                onChange={(e) => setPageForm(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Conținutul complet al paginii"
                rows={12}
                className="font-mono"
              />
            </div>

            {/* SEO Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="page-meta-title">Meta Title (SEO)</Label>
                <Input
                  id="page-meta-title"
                  value={pageForm.metaTitle}
                  onChange={(e) => setPageForm(prev => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="Titlul pentru motoarele de căutare"
                />
              </div>
              <div>
                <Label htmlFor="page-meta-description">Meta Description (SEO)</Label>
                <Textarea
                  id="page-meta-description"
                  value={pageForm.metaDescription}
                  onChange={(e) => setPageForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="Descrierea pentru motoarele de căutare"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPageDialog(false)}
            >
              Anulează
            </Button>
            <Button 
              onClick={handlePageSubmit}
              disabled={actionLoading === 'page'}
            >
              {actionLoading === 'page' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvează...
                </>
              ) : (
                editingPage ? 'Actualizează' : 'Creează'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
