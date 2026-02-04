# Authentication Flow Documentation

## Overview

This Shopify Embedded App uses a secure, token-based authentication system that follows Shopify's best practices for embedded apps. The authentication flow ensures that all API requests are properly authenticated and that expired or invalid sessions are handled gracefully.

## Architecture

### Frontend (`apps/admin-ui`)

#### AppBridge Provider
Location: `apps/admin-ui/src/context/appBridge.tsx`

The AppBridge Provider sets up the Shopify App Bridge connection:
```typescript
<AppBridgeProvider config={appBridgeConfig}>
  <AppContent config={config} />
</AppBridgeProvider>
```

#### useAuthenticatedFetch Hook
Location: `apps/admin-ui/src/hooks/useAuthenticatedFetch.ts`

This custom React hook provides authenticated fetch functionality:

**Key Features:**
1. **Session Token Retrieval**: Uses `getSessionToken(app)` from `@shopify/app-bridge/utilities`
2. **Authorization Header**: Automatically adds `Authorization: Bearer ${token}` to API requests
3. **Same-Origin Detection**: Only applies authentication to `/api/*` routes on the same origin
4. **401 Error Handling**: Detects specific error messages and redirects to OAuth when needed

**Usage:**
```typescript
const authenticatedFetch = useAuthenticatedFetch();
const response = await authenticatedFetch('/api/shop');
```

**Error Cases Handled:**
- "App not installed"
- "Invalid Shopify session token"
- "Missing Authorization"

### Backend (`apps/control-plane`)

#### Session Token Verification
Location: `apps/control-plane/src/lib/shopifySessionToken.ts`

The backend verifies Shopify session tokens using HMAC-SHA256 signature validation:

**Key Features:**
1. **JWT Validation**: Verifies the JWT structure and signature
2. **Audience Check**: Ensures the token is for this app (matches `SHOPIFY_API_KEY`)
3. **Expiration Check**: Validates token hasn't expired
4. **Clock Skew Tolerance**: Allows 60 seconds of clock skew to prevent intermittent failures
5. **Signature Verification**: Uses HMAC-SHA256 with `SHOPIFY_API_SECRET`

#### Authentication Middleware
Location: `apps/control-plane/src/index.ts:302-321`

The `requireShopifySession` function:
```typescript
async function requireShopifySession(c: any): Promise<ShopifySessionPayload | Response> {
  const auth = c.req.header('Authorization') || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return c.json({ error: 'Missing Authorization: Bearer <token>' }, 401);
  }
  const token = m[1];

  let payload: ShopifySessionPayload;
  try {
    payload = await verifyShopifySessionToken(
      token,
      c.env.SHOPIFY_API_KEY,
      c.env.SHOPIFY_API_SECRET
    );
  } catch {
    return c.json({ error: 'Invalid Shopify session token' }, 401);
  }
  return payload;
}
```

## Authentication Flow

### 1. Initial Load
```
User opens app in Shopify Admin
  ↓
App loads with `shop` and `host` query parameters
  ↓
AppBridge initializes with apiKey and host
  ↓
App loads config from `/api/config` (unauthenticated)
  ↓
AppBridgeProvider wraps the application
```

### 2. Authenticated API Call
```
Component calls useAuthenticatedFetch()
  ↓
Hook calls getSessionToken(app)
  ↓
AppBridge returns fresh session token
  ↓
Hook adds Authorization: Bearer ${token} header
  ↓
Request sent to backend
  ↓
Backend validates token signature
  ↓
Backend checks shop installation status
  ↓
Response returned to frontend
```

### 3. Token Refresh (Automatic)
```
User makes API call
  ↓
getSessionToken(app) is called
  ↓
AppBridge automatically refreshes expired tokens
  ↓
New token returned to hook
  ↓
Request proceeds with fresh token
```

### 4. OAuth Redirect (401 Error)
```
API returns 401 Unauthorized
  ↓
Hook parses error message
  ↓
If error indicates auth issue:
  ↓
Hook calls redirectToAuth()
  ↓
Redirect.create(app).dispatch(Redirect.Action.REMOTE, authUrl)
  ↓
User redirected to OAuth flow
  ↓
After OAuth completion:
  ↓
User returned to app with fresh session
```

## API Routes

### Unauthenticated Routes
- `GET /api/config` - Returns app configuration

### Authenticated Routes (Require Session Token)
- `GET /api/shop` - Returns shop information
- `GET /api/applepay/status` - Returns Apple Pay status for a domain
- `GET /api/applepay/domains` - Lists all domains for the shop
- `POST /api/applepay/onboard` - Onboards a new domain

## Security Considerations

1. **Session Tokens are Short-Lived**: Shopify session tokens expire quickly (typically 1 hour)
2. **Clock Skew Tolerance**: 60-second window to prevent intermittent failures
3. **HMAC Signature Verification**: All tokens verified with HMAC-SHA256
4. **Audience Check**: Tokens validated against app's API key
5. **Installation Check**: Backend verifies app is installed for the shop
6. **Same-Origin Policy**: Frontend only sends tokens to same-origin API routes

## Error Handling

### Frontend Errors
- **Token Retrieval Failure**: Redirects to OAuth
- **401 Unauthorized**: Checks error message and redirects to OAuth if needed
- **Network Errors**: Standard fetch error handling

### Backend Errors
- **Missing Authorization Header**: Returns 401 with error message
- **Invalid Token Signature**: Returns 401 with error message
- **Expired Token**: Returns 401 with error message
- **App Not Installed**: Returns 401 with error message

## Testing

### Frontend Testing
```bash
cd apps/admin-ui
npm run lint   # Run linter
npm run build  # Build for production
```

### Backend Testing
```bash
cd apps/control-plane
npm run build  # Generate types and validate
```

## Troubleshooting

### Common Issues

1. **401 Errors on All Routes**
   - Check that `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET` are correctly set
   - Verify the app is installed for the shop
   - Check that session tokens are being sent in Authorization header

2. **Intermittent 401 Errors**
   - May be caused by clock skew - verify server time is accurate
   - Check network latency if tokens are expiring during transit

3. **OAuth Loop**
   - Verify OAuth callback URL is correctly configured
   - Check that installation was successful

## References

- [Shopify App Bridge Documentation](https://shopify.dev/docs/api/app-bridge)
- [Shopify Session Tokens](https://shopify.dev/docs/apps/auth/oauth/session-tokens)
- [Shopify Embedded Apps](https://shopify.dev/docs/apps/build/online-store)
