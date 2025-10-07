import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
      <span className="ml-2 hidden sm:inline">Cart</span>
    </Button>
  );
};
