'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products?page=0&size=8`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.content || []);
      } catch (err) {
        console.error('[v0] Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        // Mock data for demo
        setProducts([
          {
            id: 1,
            name: 'Premium Laptop',
            description: 'High-performance laptop for professionals',
            price: 999.99,
          },
          {
            id: 2,
            name: 'Wireless Headphones',
            description: 'Premium noise-cancelling headphones',
            price: 299.99,
          },
          {
            id: 3,
            name: 'Smartphone Pro',
            description: 'Latest smartphone with advanced features',
            price: 899.99,
          },
          {
            id: 4,
            name: 'Smartwatch',
            description: 'Feature-rich smartwatch for fitness tracking',
            price: 399.99,
          },
          {
            id: 5,
            name: 'Tablet Pro',
            description: '12-inch display with powerful processor',
            price: 649.99,
          },
          {
            id: 6,
            name: 'USB-C Hub',
            description: 'Multi-port USB hub for connectivity',
            price: 79.99,
          },
          {
            id: 7,
            name: 'Mechanical Keyboard',
            description: 'Professional gaming keyboard',
            price: 179.99,
          },
          {
            id: 8,
            name: '4K Webcam',
            description: 'Crystal clear 4K video recording',
            price: 149.99,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Featured Products</h2>
          <Link
            href="/products"
            className="text-accent hover:text-blue-700 font-semibold transition-smooth"
          >
            View All →
          </Link>
        </div>

        {error && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-8">
            Note: {error}. Showing sample products.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
