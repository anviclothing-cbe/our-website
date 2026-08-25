import { ANVI_STORE } from "@/lib/store-data"
import { MapPin, Clock, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContextualSupport } from "@/components/shared/ContextualSupport"
import { store as storeCopy, buttons } from "@/ui/index"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const STORE_FAQS = [
  {
    question: "Where is ANVI located?",
    answer: "Our flagship boutique is located at 123 Fashion Street, RS Puram, Coimbatore, Tamil Nadu. It's easily accessible and parking is available nearby."
  },
  {
    question: "What are the opening hours?",
    answer: "We are open from Monday to Saturday between 10:00 AM and 8:00 PM, and on Sundays from 11:00 AM to 6:00 PM."
  },
  {
    question: "Do you offer kidswear in-store?",
    answer: "Yes! Our entire kidswear collection is available to view and purchase in our boutique."
  },
  {
    question: "Can I contact the store before visiting?",
    answer: "Absolutely. You can reach us via phone or WhatsApp at +91 00000 00000. Our team will be happy to assist you."
  },
  {
    question: "Can I check availability?",
    answer: "If you're looking for a specific piece, please drop us a message on WhatsApp with the product details and we will confirm its availability in-store."
  }
]

import { useSEO } from "@/hooks/useSEO"
import { useState, useEffect } from "react"
import { fetchStoreContent } from "@/lib/api"

export default function StorePage() {
  const [ambience, setAmbience] = useState<{ heroTitle?: string; heroSubtitle?: string; heroImage: string; gallery: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStoreContent("store_ambience")
      .then((data) => {
        if (data) {
          setAmbience(data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const displayHero = ambience?.heroImage || ANVI_STORE.images.hero;
  const displayGallery = (ambience?.gallery && ambience.gallery.length > 0) ? ambience.gallery : ANVI_STORE.images.gallery;
  useSEO({
    title: "Visit ANVI Store in Coimbatore | Boutiques in RS Puram",
    description: "Visit the ANVI Clothing flagship store in RS Puram, Coimbatore. Explore our curated collection of women's ethnic wear, kidswear, and more.",
    canonical: "https://anvi.clothing/visit-store",
    ogType: "website",
    ogImage: "https://anvi.clothing/assets/hero_image.png",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ClothingStore",
      "name": "ANVI Clothing",
      "image": "https://anvi.clothing/assets/hero_image.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Fashion Street, RS Puram",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "telephone": "+910000000000",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "11:00",
          "closes": "18:00"
        }
      ]
    }
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* 01. Store Hero */}
      <section className="w-full relative h-[60vh] min-h-[500px] max-h-[800px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-surface-dark transition-opacity duration-700">
          {!isLoading && (
            <img 
              src={displayHero} 
              alt={ANVI_STORE.name} 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-[#CEA53B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {ambience?.heroTitle || storeCopy.experience}
          </h1>
          <p className="text-lg md:text-xl font-light text-[#FFFDF8] max-w-2xl mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {ambience?.heroSubtitle || "See the collection up close, try things on and let us help you find exactly what you're looking for."}
          </p>
        </div>
      </section>

      {/* 02. What to Expect / Services */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {ANVI_STORE.services.map((service) => (
            <div key={service.id} className="flex flex-col items-center">
              <h3 className="font-serif text-2xl text-text-primary mb-4">{service.title}</h3>
              <p className="text-text-muted leading-relaxed max-w-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 03. Visit Information & Location */}
      <section className="w-full bg-surface-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Store Information */}
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-8">Visit ANVI</h2>
                
                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-surface-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary text-lg mb-2">{ANVI_STORE.name}</h4>
                      <address className="text-text-muted not-italic leading-relaxed">
                        {ANVI_STORE.addressLine1} <br />
                        {ANVI_STORE.addressLine2 && <>{ANVI_STORE.addressLine2} <br /></>}
                        {ANVI_STORE.city}, {ANVI_STORE.state} <br />
                        {ANVI_STORE.pincode}
                      </address>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-surface-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary text-lg mb-2">Opening Hours</h4>
                      <p className="text-text-muted whitespace-pre-line leading-relaxed">
                        {ANVI_STORE.openingHours.regular}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-surface-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-text-primary text-lg mb-2">Contact</h4>
                      <p className="text-text-muted leading-relaxed">
                        {ANVI_STORE.phone} <br />
                        {ANVI_STORE.whatsapp} (WhatsApp)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex items-center gap-2 h-14 text-base" asChild>
                  <a href={ANVI_STORE.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="w-4 h-4" />
                    {buttons.getDirections}
                  </a>
                </Button>
              </div>
            </div>

            {/* Map / Hero Side Image */}
            <div className="aspect-[4/5] bg-border-subtle rounded-sm overflow-hidden shadow-sm">
              {/* Optional: Embed Google Map here if API available, else use a lifestyle store image */}
              <img 
                src={displayGallery[0] || ANVI_STORE.images.gallery[0]} 
                alt="Inside ANVI Boutique" 
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 04. Store Photography Gallery */}
      {displayGallery.length > 1 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayGallery.slice(1).map((img, idx) => {
              if (!img) return null;
              return (
                <div key={idx} className="aspect-square bg-surface-light rounded-sm overflow-hidden">
                  <img src={img} alt="ANVI Store Detail" className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 05. Human Assistance & Online Bridge */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface-light rounded-sm p-8 md:p-10 border border-border-subtle text-center">
          <h2 className="font-serif text-3xl text-text-primary mb-4">{storeCopy.planning}</h2>
          <p className="text-text-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Drop by whenever we're open, or send us a message if you're looking for a specific piece.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="w-full sm:w-auto min-w-[200px]" asChild>
              <a href={ANVI_STORE.mapUrl} target="_blank" rel="noopener noreferrer">
                {buttons.getDirections}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px]" asChild>
              <a 
                href={`https://wa.me/${ANVI_STORE.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hi, I'm planning to visit the ANVI store and have a question.")}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {buttons.chatWithAnvi}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 06. Store FAQ */}
      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border-subtle">
        <h2 className="font-serif text-3xl text-text-primary mb-10 text-center">Store FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          {STORE_FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border-subtle">
              <AccordionTrigger className="text-text-primary hover:text-text-primary hover:no-underline font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-muted leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

    </div>
  )
}
