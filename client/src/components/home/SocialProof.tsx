import { MOCK_REVIEWS } from "@/lib/reviews"
import { ReviewCard } from "../shared/ReviewCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ShieldCheck } from "lucide-react"
import { reviews } from "@/ui/index"

export function SocialProof() {
  // Select top 3 5-star reviews for the homepage
  const homepageReviews = MOCK_REVIEWS.filter(r => r.rating === 5).slice(0, 3);

  return (
    <section className="w-full bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">Loved by the ANVI family.</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {homepageReviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full bg-surface-light p-6 md:p-8 rounded-sm shadow-sm flex flex-col">
                    <ReviewCard review={review} className="border-0 py-0 flex-grow" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-[-4rem]" />
              <CarouselNext className="right-[-4rem]" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
