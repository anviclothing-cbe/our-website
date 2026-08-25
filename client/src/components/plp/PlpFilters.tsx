import { useState } from "react"
import { FilterState } from "@/hooks/use-product-filtering"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { collection as collectionCopy, buttons } from "@/ui/index"

export interface PlpFiltersProps {
  filters: FilterState
  availableFilters: {
    sizes: string[]
    colors: string[]
    occasions: string[]
    categories: string[]
  }
  onToggleFilter: (type: keyof Omit<FilterState, "inStock" | "minPrice" | "maxPrice">, value: string) => void
  onSetInStock: (val: boolean) => void
  onSetPriceRange: (min?: number, max?: number) => void
  onClearFilters: () => void
  // Mobile specific
  isMobileOpen?: boolean
  onMobileClose?: () => void
  isMobile?: boolean
}

function FilterContent({ filters, availableFilters, onToggleFilter, onSetInStock, onSetPriceRange }: PlpFiltersProps) {
  const [localMin, setLocalMin] = useState(filters.minPrice?.toString() || "")
  const [localMax, setLocalMax] = useState(filters.maxPrice?.toString() || "")

  const applyPrice = () => {
    const min = localMin ? Number(localMin) : undefined
    const max = localMax ? Number(localMax) : undefined
    onSetPriceRange(min, max)
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Switch 
          id="in-stock-only" 
          checked={filters.inStock}
          onCheckedChange={onSetInStock}
        />
        <Label htmlFor="in-stock-only" className="text-sm font-medium leading-none cursor-pointer">
          In Stock Only
        </Label>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "sizes", "colors", "occasions"]} className="w-full">
        
        <AccordionItem value="price" className="border-border-subtle">
          <AccordionTrigger className="hover:no-underline text-sm font-medium py-3">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-1 pb-2">
              <div className="flex items-center space-x-2">
                <Input 
                  type="number" 
                  placeholder="Min" 
                  value={localMin} 
                  onChange={(e) => setLocalMin(e.target.value)}
                  className="h-8"
                />
                <span className="text-text-muted">-</span>
                <Input 
                  type="number" 
                  placeholder="Max" 
                  value={localMax} 
                  onChange={(e) => setLocalMax(e.target.value)}
                  className="h-8"
                />
              </div>
              <Button size="sm" variant="secondary" onClick={applyPrice} className="w-full h-8 text-xs">
                Apply Price
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {availableFilters.categories.length > 1 && (
          <AccordionItem value="category" className="border-border-subtle">
            <AccordionTrigger className="hover:no-underline text-sm font-medium py-3">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3 pt-1 pb-2">
                {availableFilters.categories.map(c => (
                  <div key={c} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${c}`} 
                      checked={filters.category.includes(c)}
                      onCheckedChange={() => onToggleFilter('category', c)}
                      className="border-border-subtle data-[state=checked]:bg-button-primary data-[state=checked]:border-border-strong"
                    />
                    <Label htmlFor={`category-${c}`} className="text-sm font-normal text-text-muted cursor-pointer capitalize">
                      {c}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {availableFilters.sizes.length > 0 && (
          <AccordionItem value="sizes" className="border-border-subtle">
            <AccordionTrigger className="hover:no-underline text-sm font-medium py-3">
              Size
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3 pt-1 pb-2">
                {availableFilters.sizes.map(s => (
                  <div key={s} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`size-${s}`} 
                      checked={filters.sizes.includes(s)}
                      onCheckedChange={() => onToggleFilter('sizes', s)}
                      className="border-border-subtle data-[state=checked]:bg-button-primary data-[state=checked]:border-border-strong"
                    />
                    <Label htmlFor={`size-${s}`} className="text-sm font-normal text-text-muted cursor-pointer">
                      {s}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {availableFilters.colors.length > 0 && (
          <AccordionItem value="colors" className="border-border-subtle">
            <AccordionTrigger className="hover:no-underline text-sm font-medium py-3">
              Color
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3 pt-1 pb-2">
                {availableFilters.colors.map(c => (
                  <div key={c} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`color-${c}`} 
                      checked={filters.colors.includes(c)}
                      onCheckedChange={() => onToggleFilter('colors', c)}
                      className="border-border-subtle data-[state=checked]:bg-button-primary data-[state=checked]:border-border-strong"
                    />
                    <Label htmlFor={`color-${c}`} className="text-sm font-normal text-text-muted cursor-pointer">
                      {c}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {availableFilters.occasions.length > 0 && (
          <AccordionItem value="occasions" className="border-border-subtle">
            <AccordionTrigger className="hover:no-underline text-sm font-medium py-3">
              Occasion
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3 pt-1 pb-2">
                {availableFilters.occasions.map(o => (
                  <div key={o} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`occasion-${o}`} 
                      checked={filters.occasions.includes(o)}
                      onCheckedChange={() => onToggleFilter('occasions', o)}
                      className="border-border-subtle data-[state=checked]:bg-button-primary data-[state=checked]:border-border-strong"
                    />
                    <Label htmlFor={`occasion-${o}`} className="text-sm font-normal text-text-muted cursor-pointer">
                      {o}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}

export function PlpFilters(props: PlpFiltersProps) {
  if (props.isMobile) {
    return (
      <Sheet open={props.isMobileOpen} onOpenChange={(open) => !open && props.onMobileClose?.()}>
        <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0 flex flex-col bg-surface">
          <SheetHeader className="px-6 py-4 border-b border-border-subtle text-left">
            <SheetTitle className="font-serif text-2xl text-text-primary">{collectionCopy.filters.title}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <FilterContent {...props} />
          </div>
          <SheetFooter className="px-6 pt-4 pb-safe border-t border-border-subtle flex flex-row gap-3 sm:justify-start">
            <Button variant="outline" className="flex-1 border-border-subtle" onClick={() => {
              props.onClearFilters()
              props.onMobileClose?.()
            }} aria-label="Clear all filters">
              {collectionCopy.filters.clearAll}
            </Button>
            <Button className="flex-1" onClick={props.onMobileClose}>
              {buttons.apply}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="w-full">
      <FilterContent {...props} />
    </div>
  )
}
