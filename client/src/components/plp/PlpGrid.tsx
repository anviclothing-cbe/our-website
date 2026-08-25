import { Link } from "wouter"
import { useState, useEffect } from "react"
import { ProductCard } from "@/components/shared/ProductCard"
import { Product } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export interface PlpGridProps {
  products: Product[]
  onClearFilters?: () => void
  isSearch?: boolean
}

export function PlpGrid({ products, onClearFilters, isSearch }: PlpGridProps) {
  const INITIAL_COUNT = 12
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT)
  }, [products])
  
  const visibleProducts = products.slice(0, visibleCount)
  
  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center px-4">
        <h3 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">
          {isSearch ? "We couldn't find anything matching your search." : "Nothing here right now."}
        </h3>
        <p className="text-text-muted mb-8 max-w-md">
          {isSearch 
            ? "Try another search or explore our favourites." 
            : "We're working on something new. Check back soon."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {onClearFilters && !isSearch && (
            <Button onClick={onClearFilters} variant="outline" className="border-border-subtle min-w-[140px]">
              Clear all filters
            </Button>
          )}
          <Button asChild className="min-w-[140px]">
            <Link href="/collections/new-arrivals">View New Arrivals</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 mb-16">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
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
            product={product}
          />
        ))}
      </div>
      
      {/* Pagination / Load more */}
      {products.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center pt-8 border-t border-border-subtle">
          <p className="text-sm text-text-muted font-medium mb-6">
            Showing {visibleProducts.length} of {products.length} products
          </p>
          {visibleCount < products.length ? (
            <Button 
              onClick={() => setVisibleCount(prev => prev + INITIAL_COUNT)} 
              variant="outline" 
              className="w-full sm:w-auto min-w-[200px] border-border-subtle hover:bg-surface-light"
            >
              Load More
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full sm:w-auto min-w-[200px] border-border-subtle opacity-50">
              You've viewed all products
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
