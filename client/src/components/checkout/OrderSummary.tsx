import { useCart } from "@/contexts/CartContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tag } from "lucide-react";
import { checkout as checkoutCopy } from "@/ui/index";
import { useCurrency } from "@/contexts/CurrencyContext";

export function OrderSummary({ mobileCollapse = false }: { mobileCollapse?: boolean }) {
  const { formatPrice } = useCurrency();
  const { cartItems, subtotal, shipping, discount, total, coupon } = useCart();

  const content = (
    <div className="space-y-6">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative">
              <div className="w-16 h-20 sm:w-16 sm:h-20 bg-surface-light rounded-sm overflow-hidden border border-border-subtle">
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
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary line-clamp-2 pr-4">{item.product.title}</h4>
              <div className="text-xs text-text-muted mt-1">
                {item.selectedColor && <span>{item.selectedColor}</span>}
                {item.selectedColor && item.selectedSize && <span> / </span>}
                {item.selectedSize && <span>{item.selectedSize}</span>}
              </div>
            </div>
            
            <div className="text-sm font-medium text-text-primary text-right">
              {formatPrice((item.product.price * item.quantity))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border-subtle pt-4 space-y-3 text-sm">
        <div className="flex justify-between text-text-muted">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center text-success font-medium bg-success-bg/50 p-2 rounded-sm -mx-2">
            <span className="flex items-center gap-1">
              Total Savings {coupon && <span className="inline-flex items-center gap-1 bg-success-bg px-1.5 py-0.5 rounded text-[10px] text-success"><Tag className="w-2.5 h-2.5"/> {coupon}</span>}
            </span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-text-muted">
          <span>Estimated Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
        </div>
      </div>

      <div className="border-t border-border-subtle pt-4">
        <div className="flex justify-between items-end">
          <span className="text-base font-medium text-text-primary">Total</span>
          <div className="text-right">
            <span className="text-xs text-text-muted block mb-0.5">INR</span>
            <span className="text-xl font-medium text-text-primary">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (mobileCollapse) {
    return (
      <div className="bg-surface-light/30 border-y border-border-subtle lg:hidden mb-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="summary" className="border-b-0 px-4 sm:px-6">
            <AccordionTrigger className="hover:no-underline py-4 text-text-primary text-sm">
              <div className="flex justify-between w-full pr-4 items-center">
                <span>{checkoutCopy.sections.orderSummary}</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              {content}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <div className="hidden lg:block bg-surface-light/30 rounded-sm p-8 sticky top-24 border border-border-subtle">
      <h2 className="font-serif text-xl text-text-primary mb-6">{checkoutCopy.sections.orderSummary}</h2>
      {content}
    </div>
  );
}
