import { useEffect, useRef } from "react"
import { useLocation } from "wouter"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { SearchInput } from "./SearchInput"
import { EmptySearchState } from "./EmptySearchState"
import { SearchSuggestions } from "./SearchSuggestions"
import { useSearch } from "@/hooks/use-search"
import { useRecentSearches } from "@/hooks/use-recent-searches"
import { search as searchCopy } from "@/ui/index"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [, setLocation] = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { 
    query, setQuery, debouncedQuery, 
    isSearching, results, clearQuery 
  } = useSearch()
  
  const { 
    recentSearches, addSearch, removeSearch, clearAll 
  } = useRecentSearches()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus input slightly after transition
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
      // Optionally clear query when closing
      // clearQuery()
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (searchQuery: string = query) => {
    const trimmed = searchQuery.trim()
    if (trimmed) {
      addSearch(trimmed)
      setLocation(`/search?q=${encodeURIComponent(trimmed)}`)
      onClose()
    }
  }

  const handleSelectRoute = (route: string) => {
    setLocation(route)
    onClose()
  }

  const handleSelectRecent = (searchQuery: string) => {
    setQuery(searchQuery)
    handleSubmit(searchQuery)
  }

  const isQueryEmpty = debouncedQuery.trim() === ""

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-surface/80 backdrop-blur-md animate-in fade-in duration-500 ease-out">
      
      {/* Search Panel (Takes up full screen on mobile, top section on desktop) */}
      <div className="w-full bg-surface border-b border-border-subtle shadow-2xl overflow-y-auto max-h-screen lg:max-h-[85vh] animate-in slide-in-from-top-4 duration-500 ease-out pb-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8">
          
          {/* Header & Input */}
          <div className="flex items-center gap-4">
            <SearchInput
              ref={inputRef}
              value={query}
              onChange={setQuery}
              onClear={clearQuery}
              onSubmit={() => handleSubmit()}
              placeholder={searchCopy.placeholder}
              aria-label="Search products"
            />
            <button 
              onClick={onClose}
              className="shrink-0 p-3 text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors flex items-center justify-center"
              aria-label={searchCopy.accessible.closeSearch}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Loading Indicator */}
          {isSearching && !isQueryEmpty && (
            <div className="h-1 w-full bg-surface-light overflow-hidden" role="progressbar" aria-hidden="true">
              <div className="h-full bg-surface-accent animate-pulse w-1/3" />
            </div>
          )}
          
          <div className="sr-only" aria-live="polite">
            {isSearching ? "Searching..." : !isQueryEmpty ? `Found ${results.products.length} products, ${results.categories.length} categories, and ${results.collections.length} collections` : ""}
          </div>

          {/* Results Area */}
          <div className="min-h-[300px]">
            {isQueryEmpty ? (
              <EmptySearchState 
                recentSearches={recentSearches}
                onSelectSearch={handleSelectRecent}
                onRemoveRecent={removeSearch}
                onClearRecent={clearAll}
              />
            ) : (
              <div className={cn("transition-opacity duration-300", isSearching ? "opacity-50" : "opacity-100")}>
                <SearchSuggestions 
                  results={results}
                  onSelect={handleSelectRoute}
                  onSubmitQuery={() => handleSubmit()}
                  query={debouncedQuery}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Backdrop area for desktop (click to close) */}
      <div className="hidden lg:block flex-1 w-full" onClick={onClose} />
      
    </div>
  )
}
