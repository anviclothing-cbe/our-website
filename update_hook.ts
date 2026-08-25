import fs from 'fs';
const path = '/Users/Apple/Downloads/anvi/client/src/hooks/use-product-filtering.ts';
let content = fs.readFileSync(path, 'utf-8');

const replacement = `
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
  import("react").then(({ useEffect }) => {
    // This is a hack to get useEffect since it wasn't imported at top if we just replace the body, but it IS imported!
  });
`;

// actually let's just do it with multi_replace_file_content
