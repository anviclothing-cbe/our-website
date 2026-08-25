/**
 * Customer Journey & Conversion Architecture Types
 */

export type IntentLevel = "low" | "medium" | "high";

export type FunnelStage =
  | "VISITOR"
  | "ENGAGED_VISITOR"
  | "PRODUCT_VIEWER"
  | "PRODUCT_EVALUATOR"
  | "ADDED_TO_BAG"
  | "CHECKOUT_INITIATED"
  | "PURCHASED"
  | "RETURNING_CUSTOMER";

export type TrustSignalType =
  | "product"
  | "brand"
  | "transaction"
  | "social";

export type CtaHierarchy = "primary" | "secondary" | "tertiary";

export interface ContextualGuidance {
  id: string;
  type: "size" | "product" | "occasion" | "trust" | "delivery";
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface PageRoleDefinition {
  id: string;
  primaryGoal: string;
  businessGoal: string;
  mainFriction: string[];
  requiredTrustSignals: TrustSignalType[];
  primaryCta: string;
  secondaryActions: string[];
}
