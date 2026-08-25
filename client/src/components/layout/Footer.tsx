import { Logo } from "@/components/shared/Logo"
import { Link } from "wouter"
import { routes } from "@/lib/routes"
import { home, store } from "@/ui/index"
import { FOOTER_NAVIGATION } from "@/lib/navigation"

export function Footer() {
  return (
    <footer className="w-full bg-surface-dark text-text-on-dark pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-8 mb-4">
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col items-start lg:mr-8">
            <Logo className="mb-3 -ml-2 md:-ml-4" imageClassName="h-16 md:h-24 object-left" />
            <p className="text-champagne-300 text-sm max-w-xs leading-relaxed hidden lg:block">
              {home.footer.support}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 uppercase tracking-wider text-xs text-text-on-dark">Shop</h4>
            <ul className="space-y-2.5 text-sm text-ivory-300">
              {FOOTER_NAVIGATION.shop.map((item) => (
                <li key={item.title}><Link href={item.href}><a className="hover:text-gold-400 transition-colors">{item.title}</a></Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 uppercase tracking-wider text-xs text-text-on-dark">Collections</h4>
            <ul className="space-y-2.5 text-sm text-ivory-300">
              {FOOTER_NAVIGATION.collections.map((item) => (
                <li key={item.title}><Link href={item.href}><a className="hover:text-gold-400 transition-colors">{item.title}</a></Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 uppercase tracking-wider text-xs text-text-on-dark">Discover</h4>
            <ul className="space-y-2.5 text-sm text-ivory-300">
              {FOOTER_NAVIGATION.discover.map((item) => (
                <li key={item.title}><Link href={item.href}><a className="hover:text-gold-400 transition-colors">{item.title}</a></Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 uppercase tracking-wider text-xs text-text-on-dark">About</h4>
            <ul className="space-y-2.5 text-sm text-ivory-300 mb-4">
              {FOOTER_NAVIGATION.about.map((item) => (
                <li key={item.title}><Link href={item.href}><a className="hover:text-gold-400 transition-colors">{item.title}</a></Link></li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-3 uppercase tracking-wider text-xs text-text-on-dark">Follow</h4>
            <ul className="space-y-2.5 text-sm text-ivory-300">
              {FOOTER_NAVIGATION.follow.map((item) => (
                <li key={item.title}><a href={item.href} className="hover:text-gold-400 transition-colors">{item.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 uppercase tracking-wider text-xs text-text-on-dark">Help</h4>
            <ul className="space-y-2.5 text-sm text-ivory-300">
              {FOOTER_NAVIGATION.help.map((item) => (
                <li key={item.title}><Link href={item.href}><a className="hover:text-gold-400 transition-colors">{item.title}</a></Link></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gold-700 flex flex-col md:flex-row items-center justify-between text-xs text-champagne-300/70">
          <p>&copy; {new Date().getFullYear()} ANVI Clothing. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
             {FOOTER_NAVIGATION.legal.map((item) => (
                <a key={item.title} href={item.href} className="hover:text-gold-400 transition-colors">{item.title}</a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
