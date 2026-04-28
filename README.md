# ParaCart - E-Commerce Frontend

A modern, fully-featured e-commerce frontend built with Next.js, React, and Tailwind CSS. Designed to work seamlessly with the ParaCart Spring Boot microservices backend.

## Features

- **Product Catalog**: Browse and search products with pagination
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout**: Secure checkout process
- **Order Confirmation**: Order tracking and confirmation page
- **Responsive Design**: Mobile-first, works on all devices
- **User-Friendly Interface**: Clean, intuitive design
- **Real-time Cart Management**: Synchronized with backend

## Tech Stack

- **Next.js 16** - React framework with SSR and API routes
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **SWR** - Data fetching and caching

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- ParaCart Spring Boot backend services running:
  - Product Service (port 8081)
  - Cart Service (port 8082)
  - Order Service (port 8083)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dharmik-parkhiya09/ParaCart-Ecommerce-Spring-boot.git
   cd ParaCart-Ecommerce-Spring-boot
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update the URLs in `.env.local` to match your backend services:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8081
   NEXT_PUBLIC_CART_API_URL=http://localhost:8082
   NEXT_PUBLIC_ORDER_API_URL=http://localhost:8083
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Homepage
├── globals.css             # Global styles
├── products/
│   ├── page.tsx            # Products list page
│   └── [id]/page.tsx       # Product detail page
├── cart/
│   └── page.tsx            # Shopping cart page
├── order-confirmation/
│   └── [id]/page.tsx       # Order confirmation page
├── about/
│   └── page.tsx            # About us page
└── contact/
    └── page.tsx            # Contact page

components/
├── Header.tsx              # Navigation header
├── Footer.tsx              # Footer
├── Hero.tsx                # Homepage hero section
├── FeaturedProducts.tsx    # Featured products section
├── Features.tsx            # Benefits section
├── ProductCard.tsx         # Product card component
└── LoadingSkeleton.tsx     # Loading skeleton

hooks/
└── useCart.ts              # Cart management hook

lib/
└── config.ts               # Configuration and constants
```

## API Endpoints Used

### Product Service (Port 8081)
- `GET /products` - Get all products (paginated)
- `GET /products/{id}` - Get product details

### Cart Service (Port 8082)
- `GET /cart/{userId}` - Get user's cart
- `POST /cart` - Add item to cart
- `POST /cart/checkout/{userId}` - Create order from cart

### Order Service (Port 8083)
- `GET /orders/{orderId}` - Get order details
- `GET /orders/user/{userId}` - Get user's orders

## Key Features

### Shopping Flow
1. Browse products on the homepage or products page
2. Click on a product to view details
3. Add items to cart
4. Proceed to checkout
5. Receive order confirmation with tracking

### Cart Management
- Real-time cart synchronization with backend
- Update quantities or remove items
- View order summary with totals
- Free shipping on all orders

### Demo Mode
The application includes demo mode that shows sample data when backend services aren't available. This is controlled by the `NEXT_PUBLIC_DEMO_MODE` environment variable.

## Customization

### Styling
All colors and themes are defined in:
- `app/globals.css` - CSS variables
- `tailwind.config.js` - Tailwind configuration

### API Configuration
Update `lib/config.ts` to change backend URLs or default user ID.

### Content
Update components with your own:
- Logo and branding
- Product information
- Contact details
- Social media links

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (optional)

### Debugging
The app includes debug logs with `[v0]` prefix for easy filtering in console.

### Hot Reload
Next.js development server includes automatic hot reload for instant updates.

## Production Build

```bash
npm run build
npm run start
```

## Deployment

### Deploy to Vercel
The easiest way to deploy Next.js applications:

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
This is a standard Next.js application and can be deployed to any platform supporting Node.js:
- AWS
- Google Cloud
- Azure
- DigitalOcean
- Heroku
- Railway
- Render

## Environment Variables

Create a `.env.local` file:

```
# Backend URLs
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_CART_API_URL=http://localhost:8082
NEXT_PUBLIC_ORDER_API_URL=http://localhost:8083

# Features
NEXT_PUBLIC_DEMO_MODE=false
```

## Troubleshooting

### Backend Connection Issues
- Ensure all Spring Boot services are running
- Check URLs in `.env.local`
- Look for CORS issues in browser console
- Check service health endpoints

### Port Conflicts
- Change `localhost` to IP address if needed
- Update ports in backend services and frontend `.env.local`

### Cart Not Updating
- Ensure DEFAULT_USER_ID matches your user ID in backend
- Check network tab for failed requests
- Review browser console for errors

## Contributing

We welcome contributions! Please follow the existing code style and create feature branches.

## License

This project is part of the ParaCart e-commerce platform.

## Support

For issues or questions:
- Email: support@paracart.com
- GitHub Issues: [Create an issue](#)
- Contact page: /contact

## Acknowledgments

- Built with Next.js
- Styled with Tailwind CSS
- Icons from system emoji
- Backend: Spring Boot microservices
