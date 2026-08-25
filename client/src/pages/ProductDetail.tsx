import { useEffect, useState, useRef } from "react"
import { fetchProductBySlug } from "@/lib/api"
import { useRoute } from "wouter"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbList } from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/pdp/ProductGallery"
import { ProductInfo } from "@/components/pdp/ProductInfo"
import { ProductAccordions } from "@/components/pdp/ProductAccordions"
import { ProductRecommendations } from "@/components/pdp/ProductRecommendations"
import { StickyPurchaseBar } from "@/components/pdp/StickyPurchaseBar"
import { ProductReviews } from "@/components/pdp/ProductReviews"
import { usePersonalization } from "@/contexts/PersonalizationContext"
import { useSEO } from "@/hooks/useSEO"
import { useCart } from "@/contexts/CartContext"

export default function ProductDetail() {
  const [, params] = useRoute("/product/:slug")
  const slug = params?.slug

  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const infoAreaRef = useRef<HTMLDivElement>(null)

  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [showSizeError, setShowSizeError] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  
  const { addToCart } = useCart()

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      try {
        setIsLoading(true);
        const data = await fetchProductBySlug(slug);
        setProduct({ ...data, id: data._id, title: data.name });
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug])
  useSEO({
    title: product ? `${product.name} | ANVI Clothing` : "Product Not Found | ANVI Clothing",
    description: product ? `Buy ${product.name}. Beautiful, comfortable ${product.category} for everyday wear. Shop at ANVI Clothing.` : "Product details",
    canonical: product ? `https://anvi.clothing/product/${product.slug || product.id}` : undefined,
    ogImage: product?.images?.[0] ? `https://anvi.clothing${product.images[0]}` : undefined,
    ogType: "product",
    structuredData: product ? {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.images?.map((img: string) => `https://anvi.clothing${img}`),
      "description": `Buy ${product.name}. Beautiful, comfortable ${product.category} for everyday wear. Shop at ANVI Clothing.`,
      "sku": product.id,
      "brand": {
        "@type": "Brand",
        "name": "ANVI Clothing"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://anvi.clothing/product/${product.slug || product.id}`,
        "priceCurrency": "INR",
        "price": product.price,
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "ANVI Clothing"
        }
      }
    } : undefined
  });

  // Scroll to top on mount or route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  // Track Personalization
  const { trackProductView, trackCategoryView } = usePersonalization()
  useEffect(() => {
    if (product) {
      trackProductView(product.id)
      trackCategoryView(product.category)
    }
  }, [product, trackProductView, trackCategoryView])

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0])
    }
  }, [product, selectedColor])

  const handleAddToBag = () => {
    if (!product || isAdded) return
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setShowSizeError(true)
      const el = document.getElementById('product-options')
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100 // offset for fixed header
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
      return
    }
    
    setShowSizeError(false)
    setIsAdded(true)
    
    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor, 1)
      setTimeout(() => setIsAdded(false), 500)
    }, 400)
  }

  // Handle sticky purchase bar visibility on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!infoAreaRef.current) return
      
      const infoRect = infoAreaRef.current.getBoundingClientRect()
      // If the bottom of the info area is above the viewport (scrolled past), show sticky bar
      if (infoRect.bottom < 0) {
        setIsStickyVisible(true)
      } else {
        setIsStickyVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initial check
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full pb-24 md:pb-0 animate-pulse">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-16 md:mt-24">
          <div className="h-4 w-48 bg-border-subtle rounded"></div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="w-full aspect-[3/4] bg-surface rounded-2xl"></div>
            <div className="w-full flex flex-col space-y-6 pt-4">
              <div className="h-8 w-3/4 bg-border-subtle rounded"></div>
              <div className="h-6 w-1/4 bg-border-subtle rounded"></div>
              <div className="h-24 w-full bg-surface rounded"></div>
              <div className="h-12 w-full bg-border-subtle rounded-full mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif text-text-primary mb-4">Product Not Found</h1>
        <p className="text-text-muted">The product you are looking for does not exist or has been removed.</p>
      </div>
    )
  }

  // Ensure images array exists, fallback to single image if missing
  const images = product.images || (product.image ? [product.image] : [])

  return (
    <div className="w-full pb-24 md:pb-0">
      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-16 md:mt-24">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/collections/${product.category}`} className="capitalize">
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-[150px] sm:max-w-[300px]">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 relative items-start">
          {/* Left Column - Gallery */}
          <div className="w-full">
            <ProductGallery images={images} title={product.title} />
          </div>

          {/* Right Column - Information */}
          <div className="w-full md:sticky md:top-24" ref={infoAreaRef}>
            <ProductInfo 
              product={product} 
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              showSizeError={showSizeError}
              setShowSizeError={setShowSizeError}
              isAdded={isAdded}
              handleAddToBag={handleAddToBag}
            />
            <ProductAccordions product={product} />
          </div>
        </div>

        {/* Recommendations */}
        <ProductRecommendations currentProductId={product.id} category={product.category} />
      </div>

      {/* Reviews */}
      <ProductReviews productId={product.id} productName={product.title} />

      {/* Mobile Sticky Bar */}
      <StickyPurchaseBar 
        product={product} 
        isVisible={isStickyVisible} 
        handleAddToBag={handleAddToBag}
        isAdded={isAdded}
      />
    </div>
  )
}
