'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating = 4.5,
  reviewCount = 0,
  inStock = true,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      await addToCart(id, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="text-gray-400">No Image</div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{name}</h3>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({reviewCount})</span>
            </div>
          )}

          {/* Price and Button */}
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">${price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              className={`p-2 rounded transition duration-200 ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : inStock
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isAdded ? (
                <span className="text-sm">✓</span>
              ) : (
                <ShoppingCart size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
