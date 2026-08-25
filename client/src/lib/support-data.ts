import { useCurrency } from "@/contexts/CurrencyContext";
export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const HELP_CATEGORIES = [
  {
    id: "shipping",
    title: "Shipping & Delivery",
    description: "Everything about getting your ANVI order.",
    icon: "Truck",
    route: "helpShipping"
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    description: "What happens if something isn't right.",
    icon: "Undo2",
    route: "helpReturns"
  },
  {
    id: "size-guide",
    title: "Size & Fit",
    description: "Find the right size with confidence.",
    icon: "Ruler",
    route: "helpSizeGuide"
  },
  {
    id: "payments",
    title: "Payments",
    description: "Learn about available payment options.",
    icon: "CreditCard",
    route: "helpPayments"
  },
  {
    id: "contact",
    title: "Contact ANVI",
    description: "Reach the team directly.",
    icon: "MessageCircle",
    route: "contact"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Orders",
    question: "Can I change or cancel my order?",
    answer: "We process orders quickly, but if you contact us within 2 hours of placing your order, we will do our best to accommodate changes or cancellations."
  },
  {
    id: "faq-2",
    category: "Orders",
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive an email or SMS with a tracking link."
  },
  {
    id: "faq-3",
    category: "Shipping",
    question: "How long does delivery take?",
    answer: "Delivery usually takes 3-7 business days depending on your location in India."
  },
  {
    id: "faq-4",
    category: "Shipping",
    question: "Do you offer free shipping?",
    answer: "We offer free shipping on all orders over ₹5,000. For orders below that, a standard delivery fee applies."
  },
  {
    id: "faq-5",
    category: "Returns & Exchanges",
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unused items in their original condition with tags attached. Please note that certain sale items or custom orders may not be eligible for returns."
  },
  {
    id: "faq-6",
    category: "Returns & Exchanges",
    question: "How do I initiate a return or exchange?",
    answer: "Please email us at anviclothing2026@gmail.com or send us a WhatsApp message with your order number. We will guide you through the process."
  }
];

export const SHIPPING_POLICY = {
  summary: "We strive to deliver your ANVI pieces as quickly as possible.",
  sections: [
    {
      title: "Dispatch",
      content: "Orders are dispatched within 2-3 working days."
    },
    {
      title: "Delivery Time",
      content: "3-7 business days depending on location."
    },
    {
      title: "Shipping Cost",
      content: "Free shipping on orders over ₹5,000. A flat rate applies for orders below this amount."
    },
    {
      title: "Tracking",
      content: "A tracking link will be sent to your email once the order is shipped."
    }
  ]
};

export const RETURNS_POLICY = {
  summary: "We want you to love what you wear. If something isn't right, we offer an easy return and exchange process.",
  process: [
    "Email us at anviclothing2026@gmail.com with your order number.",
    "We will arrange a reverse pickup if available at your pincode.",
    "Once we receive and inspect the item, refunds are processed within 5-7 working days."
  ],
  sections: [
    {
      title: "Eligibility",
      content: "Items must be unused, unwashed, and have all original tags intact."
    },
    {
      title: "Timeframe",
      content: "Returns or exchanges must be initiated within 7 days of delivery."
    },
    {
      title: "Refunds",
      content: "Once we receive and inspect the item, refunds are processed within 5-7 working days."
    }
  ]
};

export const PAYMENTS_INFO = {
  summary: "Shop securely with multiple convenient payment options.",
  methods: [
    {
      name: "UPI",
      description: "Pay instantly using Google Pay, PhonePe, Paytm, or any BHIM UPI app."
    },
    {
      name: "Credit & Debit Cards",
      description: "We accept Visa, Mastercard, RuPay, and American Express."
    },
    {
      name: "Net Banking",
      description: "Direct bank transfers supported by all major Indian banks."
    },
    {
      name: "Cash on Delivery (COD)",
      description: "Available for select pin codes on orders up to {formatPrice(10000)}. A nominal COD handling fee may apply."
    }
  ],
  securityStatement: "All payments are processed securely through our verified payment gateway partners. We do not store your sensitive card details."
};

export const SIZE_GUIDE_DATA = {
  summary: "Find your perfect fit. Our garments are designed to flatter, but knowing your measurements helps ensure comfort and style.",
  howToMeasure: [
    {
      title: "Bust",
      instruction: "Measure around the fullest part of your bust, keeping the tape horizontal."
    },
    {
      title: "Waist",
      instruction: "Measure around your natural waistline, typically the narrowest part of your torso."
    },
    {
      title: "Hips",
      instruction: "Measure around the fullest part of your hips, keeping the tape horizontal."
    }
  ],
  // Standard chart - reference for ANVI measurements
  chart: {
    headers: ["Size", "Bust (in)", "Waist (in)", "Hips (in)"],
    rows: [
      ["XS", "32", "26", "34"],
      ["S", "34", "28", "36"],
      ["M", "36", "30", "38"],
      ["L", "38", "32", "40"],
      ["XL", "40", "34", "42"],
      ["XXL", "42", "36", "44"]
    ]
  }
};
