import { HelpLayout } from "@/components/help/HelpLayout";
import { ANVI_STORE } from "@/lib/store-data";

import { useSEO } from "@/hooks/useSEO";

export default function PrivacyPage() {
  useSEO({
    title: "Privacy Policy | ANVI Clothing",
    description: "Read the Privacy Policy of ANVI Clothing to understand how we collect, use, and protect your data.",
    canonical: "https://anvi.clothing/privacy"
  });

  return (
    <HelpLayout 
      title="Privacy Policy"
      breadcrumbs={[{ label: "Privacy Policy" }]}
    >
      <div className="space-y-12">
        <div className="prose prose-anvi max-w-none text-text-muted leading-relaxed">
          <p>
            Welcome to {ANVI_STORE.name}'s Privacy Policy. We respect your privacy and are committed to protecting your personal data. This policy outlines how we handle your information when you visit our website.
          </p>
          
          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact us for support. This includes your name, email address, phone number, shipping and billing address.
          </p>

          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process your orders, communicate with you about your purchases, provide customer support, and send you marketing communications (if you have opted in).
          </p>

          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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
