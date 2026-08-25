import { HelpLayout } from "@/components/help/HelpLayout";
import { PAYMENTS_INFO } from "@/lib/support-data";
import { ShieldCheck } from "lucide-react";

import { useSEO } from "@/hooks/useSEO"

export default function PaymentsPage() {
  useSEO({
    title: "Payment Methods | ANVI Clothing",
    description: "Information on accepted payment methods, secure transactions, and billing queries at ANVI Clothing.",
    canonical: "https://anvi.clothing/help/payments"
  });
  return (
    <HelpLayout 
      title="Payments"
      breadcrumbs={[{ label: "Payments" }]}
    >
      <div className="space-y-12">
        <p className="text-xl text-text-muted font-light">
          {PAYMENTS_INFO.summary}
        </p>

        <section className="bg-success-bg/50 p-6 rounded-sm border border-green-100 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800 leading-relaxed">
            {PAYMENTS_INFO.securityStatement}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text-primary mb-6">Supported Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAYMENTS_INFO.methods.map((method, idx) => (
              <div key={idx} className="bg-surface-light p-6 rounded-sm border border-border-subtle">
                <h3 className="font-semibold text-text-primary mb-2">{method.name}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{method.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </HelpLayout>
  );
}
