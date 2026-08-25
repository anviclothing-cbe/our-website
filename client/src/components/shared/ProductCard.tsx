import { Link } from "wouter"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/WishlistContext"
import { cn } from "@/lib/utils"
import { isNewArrival, isBestseller, isLowStock } from "@/lib/merchandising"
import { Product } from "@/lib/mock-data"
import { useCurrency } from "@/contexts/CurrencyContext";

export interface ProductCardProps {
  id: string
  title: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  badge?: "New" | "Bestseller" | "Sale" | "Few Left" | "Sold out" | string
  href: string
  // For dynamic badging
  createdAt?: string
  salesCount?: number
  inStock?: boolean
  colors?: string[]
  // Optional full product object for ease of checking
  product?: Product
}

export function ProductCard({ id, title, price, originalPrice, image, hoverImage, badge, href, createdAt, salesCount, inStock = true, colors, product }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist()
  const saved = isInWishlist(id)

  // Dynamic merchandising badge logic
  let displayBadge = badge;
  let isSoldOut = inStock === false;
  
  if (product && !isSoldOut) {
    if (isLowStock(product)) {
      displayBadge = "Low Stock";
    } else if (!displayBadge) {
      if (originalPrice && originalPrice > price) displayBadge = "Sale";
      else if (isNewArrival(product)) displayBadge = "New";
      else if (isBestseller(product)) displayBadge = "Bestseller";
    }
  } else if (!isSoldOut) {
    // Fallback if individual props were passed instead of full object
    const mockProduct = { id, title, price, image, href, sizes: [], colors: [], occasion: [], category: "", slug: "", inStock, createdAt, salesCount } as Product;
    if (isLowStock(mockProduct)) {
      displayBadge = "Low Stock";
    } else if (!displayBadge) {
      if (originalPrice && originalPrice > price) displayBadge = "Sale";
      else if (createdAt && isNewArrival(mockProduct)) displayBadge = "New";
      else if (salesCount !== undefined && isBestseller(mockProduct)) displayBadge = "Bestseller";
    }
  }

  if (isSoldOut) {
    displayBadge = "Sold Out";
  }

  return (
    <div className="group flex flex-col space-y-3">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface block">
        {displayBadge && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <Badge 
              variant={displayBadge === "Sale" || displayBadge === "Low Stock" ? "destructive" : displayBadge === "Sold Out" ? "secondary" : "default"} 
              className={cn(
                "font-medium px-2 py-0.5 text-[10px] tracking-wide uppercase shadow-sm",
                displayBadge === "Bestseller" && "bg-surface-accent text-text-on-dark hover:bg-surface-accent-light"
              )}
            >
              {displayBadge}
            </Badge>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-surface-light/50 backdrop-blur transition-all duration-200 hover:bg-surface-light text-text-primary active:scale-90",
            saved ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(id)
          }}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
        >
          <Heart className={cn("h-4 w-4 transition-colors", saved && "fill-brand-primary text-brand-primary")} />
        </Button>
        <Link href={href}>
          <a className="block w-full h-full" aria-label={`View details for ${title}`}>
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:opacity-0"
            />
            {hoverImage && (
              <img
                src={hoverImage}
                alt={`${title} alternate view`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-0 scale-100 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
              />
            )}
            
            {/* Out of Stock Overlay */}
            {isSoldOut && (
              <div className="absolute inset-0 bg-surface-dark/40 flex items-center justify-center backdrop-blur-[1px] z-10">
                <span className="font-serif text-text-on-dark text-lg bg-surface-dark/80 px-4 py-1 border border-border-subtle rounded-sm">Sold Out</span>
              </div>
            )}
          </a>
        </Link>
        
        {/* Quick Action Overlay */}
        {!isSoldOut && (
          <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 hidden md:block">
            <Button 
              className="w-full bg-surface-light/95 backdrop-blur-sm text-text-primary hover:bg-surface-dark hover:text-text-on-dark border border-transparent shadow-sm h-10 text-xs tracking-wider"
              asChild
            >
              <Link href={href}>QUICK SHOP</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <Link href={href}>
          <a className="text-sm font-medium text-text-primary hover:underline line-clamp-2" title={title}>
            {title}
          </a>
        </Link>
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold text-text-primary">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-text-muted line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
        {colors && colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5">
            {colors.slice(0, 4).map(color => {
              const colorMap: Record<string, string> = {
                'Ivory': '#FAF7F2',
                'White': '#FFFFFF',
                'Beige': '#F1E8DC',
                'Brown': '#8B4513',
                'Pink': '#FFC0CB',
                'Multi': '#D3D3D3',
                'Green': '#008000',
                'Blue': '#0000FF',
                'Yellow': '#FFFF00',
                'Orange': '#FFA500',
                'Red': '#FF0000',
                'Gold': '#D4B27C',
                'Maroon': '#7C243A',
                'Black': '#000000',
                'Charcoal': '#2F2B2B'
              }
              return (
                <div 
                  key={color} 
                  className="w-3.5 h-3.5 rounded-full border border-border-subtle"
                  style={{ backgroundColor: colorMap[color] || '#CCCCCC' }}
                  title={color}
                />
              )
            })}
            {colors.length > 4 && (
              <span className="text-[10px] text-text-muted ml-0.5">+{colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
