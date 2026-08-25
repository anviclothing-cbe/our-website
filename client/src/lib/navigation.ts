import { NavItem } from "@/types/navigation";
import { routes } from "./routes";

/**
 * Main Navigation Architecture for the header and footer.
 */

export const MAIN_NAVIGATION: NavItem[] = [
  {
    title: "Shop",
    href: routes.category("women"),
    children: [
      { title: "Women", href: routes.category("women") },
      { title: "Sarees", href: routes.subCategory("women", "sarees") },
      { title: "Salwars", href: routes.subCategory("women", "salwars") },
      { title: "Co-ord Sets", href: routes.subCategory("women", "coord-sets") },
      { title: "3-Piece Sets", href: routes.subCategory("women", "3-piece-sets") },
      { title: "Kidswear", href: routes.category("kidswear") },
    ]
  },
  {
    title: "Collections",
    href: routes.collection("the-anvi-edit"),
    children: [
      { title: "The ANVI Edit", href: routes.collection("the-anvi-edit") },
      { title: "Nivetha's Picks", href: routes.collection("nivethas-picks") },
      { title: "Bestsellers", href: routes.collection("bestsellers") },
      { title: "Everyday Edit", href: routes.collection("everyday-edit") },
      { title: "Office Edit", href: routes.collection("office-edit") },
      { title: "Festive Edit", href: routes.collection("festive-edit") },
    ]
  },
  {
    title: "Discover",
    href: routes.discover("everyday"),
    children: [
      { title: "Everyday", href: routes.discover("everyday") },
      { title: "Office", href: routes.discover("office") },
      { title: "Festive", href: routes.discover("festive") },
      { title: "Premium", href: routes.discover("premium") },
    ]
  },
  {
    title: "Our Story",
    href: routes.about(),
  },
  {
    title: "Journal",
    href: routes.blog(),
  }
];

export const FOOTER_NAVIGATION = {
  shop: MAIN_NAVIGATION[0].children || [],
  collections: MAIN_NAVIGATION[1].children || [],
  discover: MAIN_NAVIGATION[2].children || [],
  about: [
    { title: "Our Story", href: routes.about() },
    { title: "Journal", href: routes.blog() },
    { title: "Visit ANVI", href: routes.visitStore() },
    { title: "Contact", href: routes.contact() },
  ],
  help: [
    { title: "Delivery & Shipping", href: routes.helpShipping() },
    { title: "Returns & Exchanges", href: routes.helpReturns() },
    { title: "FAQs", href: routes.help() },
    { title: "Contact Us", href: routes.contact() },
  ],
  follow: [
    { title: "Instagram", href: "https://instagram.com/anviclothing" },
    { title: "WhatsApp", href: "https://wa.me/919442282319" },
  ],
  legal: [
    { title: "Privacy Policy", href: routes.privacy() },
    { title: "Terms", href: routes.terms() },
    { title: "Shipping Policy", href: routes.helpShipping() },
    { title: "Exchange Policy", href: routes.helpReturns() },
  ]
};
