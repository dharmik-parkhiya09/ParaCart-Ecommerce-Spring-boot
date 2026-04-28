'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
              P
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">ParaCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-primary hover:text-accent transition-smooth">
              Products
            </Link>
            <Link href="/about" className="text-primary hover:text-accent transition-smooth">
              About
            </Link>
            <Link href="/contact" className="text-primary hover:text-accent transition-smooth">
              Contact
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative text-primary hover:text-accent transition-smooth">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border">
            <Link
              href="/products"
              className="block py-2 text-primary hover:text-accent"
            >
              Products
            </Link>
            <Link href="/about" className="block py-2 text-primary hover:text-accent">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-primary hover:text-accent">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
