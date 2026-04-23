# ParaCart Frontend - Deployment & Integration Guide

## Overview

You now have a complete, production-ready Next.js 16 frontend that integrates with your Spring Boot microservices. The frontend is structured to seamlessly connect with your authentication system on port 8085 and other services.

## What's Been Built

### Core Architecture
- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS 4** for responsive design
- **React Context API** for state management (Auth & Cart)
- **Axios** with JWT interceptors for API communication
- **SWR** for client-side data fetching and caching

### Pages Created

#### Authentication (Ready for Port 8085 Integration)
- `/login` - Email/password login with OAuth Google button placeholder
- `/register` - User registration with validation
- `/forgot-password` - Password reset flow
- All pages ready to integrate with your AuthService on port 8085

#### Shopping Experience
- `/` - Home page with featured products and hero section
- `/products` - Product listing with search, filter, and sort
- `/products/[id]` - Product detail page with images, specs, reviews section
- `/cart` - Shopping cart management with quantity updates
- `/checkout` - Multi-step checkout (shipping, billing, payment)

#### User Management
- `/dashboard` - User profile and order history
- `/orders/[id]` - Order detail page with tracking info

### Infrastructure Components

#### API Layer (`lib/api.ts`)
```typescript
// Axios instances with JWT support
- apiClient: For authenticated requests (auto-adds Authorization header)
- authClient: For auth endpoints
- productClient: For product service
- cartClient: For cart service
- orderClient: For order service
```

#### Context Providers
```typescript
// AuthContext - Handles user state and authentication
- login(email, password)
- register(userData)
- logout()
- forgotPassword(email)
- resetPassword(token, password)

// CartContext - Manages shopping cart
- addToCart(product)
- removeFromCart(productId)
- updateQuantity(productId, quantity)
- getTotalPrice()
- getTotalItems()
```

#### API Hooks (`lib/hooks.ts`)
```typescript
useProducts()           // Fetch all products
useProductById(id)      // Fetch single product
useProductsByCategory() // Filter by category
getOrders()            // Fetch user orders
getOrderById(id)       // Get order details
createOrder(data)      // Create new order
```

## Port Configuration

Your application uses the following ports:

```
Frontend:           http://localhost:3000
AuthService:        http://localhost:8085  (OAuth, JWT, Email)
ProductService:     http://localhost:8081
CartService:        http://localhost:8082
OrderService:       http://localhost:8083
```

## Environment Setup

### 1. Development

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 2. Production Build

```bash
npm run build
npm run start
```

### 3. Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
ENV NODE_ENV production
CMD ["npm", "start"]
```

## Security Integration Points

### JWT Token Management
The API client automatically:
- Stores tokens in localStorage
- Adds Authorization header to all requests
- Refreshes expired tokens using refresh_token
- Redirects to login if refresh fails

### OAuth Google Integration
In the login page (`app/login/page.tsx`), there's a placeholder for Google OAuth:
```typescript
// Add your Google OAuth implementation here
<button>Sign in with Google</button>
```

### Email Notifications
The backend should send emails to:
- New user registration
- Login/Re-login notifications
- Password reset links

## Step-by-Step Integration with AuthService (Port 8085)

### Step 1: Update Auth Endpoints
In `lib/auth-context.tsx`, update the API calls to match your AuthService endpoints:

```typescript
// Current structure expects these endpoints:
POST /auth/login           // Returns { access_token, refresh_token, user }
POST /auth/register        // Returns { access_token, refresh_token, user }
POST /auth/forgot-password // Sends password reset email
POST /auth/reset-password  // Resets password with token
POST /auth/refresh         // Refreshes access token
```

### Step 2: Configure OAuth
1. Get your Google OAuth credentials
2. Add Google OAuth button in `/login/page.tsx`
3. Implement OAuth callback handler

### Step 3: Enable Email Notifications
Configure your email service in AuthService to send:
- Welcome email on registration
- Login notification emails
- Password reset emails

### Step 4: Test Integration
```bash
# Start all services
# 1. Start your Spring Boot services
# 2. Start frontend
cd frontend && npm run dev
```

## API Documentation

### Auth Endpoints (Port 8085)

```javascript
// Login
POST /auth/login
{
  "email": "user@example.com",
  "password": "password"
}
Response: {
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": { "id": 1, "email": "user@example.com", "name": "User" }
}

