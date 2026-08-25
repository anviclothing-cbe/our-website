import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { routes } from "@/lib/routes";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchBlogPostBySlug } from "@/lib/api";

export default function BlogPostDetail() {
  const [, params] = useRoute("/journal/:slug");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.slug) return;
    setLoading(true);
    fetchBlogPostBySlug(params.slug)
      .then(data => setPost(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [params?.slug]);

  useSEO({
    title: post ? `${post.title} | ANVI Journal` : "Journal | ANVI Clothing",
    description: post?.excerpt || "Read our latest journal entry.",
    canonical: post ? `https://anvi.clothing/journal/${post.slug}` : "https://anvi.clothing/journal",
    ogImage: post?.imageUrl || post?.image,
    ogType: "article",
    structuredData: post ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.imageUrl || post.image,
      "datePublished": post.publishedAt || post.createdAt,
      "author": {
        "@type": "Person",
        "name": post.author || "Anvi Editorial"
      }
    } : undefined
  });

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-surface px-6">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-surface px-6">
        <h1 className="font-serif text-3xl mb-4">Article Not Found</h1>
        <Link href={routes.blog()}>
          <a className="text-sm uppercase tracking-widest text-brand-primary underline underline-offset-4">
            Return to Journal
          </a>
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-surface min-h-screen pb-24">
      
      {/* Hero Image */}
      <section className="w-full h-[60vh] md:h-[80vh] relative">
        <img 
          src={post.imageUrl || post.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Article Header */}
      <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
        <ScrollReveal>
          <div className="mb-6 flex justify-center items-center gap-4 text-xs tracking-widest uppercase text-brand-primary font-semibold">
            <span>{post.category}</span>
            <span className="text-border-subtle">&bull;</span>
            <span className="text-text-muted">{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-8 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-sm uppercase tracking-widest text-text-muted font-medium">
            By {post.author || "Anvi Editorial"}
          </p>
        </ScrollReveal>
      </section>

      {/* Article Content */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <ScrollReveal delay={0.2}>
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-text-primary prose-headings:font-normal prose-p:text-text-muted prose-p:font-light prose-p:leading-relaxed prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline">
            <p className="text-xl md:text-2xl text-text-primary font-serif italic mb-10 leading-relaxed text-center">
              "{post.excerpt}"
            </p>
            
            <p>
              {post.content}
            </p>
            
            <p>
              When building your wardrobe, it's essential to focus on fabrics and cuts that not only flatter your body but also withstand the test of time. Fast fashion might give you a quick fix, but investing in quality garments means you'll have pieces that you can return to season after season.
            </p>
            
            <h3 className="text-2xl mt-12 mb-6">The Importance of Quality Over Quantity</h3>
            
            <p>
              We believe in the power of less but better. A closet bursting with clothes often leads to decision fatigue. By curating your collection down to the absolute essentials—and a few statement pieces—you create breathing room in both your closet and your mind.
            </p>
            
            <p>
              Remember, style is deeply personal. Use these guidelines as a starting point, but always trust your own intuition when it comes to what makes you feel beautiful and confident.
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4} className="mt-16 pt-8 border-t border-border-subtle flex justify-between items-center">
          <Link href={routes.blog()}>
            <a className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-primary font-semibold hover:text-brand-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </a>
          </Link>
          
          <div className="flex gap-4">
            {/* Social Share Mock */}
            <span className="text-xs uppercase tracking-widest text-text-muted">Share:</span>
            <button className="text-text-primary hover:text-brand-primary transition-colors text-sm">IG</button>
            <button className="text-text-primary hover:text-brand-primary transition-colors text-sm">PIN</button>
          </div>
        </ScrollReveal>
      </section>

      {/* Read Next Section (Removed logic to keep it simple, or you can implement random post fetch later) */}
      <section className="w-full bg-surface-light py-20 border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href={routes.blog()}>
            <a className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-text-primary font-semibold hover:text-brand-primary transition-colors">
              Explore More Articles
            </a>
          </Link>
        </div>
      </section>

    </article>
  );
}
