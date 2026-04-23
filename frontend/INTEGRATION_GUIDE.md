# ParaCart Frontend - Integration Guide with AuthService (Port 8085)

## Quick Integration Checklist

- [ ] Verify AuthService is running on `http://localhost:8085`
- [ ] Test login endpoint
- [ ] Test registration endpoint
- [ ] Test token refresh
- [ ] Test OAuth Google integration
- [ ] Configure email notifications
- [ ] Deploy and test in production

## API Endpoint Mapping

Your frontend expects these endpoints from AuthService. Update them if your implementation differs.

### Authentication Endpoints (Port 8085)

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main St"
  }
}

Error (401):
{
  "message": "Invalid credentials",
  "error": "INVALID_CREDENTIALS"
}
```

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Jane Doe",
  "phone": "+1234567890",
  "address": "123 Main St"
}

Response (201):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "name": "Jane Doe",
    "phone": "+1234567890",
    "address": "123 Main St"
  }
}

Error (400):
{
  "message": "Email already exists",
  "error": "EMAIL_EXISTS"
}
```

#### Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response (200):
{
  "message": "Password reset link sent to your email"
}
```

#### Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "new_password": "newpassword123"
}

Response (200):
{
  "message": "Password reset successfully"
}

Error (400):
{
  "message": "Invalid or expired token",
  "error": "INVALID_TOKEN"
}
```

#### Refresh Token
```
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (200):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Error (401):
{
  "message": "Invalid refresh token",
  "error": "INVALID_TOKEN"
}
```

#### OAuth Google Callback
```
POST /api/auth/google
Content-Type: application/json

{
  "google_id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9..."
}

Response (200):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 3,
    "email": "user@gmail.com",
    "name": "User Name"
  }
}
```

## Frontend Code Integration

### 1. Update Auth Context

Edit `lib/auth-context.tsx` and update the API base URL:

```typescript
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8085/api/auth';
```

### 2. Login Flow Implementation

The login page at `/login` currently sends requests to:

```typescript
// Current implementation in app/login/page.tsx
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/auth/login`,
  { email, password }
);
```

Verify your AuthService endpoints match this path structure.

### 3. JWT Token Handling

The API client in `lib/api.ts` automatically:

```typescript
// Adds token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handles token expiration
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Attempt token refresh
      const refreshToken = localStorage.getItem('refresh_token');
      // Refresh logic...
    }
  }
);
```

### 4. OAuth Google Setup

In `/app/login/page.tsx`, implement Google OAuth:

```typescript
import { GoogleLogin } from '@react-oauth/google';

// Add to your login form
<GoogleLogin
  onSuccess={(credentialResponse) => {
    // Send credentialResponse.credential to backend
    // POST /api/auth/google with { google_id_token: credentialResponse.credential }
  }}
  onError={() => console.log('Login Failed')}
/>
```

## Email Integration

Your AuthService should send emails for:

### 1. Welcome Email (on registration)
- Subject: "Welcome to ParaCart"
- Content: Account confirmation, username, link to login

### 2. Login Notification Email
- Subject: "New login to your ParaCart account"
- Content: Device info, time, IP address, suspicious activity warning

### 3. Password Reset Email
- Subject: "Reset your ParaCart password"
- Content: Reset link with token (valid for 24 hours)

### 4. Re-login Confirmation Email
- Subject: "Confirm your login to ParaCart"
- Content: One-time verification code or confirmation link

## Testing the Integration

### Test 1: Basic Login/Register Flow

```bash
# Start frontend
cd frontend && npm run dev

# Visit http://localhost:3000/register
# Fill in form and submit
# Should redirect to dashboard after successful registration

# Visit http://localhost:3000/login
# Login with test credentials
# Should show user dashboard
```

### Test 2: Token Refresh

```bash
# Open browser DevTools console
# After login, check localStorage:
localStorage.getItem('access_token')
localStorage.getItem('refresh_token')

# Both should be present
# Token should be JWT format: header.payload.signature
```

### Test 3: Protected Routes

```bash
# Logout and try to access /dashboard
# Should redirect to /login

# Login and access /dashboard
# Should show user info and orders
```

### Test 4: Password Reset

```bash
# Visit http://localhost:3000/forgot-password
# Enter email and submit
# Check email for reset link
# Click link and reset password
# Login with new password
```

## Troubleshooting Integration

### Issue: "Cannot POST /api/auth/login"
**Solution**: Check that AuthService is running on port 8085
```bash
# Test endpoint
curl http://localhost:8085/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

### Issue: "CORS error when logging in"
**Solution**: Enable CORS in your Spring Boot AuthService:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

### Issue: "Token not refreshing automatically"
**Solution**: Check that refresh endpoint returns new access_token:
```bash
curl http://localhost:8085/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"your_refresh_token"}'
```

### Issue: "Login page not showing OAuth button"
**Solution**: Add Google OAuth credentials to login page:
1. Get Google Client ID from Google Cloud Console
2. Wrap app with `GoogleOAuthProvider`
3. Add `GoogleLogin` component

## Environment Variables Reference

```env
# AuthService Configuration
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8085

# Product Service
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8081

# Cart Service  
NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8082

# Order Service
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:8083

# Optional: Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

## Security Best Practices

### 1. Token Storage
- Tokens stored in localStorage for demo purposes
- For production, consider httpOnly cookies or secure storage

### 2. HTTPS
- Always use HTTPS in production
- Never send tokens over unencrypted connections

### 3. Token Expiration
- Access tokens should expire in 15-30 minutes
- Refresh tokens should expire in 7-30 days

### 4. Password Policy
- Enforce strong password requirements
- Minimum 8 characters, uppercase, lowercase, numbers, special chars

### 5. Rate Limiting
- Limit login attempts (e.g., 5 attempts per 15 minutes)
- Implement CAPTCHA after failed attempts

## API Response Standards

All endpoints should follow this response format:

```typescript
// Success Response
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

## Performance Optimization

### Caching Strategy
- Product list: Cache for 5 minutes
- Product details: Cache for 10 minutes
- User profile: Cache for 1 minute
- Clear cache on logout

### API Call Optimization
- Batch related requests where possible
- Paginate large data sets
- Implement request debouncing for search

## Monitoring & Logging

The frontend logs API interactions. For production:

```typescript
// In lib/api.ts
if (process.env.NODE_ENV === 'development') {
  console.log('[API]', method, url, data);
}
```

Enable structured logging for production deployment.

---

**Last Updated**: April 2026
**Frontend Version**: 1.0.0
**Ready for**: AuthService Integration on Port 8085
