export interface FilterState {
  searchTerm: string;
  category: string;
  brand: string;
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  tags: string[];
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  tags: string[];
}