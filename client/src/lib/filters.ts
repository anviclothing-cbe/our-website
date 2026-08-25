/**
 * Faceted Filter Architecture
 * Defines available sorting options and faceted filters for product listings.
 */

export interface SortOption {
  id: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { id: "recommended", label: "Recommended" },
  { id: "newest", label: "Newest" },
  { id: "bestselling", label: "Bestselling" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export interface FilterDefinition {
  id: string;
  label: string;
  type: "checkbox" | "swatch" | "range";
  options?: { value: string; label: string; colorCode?: string }[];
}

export const FILTER_DEFINITIONS: Record<string, FilterDefinition> = {
  category: {
    id: "category",
    label: "Category",
    type: "checkbox",
    options: [
      { value: "sarees", label: "Sarees" },
      { value: "salwars", label: "Salwars" },
      { value: "coord-sets", label: "Co-ord Sets" },
      { value: "3-piece-sets", label: "3-Piece Sets" },
      { value: "kidswear", label: "Kidswear" },
    ]
  },
  price: {
    id: "price",
    label: "Price Range",
    type: "range",
    // Can be used to render price bands or a dual-handle slider
  },
  size: {
    id: "size",
    label: "Size",
    type: "checkbox",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "xxl", label: "XXL" },
    ]
  },
  color: {
    id: "color",
    label: "Colour",
    type: "swatch",
    options: [
      { value: "maroon", label: "Maroon", colorCode: "#7C243A" },
      { value: "ivory", label: "Ivory", colorCode: "#FAF7F2" },
      { value: "charcoal", label: "Charcoal", colorCode: "#2F2B2B" },
      { value: "beige", label: "Beige", colorCode: "#F1E8DC" },
      { value: "gold", label: "Gold", colorCode: "#D4B27C" },
    ]
  },
  occasion: {
    id: "occasion",
    label: "Occasion",
    type: "checkbox",
    options: [
      { value: "everyday", label: "Everyday" },
      { value: "office", label: "Office" },
      { value: "festive", label: "Festive" },
      { value: "premium", label: "Premium" },
    ]
  },
  availability: {
    id: "availability",
    label: "Availability",
    type: "checkbox",
    options: [
      { value: "in-stock", label: "In Stock" },
      { value: "out-of-stock", label: "Out of Stock" },
    ]
  }
};
