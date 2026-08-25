import React from "react";
import { generateWhatsAppLink, WhatsAppParams } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppButton";

interface ContextualSupportProps {
  title: string;
  description?: string;
  ctaText?: string;
  params: WhatsAppParams;
  className?: string;
}

export function ContextualSupport({
  title,
  description,
  ctaText = "Chat with ANVI",
  params,
  className = ""
}: ContextualSupportProps) {
  const url = generateWhatsAppLink(params);

  return (
    <div className={`bg-surface-light rounded-sm p-5 md:p-6 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      <div className="flex-grow">
        <h3 className="font-serif text-lg text-text-primary mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-text-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-button-primary text-text-on-dark text-sm font-medium tracking-wide uppercase hover:bg-button-primary-hover active:bg-button-primary-active active:text-text-on-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border-strong whitespace-nowrap"
        >
          <WhatsAppIcon className="w-4 h-4 mr-2" />
          {ctaText}
        </a>
      </div>
    </div>
  );
}
