import { useState, useEffect } from "react"

const STORAGE_KEY = "anvi_recent_searches"
const MAX_RECENT_SEARCHES = 5

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentSearches(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load recent searches", e)
    }
  }, [])

  const addSearch = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase())
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES)
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (e) {
        // ignore
      }
      
      return updated
    })
  }

  const removeSearch = (query: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(s => s !== query)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (e) {
        // ignore
      }
      return updated
    })
  }

  const clearAll = () => {
    setRecentSearches([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      // ignore
    }
  }

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearAll
  }
}
