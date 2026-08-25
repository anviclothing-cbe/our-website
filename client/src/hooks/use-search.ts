import { useState, useEffect, useCallback, useRef } from "react"
import { performSearch, SearchResult } from "@/lib/search-service"

export function useSearch() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult>({ categories: [], collections: [], products: [] })
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsSearching(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query)
    }, 250)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setResults({ categories: [], collections: [], products: [] })
      setIsSearching(false)
      return
    }

    const fetchResults = async () => {
      try {
        const res = await performSearch(debouncedQuery)
        setResults(res)
      } finally {
        setIsSearching(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  const clearQuery = useCallback(() => {
    setQuery("")
    setDebouncedQuery("")
    setResults({ categories: [], collections: [], products: [] })
  }, [])

  return {
    query,
    setQuery,
    debouncedQuery,
    isSearching,
    results,
    clearQuery
  }
}
