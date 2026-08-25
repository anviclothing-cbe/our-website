import * as React from "react"
import { Link } from "wouter"
import { Menu, Search, ShoppingBag } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MAIN_NAVIGATION } from "@/lib/navigation"
import { Logo } from "@/components/shared/Logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CurrencySelector } from "./CurrencySelector"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-text-on-dark hover:bg-surface-dark/80 hover:text-brand-gold transition-colors">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 bg-surface-light border-r-0" aria-describedby={undefined}>
        <SheetHeader className="p-6 border-b border-border-subtle text-left">
          <SheetTitle>
            <Logo onClick={() => setOpen(false)} />
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="flex flex-col py-4 pb-safe">
            <Accordion type="multiple" className="w-full">
              {MAIN_NAVIGATION.map((item, index) => (
                <div key={item.title} className="px-6">
                  {item.children && item.children.length > 0 ? (
                    <AccordionItem value={`item-${index}`} className="border-b-0">
                      <AccordionTrigger className="text-xl font-serif font-normal hover:no-underline py-4">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-3 pb-4 pt-1">
                          {item.children.map((child) => (
                            <Link href={child.href} key={child.title} onClick={() => setOpen(false)}>
                              <a className="text-text-muted font-serif text-base hover:text-text-primary transition-colors py-1">
                                {child.title}
                              </a>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      <a className="flex flex-1 items-center justify-between py-4 text-xl font-serif font-normal transition-all hover:underline">
                        {item.title}
                      </a>
                    </Link>
                  )}
                </div>
              ))}
            </Accordion>
            
            <div className="mt-8 px-6 space-y-4">
              <div className="h-px bg-border-subtle w-full" />
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/account" onClick={() => setOpen(false)}>
                  <a className="text-sm font-medium text-text-primary">Account</a>
                </Link>
                <Link href="/account/wishlist" onClick={() => setOpen(false)}>
                  <a className="text-sm font-medium text-text-primary">Wishlist</a>
                </Link>
              </div>
              <div className="h-px bg-border-subtle w-full my-4" />
              <CurrencySelector isMobile />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
