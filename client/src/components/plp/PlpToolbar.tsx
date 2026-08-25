import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SortOption, FilterState } from "@/hooks/use-product-filtering"
import { collection as collectionCopy } from "@/ui/index"

export interface PlpToolbarProps {
  count: number
  sort: SortOption
  onSortChange: (val: SortOption) => void
  onMobileFilterOpen: () => void
  activeFiltersCount: number
  filters: FilterState
  onRemoveFilter: (type: keyof FilterState, value?: string) => void
  onClearFilters: () => void
}

export function PlpToolbar({
  count,
  sort,
  onSortChange,
  onMobileFilterOpen,
  activeFiltersCount,
  filters,
  onRemoveFilter,
  onClearFilters
}: PlpToolbarProps) {
  
  // Flatten active filters for rendering chips
  const activeFilterChips: { type: keyof FilterState; value?: string; label: string }[] = []
  
  if (filters.inStock) {
    activeFilterChips.push({ type: 'inStock', label: 'In Stock' })
  }
  filters.category.forEach(c => activeFilterChips.push({ type: 'category', value: c, label: c }))
  filters.sizes.forEach(s => activeFilterChips.push({ type: 'sizes', value: s, label: s }))
  filters.colors.forEach(c => activeFilterChips.push({ type: 'colors', value: c, label: c }))
  filters.occasions.forEach(o => activeFilterChips.push({ type: 'occasions', value: o, label: o }))
  
  // Note: For minPrice/maxPrice we would add them here if implemented in UI.

  return (
    <div className="w-full flex flex-col border-b border-border-subtle bg-surface sticky top-[64px] z-30 transition-all">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Mobile Filter Trigger */}
        <div className="lg:hidden flex items-center">
          <Button variant="outline" size="sm" onClick={onMobileFilterOpen} className="gap-2 border-border-subtle">
            <SlidersHorizontal className="w-4 h-4" />
            {collectionCopy.filters.title} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>

        {/* Desktop Title/Count (Optional left side alignment) */}
        <div className="hidden lg:flex items-center">
          <p className="text-sm font-medium text-text-primary">
            {collectionCopy.productsCount(count)}
          </p>
        </div>

        {/* Right side: Sort */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted hidden sm:inline-block">{collectionCopy.filters.sortBy}</span>
            <Select value={sort} onValueChange={(val) => onSortChange(val as SortOption)}>
              <SelectTrigger className="w-[180px] h-9 border-border-subtle bg-transparent text-sm focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder={collectionCopy.filters.sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">{collectionCopy.filters.sortOptions.recommended}</SelectItem>
                <SelectItem value="newest">{collectionCopy.filters.sortOptions.newest}</SelectItem>
                <SelectItem value="bestselling">{collectionCopy.filters.sortOptions.bestselling}</SelectItem>
                <SelectItem value="price-asc">{collectionCopy.filters.sortOptions.priceAsc}</SelectItem>
                <SelectItem value="price-desc">{collectionCopy.filters.sortOptions.priceDesc}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Active Filters Row (Desktop & Mobile) */}
      {activeFilterChips.length > 0 && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-4 pt-1 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-text-muted mr-2">{collectionCopy.filters.active}</span>
          {activeFilterChips.map((chip, idx) => (
            <span 
              key={`${chip.type}-${chip.value || idx}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-light border border-border-subtle text-xs font-medium text-text-primary"
            >
              {chip.label}
              <button 
                onClick={() => onRemoveFilter(chip.type, chip.value)}
                className="hover:text-text-muted transition-colors focus:outline-none"
                aria-label={`Remove ${chip.label} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button 
            onClick={onClearFilters}
            className="text-xs text-text-muted hover:text-text-primary underline underline-offset-2 ml-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Clear all active filters"
          >
            {collectionCopy.filters.clearAll}
          </button>
        </div>
      )}
    </div>
  )
}
