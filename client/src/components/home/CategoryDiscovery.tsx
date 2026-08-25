import { Link } from "wouter"
import { home } from "@/ui/index"

const CATEGORIES = [
  { 
    id: "women",
    title: "Women", 
    href: "/category/women", 
    image: "/anvi_main_logo.png" 
  },
  { 
    id: "sarees",
    title: "Sarees", 
    href: "/category/sarees", 
    image: "/anvi_main_logo.png" 
  },
  { 
    id: "salwars",
    title: "Salwars", 
    href: "/category/salwars", 
    image: "/anvi_main_logo.png" 
  },
  { 
    id: "kidswear",
    title: "Kidswear", 
    href: "/category/kidswear", 
    image: "/anvi_main_logo.png" 
  },
]

export function CategoryDiscovery() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col items-center mb-14 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">{home.categories.heading}</h2>
        <p className="text-text-muted text-base md:text-lg max-w-lg">{home.categories.support}</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {CATEGORIES.map((category) => {
          const categoryCopy = home.categories[category.id as keyof typeof home.categories] as any;
          return (
            <Link key={category.id} href={category.href}>
              <a className="group flex flex-col items-center text-center">
                <div className="relative w-full aspect-[2/3] overflow-hidden rounded-[120px] bg-surface-light shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="mt-6 font-serif text-xl md:text-2xl text-text-primary transition-colors group-hover:text-surface-accent">
                  {categoryCopy?.title || category.title}
                </h3>
                {categoryCopy?.description && (
                  <p className="mt-2 text-sm text-text-muted max-w-[200px] leading-relaxed">
                    {categoryCopy.description}
                  </p>
                )}
                <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-text-primary group-hover:text-brand-primary transition-colors border-b border-transparent group-hover:border-brand-primary pb-1">
                  {categoryCopy?.cta || "Explore"}
                </span>
              </a>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
