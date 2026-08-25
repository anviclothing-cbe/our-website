export type ProductAvailability = "in-stock" | "out-of-stock" | "pre-order";

export type ProductStatus = "new" | "bestseller" | "featured" | "limited" | "sale" | "standard";

export interface ProductPrice {
  original: number;
  current: number;
  currency: string;
}

export interface ProductVariant {
  id: string;
  size?: string;
  colorCode?: string;
  colorName?: string;
  availability: ProductAvailability;
  inventoryCount?: number;
}

export interface ProductAttributes {
  categorySlug: string; // e.g., 'sarees'
  typeSlug: string;     // e.g., 'cotton-saree'
  collectionSlugs?: string[]; // e.g., ['everyday-edit', 'festive-edit']
  intentSlugs?: string[]; // e.g., ['office', 'everyday']
  audience: "women" | "kids";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: ProductPrice;
  images: string[];
  attributes: ProductAttributes;
  variants: ProductVariant[];
  status: ProductStatus[];
}
