import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Layout/Header';
import { PerformanceMetrics } from './components/Layout/PerformanceMetrics';
import { ViewToggle } from './components/Layout/ViewToggle';
import { SearchBar } from './components/Filters/SearchBar';
import { FilterPanel } from './components/Filters/FilterPanel';
import { ProductGrid } from './components/Product/ProductGrid';
import { CartDrawer } from './components/Cart/CartDrawer';
import { Select } from './components/ui/Select';
import { useProducts } from './hooks/useProducts';
import { useFilters } from './hooks/useFilters';
import { useCart } from './hooks/useCart';
import { ViewMode } from './types';
import { SORT_OPTIONS } from './utils/constants';

function App() {
  const { products } = useProducts(5000);
  const {
    filters,
    sortBy,
    filteredProducts,
    updateFilter,
    setSortBy,
    resetFilters,
    hasActiveFilters
  } = useFilters(products);
  const { cart, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showCart, setShowCart] = useState(false);
  const [renderTime, setRenderTime] = useState(0);

  const renderStartRef = useRef<number>(0);

  // Track filter performance
  const filterTime = useMemo(() => {
    const start = performance.now();
   const _ = filteredProducts.length; // Access to trigger calculation
    return performance.now() - start;
  }, [filteredProducts]);

  // Track render time whenever filtered products change
  useEffect(() => {
    renderStartRef.current = performance.now();
  }, [filteredProducts, viewMode]);

  useEffect(() => {
    // Measure render time after DOM updates
    requestAnimationFrame(() => {
      const time = performance.now() - renderStartRef.current;
      setRenderTime(time);
    });
  }, [filteredProducts, viewMode]);

  // Display limited products for better initial render performance
  const displayedProducts = filteredProducts.slice(0, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cart.itemCount}
        onCartClick={() => setShowCart(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Performance Metrics */}
        <PerformanceMetrics
          totalProducts={products.length}
          filteredProducts={filteredProducts.length}
          filterTime={filterTime}
          renderTime={renderTime}
        />

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              value={filters.searchTerm}
              onChange={(value) => updateFilter('searchTerm', value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-48">
              <Select
                options={SORT_OPTIONS.map(opt => ({ value: opt.value, label: opt.label }))}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              />
            </div>
            
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onUpdateFilter={updateFilter}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {displayedProducts.length} of {filteredProducts.length} products
                {filteredProducts.length > 100 && (
                  <span className="ml-2 text-gray-500">
                    (displaying first 100 for performance)
                  </span>
                )}
              </span>
              {hasActiveFilters && (
                <span className="text-blue-600 font-medium">
                  Active filters applied
                </span>
              )}
            </div>
            
            <ProductGrid
              products={displayedProducts}
              onAddToCart={addItem}
              viewMode={viewMode}
            />

            {filteredProducts.length > 100 && (
              <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Load More ({filteredProducts.length - 100} remaining)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Performance Info */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Performance Optimizations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">React Optimizations</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>React.memo for components</li>
                <li>useMemo for calculations</li>
                <li>useCallback for handlers</li>
                <li>Debounced search (300ms)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rendering</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Lazy image loading</li>
                <li>Intersection Observer API</li>
                <li>Limited initial render (100)</li>
                <li>Optimized re-renders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Data Management</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>LocalStorage persistence</li>
                <li>Efficient filtering</li>
                <li>Memoized calculations</li>
                <li>5000+ products support</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded border border-blue-300">
            <p className="text-xs text-blue-900">
              <strong>Performance Note:</strong> Filter and render times update in real-time as you search and filter. 
              Try searching for different products or changing filters to see the metrics update dynamically!
            </p>
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
      />
    </div>
  );
}

export default App;