import { MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ANVI_STORE } from "@/lib/store-data"
import { Link } from "wouter"

export function StoreSection() {
  return (
    <section className="w-full bg-surface-light py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
              Come experience ANVI.
            </h2>
            <p className="text-text-muted mb-8 max-w-md">
              Love what you see online? Visit our store and experience the collection in person. Feel the fabrics and find your perfect fit.
            </p>
            
            <div className="w-full max-w-sm space-y-6 mb-10 bg-surface p-6 rounded-sm shadow-sm border border-border-subtle">
              <div className="flex items-start gap-4 text-left">
                <MapPin className="w-5 h-5 text-surface-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">{ANVI_STORE.name}</h4>
                  <p className="text-text-muted text-sm">
                    {ANVI_STORE.addressLine1}, {ANVI_STORE.addressLine2 && <><br />{ANVI_STORE.addressLine2}</>}<br />
                    {ANVI_STORE.city}, {ANVI_STORE.state} {ANVI_STORE.pincode}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-left">
                <Clock className="w-5 h-5 text-surface-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Opening Hours</h4>
                  <p className="text-text-muted text-sm whitespace-pre-line">
                    {ANVI_STORE.openingHours.regular}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="min-w-[160px]" asChild>
                <a href={ANVI_STORE.mapUrl} target="_blank" rel="noopener noreferrer">
                  GET DIRECTIONS
                </a>
              </Button>
              <Button variant="default" size="lg" className="min-w-[160px]" asChild>
                <Link href="/whatsapp">
                  CHAT WITH ANVI
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm relative">
            <img 
              src={ANVI_STORE.images.hero} 
              alt={ANVI_STORE.name} 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
