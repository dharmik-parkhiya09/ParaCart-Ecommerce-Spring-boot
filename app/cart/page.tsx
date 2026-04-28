'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CART_API_URL, DEFAULT_USER_ID } from '@/lib/config';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      setCheckoutError(null);

      const response = await fetch(`${CART_API_URL}/cart/checkout/${DEFAULT_USER_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const order = await response.json();
      console.log('[v0] Order created:', order);

      // Redirect to order confirmation
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error('[v0] Checkout error:', err);
      setCheckoutError(
        err instanceof Error ? err.message : 'Failed to complete checkout'
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted mb-8">
              Add some products to get started
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-blue-700 transition-smooth"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-6 p-6 border-b border-border last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      📦
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.productName}</h3>
                      <p className="text-muted mb-4">
                        ${item.price.toFixed(2)} per item
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-3 py-1 text-primary hover:bg-secondary"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-l border-r border-border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="px-3 py-1 text-primary hover:bg-secondary"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="ml-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-smooth"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-accent hover:text-blue-700 font-semibold"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary rounded-lg p-6 sticky top-20">
                <h2 className="font-bold text-xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-xl mb-6">
                  <span>Total</span>
                  <span className="text-accent">
                    ${(getTotalPrice() * 1.08).toFixed(2)}
                  </span>
                </div>

                {checkoutError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    {checkoutError}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-smooth"
                >
                  {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <p className="text-xs text-muted text-center mt-4">
                  Secure checkout powered by our payment processor
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
