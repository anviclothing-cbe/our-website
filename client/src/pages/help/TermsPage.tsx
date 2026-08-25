import { HelpLayout } from "@/components/help/HelpLayout";
import { ANVI_STORE } from "@/lib/store-data";

import { useSEO } from "@/hooks/useSEO";

export default function TermsPage() {
  useSEO({
    title: "Terms of Service | ANVI Clothing",
    description: "Read the Terms of Service for ANVI Clothing.",
    canonical: "https://anvi.clothing/terms"
  });

  return (
    <HelpLayout 
      title="Terms of Service"
      breadcrumbs={[{ label: "Terms of Service" }]}
    >
      <div className="space-y-12">
        <div className="prose prose-anvi max-w-none text-text-muted leading-relaxed">
          <p>
            Welcome to {ANVI_STORE.name}. These Terms of Service outline the rules and regulations for the use of our website and services.
          </p>
          
          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use {ANVI_STORE.name}'s website if you do not accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">2. Products and Services</h2>
          <p>
            All products and services are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice.
          </p>

          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">3. Accuracy of Information</h2>
          <p>
            We make every effort to display as accurately as possible the colors and images of our products. However, we cannot guarantee that your computer monitor's display of any color will be accurate.
          </p>
          
          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            Email: <a href={`mailto:${ANVI_STORE.email}`} className="text-text-primary underline">{ANVI_STORE.email}</a>
            <br />
            Address: {ANVI_STORE.addressLine1}, {ANVI_STORE.city} - {ANVI_STORE.pincode}
          </p>
        </div>
      </div>
    </HelpLayout>
  );
}
