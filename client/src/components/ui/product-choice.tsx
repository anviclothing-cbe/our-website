import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Minus, Plus } from "lucide-react"

export interface ColorSwatchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorCode: string
  selected?: boolean
  unavailable?: boolean
}

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  ({ className, colorCode, selected, unavailable, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          selected && "ring-2 ring-border-strong ring-offset-2",
          unavailable && "opacity-50 cursor-not-allowed",
          className
        )}
        style={{ backgroundColor: colorCode }}
        aria-pressed={selected}
        aria-disabled={unavailable}
        {...props}
      >
        {selected && (
          <Check className="h-4 w-4 text-white mix-blend-difference" />
        )}
        {unavailable && !selected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[1px] w-full rotate-45 bg-border-subtle" />
          </div>
        )}
      </button>
    )
  }
)
ColorSwatch.displayName = "ColorSwatch"


export interface SizeSelectorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  unavailable?: boolean
}

const SizeSelector = React.forwardRef<HTMLButtonElement, SizeSelectorProps>(
  ({ className, selected, unavailable, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex h-12 min-w-[3rem] items-center justify-center rounded-md border border-border-subtle px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "hover:bg-border-subtle",
          selected && "border-border-strong bg-button-primary text-white hover:bg-border-subtle",
          unavailable && "opacity-50 cursor-not-allowed bg-border-subtle text-text-muted hover:bg-border-subtle",
          className
        )}
        aria-pressed={selected}
        aria-disabled={unavailable}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SizeSelector.displayName = "SizeSelector"


export interface QuantitySelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  onDecrease: () => void
  onIncrease: () => void
  min?: number
  max?: number
}

const QuantitySelector = React.forwardRef<HTMLDivElement, QuantitySelectorProps>(
  ({ className, value, onDecrease, onIncrease, min = 1, max = 99, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-12 items-center rounded-md border border-border-subtle bg-transparent",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className="flex h-full w-10 items-center justify-center text-text-muted transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-l-md"
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </button>
        <div className="flex h-full w-10 items-center justify-center text-sm font-medium text-text-primary">
          {value}
        </div>
        <button
          type="button"
          onClick={onIncrease}
          disabled={value >= max}
          className="flex h-full w-10 items-center justify-center text-text-muted transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r-md"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </button>
      </div>
    )
  }
)
QuantitySelector.displayName = "QuantitySelector"

export { ColorSwatch, SizeSelector, QuantitySelector }
