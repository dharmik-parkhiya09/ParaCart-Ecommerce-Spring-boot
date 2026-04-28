'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-smooth group">
      {/* Product Image */}
      <div className="w-full h-48 bg-secondary flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="text-4xl">📦</div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 text-primary hover:text-accent transition-smooth line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price & Button */}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-accent">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded font-semibold transition-smooth text-white text-sm ${
              added
                ? 'bg-green-500'
                : 'bg-primary hover:bg-gray-800'
            }`}
          >
            {added ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
