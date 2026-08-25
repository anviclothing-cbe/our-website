import { useState } from "react"
import { Product } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Heart, ShieldCheck, Undo2, Truck, Star, Check, AlertCircle } from "lucide-react"
import { SizeSelector, ColorSwatch } from "@/components/ui/product-choice"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StarRating } from "../shared/StarRating"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"
import { getProductRatingSummary } from "@/lib/reviews"
import { ContextualSupport } from "../shared/ContextualSupport"
import { routes } from "@/lib/routes"
import { Link } from "wouter"
import { isLowStock } from "@/lib/merchandising"
import { product as productCopy, buttons, support, home, store } from "@/ui/index"
import { useCurrency } from "@/contexts/CurrencyContext";

interface ProductInfoProps {
  product: Product
  selectedSize: string | null
  setSelectedSize: (size: string | null) => void
  selectedColor: string | null
  setSelectedColor: (color: string | null) => void
  showSizeError: boolean
  setShowSizeError: (show: boolean) => void
  isAdded: boolean
  handleAddToBag: () => void
}

export function ProductInfo({ 
  product, 
  selectedSize, 
  setSelectedSize, 
  selectedColor, 
  setSelectedColor, 
  showSizeError, 
  setShowSizeError, 
  isAdded, 
  handleAddToBag 
}: ProductInfoProps) {
  const { formatPrice } = useCurrency();
  const [pincode, setPincode] = useState("")
  const [pincodeResult, setPincodeResult] = useState<string | null>(null)
  const [isNotifying, setIsNotifying] = useState(false)
  
  const { toast } = useToast()
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  const isWishlisted = isInWishlist(product.id)
  const reviewSummary = getProductRatingSummary(product.id)



  const handleNotifyMe = () => {
    setIsNotifying(true)
    setTimeout(() => {
      setIsNotifying(false)
      toast({
        title: "You're on the list!",
        description: "We'll notify you when this item is back in stock.",
      })
    }, 1000)
  }

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setPincodeResult("Delivery available within 3-5 days.")
    } else {
      setPincodeResult("Please enter a valid 6-digit pincode.")
    }
  }

  // Use the price styling matching the rest of the site (discount logic if originalPrice exists)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  
  return (
    <div className="w-full flex flex-col pt-2 md:pt-0 pb-16">
      {/* Title & Reviews */}
      <div className="mb-4">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-2">{product.title}</h1>
        {reviewSummary ? (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <div className="flex text-surface-accent pb-[2px]">
              <StarRating rating={reviewSummary.averageRating} size="sm" />
            </div>
            <span>{reviewSummary.averageRating.toFixed(1)} ({reviewSummary.totalReviews} reviews)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <a href="#reviews" className="underline hover:text-text-primary transition-colors">Be the first to review</a>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-6 flex items-end gap-3">
        <span className="text-2xl font-medium text-text-primary">
          {formatPrice((product.price || 0))}
        </span>
        {hasDiscount && (
          <div className="flex items-center gap-2 pb-[2px]">
            <span className="text-lg text-text-muted line-through">
              {formatPrice(product.originalPrice!)}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-error-fg bg-error-bg px-1.5 py-0.5 rounded-sm border border-red-200">
              Sale
            </span>
          </div>
        )}
        <span className="text-sm text-text-muted pb-1 ml-1">Incl. of all taxes</span>
      </div>

      {/* Short Description */}
      {product.description && (
        <p className="text-text-muted mb-8 max-w-lg">
          {product.description.split('.')[0]}.
        </p>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-8" id="product-options">
          <div className="flex justify-between items-center mb-3">
            <Label className="text-text-primary font-medium uppercase tracking-wider text-xs">
              {productCopy.details.colour}: <span className="text-text-muted normal-case ml-1 font-normal">{selectedColor}</span>
            </Label>
          </div>
          <div className="flex gap-3">
            {product.colors.map(color => {
              // Map basic color names to hex codes for UI
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
                <ColorSwatch 
                  key={color}
                  colorCode={colorMap[color] || '#CCCCCC'}
                  selected={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color}`}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-8 relative" id={(!product.colors || product.colors.length === 0) ? "product-options" : undefined}>
          <div className="flex justify-between items-end mb-3">
            <Label className="text-text-primary font-medium uppercase tracking-wider text-xs">{productCopy.details.size}</Label>
            <Link href={routes.helpSizeGuide()}>
              <a className="text-xs text-text-muted underline hover:text-text-primary transition-colors">
                {productCopy.details.sizeGuide}
              </a>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <SizeSelector
                key={size}
                selected={selectedSize === size}
                onClick={() => {
                  setSelectedSize(size)
                  setShowSizeError(false)
                }}
              >
                {size}
              </SizeSelector>
            ))}
          </div>
          {showSizeError && (
            <p className="text-error text-xs mt-2 absolute -bottom-5">Please select a size to continue.</p>
          )}
        </div>
      )}

      {/* Contextual Support: Size */}
      <div className="mb-8">
        <ContextualSupport 
          title={productCopy.sizeHelp.unsure}
          description="Our team can help you find the perfect fit."
          ctaText={buttons.askOnWhatsapp}
          params={{
            context: "sizeQuestion",
            productName: product.title,
            productUrl: typeof window !== 'undefined' ? window.location.href : undefined
          }}
        />
      </div>

      {/* Availability */}
      <div className="mb-8 flex flex-col gap-3">
        {product.inStock ? (
          <>
            {isLowStock(product) ? (
              <div className="bg-error-bg text-error border border-red-100 px-4 py-3 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">High Demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-red-200 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-error rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider">Only a few left</span>
                </div>
              </div>
            ) : (
              <p className="text-sm font-medium text-success flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
                {productCopy.availability.inStock}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm font-medium text-error flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error inline-block"></span>
            {productCopy.availability.unavailable}
          </p>
        )}
      </div>

      {/* Primary Actions */}
      <div className="flex gap-4 mb-10">
        {product.inStock ? (
          <Button 
            className={`flex-1 h-14 text-base font-medium transition-all duration-300 ${isAdded ? 'bg-success text-text-on-dark hover:bg-success/90' : ''}`}
            onClick={handleAddToBag}
            disabled={isAdded}
          >
            {isAdded ? (
              <span className="flex items-center gap-2 animate-in zoom-in duration-300"><Check className="w-5 h-5"/> ADDED TO BAG</span>
            ) : (
              buttons.addToBag
            )}
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="flex-1 h-14 text-base font-medium border-border-strong hover:bg-surface-dark hover:text-text-on-dark"
            onClick={handleNotifyMe}
            disabled={isNotifying}
          >
            {isNotifying ? "SUBSCRIBING..." : "NOTIFY ME WHEN AVAILABLE"}
          </Button>
        )}
        <Button 
          variant="outline" 
          className="h-14 w-14 p-0 shrink-0 border-border-default hover:border-border-strong"
          onClick={() => toggleWishlist(product.id)}
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-brand-primary text-brand-primary' : 'text-text-primary'}`} />
        </Button>
      </div>



      {/* Trust Microcopy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-text-muted mb-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-text-primary shrink-0" />
          <span>{home.trust.secure}</span>
        </div>
        <div className="flex items-start gap-3">
          <Undo2 className="w-5 h-5 text-text-primary shrink-0" />
          <span>{home.trust.exchange}</span>
        </div>
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-text-primary shrink-0" />
          <span>Free shipping on orders over ₹2,000</span>
        </div>
      </div>

      {/* Online-to-Offline Store Bridge */}
      <div className="mb-6 bg-surface p-5 rounded-sm flex flex-col items-center text-center border border-border-subtle">
        <p className="text-sm font-medium text-text-primary mb-1">{store.experience}</p>
        <p className="text-xs text-text-muted mb-3">Experience the fit and fabric in our boutique.</p>
        <Button variant="link" asChild className="text-brand-primary underline underline-offset-4 font-medium text-xs h-auto p-0 hover:text-brand-primary-hover">
          <Link href={routes.visitStore()}>
            {buttons.visitAnvi}
          </Link>
        </Button>
      </div>

      {/* Contextual Support: Styling / Fabric */}
      <div className="mb-6">
        <ContextualSupport 
          title={support.whatsapp.question}
          ctaText={buttons.chatWithAnvi}
          params={{
            context: "productQuestion",
            productName: product.title,
            productUrl: typeof window !== 'undefined' ? window.location.href : undefined
          }}
          className="bg-transparent border-t border-b border-border-subtle rounded-none p-0 py-6"
        />
      </div>
    </div>
  )
}
