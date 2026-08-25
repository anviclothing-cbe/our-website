import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { createMockOrder } from "./useOrder";
import { submitOrder } from "@/lib/api";

export type CheckoutStep = "contact" | "delivery" | "payment" | "success";

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface AddressInfo {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutState {
  step: CheckoutStep;
  contact: ContactInfo;
  address: AddressInfo;
  selectedAddressId: string | null;
  deliveryMethod: "standard" | "express";
  paymentMethod: "upi" | "card" | "cod";
}

export function useCheckout() {
  const { cartItems, clearCart, subtotal, discount, shipping, total, coupon } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [state, setState] = useState<CheckoutState>({
    step: "contact",
    contact: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
    },
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "Tamil Nadu",
      pincode: "",
    },
    selectedAddressId: user?.addresses?.find((a: any) => a.isDefault)?.id || null,
    deliveryMethod: "standard",
    paymentMethod: "upi",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const updateContact = (contact: ContactInfo) => {
    setState((prev) => ({ ...prev, contact }));
  };

  const updateAddress = (address: AddressInfo) => {
    setState((prev) => ({ ...prev, address }));
  };

  const setSelectedAddressId = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedAddressId: id }));
  };

  const setDeliveryMethod = (method: "standard" | "express") => {
    setState((prev) => ({ ...prev, deliveryMethod: method }));
  };

  const setPaymentMethod = (method: "upi" | "card" | "cod") => {
    setState((prev) => ({ ...prev, paymentMethod: method }));
  };

  const nextStep = () => {
    if (state.step === "contact") {
      if (!state.contact.name || !state.contact.email || !state.contact.phone) {
        toast({ title: "Please fill all contact details", variant: "destructive" });
        return;
      }
      setState((prev) => ({ ...prev, step: "delivery" }));
    } else if (state.step === "delivery") {
      if (!state.selectedAddressId) {
        if (!state.address.line1 || !state.address.city || !state.address.state || !state.address.pincode) {
          toast({ title: "Please fill all required address fields", variant: "destructive" });
          return;
        }
        if (!/^\d{6}$/.test(state.address.pincode)) {
          toast({ title: "Invalid Pincode", description: "Please enter a valid 6-digit pincode.", variant: "destructive" });
          return;
        }
      }
      setState((prev) => ({ ...prev, step: "payment" }));
    }
  };

  const prevStep = () => {
    if (state.step === "delivery") {
      setState((prev) => ({ ...prev, step: "contact" }));
    } else if (state.step === "payment") {
      setState((prev) => ({ ...prev, step: "delivery" }));
    }
  };

  const processPayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    // Simulate API call and payment processing
    try {
      // MOCK PAYMENT FAILURE for QA Testing
      if (state.contact.name.toLowerCase() === "fail") {
        throw new Error("Payment declined by bank. Please try another card.");
      }
      const orderData = {
        customerName: state.contact.name,
        customerEmail: state.contact.email,
        customerPhone: state.contact.phone,
        address: state.selectedAddressId && user 
          ? (() => {
              const addr = user.addresses?.find((a: any) => a.id === state.selectedAddressId);
              return addr ? `${addr.street}, ${addr.city}, ${addr.state} - ${addr.zipCode}` : "";
            })()
          : `${state.address.line1}, ${state.address.line2 ? state.address.line2 + ', ' : ''}${state.address.city}, ${state.address.state} - ${state.address.pincode}`,
        paymentMethod: state.paymentMethod,
        notes: `Delivery: ${state.deliveryMethod}`,
        subtotal,
        discount,
        shipping,
        total,
        couponCode: coupon || undefined,
      };

      const result = await submitOrder(orderData);
      
      setOrderNumber(result.orderNumber || result._id);
      setState((prev) => ({ ...prev, step: "success" }));
      clearCart();
    } catch (err: any) {
      console.error("Failed to submit order", err);
      toast({ title: "Failed to place order", description: err.message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    ...state,
    isProcessing,
    orderNumber,
    updateContact,
    updateAddress,
    setSelectedAddressId,
    setDeliveryMethod,
    setPaymentMethod,
    nextStep,
    prevStep,
    processPayment,
  };
}
