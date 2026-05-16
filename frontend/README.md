# ScopeShield Frontend

Convert vague client requests into clear technical scope contracts.

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Main input page
│   ├── dashboard/           # Scope Contract dashboard
│   │   └── page.tsx
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── dashboard/           # Dashboard section components
│   │   ├── DashboardHeader.tsx
│   │   ├── RequestSummary.tsx
│   │   ├── HiddenScope.tsx
│   │   ├── ImpactedAreas.tsx
│   │   ├── TechnicalRisks.tsx
│   │   ├── ClarifyingQuestions.tsx
│   │   ├── Estimate.tsx
│   │   ├── ImplementationPlan.tsx
│   │   ├── ClientReply.tsx
│   │   └── Checklist.tsx
│   └── ui/                  # Reusable UI components
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── RiskScoreGauge.tsx
├── lib/
│   ├── api.ts              # API service layer
│   └── mockData.ts         # Mock Scope Contract data
└── types/
    └── scopeContract.ts    # TypeScript interfaces
```

## 🎯 Features

### Main Input Page
- Clean, focused interface for pasting client requests
- Optional repository context input
- "Load Example" button for quick testing
- Professional developer tool aesthetic

### Scope Contract Dashboard
- **Risk Score Gauge**: Visual 0-10 risk assessment
- **Request Summary**: Interpreted client requirements
- **Hidden Scope**: Implicit work not explicitly mentioned
- **Impacted Areas**: Code areas and files affected
- **Technical Risks**: Categorized by severity
- **Clarifying Questions**: Ready to ask the client
- **Estimate**: Time range and complexity breakdown
- **Implementation Plan**: Step-by-step roadmap
- **Client Reply**: Professional response ready to copy
- **Checklist**: Complete task list for execution

## 🔧 Current Implementation

### Smart Backend Integration with Fallback
The frontend **automatically tries to call the backend API** at `http://localhost:8000/api/scope/analyze`. If the backend is unavailable, it gracefully falls back to mock data.

**How it works:**
1. User submits a request
2. Frontend calls `POST /api/scope/analyze`
3. If successful → Uses real backend data
4. If fails → Falls back to mock data (with console warning)
5. User sees results either way

**Benefits:**
- No code changes needed to switch between modes
- Works immediately when backend starts
- Continues working if backend stops
- Perfect for development and demos

## 🎨 Design Principles

1. **Developer Tool Aesthetic**: Clean, professional, code-focused
2. **Responsive Design**: Works on mobile, tablet, and desktop
3. **Clear Visual Hierarchy**: Important information stands out
4. **Interactive Elements**: Copy-to-clipboard, expandable sections
5. **Loading States**: Smooth UX during analysis

## 🧪 Testing the Flow

1. Start the dev server: `npm run dev`
2. Click "Load Example" to populate the form
3. Click "Analyze Scope" (2-second simulated delay)
4. Review all dashboard sections
5. Test copy-to-clipboard features
6. Test responsive design on different screen sizes

## 🔌 Backend Integration

When the backend POST endpoint is ready:

1. Set the API URL in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. Update `lib/api.ts` to use real API calls (uncomment the fetch code)

3. The frontend will automatically work with the backend

## 📦 Tech Stack

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management

## 🚢 Build for Production

```bash
npm run build
npm start
```

## 📝 Notes

- All components are fully typed with TypeScript
- Mock data matches the backend's example JSON structure
- Easy to swap mock data with real API
- Responsive design tested on multiple screen sizes
- Copy-to-clipboard functionality for questions and client reply

## 🎯 Hackathon Demo Tips

1. **Show the Problem**: Start with a vague request
2. **Show the Solution**: Demonstrate the clear Scope Contract
3. **Highlight Key Features**:
   - Risk Score visualization
   - Hidden scope detection
   - Professional client reply
   - Implementation checklist
4. **Emphasize Value**: Prevents scope creep, saves time, protects developers

---

Built with ❤️ for developers, freelancers, and agencies who need clear scope before committing to work.