// Register
POST /auth/register
{
  "email": "user@example.com",
  "password": "password",
  "name": "User",
  "phone": "123-456-7890",
  "address": "123 Main St"
}

// Forgot Password
POST /auth/forgot-password
{
  "email": "user@example.com"
}
Response: { "message": "Reset link sent to email" }

// Reset Password
POST /auth/reset-password
{
  "token": "reset_token_from_email",
  "new_password": "newpassword"
}

// Refresh Token
POST /auth/refresh
{
  "refresh_token": "eyJhbGc..."
}
Response: { "access_token": "eyJhbGc..." }
```

### Product Endpoints (Port 8081)

```javascript
// Get all products
GET /api/products?page=0&size=20&sort=name

// Get product by ID
GET /api/products/{id}

// Search products
GET /api/products/search?keyword=shirt
```

### Cart Endpoints (Port 8082)

```javascript
// Add to cart
POST /api/carts/add
{
  "userId": 1,
  "productId": 5,
  "quantity": 2
}

// Get cart
GET /api/carts/{userId}

// Remove item
DELETE /api/carts/{userId}/items/{productId}
```

### Order Endpoints (Port 8083)

```javascript
// Create order
POST /api/orders
{
  "userId": 1,
  "items": [{ "productId": 5, "quantity": 2, "price": 29.99 }],
  "shippingAddress": {...},
  "billingAddress": {...},
  "totalPrice": 59.98
}

// Get orders
GET /api/orders?userId=1

// Get order by ID
GET /api/orders/{id}
```

## Features Checklist

- [x] Product browsing and search
- [x] Product filtering and sorting
- [x] Shopping cart management
- [x] Multi-step checkout
- [x] User authentication UI (ready for port 8085)
- [x] OAuth Google placeholder
- [x] Password reset flow
- [x] User dashboard
- [x] Order history and tracking
- [x] JWT token management
- [x] Automatic token refresh
- [x] Responsive design
- [x] Error handling and loading states
- [ ] Email notification integration (backend)
- [ ] OAuth Google implementation (backend)

## Troubleshooting

### CORS Errors
**Problem**: Cross-origin requests blocked
**Solution**: Ensure backend has CORS enabled for http://localhost:3000

```java
// In your Spring Boot config
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Token Not Persisting
**Problem**: Logged out after refresh
**Solution**: Check that tokens are being stored correctly in localStorage

### API Connection Failed
**Problem**: Backend endpoints not responding
**Solution**: Verify all services are running on correct ports

### Build Errors
**Problem**: TypeScript compilation errors
**Solution**: Run `npm run build` to identify issues, fix, and rebuild

## Deployment to Vercel

```bash
# Connect to Vercel
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_AUTH_SERVICE_URL=https://your-auth-service.com
NEXT_PUBLIC_PRODUCT_SERVICE_URL=https://your-product-service.com
NEXT_PUBLIC_CART_SERVICE_URL=https://your-cart-service.com
NEXT_PUBLIC_ORDER_SERVICE_URL=https://your-order-service.com

# Deploy
vercel --prod
```

## Performance Optimization

The frontend includes:
- Image optimization (Next.js Image)
- CSS minification (Tailwind)
- Code splitting and lazy loading
- SWR caching for API requests
- Automatic token refresh without user interaction

## Next Steps

1. **Connect AuthService (Port 8085)**
   - Update API endpoints in `lib/auth-context.tsx`
   - Test login/register/password reset flows

2. **Implement OAuth Google**
   - Add Google OAuth button
   - Implement callback handler

3. **Enable Email Notifications**
   - Configure email service on backend
   - Test welcome, login, password reset emails

4. **Integration Testing**
   - Test full user flow: Register → Login → Browse → Cart → Checkout
   - Verify JWT token refresh works correctly

5. **Production Deployment**
   - Deploy to Vercel or your hosting provider
   - Configure production backend URLs
   - Set up monitoring and error tracking

## Support Resources

- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Axios: https://axios-http.com/docs/intro
- SWR: https://swr.vercel.app/docs/getting-started

---

**Frontend Version**: 1.0.0  
**Last Updated**: April 2026  
**Status**: Ready for AuthService Integration
