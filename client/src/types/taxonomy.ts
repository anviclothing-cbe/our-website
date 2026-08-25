export interface SEOMetadata {
  title: string;
  description: string;
}

export interface BaseTaxonomy {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  seoMetadata?: SEOMetadata;
}

export interface Category extends BaseTaxonomy {
  audience: "women" | "kids";
  allowedFilters?: string[]; // E.g., ['size', 'color', 'price']
  subCategories?: Category[];
}

export interface Collection extends BaseTaxonomy {
  story?: string;
  merchandisingRule?: "manual" | "latest" | "bestselling";
}

export interface Intent extends BaseTaxonomy {
  // E.g., 'office', 'festive'
}
