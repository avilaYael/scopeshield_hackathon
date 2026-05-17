# Pull Request: Frontend Internationalization & Compiler Memory Fix

## 📋 Description

This PR addresses critical frontend issues that were blocking the hackathon demo:
1. **Memory Crash Fix**: Resolved "Fatal process out of memory" errors during Next.js compilation
2. **Spanish to English Translation**: Converted all hardcoded Spanish UI strings to English
3. **Type System Update**: Updated TypeScript types to use English severity/complexity values

## 🔑 Key Changes

### Frontend Changes
- **`frontend/lib/mockData.ts`** (516 lines)
  - Translated 3 complete mock scenarios (Google OAuth, Stripe Payments, Dark Mode)
  - Converted all Spanish strings: request summaries, hidden scope items, risks, questions, checklists
  
- **`frontend/types/scopeContract.ts`**
  - Updated type definitions: `'Baja' | 'Media' | 'Alta'` → `'Low' | 'Medium' | 'High'`
  
- **`frontend/components/dashboard/ImpactedAreas.tsx`**
  - Updated `getComplexityVariant()` to check for English values
  
- **`frontend/components/dashboard/TechnicalRisks.tsx`**
  - Updated `getSeverityVariant()` and sorting logic for English values

- **`frontend/next.config.ts`**
  - Removed problematic `turbopack.root` configuration
  - Added webpack `watchOptions` to exclude `backend/` directory from file watching

- **`frontend/package.json`**
  - Increased Node memory limit to 4GB: `"dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev --turbopack"`

### Backend Changes
- **`backend/services/bob_service.py`**
  - Refactored system prompt from Spanish to English
  - Added strict unilingual English boundary enforcement
  - Added mathematical validation rules for estimates
  - Added checklist-to-roadmap parity enforcement

- **`backend/services/mock_service.py`**
  - Added "theme" category with dark mode keywords
  - Updated all mock data generators to handle theme category

## ✅ Verification

### Before
- ❌ Frontend dev server crashed with "Fatal process out of memory"
- ❌ All UI displayed Spanish text (badges, labels, descriptions)
- ❌ TypeScript compilation errors (21 type mismatches)
- ❌ Dark mode requests returned incorrect Performance/Caching data

### After
- ✅ Frontend compiles successfully without memory errors
- ✅ All UI displays English text consistently
- ✅ Zero TypeScript compilation errors
- ✅ Dark mode requests return correct theme-related data
- ✅ Badge colors correctly mapped to English severity levels
- ✅ Risk sorting works with English values

### Testing Steps
1. Start frontend dev server: `cd frontend && npm run dev`
2. Verify no compilation errors or memory crashes
3. Navigate to dashboard and verify all text is in English
4. Check that severity badges display correct colors (High=red, Medium=yellow, Low=green)
5. Test with different mock scenarios (OAuth, Stripe, Dark Mode)

## 🚨 Breaking Changes

**BREAKING CHANGE**: All frontend UI strings now display in English instead of Spanish. This affects:
- Mock data contracts
- TypeScript type definitions
- Component logic for severity/complexity mapping

## 📊 Impact

- **Files Changed**: 8
- **Lines Added**: 624
- **Lines Removed**: 133
- **Net Change**: +491 lines

## 🎯 Related Issues

Fixes memory crash issue during Turbopack compilation
Resolves Spanish UI text in hackathon demo