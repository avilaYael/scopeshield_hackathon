# 🛡️ ScopeShield - Convierte Solicitudes Ambiguas en Contratos Técnicos Claros

![ScopeShield Banner](https://img.shields.io/badge/ScopeShield-Hackathon%20Project-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-green?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-teal?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square)

## 🎯 ¿Qué es ScopeShield?

**ScopeShield** es una herramienta inteligente que protege a desarrolladores y equipos de los peligros del scope creep. Convierte solicitudes vagas de clientes en contratos de scope técnicos detallados, identificando:

- 🔍 **Scope Oculto** - Tareas no mencionadas explícitamente
- ⚠️ **Riesgos Técnicos** - Problemas potenciales antes de empezar
- ❓ **Preguntas Clarificadoras** - Lo que debes preguntar antes de comprometerte
- 📊 **Estimaciones Realistas** - Tiempo y complejidad basados en análisis
- 📋 **Plan de Implementación** - Pasos detallados para ejecutar el proyecto
- ✉️ **Respuesta Profesional** - Email listo para enviar al cliente

## 🚀 Inicio Rápido

### Opción 1: Guía Rápida (Recomendado)

Lee la [**Guía de Inicio Rápido (QUICKSTART.md)**](./QUICKSTART.md) para instrucciones paso a paso.

### Opción 2: Comandos Rápidos

**Backend (Terminal 1):**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm run dev
```

**Accede a:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- Documentación API: http://localhost:8001/docs

## 📸 Capturas de Pantalla

### Página Principal
Interfaz limpia y moderna para ingresar solicitudes de clientes.

### Dashboard de Análisis
Vista completa del análisis con 10 secciones detalladas:
- Resumen de la solicitud
- Puntuación de riesgo
- Scope oculto identificado
- Áreas impactadas del código
- Riesgos técnicos
- Preguntas clarificadoras
- Estimación de tiempo
- Plan de implementación
- Respuesta para el cliente
- Checklist de tareas

## 🏗️ Arquitectura del Proyecto

```
ScopeShield/
│
├── 📁 backend/              # API FastAPI (Python)
│   ├── main.py             # Punto de entrada
│   ├── models/             # Modelos Pydantic
│   ├── routers/            # Endpoints REST
│   ├── services/           # Lógica de negocio
│   └── requirements.txt    # Dependencias
│
├── 📁 frontend/             # Aplicación Next.js (TypeScript)
│   ├── app/                # Páginas y rutas
│   ├── components/         # Componentes React
│   ├── lib/                # API client y utilidades
│   ├── types/              # Tipos TypeScript
│   └── package.json        # Dependencias
│
├── 📁 docs/                 # Documentación del proyecto
├── test_backend_integration.py  # Script de pruebas
├── QUICKSTART.md           # Guía de inicio rápido
└── README.md               # Este archivo
```

## 🛠️ Stack Tecnológico

### Backend
- **FastAPI** - Framework web moderno y rápido
- **Pydantic** - Validación de datos automática
- **Uvicorn** - Servidor ASGI de alto rendimiento
- **Python 3.9+** - Lenguaje base

### Frontend
- **Next.js 14** - Framework React con SSR
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **React Hooks** - Gestión de estado

## 🎨 Características Principales

### ✅ Sistema de Fallback Inteligente
El frontend intenta conectarse al backend automáticamente. Si no está disponible, usa datos mock para permitir desarrollo sin interrupciones.

### ✅ Análisis Completo de Scope
- Identifica tareas ocultas no mencionadas
- Calcula riesgo técnico (0-10)
- Detecta áreas del código impactadas
- Genera preguntas inteligentes

### ✅ Estimaciones Realistas
- Desglose de tiempo por tarea
- Clasificación de complejidad
- Identificación de dependencias

### ✅ Respuesta Profesional
- Email formateado listo para enviar
- Tono profesional y claro
- Incluye todas las preguntas necesarias

### ✅ Plan de Implementación
- Pasos ordenados y numerados
- Duración estimada por paso
- Dependencias entre tareas

### ✅ Checklist Accionable
- Lista de verificación completa
- Formato markdown para copiar
- Tareas organizadas lógicamente

## 📊 Ejemplo de Uso

**Input del Cliente:**
```
"Solo agrega login con Google, cambia el dashboard y que se vea más moderno."
```

**Output de ScopeShield:**
- ✅ Identifica 8+ tareas ocultas (manejo de sesiones, migración de usuarios, etc.)
- ✅ Calcula riesgo técnico: 7.5/10
- ✅ Genera 6 preguntas clarificadoras
- ✅ Estima 3-5 días de trabajo
- ✅ Crea plan de 6 pasos detallado
- ✅ Prepara respuesta profesional para el cliente

## 🧪 Testing

### Probar Backend
```bash
python test_backend_integration.py
```

### Probar Frontend
```bash
cd frontend
npm run dev
# Abre http://localhost:3000 y haz clic en "Try Demo Now"
```

## 📚 Documentación

- [**QUICKSTART.md**](./QUICKSTART.md) - Guía de inicio rápido
- [**backend/README.md**](./backend/README.md) - Documentación del backend
- [**frontend/INTEGRATION.md**](./frontend/INTEGRATION.md) - Guía de integración
- [**docs/**](./docs/) - Documentación adicional del proyecto

## 🔧 Configuración

### Variables de Entorno

**Backend (.env):**
```env
PORT=8001
NODE_ENV=development
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## 🚧 Estado del Proyecto

### ✅ Completado (MVP)
- [x] Backend API con FastAPI
- [x] Frontend con Next.js y TypeScript
- [x] Sistema de fallback automático
- [x] 10 secciones del dashboard
- [x] Componentes reutilizables
- [x] Documentación completa
- [x] Script de pruebas de integración

### 🔜 Próximas Mejoras
- [ ] Integración con IBM Bob para análisis real de repositorios
- [ ] Detección inteligente de patrones de código
- [ ] Base de datos para historial de análisis
- [ ] Sistema de autenticación de usuarios
- [ ] Exportar reportes (PDF, Markdown)
- [ ] Análisis de múltiples repositorios
- [ ] Integración con GitHub/GitLab

## 👥 Equipo ScriptHunters

Proyecto desarrollado para el Hackathon ScopeShield.

## 🤝 Contribuir

Este es un proyecto de hackathon. Si quieres contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - Ver archivo [LICENSE](./LICENSE) para más detalles.

## 🎤 Materiales para el Hackathon

¿Vas a presentar ScopeShield en el hackathon? Tenemos todo listo:

- 📋 [**Script de Demo**](./docs/04-demo-hackathon.md) - Pitch de 30s y demo de 2 minutos
- 📊 [**Slides**](./docs/05-slides-demo.md) - 10 slides diseñadas con timing exacto
- ❓ [**FAQ para Jueces**](./docs/06-faq-jueces.md) - 15+ preguntas con respuestas preparadas
- 📚 [**Índice de Docs**](./docs/README.md) - Toda la documentación organizada

##  Soporte

¿Problemas? Revisa:
1. [QUICKSTART.md](./QUICKSTART.md) - Guía de inicio
2. [INSTRUCCIONES_EJECUCION.md](./INSTRUCCIONES_EJECUCION.md) - Pasos detallados
3. [backend/README.md](./backend/README.md) - Documentación del backend
4. [docs/](./docs/) - Documentación completa del proyecto

## 🎉 Agradecimientos

- FastAPI por su excelente framework
- Next.js por hacer el desarrollo frontend tan fácil
- La comunidad open source por las herramientas increíbles

---

**Hecho con ❤️ por el equipo ScriptHunters**

[⬆ Volver arriba](#-scopeshield---convierte-solicitudes-ambiguas-en-contratos-técnicos-claros)