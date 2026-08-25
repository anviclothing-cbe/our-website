import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { cta } from "@/ui/index"

export function FinalCta() {
  return (
    <section className="w-full bg-surface-light py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
          Find your next favourite.
        </h2>
        <p className="text-text-muted text-lg md:text-xl mb-10 max-w-2xl">
          {cta.support}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="min-w-[220px] h-14 text-base">
            <Link href="/collections/all">SHOP THE COLLECTION</Link>
          </Button>
          <Button asChild variant="default" size="lg" className="min-w-[220px] h-14 text-base">
            <Link href="/visit-store">VISIT ANVI</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
