import { useEffect, useState } from "react"
import { Product } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useCurrency } from "@/contexts/CurrencyContext";

interface StickyPurchaseBarProps {
  product: Product
  isVisible: boolean
  handleAddToBag: () => void
  isAdded: boolean
}

export function StickyPurchaseBar({ product, isVisible, handleAddToBag, isAdded }: StickyPurchaseBarProps) {
  const { formatPrice } = useCurrency();

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface-light border-t border-border-subtle px-4 py-3 pb-safe shadow-lg animate-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-primary truncate max-w-[150px]">
            {product.title}
          </span>
          <span className="text-base font-semibold text-text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
        <Button 
          className={`flex-1 max-w-[200px] transition-all duration-300 ${isAdded ? 'bg-success text-text-on-dark hover:bg-success/90' : ''}`}
          disabled={!product.inStock || isAdded}
          onClick={handleAddToBag}
        >
          {!product.inStock ? "SOLD OUT" : isAdded ? (
            <span className="flex items-center gap-2"><Check className="w-4 h-4"/> ADDED</span>
          ) : (
            "ADD TO BAG"
          )}
        </Button>
      </div>
    </div>
  )
}
