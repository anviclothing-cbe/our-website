import { useState, useEffect } from "react"
import { fetchProducts, fetchCategories } from "@/lib/api";
import { useRoute } from "wouter"
import { CATEGORIES, COLLECTIONS, DISCOVER } from "@/lib/mock-data"
import { useProductFiltering } from "@/hooks/use-product-filtering"

import { PlpHeader } from "@/components/plp/PlpHeader"
import { PlpToolbar } from "@/components/plp/PlpToolbar"
import { PlpFilters } from "@/components/plp/PlpFilters"
import { PlpGrid } from "@/components/plp/PlpGrid"
import { useSEO } from "@/hooks/useSEO"

export default function Collection() {
  const [isCategoryMatch, categoryParams] = useRoute("/category/:id")
  const [isCollectionMatch, collectionParams] = useRoute("/collections/:id")
  const [isDiscoverMatch, discoverParams] = useRoute("/discover/:id")
  const [isSearchMatch] = useRoute("/search")
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Determine context
  const isCategory = isCategoryMatch && categoryParams?.id
  const isCollection = isCollectionMatch && collectionParams?.id
  const isDiscover = isDiscoverMatch && discoverParams?.id
  const isSearch = isSearchMatch
  const currentId = (isCategory ? categoryParams?.id : isCollection ? collectionParams?.id : discoverParams?.id) || "all"

  const [fetchedCategories, setFetchedCategories] = useState<any[]>([])
  
  useEffect(() => {
    if (isCategory) {
      fetchCategories()
        .then(data => setFetchedCategories(Array.isArray(data) ? data : []))
        .catch(err => console.error("Failed to fetch categories:", err));
    }
  }, [isCategory])

  // Get search query from URL
  const searchParams = new URLSearchParams(window.location.search)
  const searchQuery = searchParams.get("q") || ""

  // Find dynamic category metadata if available
  const dynamicCategory = fetchedCategories.find(c => c.slug === currentId)
  
  // We find metadata based on id. If it doesn't match anything perfectly, we fallback
  const meta: { title: string; id: string; description?: string; editorial?: boolean; parent?: string } = isSearch
    ? { title: `Search results for "${searchQuery}"`, id: "search" }
    : isCategory 
      ? (dynamicCategory ? { title: dynamicCategory.name, id: dynamicCategory.slug, description: dynamicCategory.description } : (CATEGORIES[currentId as keyof typeof CATEGORIES] || { title: "Category", id: currentId }))
      : isCollection 
        ? (COLLECTIONS[currentId as keyof typeof COLLECTIONS] || { title: "Collection", id: currentId })
        : isDiscover
          ? (DISCOVER[currentId as keyof typeof DISCOVER] || { title: "Discover", id: currentId })
          : { title: "All Products", id: "all" }

  const seoCanonical = isSearch ? undefined : `https://anvi.clothing${isCategory ? `/category/${currentId}` : isCollection ? `/collections/${currentId}` : `/discover/${currentId}`}`;

  useSEO({
    title: isSearch ? `Search results for "${searchQuery}" | ANVI Clothing` : `${meta.title} | ANVI Clothing`,
    description: meta.description || `Shop the latest ${meta.title} at ANVI Clothing. Handpicked ethnic wear for women.`,
    canonical: seoCanonical,
    noindex: isSearch,
    ogType: "website",
    structuredData: isSearch ? undefined : {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": meta.title,
      "description": meta.description || `Shop the latest ${meta.title} at ANVI Clothing.`,
      "url": seoCanonical
    }
  });

  const breadcrumbs = isSearch 
    ? [ { label: "Home", href: "/" }, { label: "Search" } ]
    : [
        { label: "Home", href: "/" },
        { label: isCategory ? "Categories" : isCollection ? "Collections" : "Discover" },
        { label: meta.title }
      ]

  // Setup filtering context
  const [fetchedProducts, setFetchedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchProducts({ 
          category: isCategory ? currentId : undefined,
          search: isSearch ? searchQuery : undefined,
          limit: 100 // Fetch a large batch for client-side filtering
        });
        setFetchedProducts(data.products.map((p: any) => ({ 
          ...p, 
          id: p._id || p.id,
          title: p.title || p.name,
          image: p.image || (p.images && p.images[0]) || '/anvi_main_logo.png',
          hoverImage: p.hoverImage || (p.images && p.images[1]),
          href: p.href || `/product/${p.slug || p._id}`,
          product: { ...p, id: p._id || p.id }
        })));
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [currentId, isCategory, isSearch, searchQuery]);

  const filtering = useProductFiltering(fetchedProducts, {
    category: isCategory ? currentId : undefined,
    collection: isCollection ? currentId : undefined,
    occasion: isDiscover ? currentId : undefined, // For discover, we filter by occasion (or we could map to a custom filter if we have one)
    search: isSearch ? searchQuery : undefined
  })

  const activeFiltersCount = 
    filtering.filters.category.length + 
    filtering.filters.sizes.length + 
    filtering.filters.colors.length + 
    filtering.filters.occasions.length + 
    (filtering.filters.inStock ? 1 : 0)

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      <PlpHeader 
        title={meta.title} 
        description={meta.description} 
        editorial={meta.editorial || false}
        count={filtering.totalCount}
        breadcrumbs={breadcrumbs}
      />

      <PlpToolbar 
        count={filtering.totalCount}
        sort={filtering.sort}
        onSortChange={filtering.setSort}
        onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
        activeFiltersCount={activeFiltersCount}
        filters={filtering.filters}
        onRemoveFilter={filtering.removeFilter}
        onClearFilters={filtering.clearFilters}
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-row items-start lg:gap-12">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-[160px]">
          <h3 className="font-serif text-xl text-text-primary mb-6 pb-4 border-b border-border-subtle">
            Filters
          </h3>
          <PlpFilters 
            filters={filtering.filters}
            availableFilters={filtering.availableFilters}
            onToggleFilter={filtering.toggleFilter}
            onSetInStock={filtering.setInStock}
            onSetPriceRange={filtering.setPriceRange}
            onClearFilters={filtering.clearFilters}
          />
        </aside>

        {/* Mobile Drawer Filter */}
        <PlpFilters 
          isMobile
          isMobileOpen={isMobileFilterOpen}
          onMobileClose={() => setIsMobileFilterOpen(false)}
          filters={filtering.filters}
          availableFilters={filtering.availableFilters}
          onToggleFilter={filtering.toggleFilter}
          onSetInStock={filtering.setInStock}
          onSetPriceRange={filtering.setPriceRange}
          onClearFilters={filtering.clearFilters}
        />

        {/* Product Grid */}
        <main className="flex-1 w-full min-w-0">
          <PlpGrid 
            products={filtering.products} 
            onClearFilters={filtering.clearFilters} 
            isSearch={isSearch}
          />
        </main>
      </div>
    </div>
  )
}
