import { Link } from "wouter"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export interface PlpHeaderProps {
  title: string
  description?: string
  editorial?: boolean
  count: number
  breadcrumbs: { label: string; href?: string }[]
}

export function PlpHeader({ title, description, editorial, count, breadcrumbs }: PlpHeaderProps) {
  return (
    <div className="w-full bg-surface-light py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <div key={crumb.label} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-text-primary">{crumb.label}</BreadcrumbPage>
                    ) : crumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href} className="text-text-muted hover:text-text-primary">
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-text-muted">{crumb.label}</span>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator className="mx-1" />}
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">
          {title}
        </h1>
        
        {description && (
          <p className="text-text-muted max-w-2xl text-base md:text-lg mb-6">
            {description}
          </p>
        )}
        
        <p className="text-sm text-text-muted font-medium uppercase tracking-widest mt-2">
          {count} {count === 1 ? 'Product' : 'Products'}
        </p>
      </div>
    </div>
  )
}
