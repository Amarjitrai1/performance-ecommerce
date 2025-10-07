import { useState, useMemo, useCallback } from 'react';
import { Product } from '../types';
import { generateProducts } from '../utils/productGenerator';

export const useProducts = (initialCount: number = 5000) => {
  const [products] = useState<Product[]>(() => generateProducts(initialCount));
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    setLoading(true);
    // Simulate loading more products
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);

  const productsByBrand = useMemo(() => {
    return products.reduce((acc, product) => {
      if (!acc[product.brand]) {
        acc[product.brand] = [];
      }
      acc[product.brand].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);

  const featuredProducts = useMemo(() => {
    return products.filter(p => p.featured);
  }, [products]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter(p => p.inStock).length,
      onSale: products.filter(p => p.originalPrice).length,
      avgPrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
      avgRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length
    };
  }, [products]);

  return {
    products,
    productsByCategory,
    productsByBrand,
    featuredProducts,
    stats,
    loading,
    loadMore
  };
};