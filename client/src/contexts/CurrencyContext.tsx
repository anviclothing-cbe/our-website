import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AUD";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInINR: number) => string;
}

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 83,
  EUR: 90,
  GBP: 105,
  AUD: 54,
};

const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "en-IE", // Using Ireland for English+Euro
  GBP: "en-GB",
  AUD: "en-AU",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");

  // Load preferred currency from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("anvi-currency") as CurrencyCode;
    if (saved && EXCHANGE_RATES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem("anvi-currency", code);
  };

  const formatPrice = (amountInINR: number): string => {
    const rate = EXCHANGE_RATES[currency];
    const convertedAmount = amountInINR / rate;
    
    // For INR, we typically don't show fraction digits for round numbers.
    // For USD/EUR/GBP, showing cents might be preferred, but let's keep it consistent
    // with max fraction digits 0 unless it's a small amount.
    const locale = CURRENCY_LOCALES[currency];
    
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
