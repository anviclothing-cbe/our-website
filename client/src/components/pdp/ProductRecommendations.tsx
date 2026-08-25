import { useEffect, useState } from "react"
import { ProductCard } from "@/components/shared/ProductCard"
import { usePersonalization } from "@/contexts/PersonalizationContext"
import { getRelatedProducts } from "@/lib/merchandising"
import { Product } from "@/lib/mock-data"

interface ProductRecommendationsProps {
  currentProductId: string
  category: string
}

interface RecommendationSection {
  title: string
  products: Product[]
  reason?: string
}

export function ProductRecommendations({ currentProductId, category }: ProductRecommendationsProps) {
  const context = usePersonalization();
  const [recommendationSections, setRecommendationSections] = useState<RecommendationSection[]>([]);
  
  useEffect(() => {
    async function fetchRecommendations() {
      const sections = await getRelatedProducts(currentProductId, context, 4);
      setRecommendationSections(sections);
    }
    fetchRecommendations();
  }, [currentProductId, context]);

  if (recommendationSections.length === 0) return null;

  return (
    <div className="w-full mt-24 mb-16 border-t border-border-subtle pt-16 space-y-16">
      {recommendationSections.map((section, idx) => (
        <section key={idx}>
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
              {section.title}
            </h2>
            {section.reason && (
              <p className="text-sm text-text-muted">{section.reason}</p>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {section.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                id={product.id}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                hoverImage={product.hoverImage}
                badge={product.badge}
                href={product.href}
                inStock={product.inStock}
                createdAt={product.createdAt}
                salesCount={product.salesCount}
                colors={product.colors}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
