# Chat 1: Planificación de Arquitectura del Backend

## Fecha
2026-05-16

## Modo Utilizado
**Code Mode**

## Contexto
Inicio del proyecto ScopeShield para el hackathon. Necesitábamos diseñar el backend que recibiría solicitudes vagas de clientes y devolvería un análisis estructurado de scope.

## Conversación

### Usuario (Prompt B1)
```
We are building ScopeShield for a hackathon.

ScopeShield converts vague client or stakeholder requests into a clear technical scope contract.

My responsibility is the backend. I need the first backend mock so the frontend teammate can work in parallel.

Please inspect the current project structure and create a short implementation plan for a mock backend endpoint.

Goal:
- Add a POST endpoint named /api/scope/analyze or the closest equivalent for this stack.
- It should accept JSON with:
  {
    "clientRequest": "string",
    "repoContext": "string optional"
  }

- It should return a mock Scope Contract JSON with:
  requestSummary,
  hiddenScope,
  impactedAreas,
  riskScore,
  risks,
  clarifyingQuestions,
  estimate,
  implementationPlan,
  clientReply,
  checklist.

Important:
- Do not implement yet.
- First tell me which files you would create or modify.
- Use the existing framework and project conventions.
- Keep it simple for a hackathon MVP.
- The mock should be realistic enough for a demo about a vague request like:
  "Solo agrega login con Google, cambia el dashboard y que se vea mas moderno."
```

### Bob (Respuesta)
Bob analizó la estructura del proyecto y propuso:

**Estructura recomendada:**
```
backend/
├── main.py                 # Punto de entrada FastAPI
├── models/
│   ├── __init__.py
│   └── schemas.py         # Modelos Pydantic
├── routers/
│   ├── __init__.py
│   └── scope.py           # Endpoint de análisis
├── services/
│   ├── __init__.py
│   └── mock_service.py    # Lógica de análisis mock
└── requirements.txt       # Dependencias
```

**Archivos a crear:**
1. `backend/main.py` - Aplicación FastAPI con CORS
2. `backend/models/schemas.py` - Modelos Pydantic para request/response
3. `backend/routers/scope.py` - Router con endpoint POST /api/scope/analyze
4. `backend/services/mock_service.py` - Servicio que genera el Scope Contract
5. `backend/requirements.txt` - FastAPI, Uvicorn, Pydantic

**Contrato de datos propuesto:**
- Request: `{ clientRequest: string, repoContext?: string }`
- Response: `{ success: boolean, data: ScopeContract }`

### Decisiones Tomadas
✅ Usar FastAPI por su velocidad y documentación automática
✅ Separar lógica en capas (routers, services, models)
✅ Implementar validación con Pydantic
✅ Configurar CORS para desarrollo local
✅ Puerto 8001 para evitar conflictos

## Resultado
Plan de arquitectura aprobado y listo para implementación.