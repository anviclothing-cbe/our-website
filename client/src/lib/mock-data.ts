import { ProductCardProps } from "@/components/shared/ProductCard"

export interface Product extends ProductCardProps {
  slug: string
  category: string
  collection?: string[]
  sizes: string[]
  colors: string[]
  occasion: string[]
  inStock: boolean
  createdAt: string
  salesCount: number
  
  // PDP specific fields
  images?: string[] // Gallery images
  description?: string
  fabric?: string
  care?: string
  fit?: string
  deliveryEstimate?: string
}

export const CATEGORIES = {
  "women": {
    id: "women",
    title: "Women",
    description: "Styles you'll reach for again and again.",
  },
  "sarees": {
    id: "sarees",
    title: "Sarees",
    description: "Beautiful drapes for every kind of occasion.",
    parent: "women"
  },
  "kidswear": {
    id: "kidswear",
    title: "Kidswear",
    description: "Comfortable styles for little ones."
  },
  "salwars": {
    id: "salwars",
    title: "Salwars",
    description: "Easy, beautiful styles for everyday wear.",
    parent: "women"
  },
  "coord-sets": {
    id: "coord-sets",
    title: "Co-ord Sets",
    description: "Matching sets for a perfectly coordinated, modern look.",
    parent: "women"
  },
  "3-piece-sets": {
    id: "3-piece-sets",
    title: "3-Piece Sets",
    description: "Complete 3-piece ensembles for a polished and graceful appearance.",
    parent: "women"
  }
}

export const DISCOVER = {
  "everyday": {
    id: "everyday",
    title: "Everyday",
    description: "Comfortable, effortless styles for your daily wardrobe.",
  },
  "office": {
    id: "office",
    title: "Office",
    description: "Polished, comfortable pieces for your workday.",
  },
  "festive": {
    id: "festive",
    title: "Festive",
    description: "Special styles meant for celebrations and gatherings.",
    editorial: true,
  },
  "premium": {
    id: "premium",
    title: "Premium",
    description: "Exquisite pieces crafted with premium materials and intricate details.",
    editorial: true,
  }
}

export const COLLECTIONS = {
  "new-arrivals": {
    id: "new-arrivals",
    title: "New Arrivals",
    description: "Freshly added to the ANVI collection.",
  },
  "the-anvi-edit": {
    id: "the-anvi-edit",
    title: "The ANVI Edit",
    description: "Our latest picks, chosen to bring something special to your wardrobe.",
  },
  "nivethas-picks": {
    id: "nivethas-picks",
    title: "Nivetha's Picks",
    description: "Styles chosen by Nivetha, for you.",
    editorial: true,
  },
  "festive-edit": {
    id: "festive-edit",
    title: "Festive Edit",
    description: "Special styles meant for celebrations and gatherings.",
    editorial: true,
  },
  "bestsellers": {
    id: "bestsellers",
    title: "Bestsellers",
    description: "Our most loved and sought-after pieces.",
  },
  "everyday-edit": {
    id: "everyday-edit",
    title: "Everyday Edit",
    description: "Comfortable, effortless styles for your daily wardrobe.",
  },
  "office-edit": {
    id: "office-edit",
    title: "Office Edit",
    description: "Polished, comfortable pieces for your workday.",
  }
}

