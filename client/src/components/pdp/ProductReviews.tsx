import { useState } from "react";
import { getProductReviews, getProductRatingSummary } from "@/lib/reviews";
import { ReviewCard } from "../shared/ReviewCard";
import { StarRating } from "../shared/StarRating";
import { ReviewSubmissionModal } from "./ReviewSubmissionModal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

type SortOption = "recent" | "highest" | "lowest" | "photos";

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  
  const reviews = getProductReviews(productId);
  const summary = getProductRatingSummary(productId);

  // Apply sorting
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "highest") {
      return b.rating - a.rating;
    }
    if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    if (sortBy === "photos") {
      const aHasPhotos = a.images && a.images.length > 0 ? 1 : 0;
      const bHasPhotos = b.images && b.images.length > 0 ? 1 : 0;
      return bHasPhotos - aHasPhotos; // Items with photos first
    }
    return 0;
  });

  if (!summary || reviews.length === 0) {
    // Stage 1: Low Volume / Empty State
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border-subtle" id="reviews">
        <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
            Be the first to share your experience.
          </h2>
          <p className="text-text-muted mb-8">
            Your experience can help another ANVI customer choose with confidence.
          </p>
          <ReviewSubmissionModal productId={productId} productName={productName}>
            <Button className="h-12 px-8">WRITE A REVIEW</Button>
          </ReviewSubmissionModal>
        </div>
      </section>
    );
  }

  // Stage 2: Growing Review Volume
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border-subtle" id="reviews">
      <div className="mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary">Customer Reviews</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Column: Rating Summary */}
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="bg-surface-light p-6 md:p-8 rounded-sm sticky top-24">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-serif text-text-primary leading-none">
                {summary.averageRating.toFixed(1)}
              </span>
              <div className="pb-1">
                <StarRating rating={summary.averageRating} size="lg" />
              </div>
            </div>
            <p className="text-text-muted mb-8">Based on {summary.totalReviews} reviews</p>

            <div className="space-y-3 mb-8">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = summary.ratingDistribution[stars as keyof typeof summary.ratingDistribution];
                const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
                
                return (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-4 text-text-primary font-medium">{stars}</span>
                    <StarRating rating={1} size="sm" />
                    <div className="flex-1 h-2 bg-border-subtle rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-surface-dark transition-all duration-500 ease-out" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-text-muted">{count}</span>
                  </div>
                );
              })}
            </div>

            <Separator className="bg-border-subtle mb-6" />

            <div className="text-center">
              <p className="text-sm text-text-muted mb-4">Share your thoughts with the ANVI community</p>
              <ReviewSubmissionModal productId={productId} productName={productName}>
                <Button className="w-full h-12">WRITE A REVIEW</Button>
              </ReviewSubmissionModal>
            </div>
          </div>
        </div>

        {/* Right Column: Review Feed */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-xl text-text-primary">
              {summary.totalReviews} {summary.totalReviews === 1 ? 'Review' : 'Reviews'}
            </h3>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-muted hidden sm:inline-block">Sort by:</span>
              <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
                <SelectTrigger className="w-[160px] bg-surface border-border-subtle">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                  {summary.reviewsWithPhotos > 0 && (
                    <SelectItem value="photos">With Photos</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col">
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
