export interface StoreService {
  id: string;
  title: string;
  description: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
  phone: string;
  whatsapp: string;
  openingHours: {
    regular: string; // e.g., "Monday - Saturday: 10:00 AM - 8:30 PM\nSunday: 11:00 AM - 6:00 PM"
    holiday?: string;
  };
  images: {
    hero: string;
    gallery: string[];
  };
  services: StoreService[];
}

// Single Source of Truth for Store Data
export const ANVI_STORE: StoreLocation = {
  id: "anvi-flagship",
  name: "ANVI Boutique",
  addressLine1: "123 Fashion Street",
  addressLine2: "RS Puram",
  city: "Coimbatore",
  state: "Tamil Nadu",
  pincode: "641002",
  country: "India",
  mapUrl: "https://maps.google.com/?q=RS+Puram+Coimbatore",
  phone: "+91 00000 00000",
  whatsapp: "+91 00000 00000", // Update with real number when available
  openingHours: {
    regular: "Monday – Saturday\n10:00 AM – 8:00 PM\n\nSunday\n11:00 AM - 6:00 PM",
  },
  images: {
    hero: "/assets/store_front.png",
    gallery: [
      "/assets/store_front.png",
      "/assets/store_front.png",
      "/assets/store_front.png"
    ]
  },
  services: [
    {
      id: "see-feel-try",
      title: "See it. Feel it. Try it.",
      description: "We believe clothes are meant to be experienced. Feel the fabrics and see how the colors look in person before you decide."
    },
    {
      id: "personal-help",
      title: "Personal help",
      description: "If you're looking for something specific, or just need a second opinion, we're here to help you find it."
    },
    {
      id: "relaxed-experience",
      title: "A relaxed shopping experience",
      description: "Take your time browsing through the collections in a comfortable space. No pressure, just good clothes."
    }
  ]
};
