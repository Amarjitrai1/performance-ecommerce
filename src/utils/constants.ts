export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Books',
  'Beauty & Personal Care',
  'Automotive',
  'Toys & Games',
  'Health & Wellness',
  'Office Products'
] as const;

export const BRANDS = [
  'TechPro',
  'StyleLine',
  'HomeMax',
  'SportFit',
  'ReadWell',
  'GlowUp',
  'AutoFix',
  'PlayTime',
  'WellLife',
  'WorkEase'
] as const;

export const TAGS = [
  'bestseller',
  'new-arrival',
  'trending',
  'on-sale',
  'eco-friendly',
  'premium',
  'limited-edition'
] as const;

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A-Z' }
] as const;

export const PRICE_RANGES = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 - $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 250, label: '$100 - $250' },
  { min: 250, max: 1000, label: '$250+' }
] as const;

export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300,
  VIRTUAL_SCROLL_THRESHOLD: 100,
  IMAGE_LAZY_LOAD: true,
  INTERSECTION_THRESHOLD: 0.1,
  ITEMS_PER_PAGE: 24
} as const;

export const STORAGE_KEYS = {
  CART: 'ecommerce-cart',
  FILTERS: 'ecommerce-filters',
  VIEW_MODE: 'ecommerce-view-mode'
} as const;