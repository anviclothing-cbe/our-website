import { Link } from "wouter"

const OCCASIONS = [
  { 
    title: "Everyday", 
    description: "Easy styles for your everyday.",
    href: "/discover/everyday", 
    image: "/anvi_main_logo.png" 
  },
  { 
    title: "Office", 
    description: "Polished looks for your work days.",
    href: "/discover/office", 
    image: "/anvi_main_logo.png" 
  },
  { 
    title: "Festive", 
    description: "Beautiful styles for celebrations.",
    href: "/discover/festive", 
    image: "/anvi_main_logo.png" 
  }
]

export function OccasionDiscovery() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col items-center mb-14 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">Shop by Occasion</h2>
        <p className="text-text-muted text-base md:text-lg max-w-lg">Find something right for the moment.</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-6 md:gap-12">
        {OCCASIONS.map((occasion) => (
          <Link key={occasion.title} href={occasion.href}>
            <a className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-[120px] bg-surface-light shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="mt-6 font-serif text-xl md:text-2xl text-text-primary transition-colors group-hover:text-surface-accent">
                {occasion.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted max-w-[200px] leading-relaxed">
                {occasion.description}
              </p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-text-primary group-hover:text-brand-primary transition-colors border-b border-transparent group-hover:border-brand-primary pb-1">
                EXPLORE
              </span>
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}
