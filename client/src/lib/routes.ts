/**
 * Centralized Routing Definitions
 * Ensures canonical URLs and a scalable routing structure for Phase 03.
 */

export const routes = {
  home: () => "/",
  
  // Base shopping categories
  category: (slug: string) => `/category/${slug}`,
  
  // Nested subcategories (e.g. /women/sarees - though flat structure /sarees might be preferred for SEO, we support nested here if needed based on IA)
  subCategory: (parentSlug: string, slug: string) => `/category/${slug}`,

  // Curated Collections
  collection: (slug: string) => `/collections/${slug}`,

  // Intent / Occasion based discovery
  discover: (intentSlug: string) => `/discover/${intentSlug}`,

  // Product Canonical Route
  // All collections/categories point to this single canonical URL to prevent duplication
  product: (slug: string) => `/product/${slug}`,

  // Utility routes
  search: () => "/search",
  cart: () => "/cart",
  account: () => "/account",
  wishlist: () => "/account/wishlist",

  // Static / Brand pages
  about: () => "/our-story",
  visitStore: () => "/visit-store",
  blog: () => "/journal",
  blogPost: (slug: string) => `/journal/${slug}`,

  // Help & Support
  help: () => "/help",
  helpShipping: () => "/help/shipping",
  helpReturns: () => "/help/returns",
  helpSizeGuide: () => "/help/size-guide",
  helpPayments: () => "/help/payments",
  contact: () => "/contact",
  privacy: () => "/privacy",
  terms: () => "/terms",
};
