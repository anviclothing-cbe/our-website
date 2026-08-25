import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Trash2, ShoppingBag, Heart, Minus, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ShieldCheck, Undo2, Truck } from "lucide-react";
import { ContextualSupport } from "@/components/shared/ContextualSupport";
import { emptyStates, cart, buttons, checkout as checkoutCopy, home } from "@/ui/index";
import { CartRecommendations } from "@/components/cart/CartRecommendations";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function CartPage() {
  const { formatPrice } = useCurrency();
  useSEO({ title: "Your Cart | ANVI Clothing", noindex: true });
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    itemCount, 
    subtotal, 
    shipping, 
    discount, 
    total,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();
  
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    const result = await applyCoupon(couponInput);
    setCouponMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    });
    if (result.success) setCouponInput("");
  };

  const handleMoveToWishlist = (itemId: string, productId: string) => {
    if (!isInWishlist(productId)) {
      toggleWishlist(productId);
    }
    removeFromCart(itemId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-surface-light flex items-center justify-center text-text-muted mb-6">
          <ShoppingBag size={40} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">{emptyStates.cart.title}</h1>
        <p className="text-text-muted mb-8 max-w-md mx-auto">
          {emptyStates.cart.support}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild className="h-14 px-8 text-base font-medium min-w-[200px]">
            <Link href="/category/new-arrivals">{emptyStates.cart.cta}</Link>
          </Button>
          <Button asChild variant="outline" className="h-14 px-8 text-base font-medium min-w-[200px] border-border-subtle">
            <Link href="/collections/the-anvi-edit">EXPLORE THE EDIT</Link>
          </Button>
        </div>
        <div className="w-full mt-12 text-left">
          <CartRecommendations layout="page" />
        </div>
      </div>
    );
  }

  const freeShippingThreshold = 5000;
  const awayFromFreeShipping = freeShippingThreshold - (subtotal - discount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-2" data-testid="text-cart-title">
          {cart.title} ({itemCount} items)
        </h1>
        <p className="text-text-muted">{cart.support}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 xl:gap-16">
        {/* Items */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="hidden lg:grid grid-cols-12 gap-4 pb-4 border-b border-border-subtle text-xs font-medium text-text-muted uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="space-y-6 lg:space-y-0 lg:divide-y lg:divide-border-subtle">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row lg:grid lg:grid-cols-12 gap-4 lg:gap-4 py-0 lg:py-6" data-testid={`row-cart-item-${item.id}`}>
                {/* Product Info */}
                <div className="flex gap-4 lg:col-span-6">
                  <Link href={`/product/${item.product.slug}`}>
                    <a className="shrink-0 w-24 h-32 sm:w-28 sm:h-36 bg-surface-light rounded-sm overflow-hidden block">
                      <img
                        src={item.product.images?.[0] || item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </a>
                  </Link>
                  <div className="flex-1 flex flex-col min-w-0 py-1">
                    <Link href={`/product/${item.product.slug}`}>
                      <a className="font-medium text-text-primary hover:underline line-clamp-2 pr-4 mb-1" data-testid={`text-item-name-${item.id}`}>
                        {item.product.title}
                      </a>
                    </Link>
                    <div className="text-sm text-text-muted space-y-0.5 mb-2">
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                    </div>
                    
                    <div className="mt-auto flex items-center gap-4">
                      <button
                        onClick={() => handleMoveToWishlist(item.id, item.product.id)}
                        className="text-xs text-text-muted hover:text-text-primary underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        aria-label={`Move ${item.product.title} to Wishlist`}
                      >
                        Move to Wishlist
                      </button>
                      <span className="text-text-muted">|</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-text-muted hover:text-error underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        data-testid={`button-remove-${item.id}`}
                        aria-label={`Remove ${item.product.title} from bag`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center lg:col-span-3 lg:justify-center mt-2 sm:mt-0">
                  <div className="flex items-center border border-border-subtle rounded-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-text-muted hover:bg-surface-light transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-l-sm"
                      data-testid={`button-decrease-${item.id}`}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.product.title}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-text-primary" data-testid={`text-item-qty-${item.id}`}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-text-muted hover:bg-surface-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r-sm"
                      data-testid={`button-increase-${item.id}`}
                      aria-label={`Increase quantity of ${item.product.title}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Price & Total */}
                <div className="hidden lg:flex flex-col justify-center items-end lg:col-span-3 text-right">
                  <p className="font-medium text-text-primary" data-testid={`text-item-subtotal-${item.id}`}>
                    {formatPrice((item.product.price * item.quantity))}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-text-muted mt-1">
                      {formatPrice(item.product.price)} each
                    </p>
                  )}
                </div>

                {/* Mobile Price Display */}
                <div className="flex lg:hidden justify-between items-center mt-4 pt-4 border-t border-border-subtle">
                  <span className="text-sm text-text-muted">Total</span>
                  <span className="font-medium text-text-primary">
                    {formatPrice((item.product.price * item.quantity))}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full text-left">
            <CartRecommendations layout="page" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0">
          <div className="bg-surface-light/30 rounded-sm p-6 lg:p-8 sticky top-24 border border-border-subtle">
            <h2 className="font-serif text-2xl text-text-primary mb-6">{checkoutCopy.sections.orderSummary}</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span data-testid="text-subtotal">{formatPrice(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-text-muted">
                  <span>Discount {coupon && `(${coupon})`}</span>
                  <span className="text-brand-maroon">-{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-text-muted">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
              </div>
            </div>

            {/* Shipping Threshold */}
            {awayFromFreeShipping > 0 && shipping > 0 && (
              <div className="bg-surface p-4 rounded-sm border border-border-subtle mb-6 text-sm text-text-muted text-center">
                You're <span className="font-medium">{formatPrice(awayFromFreeShipping)}</span> away from <span className="font-medium">Free Shipping</span>.
              </div>
            )}

            <div className="border-t border-border-subtle pt-4 mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="text-base font-medium text-text-primary">Total</span>
                <span className="text-xl font-medium text-text-primary" data-testid="text-total">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-xs text-text-muted text-right">Includes all taxes</p>
            </div>

            {/* Coupon Code */}
            <div className="mb-8">
              <div className="flex gap-2 mb-2">
                <Input 
                  placeholder="Promo Code" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="bg-background"
                />
                <Button 
                  variant="outline" 
                  onClick={handleApplyCoupon}
                  className="border-border-subtle shrink-0"
                >
                  Apply
                </Button>
              </div>
              {couponMessage && (
                <p className={`text-xs ${couponMessage.type === 'error' ? 'text-error' : 'text-success'}`}>
                  {couponMessage.text}
                </p>
              )}
              {coupon && (
                <div className="flex items-center gap-2 mt-2 bg-background px-3 py-2 border border-border-subtle rounded-sm inline-flex">
                  <Tag className="w-3 h-3 text-text-muted" />
                  <span className="text-xs font-medium text-text-primary">{coupon}</span>
                  <button onClick={removeCoupon} className="text-text-muted hover:text-text-primary ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" aria-label={`Remove coupon ${coupon}`}>
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <Button asChild className="w-full h-14 text-base font-medium mb-4">
              <Link href="/checkout" data-testid="button-checkout">
                {buttons.proceedToCheckout}
              </Link>
            </Button>
            
            <div className="text-center mt-4">
              <Link href="/">
                <a className="inline-block text-sm text-text-muted hover:text-text-primary underline transition-colors">
                  Continue Shopping
                </a>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border-subtle">
              <ContextualSupport 
                title="Need help before checkout?"
                ctaText="Chat with ANVI"
                params={{ context: "orderQuestion" }}
                className="bg-transparent border-none p-0"
              />
            </div>
            
            {/* Trust Reassurance */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <ShieldCheck className="w-4 h-4 text-text-primary shrink-0" />
                <span>{home.trust.secure}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <Undo2 className="w-4 h-4 text-text-primary shrink-0" />
                <span>{home.trust.exchange}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <Truck className="w-4 h-4 text-text-primary shrink-0" />
                <span>Estimated delivery: 3–5 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
