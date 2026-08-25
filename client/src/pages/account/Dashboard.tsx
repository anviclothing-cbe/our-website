import { useAuth } from "@/contexts/AuthContext"
import { Link } from "wouter"
import { fetchUserOrders } from "@/lib/api"
import { useState, useEffect } from "react"

import { useSEO } from "@/hooks/useSEO";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function Dashboard() {
  const { formatPrice } = useCurrency();
  useSEO({ title: "My Dashboard | ANVI Clothing", noindex: true });
  const { user } = useAuth()
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  
  useEffect(() => {
    fetchUserOrders()
      .then(orders => setRecentOrders(orders.slice(0, 2)))
      .catch(err => console.error("Failed to fetch orders:", err))
  }, [])
  
  if (!user) return null

  return (
    <div className="w-full space-y-12">
      <header className="border-b border-border-subtle pb-6">
        <h2 className="text-3xl font-serif text-text-primary">Hello, {user.name.split(" ")[0]}.</h2>
        <p className="text-text-muted mt-2">
          Welcome to your account. Here you can view your past orders, manage your saved addresses, and keep track of pieces you love.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-text-primary">Recent Orders</h3>
          <Link href="/account/orders">
            <a className="text-sm font-medium text-text-primary underline underline-offset-4">
              View all
            </a>
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentOrders.map((order) => (
              <div key={order._id || order.id} className="border border-border-subtle p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-text-muted block mb-1">
                      {new Date(order.createdAt || order.date).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                    <span className="font-medium text-text-primary">Order #{order.orderNumber || order.id}</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-border-subtle rounded-sm">
                    {order.status}
                  </span>
                </div>
                
                <div className="flex-1 text-sm text-text-muted mb-6">
                  {order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'} • {formatPrice((order.total || 0))}
                </div>

                <Link href={`/account/orders/${order.orderNumber || order.id}`}>
                  <a className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-border-strong bg-transparent hover:bg-button-primary hover:text-text-on-dark h-10 px-4 py-2 w-full">
                    VIEW ORDER
                  </a>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-border-subtle p-8 text-center">
            <p className="text-text-muted mb-4">No orders yet.</p>
            <p className="text-sm text-text-muted mb-6">Once you place an order, it will appear here.</p>
            <Link href="/collections/new-arrivals">
              <a className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-button-primary text-text-on-dark hover:bg-border-subtle h-10 px-4 py-2">
                START SHOPPING
              </a>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
