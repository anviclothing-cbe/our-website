import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { RecommendationContext } from '@/lib/merchandising';

interface PersonalizationContextType extends RecommendationContext {
  trackProductView: (productId: string) => void;
  trackCategoryView: (category: string) => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

const RECENTLY_VIEWED_KEY = 'anvi_recently_viewed';
const CATEGORY_VIEWS_KEY = 'anvi_category_views';
const MAX_RECENT_ITEMS = 10;

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [categoryViews, setCategoryViews] = useState<Record<string, number>>({});

  // Load from local storage on mount
  useEffect(() => {
    try {
      const storedRecent = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (storedRecent) {
        setRecentlyViewedIds(JSON.parse(storedRecent));
      }

      const storedCategories = localStorage.getItem(CATEGORY_VIEWS_KEY);
      if (storedCategories) {
        setCategoryViews(JSON.parse(storedCategories));
      }
    } catch (e) {
      console.error("Failed to load personalization data", e);
    }
  }, []);

  const trackProductView = useCallback((productId: string) => {
    setRecentlyViewedIds(prev => {
      // Remove if already exists to move it to front
      const filtered = prev.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, MAX_RECENT_ITEMS);
      
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore storage errors
      }
      
      return updated;
    });
  }, []);

  const trackCategoryView = useCallback((category: string) => {
    setCategoryViews(prev => {
      const updated = { ...prev };
      updated[category] = (updated[category] || 0) + 1;
      
      try {
        localStorage.setItem(CATEGORY_VIEWS_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore storage errors
      }
      
      return updated;
    });
  }, []);

  return (
    <PersonalizationContext.Provider value={{
      recentlyViewedIds,
      categoryViews,
      trackProductView,
      trackCategoryView
    }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
}
