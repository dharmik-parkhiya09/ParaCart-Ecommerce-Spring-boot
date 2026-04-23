# ParaCart Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Browser                                │
│                   (http://localhost:3000)                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Next.js    │
                    │  Frontend   │
                    │  Port 3000  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┬──────────────────┐
        │                  │                  │                  │
┌───────▼────────┐ ┌──────▼────────┐ ┌──────▼────────┐ ┌───────▼────────┐
│  AuthService   │ │ ProductService│ │  CartService  │ │ OrderService   │
│  Port 8085     │ │  Port 8081    │ │  Port 8082    │ │  Port 8083     │
├────────────────┤ ├───────────────┤ ├───────────────┤ ├────────────────┤
│ • Login        │ │ • Browse      │ │ • Add item    │ │ • Create order │
│ • Register     │ │ • Search      │ │ • View cart   │ │ • Get orders   │
│ • OAuth Google │ │ • Filter      │ │ • Update qty  │ │ • Order status │
│ • JWT/Refresh  │ │ • Get details │ │ • Remove item │ │ • Tracking     │
│ • Email        │ │ • Categories  │ │ • Checkout    │ │ • History      │
└────────────────┘ └───────────────┘ └───────────────┘ └────────────────┘
        │                  │                  │                  │
        └──────────────────┼──────────────────┼──────────────────┘
                           │
                    ┌──────▼──────────┐
                    │  Databases      │
                    │ (PostgreSQL/    │
                    │  MySQL)         │
                    └─────────────────┘
```

## Frontend Component Architecture

```
┌────────────────────────────────────────────────┐
│              Root Layout                       │
│  ├─ AuthProvider                              │
│  │  └─ CartProvider                           │
│  │     └─ Pages & Components                  │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│            Pages Directory                     │
├────────────────────────────────────────────────┤
│ • / (Home)                                     │
│ • /login (Authentication)                     │
│ • /register (Registration)                    │
│ • /forgot-password (Password Reset)           │
│ • /products (Product Listing)                 │
│ • /products/[id] (Product Details)            │
│ • /cart (Shopping Cart)                       │
│ • /checkout (Checkout)                        │
│ • /dashboard (User Dashboard)                 │
│ • /orders/[id] (Order Details)                │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│           Shared Components                    │
├────────────────────────────────────────────────┤
│ • Header (Navigation)                          │
│ • Footer                                       │
│ • ProductCard                                  │
│ • Loading States                              │
│ • Error Boundaries                            │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│         Context Providers                      │
├────────────────────────────────────────────────┤
│ • AuthContext (User, Login, Logout)           │
│ • CartContext (Items, Total, Actions)         │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│           API Infrastructure                   │
├────────────────────────────────────────────────┤
│ • api.ts (Axios instances)                    │
│ • hooks.ts (Data fetching)                    │
│ • JWT interceptors                            │
│ • Token refresh logic                         │
└────────────────────────────────────────────────┘
```

## Data Flow Diagram

### User Authentication Flow

```
┌──────────────┐
│ Login Page   │
└──────┬───────┘
       │ User enters email/password
       ▼
┌─────────────────┐
│ Validate Input  │
└──────┬──────────┘
       │
       ▼
┌──────────────────────────────┐
│ POST /api/auth/login         │ (Port 8085)
│ AuthService                  │
└──────┬───────────────────────┘
       │
       ├─ Success: Get tokens
       │
       ▼
┌──────────────────────────┐
│ Store Tokens in          │
│ localStorage             │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Update AuthContext       │
│ isAuthenticated = true   │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Redirect to Dashboard    │
└──────────────────────────┘
```

### Shopping Flow

```
┌────────────────┐
│ Home Page      │
└────────┬───────┘
         │
         ▼
┌──────────────────────────────┐
│ Products Page                │
│ GET /api/products            │ (Port 8081)
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Display Products             │
│ User selects item            │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Product Detail Page          │
│ GET /api/products/{id}       │ (Port 8081)
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Add to Cart                  │
│ CartContext + localStorage   │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Cart Page                    │
│ Review items & quantities    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Checkout Page                │
│ Enter shipping/billing info  │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ POST /api/orders             │ (Port 8083)
│ Create Order                 │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Order Confirmation           │
│ Redirect to Order Detail     │
└──────────────────────────────┘
```

## API Request/Response Flow

### With JWT Authentication

```
Frontend Request:
┌────────────────────────────┐
│ GET /api/products          │
│ Headers: {                 │
│   Authorization: Bearer... │
│   Content-Type: json       │
│ }                          │
└────────────────────────────┘
              │
              ▼
┌────────────────────────────┐
│ API Interceptor            │
│ ├─ Add JWT token          │
│ ├─ Check token validity   │
│ └─ Handle expiration      │
└────────────────────────────┘
              │
              ▼
┌────────────────────────────┐
│ Backend Service            │
│ Verify JWT                 │
└────────────────────────────┘
              │
              ├─ Valid: Process request
              │
              ▼
┌────────────────────────────┐
│ Return Data (200 OK)       │
└────────────────────────────┘
              │
              ▼
┌────────────────────────────┐
│ Response Interceptor       │
│ Parse & Store Data         │
└────────────────────────────┘
              │
              ▼
┌────────────────────────────┐
│ Update React Component     │
│ Re-render with data        │
└────────────────────────────┘
```

### Token Refresh Flow

```
Backend returns 401 (Token Expired):
┌────────────────────────────┐
│ API Response (401)         │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Response Interceptor       │
│ Detect 401 status          │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ POST /api/auth/refresh     │ (Port 8085)
│ Send refresh_token         │
└────────┬───────────────────┘
         │
         ├─ Success: Get new token
         │           └─ Update localStorage
         │           └─ Retry original request
         │
         ├─ Failure: Token invalid
         │           └─ Clear localStorage
         │           └─ Redirect to /login
         │
         ▼
┌────────────────────────────┐
│ Continue or Logout         │
└────────────────────────────┘
```

## State Management Architecture

```
┌─────────────────────────────────────────┐
│        AuthContext State                │
├─────────────────────────────────────────┤
│ {                                       │
│   user: {                               │
│     id: number                          │
│     email: string                       │
│     name: string                        │
│     phone?: string                      │
│     address?: string                    │
│   }                                     │
│   isAuthenticated: boolean              │
│   loading: boolean                      │
│   error?: string                        │
│ }                                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        CartContext State                │
├─────────────────────────────────────────┤
│ {                                       │
│   items: [{                             │
│     id: string                          │
│     productId: number                   │
│     name: string                        │
│     price: number                       │
│     quantity: number                    │
│     image: string                       │
│   }]                                    │
│   totalPrice: number                    │
│   totalItems: number                    │
│ }                                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       localStorage Data                 │
├─────────────────────────────────────────┤
│ • access_token: JWT                     │
│ • refresh_token: JWT                    │
│ • user: Serialized user object          │
│ • cart: Serialized cart items           │
└─────────────────────────────────────────┘
```

## Security Architecture

```
┌──────────────────────────────────────────┐
│    Frontend Security Layers              │
├──────────────────────────────────────────┤
│                                          │
│  ┌─────────────────────────────────┐    │
│  │ Input Validation                │    │
│  │ ├─ Email format                 │    │
│  │ ├─ Password requirements        │    │
│  │ ├─ Required fields              │    │
│  │ └─ XSS prevention               │    │
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │ JWT Token Management            │    │
│  │ ├─ Secure storage               │    │
│  │ ├─ Auto-refresh                 │    │
│  │ ├─ Expiration handling          │    │
│  │ └─ Logout cleanup               │    │
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │ Protected Routes                │    │
│  │ ├─ /dashboard                   │    │
│  │ ├─ /orders/[id]                 │    │
│  │ ├─ /checkout                    │    │
│  │ └─ Redirect unauthorized users  │    │
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │ API Security                    │    │
│  │ ├─ Authorization headers        │    │
│  │ ├─ CORS validation              │    │
│  │ ├─ Error handling               │    │
│  │ └─ Rate limit awareness         │    │
│  └─────────────────────────────────┘    │
│                                          │
└──────────────────────────────────────────┘
```

## Deployment Architecture

```
┌────────────────────────────────────────────┐
│         Production Deployment              │
└────────────────────────────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
┌───▼────────┐ ┌───▼────────┐ ┌───▼────────┐
│   Vercel   │ │   Docker   │ │    AWS     │
│  (easiest) │ │ Container  │ │  EC2/ECS   │
└────────────┘ └────────────┘ └────────────┘
                     │
                     ▼
        ┌──────────────────────┐
        │   CDN/Static Assets  │
        └──────────────────────┘
                     │
                     ▼
        ┌──────────────────────┐
        │  SSL/TLS Certificate │
        └──────────────────────┘
                     │
                     ▼
        ┌──────────────────────┐
        │  Load Balancer       │
        └──────────────────────┘
                     │
            ┌────────┴────────┐
            │                 │
       ┌────▼────┐       ┌────▼────┐
       │ Instance │       │ Instance │
       │    1     │       │    2     │
       └──────────┘       └──────────┘
```

## Database Schema (Backend)

```
┌─────────────────┐
│     Users       │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ password        │
│ name            │
│ phone           │
│ address         │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│    Products     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ price           │
│ image_url       │
│ category        │
│ stock           │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│     Orders      │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ total_price     │
│ status          │
│ shipping_addr   │
│ billing_addr    │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌──────────────────┐
│   Order Items    │
├──────────────────┤
│ id (PK)          │
│ order_id (FK)    │
│ product_id (FK)  │
│ quantity         │
│ price            │
└──────────────────┘

┌─────────────────┐
│  Cart Items     │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ product_id (FK) │
│ quantity        │
│ created_at      │
└─────────────────┘
```

## Environment Configuration

```
Development:
├─ Frontend:        http://localhost:3000
├─ AuthService:     http://localhost:8085
├─ ProductService:  http://localhost:8081
├─ CartService:     http://localhost:8082
├─ OrderService:    http://localhost:8083
└─ Database:        localhost:5432/paracart

Production:
├─ Frontend:        https://paracart.com
├─ AuthService:     https://api.paracart.com:8085
├─ ProductService:  https://api.paracart.com:8081
├─ CartService:     https://api.paracart.com:8082
├─ OrderService:    https://api.paracart.com:8083
└─ Database:        production-db-host
```

## Continuous Integration Pipeline

```
Code Push
    │
    ▼
┌─────────────────┐
│ GitHub Actions  │
└────────┬────────┘
         │
    ┌────┴──────┬──────────┐
    │            │          │
    ▼            ▼          ▼
Lint    Build   Test
    │            │          │
    └────┬───────┴──────────┘
         │
    Pass All?
    │
    ├─ No: Fail & Notify
    │
    └─ Yes
         │
         ▼
    ┌──────────────┐
    │ Deploy to    │
    │ Staging      │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Run Tests    │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Deploy to    │
    │ Production   │
    └──────────────┘
```

---

This architecture ensures:
- **Scalability**: Microservices can scale independently
- **Security**: Multi-layer authentication and validation
- **Reliability**: Token refresh and error handling
- **Maintainability**: Clear separation of concerns
- **Performance**: Optimized data fetching and caching
