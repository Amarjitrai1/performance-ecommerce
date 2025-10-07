import React from 'react';
import { CATEGORIES } from '../../utils/constants';

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selected,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <div className="space-y-1">
        <button
          onClick={() => onChange('all')}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            selected === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selected === category
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};