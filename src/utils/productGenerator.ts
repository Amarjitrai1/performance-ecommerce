import { Product } from '../types';
import { CATEGORIES, BRANDS, TAGS } from './constants';

const ADJECTIVES = [
  'Premium', 'Pro', 'Ultra', 'Smart', 'Essential', 'Advanced', 
  'Deluxe', 'Classic', 'Modern', 'Compact', 'Professional', 'Elite'
];

const DESCRIPTORS = [
  'High-quality', 'Durable', 'Ergonomic', 'Lightweight', 'Portable',
  'Versatile', 'Innovative', 'Reliable', 'Stylish', 'Efficient'
];

// Category-specific image mappings using Unsplash
const CATEGORY_IMAGES = {
  'Electronics': 'photo-1498049794561-7780e7231661', // Computer
  'Clothing': 'photo-1523381210434-271e8be1f52b', // Clothing
  'Home & Garden': 'photo-1556228578-0d85b1a4d571', // Home decor
  'Sports & Outdoors': 'photo-1461896836934-ffe607ba8211', // Sports
  'Books': 'photo-1495446815901-a7297e633e8d', // Books
  'Beauty & Personal Care': 'photo-1596462502278-27bfdc403348', // Beauty
  'Automotive': 'photo-1568605117036-5fe5e7bab0b7', // Car
  'Toys & Games': 'photo-1558060370-d644479cb6f7', // Toys
  'Health & Wellness': 'photo-1505751172876-fa1923c5c528', // Health
  'Office Products': 'photo-1484480974693-6ca0a78fb36b', // Office
};

// Generate consistent image URL based on product ID and category
const getProductImage = (productId: string, category: string): string => {
  const imageNumber = parseInt(productId.replace('prod-', ''), 10);
  
  // Category-based color schemes for placeholder images
  const categoryColors = {
    'Electronics': '4A90E2',
    'Clothing': 'E91E63',
    'Home & Garden': '4CAF50',
    'Sports & Outdoors': 'FF9800',
    'Books': '9C27B0',
    'Beauty & Personal Care': 'F06292',
    'Automotive': '607D8B',
    'Toys & Games': 'FFC107',
    'Health & Wellness': '8BC34A',
    'Office Products': '3F51B5'
  };

  const categoryKey = category as keyof typeof categoryColors;
  const color = categoryColors[categoryKey] || '4A90E2';

  // Use Unsplash image if available, otherwise fallback to placeholder
  const unsplashId = CATEGORY_IMAGES[category as keyof typeof CATEGORY_IMAGES] || 'photo-1498049794561-7780e7231661';
  return `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=400&q=80&sig=${imageNumber}&bg=${color}`;
}

const generateProducts = (count: number): Product[] => {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const brand = BRANDS[i % BRANDS.length];
    const adjective = ADJECTIVES[i % ADJECTIVES.length];
    const descriptor = DESCRIPTORS[Math.floor(Math.random() * DESCRIPTORS.length)];
    
    const basePrice = Math.random() * 500 + 10;
    const hasDiscount = Math.random() > 0.7;
    const price = hasDiscount ? basePrice * 0.8 : basePrice;
    
    const rating = 3 + Math.random() * 2;
    const reviewCount = Math.floor(Math.random() * 1000) + 10;
    
    const productId = `prod-${i + 1}`;
    
    // Generate random tags
    const productTags: string[] = [];
    if (Math.random() > 0.7) productTags.push('bestseller');
    if (Math.random() > 0.8) productTags.push('new-arrival');
    if (Math.random() > 0.75) productTags.push('trending');
    if (hasDiscount) productTags.push('on-sale');
    if (Math.random() > 0.85) productTags.push('eco-friendly');
    if (Math.random() > 0.9) productTags.push('premium');
    
    products.push({
      id: productId,
      name: `${adjective} ${category.slice(0, -1)} ${String(i + 1).padStart(3, '0')}`,
      description: `${descriptor} ${category.toLowerCase()} from ${brand}. Perfect for everyday use with exceptional quality and performance.`,
      price: Math.round(price * 100) / 100,
      originalPrice: hasDiscount ? Math.round(basePrice * 100) / 100 : undefined,
      category,
      brand,
      imageUrl: getProductImage(productId, category),
      rating: Math.round(rating * 10) / 10,
      reviewCount,
      inStock: Math.random() > 0.1,
      tags: productTags,
      popularity: Math.random() * 100,
      featured: Math.random() > 0.95
    });
  }
  return products;
};

export { generateProducts };;
