import { useState, useEffect } from "react"
import { Link } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { fetchStoreContent } from "@/lib/api"

const BANNERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop",
    eyebrow: "THE NEW ANVI EDIT",
    titleStart: "Elegance,",
    titleEnd: "made easy.",
    subtitle: "Sarees, salwars and everyday styles chosen to make you feel beautiful, wherever the day takes you.",
    href: "/collections/new-arrivals",
    cta: "SHOP THE EDIT",
    secondaryCta: "EXPLORE COLLECTIONS",
    secondaryHref: "/collections"
  }
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [banners, setBanners] = useState<any[]>(BANNERS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStoreContent("hero")
      .then((data) => {
        if (data && data.banners && data.banners.length > 0) {
          setBanners(data.banners);
        }
      })
      .catch((err) => console.error("Failed to fetch hero banners:", err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners])

  if (isLoading) {
    return (
      <section className="w-full bg-surface-dark relative overflow-hidden h-[60vh] md:h-[80vh] flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full border-2 border-[#CEA53B] border-t-transparent animate-spin" />
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="w-full bg-surface relative overflow-hidden h-[60vh] md:h-[80vh]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Link href={banners[currentIndex]?.ctaLink || banners[currentIndex]?.href || "#"}>
            <a className="block w-full h-full relative group">
              <img
                src={banners[currentIndex]?.image}
                alt={banners[currentIndex]?.titleStart}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Dark overlay for text readability on any backdrop */}
              <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent pointer-events-none" />
              
              <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-24 max-w-xl text-left z-10">
                {banners[currentIndex]?.eyebrow && (
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-brand-primary text-sm tracking-[0.2em] font-semibold mb-4 drop-shadow-md"
                  >
                    {banners[currentIndex].eyebrow}
                  </motion.p>
                )}
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#CEA53B] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] italic leading-tight"
                >
                  {banners[currentIndex]?.titleStart}<br/>
                  <span className="text-3xl md:text-5xl text-[#FFFDF8]">{banners[currentIndex]?.titleEnd}</span>
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-[#FFFDF8] text-lg md:text-xl mb-8 max-w-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                >
                  {banners[currentIndex]?.subtitle}
                </motion.p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="inline-block bg-surface-dark text-text-on-dark px-10 py-4 text-sm font-semibold tracking-wider hover:bg-brand-primary transition-colors duration-300 shadow-sm text-center"
                  >
                    {banners[currentIndex]?.ctaText || banners[currentIndex]?.cta}
                  </motion.span>
                  {banners[currentIndex]?.secondaryCta && (
                    <motion.a 
                      href={banners[currentIndex]?.secondaryHref || "#"}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="inline-block bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 text-sm font-semibold tracking-wider hover:bg-white/20 transition-colors duration-300 shadow-sm text-center"
                    >
                      {banners[currentIndex].secondaryCta}
                    </motion.a>
                  )}
                </div>
              </div>
            </a>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-background md:bg-button-primary w-8" 
                : "bg-background/50 md:bg-border-subtle hover:bg-background/80 md:hover:bg-border-subtle"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
