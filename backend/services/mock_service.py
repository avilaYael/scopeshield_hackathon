from typing import Optional
from models.schemas import (
    ScopeContract,
    ImpactedArea,
    Risk,
    Estimate,
    ImplementationStep
)


def generate_mock_scope_contract(client_request: str, repo_context: Optional[str] = None) -> ScopeContract:
    """
    Genera un Scope Contract mock realista basado en el request del cliente.
    
    Para el MVP del hackathon, retorna datos hardcodeados pero coherentes.
    En producción, esto sería reemplazado por análisis real con IBM Bob.
    """
    
    # Mock data realista para el ejemplo:
    # "Solo agrega login con Google, cambia el dashboard y que se vea más moderno."
    
    return ScopeContract(
        requestSummary=(
            "El cliente solicita: 1) Implementar autenticación con Google OAuth, "
            "2) Rediseñar el dashboard con un look moderno"
        ),
        hiddenScope=[
            "Manejo de sesiones y tokens de autenticación",
            "Migración de usuarios existentes al nuevo sistema",
            "Actualización de rutas protegidas y middleware",
            "Testing completo del flujo de autenticación",
            "Configuración de credenciales en Google Cloud Console",
            "Manejo de errores y casos edge en OAuth",
            "Actualización de documentación técnica"
        ],
        impactedAreas=[
            ImpactedArea(
                area="Autenticación",
                files=["auth.js", "login.component.jsx", "middleware/auth.js", "config/passport.js"],
                complexity="Alta"
            ),
            ImpactedArea(
                area="Dashboard UI",
                files=["Dashboard.jsx", "dashboard.css", "components/DashboardCard.jsx", "components/Sidebar.jsx"],
                complexity="Media"
            ),
            ImpactedArea(
                area="Base de datos",
                files=["models/User.js", "migrations/add_google_auth.js", "seeds/users.js"],
                complexity="Media"
            ),
            ImpactedArea(
                area="Configuración",
                files=[".env", "config/oauth.js", "config/database.js"],
                complexity="Baja"
            )
        ],
        riskScore=7.5,
        risks=[
            Risk(
                type="Técnico",
                description="Integración OAuth puede requerir cambios significativos en la arquitectura de sesiones actual",
                severity="Alta"
            ),
            Risk(
                type="Seguridad",
                description="Manejo correcto de tokens, refresh tokens y datos sensibles del usuario",
                severity="Alta"
            ),
            Risk(
                type="UX",
                description="Rediseño del dashboard puede afectar flujos de trabajo existentes de los usuarios",
                severity="Media"
            ),
            Risk(
                type="Compatibilidad",
                description="Usuarios existentes necesitan migración o vinculación de cuentas",
                severity="Media"
            ),
            Risk(
                type="Dependencias",
                description="Nuevas librerías OAuth pueden tener conflictos con versiones actuales",
                severity="Baja"
            )
        ],
        clarifyingQuestions=[
            "¿Qué información del perfil de Google necesitas almacenar (email, foto, nombre completo)?",
            "¿Los usuarios actuales deben poder vincular sus cuentas existentes con Google?",
            "¿Mantendremos el login tradicional o será solo Google?",
            "¿Tienes un diseño específico o mockups para el nuevo dashboard?",
            "¿El dashboard debe ser responsive para tablets y móviles?",
            "¿Hay métricas o widgets específicos que deben mostrarse en el dashboard?",
            "¿Cuál es la prioridad: primero auth o primero dashboard?",
            "¿Necesitas analytics o tracking de eventos en el nuevo dashboard?"
        ],
        estimate=Estimate(
            complexity="Media-Alta",
            timeRange="3-5 días",
            breakdown={
                "googleAuth": "1-2 días",
                "dashboardRedesign": "1.5-2 días",
                "testing": "0.5-1 día"
            }
        ),
        implementationPlan=[
            ImplementationStep(
                step=1,
                task="Configurar proyecto en Google Cloud Console y obtener credenciales OAuth",
                duration="1-2 horas",
                dependencies=[]
            ),
            ImplementationStep(
                step=2,
                task="Implementar backend OAuth flow con Passport.js o similar",
                duration="4-6 horas",
                dependencies=["step 1"]
            ),
            ImplementationStep(
                step=3,
                task="Crear componente de login con Google en frontend",
                duration="3-4 horas",
                dependencies=["step 2"]
            ),
            ImplementationStep(
                step=4,
                task="Actualizar modelo de usuario y crear migraciones de BD",
                duration="2-3 horas",
                dependencies=["step 2"]
            ),
            ImplementationStep(
                step=5,
                task="Diseñar wireframes y mockups del nuevo dashboard",
                duration="2-3 horas",
                dependencies=[]
            ),
            ImplementationStep(
                step=6,
                task="Implementar nuevo diseño del dashboard con componentes modernos",
                duration="6-8 horas",
                dependencies=["step 5"]
            ),
            ImplementationStep(
                step=7,
                task="Testing integral de autenticación y UI",
                duration="4-6 horas",
                dependencies=["step 3", "step 6"]
            ),
            ImplementationStep(
                step=8,
                task="Deployment a staging y pruebas finales",
                duration="2-3 horas",
                dependencies=["step 7"]
            )
        ],
        clientReply=(
            "Hola,\n\n"
            "Gracias por tu solicitud. He analizado los cambios que mencionas y quiero asegurarme "
            "de que estemos alineados antes de comenzar:\n\n"
            "**Lo que entiendo:**\n"
            "- Implementar login con Google OAuth\n"
            "- Rediseñar el dashboard con un look más moderno\n\n"
            "**Alcance técnico identificado:**\n"
            "- Configuración completa de Google Cloud Console\n"
            "- Integración OAuth en backend y frontend\n"
            "- Actualización del modelo de usuarios en base de datos\n"
            "- Rediseño completo de componentes del dashboard\n"
            "- Testing de seguridad y flujos de usuario\n"
            "- Manejo de migración de usuarios existentes\n\n"
            "**Preguntas importantes antes de comenzar:**\n"
            "1. ¿Qué datos del perfil de Google necesitas almacenar?\n"
            "2. ¿Los usuarios actuales deben poder vincular sus cuentas?\n"
            "3. ¿Tienes un diseño de referencia para el dashboard o trabajamos con mejores prácticas?\n"
            "4. ¿Mantenemos el login tradicional como opción alternativa?\n\n"
            "**Estimación:** 3-5 días de desarrollo\n\n"
            "**Riesgos a considerar:**\n"
            "Los cambios en autenticación pueden afectar sesiones actuales de usuarios. "
            "Recomiendo hacer deploy primero en ambiente de staging para validar antes de producción.\n\n"
            "¿Te parece bien que agendemos una llamada rápida de 15 minutos para aclarar estos puntos "
            "antes de comenzar el desarrollo?\n\n"
            "Saludos"
        ),
        checklist=[
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
    )

# Made with Bob
