import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/mock-data";

export type SortOption = "recommended" | "newest" | "price-asc" | "price-desc" | "bestselling";

export interface FilterState {
  category: string[];
  sizes: string[];
  colors: string[];
  occasions: string[];
  inStock: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export function useProductFiltering(
  initialProducts: Product[],
  initialContext?: { category?: string; collection?: string; search?: string; occasion?: string; }
) {
  const [filters, setFilters] = useState<FilterState>(() => {
    if (typeof window === 'undefined') {
      return { category: [], sizes: [], colors: [], occasions: [], inStock: false };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      category: params.getAll("category"),
      sizes: params.getAll("size"),
      colors: params.getAll("color"),
      occasions: params.getAll("occasion"),
      inStock: params.get("inStock") === "true",
      minPrice: params.has("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.has("maxPrice") ? Number(params.get("maxPrice")) : undefined,
    };
  });

  const [sort, setSort] = useState<SortOption>(() => {
    if (typeof window === 'undefined') return "recommended";
    const params = new URLSearchParams(window.location.search);
    return (params.get("sort") as SortOption) || "recommended";
  });

  // Sync state to URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    
    // Preserve existing unrelated params like 'q' (search)
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has("q")) params.set("q", currentParams.get("q")!);

    filters.category.forEach(c => params.append("category", c));
    filters.sizes.forEach(s => params.append("size", s));
    filters.colors.forEach(c => params.append("color", c));
    filters.occasions.forEach(o => params.append("occasion", o));
    if (filters.inStock) params.set("inStock", "true");
    if (filters.minPrice !== undefined) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set("maxPrice", filters.maxPrice.toString());
    if (sort !== "recommended") params.set("sort", sort);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [filters, sort]);

  // Sync URL back to state (for back/forward buttons)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setFilters({
        category: params.getAll("category"),
        sizes: params.getAll("size"),
        colors: params.getAll("color"),
        occasions: params.getAll("occasion"),
        inStock: params.get("inStock") === "true",
        minPrice: params.has("minPrice") ? Number(params.get("minPrice")) : undefined,
        maxPrice: params.has("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      });
      setSort((params.get("sort") as SortOption) || "recommended");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Filter products based on current context (Category page or Collection page) and active filters
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Context Filtering (Route level)
    if (initialContext?.category) {
      result = result.filter((p) => p.category === initialContext.category || CATEGORY_PARENTS[p.category] === initialContext.category);
    }
    if (initialContext?.collection) {
      result = result.filter((p) => p.collection?.includes(initialContext.collection!));
    }
    if (initialContext?.occasion) {
      result = result.filter((p) => p.occasion?.includes(initialContext.occasion!));
    }
    if (initialContext?.search) {
      const q = initialContext.search.toLowerCase();
      // Basic fallback search if expandQuery isn't available here, but we can just do simple match
      result = result.filter((p) => {
        const text = [p.title, p.category, p.collection, ...(p.colors || []), ...(p.occasion || [])].join(" ").toLowerCase();
        return text.includes(q) || q.split(/\s+/).some(term => text.includes(term));
      });
    }

    // 2. User Filters
    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
    }
    if (filters.occasions.length > 0) {
      result = result.filter((p) => p.occasion.some((o) => filters.occasions.includes(o)));
    }
    if (filters.inStock) {
      result = result.filter((p) => p.inStock);
    }
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    return result;
  }, [initialProducts, initialContext, filters]);

  // Sort the filtered products
  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];
    switch (sort) {
      case "newest":
        result.sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        });
        break;
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "bestselling":
        result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      case "recommended":
      default:
        // For 'recommended', we might prioritize in-stock, then bestsellers
        result.sort((a, b) => {
          if (a.inStock === b.inStock) {
            return (b.salesCount || 0) - (a.salesCount || 0);
          }
          return a.inStock ? -1 : 1;
        });
        break;
    }
    return result;
  }, [filteredProducts, sort]);

  // Actions
  const toggleFilter = (type: keyof Omit<FilterState, "inStock" | "minPrice" | "maxPrice">, value: string) => {
    setFilters((prev) => {
      const current = prev[type] as string[];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const setInStock = (inStock: boolean) => {
    setFilters((prev) => ({ ...prev, inStock }));
  };

  const setPriceRange = (minPrice?: number, maxPrice?: number) => {
    setFilters(prev => ({ ...prev, minPrice, maxPrice }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      sizes: [],
      colors: [],
      occasions: [],
      inStock: false,
    });
  };
  
  const removeFilter = (type: keyof FilterState, value?: string) => {
    setFilters((prev) => {
      if (type === 'inStock') return { ...prev, inStock: false };
      if (type === 'minPrice' || type === 'maxPrice') return { ...prev, [type]: undefined };
      
      const current = prev[type as keyof Omit<FilterState, "inStock" | "minPrice" | "maxPrice">] as string[];
      return { ...prev, [type]: current.filter((v) => v !== value) };
    });
  }

  // Derived state for available filter options based on initial products (not filtered products, so options don't disappear)
  const availableFilters = useMemo(() => {
    const contextProducts = initialContext 
      ? initialProducts.filter(p => {
          if (initialContext.category && !(p.category === initialContext.category || CATEGORY_PARENTS[p.category] === initialContext.category)) return false;
          if (initialContext.collection && !p.collection?.includes(initialContext.collection)) return false;
          if (initialContext.occasion && !p.occasion?.includes(initialContext.occasion)) return false;
          if (initialContext.search) {
            const q = initialContext.search.toLowerCase();
            const text = [p.title, p.category, p.collection, ...(p.colors || []), ...(p.occasion || [])].join(" ").toLowerCase();
            if (!(text.includes(q) || q.split(/\s+/).some(term => text.includes(term)))) return false;
          }
          return true;
        })
      : initialProducts;

    const sizes = new Set<string>();
    const colors = new Set<string>();
    const occasions = new Set<string>();
    const categories = new Set<string>();

    contextProducts.forEach((p) => {
      p.sizes?.forEach((s) => sizes.add(s));
      p.colors?.forEach((c) => colors.add(c));
      p.occasion?.forEach((o) => occasions.add(o));
      if (p.category) categories.add(p.category);
    });

    return {
      sizes: Array.from(sizes).sort(),
      colors: Array.from(colors).sort(),
      occasions: Array.from(occasions).sort(),
      categories: Array.from(categories).sort(),
    };
  }, [initialProducts, initialContext]);

  return {
    products: sortedProducts,
    totalCount: sortedProducts.length,
    filters,
    sort,
    setSort,
    toggleFilter,
    setInStock,
    setPriceRange,
    clearFilters,
    removeFilter,
    availableFilters,
  };
}

// Simple lookup to handle subcategories for the mock data (e.g., sarees belongs to women)
const CATEGORY_PARENTS: Record<string, string> = {
  sarees: "women",
  // add others if needed
};
