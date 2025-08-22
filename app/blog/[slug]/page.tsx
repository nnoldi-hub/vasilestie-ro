'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, User, Eye, MessageSquare, ArrowLeft, Share2, Heart, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { notFound } from 'next/navigation';

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
    image: string | null;
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
  comments: Array<{
    id: string;
    content: string;
    createdAt: string;
    author: {
      name: string | null;
      email: string;
    };
    replies: Array<{
      id: string;
      content: string;
      createdAt: string;
      author: {
        name: string | null;
        email: string;
      };
    }>;
  }>;
  relatedPosts: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string | null;
    category: {
      name: string;
    } | null;
  }>;
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/posts/${params.slug}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.post);
      } else {
        notFound();
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      notFound();
    } finally {
      setLoading(false);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link-ul a fost copiat în clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link-ul a fost copiat în clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la blog
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                {post.category && (
                  <Link href={`/blog?category=${post.category.slug}`}>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {post.category.name}
                    </Badge>
                  </Link>
                )}
                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-700">
                    ⭐ Recomandat
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between py-4 border-y border-gray-200">
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      {post.author.name || post.author.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {post.publishedAt && formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    {post.views} vizualizări
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {post.comments.length} comentarii
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sharePost}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Distribuie
                </Button>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-800 leading-relaxed"
              />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {post.relatedPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Articole similare</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {post.relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {relatedPost.category && (
                            <Badge variant="outline" className="text-xs">
                              {relatedPost.category.name}
                            </Badge>
                          )}
                        </div>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <CardTitle className="text-lg leading-tight hover:text-blue-600 cursor-pointer">
                            {relatedPost.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="line-clamp-3">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1 inline" />
                          {relatedPost.publishedAt && formatDate(relatedPost.publishedAt)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Comentarii ({post.comments.length})
              </h3>
              
              {post.comments.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Nu există comentarii încă. Fii primul care comentează!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm mr-3">
                            {(comment.author.name || comment.author.email)[0].toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {comment.author.name || comment.author.email}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-800 mb-4">{comment.content}</p>
                      
                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="ml-6 pt-4 border-l-2 border-gray-200 pl-4 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="bg-white rounded-lg p-4">
                              <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm mr-2">
                                  {(reply.author.name || reply.author.email)[0].toUpperCase()}
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900 text-sm">
                                    {reply.author.name || reply.author.email}
                                  </h5>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(reply.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-800 text-sm">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
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

            {/* Quick Action */}
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">
                  Ai nevoie de un meseriași?
                </CardTitle>
                <CardDescription className="text-green-800">
                  Găsește rapid specialistul potrivit pentru proiectul tău
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/meseriasi">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Caută meseriași
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Author */}
            <Card>
              <CardHeader>
                <CardTitle>Despre autor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-4">
                    {(post.author.name || post.author.email)[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {post.author.name || post.author.email}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Autor
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
