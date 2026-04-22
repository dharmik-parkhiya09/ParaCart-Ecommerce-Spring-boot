# ParaCart Frontend Setup Guide

Complete setup instructions for running the ParaCart e-commerce frontend with the Spring Boot backend microservices.

## Overview

The frontend is a Next.js 16 application that communicates with 4 Spring Boot microservices:

```
┌─────────────────────────────────────────────────────┐
│         Frontend (Next.js)                           │
│         Port: 3000                                  │
└────────────┬────────────────────────────────────────┘
             │
      ┌──────┴──────────────────┬──────────────────┐
      ▼                         ▼                  ▼
┌──────────────┐    ┌──────────────────┐  ┌──────────────┐
│Auth Service  │    │Product Service   │  │Cart Service  │
│Port: 8085    │    │Port: 8081        │  │Port: 8082    │
└──────────────┘    └──────────────────┘  └──────────────┘
      ▲
      │
      ▼
┌──────────────┐
│Order Service │
│Port: 8083    │
└──────────────┘
```

## Prerequisites

### Required
- Node.js 18+ and npm
- Git
- Java 17+ (for backend services)
- Maven 3.8+

### Backend Services
All 4 microservices should be running before starting the frontend:

```bash
# Terminal 1 - Auth Service
cd AuthService
mvn spring-boot:run

# Terminal 2 - Product Service  
cd ProductService
mvn spring-boot:run

# Terminal 3 - Cart Service
cd CartService
mvn spring-boot:run

# Terminal 4 - Order Service
cd OrderService
mvn spring-boot:run
```

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd /vercel/share/v0-project/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:
- `next` - React framework
- `axios` - HTTP client
- `swr` - Data fetching
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `zod` - Validation
- `zustand` - State management

### Step 3: Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:

```env
# Backend Service URLs
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8085
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8081
NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8082
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8083

# Application Info
NEXT_PUBLIC_APP_NAME=ParaCart
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Feature Flags
NEXT_PUBLIC_ENABLE_NEWSLETTER=true
```

### Step 4: Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Verifying Setup

### 1. Check Homepage

Open http://localhost:3000 in your browser. You should see:
- ParaCart logo
- Hero section with "Shop Now" button
- Featured Products section
- Why Choose ParaCart features

### 2. Test Navigation

- Click "Shop Now" → Navigate to `/products`
- Click on a product → View product details
- Click "Sign Up" → Register page
- Click "Sign In" → Login page

### 3. Test Authentication Flow

1. Go to `/register`
2. Create a test account with:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPassword123
3. You should be logged in automatically
4. Click "Dashboard" to see user dashboard
5. Click "Logout" to sign out

### 4. Test Shopping Flow

1. Log in to your account
2. Go to `/products`
3. Click "Add to Cart" on any product
4. Check cart icon shows item count
5. Go to `/cart`
6. Click "Proceed to Checkout"
7. Fill in shipping and payment info
8. Click "Place Order"

## Project Structure Explanation

### `/app` - Pages and Layouts
- `layout.tsx` - Root layout with Auth and Cart providers
- `page.tsx` - Homepage with featured products
- `login/page.tsx` - Login page
- `register/page.tsx` - Registration page
- `forgot-password/page.tsx` - Password reset
- `products/page.tsx` - Product listing
- `products/[id]/page.tsx` - Product details
- `cart/page.tsx` - Shopping cart
- `checkout/page.tsx` - Checkout page
- `dashboard/page.tsx` - User dashboard
- `orders/[id]/page.tsx` - Order details
- `globals.css` - Global styles with Tailwind

### `/components` - Reusable Components
- `header.tsx` - Navigation header with cart icon
- `footer.tsx` - Footer component
- `product-card.tsx` - Product card for listings

### `/lib` - Core Logic
- `api.ts` - Axios instances with JWT interceptors
- `auth-context.tsx` - Authentication context provider
- `cart-context.tsx` - Cart state management
- `hooks.ts` - SWR hooks for data fetching

## API Integration Details

### Authentication

