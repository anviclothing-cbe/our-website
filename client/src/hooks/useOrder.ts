import { useState, useEffect } from "react";
import { fetchOrder } from "@/lib/api";
import { ContactInfo, AddressInfo } from "./useCheckout";
import { CartItem } from "@/contexts/CartContext";

export interface Order {
  id: string;
  customer: ContactInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentStatus: "paid" | "failed" | "pending";
  orderStatus: "confirmed" | "processing" | "shipped" | "delivered";
  shippingAddress: AddressInfo;
  shippingMethod: string;
  paymentMethod: string;
  estimatedDelivery: string;
  createdAt: string;
}

// Mock database using localStorage
const getOrders = (): Record<string, Order> => {
  try {
    const orders = localStorage.getItem("anvi_mock_orders");
    return orders ? JSON.parse(orders) : {};
  } catch (e) {
    return {};
  }
};

const saveOrder = (order: Order) => {
  const orders = getOrders();
  orders[order.id] = order;
  localStorage.setItem("anvi_mock_orders", JSON.stringify(orders));
};

export function createMockOrder(orderData: Omit<Order, "id" | "createdAt" | "estimatedDelivery">): string {
  const id = "ANV" + Math.floor(10000 + Math.random() * 90000);
  
  // Create an estimated delivery date (3-5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (orderData.shippingMethod === "express" ? 2 : 4));
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  
  const estimatedDelivery = `${new Intl.DateTimeFormat('en-IN', options).format(deliveryDate)}`;

  const newOrder: Order = {
    ...orderData,
    id,
    estimatedDelivery,
    createdAt: new Date().toISOString(),
  };

  saveOrder(newOrder);
  return id;
}

export function useOrder(orderId: string | null) {
  const [order, setOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }

    async function loadOrder() {
      try {
        const data = await fetchOrder(orderId!);
        
        // Map backend order to frontend expected format
        const mappedOrder = {
          id: data.orderNumber,
          customer: {
            name: data.customerName,
            email: data.customerEmail,
            phone: data.customerPhone
          },
          items: data.items.map((item: any) => ({
            product: {
              title: item.name,
              price: item.price,
              image: item.image,
              images: [item.image],
            },
            quantity: item.quantity,
            selectedSize: item.size,
          })),
          subtotal: data.subtotal,
          shipping: data.total - data.subtotal,
          total: data.total,
          paymentStatus: "paid", // Simplify for now
          orderStatus: data.status,
          shippingAddress: {
            line1: data.address,
          },
          paymentMethod: data.paymentMethod,
          estimatedDelivery: "3-5 business days", // Default placeholder
        };

        setOrder(mappedOrder);
      } catch (err) {
        setError("We couldn't load your order details right now.");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  return { order, isLoading, error };
}
