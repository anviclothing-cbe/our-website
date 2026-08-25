import { Link } from "wouter";
import { Truck, Undo2, Ruler, CreditCard, MessageCircle, ChevronRight } from "lucide-react";
import { HelpLayout } from "@/components/help/HelpLayout";
import { HELP_CATEGORIES, FAQS } from "@/lib/support-data";
import { routes } from "@/lib/routes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Simple mapping for icons since we stored strings in support-data
const IconMap: Record<string, React.ElementType> = {
  Truck,
  Undo2,
  Ruler,
  CreditCard,
  MessageCircle,
};

import { useSEO } from "@/hooks/useSEO"

export default function HelpCenterPage() {
  useSEO({
    title: "Help Center & FAQs | ANVI Clothing",
    description: "Find answers to frequently asked questions about shipping, returns, sizing, and payments at ANVI Clothing.",
    canonical: "https://anvi.clothing/help"
  });
  return (
    <HelpLayout title="How can we help?">
      <div className="space-y-16">
        
        {/* Intro */}
        <div className="text-center md:text-left">
          <p className="text-xl text-text-muted font-light">
            Find answers about shopping, sizing, shipping, exchanges and more.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HELP_CATEGORIES.map((category) => {
            const Icon = IconMap[category.icon];
            // @ts-ignore
            const path = routes[category.route]();
            
            return (
              <Link 
                key={category.id} 
                href={path}
                className="group flex items-start p-6 bg-surface-light rounded-sm border border-border-subtle hover:border-border-subtle transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-border-subtle flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-surface-accent/10 transition-colors">
                  <Icon className="w-5 h-5 text-text-primary group-hover:text-surface-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-text-primary mb-1 flex items-center">
                    {category.title}
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-surface-accent" />
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured FAQs */}
        <div className="bg-surface-light/50 p-6 md:p-8 rounded-sm">
          <h2 className="font-serif text-2xl text-text-primary mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.slice(0, 5).map((faq, index) => (
              <AccordionItem key={faq.id} value={`item-${index}`} className="border-border-subtle">
                <AccordionTrigger className="text-text-primary hover:no-underline hover:text-text-muted text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </HelpLayout>
  );
}
