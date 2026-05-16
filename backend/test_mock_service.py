# -*- coding: utf-8 -*-
"""
Script de prueba para validar el servicio mock mejorado.
Prueba diferentes tipos de requests y muestra los resultados.
"""

from services.mock_service import generate_mock_scope_contract
import json
import sys

# Configurar encoding para Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


def test_request(description: str, client_request: str, repo_context: str = None):
    """Prueba un request y muestra los resultados clave."""
    print(f"\n{'='*80}")
    print(f"TEST: {description}")
    print(f"{'='*80}")
    print(f"Request: {client_request}")
    if repo_context:
        print(f"RepoContext: {repo_context[:100]}...")
    print()
    
    result = generate_mock_scope_contract(client_request, repo_context)
    
    print(f"Risk Score: {result.riskScore}/10")
    print(f"Estimacion: {result.estimate.timeRange} ({result.estimate.complexity})")
    print(f"\nAreas Impactadas ({len(result.impactedAreas)}):")
    for area in result.impactedAreas:
        print(f"  - {area.area} (Complejidad: {area.complexity})")
    
    print(f"\nRiesgos Identificados ({len(result.risks)}):")
    for risk in result.risks[:3]:  # Mostrar solo los primeros 3
        print(f"  - [{risk.severity}] {risk.type}: {risk.description[:60]}...")
    
    print(f"\nPreguntas de Aclaracion ({len(result.clarifyingQuestions)}):")
    for q in result.clarifyingQuestions[:3]:  # Mostrar solo las primeras 3
        print(f"  - {q}")
    
    print(f"\nAlcance Oculto ({len(result.hiddenScope)} items)")
    print(f"Checklist ({len(result.checklist)} tareas)")
    print(f"Plan de Implementacion ({len(result.implementationPlan)} pasos)")


if __name__ == "__main__":
    print("\n>>> PRUEBAS DEL SERVICIO MOCK MEJORADO DE SCOPESHIELD <<<\n")
    
    # Test 1: Auth + Frontend (caso original)
    test_request(
        "Auth + Frontend",
        "Solo agrega login con Google, cambia el dashboard y que se vea más moderno."
    )
    
    # Test 2: Solo Payments
    test_request(
        "Solo Payments",
        "Necesito integrar Stripe para procesar pagos con tarjeta y manejar suscripciones mensuales."
    )
    
    # Test 3: Database + Auth
    test_request(
        "Database + Auth",
        "Migra la base de datos a PostgreSQL y agrega autenticación con JWT."
    )
    
    # Test 4: Frontend + Payments
    test_request(
        "Frontend + Payments",
        "Rediseña el checkout para que sea responsive y acepta pagos con PayPal."
    )
    
    # Test 5: Todo combinado
    test_request(
        "Todas las categorías",
        "Necesito un dashboard moderno con login de Google, pagos con Stripe y migración de la base de datos a MongoDB."
    )
    
    # Test 6: Request simple sin keywords específicas
    test_request(
        "Request genérico",
        "Mejora la aplicación y hazla más rápida."
    )
    
    print("\n" + "="*80)
    print("PRUEBAS CON REPO CONTEXT")
    print("="*80)
    
    # Test 7: Auth con repoContext específico
    test_request(
        "Auth con archivos específicos del repo",
        "Agrega autenticación con Google OAuth",
        repo_context="""
        src/auth/AuthService.js
        src/auth/GoogleStrategy.ts
        src/middleware/authMiddleware.js
        src/routes/authRoutes.js
        config/passport.config.js
        """
    )
    
    # Test 8: Frontend con componentes específicos
    test_request(
        "Frontend con componentes del repo",
        "Rediseña el dashboard para que sea más moderno",
        repo_context="""
        src/components/Dashboard/MainDashboard.jsx
        src/components/Dashboard/DashboardCard.tsx
        src/components/Sidebar/Sidebar.jsx
        src/styles/dashboard.css
        src/pages/DashboardPage.jsx
        """
    )
    
    # Test 9: Payments con estructura específica
    test_request(
        "Payments con archivos del repo",
        "Integra Stripe para pagos recurrentes",
        repo_context="""
        src/services/payment/StripeService.js
        src/controllers/CheckoutController.ts
        src/models/Subscription.js
        src/webhooks/stripeWebhook.js
        config/stripe.config.js
        """
    )
    
    # Test 10: Proyecto completo con múltiples áreas
    test_request(
        "Proyecto completo con repoContext detallado",
        "Agrega login con Google y sistema de pagos con Stripe",
        repo_context="""
        Backend:
        - src/auth/strategies/GoogleStrategy.js
        - src/auth/AuthController.ts
        - src/routes/api/authRoutes.js
        - src/middleware/authenticate.js
        - src/services/payment/PaymentService.js
        - src/controllers/PaymentController.ts
        - src/models/User.js
        - src/models/Payment.js
        - config/database.js
        - config/passport.js
        
        Frontend:
        - src/components/Auth/LoginButton.jsx
        - src/components/Payment/CheckoutForm.tsx
        - src/pages/LoginPage.jsx
        - src/pages/CheckoutPage.jsx
        """
    )
    
    print(f"\n{'='*80}")
    print("✅ TODAS LAS PRUEBAS COMPLETADAS")
    print(f"{'='*80}\n")

# Made with Bob
