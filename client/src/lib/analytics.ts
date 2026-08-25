import { TrackingEvent } from "@/types/analytics";

/**
 * ANALYTICS ARCHITECTURE
 * 
 * This module acts as the abstraction layer for all future analytics tracking.
 * Phase 04 defines the schema without installing heavy third-party libraries.
 * Future phases can plug Google Analytics, Meta Pixel, etc. into the `trackEvent` function.
 */

class AnalyticsTracker {
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;

  }

  /**
   * Tracks a strictly typed event in the conversion funnel.
   */
  trackEvent(event: TrackingEvent) {
    if (!this.initialized) {
      this.init();
    }

    // In the future, dispatch to GTM/GA4/Pixel here

  }

  // --- Convenience Helpers for the Funnel ---

  trackProductView(productId: string, categorySlug: string) {
    this.trackEvent({
      category: "product",
      eventName: "PRODUCT_VIEW",
      timestamp: Date.now(),
      productId,
      categorySlug,
    });
  }

  trackAddToBag(productId: string, variantId: string, price: number) {
    this.trackEvent({
      category: "cart",
      eventName: "ADD_TO_BAG",
      timestamp: Date.now(),
      productId,
      variantId,
      price,
    });
  }

  trackCheckoutInitiated(cartTotal: number, itemCount: number) {
    this.trackEvent({
      category: "checkout",
      eventName: "CHECKOUT_INITIATED",
      timestamp: Date.now(),
      cartTotal,
      itemCount,
    });
  }

  trackPaymentSuccess(orderId: string, orderTotal: number) {
    this.trackEvent({
      category: "post_purchase",
      eventName: "PAYMENT_SUCCESS",
      timestamp: Date.now(),
      orderId,
      orderTotal,
    });
  }
}

export const analytics = new AnalyticsTracker();
