import useSWR from 'swr';
import { productApi, cartApi, orderApi } from './api';

const fetcher = async (url: string) => {
  const response = await productApi.get(url);
  return response.data;
};

// Products Hooks
export function useProducts() {
  const { data, error, isLoading } = useSWR('/api/products', fetcher);
  return {
    products: data?.products || [],
    isLoading,
    isError: !!error,
    error,
  };
}

export function useProductById(productId: string | null) {
  const { data, error, isLoading } = useSWR(
    productId ? `/api/products/${productId}` : null,
    fetcher
  );
  return {
    product: data,
    isLoading,
    isError: !!error,
    error,
  };
}

export function useProductsByCategory(category: string) {
  const { data, error, isLoading } = useSWR(
    `/api/products/category/${category}`,
    fetcher
  );
  return {
    products: data?.products || [],
    isLoading,
    isError: !!error,
    error,
  };
}

// Orders Hooks
export async function createOrder(orderData: any) {
  try {
    const response = await orderApi.post('/api/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
}

export async function getOrders() {
  try {
    const response = await orderApi.get('/api/orders');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
}

export async function getOrderById(orderId: string) {
  try {
    const response = await orderApi.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order:', error);
    throw error;
  }
}

// Search hook
export function useSearch(query: string) {
  const { data, error, isLoading } = useSWR(
    query ? `/api/products/search?q=${query}` : null,
    fetcher
  );
  return {
    results: data?.products || [],
    isLoading,
    isError: !!error,
    error,
  };
}
