export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "building-the-perfect-capsule-wardrobe",
    title: "Building the Perfect Capsule Wardrobe for Every Season",
    excerpt: "Discover the foundational pieces every modern woman needs to effortlessly transition from season to season without sacrificing style or comfort.",
    content: "A capsule wardrobe is the secret to never having a 'nothing to wear' moment again. By curating a selection of versatile, high-quality pieces, you can mix and match to create endless elegant looks...",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
    category: "Style Guide",
    author: "Nivetha",
    publishDate: "October 12, 2023"
  },
  {
    id: "2",
    slug: "why-linen-is-your-best-friend",
    title: "Why Linen is Your Best Friend This Summer",
    excerpt: "Breathable, elegant, and timeless. Here is why investing in quality linen will elevate your warm-weather wardrobe.",
    content: "When the temperature rises, there is nothing quite like the cool, crisp feel of pure linen against your skin. Often misunderstood for its tendency to wrinkle, true fashion lovers know that the relaxed crease of linen is exactly what makes it so chic...",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop",
    category: "Fabric Focus",
    author: "Editorial Team",
    publishDate: "August 28, 2023"
  },
  {
    id: "3",
    slug: "from-desk-to-dinner-styling-co-ords",
    title: "From Desk to Dinner: Styling Co-ord Sets",
    excerpt: "The ultimate cheat code to looking polished with minimal effort. Learn how to dress your co-ords up or down.",
    content: "Co-ord sets have revolutionized the modern woman's wardrobe. Gone are the days of staring blankly into your closet trying to pair a top with bottoms. The beauty of a matching set lies in its duality...",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop",
    category: "Styling Tips",
    author: "Nivetha",
    publishDate: "July 15, 2023"
  },
  {
    id: "4",
    slug: "the-art-of-layering-jewelry",
    title: "The Art of Layering: Elevating Everyday Outfits",
    excerpt: "Sometimes the simplest outfit just needs the right combination of accessories and layers to make it extraordinary.",
    content: "Mastering the art of layering can take an outfit from basic to brilliant. It adds depth, texture, and visual interest to even the simplest jeans and tee combination...",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2000&auto=format&fit=crop",
    category: "Accessories",
    author: "Editorial Team",
    publishDate: "May 05, 2023"
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
