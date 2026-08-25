import { ProductCard, type ProductCardProps } from "@/components/shared/ProductCard"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"

interface HorizontalProductShowcaseProps {
  title: string
  subtitle?: string
  products: ProductCardProps[]
  ctaText: string
  ctaHref: string
}

export function HorizontalProductShowcase({ 
  title, 
  subtitle, 
  products, 
  ctaText, 
  ctaHref 
}: HorizontalProductShowcaseProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side: Title & CTA */}
        <div className="lg:w-1/4 flex flex-col justify-center items-start">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-muted mb-8 text-sm md:text-base max-w-sm">
              {subtitle}
            </p>
          )}
          <Button asChild variant="default" size="lg">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>

        {/* Right Side: Horizontal Scrollable Products */}
        <div className="lg:w-3/4">
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 sm:gap-6 snap-x hide-scrollbar">
            {products.map((product) => (
              <div key={product.id} className="min-w-[260px] sm:min-w-[280px] w-[260px] sm:w-[280px] snap-start flex-shrink-0">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
