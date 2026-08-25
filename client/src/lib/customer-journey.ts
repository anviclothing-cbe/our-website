import { PageRoleDefinition, TrustSignalType } from "@/types/customer-journey";

/**
 * PAGE ROLES
 * Defines the primary purpose, friction points, and CTA hierarchy for each page.
 * Future page components must align with these definitions.
 */

export const PAGE_ROLES: Record<string, PageRoleDefinition> = {
  homepage: {
    id: "homepage",
    primaryGoal: "Orient + inspire + route",
    businessGoal: "Move user into a category or collection",
    mainFriction: ["Not knowing what the brand sells", "Overwhelming choices"],
    requiredTrustSignals: ["brand", "social"],
    primaryCta: "Shop Collection (e.g. New Arrivals)",
    secondaryActions: ["View Categories", "Read Our Story"],
  },
  category: {
    id: "category",
    primaryGoal: "Narrow + compare + discover",
    businessGoal: "Move user to a specific product page",
    mainFriction: ["Too many products", "Hard to find right size/color"],
    requiredTrustSignals: ["product"], // E.g., showing review stars on cards
    primaryCta: "View Product",
    secondaryActions: ["Filter", "Sort"],
  },
  product: {
    id: "product",
    primaryGoal: "Evaluate + trust + convert",
    businessGoal: "Add to Bag",
    mainFriction: ["Will this fit?", "Is it worth it?", "When will it arrive?"],
    requiredTrustSignals: ["product", "transaction", "brand"],
    primaryCta: "Add to Bag",
    secondaryActions: ["View Size Guide", "Check Delivery", "Ask on WhatsApp"],
  },
  cart: {
    id: "cart",
    primaryGoal: "Review + reassure + continue",
    businessGoal: "Initiate Checkout",
    mainFriction: ["Unexpected total", "Hidden costs"],
    requiredTrustSignals: ["transaction"],
    primaryCta: "Checkout",
    secondaryActions: ["Continue Shopping"],
  },
  checkout: {
    id: "checkout",
    primaryGoal: "Complete + minimize friction",
    businessGoal: "Successful Payment",
    mainFriction: ["Too many fields", "Payment failure"],
    requiredTrustSignals: ["transaction"],
    primaryCta: "Pay Now",
    secondaryActions: ["Return to Cart"],
  },
};

/**
 * TRUST ARCHITECTURE HELPER
 * Resolves which trust signals should be prioritized based on context/concern.
 */
export function getTrustSignalsForContext(context: "size" | "payment" | "delivery" | "legitimacy") {
  switch (context) {
    case "size":
      return { title: "Size Guide", description: "Detailed measurements to ensure perfect fit." };
    case "payment":
      return { title: "Secure Payment", description: "Encrypted and safe checkout." };
    case "delivery":
      return { title: "Fast Delivery", description: "Tracked shipping on all orders." };
    case "legitimacy":
      return { title: "Our Story", description: "Handcrafted boutique quality." };
  }
}
