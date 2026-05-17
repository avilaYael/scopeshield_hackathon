import { ScopeContract } from '@/types/scopeContract';

// Mock Scope Contract data - English version for hackathon presentation
export const mockScopeContract: ScopeContract = {
  requestSummary: "Client requests: 1) Implement Google OAuth authentication, 2) Redesign dashboard with modern look",
  hiddenScope: [
    "Session and authentication token management",
    "Migration of existing users to new system",
    "Update of protected routes and middleware",
    "Complete authentication flow testing",
    "Google Cloud Console credentials configuration",
    "OAuth error and edge case handling",
    "Technical documentation update"
  ],
  impactedAreas: [
    {
      area: "Authentication",
      files: [
        "auth.js",
        "login.component.jsx",
        "middleware/auth.js",
        "config/passport.js"
      ],
      complexity: "High"
    },
    {
      area: "Dashboard UI",
      files: [
        "Dashboard.jsx",
        "dashboard.css",
        "components/DashboardCard.jsx",
        "components/Sidebar.jsx"
      ],
      complexity: "Medium"
    },
    {
      area: "Database",
      files: [
        "models/User.js",
        "migrations/add_google_auth.js",
        "seeds/users.js"
      ],
      complexity: "Medium"
    },
    {
      area: "Configuration",
      files: [
        ".env",
        "config/oauth.js",
        "config/database.js"
      ],
      complexity: "Low"
    }
  ],
  riskScore: 7.5,
  risks: [
    {
      type: "Technical",
      description: "OAuth integration may require significant changes to current session architecture",
      severity: "High"
    },
    {
      type: "Security",
      description: "Proper handling of tokens, refresh tokens and sensitive user data",
      severity: "High"
    },
    {
      type: "UX",
      description: "Dashboard redesign may affect existing user workflows",
      severity: "Medium"
    },
    {
      type: "Compatibility",
      description: "Existing users need migration or account linking",
      severity: "Medium"
    },
    {
      type: "Dependencies",
      description: "New OAuth libraries may conflict with current versions",
      severity: "Low"
    }
  ],
  clarifyingQuestions: [
    "What Google profile information do you need to store (email, photo, full name)?",
    "Should current users be able to link their existing accounts with Google?",
    "Will we keep traditional login or will it be Google only?",
    "Do you have specific designs or mockups for the new dashboard?",
    "Should the dashboard be responsive for tablets and mobile?",
    "Are there specific metrics or widgets that should be displayed on the dashboard?",
    "What's the priority: auth first or dashboard first?",
    "Do you need analytics or event tracking in the new dashboard?"
  ],
  estimate: {
    complexity: "Medium-High",
    timeRange: "3-5 days",
    breakdown: {
      googleAuth: "1-2 days",
      dashboardRedesign: "1.5-2 days",
      testing: "0.5-1 day"
    }
  },
  implementationPlan: [
    {
      step: 1,
      task: "Configure project in Google Cloud Console and obtain OAuth credentials",
      duration: "1-2 hours",
      dependencies: []
    },
    {
      step: 2,
      task: "Implement backend OAuth flow with Passport.js or similar",
      duration: "4-6 hours",
      dependencies: ["step 1"]
    },
    {
      step: 3,
      task: "Create Google login component in frontend",
      duration: "3-4 hours",
      dependencies: ["step 2"]
    },
    {
      step: 4,
      task: "Update user model and create DB migrations",
      duration: "2-3 hours",
      dependencies: ["step 2"]
    },
    {
      step: 5,
      task: "Design wireframes and mockups for new dashboard",
      duration: "2-3 hours",
      dependencies: []
    },
    {
      step: 6,
      task: "Implement new dashboard design with modern components",
      duration: "6-8 hours",
      dependencies: ["step 5"]
    },
    {
      step: 7,
      task: "Comprehensive authentication and UI testing",
      duration: "4-6 hours",
      dependencies: ["step 3", "step 6"]
    },
    {
      step: 8,
      task: "Deployment to staging and final testing",
      duration: "2-3 hours",
      dependencies: ["step 7"]
    }
  ],
  clientReply: `Hello,

Thank you for your request. I've analyzed the changes you mentioned and want to make sure we're aligned before starting:

**What I understand:**
- Implement Google OAuth login
- Redesign dashboard with a more modern look

**Technical scope identified:**
- Complete Google Cloud Console configuration
- OAuth integration in backend and frontend
- User model update in database
- Complete dashboard component redesign
- Security and user flow testing
- Existing user migration handling

**Important questions before starting:**
1. What Google profile data do you need to store?
2. Should current users be able to link their accounts?
3. Do you have a reference design for the dashboard or should we work with best practices?
4. Do we keep traditional login as an alternative option?

**Estimation:** 3-5 days of development

**Risks to consider:**
Authentication changes may affect current user sessions. I recommend deploying first to staging environment to validate before production.

Would you like to schedule a quick 15-minute call to clarify these points before starting development?

Best regards`,
  checklist: [
    "✓ Create project in Google Cloud Console",
    "✓ Obtain Client ID and Client Secret",
    "✓ Configure authorized redirect URLs",
    "✓ Install OAuth dependencies (passport, passport-google-oauth20)",
    "✓ Implement authentication strategy in backend",
    "✓ Create /auth/google and /auth/google/callback endpoints",
    "✓ Update User model with googleId and googleProfile fields",
    "✓ Create database migration",
    "✓ Implement 'Continue with Google' button in frontend",
    "✓ Handle OAuth response and create/update session",
    "✓ Update protected routes middleware",
    "✓ Design wireframes for new dashboard",
    "✓ Define color palette and modern typography",
    "✓ Update UI components (cards, sidebar, header)",
    "✓ Implement responsive design",
    "✓ Add smooth animations and transitions",
    "✓ Complete OAuth flow testing",
    "✓ UI testing in Chrome, Firefox, Safari",
    "✓ Mobile device testing",
    "✓ Validate accessibility (WCAG)",
    "✓ Document changes for the team",
    "✓ Update README with new setup instructions",
    "✓ Deploy to staging",
    "✓ Final QA before production"
  ]
};

