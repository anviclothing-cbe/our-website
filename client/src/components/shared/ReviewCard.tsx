import { useState } from "react";
import { format } from "date-fns";
import { ThumbsUp } from "lucide-react";
import { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);

  // Simple character limit for truncation
  const CHAR_LIMIT = 250;
  const shouldTruncate = review.body.length > CHAR_LIMIT;
  const displayedText = shouldTruncate && !isExpanded 
    ? `${review.body.substring(0, CHAR_LIMIT)}...` 
    : review.body;

  const handleHelpfulClick = () => {
    if (!helpfulVoted) {
      setHelpfulCount(prev => prev + 1);
      setHelpfulVoted(true);
    } else {
      setHelpfulCount(prev => prev - 1);
      setHelpfulVoted(false);
    }
  };

  return (
    <div className={cn("border-b border-border-subtle py-8 last:border-0", className)}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
        <div>
          <StarRating rating={review.rating} size="sm" className="mb-2" />
          {review.title && (
            <h4 className="font-serif text-lg text-text-primary mb-1">{review.title}</h4>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
            <span className="font-medium text-text-primary">{review.customerName}</span>
            <span className="text-text-muted">
              {format(new Date(review.createdAt), "dd MMM yyyy")}
            </span>
          </div>
          {review.productVariant && (
            <p className="text-xs text-text-muted mt-1">Purchased: {review.productVariant}</p>
          )}
        </div>
      </div>

      <div className="prose prose-sm prose-stone max-w-none text-text-muted mb-4">
        <p>
          {displayedText}
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 font-medium text-text-primary underline hover:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      {review.images && review.images.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {review.images.map((image, index) => (
            <button key={index} aria-label={`View full size review photo ${index + 1}`} className="w-20 h-24 overflow-hidden rounded-md border border-border-subtle cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              {/* In a real app, clicking this would open a lightbox. For now, it's just an image */}
              <img 
                src={image.url} 
                alt={image.altText || `Review photo ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleHelpfulClick}
          className={cn(
            "h-8 text-xs gap-1.5 border-border-subtle",
            helpfulVoted && "bg-button-primary text-text-on-dark hover:bg-button-primary-hover hover:text-text-on-dark"
          )}
          aria-pressed={helpfulVoted}
        >
          <ThumbsUp className="w-3 h-3" />
          Helpful ({helpfulCount})
        </Button>
      </div>
    </div>
  );
}
