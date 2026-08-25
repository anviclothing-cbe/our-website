import { Category, Collection, Intent } from "@/types/taxonomy";

// ----------------------------------------------------------------------
// CATEGORIES (What the product is)
// ----------------------------------------------------------------------

export const CATEGORIES: Record<string, Category> = {
  sarees: {
    slug: "sarees",
    title: "Sarees",
    description: "Elegant, handpicked sarees for every occasion.",
    audience: "women",
    allowedFilters: ["price", "color", "occasion"], // No size for sarees usually
  },
  salwars: {
    slug: "salwars",
    title: "Salwars",
    audience: "women",
    allowedFilters: ["price", "size", "color", "occasion"],
  },
  "coord-sets": {
    slug: "coord-sets",
    title: "Co-ord Sets",
    audience: "women",
    allowedFilters: ["price", "size", "color", "occasion"],
  },
  "3-piece-sets": {
    slug: "3-piece-sets",
    title: "3-Piece Sets",
    audience: "women",
    allowedFilters: ["price", "size", "color", "occasion"],
  },
  kidswear: {
    slug: "kidswear",
    title: "Kidswear",
    audience: "kids",
    allowedFilters: ["price", "size", "color", "occasion"],
    subCategories: [
      { slug: "girls", title: "Girls", audience: "kids" },
      { slug: "boys", title: "Boys", audience: "kids" },
      { slug: "sets", title: "Sets", audience: "kids" },
    ]
  },
};

// ----------------------------------------------------------------------
// COLLECTIONS (How we present the product)
// ----------------------------------------------------------------------

export const COLLECTIONS: Record<string, Collection> = {
  "new-arrivals": {
    slug: "new-arrivals",
    title: "New Arrivals",
    merchandisingRule: "latest",
  },
  bestsellers: {
    slug: "bestsellers",
    title: "Bestsellers",
    merchandisingRule: "bestselling",
  },
  "the-anvi-edit": {
    slug: "the-anvi-edit",
    title: "The ANVI Edit",
    description: "Our signature curation of timeless pieces.",
    merchandisingRule: "manual",
  },
  "everyday-edit": {
    slug: "everyday-edit",
    title: "Everyday Edit",
    description: "Comfortable, wearable pieces for regular use.",
    merchandisingRule: "manual",
  },
  "office-edit": {
    slug: "office-edit",
    title: "Office Edit",
    description: "Polished everyday workwear.",
    merchandisingRule: "manual",
  },
  "festive-edit": {
    slug: "festive-edit",
    title: "Festive Edit",
    description: "Occasion-focused selections.",
    merchandisingRule: "manual",
  },
  "nivethas-picks": {
    slug: "nivethas-picks",
    title: "Nivetha's Picks",
    description: "Handpicked selections personally curated by Nivetha.",
    merchandisingRule: "manual",
  },
  "little-favourites": {
    slug: "little-favourites",
    title: "Little Favourites",
    description: "Curated kidswear for your little ones.",
    merchandisingRule: "manual",
  }
};

// ----------------------------------------------------------------------
// INTENTS / OCCASIONS (Why the customer is buying)
// ----------------------------------------------------------------------

export const INTENTS: Record<string, Intent> = {
  everyday: {
    slug: "everyday",
    title: "Everyday",
    description: "Effortless style for daily wear.",
  },
  office: {
    slug: "office",
    title: "Office",
    description: "Professional, elegant pieces for the workplace.",
  },
  festive: {
    slug: "festive",
    title: "Festive",
    description: "Celebrate in our most beautiful occasion wear.",
  },
  premium: {
    slug: "premium",
    title: "Premium",
    description: "Our most luxurious and intricately crafted pieces.",
  },
};

// ----------------------------------------------------------------------
// SEARCH SYNONYMS (Simplifying discovery)
// ----------------------------------------------------------------------

export const SEARCH_SYNONYMS: Record<string, string[]> = {
  saree: ["sari", "sarees", "saris"],
  salwar: ["salwars", "salwar set", "salwar kameez", "suit"],
  coord: ["co-ord", "co-ord set", "coords", "matching set"],
  kids: ["children", "little ones", "girls", "boys", "kidswear"],
  festive: ["festival", "wedding", "party", "occasion"],
  office: ["workwear", "work", "professional", "formal"],
};
