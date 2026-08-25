import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/lib/mock-data";
import { getCart, addToCartApi, updateCartItemApi, removeCartItemApi, validateCoupon, getSessionId } from "@/lib/api";

export interface CartItem {
  id: string; // The cart item _id from DB
  product: any; // We'll map the partial product from backend here to avoid breaking UI
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, size: string | null, color: string | null, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  coupon: string | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  discount: number;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 150;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const syncCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getCart();
      const mappedItems: CartItem[] = data.items.map((item: any) => ({
        id: item._id,
        product: {
          id: item.productId,
          title: item.name,
          price: item.price,
          image: item.image,
          slug: item.productId, // Fallback slug if needed
        },
        selectedSize: item.size,
        selectedColor: item.color || null,
        quantity: item.quantity,
      }));
      setCartItems(mappedItems);
    } catch (err) {
      console.error("Failed to sync cart", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const addToCart = async (product: Product, size: string | null, color: string | null, quantity = 1) => {
    try {
      await addToCartApi(product.id || (product as any)._id, quantity, size || "FS", color);
      await syncCart();
      
      toast({
        title: "Added to your bag.",
        description: `${product.title || (product as any).name} has been added to your bag.`,
      });
      setIsCartDrawerOpen(true);
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not add to bag. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      // Optimistic update
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      await removeCartItemApi(itemId);
      await syncCart();
      
      toast({
        title: "Removed from your bag.",
        description: "The item has been removed from your bag.",
      });
    } catch (err) {
      toast({ title: "Error", description: "Failed to remove item.", variant: "destructive" });
      await syncCart();
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    try {
      // Optimistic update
      setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
      await updateCartItemApi(itemId, quantity);
      await syncCart();
    } catch (err) {
      toast({ title: "Error", description: "Failed to update quantity.", variant: "destructive" });
      await syncCart();
    }
  };

  const applyCoupon = async (code: string) => {
    try {
      const sessionId = getSessionId();
      if (!sessionId) return { success: false, message: "No session found" };
      const res = await validateCoupon(code, sessionId);
      setCoupon(res.code);
      setDiscount(res.discount);
      return { success: true, message: res.message };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to apply coupon" };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscount(0);
  };

  const clearCart = () => {
    // Note: The backend API doesn't have an endpoint to clear the whole cart easily, 
    // but in a real app it should. For now, we clear local items.
    setCartItems([]);
    setCoupon(null);
    setDiscount(0);
  };

  // Calculations
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  useEffect(() => {
    async function revalidate() {
      if (!coupon || cartItems.length === 0) {
        setDiscount(0);
        if (cartItems.length === 0 && coupon) setCoupon(null);
        return;
      }
      try {
        const sessionId = getSessionId();
        const res = await validateCoupon(coupon, sessionId);
        setDiscount(res.discount);
      } catch (err: any) {
        setCoupon(null);
        setDiscount(0);
        toast({ 
          title: "Coupon removed", 
          description: err.message || "Your cart no longer meets the coupon requirements", 
          variant: "destructive" 
        });
      }
    }
    revalidate();
  }, [cartItems, coupon]);
  
  const totalAfterDiscount = subtotal - discount;
  
  let shipping = 0;
  if (itemCount > 0 && totalAfterDiscount < FREE_SHIPPING_THRESHOLD) {
    shipping = SHIPPING_COST;
  }

  const total = totalAfterDiscount + shipping;

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        isCartDrawerOpen, 
        setIsCartDrawerOpen, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        itemCount,
        subtotal,
        shipping,
        total,
        coupon,
        applyCoupon,
        removeCoupon,
        discount,
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
