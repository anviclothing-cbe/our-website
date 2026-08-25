import { home } from "@/ui/index"
import { ScrollReveal } from "@/components/shared/ScrollReveal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

export function Testimonials() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="w-full py-24 md:py-32 bg-surface relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <h3 className="text-sm text-text-muted uppercase tracking-[0.2em] font-medium mb-4">
            {home.testimonials.eyebrow}
          </h3>
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            {home.testimonials.heading}
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-lg mb-8">
            {home.testimonials.support}
          </p>
          <div className="h-[1px] w-24 bg-border-subtle mx-auto"></div>
        </ScrollReveal>
        
        <ScrollReveal>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full max-w-5xl mx-auto relative"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {home.testimonials.quotes.map((quote, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/2">
                  <div className="p-1 h-full">
                    <Card className="bg-surface-light/40 border border-border-subtle/50 shadow-sm hover:shadow-md transition-shadow h-full rounded-2xl overflow-hidden">
                      <CardContent className="flex flex-col justify-between items-start p-8 md:p-10 relative h-full">
                        <span className="absolute -top-6 -left-4 text-[8rem] leading-none text-brand-gold/20 font-serif select-none">"</span>
                        <p className="font-serif text-2xl md:text-3xl text-text-primary leading-relaxed mb-10 font-light italic relative z-10 flex-grow pt-4">
                          {quote.text}
                        </p>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.2em]">
                          — {quote.author}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 xl:-left-16 bg-surface border-border-default hover:bg-surface-light hover:text-brand-primary" />
              <CarouselNext className="-right-12 xl:-right-16 bg-surface border-border-default hover:bg-surface-light hover:text-brand-primary" />
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  )
}
