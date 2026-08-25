import React, { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ChevronRight, MessageCircle } from "lucide-react";
import { routes } from "@/lib/routes";
import { HELP_CATEGORIES } from "@/lib/support-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HelpLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function HelpLayout({ children, title, breadcrumbs }: HelpLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="w-full bg-surface min-h-screen pb-24">
      {/* Support Header */}
      <div className="bg-surface-light border-b border-border-subtle py-12 px-4 text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
          {title}
        </h1>
        {/* Breadcrumbs */}
        <Breadcrumb className="flex justify-center text-text-muted">
          <BreadcrumbList className="justify-center">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={routes.help()} className="hover:text-text-primary transition-colors">Help Center</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink asChild>
                          <Link href={crumb.href} className="hover:text-text-primary transition-colors">
                            {crumb.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-text-primary font-medium">{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-text-primary font-medium">Help Center</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              <h3 className="font-serif text-lg text-text-primary mb-4 px-3">Help Categories</h3>
              {HELP_CATEGORIES.map((category) => {
                // @ts-ignore
                const path = routes[category.route]();
                const isActive = location === path;
                
                return (
                  <Link 
                    key={category.id} 
                    href={path}
                    className={cn(
                      "block px-3 py-2 rounded-sm text-sm transition-colors",
                      isActive 
                        ? "bg-border-subtle text-text-primary font-medium" 
                        : "text-text-muted hover:text-text-primary hover:bg-border-subtle"
                    )}
                  >
                    {category.title}
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-12 p-6 bg-surface-light rounded-sm text-center">
              <h4 className="font-serif text-lg text-text-primary mb-2">Still need help?</h4>
              <p className="text-sm text-text-muted mb-4">
                Our support team is available on WhatsApp to assist you.
              </p>
              <Button className="w-full" size="sm" asChild>
                <a href="https://wa.me/919442282319" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with us
                </a>
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 max-w-3xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
