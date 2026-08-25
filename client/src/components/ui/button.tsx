import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] active:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-surface-dark text-text-on-dark hover:bg-brand-primary shadow-sm transition-colors duration-300",
        destructive:
          "bg-error text-text-on-dark hover:bg-error/90 shadow-sm",
        outline:
          "border border-border-strong bg-transparent text-brand-primary hover:bg-brand-primary hover:text-text-on-dark",
        secondary:
          "bg-surface-accent text-text-on-gold hover:bg-surface-accent-light shadow-sm",
        tertiary:
          "bg-surface text-text-primary hover:bg-surface-dark hover:text-text-on-dark transition-colors shadow-sm",
        charcoal:
          "bg-surface-dark text-text-on-dark hover:bg-brand-primary-dark transition-colors shadow-sm",
        ghost: "hover:bg-surface text-text-primary",
        link: "text-brand-primary underline-offset-4 hover:underline",
        icon: "bg-transparent text-text-primary hover:bg-surface",
      },
      size: {
        default: "min-h-[48px] px-8 py-3",
        sm: "min-h-9 px-4 text-xs",
        lg: "min-h-[54px] px-10 text-base",
        icon: "h-[48px] w-[48px]",
        iconSm: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
