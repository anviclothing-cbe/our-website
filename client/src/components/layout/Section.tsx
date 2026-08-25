import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  containerClassName?: string
  width?: "default" | "narrow" | "wide" | "full"
  spacing?: "default" | "none" | "sm" | "lg"
}

export function Section({
  children,
  className,
  containerClassName,
  width = "default",
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-surface",
        {
          "py-16 md:py-24": spacing === "default",
          "py-8 md:py-12": spacing === "sm",
          "py-24 md:py-32": spacing === "lg",
          "py-0": spacing === "none",
        },
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto px-4 md:px-8",
          {
            "max-w-7xl": width === "default",
            "max-w-3xl": width === "narrow",
            "max-w-screen-2xl": width === "wide",
            "max-w-full px-0 md:px-0": width === "full",
          },
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
