# Fix for 500 Errors: "Cannot read properties of undefined (reading 'duration')"

## Problem
The Cloudflare Worker API was crashing with `500 Internal Server Error` on endpoints:
- `GET /api/applepay/domains`
- `GET /api/shop`

Error message: `TypeError: Cannot read properties of undefined (reading 'duration')`

## Root Cause
The error handler (`app.onError`) was registered **after** all the route definitions in `apps/control-plane/src/index.ts`. In Hono (the framework used), error handlers must be registered **before** routes to properly catch errors thrown by those routes.

### Before (Incorrect):
```typescript
// Line 221
const app = new Hono<{ Bindings: Env; Variables: ObsVars }>();

// Line 228-1098: All route definitions
app.use('*', async (c, next) => { ... });
app.get('/api/shop', ...);
app.get('/api/applepay/domains', ...);
// ... more routes

// Line 1160: Error handler registered AFTER routes ❌
app.onError((err, c) => { ... });
```

When errors occurred in routes (like authentication failures, validation errors, or exceptions), they were not caught by the custom error handler. Instead, they fell through to a default handler that may have tried to access undefined properties, causing the "duration" error.

### After (Correct):
```typescript
// Line 221
const app = new Hono<{ Bindings: Env; Variables: ObsVars }>();

// Line 228: Error handler registered BEFORE routes ✅
app.onError((err, c) => { ... });

// Line 263-1098: All route definitions
app.use('*', async (c, next) => { ... });
app.get('/api/shop', ...);
app.get('/api/applepay/domains', ...);
// ... more routes
```

## Additional Safety Improvements

### Finally Block Protection
Added try-catch wrapper around the finally block in the request tracking middleware to prevent errors in cleanup code from masking the original error:

```typescript
} finally {
  try {
    // Correlation headers back to the client
    c.header('x-request-id', requestId);
    c.header('x-flow-id', flowId);

    // Compact latency hint (shows up in browser devtools timing tab)
    const duration = Date.now() - started;
    c.header('server-timing', `worker;dur=${duration}`);

    logEvent(c, 'info', 'request.complete', {
      status: c.res?.status ?? null,
      durationMs: duration,
    });
  } catch (finallyErr) {
    // Log but don't throw - finally block errors can mask the original error
    console.error('Error in finally block:', safeError(finallyErr));
  }
}
```

## Expected Behavior After Fix

### Before Fix:
- `/api/shop` without auth → **500 Internal Server Error**
- `/api/applepay/domains` without auth → **500 Internal Server Error**
- Error message: "Cannot read properties of undefined (reading 'duration')"

### After Fix:
- `/api/shop` without auth → **401 Unauthorized** with JSON: `{ error: "Missing Authorization: Bearer <token>" }`
- `/api/applepay/domains` without auth → **401 Unauthorized** with JSON: `{ error: "Missing Authorization: Bearer <token>" }`
- With valid auth → **200 OK** with appropriate data

## Testing

To verify the fix works in production:

1. **Test unauthenticated requests** (should return 401, not 500):
   ```bash
   curl -H "Accept: application/json" https://pcnaid-edge.com/api/shop
   # Expected: HTTP 401 with JSON error
   
   curl -H "Accept: application/json" https://pcnaid-edge.com/api/applepay/domains
   # Expected: HTTP 401 with JSON error
   ```

2. **Test authenticated requests** (should return 200):
   ```bash
   curl -H "Accept: application/json" \
        -H "Authorization: Bearer <valid-shopify-token>" \
        https://pcnaid-edge.com/api/shop
   # Expected: HTTP 200 with shop info
   ```

3. **Verify in Shopify Admin**:
   - Navigate to Apps → Verify ApplePay → Apple Pay Domains
   - Page should load without "Internal error"
   - No more 500 errors in browser DevTools Network tab

## Files Changed
- `apps/control-plane/src/index.ts`:
  - Moved `app.onError` handler from line 1160 to line 228 (before routes)
  - Added try-catch protection in finally block (lines 296-317)

## Related Documentation
- [Hono Error Handling](https://hono.dev/api/hono#error-handling)
- [Hono Middleware Order](https://hono.dev/api/hono#middleware)
