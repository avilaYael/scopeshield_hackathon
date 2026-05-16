# Backend Integration Guide

This guide explains how to connect the ScopeShield frontend to the backend API.

## Current State: Mock Data

The frontend is currently using mock data from `lib/mockData.ts`. This allows independent development and testing.

## Backend API Endpoint

The backend should provide:

**Endpoint**: `POST /api/scope/analyze`

**Request Body**:
```json
{
  "clientRequest": "string",
  "repoContext": "string (optional)"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "requestSummary": "string",
    "hiddenScope": ["string"],
    "impactedAreas": [
      {
        "area": "string",
        "files": ["string"],
        "complexity": "Baja" | "Media" | "Alta"
      }
    ],
    "riskScore": 0-10,
    "risks": [
      {
        "type": "string",
        "description": "string",
        "severity": "Baja" | "Media" | "Alta"
      }
    ],
    "clarifyingQuestions": ["string"],
    "estimate": {
      "complexity": "string",
      "timeRange": "string",
      "breakdown": {
        "key": "value"
      }
    },
    "implementationPlan": [
      {
        "step": number,
        "task": "string",
        "duration": "string",
        "dependencies": ["string"]
      }
    ],
    "clientReply": "string",
    "checklist": ["string"]
  }
}
```

## Integration Steps

### 1. Set Environment Variable

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Update API Service

In `frontend/lib/api.ts`, uncomment the real API code and comment out the mock:

```typescript
export async function analyzeScopeRequest(
  request: AnalyzeRequest
): Promise<ScopeContract> {
  // Comment out mock data
  // await new Promise(resolve => setTimeout(resolve, 2000));
  // return mockScopeContract;

  // Uncomment real API call
  const response = await fetch(`${API_BASE_URL}/api/scope/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze scope');
  }
  
  const data = await response.json();
  return data.data;
}
```

### 3. Test Integration

1. Start backend: `cd backend && uvicorn main:app --reload`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:3000
4. Submit a request and verify it calls the backend

## CORS Configuration

The backend already has CORS configured in `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

For production, update `allow_origins` to specific domains.

## Error Handling

The frontend handles errors gracefully:

- Network errors show user-friendly messages
- Failed requests display error state
- Users can retry without losing their input

## Testing Checklist

- [ ] Backend endpoint returns correct JSON structure
- [ ] Frontend successfully calls backend
- [ ] Loading state displays during API call
- [ ] Success state shows dashboard with data
- [ ] Error state shows appropriate message
- [ ] All dashboard sections render correctly
- [ ] Copy-to-clipboard features work
- [ ] Responsive design works on all devices

## Production Deployment

### Frontend (Vercel/Netlify)

1. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
2. Deploy: `npm run build && npm start`

### Backend (Railway/Render/Fly.io)

1. Deploy FastAPI backend
2. Update CORS to allow frontend domain
3. Set environment variables

## Troubleshooting

### Issue: CORS Error
**Solution**: Verify backend CORS configuration includes frontend URL

### Issue: 404 Not Found
**Solution**: Check API_BASE_URL and endpoint path match backend

### Issue: Type Errors
**Solution**: Ensure backend response matches TypeScript interfaces in `types/scopeContract.ts`

### Issue: Slow Response
**Solution**: Add loading indicators, consider caching, optimize backend processing

## Mock vs Real Data Toggle

For development, you can create a toggle to switch between mock and real data:

```typescript
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function analyzeScopeRequest(request: AnalyzeRequest) {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockScopeContract;
  }
  
  // Real API call
  const response = await fetch(...);
  // ...
}
```

Then set in `.env.local`:
```
NEXT_PUBLIC_USE_MOCK=false
```

---

The frontend is ready for backend integration. All TypeScript types match the expected API structure.