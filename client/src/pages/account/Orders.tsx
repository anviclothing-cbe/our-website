import { Link } from "wouter"
import { fetchUserOrders } from "@/lib/api"
import { useState, useEffect } from "react"
import { emptyStates } from "@/ui/index"

import { useSEO } from "@/hooks/useSEO";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function Orders() {
  const { formatPrice } = useCurrency();
  useSEO({ title: "My Orders | ANVI Clothing", noindex: true });
  const [orders, setOrders] = useState<any[]>([])
  
  useEffect(() => {
    fetchUserOrders()
      .then(data => setOrders(data))
      .catch(err => console.error("Failed to fetch orders:", err))
  }, [])

  return (
    <div className="w-full space-y-8">
      <header className="border-b border-border-subtle pb-6">
        <h2 className="text-3xl font-serif text-text-primary">Your Orders</h2>
        <p className="text-text-muted mt-2">
          A record of the pieces you've chosen.
        </p>
      </header>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id || order.id} className="border border-border-subtle p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-text-primary">Order #{order.orderNumber || order.id}</span>
                  <span className="text-xs font-medium px-2 py-1 bg-border-subtle rounded-sm whitespace-nowrap">
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-text-muted flex flex-wrap gap-x-4 gap-y-1">
                  <span>
                    {new Date(order.createdAt || order.date).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                  <span>{order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'}</span>
                  <span>{formatPrice((order.total || 0))}</span>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 pt-2">
                  {(order.items || []).slice(0, 4).map((item: any, i: number) => (
                    <div key={i} className="w-12 h-16 bg-surface-light overflow-hidden">
                      <img src={item.image} alt={item.name || item.productName} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {(order.items?.length || 0) > 4 && (
                    <div className="w-12 h-16 bg-border-subtle flex items-center justify-center text-xs text-text-muted">
                      +{(order.items?.length || 0) - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
                <Link href={`/account/orders/${order.orderNumber || order.id}`}>
                  <a className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-border-strong bg-transparent hover:bg-button-primary hover:text-text-on-dark h-10 px-6 py-2 w-full">
                    VIEW DETAILS
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-border-subtle p-8 text-center max-w-lg mx-auto mt-12">
          <p className="text-text-muted mb-4">{emptyStates.orders.title}</p>
          <p className="text-sm text-text-muted mb-6">{emptyStates.orders.support}</p>
          <Link href="/collections/new-arrivals">
            <a className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-button-primary text-text-on-dark hover:bg-border-subtle h-10 px-6 py-2">
              {emptyStates.orders.cta}
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
