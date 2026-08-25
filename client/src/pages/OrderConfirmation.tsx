import { useRoute } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useOrder } from "@/hooks/useOrder";
import { Button } from "@/components/ui/button";
import { ContextualSupport } from "@/components/shared/ContextualSupport";
import { CheckCircle2, Copy, MessageCircle, MapPin, CreditCard, ChevronRight, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function OrderConfirmation() {
  const { formatPrice } = useCurrency();
  useSEO({ title: "Order Confirmed | ANVI Clothing", noindex: true });
  const [, params] = useRoute("/order-confirmation/:id");
  const { order, isLoading, error } = useOrder(params?.id || null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when confirmation loads
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-brand-maroon/20 border-t-brand-maroon rounded-full animate-spin mb-4" />
        <p className="text-text-muted">Retrieving order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-surface px-4 text-center">
        <div className="w-16 h-16 bg-surface-light rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">😕</span>
        </div>
        <h1 className="font-serif text-2xl text-text-primary mb-3">Order not found</h1>
        <p className="text-text-muted mb-8 max-w-md">
          {error || "We couldn't load your order details right now. If you just placed an order, it is safe with us."}
        </p>
        <Button asChild className="h-12 px-8">
          <a href="/account/orders">VIEW MY ORDERS</a>
        </Button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
    toast({ title: "Order number copied" });
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Reassurance */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 bg-success-bg text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-text-primary mb-4">
            Thank you for choosing ANVI.
          </h1>
          <p className="text-text-muted text-lg">
            Your order is confirmed. We're getting it ready with care.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Main Info */}
          <div className="md:col-span-7 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            
            {/* Order Status Card */}
            <div className="bg-background border border-border-subtle rounded-sm p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm text-text-muted mb-1">Order Number</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg text-text-primary uppercase">ORDER #{order.id}</span>
                    <button onClick={handleCopy} className="text-text-muted hover:text-text-primary transition-colors p-1" aria-label="Copy order number">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {order.paymentStatus === "paid" && (
                  <div className="px-3 py-1.5 bg-success-bg text-success text-xs font-medium rounded-full border border-success">
                    Payment successful
                  </div>
                )}
              </div>

              {/* Tracking Timeline */}
              <div className="mb-8">
                <p className="font-medium text-text-primary mb-6">
                  Estimated delivery: <span className="text-brand-maroon">{order.estimatedDelivery}</span>
                </p>
                <div className="relative">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-border-subtle" />
                  <div className="space-y-6">
                    <div className="relative flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-button-primary text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-text-primary">Order confirmed</p>
                        <p className="text-xs text-text-muted mt-0.5">Your order has been received.</p>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-surface-light border border-border-subtle flex items-center justify-center shrink-0 z-10 ring-4 ring-white" />
                      <div>
                        <p className="font-medium text-sm text-text-muted">Being prepared</p>
                        <p className="text-xs text-text-muted mt-0.5">ANVI is preparing your pieces.</p>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-surface-light border border-border-subtle flex items-center justify-center shrink-0 z-10 ring-4 ring-white" />
                      <div>
                        <p className="font-medium text-sm text-text-muted">On the way</p>
                        <p className="text-xs text-text-muted mt-0.5">You'll receive tracking information.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 h-12" onClick={() => toast({ title: "Tracking will be available once your order is shipped." })}>
                  TRACK ORDER
                </Button>
                <Button variant="outline" asChild className="flex-1 h-12">
                  <a href="/account/orders">VIEW YOUR ORDER</a>
                </Button>
              </div>
            </div>

            {/* Support */}
            <div className="mt-8">
              <ContextualSupport 
                title="Need help with your order?"
                description="Our support team is available on WhatsApp."
                ctaText="Chat with ANVI"
                params={{ context: "orderQuestion", orderNumber: order.id }}
                className="bg-surface-light/50 border border-border-subtle"
              />
            </div>

          </div>

          {/* Sidebar Summary */}
          <div className="md:col-span-5 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            
            <div className="bg-background border border-border-subtle rounded-sm p-6">
              <h2 className="font-serif text-xl text-text-primary mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-6">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                    <div className="relative">
                      <div className="w-16 h-20 bg-surface-light rounded-sm overflow-hidden border border-border-subtle">
                        <img
                          src={item.product.images?.[0] || item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-border-subtle text-[11px] font-medium text-white">
                        {item.quantity}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="text-sm font-medium text-text-primary line-clamp-1">{item.product.title}</h4>
                      <div className="text-xs text-text-muted mt-1">
                        {item.selectedColor && <span>{item.selectedColor}</span>}
                        {item.selectedColor && item.selectedSize && <span> / </span>}
                        {item.selectedSize && <span>{item.selectedSize}</span>}
                      </div>
                    </div>
                    
                    <div className="text-sm font-medium text-text-primary py-1">
                      {formatPrice((item.product.price * item.quantity))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border-subtle pt-4 space-y-3 text-sm mb-4">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : `₹${order.shipping.toLocaleString("en-IN")}`}</span>
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-border-subtle">
                  <span className="text-base font-medium text-text-primary">Total</span>
                  <span className="text-xl font-medium text-text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-background border border-border-subtle rounded-sm p-6 space-y-6">
              
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-text-muted" />
                  Delivering to
                </h3>
                <div className="text-sm text-text-muted pl-6">
                  <p className="font-medium text-text-primary">{order.customer.name}</p>
                  <p>{order.shippingAddress.line1}</p>
                  {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>{order.shippingAddress.pincode}</p>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-4">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-text-muted" />
                  Payment Method
                </h3>
                <div className="text-sm text-text-muted pl-6">
                  {order.paymentMethod === 'upi' ? 'Paid via UPI' : 
                   order.paymentMethod === 'card' ? 'Paid via Card' : 
                   'Cash on Delivery'}
                </div>
              </div>

              <div className="mt-4 p-3 bg-surface-light/50 rounded-sm text-xs text-text-muted flex items-start gap-2 border border-border-subtle">
                <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p>For your privacy, access to this order details page requires email verification when accessed from outside your account.</p>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Shopping Return */}
        <div className="mt-16 text-center pb-8">
          <p className="text-sm text-text-muted mb-4">We'd love to hear what you think once your ANVI piece arrives.</p>
          <Button variant="link" asChild className="text-brand-maroon hover:text-text-primary font-medium text-base h-auto p-0">
            <a href="/category/new-arrivals" className="flex items-center gap-1">
              CONTINUE SHOPPING <ChevronRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

      </div>
    </div>
  );
}
