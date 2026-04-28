'use client';

import Link from 'next/link';
import { useCartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, loading } = useCartContext();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

        {!cart || cart.items.length === 0 ? (
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
                {cart?.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-6 p-6 border-b border-border last:border-b-0"
                  >
                    {/* Product Image */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        📦
                      </div>
                    )}

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
                            disabled={loading}
                            className="px-3 py-1 text-primary hover:bg-secondary disabled:opacity-50"
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
                            disabled={loading}
                            className="px-3 py-1 text-primary hover:bg-secondary disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          disabled={loading}
                          className="ml-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-smooth disabled:opacity-50"
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
                    <span>${cart?.totalPrice.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Tax</span>
                    <span>${((cart?.totalPrice || 0) * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-xl mb-6">
                  <span>Total</span>
                  <span className="text-accent">
                    ${(((cart?.totalPrice || 0) * 1.08).toFixed(2))}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-gray-800 transition-smooth text-center"
                >
                  Proceed to Checkout
                </Link>

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
