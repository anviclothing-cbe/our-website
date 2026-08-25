import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (val: string) => void
  onClear: () => void
  onSubmit: () => void
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, onSubmit, ...props }, ref) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit()
      }
    }

    return (
      <div className={cn("relative flex items-center w-full", className)}>
        <Search className="absolute left-4 h-5 w-5 text-text-muted pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-14 w-full bg-surface-light pl-12 pr-12 text-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring/50 rounded-none transition-all"
          {...props}
        />
        {value.length > 0 && (
          <button
            onClick={onClear}
            className="absolute right-4 p-1 text-text-muted hover:text-text-primary focus:outline-none transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"
