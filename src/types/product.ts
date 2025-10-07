export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  popularity: number;
  featured?: boolean;
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 
  | 'popularity' 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating' 
  | 'name';