import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 0 to 5
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!interactive || !onRatingChange) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRatingChange(index);
    }
  };

  return (
    <div
      className={cn("flex items-center gap-1 text-surface-accent", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? "Select a rating" : `Rated ${rating} out of ${maxRating} stars`}
    >
      {[...Array(maxRating)].map((_, i) => {
        const starValue = i + 1;
        const filled = rating >= starValue;
        
        // Simple logic for half stars if needed (though UI spec leans towards full stars for display in most places, 
        // average rating might be fractional, but for visualization we'll stick to full/empty for simplicity, 
        // or round to nearest half. Let's just do filled/empty based on Math.round or floor)
        
        const isFilled = Math.round(rating) >= starValue;

        return (
          <div
            key={i}
            role={interactive ? "radio" : "presentation"}
            aria-checked={interactive ? rating === starValue : undefined}
            tabIndex={interactive ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, starValue)}
            onClick={() => {
              if (interactive && onRatingChange) {
                onRatingChange(starValue);
              }
            }}
            className={cn(
              "shrink-0",
              interactive ? "cursor-pointer transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-offset-2 rounded-sm" : ""
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "fill-surface-accent text-surface-accent" : "text-border-subtle"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
