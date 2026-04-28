# Quick Start Guide

Get the ParaCart e-commerce frontend running in minutes.

## Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- Spring Boot backend services running:
  - Product Service on port 8081
  - Cart Service on port 8080
  - Order Service on port 8082

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/paracart-frontend.git
   cd paracart-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your backend service URLs (default values work for local development):
   ```env
   NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8081
   NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8082
   NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8080
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`
   - You should see the ParaCart homepage

## First Steps

### 1. Browse Products
- Click "Products" in the navigation
- Products will load from your Product Service
- Use search to find specific items

### 2. Add to Cart
- Click any product to view details
- Adjust quantity
- Click "Add to Cart"
- View cart from header icon

### 3. Checkout
- Go to cart (click cart icon)
- Click "Proceed to Checkout"
- Fill in shipping and payment details
- Complete order

### 4. View Order Confirmation
- After successful order, you'll see confirmation page
- Order details saved in Order Service

## Available Pages

- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Browse all products with search and filters
- **Product Detail** (`/products/[id]`) - Detailed product information
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Checkout form
- **Order Confirmation** (`/order-confirmation/[id]`) - Order details
- **About** (`/about`) - About ParaCart
- **Contact** (`/contact`) - Contact form

## Development

### Project Structure

```
paracart-frontend/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── products/            # Products pages
│   ├── cart/                # Cart page
│   ├── checkout/            # Checkout page
│   └── order-confirmation/  # Order confirmation
├── components/              # React components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer
│   ├── ProductCard.tsx      # Product card component
│   ├── CartSidebar.tsx      # Cart sidebar
│   ├── SearchBar.tsx        # Search functionality
│   └── ...
├── context/                 # React Context
│   └── CartContext.tsx      # Cart state management
├── hooks/                   # Custom hooks
│   └── useCart.ts           # Cart operations
├── lib/                     # Utilities
│   ├── api.ts              # API calls
│   └── config.ts           # Configuration
└── public/                  # Static assets
```

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

## Common Issues

### 1. Products not loading
**Issue:** `CORS error` or `404 error`
- Ensure Product Service is running on port 8081
- Check `NEXT_PUBLIC_PRODUCT_SERVICE_URL` in `.env.local`
- Verify CORS is configured in backend

### 2. Cart not persisting
**Issue:** Cart items disappear on page reload
- Ensure Cart Service is running on port 8080
- Check network tab in browser DevTools
- Verify cookies are enabled

### 3. Cannot checkout
**Issue:** Order creation fails
- Ensure Order Service is running on port 8082
- Verify order payload is correct
- Check Order Service logs for errors

### 4. Styling issues
**Issue:** Tailwind CSS not applying
- Rebuild CSS: `npm run dev`
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`

## Customization

### Change Brand Name
1. Edit `/components/Header.tsx` - Change "ParaCart" text
2. Edit `app/layout.tsx` - Update metadata title
3. Edit other component files as needed

### Modify Colors
1. Edit `/app/globals.css` - Change CSS variables
2. Or edit `tailwind.config.js` - Update theme colors

### Add New Pages
1. Create new directory in `/app`
2. Add `page.tsx` file
3. Export default component

Example:
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

## API Integration

All API calls are in `/lib/api.ts`. To add new endpoints:

```typescript
export async function newEndpoint(params: any) {
  try {
    const response = await fetch(`${API_URL}/endpoint`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

## State Management

Cart state is managed using React Context (`CartContext`). To access:

```typescript
import { useCartContext } from '@/context/CartContext';

export function MyComponent() {
  const { cart, addToCart, removeFromCart } = useCartContext();
  // Use cart operations...
}
```

## Performance Tips

1. **Enable static generation** for product pages
2. **Optimize images** using Next.js Image component
3. **Code splitting** happens automatically
4. **Lazy load components** when needed
5. **Use SWR** for data fetching and caching

## Deployment

Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick deployment to Vercel:
```bash
npm i -g vercel
vercel
```

## Support

- Check [API_INTEGRATION.md](./API_INTEGRATION.md) for backend integration details
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Check browser console for errors
- Review Network tab to inspect API calls

## Next Steps

1. ✅ Get local development running
2. ✅ Test all functionality
3. ✅ Customize branding and colors
4. ✅ Deploy to production (see DEPLOYMENT.md)
5. ✅ Monitor and optimize performance

Happy coding! 🚀
