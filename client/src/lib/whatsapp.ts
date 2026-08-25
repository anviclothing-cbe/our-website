const WHATSAPP_NUMBER = "919442282319";

export type WhatsAppContext = 
  | "generalQuestion"
  | "productQuestion"
  | "sizeQuestion"
  | "availabilityQuestion"
  | "stylingQuestion"
  | "orderQuestion"
  | "storeQuestion";

export interface WhatsAppParams {
  context: WhatsAppContext;
  productName?: string;
  productUrl?: string;
  variant?: string;
  size?: string;
  orderNumber?: string;
}

export function generateWhatsAppLink(params: WhatsAppParams): string {
  let message = "";

  switch (params.context) {
    case "productQuestion":
      message = `Hi ANVI, I'm interested in the "${params.productName}". I have a question about it.`;
      if (params.productUrl) message += `\n\nLink: ${params.productUrl}`;
      break;

    case "sizeQuestion":
      message = `Hi ANVI, I'm interested in the "${params.productName}" and need help choosing my size.`;
      if (params.productUrl) message += `\n\nLink: ${params.productUrl}`;
      break;

    case "availabilityQuestion":
      message = `Hi ANVI, is the ${params.size || params.variant || 'item'} available for "${params.productName}"?`;
      if (params.productUrl) message += `\n\nLink: ${params.productUrl}`;
      break;

    case "stylingQuestion":
      message = `Hi ANVI, I'm interested in "${params.productName}" and would love help choosing accessories or styling options.`;
      if (params.productUrl) message += `\n\nLink: ${params.productUrl}`;
      break;

    case "orderQuestion":
      message = `Hi ANVI, I need some help with my recent order`;
      if (params.orderNumber) {
        message += ` (Order #${params.orderNumber}).`;
      } else {
        message += `.`;
      }
      break;

    case "storeQuestion":
      message = `Hi ANVI, I'm planning to visit your store. Could you share your opening hours and location?`;
      break;

    case "generalQuestion":
    default:
      message = `Hi ANVI, I have a question and need some assistance.`;
      break;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
