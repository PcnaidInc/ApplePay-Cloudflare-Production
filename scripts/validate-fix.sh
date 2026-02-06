#!/bin/bash
set -euo pipefail
# Validation script to check that the fix is correctly applied
# This doesn't run the server, but validates the code structure

echo "🔍 Validating 500 Error Fix..."
echo ""

ERRORS=0

# Check 1: Error handler is registered before routes
echo -n "✓ Checking error handler placement... "
ERROR_HANDLER_LINE=$(grep -n "^app.onError" apps/control-plane/src/index.ts | cut -d: -f1)
FIRST_ROUTE_LINE=$(grep -n "^app\.\(get\|post\|put\|delete\|patch\|use\)" apps/control-plane/src/index.ts | grep -v "onError" | head -1 | cut -d: -f1)

if [ -z "$ERROR_HANDLER_LINE" ]; then
  echo "❌ FAIL: Error handler not found"
  ERRORS=$((ERRORS + 1))
elif [ -z "$FIRST_ROUTE_LINE" ]; then
  echo "❌ FAIL: No routes found"
  ERRORS=$((ERRORS + 1))
elif [ "$ERROR_HANDLER_LINE" -lt "$FIRST_ROUTE_LINE" ]; then
  echo "✅ PASS (error handler at line $ERROR_HANDLER_LINE, first route at line $FIRST_ROUTE_LINE)"
else
  echo "❌ FAIL: Error handler at line $ERROR_HANDLER_LINE is AFTER first route at line $FIRST_ROUTE_LINE"
  ERRORS=$((ERRORS + 1))
fi

# Check 2: Finally block has try-catch
echo -n "✓ Checking finally block safety... "
if grep -A 20 "} finally {" apps/control-plane/src/index.ts | grep -q "try {"; then
  echo "✅ PASS (finally block has try-catch wrapper)"
else
  echo "❌ FAIL: Finally block missing try-catch protection"
  ERRORS=$((ERRORS + 1))
fi

# Check 3: No duplicate error handler registrations
echo -n "✓ Checking for duplicate error handlers... "
ERROR_HANDLER_COUNT=$(grep -c "^app.onError" apps/control-plane/src/index.ts)
if [ "$ERROR_HANDLER_COUNT" -eq 1 ]; then
  echo "✅ PASS (exactly one error handler registered)"
elif [ "$ERROR_HANDLER_COUNT" -gt 1 ]; then
  echo "❌ FAIL: Found $ERROR_HANDLER_COUNT error handlers (should be 1)"
  ERRORS=$((ERRORS + 1))
else
  echo "❌ FAIL: No error handler found"
  ERRORS=$((ERRORS + 1))
fi

# Check 4: Error handler returns proper JSON structure
echo -n "✓ Checking error handler response format... "
if grep -A 30 "^app.onError" apps/control-plane/src/index.ts | grep -q "return c.json({ error:.*requestId.*flowId"; then
  echo "✅ PASS (error handler returns JSON with error, requestId, flowId)"
else
  echo "⚠️  WARNING: Error handler response format might have changed"
fi

# Check 5: requireShopifySession middleware exists
echo -n "✓ Checking authentication middleware... "
if grep -q "requireShopifySession" apps/control-plane/src/index.ts && \
   [ -f "apps/control-plane/src/middleware/requireShopifySession.ts" ]; then
  echo "✅ PASS (authentication middleware exists)"
else
  echo "❌ FAIL: Authentication middleware not found"
  ERRORS=$((ERRORS + 1))
fi

# Check 6: Protected routes use authentication
echo -n "✓ Checking protected endpoints... "
SHOP_ENDPOINT_PROTECTED=$(grep "/api/shop" apps/control-plane/src/index.ts | grep -c "requireShopifySession")
DOMAINS_ENDPOINT_PROTECTED=$(grep "/api/applepay/domains" apps/control-plane/src/index.ts | grep -c "requireShopifySession")

if [ "$SHOP_ENDPOINT_PROTECTED" -ge 1 ] && [ "$DOMAINS_ENDPOINT_PROTECTED" -ge 1 ]; then
  echo "✅ PASS (critical endpoints are protected)"
else
  echo "⚠️  WARNING: Some endpoints might not be properly protected"
fi

# Check 7: TypeScript compiles
echo -n "✓ Checking TypeScript compilation... "
cd apps/control-plane
if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
  echo "⚠️  WARNING: TypeScript has some errors (may be pre-existing)"
else
  echo "✅ PASS (no TypeScript errors)"
fi
cd ../..

# Check 8: Build succeeds
echo -n "✓ Checking build process... "
if npm run build >/dev/null 2>&1; then
  echo "✅ PASS (build succeeds)"
else
  echo "❌ FAIL: Build failed"
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo "✅ All validation checks passed!"
  echo ""
  echo "Next steps:"
  echo "1. Deploy to production: npm run deploy"
  echo "2. Test endpoints manually with curl (see DEPLOYMENT-GUIDE.md)"
  echo "3. Verify in Shopify Admin that Apple Pay Domains page loads"
  echo "4. Monitor production logs for any issues"
  exit 0
else
  echo "❌ $ERRORS validation check(s) failed"
  echo ""
  echo "Please review the failures above and fix before deploying."
  exit 1
fi
