import { fetchProducts } from "./api";
import { Product } from "./mock-data";
import { useCurrency } from "@/contexts/CurrencyContext";

export interface MerchandisingRules {
  newArrivalDaysThreshold: number;
  bestsellerSalesThreshold: number;
  lowStockThreshold: number;
}

export const RULES: MerchandisingRules = {
  newArrivalDaysThreshold: 30, // Products created in the last 30 days are "New"
  bestsellerSalesThreshold: 100, // Products with > 100 sales are "Bestsellers"
  lowStockThreshold: 5, // Products with <= 5 in inventory show "Low Stock" (simulated)
};

const CURRENT_DATE = new Date("2024-01-20T00:00:00Z");

export function isNewArrival(product: Product): boolean {
  if (!product.createdAt) return false;
  const created = new Date(product.createdAt);
  const diffTime = Math.abs(CURRENT_DATE.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays <= RULES.newArrivalDaysThreshold;
}

export function isBestseller(product: Product): boolean {
  if (product.salesCount === undefined) return false;
  return product.salesCount >= RULES.bestsellerSalesThreshold;
}

export function isLowStock(product: Product): boolean {
  return product.inStock && (product.salesCount !== undefined && product.salesCount > 100); 
}

export interface HomepageSection {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
  actionLink?: string;
  actionText?: string;
}

export interface RecommendationContext {
  recentlyViewedIds: string[];
  categoryViews: Record<string, number>;
}

// Fetch helper to map the API response to the Product interface expected by UI
async function fetchAllProductsForMerchandising(): Promise<Product[]> {
  try {
    const data = await fetchProducts({ limit: 100 });
    return data.products.map((p: any) => ({
      ...p,
      id: p._id || p.id,
      title: p.title || p.name,
      image: p.image || (p.images && p.images[0]) || 'https://placehold.co/400x600/f8f9fa/333333?text=Product',
      hoverImage: p.hoverImage || (p.images && p.images[1]),
      href: p.href || `/product/${p.slug || p._id}`
    }));
  } catch (err) {
    console.error("Failed to fetch products for merchandising", err);
    return [];
  }
}

export async function getHomepageSections(context: RecommendationContext): Promise<HomepageSection[]> {
  const sections: HomepageSection[] = [];
  const ALL_PRODUCTS = await fetchAllProductsForMerchandising();

  if (context.recentlyViewedIds.length > 0) {
    const recentProducts = context.recentlyViewedIds
      .map(id => ALL_PRODUCTS.find(p => p.id === id || (p as any).slug === id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 4);
    
    if (recentProducts.length > 0) {
      sections.push({
        id: "recently-viewed",
        title: "Recently Viewed",
        products: recentProducts,
      });
    }
  }

  const topCategory = Object.entries(context.categoryViews)
    .sort((a, b) => b[1] - a[1])[0];
  
  if (topCategory && topCategory[1] > 2) {
    const catId = topCategory[0];
    const catProducts = ALL_PRODUCTS.filter(p => p.category === catId && !context.recentlyViewedIds.includes(p.id)).slice(0, 4);
    if (catProducts.length > 0) {
      sections.push({
        id: "picked-for-you",
        title: "Picked For You",
        subtitle: `Because you viewed ${catId}`,
        products: catProducts,
        actionLink: `/collections/${catId}`,
        actionText: `Explore more ${catId}`
      });
    }
  }

  return sections;
}

export async function getCoreSection(sectionId: string): Promise<HomepageSection | null> {
  const ALL_PRODUCTS = await fetchAllProductsForMerchandising();
  
  if (sectionId === "the-anvi-edit") {
    const anviEdit = ALL_PRODUCTS.filter(p => p.collection?.includes("the-anvi-edit")).slice(0, 4);
    if (anviEdit.length > 0) {
      return {
        id: "the-anvi-edit",
        title: "The ANVI Edit",
        subtitle: "Our latest handpicked favourites.",
        products: anviEdit,
        actionLink: "/collections/the-anvi-edit",
        actionText: "Shop the Edit"
      };
    }
  }

  if (sectionId === "new-arrivals") {
    const newArrivals = ALL_PRODUCTS.filter(isNewArrival).slice(0, 4);
    if (newArrivals.length > 0) {
      return {
        id: "new-arrivals",
        title: "New Arrivals",
        subtitle: "Freshly added to the ANVI collection.",
        products: newArrivals,
        actionLink: "/collections/new-arrivals",
        actionText: "Shop New"
      };
    }
  }

  if (sectionId === "nivethas-picks") {
    const nivethasPicks = ALL_PRODUCTS.filter(p => p.collection?.includes("nivethas-picks")).slice(0, 4);
    if (nivethasPicks.length > 0) {
      return {
        id: "nivethas-picks",
        title: "Nivetha's Picks",
        subtitle: "Personally chosen favourites from the latest collection.",
        products: nivethasPicks,
        actionLink: "/collections/nivethas-picks",
        actionText: "Shop Her Picks"
      };
    }
  }

  return null;
}

export async function getRelatedProducts(
  currentProductId: string, 
  context: RecommendationContext,
  limit: number = 4
): Promise<{ title: string, products: Product[], reason?: string }[]> {
  
  const ALL_PRODUCTS = await fetchAllProductsForMerchandising();
  const product = ALL_PRODUCTS.find(p => p.id === currentProductId || (p as any).slug === currentProductId);
  if (!product) return [];

  const results = [];

  // 1. Complete the Look / Same Collection
  if (product.collection && product.collection.length > 0) {
    const collectionProducts = ALL_PRODUCTS.filter(p => 
      p.id !== currentProductId && 
      p.collection?.some(c => product.collection?.includes(c))
    ).slice(0, limit);
    
    if (collectionProducts.length > 0) {
      results.push({
        title: "Complete the Look",
        products: collectionProducts,
        reason: "From the same collection"
      });
    }
  }

  // 2. Similar Products (Same Category)
  const similarProducts = ALL_PRODUCTS.filter(p => 
    p.id !== currentProductId && 
    p.category === product.category
  ).slice(0, limit);

  if (similarProducts.length > 0) {
    results.push({
      title: "Similar Styles",
      products: similarProducts
    });
  }

  // 3. Recently Viewed
  const recentProducts = context.recentlyViewedIds
    .filter(id => id !== currentProductId)
    .map(id => ALL_PRODUCTS.find(p => p.id === id || (p as any).slug === id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, limit);

  if (recentProducts.length > 0) {
    results.push({
      title: "Recently Viewed",
      products: recentProducts
    });
  }

  return results.slice(0, 2);
}

export async function getCartRecommendations(
  cartProductIds: string[],
  context: RecommendationContext
): Promise<Product[]> {
  const ALL_PRODUCTS = await fetchAllProductsForMerchandising();

  if (cartProductIds.length === 0) {
    if (context.recentlyViewedIds.length > 0) {
      return context.recentlyViewedIds
        .map(id => ALL_PRODUCTS.find(p => p.id === id || (p as any).slug === id))
        .filter((p): p is Product => p !== undefined)
        .slice(0, 4);
    }
    return ALL_PRODUCTS.filter(p => p.collection?.includes("the-anvi-edit")).slice(0, 4);
  }

  const cartProducts = cartProductIds
    .map(id => ALL_PRODUCTS.find(p => p.id === id || (p as any).slug === id))
    .filter((p): p is Product => p !== undefined);

  const collectionsInCart = new Set(cartProducts.flatMap(p => p.collection || []));
  
  const recommendations = ALL_PRODUCTS.filter(p => {
    if (cartProductIds.includes(p.id) || cartProductIds.includes((p as any).slug)) return false;
    if (!p.inStock) return false;
    if (p.collection?.some(c => collectionsInCart.has(c))) return true;
    return false;
  }).slice(0, 4);

  if (recommendations.length < 4) {
    const bestsellers = ALL_PRODUCTS.filter(isBestseller)
      .filter(p => !cartProductIds.includes(p.id) && !recommendations.find(r => r.id === p.id));
    recommendations.push(...bestsellers.slice(0, 4 - recommendations.length));
  }

  return recommendations;
}

export const ACTIVE_PROMOTION = {
  isActive: true,
  campaignName: "Festive Edit Launch",
  bannerText: "Free shipping on all domestic orders over {formatPrice(5000)}",
  link: "/collections/festive-edit"
};
