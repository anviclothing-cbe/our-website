export const navigation = {
  shop: "Shop",
  collections: "Collections",
  discover: "Discover",
  ourStory: "Our Story",
  utility: {
    search: "Search",
    account: "Account",
    wishlist: "Wishlist",
    bag: "Bag"
  }
};

export const buttons = {
  shopWomen: "SHOP WOMEN",
  shopKidswear: "SHOP KIDSWEAR",
  exploreSarees: "EXPLORE SAREES",
  exploreEdit: "EXPLORE THE ANVI EDIT",
  addToBag: "ADD TO BAG",
  buyAgain: "BUY AGAIN",
  saveToWishlist: "SAVE TO WISHLIST",
  proceedToCheckout: "PROCEED TO CHECKOUT",
  placeOrder: "PLACE ORDER",
  pay: (amount: string | number) => `PAY ₹${amount}`,
  visitAnvi: "VISIT ANVI",
  getDirections: "GET DIRECTIONS",
  chatWithAnvi: "CHAT WITH ANVI",
  askOnWhatsapp: "ASK US ON WHATSAPP",
  apply: "APPLY"
};

export const search = {
  placeholder: "Search for styles...",
  emptySearch: "Search for styles...",
  recent: "Recent searches",
  popular: "Popular searches",
  noResultsTitle: "Nothing matched your search.",
  noResultsSupport: "Try a different word or explore our collections instead.",
  accessible: {
    openSearch: "Open search",
    closeSearch: "Close search"
  }
};

export const product = {
  labels: {
    new: "NEW",
    bestseller: "BESTSELLER",
    sale: "SALE",
    soldOut: "SOLD OUT",
    lowStock: "LOW STOCK",
  },
  details: {
    colour: "Colour",
    size: "Size",
    sizeGuide: "Size Guide",
    availability: "Availability",
    delivery: "Delivery",
    fabricAndCare: "Fabric & Care",
    fitAndSize: "Fit & Size",
    shipping: "Shipping",
    returnsAndExchanges: "Returns & Exchanges",
  },
  sizeHelp: {
    unsure: "Not sure about your size?",
    viewGuide: "View Size Guide",
    needHelp: "Need help choosing? Chat with ANVI",
  },
  availability: {
    inStock: "In stock",
    unavailable: "Currently unavailable",
    lowLeft: (count: number) => `Only ${count} left`,
  },
  delivery: {
    estimated: "Estimated delivery: 3–5 business days",
    checkPincode: "Enter your pincode to check delivery.",
    available: "Delivery available to this pincode.",
    unavailable: "We currently can't deliver to this pincode.",
  }
};

export const collection = {
  filters: {
    title: "Filter",
    active: "Active filters:",
    clearAll: "Clear all",
    sortBy: "Sort by",
    sortOptions: {
      recommended: "Recommended",
      newest: "Newest",
      bestselling: "Bestselling",
      priceAsc: "Price: Low to High",
      priceDesc: "Price: High to Low"
    }
  },
  productsCount: (count: number) => count === 1 ? "1 Product" : `${count} Products`
};

export const cart = {
  title: "Your Bag",
  support: "A few beautiful choices, ready when you are.",
  actions: {
    remove: "Remove",
    moveToWishlist: "Move to Wishlist",
    continueShopping: "Continue Shopping",
    proceedToCheckout: "Proceed to Checkout",
  },
  coupon: {
    collapsed: "Have a coupon?",
    input: "Enter coupon code",
    apply: "APPLY",
    success: "Coupon applied",
    invalid: "This coupon isn't valid for your bag.",
    expired: "This coupon has expired.",
  },
  summary: {
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total"
  }
};

export const checkout = {
  sections: {
    contact: "Contact information",
    deliveryAddress: "1. Your Details",
    deliveryMethod: "Delivery method",
    payment: "2. Payment",
    orderSummary: "3. Review"
  }
};

export const account = {
  title: "My ANVI",
  sections: {
    orders: "Orders",
    wishlist: "Wishlist",
    addresses: "Addresses",
    profile: "Profile",
  },
  signIn: {
    title: "Welcome back",
    support: "Sign in to view your orders, wishlist and saved details.",
  }
};

export const wishlist = {
  title: "My Wishlist",
  support: "Your saved ANVI favourites."
};

export const reviews = {
  title: "Customer Reviews",
  subtitle: "What our customers say",
  beFirst: "Be the first to share your experience.",
  writeReview: "Write a Review",
  verified: "Verified Purchase",
  helpful: "Was this review helpful?",
  socialProof: "Loved by the ANVI family."
};

