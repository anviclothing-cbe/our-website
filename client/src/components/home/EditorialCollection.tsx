import { useState, useEffect } from "react"
import { Link } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard, type ProductCardProps } from "@/components/shared/ProductCard"

interface EditProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaHref: string;
  products?: ProductCardProps[];
}

interface EditorialCollectionProps {
  edits: EditProps[];
}

export function EditorialCollection({ edits }: EditorialCollectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play the carousel
  useEffect(() => {
    if (!edits || edits.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % edits.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [edits]);

  // Preload all images to ensure synced transitions (no layout shifts or staggered loading)
  useEffect(() => {
    if (!edits) return;
    edits.forEach((edit) => {
      const img = new window.Image();
      img.src = edit.imageUrl;
    });
  }, [edits]);

  if (!edits || edits.length === 0) return null;

  const activeEdit = edits[activeIndex];

  return (
    <section className="w-full bg-surface-light overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Side: Massive Editorial Image */}
          <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:pl-12 lg:pr-0">
            <Link href={activeEdit.ctaHref}>
              <a className="block relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeEdit.imageUrl}
                    src={activeEdit.imageUrl} 
                    alt={activeEdit.title} 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                  />
                </AnimatePresence>
              </a>
            </Link>
          </div>

          {/* Right Side: Typography & Curation */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-12 lg:py-0">
            
            {/* Text Content */}
            <div className="mb-10 max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEdit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-serif text-5xl md:text-7xl lg:text-[5rem] leading-[1.1] text-text-primary tracking-tight mb-6">
                    {activeEdit.title}
                  </h2>
                  <p className="text-text-muted text-lg leading-relaxed mb-8">
                    {activeEdit.description}
                  </p>
                  <Link href={activeEdit.ctaHref}>
                    <a className="inline-flex items-center text-sm font-medium tracking-widest uppercase border-b border-border-subtle pb-1 hover:border-border-strong transition-colors group">
                      {activeEdit.ctaText}
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Staggered Products */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEdit.title + "-products"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {activeEdit.products && activeEdit.products.length > 0 && (
                  <div className="flex flex-row items-end gap-4 sm:gap-8 overflow-x-auto hide-scrollbar pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0">
                    <div className="w-[220px] sm:w-[260px] flex-shrink-0 lg:-mt-16">
                      <ProductCard {...activeEdit.products[0]} />
                    </div>
                    {activeEdit.products.length > 1 && (
                      <div className="w-[220px] sm:w-[260px] flex-shrink-0">
                        <ProductCard {...activeEdit.products[1]} />
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            {edits.length > 1 && (
              <div className="flex items-center gap-3 mt-12">
                {edits.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1 transition-all duration-500 ${
                      idx === activeIndex 
                        ? "w-10 bg-button-primary" 
                        : "w-3 bg-border-subtle hover:bg-border-subtle"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
