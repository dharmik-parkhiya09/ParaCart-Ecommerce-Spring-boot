# ParaCart Frontend

A modern Next.js 16 e-commerce frontend for the ParaCart application, built with TypeScript, Tailwind CSS, and integrated with multiple Spring Boot microservices.

## Features

- **Product Browsing**: Browse, search, filter, and sort products
- **Shopping Cart**: Add/remove items, manage quantities  
- **Checkout**: Multi-step checkout with shipping and payment information
- **Authentication**: User registration, login, password reset
- **User Dashboard**: View orders, manage profile
- **JWT Authentication**: Secure token-based auth with refresh tokens
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Context API for auth and cart state

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Data Fetching**: SWR (Stale-While-Revalidate)
- **UI Icons**: Lucide React

## Prerequisites

Before running the frontend, ensure the following backend services are running:

- **Auth Service**: `http://localhost:8085`
- **Product Service**: `http://localhost:8081`
- **Cart Service**: `http://localhost:8082`
- **Order Service**: `http://localhost:8083`

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Update `.env.local` with your backend service URLs:

```env
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8085
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8081
NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8082
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8083
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   ├── products/                  # Product pages
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── cart/
│   ├── checkout/
│   ├── dashboard/
│   ├── orders/[id]/
│   └── globals.css
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   └── product-card.tsx
├── lib/
│   ├── api.ts                    # Axios instances
│   ├── auth-context.tsx          # Auth provider
│   ├── cart-context.tsx          # Cart provider
│   └── hooks.ts                  # Data fetching hooks
└── package.json
```

## Pages Overview

### Authentication
- `/login` - User login with email/password
- `/register` - New user registration
- `/forgot-password` - Password reset request

### Shopping
- `/` - Home page with featured products
- `/products` - Product listing with search/filter
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart management

### Checkout & Orders
- `/checkout` - Checkout page
- `/orders/[id]` - Order details

### User
- `/dashboard` - User dashboard and order history

## API Integration

### Authentication Flow

1. User logs in/registers
2. Backend returns `access_token` and `refresh_token`
3. Tokens stored in `localStorage`
4. Axios interceptors automatically:
   - Add Authorization header
   - Refresh expired tokens
   - Redirect to login if refresh fails

### Available Hooks

```typescript
// Products
const { products, isLoading } = useProducts();
const { product } = useProductById(id);
const { products } = useProductsByCategory(category);

// Orders
const orders = await getOrders();
const order = await getOrderById(orderId);
const response = await createOrder(orderData);
```

## Context Providers

### AuthProvider
```typescript
const { user, isAuthenticated, login, register, logout, forgotPassword, resetPassword } = useAuth();
```

### CartProvider
```typescript
const { items, addToCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | http://localhost:8085 | Auth service |
| `NEXT_PUBLIC_PRODUCT_SERVICE_URL` | http://localhost:8081 | Product service |
| `NEXT_PUBLIC_CART_SERVICE_URL` | http://localhost:8082 | Cart service |
| `NEXT_PUBLIC_ORDER_SERVICE_URL` | http://localhost:8083 | Order service |

## Building for Production

```bash
npm run build
npm run start
```

## Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Future Integration Points

- OAuth Google login (port 8085)
- JWT refresh token system
- Email notifications (new login, re-login, password reset)
- Payment gateway integration
- Advanced search and filtering
- Product reviews and ratings
- Wishlist functionality

## Troubleshooting

### CORS Errors
Ensure backend services have CORS enabled for http://localhost:3000

### Token Issues  
Check that access_token and refresh_token are being stored in localStorage after login

### API Connection Failed
Verify all backend services are running on their configured ports

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios](https://axios-http.com)
- [SWR](https://swr.vercel.app)