**Login Request:**
```javascript
POST http://localhost:8085/api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```javascript
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Products API

**Fetch All Products:**
```javascript
GET http://localhost:8081/api/products
```

**Get Product by ID:**
```javascript
GET http://localhost:8081/api/products/{id}
Authorization: Bearer {access_token}
```

### Cart API

**Get User Cart:**
```javascript
GET http://localhost:8082/api/cart
Authorization: Bearer {access_token}
```

**Add to Cart:**
```javascript
POST http://localhost:8082/api/cart/add
Authorization: Bearer {access_token}
{
  "productId": "123",
  "quantity": 1
}
```

### Orders API

**Create Order:**
```javascript
POST http://localhost:8083/api/orders
Authorization: Bearer {access_token}
{
  "items": [...],
  "shippingAddress": {...},
  "totalAmount": 99.99
}
```

**Get User Orders:**
```javascript
GET http://localhost:8083/api/orders
Authorization: Bearer {access_token}
```

## Token Refresh Mechanism

The frontend automatically handles JWT token refresh:

1. When API request returns 401 (Unauthorized)
2. Frontend sends refresh token to auth service
3. If refresh succeeds, new tokens are stored
4. Failed request is retried with new token
5. If refresh fails, user is redirected to login

## Styling System

Using Tailwind CSS v4 with custom design tokens:

```css
/* In globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

All colors use these CSS variables for consistency.

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Check TypeScript
npm run type-check
```

## Troubleshooting

### Issue: "Can't reach backend services"

**Solution:**
1. Verify all 4 services are running on correct ports
2. Check `.env.local` has correct URLs
3. Ensure backend has CORS enabled for localhost:3000
4. Check network connectivity

### Issue: "Login fails with 401"

**Solution:**
1. Verify AuthService is running on port 8085
2. Check user credentials are correct
3. Check request body is valid JSON
4. Look at browser console for error details

### Issue: "Products not loading"

**Solution:**
1. Verify ProductService running on port 8081
2. Check database has sample products
3. Verify NEXT_PUBLIC_PRODUCT_SERVICE_URL is correct
4. Check browser network tab for failed requests

### Issue: "Cart not updating"

**Solution:**
1. Verify user is logged in (token in localStorage)
2. Check CartService running on port 8082
3. Ensure access_token is valid
4. Try clearing localStorage and logging in again

### Issue: "CORS errors"

**Solution:**
1. Add CORS configuration to Spring Boot:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

## Security Features

- **JWT Authentication**: Secure token-based auth
- **Token Refresh**: Automatic token refresh on expiry
- **HTTPS Ready**: Works with HTTPS in production
- **XSS Protection**: React's built-in escaping
- **CSRF Protection**: SameSite cookies (when configured)
- **Input Validation**: Zod schema validation
- **Environment Variables**: Sensitive data in .env

## Performance Optimization

- **SWR Caching**: Smart data caching and revalidation
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js image component
- **CSS Purging**: Unused Tailwind classes removed
- **API Interceptors**: Token caching and reuse

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with one click

### Docker

```bash
# Build image
docker build -t paracart-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_AUTH_SERVICE_URL=http://api:8085 \
  paracart-frontend
```

### Traditional Server

```bash
npm run build
npm run start
```

Then use a process manager like PM2 or systemd to keep it running.

## Next Steps

1. **User Authentication**: Connect Google OAuth on port 8085
2. **Email Notifications**: Setup email service for:
   - New login notifications
   - Re-login alerts
   - Password reset emails
3. **Payment Integration**: Add Stripe/PayPal checkout
4. **Advanced Features**:
   - Product reviews and ratings
   - Wishlist functionality
   - Admin dashboard
   - Real-time notifications

## Support

For issues or questions:
1. Check troubleshooting section
2. Review backend service logs
3. Check browser console for errors
4. Verify network requests in DevTools
5. Check GitHub issues

## Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios](https://axios-http.com/docs)
- [SWR](https://swr.vercel.app)
- [React Context API](https://react.dev/reference/react/useContext)

---

Happy coding! 🚀
