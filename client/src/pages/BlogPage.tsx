import { useState, useEffect } from "react";
import { Link } from "wouter";
import { routes } from "@/lib/routes";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowRight, Loader2 } from "lucide-react";
import { fetchBlogPosts } from "@/lib/api";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to fetch blog posts:", err))
      .finally(() => setLoading(false));
  }, []);

  useSEO({
    title: "Journal | ANVI Clothing",
    description: "Explore the ANVI Journal for style guides, fabric focuses, and editorial pieces on building a beautiful and timeless wardrobe.",
    canonical: "https://anvi.clothing/journal"
  });

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-surface min-h-screen">
      
      {/* Editorial Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative border-b border-border-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="font-serif text-5xl md:text-7xl text-text-primary mb-6">
              Journal
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light max-w-2xl mx-auto">
              Thoughts on style, stories behind our pieces, and a look into everyday life.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post (First Post) */}
      {posts.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 border-b border-border-subtle">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <ScrollReveal className="w-full lg:w-3/5">
              <Link href={routes.blogPost(posts[0].slug)}>
                <div className="aspect-[4/3] w-full overflow-hidden cursor-pointer group">
                  <img 
                    src={posts[0].imageUrl || posts[0].image} 
                    alt={posts[0].title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </Link>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="w-full lg:w-2/5 flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-4 text-xs tracking-widest uppercase text-brand-primary font-semibold">
                <span>{posts[0].category}</span>
                <span className="text-border-subtle">&bull;</span>
                <span className="text-text-muted">{new Date(posts[0].publishedAt || posts[0].createdAt).toLocaleDateString()}</span>
              </div>
              
              <Link href={routes.blogPost(posts[0].slug)}>
                <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6 hover:text-brand-primary transition-colors cursor-pointer leading-tight">
                  {posts[0].title}
                </h2>
              </Link>
              
              <p className="text-text-muted text-lg leading-relaxed font-light mb-8">
                {posts[0].excerpt}
              </p>
              
              <Link href={routes.blogPost(posts[0].slug)}>
                <a className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-text-primary font-semibold hover:text-brand-primary transition-colors group">
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Grid of Remaining Posts */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {posts.slice(1).map((post, index) => (
            <ScrollReveal key={post._id || post.id} delay={index * 0.1} className="flex flex-col group">
              <Link href={routes.blogPost(post.slug)}>
                <div className="aspect-square w-full overflow-hidden mb-6 cursor-pointer">
                  <img 
                    src={post.imageUrl || post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </Link>
              
              <div className="mb-4 flex items-center gap-3 text-[10px] md:text-xs tracking-widest uppercase text-brand-primary font-semibold">
                <span>{post.category}</span>
                <span className="text-border-subtle">&bull;</span>
                <span className="text-text-muted">{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
              </div>
              
              <Link href={routes.blogPost(post.slug)}>
                <h3 className="font-serif text-2xl text-text-primary mb-4 hover:text-brand-primary transition-colors cursor-pointer leading-snug">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-text-muted leading-relaxed font-light mb-6 flex-grow">
                {post.excerpt}
              </p>
              
              <Link href={routes.blogPost(post.slug)}>
                <a className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-primary font-semibold hover:text-brand-primary transition-colors group mt-auto">
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  );
}
