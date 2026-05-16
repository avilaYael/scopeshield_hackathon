# ScopeShield Backend API

Backend mock para ScopeShield - Convierte solicitudes ambiguas en contratos de scope técnicos claros.

## 🚀 Stack Tecnológico

- **Python 3.9+**
- **FastAPI** - Framework web moderno y rápido
- **Pydantic** - Validación de datos automática
- **Uvicorn** - Servidor ASGI de alto rendimiento

## 📦 Instalación

### 1. Crear entorno virtual

```bash
cd backend
python -m venv venv
```

### 2. Activar entorno virtual

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` si necesitas cambiar el puerto (por defecto: 8000).

## 🏃 Ejecutar el servidor

### Modo desarrollo (con auto-reload)

```bash
uvicorn main:app --reload --port 8000
```

O simplemente:

```bash
python main.py
```

El servidor estará disponible en: `http://localhost:8000`

## 📚 Documentación Interactiva

FastAPI genera documentación automática:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔌 Endpoints

### POST `/api/scope/analyze`

Analiza una solicitud de cliente y genera un Scope Contract.

**Request Body:**

```json
{
  "clientRequest": "Solo agrega login con Google, cambia el dashboard y que se vea más moderno.",
  "repoContext": "React + Node.js app"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "requestSummary": "El cliente solicita: 1) Implementar autenticación con Google OAuth, 2) Rediseñar el dashboard con un look moderno",
    "hiddenScope": [
      "Manejo de sesiones y tokens de autenticación",
      "Migración de usuarios existentes al nuevo sistema",
      "..."
    ],
    "impactedAreas": [
      {
        "area": "Autenticación",
        "files": ["auth.js", "login.component.jsx", "middleware/auth.js"],
        "complexity": "Alta"
      }
    ],
    "riskScore": 7.5,
    "risks": [
      {
        "type": "Técnico",
        "description": "Integración OAuth puede requerir cambios significativos...",
        "severity": "Alta"
      }
    ],
    "clarifyingQuestions": [
      "¿Qué información del perfil de Google necesitas almacenar?",
      "..."
    ],
    "estimate": {
      "complexity": "Media-Alta",
      "timeRange": "3-5 días",
      "breakdown": {
        "googleAuth": "1-2 días",
        "dashboardRedesign": "1.5-2 días",
        "testing": "0.5-1 día"
      }
    },
    "implementationPlan": [
      {
        "step": 1,
        "task": "Configurar proyecto en Google Cloud Console...",
        "duration": "1-2 horas",
        "dependencies": []
      }
    ],
    "clientReply": "Hola,\n\nGracias por tu solicitud...",
    "checklist": [
      "✓ Crear proyecto en Google Cloud Console",
      "..."
    ]
  }
}
```

**Errores:**

- `400 Bad Request`: clientRequest vacío o inválido
- `422 Unprocessable Entity`: Formato JSON inválido
- `500 Internal Server Error`: Error del servidor

### GET `/`

Información básica de la API.

### GET `/health`

Health check del servicio.

## 🧪 Probar el Endpoint

### Con curl

```bash
curl -X POST http://localhost:8000/api/scope/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "clientRequest": "Solo agrega login con Google, cambia el dashboard y que se vea más moderno.",
    "repoContext": "React + Node.js app"
  }'
```

### Con Python

```python
import requests

response = requests.post(
    "http://localhost:8000/api/scope/analyze",
    json={
        "clientRequest": "Solo agrega login con Google, cambia el dashboard y que se vea más moderno.",
        "repoContext": "React + Node.js app"
    }
)

print(response.json())
```

### Con JavaScript (fetch)

```javascript
fetch('http://localhost:8000/api/scope/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    clientRequest: 'Solo agrega login con Google, cambia el dashboard y que se vea más moderno.',
    repoContext: 'React + Node.js app'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

## 📁 Estructura del Proyecto

```
backend/
├── main.py                      # Aplicación FastAPI principal
├── requirements.txt             # Dependencias Python
├── .env.example                # Variables de entorno ejemplo
├── .gitignore                  # Archivos a ignorar
├── README.md                   # Esta documentación
├── models/
│   ├── __init__.py
│   └── schemas.py              # Modelos Pydantic (request/response)
├── routers/
│   ├── __init__.py
│   └── scope.py                # Endpoint /api/scope/analyze
└── services/
    ├── __init__.py
    └── mock_service.py         # Generador de datos mock
```

## 🎯 Notas para el Hackathon

### Estado Actual: MVP Mock

Este backend retorna **datos mock hardcodeados** pero realistas para permitir que el frontend trabaje en paralelo.

### Próximos Pasos (Post-MVP)

1. Integrar IBM Bob para análisis real del repositorio
2. Implementar lógica de análisis de código
3. Agregar detección inteligente de patrones
4. Mejorar cálculo del riskScore basado en complejidad real
5. Personalizar respuestas según el tipo de proyecto

### Ventajas de FastAPI para el Demo

- ✅ Documentación interactiva automática en `/docs`
- ✅ Validación de datos automática con Pydantic
- ✅ Respuestas JSON tipadas
- ✅ Fácil de extender y modificar
- ✅ Perfecto para demos rápidos

## 🔧 Troubleshooting

### Error: "Module not found"

Asegúrate de estar en el entorno virtual:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### Error: "Port already in use"

Cambia el puerto en `.env` o usa:
```bash
uvicorn main:app --reload --port 8001
```

### CORS Issues

El backend ya tiene CORS configurado para aceptar requests desde cualquier origen en desarrollo. En producción, actualiza `allow_origins` en `main.py`.

## 📝 Licencia

MIT - Proyecto de Hackathon ScopeShield