export const support = {
  help: {
    delivery: "How long does delivery take?",
    exchange: "How can I exchange an item?",
    size: "How do I choose my size?",
    payment: "Which payment methods do you accept?",
    contact: "How can I contact ANVI?",
  },
  whatsapp: {
    size: "Need help choosing a size?",
    question: "Have a question about this piece?",
    order: "Need help with your order?",
    chat: "Chat with ANVI",
    ask: "Ask us on WhatsApp",
    talk: "Talk to us"
  }
};

export const store = {
  experience: "Come visit ANVI.",
  visit: "Visit our store",
  directions: "Get directions",
  planning: "Plan your visit",
  chat: "Chat with ANVI"
};

export const errors = {
  checkout: {
    email: "Enter a valid email address.",
    phone: "Enter a valid phone number.",
    pincode: "Enter a valid pincode.",
    address: "Please complete your delivery address.",
    payment: "Payment didn't go through. Don't worry. Your order hasn't been placed. Please try again or choose another payment method."
  },
  general: {
    bagLoad: "Something went wrong. We couldn't complete your order right now. Please try again in a moment.",
    invalidInput: "Something wasn't entered correctly. Please check the highlighted fields."
  }
};

export const loading = {
  favourites: "Loading your favourites...",
  delivery: "Checking delivery...",
  payment: "Processing your payment...",
  paymentSupport: "Please don't close this window or try again yet.",
  products: "Finding something you'll love...",
  page: "Just a moment...",
  addingToBag: "Adding to your bag...",
  removingFromBag: "Removing from your bag...",
  savingToWishlist: "Saving to your favourites...",
  removingFromWishlist: "Removing from your favourites...",
  updatingCart: "Updating your bag..."
};

export const emptyStates = {
  wishlist: {
    title: "Nothing saved yet.",
    support: "See something you love? Save it here and come back whenever you're ready.",
    cta: "EXPLORE COLLECTIONS"
  },
  orders: {
    title: "No orders yet.",
    support: "Your next favourite might be waiting for you.",
    cta: "START SHOPPING"
  },
  cart: {
    title: "Your bag is waiting.",
    support: "Nothing here yet. Take a look around and find something you'll love.",
    cta: "START SHOPPING"
  },
  search: {
    title: "Nothing matched your search.",
    support: "Try a different word or explore our collections instead."
  }
};

export const orderStatus = {
  confirmed: "We've received your order.",
  processing: "We're carefully getting your order ready.",
  shipped: "Your order is on its way.",
  outForDelivery: "Your order is out for delivery today.",
  delivered: "Your ANVI order has arrived. We hope you love it.",
  delayed: "Your delivery is taking a little longer than expected."
};

export const home = {
  hero: {
    headline: "Made to be loved.",
    headlineItalic: "Made to be worn.",
    support: "Handpicked styles for women and little ones, chosen with care for everyday elegance."
  },
  categories: {
    heading: "Shop by Category",
    support: "Find something you'll love, made for your everyday and special moments.",
    women: {
      title: "Women",
      description: "Styles you'll reach for again and again.",
      cta: "EXPLORE"
    },
    sarees: {
      title: "Sarees",
      description: "Beautiful drapes for every kind of occasion.",
      cta: "EXPLORE"
    },
    salwars: {
      title: "Salwars",
      description: "Easy, beautiful styles for everyday wear.",
      cta: "EXPLORE"
    },
    kidswear: {
      title: "Kidswear",
      description: "Comfortable styles for little ones.",
      cta: "EXPLORE"
    }
  },
  trust: {
    secure: "Secure payments",
    exchange: "Easy exchange",
    quality: "Quality checked",
    help: "Need help? We're here."
  },
  testimonials: {
    eyebrow: "WHAT OUR CUSTOMERS SAY",
    heading: "Loved by women like you.",
    support: "Real words from women who found something they loved at ANVI.",
    quotes: [
      { text: "The quality and comfort are unmatched. ANVI has become my go-to for everyday style.", author: "Verified Customer" },
      { text: "Beautiful curation. I don't have to overthink my wardrobe anymore.", author: "Verified Customer" }
    ]
  },
  footer: {
    support: "Clothing chosen for your everyday and special moments."
  }
};
export const cta = {
  findNext: "Find your next favourite.",
  support: "Thoughtfully chosen pieces for women and little ones.",
  shopCollection: "Shop the Collection"
};
