// API Configuration
// Update these URLs based on your backend services running

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
export const CART_API_URL = process.env.NEXT_PUBLIC_CART_API_URL || 'http://localhost:8082';
export const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:8083';

// Default user ID (in production, this would come from authentication)
export const DEFAULT_USER_ID = 1;

// Mock data for demo purposes
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';
