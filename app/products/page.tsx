'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { API_BASE_URL } from '@/lib/config';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products?page=${page}&size=12`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        const newProducts = data.content || [];

        if (page === 0) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }

        // Check if there are more products
        setHasMore(!data.last);
        setError(null);
      } catch (err) {
        console.error('[v0] Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');

        // Mock products for demo
        const mockProducts = [
          {
            id: 1,
            name: 'Premium Laptop',
            description: 'High-performance laptop with 16GB RAM',
            price: 999.99,
          },
          {
            id: 2,
            name: 'Wireless Headphones',
            description: 'Active noise cancelling headphones',
            price: 299.99,
          },
          {
            id: 3,
            name: 'Smartphone Pro',
            description: 'Latest smartphone with 5G',
            price: 899.99,
          },
          {
            id: 4,
            name: 'Smartwatch',
            description: 'Fitness tracking smartwatch',
            price: 399.99,
          },
          {
            id: 5,
            name: 'Tablet Pro',
            description: '12-inch tablet with stylus',
            price: 649.99,
          },
          {
            id: 6,
            name: 'USB-C Hub',
            description: '7-port USB hub',
            price: 79.99,
          },
          {
            id: 7,
            name: 'Mechanical Keyboard',
            description: 'RGB gaming keyboard',
            price: 179.99,
          },
          {
            id: 8,
            name: '4K Webcam',
            description: 'Professional webcam',
            price: 149.99,
          },
          {
            id: 9,
            name: 'Portable Monitor',
            description: '15.6 inch portable display',
            price: 299.99,
          },
          {
            id: 10,
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse',
            price: 49.99,
          },
          {
            id: 11,
            name: 'Stand Desk Lamp',
            description: 'LED desk lamp with USB',
            price: 59.99,
          },
          {
            id: 12,
            name: 'Phone Stand',
            description: 'Adjustable phone holder',
            price: 19.99,
          },
        ];

        if (page === 0) {
          setProducts(mockProducts);
        } else {
          setProducts((prev) => [...prev, ...mockProducts]);
        }
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-muted text-lg">
            Browse our collection of high-quality products
          </p>
        </div>

        {/* Sort Controls */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-muted">Showing {sortedProducts.length} products</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-8">
            Note: {error}. Showing sample products.
          </div>
        )}

        {/* Products Grid */}
        {loading && page === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(12)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-smooth"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
