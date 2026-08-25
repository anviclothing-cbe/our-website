import * as React from "react"
import { Link } from "wouter"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MAIN_NAVIGATION } from "@/lib/navigation"

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {MAIN_NAVIGATION.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.children && item.children.length > 0 ? (
              <>
                <NavigationMenuTrigger className="bg-transparent font-serif text-base font-normal text-text-on-dark hover:bg-transparent hover:text-brand-gold focus:bg-transparent focus:text-text-on-dark data-[state=open]:bg-transparent data-[state=open]:text-brand-gold transition-colors">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-surface-light rounded-xl border border-border-subtle shadow-lg">
                    {item.children.map((child) => (
                      <ListItem
                        key={child.title}
                        title={child.title}
                        href={child.href}
                      >
                        {child.description || "Discover the collection"}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href} asChild>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent font-serif text-base font-normal text-text-on-dark hover:bg-transparent hover:text-brand-gold focus:bg-transparent focus:text-text-on-dark transition-colors")}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href || "#"} asChild>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-surface hover:text-brand-primary focus:bg-surface focus:text-brand-primary",
              className
            )}
            {...props}
          >
            <div className="text-base font-serif font-normal leading-none mb-1 text-text-primary group-hover:text-brand-primary transition-colors">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-text-muted font-sans">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"
