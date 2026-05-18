# Chat 5: Mejora de Lógica de Análisis Determinista

## Fecha
2026-05-16

## Modo Utilizado
**Code Mode**

## Contexto
El backend mock devolvía siempre la misma respuesta. Necesitábamos hacerlo más inteligente para que analizara el contenido de la solicitud y generara respuestas contextuales.

## Conversación

### Usuario (Prompt B4)
```
Improve the ScopeShield backend so the mock response is more realistic.

Requirements:
- Keep the same endpoint and JSON contract.
- Do not add external AI calls yet.
- Analyze the text in clientRequest using simple deterministic logic.
- If the request mentions login, auth, Google, OAuth or users, add authentication-related risks and impacted areas.
- If it mentions dashboard, UI, modern, design or responsive, add frontend/design-related risks and impacted areas.
- If it mentions payments, subscription, Stripe or billing, add payment-related risks and impacted areas.
- If it mentions database, data, records or migration, add database-related risks and impacted areas.
- Calculate riskScore based on the number and severity of detected areas.
- Return useful clarifying questions based on detected topics.

Keep the implementation readable and easy to demo.
```

### Bob (Implementación)
Bob mejoró el servicio mock con:

**1. Sistema de Detección de Categorías:**
```python
CATEGORY_KEYWORDS = {
    'authentication': ['login', 'auth', 'google', 'oauth', 'usuario', 'sesion'],
    'frontend': ['dashboard', 'ui', 'moderno', 'diseño', 'responsive'],
    'backend': ['api', 'endpoint', 'servidor', 'backend'],
    'database': ['base de datos', 'database', 'migracion', 'datos'],
    'payments': ['pago', 'stripe', 'suscripcion', 'billing']
}
```

**2. Generación Dinámica de Hidden Scope:**
- Por cada categoría detectada, agrega 3-5 tareas ocultas específicas
- Ejemplo: Si detecta "authentication" → agrega "Configurar OAuth", "Manejar tokens", etc.

**3. Cálculo de Risk Score:**
```python
base_score = 3.0
score += len(detected_categories) * 1.5
score += len(impacted_areas) * 0.5
risk_score = min(score, 10.0)
```

**4. Preguntas Contextuales:**
- Genera preguntas específicas según categorías detectadas
- Ejemplo: Si detecta "payments" → "¿Qué pasarela de pago usarán?"

**5. Estimación Inteligente:**
- Baja complejidad: 1 categoría → 1-2 días
- Media complejidad: 2-3 categorías → 2-4 días
- Alta complejidad: 4+ categorías → 4-7 días

### Cambios Manuales Realizados
- Expandí el diccionario de keywords con sinónimos
- Agregué detección de palabras en español e inglés
- Mejoré la fórmula de risk score para ser más realista
- Agregué más templates de hidden scope por categoría
- Implementé detección de dependencias entre tareas

### Pruebas Realizadas
**Test 1: Solo autenticación**
```
Input: "Agregar login con Google"
Output: Risk Score 4.5, 1 categoría, 3 hidden scope items
```

**Test 2: Múltiples categorías**
```
Input: "Login con Google, dashboard moderno, pagos con Stripe"
Output: Risk Score 8.0, 3 categorías, 12 hidden scope items
```

**Test 3: Solicitud compleja**
```
Input: "Sistema completo con auth, dashboard, base de datos y pagos"
Output: Risk Score 9.5, 4 categorías, 18 hidden scope items
```

## Resultado
✅ Análisis contextual basado en keywords
✅ Risk score dinámico y realista
✅ Hidden scope específico por categoría
✅ Preguntas inteligentes según contexto
✅ Estimaciones variables según complejidad
✅ Demo más convincente y realista