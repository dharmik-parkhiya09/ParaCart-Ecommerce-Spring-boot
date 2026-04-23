# ParaCart Frontend - Getting Started Guide

## Overview

Your ParaCart e-commerce frontend has been successfully built! This is a modern Next.js 16 application with complete integration points ready for your Spring Boot microservices backend running on port 8085 (and other ports for different services).

## What's Been Built

### Complete Feature Set
✅ **User Authentication Pages**
- Login page with email/password
- Registration page with form validation
- Forgot password with email recovery flow
- Password reset functionality

✅ **Shopping Features**
- Homepage with featured products
- Full product catalog with search and filtering
- Product detail pages with descriptions
- Shopping cart management
- Multi-step checkout process

✅ **User Dashboard**
- Order history view
- Order detail pages with status tracking
- User profile management area
- Account settings

✅ **Core Infrastructure**
- JWT authentication with token refresh
- Context API for auth and cart state
- SWR for efficient data fetching
- Axios interceptors for automatic token injection
- Error handling and loading states
- Responsive mobile-first design

## Quick Start (2 minutes)

### 1. Navigate to Frontend
```bash
cd /vercel/share/v0-project/frontend
```

### 2. Ensure Dependencies are Installed
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Update .env.local with your backend URLs:
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8085
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8081
NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8082
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8083
```

### 4. Start the Dev Server
```bash
npm run dev
```

### 5. Open in Browser
Visit: **http://localhost:3000**

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx                    # Home page
│   ├── login/page.tsx              # Login page
│   ├── register/page.tsx           # Registration page
│   ├── forgot-password/page.tsx    # Password recovery
│   ├── products/
│   │   ├── page.tsx                # Product listing
│   │   └── [id]/page.tsx           # Product details
│   ├── cart/page.tsx               # Shopping cart
│   ├── checkout/page.tsx           # Checkout process
│   ├── dashboard/page.tsx          # User dashboard
│   ├── orders/[id]/page.tsx        # Order details
│   ├── layout.tsx                  # Root layout with providers
│   └── globals.css                 # Global styles
│
├── components/
│   ├── header.tsx                  # Navigation header
│   ├── footer.tsx                  # Footer section
│   └── product-card.tsx            # Product card component
│
├── lib/
│   ├── api.ts                      # Axios setup with interceptors
│   ├── auth-context.tsx            # Authentication provider
│   ├── cart-context.tsx            # Shopping cart provider
│   └── hooks.ts                    # Data fetching hooks
│
└── package.json                    # Dependencies & scripts
```

## Available Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Featured products & marketing |
| Products | `/products` | Browse all products |
| Product Details | `/products/[id]` | View single product |
| Login | `/login` | User authentication |
| Register | `/register` | Create new account |
| Forgot Password | `/forgot-password` | Password recovery |
| Shopping Cart | `/cart` | Manage cart items |
| Checkout | `/checkout` | Complete purchase |
| Dashboard | `/dashboard` | User profile & orders |
| Order Details | `/orders/[id]` | View order status |

## Key Features Explained

### Authentication Flow
1. User registers/logs in on `/login` or `/register`
2. Backend returns JWT `access_token` and `refresh_token`
3. Tokens automatically stored in `localStorage`
4. Axios interceptors automatically add tokens to API requests
5. If token expires, automatically refreshes using refresh token
6. If refresh fails, user redirected to login

### Shopping Cart
- Add/remove items with quantity management
- Cart stored in localStorage (ready to migrate to backend)
- Cart context provides easy access across app
- Checkout calculates totals automatically

### Product Browsing
- Fetch all products from Product Service
- Search/filter by category
- Sort by price and name
- Product detail pages with images and descriptions

### Orders & Dashboard
- View all user orders
- Track order status
- View detailed order information
- Account management area

## Environment Variables

Create `.env.local` with these variables:

```env
# Backend Service URLs
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8085
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8081
NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8082
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8083

# Optional: for production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Available npm Scripts

```bash
npm run dev        # Start development server (port 3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Integration with Your Backend (Port 8085)

The frontend is ready to connect to your AuthService on port 8085 with:

