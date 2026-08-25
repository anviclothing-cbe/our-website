import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Update active index based on scroll position for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, clientWidth } = scrollContainerRef.current
        const newIndex = Math.round(scrollLeft / clientWidth)
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex)
        }
      }
    }
    
    const container = scrollContainerRef.current
    container?.addEventListener('scroll', handleScroll, { passive: true })
    return () => container?.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  // Fallback if no images
  if (!images || images.length === 0) {
    return <div className="aspect-[3/4] bg-surface-light flex items-center justify-center text-text-muted">No images available</div>
  }

  return (
    <div className="flex flex-col md:flex-row md:gap-6 w-full relative">
      {/* Mobile Swipe Gallery */}
      <div className="md:hidden relative w-full overflow-hidden mb-6">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, idx) => (
            <div key={idx} className="w-full flex-shrink-0 snap-center aspect-[3/4] relative">
              <img 
                src={image} 
                alt={`${title} - View ${idx + 1}`} 
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Simple pagination dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                idx === activeIndex ? "bg-background w-3" : "bg-background/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop Vertical Thumbnails */}
      <div className="hidden md:flex flex-col gap-4 w-20 flex-shrink-0 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "aspect-[3/4] w-full overflow-hidden border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              idx === activeIndex ? "border-border-strong" : "border-transparent opacity-70 hover:opacity-100"
            )}
            aria-label={`View image ${idx + 1} of ${images.length}`}
            aria-current={idx === activeIndex ? "true" : "false"}
          >
            <img src={image} alt={`${title} thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Desktop Main Image */}
      <div className="hidden md:block flex-1 relative group bg-surface-light">
        <div className="aspect-[3/4] w-full relative overflow-hidden cursor-zoom-in" onClick={() => setIsZoomOpen(true)}>
          <img 
            src={images[activeIndex]} 
            alt={`${title} - View ${activeIndex + 1}`} 
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Search className="w-5 h-5 text-text-primary" />
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-[80vw] h-[95vh] p-0 bg-background overflow-hidden flex flex-col items-center justify-center border-none">
          <DialogTitle className="sr-only">{title} Image Zoom</DialogTitle>
          <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
            <img 
              src={images[activeIndex]} 
              alt={`${title} Zoomed`} 
              className="max-w-none w-auto max-h-[150vh] object-contain cursor-zoom-out"
              onClick={() => setIsZoomOpen(false)}
            />
          </div>
          {/* Zoom thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/90 p-2 rounded-full shadow-md">
             {images.map((img, idx) => (
               <button
                 key={idx}
                 onClick={() => setActiveIndex(idx)}
                 className={cn(
                   "w-12 h-16 rounded overflow-hidden border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                   idx === activeIndex ? "border-border-strong" : "border-transparent"
                 )}
                 aria-label={`View zoomed image ${idx + 1} of ${images.length}`}
                 aria-current={idx === activeIndex ? "true" : "false"}
               >
                 <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
               </button>
             ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
