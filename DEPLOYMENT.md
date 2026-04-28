# Deployment Guide

This guide covers deploying the ParaCart e-commerce frontend to production.

## Deploying to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications with seamless deployment and CI/CD.

### Steps

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial e-commerce frontend"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project root

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add the following variables:
     ```
     NEXT_PUBLIC_PRODUCT_SERVICE_URL=https://api.yourdomain.com/product
     NEXT_PUBLIC_ORDER_SERVICE_URL=https://api.yourdomain.com/order
     NEXT_PUBLIC_CART_SERVICE_URL=https://api.yourdomain.com/cart
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys your application
   - Your site is now live at `your-project.vercel.app`

5. **Add Custom Domain** (Optional)
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Update DNS records according to Vercel instructions

## Deploying to Other Platforms

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

Create a `.dockerignore`:

```
node_modules
npm-debug.log
.next
.git
.gitignore
.env.local
README.md
```

Build and run:

```bash
docker build -t paracart-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://backend:8081 \
  -e NEXT_PUBLIC_ORDER_SERVICE_URL=http://backend:8082 \
  -e NEXT_PUBLIC_CART_SERVICE_URL=http://backend:8080 \
  paracart-frontend
```

### AWS Deployment (EC2)

1. **Launch EC2 Instance**
   - Select Ubuntu 22.04 LTS
   - Configure security groups to allow ports 80, 443
   - Create key pair for SSH access

2. **Connect and Setup**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   git clone https://github.com/yourusername/paracart-frontend.git
   cd paracart-frontend
   npm install
   npm run build
   ```

4. **Start Application with PM2**
   ```bash
   pm2 start npm --name "paracart" -- start
   pm2 startup
   pm2 save
   ```

5. **Setup Nginx as Reverse Proxy**
   ```bash
   sudo apt install nginx -y
   
   # Create Nginx config
   sudo nano /etc/nginx/sites-available/paracart
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/paracart /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

6. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d yourdomain.com
   ```

### Railway Deployment

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   railway init
   ```

3. **Add Environment Variables**
   ```bash
   railway variables set NEXT_PUBLIC_PRODUCT_SERVICE_URL=https://api.yourdomain.com/product
   railway variables set NEXT_PUBLIC_ORDER_SERVICE_URL=https://api.yourdomain.com/order
   railway variables set NEXT_PUBLIC_CART_SERVICE_URL=https://api.yourdomain.com/cart
   ```

4. **Deploy**
   ```bash
   railway up
   ```

## Environment Setup Checklist

- [ ] Backend services configured and running
- [ ] Environment variables set correctly
- [ ] CORS properly configured on backend
- [ ] Database connected to backend services
- [ ] SSL certificate installed (production)
- [ ] DNS records pointing to server
- [ ] CDN configured for static assets (optional)
- [ ] Monitoring and logging setup
- [ ] Backups configured
- [ ] Security headers added

## Performance Optimization

### Enable Static Generation
```typescript
// In your pages/products/[id]/page.tsx
export const revalidate = 3600; // Revalidate every hour
```

### Image Optimization
Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
  priority
/>
```

### Caching Headers
Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, must-revalidate',
        },
      ],
    },
  ];
}
```

## Monitoring and Logging

### Setup Application Monitoring
- Use Vercel Analytics for performance metrics
- Integrate Sentry for error tracking
- Monitor backend API health
- Setup alerts for critical errors

## Rollback Procedure

### Vercel
- Go to "Deployments" tab
- Click three dots on previous deployment
- Select "Promote to Production"

### Manual Deployments
```bash
# Stop current application
pm2 stop paracart

# Rollback to previous version
git revert HEAD
npm run build

# Start application
pm2 start paracart
```

## Post-Deployment Checklist

- [ ] Test all product listings
- [ ] Test cart functionality
- [ ] Complete test order flow
- [ ] Verify search functionality
- [ ] Check responsive design on mobile
- [ ] Test on different browsers
- [ ] Verify environment variables
- [ ] Monitor error logs
- [ ] Load test the application
- [ ] Security audit

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Support and Troubleshooting

For deployment issues, check:
1. Backend service logs
2. Application logs (`pm2 logs paracart`)
3. Nginx/proxy logs
4. Environment variables
5. Database connectivity
