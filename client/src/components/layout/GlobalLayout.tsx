import * as React from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { WhatsAppButton } from "../shared/WhatsAppButton"

interface GlobalLayoutProps {
  children: React.ReactNode
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-surface font-sans text-text-primary antialiased">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
