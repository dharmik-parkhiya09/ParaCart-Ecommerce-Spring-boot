'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import Link from 'next/link';
import { useProducts } from '@/lib/hooks';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { products, isLoading } = useProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to ParaCart
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Discover amazing products at unbeatable prices. Shop with confidence, enjoy fast delivery, and excellent customer service.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Shop Now
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex-1 bg-blue-700/50 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-blue-100">Shop Amazing Products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our curated selection of premium products handpicked just for you.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {products.slice(0, 8).map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    inStock={product.inStock !== false}
                  />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  View All Products
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ParaCart?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Fast Delivery', desc: 'Get your products delivered quickly and safely.' },
              { icon: '💳', title: 'Secure Payment', desc: 'Multiple payment options with SSL encryption.' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day money-back guarantee on all products.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