// Stripe/Payments Scenario - Mathematically consistent mock data
export const stripeMockScopeContract: ScopeContract = {
  requestSummary: "Client requests: 1) Integrate Stripe to process payments, 2) Implement webhooks for payment events",
  hiddenScope: [
    "Stripe account configuration and API keys acquisition",
    "PCI DSS compliance and secure card data handling",
    "Idempotency implementation in payment endpoints",
    "Failed payment error handling and retries",
    "Testing with Stripe test cards",
    "Webhook configuration and signature validation",
    "Dispute and refund handling",
    "Transaction logging and monitoring"
  ],
  impactedAreas: [
    {
      area: "Backend - Payments",
      files: [
        "routes/payments.js",
        "controllers/paymentController.js",
        "services/stripeService.js",
        "middleware/paymentValidation.js"
      ],
      complexity: "High"
    },
    {
      area: "Database",
      files: [
        "models/Payment.js",
        "models/Transaction.js",
        "migrations/add_payment_tables.js"
      ],
      complexity: "Medium"
    },
    {
      area: "Frontend - Checkout",
      files: [
        "components/CheckoutForm.jsx",
        "components/PaymentMethod.jsx",
        "pages/checkout.jsx"
      ],
      complexity: "Medium"
    },
    {
      area: "Webhooks",
      files: [
        "routes/webhooks.js",
        "controllers/webhookController.js",
        "services/webhookProcessor.js"
      ],
      complexity: "High"
    }
  ],
  riskScore: 6.8,
  risks: [
    {
      type: "Security",
      description: "Handling sensitive card information and PCI DSS compliance",
      severity: "High"
    },
    {
      type: "Technical",
      description: "Webhooks require public endpoint and retry handling",
      severity: "High"
    },
    {
      type: "Financial",
      description: "Processing errors may result in duplicate charges or revenue loss",
      severity: "Medium"
    },
    {
      type: "Integration",
      description: "External service dependency (Stripe) may affect availability",
      severity: "Medium"
    }
  ],
  clarifyingQuestions: [
    "What payment methods do you need to support (cards, OXXO, SPEI)?",
    "Do you need to handle recurring subscriptions or only one-time payments?",
    "What currencies should you support (MXN, USD, others)?",
    "Do you need to save payment methods for future purchases?",
    "How do you want to handle refunds (automatic or manual)?",
    "Do you need to send receipts by email automatically?",
    "What webhook events are critical for your business?",
    "Do you already have a Stripe account or need to create one?"
  ],
  estimate: {
    complexity: "Medium",
    timeRange: "2-3 days",
    breakdown: {
      payments: "1-2 days",
      testing: "0.5 day"
    }
  },
  implementationPlan: [
    {
      step: 1,
      task: "Configure Stripe account and obtain API keys (test and production)",
      duration: "1 hour",
      dependencies: []
    },
    {
      step: 2,
      task: "Implement Stripe service in backend with error handling",
      duration: "3-4 hours",
      dependencies: ["step 1"]
    },
    {
      step: 3,
      task: "Create payment endpoints (/create-payment-intent, /confirm-payment)",
      duration: "2-3 hours",
      dependencies: ["step 2"]
    },
    {
      step: 4,
      task: "Implement DB models for Payment and Transaction",
      duration: "2 hours",
      dependencies: []
    },
    {
      step: 5,
      task: "Integrate Stripe Elements in frontend for secure card capture",
      duration: "3-4 hours",
      dependencies: ["step 3"]
    },
    {
      step: 6,
      task: "Configure and validate Stripe webhooks",
      duration: "2-3 hours",
      dependencies: ["step 2"]
    },
    {
      step: 7,
      task: "Testing with test cards and webhook simulation",
      duration: "3-4 hours",
      dependencies: ["step 5", "step 6"]
    }
  ],
  clientReply: `Hello,

Thank you for your payment integration request. I've analyzed the requirements and want to make sure we're aligned:

**What I understand:**
- Integrate Stripe to process card payments
- Implement webhooks to receive payment events

**Technical scope identified:**
- Complete Stripe configuration (API keys, webhooks)
- Secure backend endpoints to create and confirm payments
- Stripe Elements integration in frontend
- Database models for transactions
- Webhook handling with signature validation
- Exhaustive testing with test environment

**Important questions before starting:**
1. What payment methods do you need (cards, OXXO, SPEI)?
2. Only one-time payments or also subscriptions?
3. What currencies should you support?
4. Do you need to save payment methods for the future?

**Estimation:** 2-3 days of development

**Risks to consider:**
Payment integration requires PCI DSS compliance. Stripe handles card security, but we must implement their SDK correctly. I recommend exhaustive testing in test environment before activating real payments.

Would you like to review these points before starting?

Best regards`,
  checklist: [
    "✓ Create Stripe account and verify identity",
    "✓ Obtain test and production API keys",
    "✓ Install Stripe SDK in backend (stripe npm package)",
    "✓ Configure environment variables with API keys",
    "✓ Create StripeService with payment methods",
    "✓ Implement POST /api/payments/create-intent endpoint",
    "✓ Implement POST /api/payments/confirm endpoint",
    "✓ Create Payment and Transaction models in DB",
    "✓ Add amount and currency validation",
    "✓ Implement idempotency with idempotency keys",
    "✓ Install @stripe/stripe-js in frontend",
    "✓ Create CheckoutForm component with Stripe Elements",
    "✓ Implement payment error handling in UI",
    "✓ Configure webhook endpoint in Stripe Dashboard",
    "✓ Create POST /api/webhooks/stripe endpoint",
    "✓ Validate webhook signatures with stripe.webhooks.constructEvent",
    "✓ Implement handlers for payment_intent.succeeded events",
    "✓ Implement handlers for payment_intent.failed events",
    "✓ Testing with test cards (4242 4242 4242 4242)",
    "✓ Webhook testing with Stripe CLI",
    "✓ Validate complete successful payment flow",
    "✓ Validate failed payment handling",
    "✓ Document configuration process",
    "✓ Deploy to staging and final testing"
  ]
};

