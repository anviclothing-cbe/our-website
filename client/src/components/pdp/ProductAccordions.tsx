import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Product } from "@/lib/mock-data"
import { useCurrency } from "@/contexts/CurrencyContext";

interface ProductAccordionsProps {
  product: Product
}

export function ProductAccordions({ product }: ProductAccordionsProps) {
  const { formatPrice } = useCurrency();
  return (
    <div className="w-full mt-12 border-t border-border-subtle pt-4">
      <Accordion type="single" collapsible className="w-full">
        {product.description && (
          <AccordionItem value="description">
            <AccordionTrigger className="text-base tracking-wider uppercase">Description</AccordionTrigger>
            <AccordionContent className="text-text-secondary leading-relaxed">
              {product.description}
            </AccordionContent>
          </AccordionItem>
        )}
        
        {product.fabric || product.care ? (
          <AccordionItem value="fabric-care">
            <AccordionTrigger className="text-base tracking-wider uppercase">Fabric & Care</AccordionTrigger>
            <AccordionContent className="text-text-secondary leading-relaxed space-y-4">
              {product.fabric && (
                <p>
                  <strong>Fabric:</strong> {product.fabric}
                </p>
              )}
              {product.care && (
                <p>
                  <strong>Care:</strong> {product.care}
                </p>
              )}
              {(!product.fabric && !product.care) && (
                <p>
                  Handwoven or delicate fabrics need extra care. We recommend dry cleaning or gentle hand washing in cold water.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ) : (
          <AccordionItem value="fabric-care">
            <AccordionTrigger className="text-base tracking-wider uppercase">Fabric & Care</AccordionTrigger>
            <AccordionContent className="text-text-secondary leading-relaxed space-y-4">
              <p>
                Handwoven or delicate fabrics need extra care. We recommend dry cleaning or gentle hand washing in cold water.
              </p>
            </AccordionContent>
          </AccordionItem>
        )}

        {product.fit && (
          <AccordionItem value="fit">
            <AccordionTrigger className="text-base tracking-wider uppercase">Fit & Size</AccordionTrigger>
            <AccordionContent className="text-text-secondary leading-relaxed">
              {product.fit}
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="shipping">
          <AccordionTrigger className="text-base tracking-wider uppercase">Shipping & Delivery</AccordionTrigger>
          <AccordionContent className="text-text-secondary leading-relaxed">
            <p>
              Orders are usually dispatched within 2-3 working days. Delivery times vary based on your location. {product.deliveryEstimate && `Estimated delivery: ${product.deliveryEstimate}.`}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="returns">
          <AccordionTrigger className="text-base tracking-wider uppercase">Returns & Exchanges</AccordionTrigger>
          <AccordionContent className="text-text-secondary leading-relaxed">
            <p>
              Not quite right? We offer easy exchanges or store credit within 7 days of delivery. The piece must be unworn and in its original condition.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
