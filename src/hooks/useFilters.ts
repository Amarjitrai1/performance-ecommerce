import { useState, useMemo, useCallback } from 'react';
import { Product, FilterState, SortOption } from '../types';
import { useDebounce } from './useDebounce';
import { applyFilters, sortProducts } from '../utils/filterUtils';
import { PERFORMANCE_CONFIG } from '../utils/constants';

const initialFilters: FilterState = {
  searchTerm: '',
  category: 'all',
  brand: 'all',
  priceRange: [0, 1000],
  minRating: 0,
  inStockOnly: false,
  tags: []
};

export const useFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(
    filters.searchTerm,
    PERFORMANCE_CONFIG.DEBOUNCE_DELAY
  );

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    const filtersWithDebouncedSearch = {
      ...filters,
      searchTerm: debouncedSearchTerm
    };
    
    const filtered = applyFilters(products, filtersWithDebouncedSearch);
    return sortProducts(filtered, sortBy);
  }, [products, filters, debouncedSearchTerm, sortBy]);

  // Update individual filter
  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSortBy('popularity');
  }, []);

  // Toggle tag
  const toggleTag = useCallback((tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  }, []);

  return {
    filters,
    sortBy,
    filteredProducts,
    updateFilter,
    setSortBy,
    resetFilters,
    toggleTag,
    hasActiveFilters: filters.searchTerm !== '' || 
                     filters.category !== 'all' ||
                     filters.brand !== 'all' ||
                     filters.minRating > 0 ||
                     filters.inStockOnly ||
                     filters.tags.length > 0
  };
};