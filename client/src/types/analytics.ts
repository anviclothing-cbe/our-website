/**
 * Analytics Tracking Architecture
 * Maps to the core FunnelStages without installing third-party trackers yet.
 */

export type AnalyticsCategory =
  | "discovery"
  | "product"
  | "cart"
  | "checkout"
  | "post_purchase";

export interface BaseEvent {
  category: AnalyticsCategory;
  timestamp: number;
}

export interface ProductViewEvent extends BaseEvent {
  eventName: "PRODUCT_VIEW";
  productId: string;
  categorySlug: string;
}

export interface AddToBagEvent extends BaseEvent {
  eventName: "ADD_TO_BAG";
  productId: string;
  variantId: string;
  price: number;
}

export interface CheckoutInitiatedEvent extends BaseEvent {
  eventName: "CHECKOUT_INITIATED";
  cartTotal: number;
  itemCount: number;
}

export interface PaymentSuccessEvent extends BaseEvent {
  eventName: "PAYMENT_SUCCESS";
  orderId: string;
  orderTotal: number;
}

export type TrackingEvent =
  | ProductViewEvent
  | AddToBagEvent
  | CheckoutInitiatedEvent
  | PaymentSuccessEvent;
