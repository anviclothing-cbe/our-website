import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ColorSwatch, SizeSelector, QuantitySelector } from "@/components/ui/product-choice";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Search, ShoppingBag } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function DesignSystem() {
  const { formatPrice } = useCurrency();
  return (
    <div className="min-h-screen bg-surface text-text-primary selection:bg-surface-accent/30 pb-20">
      {/* Header */}
      <Section spacing="sm" className="border-b border-border-subtle bg-background">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <img src="/anvi_logo.png" alt="ANVI" className="h-16 w-auto object-contain" />
          <div className="space-y-1">
            <h1 className="text-2xl tracking-tight">Phase 02: Design System</h1>
            <p className="font-sans text-text-muted text-sm">
              Editorial Fashion • Boutique Warmth • Modern Ecommerce
            </p>
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section>
        <div className="space-y-12 animate-slide-up">
          <div className="space-y-4 border-b border-border-subtle pb-4">
            <Badge variant="outline">Typography</Badge>
            <h2 className="text-3xl">Elegant & Readable</h2>
            <p className="max-w-2xl text-text-muted leading-relaxed">
              We use Playfair Display for our major editorial moments and headings,
              bringing a sophisticated, feminine feel. Outfit provides a highly readable,
              modern sans-serif for UI, forms, and product details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-xs text-text-muted mb-2 font-sans tracking-widest uppercase">Heading 1 (Display)</p>
                <h1 className="text-display">Curated with care</h1>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2 font-sans tracking-widest uppercase">Heading 2</p>
                <h2 className="text-4xl">A collection of favourites</h2>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2 font-sans tracking-widest uppercase">Heading 3</p>
                <h3 className="text-2xl">Everyday Wear</h3>
              </div>
            </div>

            <div className="space-y-8 bg-surface p-8 rounded-md shadow-sm border border-border-subtle">
              <div>
                <p className="text-xs text-text-muted mb-2 font-sans tracking-widest uppercase">Body Text</p>
                <p className="leading-relaxed">
                  At ANVI, we believe every wardrobe deserves pieces that are beautiful, comfortable,
                  and timeless. Our collections are thoughtfully handpicked to bring you styles that
                  effortlessly become your everyday favourites.
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2 font-sans tracking-widest uppercase">UI Text & Microcopy</p>
                <p className="text-sm font-medium tracking-wide uppercase">Add to Cart — {formatPrice(2499)}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Colors */}
      <Section className="bg-surface-alt/50">
        <div className="space-y-12">
          <div className="space-y-4 border-b border-border-subtle pb-4">
            <Badge variant="outline">Colours</Badge>
            <h2 className="text-3xl">Semantic & Brand Palette</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="space-y-3">
              <div className="h-24 w-full bg-brand-primary rounded-md shadow-sm border border-border-subtle"></div>
              <div>
                <p className="font-medium text-sm">Primary</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-brand-deep rounded-md shadow-sm border border-border-subtle"></div>
              <div>
                <p className="font-medium text-sm">Deep</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-surface-accent rounded-md shadow-sm border border-border-subtle"></div>
              <div>
                <p className="font-medium text-sm">Gold</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-surface rounded-md shadow-sm border border-border-subtle"></div>
              <div>
                <p className="font-medium text-sm">Surface</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-surface-alt rounded-md shadow-sm border border-border-subtle"></div>
              <div>
                <p className="font-medium text-sm">Surface Alt</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-button-primary rounded-md shadow-sm border border-border-subtle"></div>
              <div>
                <p className="font-medium text-sm">Charcoal</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            <div className="space-y-3">
              <div className="h-16 w-full bg-success rounded-md shadow-sm border border-border-subtle"></div>
              <div><p className="font-medium text-sm">Success</p></div>
            </div>
            <div className="space-y-3">
              <div className="h-16 w-full bg-warning rounded-md shadow-sm border border-border-subtle"></div>
              <div><p className="font-medium text-sm">Warning</p></div>
            </div>
            <div className="space-y-3">
              <div className="h-16 w-full bg-error rounded-md shadow-sm border border-border-subtle"></div>
              <div><p className="font-medium text-sm">Error</p></div>
            </div>
            <div className="space-y-3">
              <div className="h-16 w-full bg-info rounded-md shadow-sm border border-border-subtle"></div>
              <div><p className="font-medium text-sm">Info</p></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Forms & Inputs */}
      <Section>
        <div className="space-y-12">
          <div className="space-y-4 border-b border-border-subtle pb-4">
            <Badge variant="outline">Forms</Badge>
            <h2 className="text-3xl">Inputs & Controls</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="hello@anvi.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order Notes</label>
                <Textarea placeholder="Any special requests?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sorting option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Arrivals</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl">Toggles</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm font-medium">Accept terms and conditions</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm font-medium">Subscribe to newsletter</label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-xl">Radio Groups</h3>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <label htmlFor="standard" className="text-sm">Standard Shipping (3-5 days)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <label htmlFor="express" className="text-sm">Express Shipping (1-2 days)</label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl">Product Choices</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Size</label>
                  <div className="flex gap-2">
                    <SizeSelector>XS</SizeSelector>
                    <SizeSelector selected>S</SizeSelector>
                    <SizeSelector>M</SizeSelector>
                    <SizeSelector unavailable>L</SizeSelector>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Colour</label>
                  <div className="flex gap-2">
                    <ColorSwatch colorCode="#7C243A" selected />
                    <ColorSwatch colorCode="#F1E8DC" />
                    <ColorSwatch colorCode="#2F2B2B" unavailable />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <QuantitySelector value={1} onDecrease={() => { }} onIncrease={() => { }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* Buttons & Cards */}
      <Section>
        <div className="space-y-12">
          <div className="space-y-4 border-b border-border-subtle pb-4">
            <Badge variant="outline">Components</Badge>
            <h2 className="text-3xl">Buttons & Cards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-serif text-xl border-b border-border-subtle pb-2">Buttons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="tertiary">Tertiary Button</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="icon"><Search className="h-5 w-5" /></Button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-xl border-b border-border-subtle pb-2">Cards</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>Default card styling with subtle shadow.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Perfect for cart items or product grids.</p>
                </CardContent>
              </Card>

              <Card variant="editorial">
                <CardHeader>
                  <CardTitle>Editorial Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-muted">A borderless variant designed for lookbooks and editorial content.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* Empty States */}
      <Section className="bg-surface-alt/50">
        <div className="space-y-12">
          <div className="space-y-4 border-b border-border-subtle pb-4">
            <Badge variant="outline">States</Badge>
            <h2 className="text-3xl">Empty States</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Empty>
              <EmptyMedia variant="icon">
                <ShoppingBag />
              </EmptyMedia>
              <EmptyTitle>Your bag is empty</EmptyTitle>
              <EmptyDescription>
                Looks like you haven't added anything to your cart yet. Discover our latest collection.
              </EmptyDescription>
              <Button className="mt-4">Continue Shopping</Button>
            </Empty>
          </div>
        </div>
      </Section>
    </div>
  );
}
