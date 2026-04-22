'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { getOrders } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, User, LogOut, Loader, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getOrders();
        setOrders(data.orders || []);
      } catch (err: any) {
        setError('Failed to load orders');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin" size={32} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* User Info Card */}
            <div className="md:col-span-4 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {orders.filter((o) => o.status === 'completed').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {orders.filter((o) => o.status === 'pending').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Spent</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 font-semibold transition ${
                    activeTab === 'orders'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Package className="inline mr-2" size={20} />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 font-semibold transition ${
                    activeTab === 'profile'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="inline mr-2" size={20} />
                  Profile Settings
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'orders' && (
                <div>
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader className="animate-spin" size={32} />
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-semibold text-gray-900">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-blue-600">
                                ${order.totalAmount?.toFixed(2) || '0.00'}
                              </p>
                              <p
                                className={`text-sm font-semibold ${
                                  order.status === 'completed'
                                    ? 'text-green-600'
                                    : order.status === 'pending'
                                    ? 'text-yellow-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Items: {order.items?.length || 0}
                          </p>
                          <Link
                            href={`/orders/${order.id}`}
                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                          >
                            View Details →
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <Link
                        href="/products"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <div className="max-w-md">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Status
                      </label>
                      <div className="px-4 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 font-semibold">
                        Active
                      </div>
                    </div>

                    <Link
                      href="/change-password"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
