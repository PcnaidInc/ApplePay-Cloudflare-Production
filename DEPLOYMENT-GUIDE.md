# 500 Error Fix - Summary and Verification

## Issue
Production API endpoints returning 500 errors with:
```
TypeError: Cannot read properties of undefined (reading 'duration')
```

Affected endpoints:
- `GET /api/applepay/domains`
- `GET /api/shop`

User impact: Shopify Admin "Apple Pay Domains" page showed "Internal error" and auto-refreshed every ~5 seconds.

## Root Cause Analysis

### Primary Issue: Error Handler Registration Order
In Hono framework, `app.onError()` **must** be registered **before** route definitions. The error handler was incorrectly placed at the end of the file (line 1160), after all routes were registered (lines 228-1098).

**Why this caused 500 errors:**
When routes threw errors (e.g., authentication failures, validation errors), they were not caught by the custom error handler. The default error handler may have attempted to serialize error objects or access properties that didn't exist, leading to the "Cannot read properties of undefined (reading 'duration')" error.

### Secondary Issue: Finally Block Safety
The finally block in the request tracking middleware could potentially throw errors when setting headers (e.g., if response object is in an unexpected state). These errors would mask the original route error, making debugging difficult.

## Solution Implemented

### 1. Moved Error Handler (Critical Fix)
```diff
 const app = new Hono<{ Bindings: Env; Variables: ObsVars }>();

 const WELL_KNOWN_PATH = '/.well-known/apple-developer-merchantid-domain-association';
 const DEFAULT_VERIFICATION_KV_KEY = 'applepay:partner-verification-file';
 const OAUTH_STATE_COOKIE = '__applepay_oauth_state';

+// Error handler must be registered BEFORE routes
+app.onError((err, c) => {
+  logEvent(c, 'error', 'unhandled.exception', { error: safeError(err) });
+  // ... error handling logic
+  return c.json({ error: 'Internal error', msg: String(err), requestId, flowId }, 500);
+});
+
 // Global middleware for request tracking and correlation
 app.use('*', async (c, next) => {
   // ...
 });

 // All route definitions follow...
 app.get('/api/shop', requireShopifySession, async (c) => { ... });
 app.get('/api/applepay/domains', requireShopifySession, async (c) => { ... });

-// Error handler was here (WRONG - too late!)
-app.onError((err, c) => { ... });
```

### 2. Protected Finally Block (Defensive Fix)
```diff
   } finally {
+    try {
       // Correlation headers back to the client
       c.header('x-request-id', requestId);
       c.header('x-flow-id', flowId);

-      c.header('server-timing', `worker;dur=${Date.now() - started}`);
+      const duration = Date.now() - started;
+      c.header('server-timing', `worker;dur=${duration}`);

       logEvent(c, 'info', 'request.complete', {
         status: c.res?.status ?? null,
-        durationMs: Date.now() - started,
+        durationMs: duration,
       });
+    } catch (finallyErr) {
+      // Log but don't throw - finally block errors can mask the original error
+      console.error('Error in finally block:', safeError(finallyErr));
+    }
   }
```

## Verification Steps

### 1. Local Verification (if possible)
```bash
# Start local dev server
npm run dev

# In another terminal, run smoke tests
./scripts/smoke-test-api.sh http://localhost:8787
```

### 2. Production Verification

#### Test unauthenticated requests (should return 401, not 500):
```bash
# Test /api/shop
curl -i -H "Accept: application/json" https://pcnaid-edge.com/api/shop

# Expected:
# HTTP/1.1 401 Unauthorized
# Content-Type: application/json
# X-Shopify-Retry-Invalid-Session-Request: 1
# {"error":"Missing Authorization: Bearer <token>"}

# Test /api/applepay/domains
curl -i -H "Accept: application/json" https://pcnaid-edge.com/api/applepay/domains

# Expected:
# HTTP/1.1 401 Unauthorized
# Content-Type: application/json
# X-Shopify-Retry-Invalid-Session-Request: 1
# {"error":"Missing Authorization: Bearer <token>"}
```

#### Test in Shopify Admin:
1. Navigate to: Shopify Admin → Apps → **Verify ApplePay** → **Apple Pay Domains**
2. **Expected**: Page loads successfully
3. **Expected**: No "Internal error" message
4. **Expected**: No 500 errors in browser DevTools Network tab
5. **Expected**: Either shows domains or a proper "no domains" state

### 3. Monitor Production Logs
After deployment, check Cloudflare Worker logs:
```bash
wrangler tail
```

Look for:
- ✅ No more `Cannot read properties of undefined (reading 'duration')` errors
- ✅ Proper 401 responses when auth is missing
- ✅ `unhandled.exception` logs for any actual errors (should be rare)
- ✅ `request.complete` logs for successful requests

### 4. Error Scenarios to Test

| Scenario | Expected Status | Expected Response |
|----------|----------------|-------------------|
| No Authorization header | 401 | `{"error":"Missing Authorization: Bearer <token>"}` |
| Invalid/expired token | 401 | `{"error":"Invalid Shopify session token: ..."}` |
| Valid token, uninstalled app | 401 | `{"error":"App not installed for this shop"}` |
| Valid token, valid shop | 200 | Shop info or domains list |

## Success Criteria

- [x] Code compiles without TypeScript errors
- [x] Error handler is positioned before all routes
- [x] Finally block has try-catch protection
- [x] Documentation created
- [x] Smoke test script created
- [ ] Deployed to production
- [ ] Verified `/api/shop` returns 401 (not 500) when unauthenticated
- [ ] Verified `/api/applepay/domains` returns 401 (not 500) when unauthenticated
- [ ] Verified Shopify Admin "Apple Pay Domains" page loads without errors
- [ ] No more "duration" errors in production logs

## Rollback Plan
If issues arise after deployment:

1. Revert the commit:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. Redeploy previous version:
   ```bash
   npm run deploy
   ```

The changes are minimal and surgical, so rollback risk is low.

## Related Files
- `apps/control-plane/src/index.ts` - Main fix
- `docs/FIX-500-ERRORS.md` - Detailed technical documentation
- `scripts/smoke-test-api.sh` - Automated smoke tests
- `DEPLOYMENT-GUIDE.md` - This file

## References
- [Hono Error Handling Documentation](https://hono.dev/api/hono#error-handling)
- [Hono Middleware Order](https://hono.dev/api/hono#middleware)
- GitHub Issue: PcnaidInc/ApplePay-Cloudflare-Production#7
