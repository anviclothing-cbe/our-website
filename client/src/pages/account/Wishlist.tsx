import { Link } from "wouter"
import { useWishlist } from "@/contexts/WishlistContext"
import { ProductCard } from "@/components/shared/ProductCard"
import { wishlist as wishlistCopy, emptyStates } from "@/ui/index"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

import { useSEO } from "@/hooks/useSEO";

export default function Wishlist() {
  useSEO({ title: "My Wishlist | ANVI Clothing", noindex: true });
  const { wishlistProducts } = useWishlist()

  return (
    <div className="w-full space-y-8">
      <header className="border-b border-border-subtle pb-6">
        <h2 className="text-3xl font-serif text-text-primary">{wishlistCopy.title}</h2>
        <p className="text-text-muted mt-2">
          {wishlistCopy.support}
        </p>
      </header>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {wishlistProducts.map((product) => (
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
      ) : (
        <div className="bg-surface-light/50 border border-border-subtle rounded-sm p-12 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-text-muted mb-2 shadow-sm border border-border-subtle">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif text-text-primary mb-2">{emptyStates.wishlist.title}</h3>
          <p className="text-text-muted mb-6 max-w-md">{emptyStates.wishlist.support}</p>
          <Button asChild className="px-8 bg-button-primary text-text-on-dark hover:bg-button-primary-hover transition-colors">
            <Link href="/category/new-arrivals">
              {emptyStates.wishlist.cta}
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
