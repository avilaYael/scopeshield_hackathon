# Chat 3: Planificación de Arquitectura del Frontend

## Fecha
2026-05-16

## Modo Utilizado
**Code Mode**

## Contexto
Con el backend en marcha, necesitábamos diseñar el frontend que mostraría el análisis de scope de manera clara y profesional.

## Conversación

### Usuario (Prompt A1)
```
We are building ScopeShield for a hackathon.

ScopeShield converts vague client or stakeholder requests into a clear technical scope contract.

My responsibility is product and frontend. The backend teammate will provide a POST endpoint later, but I need to build the frontend now using a mock Scope Contract JSON.

Please inspect the current project structure and create a short implementation plan for the frontend.

Goal:
- Build the main user flow for ScopeShield.
- Let the user paste a vague client request.
- Show a clear Scope Contract dashboard using mock data.
- Make the app feel like a serious developer tool, not a generic AI chatbot.

Dashboard sections:
- Request summary.
- Scope Risk Score.
- Hidden scope.
- Impacted areas.
- Technical risks.
- Clarifying questions.
- Estimate.
- Implementation plan.
- Client reply.
- Checklist.

Important:
- Do not implement yet.
- First tell me which files you would create or modify.
- Use the existing framework and project conventions.
- Keep it simple for a hackathon MVP.
- The UI must be responsive.
- Avoid a marketing landing page. The first screen should be the actual tool.
```

### Bob (Respuesta)
Bob propuso la siguiente arquitectura:

**Estructura de archivos:**
```
frontend/
├── app/
│   ├── page.tsx              # Página principal con input
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard de resultados
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Estilos globales
├── components/
│   ├── dashboard/
│   │   ├── RequestSummary.tsx
│   │   ├── HiddenScope.tsx
│   │   ├── ImpactedAreas.tsx
│   │   ├── TechnicalRisks.tsx
│   │   ├── ClarifyingQuestions.tsx
│   │   ├── Estimate.tsx
│   │   ├── ImplementationPlan.tsx
│   │   ├── ClientReply.tsx
│   │   └── Checklist.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── RiskScoreGauge.tsx
├── lib/
│   ├── api.ts               # Cliente API
│   └── mockData.ts          # Datos mock
└── types/
    └── scopeContract.ts     # Interfaces TypeScript
```

**Flujo de usuario propuesto:**
1. Usuario ingresa solicitud vaga en textarea
2. Click en "Analyze Scope"
3. Navegación a /dashboard con datos en sessionStorage
4. Renderizado de 10 secciones del dashboard
5. Opción de copiar cada sección

**Decisiones de diseño:**
- Next.js 14 con App Router
- TypeScript para type safety
- Tailwind CSS para estilos
- sessionStorage para estado temporal
- Componentes modulares y reutilizables

### Decisiones Tomadas
✅ Usar Next.js 14 con App Router (más moderno)
✅ Separar componentes por sección del dashboard
✅ Crear componentes UI reutilizables
✅ Implementar sistema de fallback con mock data
✅ Diseño responsive mobile-first

## Resultado
Plan de frontend aprobado, listo para implementación de componentes.