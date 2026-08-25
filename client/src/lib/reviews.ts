export interface ReviewImage {
  url: string;
  altText: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1 to 5
  title?: string;
  body: string;
  images?: ReviewImage[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  productVariant?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviewsWithPhotos: number;
}

export const MOCK_REVIEWS: Review[] = [
  // Reviews for Ivory Silk Blend Saree (p1)
  {
    id: "rev1",
    productId: "p1",
    customerName: "Priya S.",
    rating: 5,
    title: "Absolutely gorgeous drape",
    body: "The quality of the saree is exceptional. It drapes beautifully and the fabric feels premium. I wore it to a family function and received so many compliments. Will definitely be shopping here again.",
    verifiedPurchase: true,
    helpfulCount: 12,
    createdAt: "2026-07-15T10:00:00Z",
    status: "approved",
    productVariant: "Size: FS, Color: Ivory",
    images: [
      {
        url: "https://images.unsplash.com/photo-1621086884024-db0ed2bd1343?q=80&w=800&auto=format&fit=crop",
        altText: "Customer wearing Ivory Saree"
      }
    ]
  },
  {
    id: "rev2",
    productId: "p1",
    customerName: "Meera K.",
    rating: 4,
    title: "Beautiful, but slightly sheer",
    body: "The color is a stunning true ivory and the silk blend feels soft. However, it is slightly more sheer than I expected from the photos. You will need a good quality underskirt. Still a great purchase.",
    verifiedPurchase: true,
    helpfulCount: 5,
    createdAt: "2026-08-02T14:30:00Z",
    status: "approved",
    productVariant: "Size: FS, Color: Ivory"
  },
  {
    id: "rev3",
    productId: "p1",
    customerName: "Anita R.",
    rating: 5,
    body: "Perfect for daytime festivities. Very lightweight.",
    verifiedPurchase: true,
    helpfulCount: 1,
    createdAt: "2026-08-10T09:15:00Z",
    status: "approved",
  },
  // Reviews for Linen Co-ord Set (p2)
  {
    id: "rev4",
    productId: "p2",
    customerName: "Ananya M.",
    rating: 5,
    title: "My new go-to office wear",
    body: "Bought this co-ord set for office wear. So comfortable yet so polished. The linen doesn't wrinkle as much as I feared. Shipping was incredibly fast too.",
    verifiedPurchase: true,
    helpfulCount: 8,
    createdAt: "2026-06-20T11:00:00Z",
    status: "approved",
    productVariant: "Size: M, Color: Beige",
    images: [
      {
        url: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
        altText: "Customer in Co-ord Set"
      }
    ]
  },
  {
    id: "rev5",
    productId: "p2",
    customerName: "Sneha V.",
    rating: 3,
    title: "Runs a bit large",
    body: "The fabric is nice, but the sizing feels a bit off. The trousers are quite loose around the waist for a Medium. I would recommend sizing down.",
    verifiedPurchase: true,
    helpfulCount: 15,
    createdAt: "2026-07-05T16:45:00Z",
    status: "approved",
    productVariant: "Size: M, Color: Brown"
  },
  // Reviews for Floral Cotton Dress (p3)
  {
    id: "rev6",
    productId: "p3",
    customerName: "Deepa R.",
    rating: 5,
    title: "Adorable dress!",
    body: "The kidswear collection is adorable. My daughter loves her new dress, and I love how breathable the cotton is for summer.",
    verifiedPurchase: true,
    helpfulCount: 3,
    createdAt: "2026-08-01T10:00:00Z",
    status: "approved",
  }
];

export function getProductReviews(productId: string): Review[] {
  return MOCK_REVIEWS
    .filter(review => review.productId === productId && review.status === "approved")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getProductRatingSummary(productId: string): ReviewSummary | null {
  const reviews = getProductReviews(productId);
  
  if (reviews.length === 0) {
    return null;
  }
  
  const totalReviews = reviews.length;
  const sumRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = sumRating / totalReviews;
  
  const distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  
  let reviewsWithPhotos = 0;
  
  reviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
    if (review.images && review.images.length > 0) {
      reviewsWithPhotos++;
    }
  });
  
  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
    ratingDistribution: distribution,
    reviewsWithPhotos
  };
}
