import { Product, FilterState } from '../types';

export const applyFilters = (
  products: Product[],
  filters: FilterState
): Product[] => {
  return products.filter(product => {
    // Search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Category
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // Brand
    if (filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }

    // Price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    // Rating
    if (product.rating < filters.minRating) {
      return false;
    }

    // In stock
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    // Tags
    if (filters.tags.length > 0) {
      const hasAllTags = filters.tags.every(tag => product.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    return true;
  });
};

export const sortProducts = (
  products: Product[],
  sortBy: string
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'popularity':
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
};