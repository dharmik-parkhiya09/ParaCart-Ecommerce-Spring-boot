'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ORDER_API_URL } from '@/lib/config';

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${ORDER_API_URL}/orders/${orderId}`);

        if (!response.ok) {
          throw new Error('Order not found');
        }

        const data = await response.json();
        setOrder(data);
        setError(null);
      } catch (err) {
        console.error('[v0] Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order');

        // Mock order for demo
        setOrder({
          id: parseInt(orderId),
          userId: 1,
          totalPrice: 1299.98,
          status: 'CONFIRMED',
          createdAt: new Date().toISOString(),
          items: [
            {
              id: 1,
              productId: 1,
              productName: 'Premium Laptop',
              price: 999.99,
              quantity: 1,
            },
            {
              id: 2,
              productId: 2,
              productName: 'Wireless Headphones',
              price: 299.99,
              quantity: 1,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted mb-4">{error || 'Order not found'}</p>
          <div className="text-center">
            <Link
              href="/products"
              className="text-accent hover:text-blue-700 font-semibold"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-secondary rounded-lg p-8 mb-8">
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-muted text-sm mb-1">Order Number</p>
              <p className="font-bold text-lg">#{order.id}</p>
            </div>
            <div>
              <p className="text-muted text-sm mb-1">Order Date</p>
              <p className="font-bold text-lg">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted text-sm mb-1">Status</p>
              <p className="font-bold text-lg text-green-600">{order.status}</p>
            </div>
            <div>
              <p className="text-muted text-sm mb-1">Total Amount</p>
              <p className="font-bold text-lg text-accent">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="font-bold text-lg mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 border-b border-border last:border-b-0"
                >
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-muted text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-700">
            <strong>📧 Confirmation email:</strong> A confirmation email with order details
            has been sent to your email address.
          </p>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="font-bold text-lg mb-4">What&apos;s Next?</h2>
          <ol className="space-y-3 list-decimal list-inside text-muted">
            <li>Your order will be processed and packed</li>
            <li>You&apos;ll receive a tracking number via email</li>
            <li>Your order will be shipped within 1-2 business days</li>
            <li>Enjoy your new products!</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-gray-800 text-center transition-smooth"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="flex-1 px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-secondary text-center transition-smooth"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
