import { ReactNode, useEffect } from "react"
import { useLocation, Link } from "wouter"
import { useAuth } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/account/wishlist" },
  { label: "Profile", href: "/account/profile" },
  { label: "Addresses", href: "/account/addresses" },
]

export function AccountLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, logout } = useAuth()
  const [location, setLocation] = useLocation()

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/account/login")
    }
  }, [user, isLoading, setLocation])

  if (isLoading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Redirecting
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 mt-16 md:mt-24">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h1 className="text-2xl font-serif text-text-primary mb-6 hidden md:block">MY ANVI</h1>
          
          <nav className="flex md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-4 md:gap-2 no-scrollbar">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <a className={cn(
                    "whitespace-nowrap md:whitespace-normal px-4 md:px-0 py-2 text-sm transition-colors border-b-2 md:border-b-0 md:border-l-2 md:pl-4",
                    isActive 
                      ? "border-border-strong text-text-primary font-medium" 
                      : "border-transparent text-text-muted hover:text-text-primary"
                  )}>
                    {item.label}
                  </a>
                </Link>
              )
            })}
            
            <button
              onClick={() => {
                logout()
                setLocation("/")
              }}
              className="whitespace-nowrap md:whitespace-normal px-4 md:px-0 py-2 text-sm text-text-muted hover:text-text-primary text-left md:border-l-2 md:border-transparent md:pl-4 transition-colors"
            >
              Sign out
            </button>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
        
      </div>
    </div>
  )
}
