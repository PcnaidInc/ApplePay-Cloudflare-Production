# Apple Pay Domain Portal - Implementation Summary

## Overview
This implementation replaces the basic single-domain UI with a comprehensive multi-domain management portal for Apple Pay integration in the Shopify app.

## Backend Changes (Control Plane)

### New API Endpoints

#### 1. GET /api/domains
Lists all domains configured for the authenticated shop.
- **Response**: `{ domains: DomainListItem[] }`
- **Features**: Returns domain, status, error messages, Cloudflare status, SSL status, and timestamps

#### 2. POST /api/domains/scan
Scans a domain to detect registrar and Domain Connect support.
- **Request**: `{ domain: string }`
- **Response**: `{ registrar: string | null, supported: boolean, domainConnectUrl: string | null }`
- **Note**: Currently stubbed for future Domain Connect integration

#### 3. POST /api/domains/onboard
Onboards a new domain with immediate Apple Pay registration attempt.
- **Request**: `{ domain: string }`
- **Response**: `DomainListItem`
- **Key Feature**: NO PREFLIGHT CHECKS - attempts Apple registration immediately as required
- **Flow**:
  1. Validates domain (no .myshopify.com domains)
  2. Creates/finds Cloudflare Custom Hostname
  3. Stores domain in database with PENDING status
  4. Immediately attempts Apple merchant registration
  5. Updates status based on Apple response (VERIFIED or ERROR)

#### 4. GET /api/domains/:domain/details
Retrieves detailed information about a specific domain.
- **Response**: Full domain details including DNS instructions, Cloudflare IDs, registrar info
- **Features**: Shows CNAME configuration, SSL status, error messages, last checked time

### Database Changes

#### Added Function: `getMerchantDomainsByShop`
Returns all domains for a shop (not just the most recent one), enabling multi-domain support.

#### Updated Types
- Added `created_at` and `updated_at` fields to `MerchantDomainRow`
- New API response types for domain lists and details

### Helper Functions

#### Status Mapping
- `toDomainListItem`: Converts DB row to API response, mapping PENDING → IN_PROCESS for UI clarity
- `toDomainDetails`: Includes DNS instructions and registrar info
- `detectRegistrar`: Stubbed function for future registrar detection

## Frontend Changes (Admin UI)

### New UI Structure

#### 1. Page Header
- Title: "Apple Pay Domain Portal"
- Subtitle: Shop name and domain
- Primary Action: "Add Domain" button (top-right)

#### 2. Domains Table (IndexTable)
Displays all configured domains with:
- **Domain Column**: Domain name
- **Status Column**: Color-coded badge
  - Success (green): Registered/Completed
  - Info (blue): In Process/Pending
  - Attention (yellow): DNS Not Configured
  - Critical (red): Error
  - Warning (orange): Unregistered
- **Actions Column**: 
  - "View CNAME" button
  - "Details" button
  - "Retry" button (only for error status)

Empty state shown when no domains are configured.

#### 3. Add Domain Modal - Step 1
- Domain input field with validation
- Suggested domains section:
  - Shows shop's primary domain as a clickable suggestion
  - Clicking fills the input field
- "Next" button (disabled until valid domain entered)
- "Cancel" button

#### 4. Add Domain Modal - Step 2
**Manual DNS Configuration Section:**
- Card displaying CNAME record details:
  - Type: CNAME
  - Host: Domain name
  - Target: App's CNAME target
  - Note about ALIAS/ANAME for apex domains
- Checkbox: "I have added the CNAME record"

**Domain Connect Section:**
- Automatic scan of domain when step 2 opens
- If supported:
  - "Connect DNS Automatically" button
  - Opens Domain Connect URL in new window
  - Detects success via query parameter
- If not supported:
  - Shows "not available" message

**Submit Button:**
- Disabled by default
- Enabled when EITHER:
  - Manual DNS checkbox is checked, OR
  - Domain Connect success flag is set
- On submit:
  - Calls POST /api/domains/onboard
  - Closes modal immediately
  - Shows "onboarding started" toast
  - Domain appears in table with "In Process" status

#### 5. Domain Details Modal
Comprehensive information panel showing:
- Domain name
- Status badge
- Last error message (if any)
- Last checked timestamp
- Apple Merchant ID (if registered)
- Cloudflare Hostname ID
- Cloudflare hostname status
- SSL status
- **CNAME Configuration card** with Type, Host, Target, and note

### Auto-Polling Feature
- Refreshes domain list every 5 seconds
- Updates status badges in real-time
- No user action required
- Status changes visible immediately:
  - In Process → Registered/Completed (success)
  - In Process → Error (failure)

### User Experience Improvements

1. **Toast Notifications**: Success and error messages for all actions
2. **Loading States**: Spinners during API calls
3. **Disabled States**: Buttons disabled appropriately during operations
4. **Validation**: Domain format validation before allowing submission
5. **Retry Functionality**: One-click retry for failed domains
6. **Responsive Design**: Uses Polaris components for consistent Shopify look

## Technical Implementation Details

### React Hooks Used
- `useState`: Component state management
- `useEffect`: API calls, auto-polling, initial load
- `useMemo`: App Bridge initialization, memoized fetch
- `useCallback`: Optimized function definitions (apiJson, reauthenticate, refresh)

### Key Features
1. **Shopify App Bridge Integration**: Proper authentication with session tokens
2. **Error Handling**: Comprehensive error catching and user feedback
3. **Type Safety**: Full TypeScript typing for all API responses and components
4. **Polaris Components**: Native Shopify design system components
5. **Auto-Refresh**: Background polling without blocking UI

### Security Considerations
- All API calls require Shopify session token authentication
- Domain validation prevents invalid entries
- Error messages don't expose sensitive information
- HTTPS-only CNAME targets

## Testing Checklist

✅ Backend API endpoints compile and type-check
✅ Frontend UI builds successfully
✅ ESLint passes with no errors or warnings
✅ Multi-domain database queries implemented
✅ Status mapping logic correct
✅ Auto-polling configured (5-second interval)
✅ Modal workflow complete (2 steps)
✅ Domain validation implemented
✅ Toast notifications functional
✅ Retry functionality present

## Deployment Notes

### Build Commands
```bash
# Build admin UI
npm -w apps/admin-ui run build

# Generate control-plane types
npm -w apps/control-plane run build

# Deploy both
npm run deploy
```

### Environment Variables Required
- `CF_SAAS_CNAME_TARGET`: Used in DNS instructions
- All existing Shopify, Apple, and Cloudflare credentials

### Database Schema
No migration required - existing schema already supports:
- Multiple domains per shop
- created_at/updated_at timestamps
- All necessary status fields

## Future Enhancements

1. **Domain Connect Integration**: Complete the registrar detection and Domain Connect flow
2. **Bulk Operations**: Add/remove multiple domains at once
3. **Domain Search**: Filter/search in the domains table
4. **Export Data**: Download domain configuration as CSV
5. **Notifications**: Email alerts for status changes
6. **Analytics**: Track domain onboarding success rates

## Files Modified

- `apps/control-plane/src/index.ts` - Added 4 new API endpoints, helper functions
- `apps/control-plane/src/lib/db.ts` - Added getMerchantDomainsByShop, updated types
- `apps/admin-ui/src/App.tsx` - Complete rewrite with new portal UI
- `package-lock.json` - Dependencies updated

## Lines of Code
- Backend: +286 lines
- Frontend: +696 lines (significant rewrite)
- Database: +11 lines
- Total: ~1,000 lines of new/modified code
