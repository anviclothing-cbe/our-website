import { ContextualGuidance } from "@/types/customer-journey";

/**
 * DECISION SUPPORT SYSTEM
 * Centralized registry for contextual guidance and friction-reduction.
 */

export const DECISION_GUIDANCE: Record<string, ContextualGuidance> = {
  size_uncertainty: {
    id: "size_uncertainty",
    type: "size",
    message: "Not sure about your size? We can help you measure.",
    actionLabel: "View Size Guide",
  },
  delivery_timeline: {
    id: "delivery_timeline",
    type: "delivery",
    message: "Estimated delivery: 3-5 business days.",
  },
  premium_quality: {
    id: "premium_quality",
    type: "trust",
    message: "Handcrafted using premium fabrics.",
  },
  easy_returns: {
    id: "easy_returns",
    type: "trust",
    message: "Easy 7-day exchange policy.",
    actionLabel: "Read Policy",
  }
};

/**
 * WHATSAPP CONVERSION ASSISTANT
 * Configuration for when and where to trigger human assistance.
 */
export const WHATSAPP_CONFIG = {
  phoneNumber: "+910000000000", // Placeholder for actual number
  defaultMessage: "Hi ANVI, I need some help with...",
  
  // Dynamic message generators based on context
  getProductInquiryMessage: (productName: string) => 
    `Hi ANVI, I have a question about the ${productName}.`,
    
  getSizeHelpMessage: (productName: string) =>
    `Hi ANVI, I need help figuring out my size for the ${productName}.`,
    
  getOrderStatusMessage: (orderId: string) =>
    `Hi ANVI, can I get an update on my order #${orderId}?`
};

/**
 * PRODUCT DISCOVERY LOOPS
 * Defines the logical routes a user should be offered next.
 */
export function getDiscoveryLoops(context: "product_page" | "empty_search" | "empty_cart") {
  switch (context) {
    case "product_page":
      return ["Related Products", "More from this Collection", "Complete the Look"];
    case "empty_search":
      return ["Popular Categories", "Bestsellers", "Curated Collections"];
    case "empty_cart":
      return ["New Arrivals", "Trending Now"];
    default:
      return [];
  }
}
