import { useEffect, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { usePersonalization } from "@/contexts/PersonalizationContext"
import { getCartRecommendations } from "@/lib/merchandising"
import { ProductCard } from "@/components/shared/ProductCard"
import { Product } from "@/lib/mock-data"

export function CartRecommendations({ layout = "drawer" }: { layout?: "drawer" | "page" }) {
  const { cartItems } = useCart()
  const context = usePersonalization()
  const [recommendations, setRecommendations] = useState<Product[]>([])
  
  useEffect(() => {
    async function fetchRecommendations() {
      const cartItemIds = cartItems.map(item => item.product.id)
      const data = await getCartRecommendations(cartItemIds, context)
      setRecommendations(data)
    }
    fetchRecommendations()
  }, [cartItems, context])

  if (recommendations.length === 0) return null

  return (
    <div className={layout === "drawer" ? "mt-8 pt-6 border-t border-border-subtle" : "mt-12 pt-10 border-t border-border-subtle"}>
      <h3 className={layout === "drawer" ? "font-serif text-lg text-text-primary mb-4" : "font-serif text-2xl text-text-primary mb-6"}>
        {cartItems.length === 0 ? "Picked for you" : "You may also like"}
      </h3>
      <div className={layout === "drawer" ? "grid grid-cols-2 gap-4" : "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6"}>
        {recommendations.map(product => (
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
    </div>
  )
}
