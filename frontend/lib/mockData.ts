import { ScopeContract } from '@/types/scopeContract';

// Mock Scope Contract data based on backend/example_request_response.json
export const mockScopeContract: ScopeContract = {
  requestSummary: "El cliente solicita: 1) Implementar autenticación con Google OAuth, 2) Rediseñar el dashboard con un look moderno",
  hiddenScope: [
    "Manejo de sesiones y tokens de autenticación",
    "Migración de usuarios existentes al nuevo sistema",
    "Actualización de rutas protegidas y middleware",
    "Testing completo del flujo de autenticación",
    "Configuración de credenciales en Google Cloud Console",
    "Manejo de errores y casos edge en OAuth",
    "Actualización de documentación técnica"
  ],
  impactedAreas: [
    {
      area: "Autenticación",
      files: [
        "auth.js",
        "login.component.jsx",
        "middleware/auth.js",
        "config/passport.js"
      ],
      complexity: "Alta"
    },
    {
      area: "Dashboard UI",
      files: [
        "Dashboard.jsx",
        "dashboard.css",
        "components/DashboardCard.jsx",
        "components/Sidebar.jsx"
      ],
      complexity: "Media"
    },
    {
      area: "Base de datos",
      files: [
        "models/User.js",
        "migrations/add_google_auth.js",
        "seeds/users.js"
      ],
      complexity: "Media"
    },
    {
      area: "Configuración",
      files: [
        ".env",
        "config/oauth.js",
        "config/database.js"
      ],
      complexity: "Baja"
    }
  ],
  riskScore: 7.5,
  risks: [
    {
      type: "Técnico",
      description: "Integración OAuth puede requerir cambios significativos en la arquitectura de sesiones actual",
      severity: "Alta"
    },
    {
      type: "Seguridad",
      description: "Manejo correcto de tokens, refresh tokens y datos sensibles del usuario",
      severity: "Alta"
    },
    {
      type: "UX",
      description: "Rediseño del dashboard puede afectar flujos de trabajo existentes de los usuarios",
      severity: "Media"
    },
    {
      type: "Compatibilidad",
      description: "Usuarios existentes necesitan migración o vinculación de cuentas",
      severity: "Media"
    },
    {
      type: "Dependencias",
      description: "Nuevas librerías OAuth pueden tener conflictos con versiones actuales",
      severity: "Baja"
    }
  ],
  clarifyingQuestions: [
    "¿Qué información del perfil de Google necesitas almacenar (email, foto, nombre completo)?",
    "¿Los usuarios actuales deben poder vincular sus cuentas existentes con Google?",
    "¿Mantendremos el login tradicional o será solo Google?",
    "¿Tienes un diseño específico o mockups para el nuevo dashboard?",
    "¿El dashboard debe ser responsive para tablets y móviles?",
    "¿Hay métricas o widgets específicos que deben mostrarse en el dashboard?",
    "¿Cuál es la prioridad: primero auth o primero dashboard?",
    "¿Necesitas analytics o tracking de eventos en el nuevo dashboard?"
  ],
  estimate: {
    complexity: "Media-Alta",
    timeRange: "3-5 días",
    breakdown: {
      googleAuth: "1-2 días",
      dashboardRedesign: "1.5-2 días",
      testing: "0.5-1 día"
    }
  },
  implementationPlan: [
    {
      step: 1,
      task: "Configurar proyecto en Google Cloud Console y obtener credenciales OAuth",
      duration: "1-2 horas",
      dependencies: []
    },
    {
      step: 2,
      task: "Implementar backend OAuth flow con Passport.js o similar",
      duration: "4-6 horas",
      dependencies: ["step 1"]
    },
    {
      step: 3,
      task: "Crear componente de login con Google en frontend",
      duration: "3-4 horas",
      dependencies: ["step 2"]
    },
    {
      step: 4,
      task: "Actualizar modelo de usuario y crear migraciones de BD",
      duration: "2-3 horas",
      dependencies: ["step 2"]
    },
    {
      step: 5,
      task: "Diseñar wireframes y mockups del nuevo dashboard",
      duration: "2-3 horas",
      dependencies: []
    },
    {
      step: 6,
      task: "Implementar nuevo diseño del dashboard con componentes modernos",
      duration: "6-8 horas",
      dependencies: ["step 5"]
    },
    {
      step: 7,
      task: "Testing integral de autenticación y UI",
      duration: "4-6 horas",
      dependencies: ["step 3", "step 6"]
    },
    {
      step: 8,
      task: "Deployment a staging y pruebas finales",
      duration: "2-3 horas",
      dependencies: ["step 7"]
    }
  ],
  clientReply: `Hola,

Gracias por tu solicitud. He analizado los cambios que mencionas y quiero asegurarme de que estemos alineados antes de comenzar:

**Lo que entiendo:**
- Implementar login con Google OAuth
- Rediseñar el dashboard con un look más moderno

**Alcance técnico identificado:**
- Configuración completa de Google Cloud Console
- Integración OAuth en backend y frontend
- Actualización del modelo de usuarios en base de datos
- Rediseño completo de componentes del dashboard
- Testing de seguridad y flujos de usuario
- Manejo de migración de usuarios existentes

**Preguntas importantes antes de comenzar:**
1. ¿Qué datos del perfil de Google necesitas almacenar?
2. ¿Los usuarios actuales deben poder vincular sus cuentas?
3. ¿Tienes un diseño de referencia para el dashboard o trabajamos con mejores prácticas?
4. ¿Mantenemos el login tradicional como opción alternativa?

**Estimación:** 3-5 días de desarrollo

**Riesgos a considerar:**
Los cambios en autenticación pueden afectar sesiones actuales de usuarios. Recomiendo hacer deploy primero en ambiente de staging para validar antes de producción.

¿Te parece bien que agendemos una llamada rápida de 15 minutos para aclarar estos puntos antes de comenzar el desarrollo?

Saludos`,
  checklist: [
    "✓ Crear proyecto en Google Cloud Console",
    "✓ Obtener Client ID y Client Secret",
    "✓ Configurar URLs de redirección autorizadas",
    "✓ Instalar dependencias OAuth (passport, passport-google-oauth20)",
    "✓ Implementar estrategia de autenticación en backend",
    "✓ Crear endpoints /auth/google y /auth/google/callback",
    "✓ Actualizar modelo User con campos googleId y googleProfile",
    "✓ Crear migración de base de datos",
    "✓ Implementar botón 'Continuar con Google' en frontend",
    "✓ Manejar respuesta OAuth y crear/actualizar sesión",
    "✓ Actualizar middleware de rutas protegidas",
    "✓ Diseñar wireframes del nuevo dashboard",
    "✓ Definir paleta de colores y tipografía moderna",
    "✓ Actualizar componentes de UI (cards, sidebar, header)",
    "✓ Implementar diseño responsive",
    "✓ Agregar animaciones y transiciones suaves",
    "✓ Testing de flujo OAuth completo",
    "✓ Testing de UI en Chrome, Firefox, Safari",
    "✓ Testing en dispositivos móviles",
    "✓ Validar accesibilidad (WCAG)",
    "✓ Documentar cambios para el equipo",
    "✓ Actualizar README con nuevas instrucciones de setup",
    "✓ Deploy a staging",
    "✓ QA final antes de producción"
  ]
};

// Made with Bob
