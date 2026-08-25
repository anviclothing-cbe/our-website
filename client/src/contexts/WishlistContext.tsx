import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { Product } from "@/lib/mock-data"
import { fetchWishlistApi, addToWishlistApi, removeFromWishlistApi } from "@/lib/api"
import { useAuth } from "./AuthContext"

interface WishlistContextType {
  wishlistItems: string[]
  wishlistProducts: Product[]
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  const syncWishlist = useCallback(async () => {
    try {
      const data = await fetchWishlistApi()
      // Backend returns { products: [ { id, title, price, image, slug } ] }
      if (data.products) {
        setWishlistProducts(data.products)
        setWishlistItems(data.products.map((p: any) => p.id || p._id))
      }
    } catch (err) {
      // Fallback for offline / guests
      const storedWishlist = localStorage.getItem("anvi_wishlist")
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist))
      }
    }
  }, [])

  // Sync wishlist on mount or user change
  useEffect(() => {
    syncWishlist()
  }, [syncWishlist, user])

  // Sync to local storage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem("anvi_wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, user])

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId)
  }

  const toggleWishlist = async (productId: string) => {
    const exists = isInWishlist(productId)
    
    // Optimistic update for items (IDs only)
    setWishlistItems(prev => 
      exists ? prev.filter(id => id !== productId) : [...prev, productId]
    )

    try {
      if (exists) {
        await removeFromWishlistApi(productId)
        toast({ title: "Removed from your wishlist." })
        await syncWishlist() // Refresh populated products
      } else {
        await addToWishlistApi(productId)
        toast({ title: "Saved to your wishlist." })
        await syncWishlist() // Refresh populated products
      }
    } catch (err) {
      toast({ 
        title: exists ? "Removed from your wishlist." : "Saved to your wishlist.",
        description: "(Offline Mode)"
      })
    }
  }

  const removeFromWishlist = async (productId: string) => {
    // Optimistic update
    setWishlistItems(prev => prev.filter(id => id !== productId))
    setWishlistProducts(prev => prev.filter(p => p.id !== productId))
    
    try {
      await removeFromWishlistApi(productId)
      toast({ title: "Removed from your wishlist." })
    } catch (err) {
      toast({ title: "Removed from your wishlist.", description: "(Offline Mode)" })
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistProducts, isInWishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
