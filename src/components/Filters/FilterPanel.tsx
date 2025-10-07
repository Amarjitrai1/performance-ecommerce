import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterState } from '../../types';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CATEGORIES, BRANDS, TAGS } from '../../utils/constants';

interface FilterPanelProps {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onUpdateFilter,
  onReset,
  hasActiveFilters
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.map(cat => ({ value: cat, label: cat }))
  ];

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    ...BRANDS.map(brand => ({ value: brand, label: brand }))
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <Select
            label="Category"
            options={categoryOptions}
            value={filters.category}
            onChange={(e) => onUpdateFilter('category', e.target.value)}
          />
        </div>

        {/* Brand Filter */}
        <div>
          <Select
            label="Brand"
            options={brandOptions}
            value={filters.brand}
            onChange={(e) => onUpdateFilter('brand', e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) => onUpdateFilter('priceRange', [0, Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating: {filters.minRating}★
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(e) => onUpdateFilter('minRating', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* In Stock Only */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="inStock"
            checked={filters.inStockOnly}
            onChange={(e) => onUpdateFilter('inStockOnly', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="inStock" className="ml-2 text-sm font-medium text-gray-700">
            In Stock Only
          </label>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  const newTags = filters.tags.includes(tag)
                    ? filters.tags.filter(t => t !== tag)
                    : [...filters.tags, tag];
                  onUpdateFilter('tags', newTags);
                }}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};