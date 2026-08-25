import { Link } from "wouter"
import { Button } from "@/components/ui/button"

export function BrandStory() {
  return (
    <section className="w-full bg-brand-sand py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative aspect-[4/5] overflow-hidden">
            <img 
              src="/assets/brand_story.png" 
              alt="ANVI Curated collection" 
              className="w-full h-full object-cover rounded-sm"
            />
            {/* Subtle decorative offset border if desired, or keep it clean */}
            <div className="absolute inset-0 border border-border-subtle m-4 rounded-sm pointer-events-none" />
          </div>
          
          <div className="order-1 md:order-2 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-8 leading-tight">
              Curated with care.
            </h2>
            <div className="space-y-6 text-text-muted text-lg max-w-lg mb-10">
              <p>
                ANVI began with a simple thought — to bring together pieces that feel beautiful, comfortable and truly wearable.
              </p>
              <p>
                We believe that elegance shouldn't be reserved for special occasions. It should be part of your everyday rhythm. Every piece in our collection is handpicked to ensure it feels as good as it looks.
              </p>
            </div>
            <Button asChild variant="default" size="lg" className="min-w-[160px]">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
