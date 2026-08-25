import { useState, useEffect } from "react"
import { HeroSection } from "@/components/home/HeroSection"
import { HorizontalProductShowcase } from "@/components/home/HorizontalProductShowcase"
import { EditorialCollection } from "@/components/home/EditorialCollection"
import { OccasionDiscovery } from "@/components/home/OccasionDiscovery"
import { CategoryDiscovery } from "@/components/home/CategoryDiscovery"
import { SocialShowcase } from "@/components/home/SocialShowcase"
import { Testimonials } from "@/components/home/Testimonials"
import { useSEO } from "@/hooks/useSEO"
import { 
  fetchAnviEdit, 
  fetchNewArrivals, 
  fetchNivethasPicks, 
  fetchBestsellers,
  fetchFeaturedProducts 
} from "@/lib/api"
import { routes } from "@/lib/routes"

export default function Home() {
  useSEO({
    title: "ANVI Clothing | Premium Women's Ethnic Wear & Kidswear",
    description: "ANVI Clothing — Discover our handpicked collections of Sarees, Salwar Sets, Co-ord Sets, and Kidswear. Elevate your everyday and festive wardrobe.",
    canonical: "https://anvi.clothing/",
    ogImage: "https://anvi.clothing/anvi_logo.png",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ANVI Clothing",
      "url": "https://anvi.clothing",
      "logo": "https://anvi.clothing/anvi_logo.png",
      "description": "Premium Women's Ethnic Wear & Kidswear.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 90000 00000",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://instagram.com/anviclothing"
      ]
    }
  });

  const [sellingHot, setSellingHot] = useState<any[]>([]);
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [mostWanted, setMostWanted] = useState<any[]>([]);
  const [nivethasPicks, setNivethasPicks] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const featRes = await fetchFeaturedProducts();
        
        // Use featured products as a fallback if the specific category endpoints return empty arrays
        const bestRes = await fetchBestsellers();
        const newRes = await fetchNewArrivals();
        const picksRes = await fetchNivethasPicks();
        
        const mapProducts = (arr: any[]) => arr.map((p: any) => ({
          ...p,
          id: p._id || p.id,
          title: p.title || p.name,
          image: p.image || (p.images && p.images[0]) || '/anvi_main_logo.png',
          hoverImage: p.hoverImage || (p.images && p.images[1]),
          href: p.href || `/product/${p.slug}`,
          product: { ...p, id: p._id || p.id }
        }));
        
        const featProducts = mapProducts(featRes);
        setSellingHot(featProducts);
        
        if (bestRes.length) setBestsellers(mapProducts(bestRes));
        if (newRes.length) setMostWanted(mapProducts(newRes));
        if (picksRes.length) setNivethasPicks(mapProducts(picksRes));
      } catch (e) {
        console.error("Failed to load homepage products", e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full bg-surface text-text-primary">
      <HeroSection />
      
      <div className="bg-surface">
        <CategoryDiscovery />
      </div>
      
      {sellingHot.length > 0 && (
        <div className="bg-surface-light">
          <HorizontalProductShowcase 
            title="The ANVI Edit" 
            subtitle="Our latest picks, chosen to bring something special to your wardrobe."
            products={sellingHot}
            ctaText="VIEW ALL"
            ctaHref={routes.collection("the-anvi-edit")}
          />
        </div>
      )}

      <div className="bg-surface">
        <OccasionDiscovery />
      </div>

      {mostWanted.length > 0 && (
        <div className="bg-surface">
          <HorizontalProductShowcase 
            title="New Arrivals" 
            subtitle="The newest pieces to join our collection."
            products={mostWanted}
            ctaText="SHOP NEW"
            ctaHref={routes.collection("new-arrivals")}
          />
        </div>
      )}

      {nivethasPicks.length > 0 && (
        <div className="bg-surface-light">
          <HorizontalProductShowcase 
            title="Nivetha's Picks" 
            subtitle="A few favourites, personally chosen for you."
            products={nivethasPicks}
            ctaText="SHOP THE EDIT"
            ctaHref={routes.collection("nivethas-picks")}
          />
        </div>
      )}

      {bestsellers.length > 0 && (
        <div className="bg-surface">
          <HorizontalProductShowcase 
            title="Most Loved" 
            subtitle="The styles our customers keep coming back for."
            products={bestsellers}
            ctaText="VIEW ALL"
            ctaHref={routes.collection("bestsellers")}
          />
        </div>
      )}


      <div className="bg-surface">
        <Testimonials />
      </div>

      <div className="bg-surface-light">
        <SocialShowcase />
      </div>
    </div>
  )
}