### Current Integration Points
- Login endpoint: `POST /auth/login`
- Register endpoint: `POST /auth/register`
- Forgot password: `POST /auth/forgot-password`
- Reset password: `POST /auth/reset-password`
- Refresh token: `POST /auth/refresh`

### Future Security Features (Ready to Implement)
- **OAuth Google Login**: Add Google OAuth configuration
- **JWT Tokens**: Already integrated with automatic refresh
- **Email Notifications**: 
  - New login email
  - Re-login confirmation
  - Password reset links
- **Session Management**: HTTP-only cookies support ready

## Understanding the Code

### API Communication (`lib/api.ts`)
```typescript
// Axios instance with interceptors for JWT handling
// Automatically adds auth headers
// Handles token refresh on 401
// Catches and logs errors
```

### Auth Context (`lib/auth-context.tsx`)
```typescript
// Global authentication state
// Methods: login, register, logout, forgotPassword, resetPassword
// User data available throughout app
```

### Cart Context (`lib/cart-context.tsx`)
```typescript
// Global cart state
// Methods: addToCart, removeFromCart, updateQuantity
// Calculates totals automatically
```

### Custom Hooks (`lib/hooks.ts`)
```typescript
// useProducts() - Fetch all products
// useProductById(id) - Fetch single product
// useOrders() - Fetch user's orders
```

## Common Tasks

### Add a New Page
```bash
# Create new file in app/ directory
# Use 'use client' directive for interactive components
# Import components from components/ folder
```

### Modify API Endpoints
Edit `lib/api.ts` - all axios instances are configured there

### Add New Feature
1. Create component in `components/`
2. Add page in `app/`
3. Add API hook in `lib/hooks.ts` if needed
4. Use context if global state needed

## Troubleshooting

### "Cannot GET /api/..."
→ Check NEXT_PUBLIC_*_SERVICE_URL environment variables

### "401 Unauthorized"
→ Token expired. Check localStorage for access_token and refresh_token

### "CORS Error"
→ Ensure backend has CORS enabled for http://localhost:3000

### Page Shows Loading Forever
→ Check browser console for API errors
→ Verify backend services are running
→ Check network tab to see actual API calls

## Next Steps for Backend Integration

1. **Start your Spring Boot services** on ports 8081-8083, 8085
2. **Ensure CORS is enabled** in each backend service
3. **Configure environment variables** in `.env.local`
4. **Test API endpoints** using the frontend forms
5. **Monitor browser console** for any errors

## Production Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)
```bash
# Push to GitHub
git push origin frontend-with-oauth

# Connect repo to Vercel
# Select /frontend as root directory
# Add environment variables in Vercel settings
# Deploy!
```

### Deploy to Other Platforms
- Docker, AWS, Google Cloud, or any Node.js host
- See DEPLOYMENT_GUIDE.md for detailed instructions

## Documentation Files

- **INDEX.md** - Complete documentation index
- **README.md** - Technical project documentation
- **FRONTEND_SETUP.md** - Detailed setup guide
- **FRONTEND_BUILD_SUMMARY.md** - What was built
- **INTEGRATION_GUIDE.md** - Backend integration examples
- **DEPLOYMENT_GUIDE.md** - Production deployment
- **ARCHITECTURE.md** - System architecture & data flow
- **QUICK_START.md** - Quick reference guide

## Support & Debugging

### Enable Debug Mode
Add this to any page or component:
```typescript
console.log("[v0] Component mounted", { props });
```

### View Network Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try login - see all API calls
4. Check response data in browser console

### Check Token Storage
```javascript
// In browser console
console.log(localStorage.getItem('access_token'));
console.log(localStorage.getItem('refresh_token'));
```

## Key Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client with interceptors
- **SWR** - Data fetching library
- **Lucide Icons** - UI icons
- **React Context API** - State management

## Ready to Go!

Your frontend is now complete and running. The dev server is ready at **http://localhost:3000**.

Start by:
1. Viewing the home page
2. Testing product browsing
3. Attempting login (will fail until AuthService is connected)
4. Exploring all pages in the navigation

Happy coding! 🚀
