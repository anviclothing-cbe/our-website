import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: "website" | "product" | "article";
  structuredData?: Record<string, any>;
}

export function useSEO({
  title,
  description,
  canonical,
  noindex = false,
  ogImage,
  ogType = "website",
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", title);
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute("content", title);
    }

    // 2. Description
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", description);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
      
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", description);
    }

    // 3. Robots (noindex)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement("meta");
        metaRobots.setAttribute("name", "robots");
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute("content", "noindex, nofollow");
    } else {
      if (metaRobots) {
        metaRobots.setAttribute("content", "index, follow");
      }
    }

    // 4. Canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonical);
    }

    // 5. Open Graph Image
    if (ogImage) {
      let metaOgImage = document.querySelector('meta[property="og:image"]');
      if (!metaOgImage) {
        metaOgImage = document.createElement("meta");
        metaOgImage.setAttribute("property", "og:image");
        document.head.appendChild(metaOgImage);
      }
      metaOgImage.setAttribute("content", ogImage);
    }

    // 6. Open Graph Type
    const metaOgType = document.querySelector('meta[property="og:type"]');
    if (metaOgType) {
      metaOgType.setAttribute("content", ogType);
    }

    // 7. Structured Data (JSON-LD)
    let scriptTag: HTMLScriptElement | null = null;
    if (structuredData) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("id", "seo-structured-data");
      scriptTag.textContent = JSON.stringify(structuredData);
      
      // Remove any existing dynamic structured data
      const existing = document.getElementById("seo-structured-data");
      if (existing) {
        existing.remove();
      }
      document.head.appendChild(scriptTag);
    }

    return () => {
      // Cleanup structured data on unmount
      if (scriptTag && document.head.contains(scriptTag)) {
        document.head.removeChild(scriptTag);
      }
    };
  }, [title, description, canonical, noindex, ogImage, ogType, structuredData]);
}
