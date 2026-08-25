import { ProductCard, type ProductCardProps } from "@/components/shared/ProductCard"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"

interface ProductShowcaseProps {
  title: string
  subtitle: string
  products: ProductCardProps[]
  ctaText: string
  ctaHref: string
}

export function ProductShowcase({ title, subtitle, products, ctaText, ctaHref }: ProductShowcaseProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">{title}</h2>
        <p className="text-text-muted max-w-2xl text-sm md:text-base">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild variant="default" size="lg" className="min-w-[200px]">
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  )
}
