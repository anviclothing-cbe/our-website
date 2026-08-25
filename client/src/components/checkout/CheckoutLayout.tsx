import * as React from "react"
import { Link } from "wouter"
import { Lock } from "lucide-react"
import { Logo } from "@/components/shared/Logo"

interface CheckoutLayoutProps {
  children: React.ReactNode
}

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-surface font-sans text-text-primary antialiased">
      <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/cart">
            <a className="text-xs sm:text-sm text-text-muted hover:text-text-primary transition-colors">
              &larr; <span className="hidden sm:inline">Return to bag</span>
            </a>
          </Link>
          
          <div className="flex-1 flex justify-center">
            <Logo />
          </div>

          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-text-muted">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}
