# API Integration Guide

This document describes how to configure and use the Spring Boot backend services with the ParaCart e-commerce frontend.

## Backend Services

The application uses three microservices:

### 1. Product Service (Port 8081)
Manages product catalog and inventory.

**Endpoints:**
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search?query={query}` - Search products

**Response Format:**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "quantity": 50,
  "image": "https://example.com/image.jpg"
}
```

### 2. Cart Service (Port 8080)
Manages shopping cart operations.

**Endpoints:**
- `GET /api/cart` - Get current cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/{productId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

**Request Body for Add:**
```json
{
  "productId": 1,
  "productName": "Product Name",
  "price": 99.99,
  "quantity": 2,
  "image": "https://example.com/image.jpg"
}
```

**Response Format:**
```json
{
  "cartId": 1,
  "items": [
    {
      "productId": 1,
      "productName": "Product Name",
      "price": 99.99,
      "quantity": 2,
      "image": "https://example.com/image.jpg"
    }
  ],
  "totalPrice": 199.98
}
```

### 3. Order Service (Port 8082)
Manages order creation and tracking.

**Endpoints:**
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/user` - Get user's orders
- `PUT /api/orders/{id}/status` - Update order status

**Request Body for Create Order:**
```json
{
  "items": [
    {
      "productId": 1,
      "productName": "Product Name",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "totalPrice": 199.98
}
```

**Response Format:**
```json
{
  "id": 100,
  "userId": "user123",
  "items": [...],
  "totalPrice": 199.98,
  "status": "pending",
  "createdAt": "2024-04-28T10:30:00Z"
}
```

## Environment Configuration

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8081
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8082
NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8080
```

For production deployment, update these URLs to point to your deployed backend services:

```env
NEXT_PUBLIC_PRODUCT_SERVICE_URL=https://product-service.yourdomain.com
NEXT_PUBLIC_ORDER_SERVICE_URL=https://order-service.yourdomain.com
NEXT_PUBLIC_CART_SERVICE_URL=https://cart-service.yourdomain.com
```

## Frontend Architecture

### Context API
The application uses React Context API for global state management:

- **CartContext** (`/context/CartContext.tsx`) - Manages cart state and operations

### Custom Hooks
- **useCart** (`/hooks/useCart.ts`) - Legacy hook for compatibility
- **useCartContext** - New hook to access CartContext

### API Service
- **lib/api.ts** - Centralized API calls for all services

## Running the Application

### Prerequisites
1. Node.js 16+ installed
2. Spring Boot backend services running on ports 8080, 8081, 8082

### Development Server
```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## CORS Configuration

Ensure your Spring Boot services have CORS configured to accept requests from your frontend domain:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000", "https://yourdomain.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

## Error Handling

The frontend includes error handling for:
- Network failures
- API timeouts
- Invalid responses
- Business logic errors

All API calls include try-catch blocks and user-friendly error messages.

## Testing the Integration

1. **Test Product Listing:**
   - Navigate to `/products`
   - Verify products load from Product Service

2. **Test Cart Operations:**
   - Add a product to cart
   - Verify cart updates in CartSidebar
   - Remove items from cart

3. **Test Checkout:**
   - Go to `/cart`
   - Click "Proceed to Checkout"
   - Complete the order form
   - Verify order confirmation

4. **Test Search:**
   - Use search bar in header
   - Verify products are filtered by query

## Troubleshooting

### Products Not Loading
- Check Product Service is running on port 8081
- Verify `NEXT_PUBLIC_PRODUCT_SERVICE_URL` is correct
- Check browser console for CORS errors

### Cart Not Persisting
- Check Cart Service is running on port 8080
- Verify `NEXT_PUBLIC_CART_SERVICE_URL` is correct
- Check that credentials are included in requests

### Orders Not Creating
- Check Order Service is running on port 8082
- Verify order payload matches expected format
- Check Order Service logs for validation errors

## Database Integration

Update the backend services to connect to your actual database. The frontend works with any backend that implements the documented API contracts.

## Security Considerations

1. **HTTPS in Production** - Always use HTTPS for production
2. **API Key Management** - If needed, add API key validation
3. **CORS Policies** - Restrict CORS to known domains
4. **Data Validation** - Validate all inputs on backend
5. **User Authentication** - Implement proper user authentication if needed
