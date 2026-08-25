import { useState, useEffect } from "react"
import { Link } from "wouter"
import { Search, ShoppingBag, User, Heart } from "lucide-react"
import { Logo } from "@/components/shared/Logo"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchOverlay } from "@/components/search/SearchOverlay"
import { useCart } from "@/contexts/CartContext"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { navigation } from "@/ui/index"
import { fetchStoreContent } from "@/lib/api"
import { CurrencySelector } from "./CurrencySelector"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount, setIsCartDrawerOpen } = useCart()
  const [promotion, setPromotion] = useState<any>(null)

  useEffect(() => {
    fetchStoreContent("announcement")
      .then(data => {
        if (data && data.announcements && data.announcements.length > 0) {
          setPromotion(data.announcements[0])
        } else {
          setPromotion(data?.content || data)
        }
      })
      .catch(err => console.error("Failed to fetch announcement:", err))

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-surface-dark text-text-on-dark backdrop-blur supports-[backdrop-filter]:bg-surface-dark/95 transition-all duration-300",
          isScrolled ? "border-border-subtle shadow-sm" : "border-transparent"
        )}
      >
        {/* Announcement Bar */}
        {promotion?.isActive && (
          <div className="bg-surface text-text-primary overflow-hidden relative flex whitespace-nowrap py-2 text-sm font-bold tracking-wide">
            <div className="animate-marquee inline-block w-full">
              {promotion.link ? (
                <Link href={promotion.link}>
                  <a className="hover:text-brand-primary-hover transition-colors font-bold no-underline">
                    {promotion.message || promotion.bannerText}
                  </a>
                </Link>
              ) : (
                promotion.message || promotion.bannerText
              )}
            </div>
          </div>
        )}

        <div className="relative mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-start gap-4">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <div className="hidden lg:block">
              <Logo />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
            <Logo imageClassName="h-12" />
          </div>

          <div className="hidden lg:flex flex-none justify-center">
            <DesktopNav />
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 lg:gap-4">
            <div className="hidden lg:flex">
              <CurrencySelector />
            </div>
            <Button onClick={() => setIsSearchOpen(true)} variant="ghost" size="icon" className="hidden lg:flex text-text-on-dark hover:bg-surface-dark/80 hover:text-brand-gold transition-colors" aria-label={navigation.utility.search} aria-haspopup="dialog" aria-expanded={isSearchOpen}>
              <Search className="h-5 w-5" />
            </Button>
            
            <Link href="/account">
              <a className="hidden lg:flex items-center justify-center h-10 w-10 rounded-md text-text-on-dark hover:bg-surface-dark/80 hover:text-brand-gold transition-colors" aria-label={navigation.utility.account}>
                <User className="h-5 w-5" />
              </a>
            </Link>
            
            <Link href="/account/wishlist">
              <a className="hidden lg:flex items-center justify-center h-10 w-10 rounded-md text-text-on-dark hover:bg-surface-dark/80 hover:text-brand-gold transition-colors" aria-label={navigation.utility.wishlist}>
                <Heart className="h-5 w-5" />
              </a>
            </Link>

            {/* Search on mobile */}
            <Button onClick={() => setIsSearchOpen(true)} variant="ghost" size="icon" className="lg:hidden text-text-on-dark hover:bg-surface-dark/80 hover:text-brand-gold transition-colors" aria-label={navigation.utility.search} aria-haspopup="dialog" aria-expanded={isSearchOpen}>
              <Search className="h-5 w-5" />
            </Button>

          <Button 
              onClick={() => setIsCartDrawerOpen(true)}
              variant="ghost" 
              size="icon" 
              className="relative text-text-on-dark hover:bg-surface-dark/80 hover:text-brand-gold transition-colors" 
              aria-label={navigation.utility.bag}
              aria-haspopup="dialog"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span key={itemCount} className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-text-on-dark transform translate-x-1 -translate-y-1 animate-zoom-in">
                  {itemCount}
                  <span className="sr-only">Items in bag</span>
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      <CartDrawer />
    </>
  )
}
