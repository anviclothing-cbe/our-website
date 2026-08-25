import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingBag, ShieldCheck, Lock, Truck, Undo2 } from "lucide-react";
import { Link } from "wouter";
import { ContextualSupport } from "../shared/ContextualSupport";
import { CartRecommendations } from "./CartRecommendations";
import { cart, emptyStates, buttons, support } from "@/ui/index";
import { useCurrency } from "@/contexts/CurrencyContext";

export function CartDrawer() {
  const { formatPrice } = useCurrency();
  const { 
    cartItems, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    removeFromCart, 
    updateQuantity,
    subtotal,
    discount,
    itemCount 
  } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleMoveToWishlist = (itemId: string, productId: string) => {
    if (!isInWishlist(productId)) {
      toggleWishlist(productId);
    }
    removeFromCart(itemId);
  };

  const FREE_SHIPPING_THRESHOLD = 5000;
  const totalAfterDiscount = subtotal - discount;
  const progressToFreeShipping = Math.min((totalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalAfterDiscount, 0);

  return (
    <Sheet open={isCartDrawerOpen} onOpenChange={setIsCartDrawerOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-surface border-l-border-subtle">
        <SheetHeader className="px-6 py-4 border-b border-border-subtle">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="font-serif text-2xl text-text-primary font-medium">{cart.title} ({itemCount})</SheetTitle>
              {cartItems.length > 0 && (
                <p className="text-sm text-text-muted mt-1">{cart.support}</p>
              )}
            </div>
            <button 
              onClick={() => setIsCartDrawerOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length > 0 && (
            <div className="bg-surface-light/50 px-6 py-3 border-b border-border-subtle">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-medium text-text-muted">
                  {amountToFreeShipping > 0 
                    ? `Add ₹${amountToFreeShipping.toLocaleString("en-IN")} for free shipping!` 
                    : "You've unlocked free shipping!"}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-muted">
                  ₹{FREE_SHIPPING_THRESHOLD}
                </span>
              </div>
              <div className="h-1.5 w-full bg-border-subtle rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${amountToFreeShipping === 0 ? 'bg-success' : 'bg-button-primary-hover'}`}
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-10">
                <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center text-text-muted mb-2">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-text-primary">{emptyStates.cart.title}</h3>
                <p className="text-text-muted mb-6">{emptyStates.cart.support}</p>
                <Button 
                  onClick={() => setIsCartDrawerOpen(false)} 
                  asChild 
                  className="w-full bg-button-primary text-text-on-dark hover:bg-button-primary-hover transition-colors"
                >
                  <Link href="/category/new-arrivals">{emptyStates.cart.cta}</Link>
                </Button>
                <div className="w-full mt-4 text-left">
                  <CartRecommendations />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    {/* Thumbnail */}
                    <Link href={`/product/${item.product.slug}`} onClick={() => setIsCartDrawerOpen(false)}>
                      <a className="shrink-0 w-24 h-32 bg-surface-light rounded-sm overflow-hidden block">
                        <img 
                          src={item.product.images?.[0] || item.product.image} 
                          alt={item.product.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </a>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/product/${item.product.slug}`} onClick={() => setIsCartDrawerOpen(false)}>
                          <a className="font-medium text-text-primary text-sm hover:underline line-clamp-1 pr-4">
                            {item.product.title}
                          </a>
                        </Link>
                      </div>
                      
                      <div className="text-xs text-text-muted space-y-0.5 mb-2">
                        {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                        {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      </div>
                      
                      <div className="flex gap-4 text-xs text-text-muted mb-2">
                        <button 
                          onClick={() => handleMoveToWishlist(item.id, item.product.id)}
                          className="hover:text-text-primary underline transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
                          aria-label={`Move ${item.product.title} to Wishlist`}
                        >
                          Move to Wishlist
                        </button>
                        <span>|</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="hover:text-error underline transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
                          aria-label={`Remove ${item.product.title} from cart`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-border-subtle rounded-sm">
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-text-muted hover:bg-surface-light disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-l-sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-medium text-text-primary">
                            {item.quantity}
                          </span>
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-text-muted hover:bg-surface-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-r-sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-medium text-text-primary text-sm">
                          {formatPrice((item.product.price * item.quantity))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 mt-6 border-t border-border-subtle">
                  <ContextualSupport 
                    title="Need help before checkout?"
                    ctaText="Chat with ANVI"
                    params={{ context: "orderQuestion" }}
                    className="bg-transparent border-none p-0 py-2"
                  />
                </div>

                <CartRecommendations />
              </div>
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 pb-safe border-t border-border-subtle bg-surface shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-text-primary font-medium">Subtotal</span>
              <span className="text-text-primary font-medium text-lg">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-text-muted mb-5">Shipping & taxes calculated at checkout.</p>
            
            <div className="grid gap-3">
              <Button asChild className="w-full text-base h-12 flex items-center justify-center gap-2">
                <Link href="/checkout" onClick={() => setIsCartDrawerOpen(false)}>
                  <Lock className="w-4 h-4 text-white/80" />
                  {buttons.proceedToCheckout}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 bg-transparent border-border-subtle">
                <Link href="/cart" onClick={() => setIsCartDrawerOpen(false)}>
                  VIEW BAG
                </Link>
              </Button>
            </div>
            
            <div className="mt-5 pt-4 border-t border-border-subtle grid grid-cols-3 gap-2 text-center text-[10px] text-text-muted uppercase tracking-wider">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-text-primary" />
                <span>Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-text-primary" />
                <span>Free<br/>Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Undo2 className="w-5 h-5 text-text-primary" />
                <span>Easy<br/>Returns</span>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
