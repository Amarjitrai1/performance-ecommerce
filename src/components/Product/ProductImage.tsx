import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Skeleton } from '../ui/Skeleton';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = React.memo(({ 
  src, 
  alt, 
  className = '' 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <div ref={targetRef} className={`relative ${className}`}>
      {!loaded && !error && (
        <Skeleton className="absolute inset-0" />
      )}
      {hasIntersected && !error && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">No image</span>
        </div>
      )}
    </div>
  );
});
ProductImage.displayName = 'ProductImage';