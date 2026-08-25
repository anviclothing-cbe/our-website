import { useState } from "react";
import { Mail, MapPin, Phone, Instagram, MessageCircle, Store, Send } from "lucide-react";
import { HelpLayout } from "@/components/help/HelpLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ANVI_STORE } from "@/lib/store-data";

import { useSEO } from "@/hooks/useSEO"

export default function ContactPage() {
  useSEO({
    title: "Contact Us | ANVI Clothing",
    description: "Get in touch with the ANVI Clothing team. We're here to help with your orders, sizing queries, and more.",
    canonical: "https://anvi.clothing/contact"
  });
  const [form, setForm] = useState({ name: "", email: "", message: "", type: "General Enquiry" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Fake API call as per actual implementation bounds
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HelpLayout 
      title="We're here to help."
      breadcrumbs={[{ label: "Contact Us" }]}
    >
      <div className="space-y-12">
        <p className="text-xl text-text-muted font-light">
          Reach out to us if you have any questions about an order, need help with sizing, or want to know more about a specific piece.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-border-subtle">
                  <MapPin size={18} className="text-text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Address</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {ANVI_STORE.addressLine1},<br />
                    {ANVI_STORE.city} - {ANVI_STORE.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-border-subtle">
                  <Phone size={18} className="text-text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Phone & WhatsApp</h3>
                  <p className="text-sm text-text-muted">
                    <a href="tel:+919442282319" className="hover:text-surface-accent transition-colors">+91 94422 82319</a>
                    {" / "}
                    <a href="tel:+918072454583" className="hover:text-surface-accent transition-colors">+91 80724 54583</a>
                    <br />
                    <span className="text-xs text-text-muted/80 mt-1 block">(Available Mon–Sat, 10am–8pm)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-border-subtle">
                  <Mail size={18} className="text-text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Email</h3>
                  <a
                    href="mailto:anviclothing2026@gmail.com"
                    className="text-sm text-text-muted hover:text-surface-accent transition-colors"
                  >
                    anviclothing2026@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-border-subtle">
                  <Instagram size={18} className="text-text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Instagram</h3>
                  <a
                    href="https://www.instagram.com/anvi_by_nivetha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted hover:text-surface-accent transition-colors"
                  >
                    @anvi_by_nivetha
                  </a>
                </div>
              </div>
            </div>

            {/* Store visit card */}
            <div className="rounded-sm p-6 flex items-start gap-4 bg-button-primary text-text-on-dark">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-surface/10">
                <Store size={18} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-surface-accent mb-1">Visit Our Store</h3>
                <p className="text-sm text-text-on-dark/80 leading-relaxed mb-4">
                  Come experience ANVI in person. We'd love to help you find your perfect outfit.
                </p>
                <Button variant="outline" size="sm" className="text-text-on-dark border-brand-surface hover:bg-surface hover:text-text-primary" asChild>
                  <a href={ANVI_STORE.mapUrl} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-surface-light p-6 md:p-8 rounded-sm">
            <h2 className="font-serif text-2xl text-text-primary mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-success-bg">
                  <MessageCircle size={28} className="text-success" />
                </div>
                <h3 className="text-xl font-serif text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-text-muted mb-6">
                  Thank you. We'll be in touch soon.
                </p>
                <Button
                  variant="outline"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "", type: "General Enquiry" }); }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Enquiry Type</Label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Product Question">Product Question</option>
                    <option value="Order Help">Order Help</option>
                    <option value="Size Help">Size Help</option>
                    <option value="Store Question">Store Question</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="resize-none"
                  />
                </div>
                {error && (
                  <div className="p-3 text-sm text-error bg-error-bg border border-error rounded-sm">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" /> 
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </HelpLayout>
  );
}
