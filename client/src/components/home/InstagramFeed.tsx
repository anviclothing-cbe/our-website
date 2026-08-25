import { Instagram, Play } from "lucide-react"
import { ScrollReveal } from "@/components/shared/ScrollReveal"

// Dummy posts for UGC/Instagram feed
const INSTAGRAM_POSTS = [
  { 
    type: "image", 
    src: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop",
    alt: "Instagram post 1"
  },
  { 
    type: "video", 
    src: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-a-black-dress-and-sunglasses-4881-large.mp4", 
    poster: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop",
    alt: "Instagram reel 1"
  },
  { 
    type: "image", 
    src: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop",
    alt: "Instagram post 2"
  },
  { 
    type: "video", 
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-fashionable-outfit-walking-in-the-street-32766-large.mp4", 
    poster: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop",
    alt: "Instagram reel 2"
  },
]

export function InstagramFeed() {
  return (
    <section className="w-full bg-surface py-16 md:py-24 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">Seen at ANVI</h2>
          <p className="text-text-muted max-w-2xl text-sm md:text-base mb-6">Everyday style, shared by the ANVI family.</p>
          <a 
            href="#" 
            className="inline-flex items-center text-sm font-medium text-text-primary hover:text-surface-accent transition-colors"
          >
            <Instagram className="w-4 h-4 mr-2" />
            FOLLOW @ANVICLOTHING
          </a>
          <p className="text-xs text-text-muted mt-2">(Note: Placeholder media for development)</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post, i) => (
            <ScrollReveal key={i} delay={i * 0.1} yOffset={20}>
              <a href="#" className="group relative aspect-square overflow-hidden bg-surface-light block">
              {post.type === "video" ? (
                <>
                  <video 
                    src={post.src} 
                    poster={post.poster}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  />
                  <div className="absolute top-2 right-2 text-white drop-shadow-md z-10">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </>
              ) : (
                <img 
                  src={post.src} 
                  alt={post.alt} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              <div className="absolute inset-0 bg-border-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