// Generate some dummy products for robust PLP testing
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "ivory-silk-blend-saree",
    title: "Ivory Silk Blend Saree",
    price: 6500,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    href: "/product/ivory-silk-blend-saree",
    badge: "Bestseller",
    category: "sarees",
    collection: ["the-anvi-edit", "festive-edit"],
    sizes: ["FS"],
    colors: ["Ivory", "White"],
    occasion: ["Festive", "Occasion"],
    inStock: true,
    createdAt: "2024-01-10T00:00:00Z",
    salesCount: 150,
    
    // PDP Fields
    images: [
      "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop", // placeholder
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop", // placeholder
    ],
    description: "An elegant ivory saree spun from a luxurious silk blend, perfect for festive occasions. Features subtle zari work and a delicate border.",
    fabric: "Silk Blend (60% Silk, 40% Cotton). Lining: 100% Cotton.",
    care: "Dry clean only. Do not bleach. Iron on low heat.",
    fit: "Free size (Length: 5.5 meters, Blouse piece: 0.8 meters).",
    deliveryEstimate: "3-5 business days"
  },
  {
    id: "p2",
    slug: "linen-co-ord-set",
    title: "Linen Co-ord Set",
    price: 4200,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
    href: "/product/linen-coord-set",
    badge: "Sale",
    category: "women",
    collection: ["the-anvi-edit"],
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Brown"],
    occasion: ["Everyday", "Office"],
    inStock: true,
    createdAt: "2024-02-15T00:00:00Z",
    salesCount: 300
  },
  {
    id: "p3",
    slug: "floral-cotton-dress",
    title: "Floral Cotton Dress",
    price: 2800,
    image: "https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=800&auto=format&fit=crop",
    href: "/product/floral-cotton-dress",
    category: "kidswear",
    sizes: ["2-3Y", "4-5Y"],
    colors: ["Pink", "Multi"],
    occasion: ["Everyday"],
    inStock: true,
    createdAt: "2024-03-01T00:00:00Z",
    salesCount: 45
  },
  {
    id: "p4",
    slug: "classic-kurta-set",
    title: "Classic Kurta Set",
    price: 5400,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop",
    href: "/product/classic-kurta-set",
    category: "women",
    collection: ["nivethas-picks"],
    sizes: ["M", "L", "XL"],
    colors: ["Green"],
    occasion: ["Office", "Everyday"],
    inStock: true,
    createdAt: "2024-01-20T00:00:00Z",
    salesCount: 120
  },
  {
    id: "p5",
    slug: "midnight-blue-silk-saree",
    title: "Midnight Blue Silk Saree",
    price: 8500,
    image: "https://images.unsplash.com/photo-1621086884024-db0ed2bd1343?q=80&w=800&auto=format&fit=crop",
    href: "/product/midnight-blue-saree",
    badge: "New",
    category: "sarees",
    collection: ["new-arrivals", "festive-edit", "nivethas-picks"],
    sizes: ["FS"],
    colors: ["Blue"],
    occasion: ["Festive", "Premium"],
    inStock: true,
    createdAt: "2024-08-10T00:00:00Z",
    salesCount: 10
  },
  {
    id: "p6",
    slug: "printed-muslin-set",
    title: "Printed Muslin Set",
    price: 3600,
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop",
    href: "/product/printed-muslin-set",
    badge: "New",
    category: "women",
    collection: ["new-arrivals"],
    sizes: ["S", "M"],
    colors: ["Yellow", "Orange"],
    occasion: ["Everyday"],
    inStock: true,
    createdAt: "2024-08-12T00:00:00Z",
    salesCount: 25
  },
  {
    id: "p7",
    slug: "kids-festive-lehenga",
    title: "Kids Festive Lehenga",
    price: 4500,
    image: "https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=800&auto=format&fit=crop",
    href: "/product/kids-festive-lehenga",
    badge: "Sold out",
    category: "kidswear",
    collection: ["new-arrivals", "festive-edit"],
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    colors: ["Red", "Gold"],
    occasion: ["Festive"],
    inStock: false, // out of stock for testing
    createdAt: "2024-08-05T00:00:00Z",
    salesCount: 50
  },
  {
    id: "p8",
    slug: "embroidered-tunic",
    title: "Embroidered Tunic",
    price: 2900,
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop",
    href: "/product/embroidered-tunic",
    badge: "New",
    category: "women",
    collection: ["new-arrivals", "the-anvi-edit"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White"],
    occasion: ["Everyday", "Office"],
    inStock: true,
    createdAt: "2024-08-11T00:00:00Z",
    salesCount: 15
  },
  {
    id: "p9",
    slug: "handloom-cotton-saree",
    title: "Handloom Cotton Saree",
    price: 4800,
    image: "https://images.unsplash.com/photo-1621086884024-db0ed2bd1343?q=80&w=800&auto=format&fit=crop",
    href: "/product/handloom-cotton-saree",
    category: "sarees",
    collection: ["the-anvi-edit"],
    sizes: ["FS"],
    colors: ["Red", "Maroon"],
    occasion: ["Everyday", "Office"],
    inStock: true,
    createdAt: "2023-10-11T00:00:00Z",
    salesCount: 220
  },
  {
    id: "p10",
    slug: "minimalist-linen-trousers",
    title: "Minimalist Linen Trousers",
    price: 2400,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
    href: "/product/minimalist-linen-trousers",
    category: "women",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Black"],
    occasion: ["Office"],
    inStock: true,
    createdAt: "2023-11-20T00:00:00Z",
    salesCount: 400
  },
]

// --- PHASE 10: ACCOUNT & WISHLIST MOCK DATA ---

export interface Address {
  id: string
  label: string // e.g., "Home", "Work"
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
}

export interface OrderItem {
  productId: string
  productName: string
  image: string
  price: number
  quantity: number
  variant?: string // e.g., "Size: M, Color: Beige"
}

export interface Order {
  id: string
  date: string
  status: "Processing" | "Shipped" | "Out for delivery" | "Delivered" | "Cancelled"
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  shippingAddress: Address
  paymentMethod: string
  trackingUrl?: string
}

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr1",
    label: "Home",
    name: "Nivetha Reddy",
    phone: "+91 98765 43210",
    addressLine1: "Flat 4B, Serenity Apartments",
    addressLine2: "Indiranagar 1st Stage",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr2",
    label: "Work",
    name: "Nivetha Reddy",
    phone: "+91 98765 43210",
    addressLine1: "Tech Park, Tower C",
    addressLine2: "Outer Ring Road, Bellandur",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    country: "India",
    isDefault: false,
  }
]

export const MOCK_USER: User = {
  id: "usr123",
  name: "Nivetha Reddy",
  email: "nivetha@example.com",
  phone: "+91 98765 43210",
  addresses: MOCK_ADDRESSES,
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ANV10284",
    date: "2026-08-12T10:30:00Z",
    status: "Delivered",
    subtotal: 4200,
    shipping: 0,
    total: 4200,
    shippingAddress: MOCK_ADDRESSES[0],
    paymentMethod: "Credit Card ending in 4242",
    trackingUrl: "https://track.anvi.com/ANV10284",
    items: [
      {
        productId: "p2",
        productName: "Linen Co-ord Set",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
        price: 4200,
        quantity: 1,
        variant: "Size: M, Color: Beige"
      }
    ]
  },
  {
    id: "ANV10395",
    date: "2026-08-14T09:15:00Z",
    status: "Processing",
    subtotal: 6500,
    shipping: 0,
    total: 6500,
    shippingAddress: MOCK_ADDRESSES[0],
    paymentMethod: "UPI",
    items: [
      {
        productId: "p1",
        productName: "Ivory Silk Blend Saree",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
        price: 6500,
        quantity: 1,
        variant: "Size: FS, Color: Ivory"
      }
    ]
  }
]