// Dark Mode / Cosmetic Scenario - Exact specification match
export const darkModeMockScopeContract: ScopeContract = {
  requestSummary: "Client requests: Just add a quick dark mode toggle to the application. It's just changing background colors, it shouldn't touch any core code logic. Detected areas: User Interface and Styles.",
  hiddenScope: [
    "Global state configuration for theme management (Light/Dark)",
    "Base component refactoring to support conditional classes",
    "Toggle component implementation in navigation bar",
    "Color palette validation and adaptive contrast"
  ],
  impactedAreas: [
    {
      area: "Styles and UI",
      files: [
        "context/ThemeContext.tsx",
        "components/Navbar.tsx",
        "tailwind.config.ts"
      ],
      complexity: "Low"
    }
  ],
  riskScore: 2.4,
  risks: [
    {
      type: "Accessibility",
      description: "Risk of low contrast in inherited elements in dark mode",
      severity: "Low"
    },
    {
      type: "Regression",
      description: "Minor conflicts with previous global CSS styles",
      severity: "Low"
    }
  ],
  clarifyingQuestions: [
    "Should the dark mode design follow a specific color palette or use Tailwind default values?",
    "Is it necessary to persist the user's choice in LocalStorage for future visits?",
    "Is there any section or landing page that should be excluded from dark mode?"
  ],
  estimate: {
    complexity: "Low-Medium",
    timeRange: "1-2 days",
    breakdown: {
      codeDevelopment: "1 day",
      uiAndContrastTesting: "0.5 day"
    }
  },
  implementationPlan: [
    {
      step: 1,
      task: "Configure global theme selector in Tailwind configuration",
      duration: "2 hours",
      dependencies: []
    },
    {
      step: 2,
      task: "Refactor color classes in global structural components",
      duration: "6 hours",
      dependencies: ["step 1"]
    },
    {
      step: 3,
      task: "Implement Theme Context Provider for toggle button state",
      duration: "3 hours",
      dependencies: ["step 1"]
    },
    {
      step: 4,
      task: "Contrast testing and basic accessibility compliance",
      duration: "2 hours",
      dependencies: ["step 2", "step 3"]
    }
  ],
  clientReply: `Hello,

Thank you for your request. I've analyzed the changes you mentioned and want to make sure we're aligned before starting:

**What I understand:**
Just add a quick dark mode toggle to the application. It's just changing background colors, it shouldn't touch any core code logic.

**Technical scope identified:**
- Global state configuration for theme management
- Base component refactoring for theme support
- UI Toggle component implementation
- Adaptive contrast testing

**Important questions before starting:**
1. Should the dark mode design follow a specific palette?
2. Should the preference be saved in LocalStorage?

**Estimation:** 1-2 days of development.

Would you like to schedule a quick 15-minute call to clarify these points?

Best regards`,
  checklist: [
    "✓ Configure Tailwind CSS for dark mode",
    "✓ Create ThemeContext with Provider",
    "✓ Implement custom useTheme hook",
    "✓ Create ThemeToggle component in Navbar",
    "✓ Implement localStorage persistence",
    "✓ Refactor Navbar component with conditional classes",
    "✓ Refactor main UI components",
    "✓ Update global styles with theme variables",
    "✓ Contrast testing with WCAG tools",
    "✓ Testing in Chrome, Firefox, Safari",
    "✓ Validate smooth transitions between themes",
    "✓ Deploy to staging",
    "✓ Final QA in both modes"
  ]
};

// Made with Bob
