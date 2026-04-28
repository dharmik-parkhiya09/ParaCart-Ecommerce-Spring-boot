export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: number;
  userId?: string;
  items: CartItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

const PRODUCT_SERVICE_URL = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:8081';
const ORDER_SERVICE_URL = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL || 'http://localhost:8082';
const CART_SERVICE_URL = process.env.NEXT_PUBLIC_CART_SERVICE_URL || 'http://localhost:8080';

// Product Service APIs
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/api/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/api/products/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// Order Service APIs
export async function createOrder(items: CartItem[]): Promise<Order | null> {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function getOrderById(id: number): Promise<Order | null> {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function getUserOrders(): Promise<Order[]> {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders/user`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function updateOrderStatus(orderId: number, status: string): Promise<Order | null> {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to update order');
    return await response.json();
  } catch (error) {
    console.error('Error updating order:', error);
    return null;
  }
}
