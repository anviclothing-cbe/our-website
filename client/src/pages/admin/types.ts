export interface Product {
  _id: string; name: string; slug: string; price: number; originalPrice?: number;
  discount?: number; images: string[]; category: string; fabric?: string;
  sizes: string[]; inStock: boolean; featured: boolean; onSale: boolean;
  tags: string[]; collections?: string[]; occasions?: string[]; description?: string;
}

export interface Category { 
  _id: string; name: string; slug: string; image?: string; description?: string; productCount?: number; 
}

export interface Order {
  _id: string; orderNumber: string; customerName: string; customerEmail: string;
  customerPhone: string; total: number; status: string; createdAt: string;
  items: { name: string; quantity: number; price: number; size: string }[];
}
