import { HelpLayout } from "@/components/help/HelpLayout";
import { RETURNS_POLICY } from "@/lib/support-data";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

import { useSEO } from "@/hooks/useSEO"

export default function ReturnsPage() {
  useSEO({
    title: "Returns & Exchanges | ANVI Clothing",
    description: "Understand our easy returns and exchange policy. Read our guidelines for returning items purchased from ANVI Clothing.",
    canonical: "https://anvi.clothing/help/returns"
  });
  return (
    <HelpLayout 
      title="Returns & Exchanges"
      breadcrumbs={[{ label: "Returns & Exchanges" }]}
    >
      <div className="space-y-12">
        <div className="bg-surface-accent/10 p-6 rounded-sm border border-surface-accent/20">
          <p className="font-serif text-xl text-text-primary text-center">
            {RETURNS_POLICY.summary}
          </p>
        </div>

        <section>
          <h2 className="font-serif text-2xl text-text-primary mb-6">How to Exchange</h2>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-gold/50 before:to-transparent">
            {RETURNS_POLICY.process.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-brand-surface bg-surface-accent text-text-on-dark font-semibold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 ml-0 md:ml-auto">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-sm bg-surface-light border border-border-subtle text-text-muted text-sm ml-4 md:ml-0">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-10">
          {RETURNS_POLICY.sections.map((section, idx) => (
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

        <div className="pt-8 border-t border-border-subtle flex gap-4">
          <Button asChild>
            <a href="https://wa.me/919442282319" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start an Exchange
            </a>
          </Button>
        </div>
      </div>
    </HelpLayout>
  );
}
