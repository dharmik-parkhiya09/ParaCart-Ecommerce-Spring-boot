'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);

        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('[v0] Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');

        // Mock product for demo
        setProduct({
          id: parseInt(productId),
          name: 'Premium Product',
          description: 'High-quality product with excellent features and durability',
          price: 299.99,
        });
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted mb-4">{error || 'Product not found'}</p>
          <div className="text-center">
            <Link
              href="/products"
              className="text-accent hover:text-blue-700 font-semibold"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="text-accent hover:text-blue-700">
            ← Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-secondary rounded-lg h-96">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-6xl">📦</div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-accent">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-semibold">In Stock</span>
            </div>

            <p className="text-muted text-lg mb-8">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-primary hover:bg-secondary"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-primary hover:bg-secondary"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 px-8 py-3 rounded-lg font-bold text-white transition-smooth ${
                  added
                    ? 'bg-green-500'
                    : 'bg-primary hover:bg-gray-800'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-8">
              <h3 className="font-bold text-lg mb-4">Product Details</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex justify-between">
                  <span>Product ID:</span>
                  <span className="text-primary">{product.id}</span>
                </li>
                <li className="flex justify-between">
                  <span>Availability:</span>
                  <span className="text-green-600 font-semibold">In Stock</span>
                </li>
                <li className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-primary">Free Shipping</span>
                </li>
                <li className="flex justify-between">
                  <span>Returns:</span>
                  <span className="text-primary">30-day return policy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
