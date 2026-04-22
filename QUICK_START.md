# Quick Start Guide - ParaCart E-Commerce

Get the ParaCart frontend running in 5 minutes.

## 1. Ensure Backend Services are Running

Open 4 terminal windows and run each service:

```bash
# Terminal 1 - Auth Service (Port 8085)
cd AuthService && mvn spring-boot:run

# Terminal 2 - Product Service (Port 8081)
cd ProductService && mvn spring-boot:run

# Terminal 3 - Cart Service (Port 8082)
cd CartService && mvn spring-boot:run

# Terminal 4 - Order Service (Port 8083)
cd OrderService && mvn spring-boot:run
```

Wait for all services to start (you'll see "Started" messages).

## 2. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## 3. Access the App

Open **http://localhost:3000** in your browser.

## Testing the Flow

### Create Account
1. Click "Sign Up"
2. Enter: Name, Email, Password
3. Click "Create Account"

### Browse Products
1. Click "Products" or "Shop Now"
2. Search, filter, or sort products
3. Click on any product to see details

### Add to Cart
1. On product details page
2. Select quantity
3. Click "Add to Cart"
4. See cart icon update

### Checkout
1. Go to Cart (click shopping cart icon)
2. Review items and quantities
3. Click "Proceed to Checkout"
4. Fill shipping address
5. Enter card info (dummy data: 1234 5678 9012 3456)
6. Click "Place Order"
7. View order confirmation

### View Dashboard
1. Click your name (top right)
2. Click "Dashboard"
3. See order history and stats
4. Click "View Details" on any order

## Key Features Ready to Use

✓ User authentication (register, login, logout)
✓ Product browsing with search/filter/sort
✓ Shopping cart management
✓ Checkout process
✓ Order history
✓ User dashboard
✓ Responsive mobile design

## Future Integrations (Port 8085)

The auth service (port 8085) is ready for:
- Google OAuth login
- JWT token refresh
- Email notifications:
  - New login alerts
  - Re-login reminders
  - Password reset emails

## Environment Files

- `.env.example` - Template (commit this)
- `.env.local` - Your local config (don't commit)

## Common Commands

```bash
npm run dev      # Start development
npm run build    # Build for production
npm run start    # Start production
npm run lint     # Check code
```

## Troubleshooting

**Can't connect to backend?**
- Check all 4 services are running
- Verify ports: 8081, 8082, 8083, 8085
- Check `.env.local` URLs match

**Login fails?**
- Verify AuthService is running
- Check credentials are correct
- Clear browser cache

**Products not showing?**
- Verify ProductService is running on 8081
- Check database has sample data
- Clear browser cache

## Next Steps

1. **Google OAuth**: Configure in auth service
2. **Payment Gateway**: Add Stripe integration
3. **Email Service**: Setup for notifications
4. **Database**: Configure persistence
5. **Production**: Deploy to Vercel/server

## File Structure

```
frontend/
├── app/               # Pages and layouts
├── components/        # Reusable components
├── lib/              # Core logic (API, auth, cart)
├── package.json      # Dependencies
├── .env.local        # Environment config
└── README.md         # Full documentation
```

## API Endpoints Used

```
Auth:     http://localhost:8085/api/auth/*
Products: http://localhost:8081/api/products/*
Cart:     http://localhost:8082/api/cart/*
Orders:   http://localhost:8083/api/orders/*
```

## Key Technologies

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State**: Context API for auth/cart
- **HTTP**: Axios with JWT interceptors
- **Data Fetching**: SWR for caching
- **Icons**: Lucide React

## Testing Credentials

After creating an account:
- Email: test@example.com
- Password: TestPassword123
- Name: Test User

## Performance Tips

- Pages load fast with Next.js caching
- Products cached with SWR
- Cart syncs with backend when authenticated
- Images optimized with Next.js Image component

---

**Ready to go!** Start the servers, run `npm run dev`, and visit http://localhost:3000

For detailed docs, see `FRONTEND_SETUP.md` and `frontend/README.md`
