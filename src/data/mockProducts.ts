import { generateProducts } from '../utils/productGenerator';

// Generate a large dataset for performance testing
export const mockProducts = generateProducts(5000);

// Export filtered lists for quick access
export const featuredProducts = mockProducts.filter(p => p.featured);
export const bestsellers = mockProducts
  .filter(p => p.tags.includes('bestseller'))
  .slice(0, 20);
export const newArrivals = mockProducts
  .filter(p => p.tags.includes('new-arrival'))
  .slice(0, 20);
export const onSale = mockProducts
  .filter(p => p.originalPrice)
  .slice(0, 20);