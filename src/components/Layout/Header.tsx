import React from 'react';
import { Package, Zap } from 'lucide-react';
import { CartButton } from '../Cart/CartButton';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Performance Store
              </h1>
              <p className="text-xs text-gray-600">
                Optimized for speed
              </p>
            </div>
          </div>
          
          <CartButton
            itemCount={cartItemCount}
            onClick={onCartClick}
          />
        </div>
      </div>
    </header>
  );
};
