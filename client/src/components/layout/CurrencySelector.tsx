import React from "react"
import { useCurrency, CurrencyCode } from "@/contexts/CurrencyContext"

const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: "INR", symbol: "₹", label: "INR (₹)" },
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
  { code: "AUD", symbol: "A$", label: "AUD (A$)" },
];

export function CurrencySelector({ isMobile = false }: { isMobile?: boolean }) {
  const { currency, setCurrency } = useCurrency();

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2 mt-4 px-2">
        <label className="text-sm font-medium text-text-muted">Select Currency</label>
        <div className="grid grid-cols-3 gap-2">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`py-2 px-3 text-sm rounded-md border ${
                currency === curr.code
                  ? "bg-surface-accent border-surface-accent text-text-primary font-medium"
                  : "bg-surface border-border-subtle text-text-muted hover:border-text-muted"
              } transition-colors text-center`}
            >
              {curr.code}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group flex items-center">
      <button className="flex items-center gap-1 text-sm font-medium text-text-primary hover:text-text-muted transition-colors py-2">
        {CURRENCIES.find((c) => c.code === currency)?.symbol} {currency}
      </button>
      
      {/* Dropdown */}
      <div className="absolute top-full right-0 mt-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-surface border border-border-subtle rounded-lg shadow-lg overflow-hidden py-1">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-accent hover:text-text-primary transition-colors ${
                currency === curr.code ? "bg-surface-accent text-text-primary font-medium" : "text-text-muted"
              }`}
            >
              <span className="inline-block w-6">{curr.symbol}</span>
              {curr.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
