# 🚀 Instrucciones de Ejecución - ScopeShield

## ✅ Cambios Realizados

Se ha actualizado el puerto del backend de **8000** a **8001** para evitar conflictos con tu ejecución en Linux.

### Archivos Actualizados:
- ✅ `backend/.env.example` → Puerto 8001
- ✅ `backend/README.md` → Todas las referencias actualizadas
- ✅ `frontend/.env.local` → Creado con puerto 8001
- ✅ `frontend/lib/api.ts` → Puerto por defecto 8001
- ✅ `test_backend_integration.py` → Puerto 8001
- ✅ `QUICKSTART.md` → Guía completa creada
- ✅ `README.md` → Documentación principal actualizada

## 🏃 Pasos para Ejecutar el Proyecto

### Paso 1: Iniciar el Backend (Terminal 1)

```bash
# Navegar al directorio del backend
cd backend

# Crear entorno virtual (si no existe)
python -m venv venv

# Activar entorno virtual
venv\Scripts\activate

# Instalar dependencias (primera vez)
pip install -r requirements.txt

# Copiar archivo de configuración (primera vez)
copy .env.example .env

# Iniciar el servidor en puerto 8001
python main.py
```

**Verificar que veas:**
```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Paso 2: Iniciar el Frontend (Terminal 2 - Nueva Terminal)

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias (primera vez)
npm install

# El archivo .env.local ya está configurado con puerto 8001

# Iniciar el servidor de desarrollo
npm run dev
```

**Verificar que veas:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in X.Xs
```

### Paso 3: Probar la Aplicación

1. **Abrir el navegador** en: http://localhost:3000

2. **Opción A - Demo Rápido:**
   - Haz clic en el botón grande **"Try Demo Now"**
   - Espera 1-2 segundos mientras analiza
   - Verás el dashboard completo con el análisis

3. **Opción B - Solicitud Personalizada:**
   - Escribe tu propia solicitud en el campo de texto
   - (Opcional) Agrega contexto del repositorio
   - Haz clic en **"Analyze Scope"**
   - Revisa el dashboard generado

### Paso 4: Verificar Integración Backend (Opcional)

En una **tercera terminal**, ejecuta el script de pruebas:

```bash
python test_backend_integration.py
```

**Deberías ver:**
```
============================================================
PRUEBA DE INTEGRACION BACKEND SCOPESHIELD
============================================================
[OK] Health check: 200
  Response: {'status': 'healthy', 'service': 'ScopeShield API'}

[OK] Analyze endpoint: 200
  Success: True
  Risk Score: 7.5
  Impacted Areas: 3
  Hidden Scope Items: 8

============================================================
[SUCCESS] TODAS LAS PRUEBAS PASARON
============================================================
```

## 🔍 URLs Importantes

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Aplicación principal |
| Backend API | http://localhost:8001 | API REST |
| API Docs (Swagger) | http://localhost:8001/docs | Documentación interactiva |
| API Docs (ReDoc) | http://localhost:8001/redoc | Documentación alternativa |
| Health Check | http://localhost:8001/health | Estado del backend |

## 🎯 Características a Probar

### 1. Análisis de Scope
- ✅ Ingresa una solicitud vaga del cliente
- ✅ Verifica que identifique scope oculto
- ✅ Revisa el cálculo de riesgo (0-10)

### 2. Dashboard Completo
El dashboard debe mostrar 10 secciones:
1. **Request Summary** - Resumen claro de la solicitud
2. **Risk Score** - Medidor visual de riesgo
3. **Hidden Scope** - Lista de tareas ocultas
4. **Impacted Areas** - Archivos y áreas afectadas
5. **Technical Risks** - Riesgos identificados
6. **Clarifying Questions** - Preguntas para el cliente
7. **Estimate** - Tiempo y complejidad
8. **Implementation Plan** - Pasos detallados
9. **Client Reply** - Email listo para copiar
10. **Checklist** - Lista de verificación

### 3. Funcionalidad de Copiar
- ✅ Cada sección tiene botón "Copy"
- ✅ Al hacer clic, copia el contenido al portapapeles
- ✅ Muestra confirmación "Copied!"

### 4. Sistema de Fallback
- ✅ Si el backend no está disponible, usa datos mock
- ✅ La aplicación sigue funcionando sin errores
- ✅ Mensaje en consola indica el fallback

## 🐛 Solución de Problemas

### Backend no inicia
**Error:** `Address already in use`
- **Solución:** El puerto 8001 está ocupado. Cambia el puerto en `backend/.env`

**Error:** `Module not found`
- **Solución:** Activa el entorno virtual y ejecuta `pip install -r requirements.txt`

### Frontend no inicia
**Error:** `Cannot find module`
- **Solución:** Ejecuta `npm install` en el directorio frontend

**Error:** `Port 3000 is already in use`
- **Solución:** Detén otros procesos en puerto 3000 o usa otro puerto: `npm run dev -- -p 3001`

### Backend no responde
- Verifica que el servidor esté corriendo en la terminal
- Revisa http://localhost:8001/health en el navegador
- El frontend usará datos mock automáticamente si falla

### CORS Errors
- Ya está configurado en el backend
- Si persiste, verifica que el frontend use http://localhost:8001

## 📊 Datos de Ejemplo

### Solicitud de Ejemplo 1:
```
"Solo agrega login con Google, cambia el dashboard y que se vea más moderno."
```
**Contexto:** `React + Node.js app`

### Solicitud de Ejemplo 2:
```
"Necesito que agregues un sistema de notificaciones push y que los usuarios puedan subir archivos."
```
**Contexto:** `Next.js + Firebase`

### Solicitud de Ejemplo 3:
```
"Implementa un chat en tiempo real y mejora el rendimiento de la app."
```
**Contexto:** `Vue.js + Socket.io + MongoDB`

## 📝 Notas Importantes

1. **Puerto 8001:** Se cambió de 8000 a 8001 para evitar conflictos
2. **Datos Mock:** El backend actualmente retorna datos mock realistas
3. **Desarrollo Paralelo:** Frontend y backend pueden desarrollarse independientemente
4. **Documentación:** Revisa `QUICKSTART.md` para más detalles

## 🎉 ¡Listo para el Demo!

Si todo funciona correctamente:
- ✅ Backend responde en puerto 8001
- ✅ Frontend carga en puerto 3000
- ✅ Puedes analizar solicitudes
- ✅ Dashboard muestra todas las secciones
- ✅ Funcionalidad de copiar funciona

## 📚 Documentación Adicional

- **README.md** - Visión general del proyecto
- **QUICKSTART.md** - Guía de inicio rápido detallada
- **backend/README.md** - Documentación del backend
- **frontend/INTEGRATION.md** - Guía de integración

---

**¿Problemas?** Revisa la sección de Troubleshooting o consulta la documentación completa.

**Equipo:** ScriptHunters | **Proyecto:** ScopeShield Hackathon