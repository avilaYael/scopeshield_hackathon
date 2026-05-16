# 🚀 Guía de Inicio Rápido - ScopeShield

## Descripción del Proyecto

**ScopeShield** es una herramienta que convierte solicitudes ambiguas de clientes en contratos de scope técnicos claros y detallados. Ayuda a desarrolladores y equipos a:

- ✅ Identificar scope oculto antes de comprometerse
- ✅ Calcular riesgos técnicos automáticamente
- ✅ Generar preguntas clarificadoras inteligentes
- ✅ Crear planes de implementación detallados
- ✅ Obtener estimaciones de tiempo realistas

## 📋 Requisitos Previos

- **Python 3.9+** (para el backend)
- **Node.js 18+** (para el frontend)
- **npm** o **yarn**

## 🏃 Inicio Rápido (5 minutos)

### 1️⃣ Clonar el Repositorio

```bash
cd "ScopeShield Hackathon"
```

### 2️⃣ Configurar y Ejecutar el Backend

```bash
# Ir al directorio del backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual (Windows)
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar archivo de configuración
copy .env.example .env

# Ejecutar el servidor (puerto 8001)
python main.py
```

El backend estará disponible en: **http://localhost:8001**

Documentación interactiva: **http://localhost:8001/docs**

### 3️⃣ Configurar y Ejecutar el Frontend

Abre una **nueva terminal** y ejecuta:

```bash
# Ir al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# El archivo .env.local ya está configurado con el puerto 8001

# Ejecutar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: **http://localhost:3000**

### 4️⃣ Probar la Aplicación

1. Abre tu navegador en **http://localhost:3000**
2. Haz clic en **"Try Demo Now"** para ver un ejemplo
3. O ingresa tu propia solicitud de cliente

## 🧪 Probar la Integración Backend

Ejecuta el script de prueba desde la raíz del proyecto:

```bash
python test_backend_integration.py
```

Este script verifica que:
- ✅ El backend esté corriendo
- ✅ El endpoint `/health` responda correctamente
- ✅ El endpoint `/api/scope/analyze` funcione

## 📁 Estructura del Proyecto

```
ScopeShield Hackathon/
├── backend/                    # API FastAPI
│   ├── main.py                # Punto de entrada
│   ├── models/                # Modelos Pydantic
│   ├── routers/               # Endpoints
│   ├── services/              # Lógica de negocio (mock)
│   └── requirements.txt       # Dependencias Python
│
├── frontend/                   # Aplicación Next.js
│   ├── app/                   # Páginas y rutas
│   ├── components/            # Componentes React
│   ├── lib/                   # Utilidades y API client
│   ├── types/                 # Tipos TypeScript
│   └── package.json           # Dependencias Node
│
├── docs/                       # Documentación
├── test_backend_integration.py # Script de pruebas
└── QUICKSTART.md              # Esta guía
```

## 🎯 Características Principales

### Backend (FastAPI)
- ✅ API REST con documentación automática
- ✅ Validación de datos con Pydantic
- ✅ CORS configurado para desarrollo
- ✅ Sistema mock para desarrollo rápido
- ✅ Respuestas JSON estructuradas

### Frontend (Next.js + TypeScript)
- ✅ Interfaz moderna y responsive
- ✅ Sistema de fallback automático (API → Mock)
- ✅ Componentes reutilizables
- ✅ Tipos TypeScript completos
- ✅ Dashboard interactivo con múltiples secciones

## 🔧 Configuración de Puertos

Por defecto, el proyecto usa:
- **Backend**: Puerto 8001
- **Frontend**: Puerto 3000

Para cambiar el puerto del backend:

1. Edita `backend/.env`:
   ```env
   PORT=8001
   ```

2. Actualiza `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8001
   ```

## 📊 Endpoints del Backend

### GET `/health`
Health check del servicio

### GET `/`
Información de la API

### POST `/api/scope/analyze`
Analiza una solicitud y genera un Scope Contract

**Request:**
```json
{
  "clientRequest": "Solo agrega login con Google y rediseña el dashboard",
  "repoContext": "React + Node.js app"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requestSummary": "...",
    "hiddenScope": [...],
    "impactedAreas": [...],
    "riskScore": 7.5,
    "risks": [...],
    "clarifyingQuestions": [...],
    "estimate": {...},
    "implementationPlan": [...],
    "clientReply": "...",
    "checklist": [...]
  }
}
```

## 🎨 Características del Dashboard

El dashboard muestra:

1. **Request Summary** - Resumen de la solicitud
2. **Risk Score** - Puntuación de riesgo (0-10)
3. **Hidden Scope** - Tareas no mencionadas explícitamente
4. **Impacted Areas** - Áreas del código afectadas
5. **Technical Risks** - Riesgos técnicos identificados
6. **Clarifying Questions** - Preguntas para el cliente
7. **Estimate** - Estimación de tiempo y complejidad
8. **Implementation Plan** - Plan paso a paso
9. **Client Reply** - Respuesta profesional lista para enviar
10. **Checklist** - Lista de tareas verificables

## 🐛 Troubleshooting

### Error: "Port already in use"
- Cambia el puerto en `backend/.env`
- O detén el proceso que usa el puerto 8001

### Error: "Module not found" (Backend)
- Asegúrate de estar en el entorno virtual
- Ejecuta `pip install -r requirements.txt`

### Error: "Cannot find module" (Frontend)
- Ejecuta `npm install` en el directorio frontend
- Verifica que Node.js esté instalado

### Backend no responde
- Verifica que el servidor esté corriendo
- Revisa la consola del backend para errores
- El frontend usará datos mock automáticamente

## 📝 Próximos Pasos

1. **Integración con IBM Bob** - Análisis real de repositorios
2. **Detección inteligente de patrones** - Mejorar análisis
3. **Base de datos** - Persistir análisis históricos
4. **Autenticación** - Sistema de usuarios
5. **Exportar reportes** - PDF, Markdown, etc.

## 🤝 Equipo ScriptHunters

Proyecto desarrollado para el Hackathon ScopeShield.

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

**¿Necesitas ayuda?** Revisa la documentación en `/docs` o consulta los README individuales en `backend/` y `frontend/`.