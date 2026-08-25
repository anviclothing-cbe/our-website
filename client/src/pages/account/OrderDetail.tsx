import { useRoute, Link } from "wouter"
import { fetchOrder } from "@/lib/api"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { ContextualSupport } from "@/components/shared/ContextualSupport"

import { useSEO } from "@/hooks/useSEO";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function OrderDetail() {
  const { formatPrice } = useCurrency();
  useSEO({ title: "Order Detail | ANVI Clothing", noindex: true });
  const [, params] = useRoute("/account/orders/:id")
  const orderId = params?.id
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) return;
    setLoading(true)
    fetchOrder(orderId)
      .then(data => setOrder(data))
      .catch(err => console.error("Failed to fetch order:", err))
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading) return <div className="text-center py-12">Loading...</div>

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted mb-4">Order not found.</p>
        <Link href="/account/orders">
          <a className="text-sm font-medium text-text-primary underline underline-offset-4">
            Return to Orders
          </a>
        </Link>
      </div>
    )
  }

  const orderDate = new Date(order.createdAt || order.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric"
  })

  return (
    <div className="w-full space-y-8">
      <header className="border-b border-border-subtle pb-6">
        <Link href="/account/orders">
          <a className="inline-flex items-center text-sm text-text-muted hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
          </a>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-text-primary">Order #{order.orderNumber || order.id}</h2>
            <p className="text-sm text-text-muted mt-1">Placed on {orderDate}</p>
          </div>
          <span className="inline-flex items-center justify-center px-3 py-1.5 bg-border-subtle text-sm font-medium rounded-sm w-fit">
            {order.status}
          </span>
        </div>
      </header>

      {order.trackingUrl && (
        <section className="bg-border-subtle p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-text-primary text-sm">Track your delivery</h3>
            <p className="text-sm text-text-muted mt-1">Updates are provided by our courier partner.</p>
          </div>
          <a 
            href={order.trackingUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium border border-border-strong bg-transparent hover:bg-button-primary hover:text-text-on-dark h-10 px-4 py-2"
          >
            TRACK ORDER
          </a>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h3 className="text-lg font-serif text-text-primary mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 border border-border-subtle p-4">
                  <div className="w-20 h-28 md:w-24 md:h-32 bg-surface-light shrink-0">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-medium text-text-primary text-sm md:text-base">{item.name || item.productName}</h4>
                        {(item.size || item.variant) && (
                          <p className="text-sm text-text-muted mt-1">{item.size || item.variant}</p>
                        )}
                      </div>
                      <span className="font-medium text-text-primary text-sm md:text-base whitespace-nowrap">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="mt-auto pt-4 flex items-end justify-between">
                      <span className="text-sm text-text-muted">Qty: {item.quantity}</span>
                      
                      {/* BUY AGAIN ACTION */}
                      <Link href={`/product/${item.productId}`}>
                        <a className="text-sm font-medium text-text-primary underline underline-offset-4">
                          Buy Again
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="border border-border-subtle p-4 md:p-6">
            <h3 className="text-lg font-serif text-text-primary mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span>{formatPrice((order.subtotal || 0))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Shipping</span>
                <span>{(order.shipping || 0) === 0 ? "Free" : `₹${order.shipping || 0}`}</span>
              </div>
              <div className="border-t border-border-subtle my-2 pt-2 flex justify-between font-medium text-base">
                <span>Total</span>
                <span>{formatPrice((order.total || 0))}</span>
              </div>
            </div>
          </section>

          <section className="border border-border-subtle p-4 md:p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2 uppercase tracking-wider">Shipping Address</h3>
              <address className="text-sm text-text-muted not-italic space-y-1">
                <p className="font-medium text-text-primary">{order.customerName || (order.shippingAddress && order.shippingAddress.name)}</p>
                <p>{(order.address && order.address.addressLine1) || (order.shippingAddress && order.shippingAddress.addressLine1)}</p>
                {((order.address && order.address.addressLine2) || (order.shippingAddress && order.shippingAddress.addressLine2)) && <p>{(order.address && order.address.addressLine2) || (order.shippingAddress && order.shippingAddress.addressLine2)}</p>}
                <p>{(order.address && order.address.city) || (order.shippingAddress && order.shippingAddress.city)}, {(order.address && order.address.state) || (order.shippingAddress && order.shippingAddress.state)} {(order.address && order.address.pincode) || (order.shippingAddress && order.shippingAddress.pincode)}</p>
                <p>{(order.address && order.address.country) || (order.shippingAddress && order.shippingAddress.country)}</p>
                <p className="pt-2">Phone: {order.customerPhone || (order.shippingAddress && order.shippingAddress.phone)}</p>
              </address>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2 uppercase tracking-wider">Payment Method</h3>
              <p className="text-sm text-text-muted">{order.paymentMethod}</p>
            </div>
          </section>

          <ContextualSupport 
            title="Need help?"
            ctaText="Message us"
            params={{ context: "orderQuestion", orderNumber: order.id }}
            className="border-border-subtle"
          />
        </div>
      </div>
    </div>
  )
}
