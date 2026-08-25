"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface group-[.toaster]:text-text-primary group-[.toaster]:border-border-subtle group-[.toaster]:shadow-sm group-[.toaster]:rounded-md",
          description: "group-[.toast]:text-text-muted",
          actionButton:
            "group-[.toast]:bg-brand-primary group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-brand-beige group-[.toast]:text-text-primary",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
