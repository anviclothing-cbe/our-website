import { X } from "lucide-react"
import { search as searchCopy } from "@/ui/index"

interface EmptySearchStateProps {
  recentSearches: string[]
  onSelectSearch: (query: string) => void
  onRemoveRecent: (query: string) => void
  onClearRecent: () => void
}

const POPULAR_SEARCHES = [
  "Sarees",
  "Salwars",
  "Co-ord Sets",
  "Kidswear",
  "Festive",
  "Office Wear"
]

export function EmptySearchState({ 
  recentSearches, 
  onSelectSearch, 
  onRemoveRecent, 
  onClearRecent 
}: EmptySearchStateProps) {
  return (
    <div className="flex flex-col gap-8 pb-8">
      
      {recentSearches.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold tracking-wider text-text-muted uppercase">
              {searchCopy.recent}
            </h3>
            <button 
              onClick={onClearRecent}
              className="text-xs underline text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-label="Clear all recent searches"
            >
              Clear all
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {recentSearches.map(query => (
              <li key={query} className="flex items-center justify-between group">
                <button
                  onClick={() => onSelectSearch(query)}
                  className="text-text-primary hover:text-surface-accent transition-colors text-left flex-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {query}
                </button>
                <button
                  onClick={() => onRemoveRecent(query)}
                  className="p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  aria-label={`Remove ${query} from history`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="text-sm font-bold tracking-wider text-text-muted uppercase mb-4">
          {searchCopy.popular}
        </h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map(query => (
            <button
              key={query}
              onClick={() => onSelectSearch(query)}
              className="px-4 py-2 bg-surface-light text-sm text-text-primary hover:bg-button-primary hover:text-text-on-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {query}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold tracking-wider text-text-muted uppercase mb-4">
          Trending Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Sarees", img: "https://images.unsplash.com/photo-1583391733959-1f5127e9af06?q=80&w=600&auto=format&fit=crop" },
            { name: "Salwars", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" },
            { name: "Co-ord Sets", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop" },
            { name: "Festive", img: "https://images.unsplash.com/photo-1605027581729-1a84f3cc1605?q=80&w=600&auto=format&fit=crop" }
          ].map(cat => (
            <button
              key={cat.name}
              onClick={() => onSelectSearch(cat.name)}
              className="group flex flex-col items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <div className="w-full aspect-[4/5] rounded-sm overflow-hidden bg-surface-light">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <span className="text-text-primary font-medium text-sm transition-colors group-hover:text-brand-maroon">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  )
}
