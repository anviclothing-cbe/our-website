import { HelpLayout } from "@/components/help/HelpLayout";
import { SHIPPING_POLICY } from "@/lib/support-data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { routes } from "@/lib/routes";

import { useSEO } from "@/hooks/useSEO"

export default function ShippingPage() {
  useSEO({
    title: "Shipping Policy | ANVI Clothing",
    description: "Learn about ANVI Clothing's shipping methods, delivery times, and domestic and international shipping policies.",
    canonical: "https://anvi.clothing/help/shipping"
  });
  return (
    <HelpLayout 
      title="Shipping & Delivery"
      breadcrumbs={[{ label: "Shipping & Delivery" }]}
    >
      <div className="space-y-12">
        <div className="prose prose-anvi max-w-none">
          <p className="text-xl text-text-muted font-light mb-8">
            {SHIPPING_POLICY.summary}
          </p>

          <div className="space-y-10">
            {SHIPPING_POLICY.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="font-serif text-2xl text-text-primary mb-4">
                  {section.title}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex gap-4">
          <Button variant="outline" asChild>
            <Link href={routes.category("all")}>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </HelpLayout>
  );
}
