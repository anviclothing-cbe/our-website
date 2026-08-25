import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/contexts/CartContext";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCheckout } from "@/hooks/useCheckout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, ChevronRight, Lock, MapPin, Truck, CreditCard, Banknote, Smartphone } from "lucide-react";
import { checkout as checkoutCopy } from "@/ui/index";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";

export default function CheckoutPage() {
  const { formatPrice } = useCurrency();
  useSEO({ title: "Secure Checkout | ANVI Clothing", noindex: true });
  const { cartItems } = useCart();
  const [, setLocation] = useLocation();
  const checkout = useCheckout();
  
  useEffect(() => {
    if (checkout.step === "success" && checkout.orderNumber) {
      setLocation(`/order-confirmation/${checkout.orderNumber}`);
    }
  }, [checkout.step, checkout.orderNumber, setLocation]);
  
  if (cartItems.length === 0 && checkout.step !== "success") {
    // Redirect empty cart
    setLocation("/cart");
    return null;
  }

  return (
    <div className="flex-1 bg-surface min-h-screen pb-safe">
      {/* Mobile Collapsible Summary */}
      {checkout.step !== "success" && <OrderSummary mobileCollapse={true} />}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {checkout.step !== "success" && (
          <div className="grid lg:grid-cols-12 gap-10 xl:gap-16">
            <div className="lg:col-span-7 xl:col-span-7">
              
              {/* Progress Indicator */}
              <div className="mb-8">
                <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-2">Almost yours.</h1>
                <p className="text-text-muted mb-6">Just a few details and we'll get your order on its way.</p>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                  <button 
                    className={checkout.step === "contact" ? "text-text-primary font-bold" : "text-brand-maroon cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"} 
                    onClick={() => { if(checkout.step !== "contact") checkout.prevStep() }}
                    aria-current={checkout.step === "contact" ? "step" : undefined}
                  >
                    1. Your Details
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                  <button 
                    className={checkout.step === "delivery" ? "text-text-primary font-bold" : (checkout.step === "payment" ? "text-brand-maroon cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" : "text-text-muted")}
                    onClick={() => { if(checkout.step === "payment") checkout.prevStep() }}
                    aria-current={checkout.step === "delivery" ? "step" : undefined}
                    disabled={checkout.step === "contact"}
                  >
                    Delivery
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                  <button 
                    className={checkout.step === "payment" ? "text-text-primary font-bold" : "text-text-muted"}
                    aria-current={checkout.step === "payment" ? "step" : undefined}
                    disabled={checkout.step !== "payment"}
                  >
                    2. Payment
                  </button>
                </div>
              </div>

              {/* Form Areas */}
              {checkout.step === "contact" && <ContactStep checkout={checkout} />}
              {checkout.step === "delivery" && <DeliveryStep checkout={checkout} />}
              {checkout.step === "payment" && <PaymentStep checkout={checkout} />}

            </div>

            {/* Desktop Sticky Summary */}
            <div className="lg:col-span-5 xl:col-span-5">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactStep({ checkout }: { checkout: ReturnType<typeof useCheckout> }) {
  const { contact, updateContact, nextStep } = checkout;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-4">
        <h2 className="font-serif text-2xl text-text-primary">Contact details</h2>
        <span className="text-sm text-text-muted">
          Already have an account? <a href="/account/login" className="text-text-primary hover:underline">Log in</a>
        </span>
      </div>

      {/* Express Checkout */}
      <div className="mb-6 space-y-3">
        <div className="text-center">
          <span className="text-xs text-text-muted uppercase tracking-wider bg-surface px-2 relative z-10">Express Checkout</span>
          <div className="h-px bg-border-subtle -mt-2 mb-3"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="h-12 w-full rounded-md flex items-center justify-center bg-black hover:bg-black/90 transition-colors shadow-sm" aria-label="Apple Pay">
            <svg viewBox="0 0 38 16" width="38" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.92 7.03C16.91 5.09 18.52 4.14 18.6 4.1C17.7 2.78 16.3 2.59 15.82 2.57C14.6 2.45 13.41 3.29 12.78 3.29C12.16 3.29 11.19 2.59 10.16 2.61C8.86 2.62 7.65 3.37 6.99 4.53C5.63 6.89 6.64 10.37 7.97 12.28C8.61 13.2 9.38 14.23 10.4 14.19C11.39 14.15 11.78 13.56 12.97 13.56C14.16 13.56 14.51 14.19 15.54 14.17C16.59 14.15 17.25 13.23 17.89 12.29C18.63 11.21 18.93 10.15 18.95 10.1C18.92 10.08 16.94 9.32 16.92 7.03ZM14.93 1.7C15.48 1.04 15.85 0.12 15.75 -0.8C14.95 -0.74 13.97 -0.23 13.4 0.45C12.89 1.05 12.44 2 12.56 2.9C13.45 2.97 14.37 2.48 14.93 1.7ZM25.29 1.13H27.18V14H25.29V1.13ZM36.03 9.47C36.03 12.63 34.02 14.2 31.51 14.2C29.07 14.2 27.28 12.63 27.28 9.47C27.28 6.32 29.04 4.75 31.45 4.75C34 4.75 36.03 6.33 36.03 9.47ZM34.2 9.47C34.2 7.21 33.15 6.06 31.5 6.06C29.8 6.06 28.98 7.37 28.98 9.47C28.98 11.53 29.89 12.88 31.5 12.88C33.18 12.88 34.2 11.66 34.2 9.47ZM21.9 4.9H25.02V6.26C25.02 6.26 24.32 4.75 22.18 4.75C20 4.75 18.4 6.44 18.4 9.49C18.4 12.61 19.98 14.2 22.06 14.2C24.37 14.2 25 12.72 25 12.72V14H26.83V4.9H25.02V8.92C25.02 8.92 24.49 12.85 22.18 12.85C20.67 12.85 20.14 11.83 20.14 9.47C20.14 7.27 20.67 6.06 22.18 6.06C23.63 6.06 24.58 6.7 24.87 7.74L21.9 4.9Z" />
            </svg>
          </button>
          <button className="h-12 w-full rounded-md flex items-center justify-center bg-background hover:bg-surface border border-border-subtle transition-colors shadow-sm" aria-label="Google Pay">
            <svg viewBox="0 0 40 16" width="40" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.65 8.16c0-.55-.05-1.07-.13-1.58H7.49v2.99h4.01c-.17.96-.72 1.77-1.54 2.33v1.94h2.5c1.46-1.35 2.3-3.34 2.3-5.68z" fill="#4285F4"/>
              <path d="M7.49 15.42c2.01 0 3.7-.67 4.93-1.8l-2.5-1.94c-.67.45-1.53.71-2.43.71-1.87 0-3.45-1.26-4.02-2.95H.87v2C2.08 13.84 4.59 15.42 7.49 15.42z" fill="#34A853"/>
              <path d="M3.47 9.44c-.15-.45-.23-.92-.23-1.42s.08-.97.23-1.42v-2H.87C.32 5.76 0 6.86 0 8.02s.32 2.26.87 3.42l2.6-2z" fill="#FBBC04"/>
              <path d="M7.49 3.33c1.09 0 2.07.38 2.84 1.11l2.13-2.13C11.19 1.11 9.5.42 7.49.42 4.59.42 2.08 2 .87 4.58l2.6 2c.57-1.69 2.15-2.95 4.02-2.95z" fill="#EA4335"/>
              <path d="M21.99 13.62h-1.84V.69h1.84v12.93zM25.75 9.07c0 1.62.48 2.8 1.43 3.52.95.72 2.18 1.08 3.71 1.08 1.54 0 2.76-.38 3.65-1.15.89-.77 1.34-1.78 1.34-3.03 0-1.6-.48-2.77-1.45-3.5-.97-.74-2.2-1.11-3.69-1.11-1.49 0-2.7.35-3.62 1.06-.92.7-1.37 1.74-1.37 3.13zm1.87.11c0-1.07.3-1.89.89-2.46.59-.57 1.37-.85 2.33-.85.98 0 1.77.29 2.37.86.6.57.9 1.4.9 2.47 0 1.05-.3 1.86-.88 2.43-.58.57-1.37.86-2.37.86-1 .01-1.78-.27-2.36-.84-.59-.57-.88-1.4-.88-2.47zM16.59.69h4.86c1.37 0 2.45.31 3.25.93.8.62 1.21 1.51 1.21 2.66 0 1.14-.41 2.02-1.22 2.65-.81.63-1.9.95-3.26.95h-2.99v5.74h-1.85V.69zm1.85 5.75h2.95c.82 0 1.45-.16 1.88-.47.43-.31.65-.77.65-1.37 0-.61-.22-1.07-.66-1.37-.44-.31-1.07-.46-1.89-.46h-2.93v3.67z" fill="#3C4043"/>
            </svg>
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-xs text-text-muted uppercase tracking-wider bg-surface px-2 relative z-10">Or pay with card/cod</span>
          <div className="h-px bg-border-subtle -mt-2 mb-2"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="your@email.com"
            value={contact.email} 
            onChange={e => updateContact({...contact, email: e.target.value})} 
          />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name" 
              placeholder="First and last name"
              value={contact.name} 
              onChange={e => updateContact({...contact, name: e.target.value})} 
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="+91 90000 00000"
              value={contact.phone} 
              onChange={e => updateContact({...contact, phone: e.target.value})} 
            />
          </div>
        </div>
      </div>

      <Button onClick={nextStep} className="w-full h-14 text-base mt-6">
        CONTINUE TO DELIVERY
      </Button>
    </div>
  );
}

function DeliveryStep({ checkout }: { checkout: ReturnType<typeof useCheckout> }) {
  const { formatPrice } = useCurrency();
  const { address, updateAddress, selectedAddressId, setSelectedAddressId, deliveryMethod, setDeliveryMethod, nextStep, prevStep } = checkout;
  const { user, updateProfile } = useAuth();
  
  const savedAddresses = user?.addresses || [];
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveToProfile, setSaveToProfile] = useState(true);

  // If user is not logged in, they must use the form.
  // If user is logged in but has no addresses, show form.
  const showList = !!user && savedAddresses.length > 0 && !isAdding && !editingId;

  const handleSaveAddress = async () => {
    if (!address.line1 || !address.city || !address.state || !address.pincode) {
      return; // Handled by nextStep validation usually, but we need it here if saving explicitly
    }

    if (user && saveToProfile) {
      const newAddr = {
        id: editingId || crypto.randomUUID(),
        fullName: user.name || "Customer",
        street: address.line1 + (address.line2 ? `, ${address.line2}` : ""),
        city: address.city,
        state: address.state,
        zipCode: address.pincode,
        country: "India",
        phone: user.phone || "",
        isDefault: savedAddresses.length === 0
      };

      let newAddresses;
      if (editingId) {
        newAddresses = savedAddresses.map(a => a.id === editingId ? newAddr : a);
      } else {
        newAddresses = [...savedAddresses, newAddr];
      }

      await updateProfile({ addresses: newAddresses });
      setSelectedAddressId(newAddr.id);
      setIsAdding(false);
      setEditingId(null);
    }
  };

  const handleEdit = (id: string) => {
    const addr = savedAddresses.find(a => a.id === id);
    if (addr) {
      updateAddress({
        line1: addr.street,
        line2: "",
        city: addr.city,
        state: addr.state,
        pincode: addr.zipCode,
      });
      setEditingId(id);
    }
  };

  const handleDelete = async (id: string) => {
    if (user) {
      const newAddresses = savedAddresses.filter(a => a.id !== id);
      await updateProfile({ addresses: newAddresses });
      if (selectedAddressId === id) {
        setSelectedAddressId(newAddresses.length > 0 ? newAddresses[0].id : null);
      }
    }
  };

  const handleContinue = async () => {
    // If in form mode and logged in, optionally save first
    if ((isAdding || editingId || (!user && !selectedAddressId)) && user && saveToProfile) {
       await handleSaveAddress();
    }
    nextStep();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Address Selection / Form */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-text-primary">{checkoutCopy.sections.deliveryAddress}</h2>
          {showList && (
            <Button variant="ghost" size="sm" onClick={() => {
              updateAddress({ line1: "", line2: "", city: "", state: "Tamil Nadu", pincode: "" });
              setIsAdding(true);
            }}>
              + Add New Address
            </Button>
          )}
        </div>

        {showList ? (
          <div className="space-y-3">
            <RadioGroup value={selectedAddressId || ""} onValueChange={(val) => setSelectedAddressId(val)}>
              {savedAddresses.map((addr: any) => (
                <div key={addr.id} className={`p-4 border rounded-sm ${selectedAddressId === addr.id ? 'border-border-strong bg-surface-light/30' : 'border-border-subtle'}`}>
                  <div className="flex gap-3">
                    <RadioGroupItem value={addr.id} id={`addr-${addr.id}`} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={`addr-${addr.id}`} className="font-medium cursor-pointer flex items-center gap-2">
                        {addr.fullName} 
                        {addr.isDefault && <span className="text-[10px] uppercase tracking-wider bg-surface px-1.5 py-0.5 rounded-sm border">Default</span>}
                      </Label>
                      <p className="text-sm text-text-muted mt-1 leading-relaxed">
                        {addr.street}<br/>
                        {addr.city}, {addr.state} {addr.zipCode}<br/>
                        {addr.country}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button type="button" onClick={() => handleEdit(addr.id)} className="text-xs font-medium text-brand-maroon hover:underline">Edit</button>
                        <button type="button" onClick={() => handleDelete(addr.id)} className="text-xs font-medium text-text-muted hover:text-error hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="line1">Address Line 1 *</Label>
              <Input 
                id="line1" 
                placeholder="House/Flat No., Building Name, Street"
                value={address.line1} 
                onChange={e => updateAddress({...address, line1: e.target.value})} 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input 
                id="line2" 
                placeholder="Area, Landmark"
                value={address.line2} 
                onChange={e => updateAddress({...address, line2: e.target.value})} 
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city">City *</Label>
                <Input 
                  id="city" 
                  value={address.city} 
                  onChange={e => updateAddress({...address, city: e.target.value})} 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input 
                  id="pincode" 
                  maxLength={6}
                  value={address.pincode} 
                  onChange={e => updateAddress({...address, pincode: e.target.value})} 
                />
                {address.pincode.length === 6 && (
                  <p className="text-xs text-success mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Delivery available to this pincode.
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">State *</Label>
              <select 
                id="state"
                value={address.state}
                onChange={e => updateAddress({...address, state: e.target.value})}
                className="flex h-10 w-full rounded-sm border border-border-subtle bg-background px-3 py-2 text-sm ring-offset-brand-surface file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-strong focus-visible:border-border-strong disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            
            {user && (
              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={saveToProfile} 
                    onChange={e => setSaveToProfile(e.target.checked)}
                    className="rounded-sm border-border-strong text-brand-maroon focus:ring-brand-maroon"
                  />
                  <span className="text-sm font-medium">Save this address to my profile</span>
                </label>
                
                {(isAdding || editingId) && savedAddresses.length > 0 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                  }}>
                    Cancel
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delivery Method */}
      <div>
        <h2 className="font-serif text-2xl text-text-primary mb-4">{checkoutCopy.sections.deliveryMethod}</h2>
        <RadioGroup value={deliveryMethod} onValueChange={(val: any) => setDeliveryMethod(val)} className="gap-3">
          <div className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-colors ${deliveryMethod === "standard" ? "border-border-strong bg-surface-light/30" : "border-border-subtle hover:border-border-subtle"}`} onClick={() => setDeliveryMethod("standard")}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="standard" id="standard" />
              <div>
                <Label htmlFor="standard" className="cursor-pointer font-medium">Standard Delivery</Label>
                <p className="text-xs text-text-muted mt-0.5">Estimated delivery: 3–5 business days</p>
              </div>
            </div>
            <span className="text-sm font-medium">{formatPrice(150)}</span>
          </div>
          
          <div className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-colors ${deliveryMethod === "express" ? "border-border-strong bg-surface-light/30" : "border-border-subtle hover:border-border-subtle"}`} onClick={() => setDeliveryMethod("express")}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="express" id="express" />
              <div>
                <Label htmlFor="express" className="cursor-pointer font-medium">Express Delivery</Label>
                <p className="text-xs text-text-muted mt-0.5">Estimated delivery: 1–2 business days</p>
              </div>
            </div>
            <span className="text-sm font-medium">{formatPrice(300)}</span>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
        <Button variant="outline" onClick={prevStep} className="h-14 sm:w-1/3">
          BACK TO CONTACT
        </Button>
        <Button onClick={handleContinue} className="h-14 sm:w-2/3">
          CONTINUE TO PAYMENT
        </Button>
      </div>
    </div>
  );
}

function PaymentStep({ checkout }: { checkout: ReturnType<typeof useCheckout> }) {
  const { paymentMethod, setPaymentMethod, processPayment, isProcessing, prevStep, contact } = checkout;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Payment Selection */}
      <div>
        <h2 className="font-serif text-2xl text-text-primary mb-1">{checkoutCopy.sections.payment}</h2>
        <p className="text-sm text-text-muted mb-6">Your payment is processed securely through our payment provider.</p>
        
        <div className="border border-border-subtle rounded-sm divide-y divide-border-subtle overflow-hidden">
          
          {/* UPI */}
          <div className={`${paymentMethod === "upi" ? "bg-surface-light/30" : "bg-background"}`}>
            <label className="flex items-center gap-3 p-4 cursor-pointer">
              <input 
                type="radio" 
                name="payment" 
                value="upi" 
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
                className="w-4 h-4 text-text-primary border-border-subtle focus:ring-border-strong"
              />
              <Smartphone className="w-5 h-5 text-text-muted" />
              <span className="font-medium text-text-primary">UPI / Online</span>
            </label>
            {paymentMethod === "upi" && (
              <div className="p-4 pt-0 pl-11">
                <p className="text-sm text-text-muted mb-3">
                  Pay securely using any UPI app (Google Pay, PhonePe, Paytm).
                </p>
                <Input placeholder="Enter UPI ID (optional)" aria-label="Enter UPI ID (optional)" className="bg-background max-w-sm" />
              </div>
            )}
          </div>

          {/* Card */}
          <div className={`${paymentMethod === "card" ? "bg-surface-light/30" : "bg-background"}`}>
            <label className="flex items-center gap-3 p-4 cursor-pointer">
              <input 
                type="radio" 
                name="payment" 
                value="card" 
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="w-4 h-4 text-text-primary border-border-subtle focus:ring-border-strong"
              />
              <CreditCard className="w-5 h-5 text-text-muted" />
              <span className="font-medium text-text-primary">Credit / Debit Card</span>
            </label>
            {paymentMethod === "card" && (
              <div className="p-4 pt-0 pl-11 space-y-3">
                <Input placeholder="Card number" aria-label="Card number" className="bg-background" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Expiration date (MM / YY)" aria-label="Expiration date (MM / YY)" className="bg-background" />
                  <Input placeholder="Security code (CVV)" aria-label="Security code (CVV)" className="bg-background" />
                </div>
                <Input placeholder="Name on card" aria-label="Name on card" className="bg-background" />
              </div>
            )}
          </div>

          {/* COD */}
          <div className={`${paymentMethod === "cod" ? "bg-surface-light/30" : "bg-background"}`}>
            <label className="flex items-center gap-3 p-4 cursor-pointer">
              <input 
                type="radio" 
                name="payment" 
                value="cod" 
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="w-4 h-4 text-text-primary border-border-subtle focus:ring-border-strong"
              />
              <Banknote className="w-5 h-5 text-text-muted" />
              <span className="font-medium text-text-primary">Cash on Delivery (COD)</span>
            </label>
          </div>
          
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
        <Button variant="outline" onClick={prevStep} className="h-14 sm:w-1/3" disabled={isProcessing}>
          BACK TO DELIVERY
        </Button>
        <Button 
          onClick={processPayment} 
          className="h-14 sm:w-2/3 flex items-center justify-center gap-2" 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Preparing your order...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              {checkoutCopy.sections.orderSummary.includes("Review") ? "PLACE ORDER" : "PAY SECURELY"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}


