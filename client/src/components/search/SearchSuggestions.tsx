import { SearchResult } from "@/lib/search-service"
import { Product } from "@/lib/mock-data"
import { Link } from "wouter"
import { useCurrency } from "@/contexts/CurrencyContext";

interface SearchSuggestionsProps {
  results: SearchResult
  onSelect: (url: string) => void
  onSubmitQuery: () => void
  query: string
}

export function SearchSuggestions({ results, onSelect, onSubmitQuery, query }: SearchSuggestionsProps) {
  const { formatPrice } = useCurrency();
  const hasCategories = results.categories.length > 0
  const hasCollections = results.collections.length > 0
  const hasProducts = results.products.length > 0
  const hasAnyResults = hasCategories || hasCollections || hasProducts

  if (!hasAnyResults) {
    return (
      <div className="py-8 text-center">
        <h3 className="font-serif text-2xl text-text-primary mb-2">We couldn't find that one.</h3>
        <p className="text-text-muted mb-6">Try another search or explore our favourites.</p>
        <button
          onClick={() => onSelect("/collections/new-arrivals")}
          className="text-sm uppercase tracking-wider font-bold text-text-primary hover:text-surface-accent transition-colors"
        >
          Shop New Arrivals
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-8">
      {/* Suggestions Column */}
      <div className="flex-1 max-w-sm flex flex-col gap-8">
        
        {/* Direct Search Suggestion */}
        <section>
          <button 
            onClick={onSubmitQuery}
            className="text-text-primary hover:text-surface-accent transition-colors text-lg font-serif italic"
          >
            Search for "{query}" &rarr;
          </button>
        </section>

        {hasCategories && (
          <section>
            <h3 className="text-xs font-bold tracking-wider text-text-muted uppercase mb-3">
              Categories
            </h3>
            <ul className="flex flex-col gap-2">
              {results.categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onSelect(`/category/${cat.id}`)}
                    className="text-text-primary hover:text-surface-accent transition-colors"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasCollections && (
          <section>
            <h3 className="text-xs font-bold tracking-wider text-text-muted uppercase mb-3">
              Collections
            </h3>
            <ul className="flex flex-col gap-2">
              {results.collections.map(col => (
                <li key={col.id}>
                  <button 
                    onClick={() => onSelect(`/collections/${col.id}`)}
                    className="text-text-primary hover:text-surface-accent transition-colors"
                  >
                    {col.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Products Column */}
      {hasProducts && (
        <div className="flex-[2]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold tracking-wider text-text-muted uppercase">
              Products
            </h3>
            <button 
              onClick={onSubmitQuery}
              className="text-xs underline text-text-muted hover:text-text-primary transition-colors"
            >
              View all results
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {results.products.map(product => (
              <ProductSuggestionItem 
                key={product.id} 
                product={product} 
                onClick={() => onSelect(product.href)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProductSuggestionItem({ product, onClick }: { product: Product, onClick: () => void }) {
  const { formatPrice } = useCurrency();
  return (
    <button onClick={onClick} className="group text-left flex flex-col gap-2">
      <div className="aspect-[3/4] w-full overflow-hidden bg-surface-light relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-surface px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-text-primary">
            {product.badge}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium text-text-primary truncate">{product.title}</h4>
        <p className="text-sm text-text-muted">{formatPrice(product.price)}</p>
      </div>
    </button>
  )
}
