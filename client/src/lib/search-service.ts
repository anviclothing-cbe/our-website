import { Product } from "./mock-data"
import { fetchProducts, fetchCategories } from "./api"
import { COLLECTIONS } from "./mock-data"

export type SearchResult = {
  categories: Array<{ id: string; title: string }>
  collections: Array<{ id: string; title: string }>
  products: Product[]
}

const SYNONYMS: Record<string, string[]> = {
  saree: ["sari", "sarees", "saris"],
  sari: ["saree", "sarees", "saris"],
  salwar: ["salwar set", "salwar suit", "salwars"],
  "co-ord": ["co-ord set", "coord", "coords", "co ord", "co ords"],
  coord: ["co-ord set", "co-ord", "coords", "co ord", "co ords"],
  kids: ["kidswear", "children", "little ones", "boys", "girls"],
  office: ["workwear", "formal", "office wear"],
  festive: ["festival", "wedding", "party"],
  new: ["new arrival", "new arrivals", "latest"],
}

export function expandQuery(query: string): string[] {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return []

  const terms = normalized.split(/\s+/)
  const expanded = new Set<string>()

  terms.forEach(term => {
    expanded.add(term)
    if (SYNONYMS[term]) {
      SYNONYMS[term].forEach(syn => expanded.add(syn))
    }
  })

  // Check if the entire query is a key in synonyms
  if (SYNONYMS[normalized]) {
    SYNONYMS[normalized].forEach(syn => expanded.add(syn))
  }

  return Array.from(expanded)
}

export async function performSearch(query: string): Promise<SearchResult> {
  const terms = expandQuery(query)
  if (terms.length === 0) {
    return { categories: [], collections: [], products: [] }
  }

  try {
    // We can fetch live products that match the search term
    const { products } = await fetchProducts({ search: query, limit: 4 })
    
    // Fetch live categories
    const categories = await fetchCategories()

    // 1. Match Categories (from live DB)
    const matchedCategories = categories
      .filter((cat: any) => 
        terms.some(term => cat.name.toLowerCase().includes(term) || cat.slug.toLowerCase().includes(term))
      )
      .map((cat: any) => ({ id: cat.slug, title: cat.name }))

    // 2. Match Collections (from static list for now)
    const matchedCollections = Object.values(COLLECTIONS).filter(col => 
      terms.some(term => col.title.toLowerCase().includes(term) || col.id.toLowerCase().includes(term))
    )

    // Map DB products to frontend Product interface
    const matchedProducts = products.map((p: any) => ({
      ...p,
      id: p._id || p.id,
      title: p.title || p.name,
      image: p.image || (p.images && p.images[0]) || 'https://placehold.co/400x600/f8f9fa/333333?text=Product',
      hoverImage: p.hoverImage || (p.images && p.images[1]),
      href: p.href || `/product/${p.slug || p._id}`
    }))

    return {
      categories: matchedCategories,
      collections: matchedCollections,
      products: matchedProducts
    }
  } catch (error) {
    console.error("Search failed:", error)
    return { categories: [], collections: [], products: [] }
  }
}
