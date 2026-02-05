#!/bin/bash
# Smoke test script for critical API endpoints
# Usage: ./smoke-test-api.sh <base-url>
# Example: ./smoke-test-api.sh http://localhost:8787
# Example: ./smoke-test-api.sh https://pcnaid-edge.com

BASE_URL="${1:-http://localhost:8787}"

echo "🧪 Smoke Testing API Endpoints at $BASE_URL"
echo ""

# Track failures
FAILURES=0

# Test helper
test_endpoint() {
  local method=$1
  local path=$2
  local expected_status=$3
  local description=$4
  local headers=$5
  
  echo -n "Testing $method $path ($description)... "
  
  if [ -n "$headers" ]; then
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$path" -H "$headers" 2>/dev/null)
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$path" 2>/dev/null)
  fi
  
  status=$(echo "$response" | tail -n 1)
  body=$(echo "$response" | sed '$d')
  
  if [ "$status" = "$expected_status" ]; then
    echo "✅ PASS (HTTP $status)"
    # Check if response is valid JSON
    if echo "$body" | jq . >/dev/null 2>&1; then
      echo "  └─ Valid JSON response"
    fi
  else
    echo "❌ FAIL (Expected HTTP $expected_status, got HTTP $status)"
    echo "  Response body: $body"
    FAILURES=$((FAILURES + 1))
  fi
  echo ""
}

# Test 1: /api/shop without authentication should return 401 (not 500)
test_endpoint "GET" "/api/shop" "401" "Shop endpoint without auth" "Accept: application/json"

# Test 2: /api/applepay/domains without authentication should return 401 (not 500)
test_endpoint "GET" "/api/applepay/domains" "401" "Domains endpoint without auth" "Accept: application/json"

# Test 3: /api/config should return 200 and valid JSON
test_endpoint "GET" "/api/config" "200" "Public config endpoint" "Accept: application/json"

# Test 4: /.well-known path should return 200
test_endpoint "GET" "/.well-known/apple-developer-merchantid-domain-association" "200" "Apple verification file"

# Test 5: /auth should return appropriate response
test_endpoint "GET" "/auth?shop=test.myshopify.com" "302" "Auth redirect"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FAILURES -eq 0 ]; then
  echo "✅ All smoke tests passed!"
  exit 0
else
  echo "❌ $FAILURES test(s) failed"
  exit 1
fi
