import re
from typing import Optional, List, Dict, Set
from models.schemas import (
    ScopeContract,
    ImpactedArea,
    Risk,
    Estimate,
    ImplementationStep
)


# Definición de palabras clave por categoría
KEYWORDS = {
    "auth": ["login", "auth", "autenticacion", "autenticación", "google", "oauth", "jwt", "usuario", "usuarios", "user", "users", "sesion", "sesión", "session", "password", "contraseña", "registro", "signup", "signin"],
    "theme": ["dark mode", "modo oscuro", "dark", "oscuro", "theme", "tema", "light mode", "modo claro", "colores", "colors", "paleta", "palette", "toggle", "switch tema"],
    "frontend": ["dashboard", "ui", "modern", "moderno", "design", "diseño", "responsive", "interfaz", "interface", "frontend", "react", "vue", "angular"],
    "payment": ["payment", "payments", "pago", "pagos", "subscription", "subscriptions", "suscripcion", "suscripción", "suscripciones", "stripe", "paypal", "billing", "facturacion", "facturación", "checkout", "tarjeta", "tarjetas", "card", "cards"],
    "database": ["database", "base de datos", "bases de datos", "data", "datos", "records", "registros", "migration", "migrations", "migracion", "migración", "migraciones", "sql", "mongodb", "postgres", "postgresql"],
    "reports": ["reporte", "reportes", "report", "reports", "exportar", "export", "pdf", "excel", "csv", "descargar", "download"],
    "files": ["archivo", "archivos", "file", "files", "upload", "subir", "cargar", "imagen", "image", "documento", "document"],
    "notifications": ["notificacion", "notificaciones", "notification", "notifications", "push", "email", "correo", "sms", "alerta", "alertas"],
    "realtime": ["chat", "tiempo real", "real time", "realtime", "socket", "websocket", "socket.io", "live"],
    "ai": ["ia", "ai", "inteligencia artificial", "machine learning", "ml", "modelo", "model", "ocr", "facial", "reconocimiento", "vision"],
    "audit": ["auditoria", "auditoría", "audit", "historial", "history", "log", "logs", "tracking", "trazabilidad"],
    "performance": ["rapido", "rápido", "rapida", "rápida", "rapidez", "performance", "rendimiento", "optimizar", "optimizacion", "optimización", "optimization", "carga", "latencia", "slow", "lento", "lenta"],
    "api": ["api", "endpoint", "endpoints", "integracion", "integración", "webhook", "servicio", "backend", "microservicio"]
}

# Patrones de archivos/carpetas por tipo
REPO_PATTERNS = {
    "auth": ["auth", "login", "session", "passport", "jwt", "oauth"],
    "theme": ["theme", "themes", "context", "styles", "tailwind", "css"],
    "frontend": ["components", "views", "pages", "dashboard", "ui", "styles", "css"],
    "payment": ["payment", "checkout", "stripe", "billing", "subscription"],
    "database": ["models", "migrations", "seeds", "schema", "database", "db"],
    "api": ["routes", "routers", "controllers", "api", "endpoints"],
    "reports": ["reports", "exports", "pdf", "excel", "csv"],
    "files": ["uploads", "storage", "files", "documents", "media"],
    "notifications": ["notifications", "email", "push", "sms", "alerts"],
    "realtime": ["socket", "websocket", "chat", "realtime"],
    "ai": ["ai", "ml", "vision", "ocr", "model"],
    "audit": ["audit", "logs", "history", "tracking"],
    "performance": ["cache", "performance", "optimization", "metrics"],
    "config": ["config", "env", "settings", "constants"]
}

CATEGORY_LABELS = {
    "auth": "Autenticación",
    "theme": "Interfaz de Usuario y Estilos",
    "frontend": "Frontend/UI",
    "payment": "Pagos",
    "database": "Base de datos",
    "reports": "Reportes y exportación",
    "files": "Archivos y almacenamiento",
    "notifications": "Notificaciones",
    "realtime": "Tiempo real",
    "ai": "IA/automatización",
    "audit": "Auditoría",
    "performance": "Rendimiento",
    "api": "API/backend"
}


def detect_categories(client_request: str) -> Set[str]:
    """
    Detecta qué categorías están presentes en el request del cliente.
    """
    request_lower = client_request.lower()
    detected = set()
    
    for category, keywords in KEYWORDS.items():
        if any(_matches_keyword(request_lower, keyword) for keyword in keywords):
            detected.add(category)
    
    return detected


def _matches_keyword(text: str, keyword: str) -> bool:
    escaped = re.escape(keyword.lower())
    return re.search(rf"(?<!\w){escaped}(?!\w)", text) is not None


def analyze_repo_context(repo_context: Optional[str]) -> Dict[str, List[str]]:
    """
    Analiza el repoContext para detectar archivos y carpetas mencionados.
    Retorna un diccionario con categorías y archivos detectados.
    """
    if not repo_context:
        return {}
    
    context_lower = repo_context.lower()
    detected_files = {}
    
    for category, patterns in REPO_PATTERNS.items():
        files = []
        for pattern in patterns:
            if pattern in context_lower:
                # Buscar menciones de archivos que contengan el patrón
                lines = repo_context.split('\n')
                for line in lines:
                    line_lower = line.lower()
                    if pattern in line_lower:
                        # Extraer posibles nombres de archivo
                        words = line.split()
                        for word in words:
                            # Detectar archivos con extensiones comunes
                            if any(ext in word.lower() for ext in ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.go', '.rb', '.php', '.css', '.html', '.json', '.yml', '.yaml']):
                                files.append(word.strip(',:;()[]{}'))
                            # Detectar carpetas (sin extensión pero con patrón)
                            elif pattern in word.lower() and '.' not in word:
                                files.append(word.strip(',:;()[]{}') + '/')
        
        if files:
            detected_files[category] = list(set(files))[:5]  # Limitar a 5 archivos por categoría
    
    return detected_files


def generate_hidden_scope(categories: Set[str]) -> List[str]:
    """
    Genera alcance oculto basado en las categorías detectadas.
    """
    hidden_scope = []
    
    if "auth" in categories:
        hidden_scope.extend([
            "Manejo de sesiones y tokens de autenticación",
            "Migración de usuarios existentes al nuevo sistema",
            "Actualización de rutas protegidas y middleware",
            "Testing completo del flujo de autenticación",
            "Configuración de credenciales en servicios externos",
            "Manejo de errores y casos edge en autenticación"
        ])
    
    if "theme" in categories:
        hidden_scope.extend([
            "Configuración de estado global para el manejo del tema (Light/Dark)",
            "Refactorización de componentes base para soportar clases condicionales",
            "Implementación del componente Toggle en la barra de navegación",
            "Validación de paleta de colores y contraste adaptativo"
        ])
    
    if "frontend" in categories:
        hidden_scope.extend([
            "Diseño responsive para múltiples dispositivos",
            "Testing de compatibilidad cross-browser",
            "Optimización de rendimiento y carga",
            "Actualización de componentes y estilos globales",
            "Implementación de animaciones y transiciones"
        ])
    
    if "payment" in categories:
        hidden_scope.extend([
            "Integración con gateway de pagos",
            "Manejo de webhooks y eventos de pago",
            "Implementación de lógica de reembolsos",
            "Cumplimiento de normativas PCI DSS",
            "Testing de flujos de pago en sandbox",
            "Manejo de errores de transacciones"
        ])
    
    if "database" in categories:
        hidden_scope.extend([
            "Diseño de esquema y relaciones",
            "Creación de migraciones y rollbacks",
            "Optimización de queries y índices",
            "Backup y estrategia de recuperación",
            "Testing de integridad de datos"
        ])

    if "reports" in categories:
        hidden_scope.extend([
            "Definición de campos, filtros y permisos para reportes",
            "Generación y validación de formatos exportables",
            "Manejo de archivos grandes y tiempos de descarga",
            "Pruebas de consistencia entre datos mostrados y exportados"
        ])

    if "files" in categories:
        hidden_scope.extend([
            "Validación de tipos, tamaño y seguridad de archivos",
            "Configuración de almacenamiento local o cloud",
            "Escaneo básico de archivos y manejo de errores de carga",
            "Políticas de acceso, descarga y eliminación de archivos"
        ])

    if "notifications" in categories:
        hidden_scope.extend([
            "Gestión de permisos de notificación del usuario",
            "Configuración de proveedor de envío y plantillas",
            "Manejo de reintentos, fallos y preferencias de usuario",
            "Pruebas en distintos navegadores y dispositivos"
        ])

    if "realtime" in categories:
        hidden_scope.extend([
            "Diseño de canales, eventos y estados de conexión",
            "Manejo de reconexión, presencia y mensajes duplicados",
            "Escalabilidad de conexiones concurrentes",
            "Pruebas de latencia y condiciones de red inestables"
        ])

    if "ai" in categories:
        hidden_scope.extend([
            "Selección o integración de modelo de IA",
            "Manejo de precisión, falsos positivos y casos edge",
            "Privacidad y consentimiento para datos procesados por IA",
            "Monitoreo de costos, latencia y calidad de resultados"
        ])

    if "audit" in categories:
        hidden_scope.extend([
            "Definición de eventos auditables y retención de historial",
            "Diseño de trazabilidad por usuario, fecha y acción",
            "Protección contra modificación o eliminación de logs",
            "Consultas y filtros para revisar actividad"
        ])

    if "performance" in categories:
        hidden_scope.extend([
            "Medición de tiempos actuales antes de optimizar",
            "Identificación de cuellos de botella en frontend, backend y datos",
            "Estrategia de caché e invalidación",
            "Pruebas de regresión para evitar romper flujos existentes"
        ])

    if "api" in categories:
        hidden_scope.extend([
            "Definición de contratos de API y manejo de errores",
            "Validación de payloads y documentación de endpoints",
            "Manejo de autenticación, rate limits y observabilidad",
            "Pruebas de integración entre frontend y backend"
        ])
    
    # Siempre agregar alcance general
    hidden_scope.append("Actualización de documentación técnica")
    
    return hidden_scope


def generate_impacted_areas(categories: Set[str], repo_files: Optional[Dict[str, List[str]]] = None) -> List[ImpactedArea]:
    """
    Genera áreas impactadas basadas en las categorías detectadas y archivos del repo.
    """
    areas = []
    repo_files = repo_files or {}
    
    if "auth" in categories:
        # Usar archivos del repo si están disponibles, sino usar defaults
        auth_files = repo_files.get("auth", ["auth.js", "login.component.jsx", "middleware/auth.js", "config/passport.js"])
        areas.append(ImpactedArea(
            area="Autenticación",
            files=auth_files[:4],  # Limitar a 4 archivos
            complexity="Alta"
        ))
    
    if "theme" in categories:
        theme_files = repo_files.get("theme", ["context/ThemeContext.tsx", "components/Navbar.tsx", "tailwind.config.ts"])
        areas.append(ImpactedArea(
            area="Estilos y UI",
            files=theme_files[:3],
            complexity="Baja"
        ))
    
    if "frontend" in categories:
        frontend_files = repo_files.get("frontend", ["Dashboard.jsx", "styles.css", "components/Layout.jsx", "components/Sidebar.jsx"])
        areas.append(ImpactedArea(
            area="Frontend UI",
            files=frontend_files[:4],
            complexity="Media"
        ))
    
    if "payment" in categories:
        payment_files = repo_files.get("payment", ["payment.service.js", "checkout.component.jsx", "webhooks/stripe.js", "models/Transaction.js"])
        areas.append(ImpactedArea(
            area="Pagos",
            files=payment_files[:4],
            complexity="Alta"
        ))
    
    if "database" in categories:
        db_files = repo_files.get("database", ["models/User.js", "migrations/", "seeds/", "config/database.js"])
        areas.append(ImpactedArea(
            area="Base de datos",
            files=db_files[:4],
            complexity="Media"
        ))

    if "reports" in categories:
        report_files = repo_files.get("reports", ["services/report.service.js", "components/ReportExport.jsx", "utils/pdf-export.js", "api/reports.js"])
        areas.append(ImpactedArea(
            area="Reportes y exportación",
            files=report_files[:4],
            complexity="Media"
        ))

    if "files" in categories:
        file_files = repo_files.get("files", ["services/upload.service.js", "storage/", "components/FileUploader.jsx", "api/files.js"])
        areas.append(ImpactedArea(
            area="Archivos y almacenamiento",
            files=file_files[:4],
            complexity="Media"
        ))

    if "notifications" in categories:
        notification_files = repo_files.get("notifications", ["services/notification.service.js", "workers/notifications.js", "components/NotificationSettings.jsx", "api/notifications.js"])
        areas.append(ImpactedArea(
            area="Notificaciones",
            files=notification_files[:4],
            complexity="Media"
        ))

    if "realtime" in categories:
        realtime_files = repo_files.get("realtime", ["services/socket.service.js", "components/Chat.jsx", "api/realtime.js", "workers/events.js"])
        areas.append(ImpactedArea(
            area="Tiempo real",
            files=realtime_files[:4],
            complexity="Alta"
        ))

    if "ai" in categories:
        ai_files = repo_files.get("ai", ["services/ai.service.js", "models/inference.js", "api/ai.js", "workers/ai-jobs.js"])
        areas.append(ImpactedArea(
            area="IA/automatización",
            files=ai_files[:4],
            complexity="Alta"
        ))

    if "audit" in categories:
        audit_files = repo_files.get("audit", ["services/audit.service.js", "models/AuditLog.js", "api/audit.js", "middleware/audit.js"])
        areas.append(ImpactedArea(
            area="Auditoría",
            files=audit_files[:4],
            complexity="Media"
        ))

    if "performance" in categories:
        performance_files = repo_files.get("performance", ["lib/cache.js", "services/performance.service.js", "database/indexes.sql", "monitoring/metrics.js"])
        areas.append(ImpactedArea(
            area="Rendimiento",
            files=performance_files[:4],
            complexity="Media"
        ))
    
    # Agregar áreas adicionales detectadas en el repo
    if "api" in categories or ("api" in repo_files and "API/Rutas" not in [a.area for a in areas]):
        api_files = repo_files.get("api", ["routes/api.js", "controllers/", "services/", "schemas/"])
        areas.append(ImpactedArea(
            area="API/Rutas",
            files=api_files[:4],
            complexity="Media"
        ))
    
    # Siempre agregar configuración
    config_files = repo_files.get("config", [".env", "config/app.js"])
    areas.append(ImpactedArea(
        area="Configuración",
        files=config_files[:4],
        complexity="Baja"
    ))
    
    return areas


def generate_risks(categories: Set[str]) -> List[Risk]:
    """
    Genera riesgos basados en las categorías detectadas.
    """
    risks = []
    
    if "auth" in categories:
        risks.extend([
            Risk(
                type="Seguridad",
                description="Manejo correcto de tokens, sesiones y datos sensibles del usuario",
                severity="Alta"
            ),
            Risk(
                type="Compatibilidad",
                description="Usuarios existentes necesitan migración o vinculación de cuentas",
                severity="Media"
            )
        ])
    
    if "theme" in categories:
        risks.extend([
            Risk(
                type="Accesibilidad",
                description="Riesgo de bajo contraste en elementos heredados en modo oscuro",
                severity="Baja"
            ),
            Risk(
                type="Regresión",
                description="Conflictos menores con estilos globales previos de CSS",
                severity="Baja"
            )
        ])
    
    if "frontend" in categories:
        risks.extend([
            Risk(
                type="UX",
                description="Cambios en la interfaz pueden afectar flujos de trabajo existentes",
                severity="Media"
            ),
            Risk(
                type="Compatibilidad",
                description="Asegurar funcionamiento en diferentes navegadores y dispositivos",
                severity="Baja"
            )
        ])
    
    if "payment" in categories:
        risks.extend([
            Risk(
                type="Seguridad",
                description="Cumplimiento de normativas PCI DSS y manejo seguro de datos de pago",
                severity="Alta"
            ),
            Risk(
                type="Financiero",
                description="Errores en procesamiento de pagos pueden causar pérdidas económicas",
                severity="Alta"
            ),
            Risk(
                type="Técnico",
                description="Dependencia de servicios externos (downtime del gateway de pagos)",
                severity="Media"
            )
        ])
    
    if "database" in categories:
        risks.extend([
            Risk(
                type="Datos",
                description="Riesgo de pérdida o corrupción de datos durante migraciones",
                severity="Alta"
            ),
            Risk(
                type="Rendimiento",
                description="Queries mal optimizados pueden afectar el performance de la aplicación",
                severity="Media"
            )
        ])

    if "reports" in categories:
        risks.extend([
            Risk(
                type="Datos",
                description="Los reportes pueden exponer información sensible si no se filtran permisos correctamente",
                severity="Alta"
            ),
            Risk(
                type="Rendimiento",
                description="Exportaciones grandes pueden saturar memoria, CPU o bloquear requests del servidor",
                severity="Media"
            )
        ])

    if "files" in categories:
        risks.extend([
            Risk(
                type="Seguridad",
                description="Archivos subidos por usuarios requieren validación estricta para evitar contenido malicioso",
                severity="Alta"
            ),
            Risk(
                type="Infraestructura",
                description="El almacenamiento, límites de tamaño y limpieza de archivos pueden incrementar costos",
                severity="Media"
            )
        ])

    if "notifications" in categories:
        risks.extend([
            Risk(
                type="Entregabilidad",
                description="Notificaciones pueden fallar por permisos, tokens vencidos o restricciones del proveedor",
                severity="Media"
            ),
            Risk(
                type="UX",
                description="Demasiadas notificaciones pueden afectar la experiencia y requerir preferencias granulares",
                severity="Baja"
            )
        ])

    if "realtime" in categories:
        risks.extend([
            Risk(
                type="Escalabilidad",
                description="Funcionalidades en tiempo real requieren manejo cuidadoso de conexiones concurrentes",
                severity="Alta"
            ),
            Risk(
                type="Consistencia",
                description="Eventos duplicados o perdidos pueden dejar estados inconsistentes entre usuarios",
                severity="Media"
            )
        ])

    if "ai" in categories:
        risks.extend([
            Risk(
                type="Precisión",
                description="Modelos de IA pueden generar falsos positivos, falsos negativos o resultados no determinísticos",
                severity="Alta"
            ),
            Risk(
                type="Privacidad",
                description="Datos procesados por IA pueden requerir consentimiento, anonimización y políticas de retención",
                severity="Alta"
            )
        ])

    if "audit" in categories:
        risks.extend([
            Risk(
                type="Cumplimiento",
                description="La auditoría debe registrar eventos suficientes sin exponer datos sensibles innecesarios",
                severity="Media"
            ),
            Risk(
                type="Integridad",
                description="Los logs deben protegerse contra alteración o eliminación no autorizada",
                severity="Media"
            )
        ])

    if "performance" in categories:
        risks.extend([
            Risk(
                type="Regresión",
                description="Optimizar sin métricas base puede empeorar flujos existentes o romper cachés",
                severity="Media"
            ),
            Risk(
                type="Observabilidad",
                description="Sin monitoreo será difícil validar si la mejora realmente reduce latencia",
                severity="Baja"
            )
        ])

    if "api" in categories:
        risks.append(Risk(
            type="Integración",
            description="Cambios de API pueden romper consumidores existentes si no se versionan o documentan",
            severity="Media"
        ))
    
    # Siempre agregar riesgo de dependencias
    risks.append(Risk(
        type="Dependencias",
        description="Nuevas librerías pueden tener conflictos con versiones actuales",
        severity="Baja"
    ))
    
    return risks


def generate_clarifying_questions(categories: Set[str]) -> List[str]:
    """
    Genera preguntas de aclaración basadas en las categorías detectadas.
    """
    questions = []
    
    if "auth" in categories:
        questions.extend([
            "¿Qué información del usuario necesitas almacenar?",
            "¿Los usuarios actuales deben poder vincular sus cuentas existentes?",
            "¿Mantendremos métodos de autenticación alternativos?",
            "¿Necesitas autenticación de dos factores (2FA)?"
        ])
    
    if "theme" in categories:
        questions.extend([
            "¿El diseño del modo oscuro debe seguir una paleta de colores específica o usamos los valores por defecto de Tailwind?",
            "¿Es necesario persistir la elección del usuario en LocalStorage para futuras visitas?",
            "¿Hay alguna sección o landing page que deba quedar excluida del modo oscuro?"
        ])
    
    if "frontend" in categories:
        questions.extend([
            "¿Tienes un diseño específico o mockups de referencia?",
            "¿La interfaz debe ser responsive para tablets y móviles?",
            "¿Hay componentes o widgets específicos que deben incluirse?",
            "¿Necesitas soporte para modo oscuro/claro?"
        ])
    
    if "payment" in categories:
        questions.extend([
            "¿Qué métodos de pago necesitas soportar (tarjeta, PayPal, etc.)?",
            "¿Necesitas manejar suscripciones recurrentes o pagos únicos?",
            "¿En qué monedas deben procesarse los pagos?",
            "¿Necesitas generar facturas automáticas?",
            "¿Qué información debe incluirse en los recibos de pago?"
        ])
    
    if "database" in categories:
        questions.extend([
            "¿Qué volumen de datos esperas manejar?",
            "¿Necesitas mantener datos históricos o se pueden archivar?",
            "¿Hay requisitos específicos de backup y recuperación?",
            "¿Los cambios deben ser retrocompatibles con datos existentes?"
        ])

    if "reports" in categories:
        questions.extend([
            "¿Qué campos y filtros debe incluir cada reporte?",
            "¿Quién puede exportar datos y con qué permisos?",
            "¿El reporte debe generarse en tiempo real o puede quedar en cola?",
            "¿Qué formato exacto necesitas: PDF, Excel, CSV o varios?"
        ])

    if "files" in categories:
        questions.extend([
            "¿Qué tipos y tamaños máximos de archivo se permitirán?",
            "¿Los archivos deben almacenarse localmente o en un proveedor cloud?",
            "¿Quién podrá ver, descargar o eliminar cada archivo?",
            "¿Necesitas antivirus, expiración o versionado de archivos?"
        ])

    if "notifications" in categories:
        questions.extend([
            "¿Qué eventos deben disparar notificaciones?",
            "¿Qué canales necesitas: push, email, SMS o in-app?",
            "¿El usuario podrá configurar sus preferencias?",
            "¿Necesitas métricas de entrega, apertura o fallos?"
        ])

    if "realtime" in categories:
        questions.extend([
            "¿Cuántos usuarios concurrentes esperas soportar?",
            "¿Qué eventos deben sincronizarse en tiempo real?",
            "¿Necesitas historial persistente o solo mensajes/eventos en vivo?",
            "¿Qué debe pasar cuando el usuario pierde conexión?"
        ])

    if "ai" in categories:
        questions.extend([
            "¿Qué nivel de precisión mínimo necesitas para aceptar el resultado?",
            "¿Ya existe un proveedor/modelo definido o hay que evaluarlo?",
            "¿Los datos procesados por IA contienen información sensible?",
            "¿Necesitas revisión humana antes de aplicar resultados automáticos?"
        ])

    if "audit" in categories:
        questions.extend([
            "¿Qué acciones deben quedar registradas en auditoría?",
            "¿Cuánto tiempo se deben conservar los eventos?",
            "¿Quién puede consultar el historial y con qué filtros?",
            "¿Los logs deben ser inmutables para cumplimiento?"
        ])

    if "performance" in categories:
        questions.extend([
            "¿Qué métrica define que la app ya es suficientemente rápida?",
            "¿Dónde notas lentitud: carga inicial, consultas, navegación o procesos?",
            "¿Hay monitoreo actual para comparar antes y después?",
            "¿Qué endpoints o pantallas son más críticos para optimizar?"
        ])

    if "api" in categories:
        questions.extend([
            "¿Qué sistemas o clientes consumirán la API?",
            "¿Necesitas versionado, documentación pública o rate limiting?",
            "¿Qué errores deben manejarse explícitamente?",
            "¿La integración requiere webhooks, polling o jobs asíncronos?"
        ])
    
    # Preguntas generales
    questions.extend([
        "¿Cuál es la prioridad de implementación entre las diferentes funcionalidades?",
        "¿Hay alguna fecha límite o deadline específico?"
    ])
    
    return questions


def calculate_risk_score(categories: Set[str], risks: List[Risk]) -> float:
    """
    Calcula el score de riesgo basado en categorías y severidad de riesgos.
    """
    base_score = len(categories) * 1.5  # Más categorías = más complejidad
    
    severity_weights = {
        "Alta": 2.0,
        "Media": 1.0,
        "Baja": 0.3
    }
    
    risk_score = base_score
    for risk in risks:
        risk_score += severity_weights.get(risk.severity, 0.5)
    
    # Normalizar entre 0 y 10
    return min(10.0, round(risk_score, 1))


def generate_estimate(categories: Set[str]) -> Estimate:
    """
    Genera estimación de tiempo basada en las categorías detectadas.
    """
    complexity_map = {
        0: ("Baja", "1-2 días"),
        1: ("Baja-Media", "2-3 días"),
        2: ("Media", "3-5 días"),
        3: ("Media-Alta", "5-7 días"),
        4: ("Alta", "1-2 semanas")
    }
    
    num_categories = len(categories)
    complexity, time_range = complexity_map.get(
        min(num_categories, 4),
        ("Alta", "1-2 semanas")
    )
    
    breakdown = {}
    if "auth" in categories:
        breakdown["autenticacion"] = "1-2 días"
    if "theme" in categories:
        breakdown["desarrolloDeCodigo"] = "1 día"
    if "frontend" in categories:
        breakdown["frontend"] = "1.5-2 días"
    if "payment" in categories:
        breakdown["pagos"] = "2-3 días"
    if "database" in categories:
        breakdown["database"] = "1-2 días"
    if "reports" in categories:
        breakdown["reportes"] = "1-2 días"
    if "files" in categories:
        breakdown["archivos"] = "1-2 días"
    if "notifications" in categories:
        breakdown["notificaciones"] = "1-2 días"
    if "realtime" in categories:
        breakdown["tiempo_real"] = "2-3 días"
    if "ai" in categories:
        breakdown["ia"] = "2-4 días"
    if "audit" in categories:
        breakdown["auditoria"] = "1-2 días"
    if "performance" in categories:
        breakdown["rendimiento"] = "1-3 días"
    if "api" in categories:
        breakdown["api_backend"] = "1-2 días"
    breakdown["testing"] = "0.5-1 día"
    
    return Estimate(
        complexity=complexity,
        timeRange=time_range,
        breakdown=breakdown
    )


def generate_implementation_plan(categories: Set[str]) -> List[ImplementationStep]:
    """
    Genera plan de implementación basado en las categorías detectadas.
    """
    steps = []
    step_num = 1
    
    if "database" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Diseñar esquema de base de datos y crear migraciones",
            duration="2-3 horas",
            dependencies=[]
        ))
        step_num += 1
    
    if "theme" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Configurar el selector de temas globales en la configuración de Tailwind",
            duration="2 horas",
            dependencies=[]
        ))
        step_num += 1
        
        steps.append(ImplementationStep(
            step=step_num,
            task="Refactorizar clases de color en componentes estructurales globales",
            duration="6 horas",
            dependencies=[f"step {step_num-1}"]
        ))
        step_num += 1
        
        steps.append(ImplementationStep(
            step=step_num,
            task="Implementar un Theme Context Provider para el estado del botón toggle",
            duration="3 horas",
            dependencies=[f"step {step_num-2}"]
        ))
        step_num += 1
        
        steps.append(ImplementationStep(
            step=step_num,
            task="Pruebas de contraste y cumplimiento de accesibilidad básica",
            duration="2 horas",
            dependencies=[f"step {step_num-2}", f"step {step_num-1}"]
        ))
        step_num += 1
    
    if "auth" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Configurar servicio de autenticación y obtener credenciales",
            duration="1-2 horas",
            dependencies=[]
        ))
        step_num += 1
        
        steps.append(ImplementationStep(
            step=step_num,
            task="Implementar flujo de autenticación en backend",
            duration="4-6 horas",
            dependencies=[f"step {step_num-1}"]
        ))
        step_num += 1
    
    if "payment" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Configurar cuenta en gateway de pagos y obtener API keys",
            duration="1-2 horas",
            dependencies=[]
        ))
        step_num += 1
        
        steps.append(ImplementationStep(
            step=step_num,
            task="Implementar integración de pagos y webhooks",
            duration="6-8 horas",
            dependencies=[f"step {step_num-1}"]
        ))
        step_num += 1

    if "api" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Definir contrato de API, validaciones y manejo de errores",
            duration="2-3 horas",
            dependencies=[]
        ))
        step_num += 1

    if "reports" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Definir estructura de reportes, filtros y permisos de exportación",
            duration="2-4 horas",
            dependencies=[]
        ))
        step_num += 1

    if "files" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Implementar flujo de carga, validación y almacenamiento de archivos",
            duration="4-8 horas",
            dependencies=[]
        ))
        step_num += 1

    if "notifications" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Configurar proveedor y plantillas de notificaciones",
            duration="3-5 horas",
            dependencies=[]
        ))
        step_num += 1

    if "realtime" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Diseñar eventos y canales para comunicación en tiempo real",
            duration="4-6 horas",
            dependencies=[]
        ))
        step_num += 1

    if "ai" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Evaluar proveedor/modelo de IA e integrar endpoint de inferencia",
            duration="6-10 horas",
            dependencies=[]
        ))
        step_num += 1

    if "audit" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Implementar registro de eventos auditables y consultas de historial",
            duration="4-6 horas",
            dependencies=[]
        ))
        step_num += 1

    if "performance" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Medir baseline, identificar cuellos de botella y aplicar optimizaciones",
            duration="4-8 horas",
            dependencies=[]
        ))
        step_num += 1
    
    if "frontend" in categories:
        steps.append(ImplementationStep(
            step=step_num,
            task="Diseñar wireframes y mockups de la interfaz",
            duration="2-3 horas",
            dependencies=[]
        ))
        step_num += 1
        
        steps.append(ImplementationStep(
            step=step_num,
            task="Implementar componentes de UI y estilos",
            duration="6-8 horas",
            dependencies=[f"step {step_num-1}"]
        ))
        step_num += 1
    
    # Pasos finales siempre presentes
    steps.append(ImplementationStep(
        step=step_num,
        task="Testing integral de todas las funcionalidades",
        duration="4-6 horas",
        dependencies=[f"step {i}" for i in range(1, step_num)]
    ))
    step_num += 1
    
    steps.append(ImplementationStep(
        step=step_num,
        task="Deployment a staging y pruebas finales",
        duration="2-3 horas",
        dependencies=[f"step {step_num-1}"]
    ))
    
    return steps


def generate_client_reply(
    client_request: str,
    categories: Set[str],
    hidden_scope: List[str],
    questions: List[str],
    estimate: Estimate,
    risks: List[Risk]
) -> str:
    """
    Genera respuesta profesional para el cliente.
    """
    # Identificar temas principales
    topics = []
    if "auth" in categories:
        topics.append("autenticación")
    if "frontend" in categories:
        topics.append("interfaz de usuario")
    if "payment" in categories:
        topics.append("sistema de pagos")
    if "database" in categories:
        topics.append("base de datos")
    if "reports" in categories:
        topics.append("reportes/exportación")
    if "files" in categories:
        topics.append("manejo de archivos")
    if "notifications" in categories:
        topics.append("notificaciones")
    if "realtime" in categories:
        topics.append("funcionalidad en tiempo real")
    if "ai" in categories:
        topics.append("IA/automatización")
    if "audit" in categories:
        topics.append("auditoría")
    if "performance" in categories:
        topics.append("rendimiento")
    if "api" in categories:
        topics.append("API/backend")
    
    topics_str = ", ".join(topics) if topics else "las funcionalidades solicitadas"
    
    reply = f"""Hola,

Gracias por tu solicitud. He analizado los cambios que mencionas y quiero asegurarme de que estemos alineados antes de comenzar:

**Lo que entiendo:**
{client_request}

**Alcance técnico identificado:**
"""
    
    for scope_item in hidden_scope[:5]:  # Mostrar los primeros 5
        reply += f"- {scope_item}\n"
    
    reply += f"\n**Preguntas importantes antes de comenzar:**\n"
    for i, question in enumerate(questions[:4], 1):  # Mostrar las primeras 4
        reply += f"{i}. {question}\n"
    
    reply += f"\n**Estimación:** {estimate.timeRange} de desarrollo\n"
    
    high_risks = [r for r in risks if r.severity == "Alta"]
    if high_risks:
        reply += f"\n**Riesgos a considerar:**\n"
        reply += f"{high_risks[0].description} "
        reply += "Recomiendo hacer deploy primero en ambiente de staging para validar antes de producción.\n"
    
    reply += f"\n¿Te parece bien que agendemos una llamada rápida de 15 minutos para aclarar estos puntos antes de comenzar el desarrollo?\n\nSaludos"
    
    return reply


def generate_checklist(categories: Set[str]) -> List[str]:
    """
    Genera checklist de tareas basado en las categorías detectadas.
    """
    checklist = []
    
    if "auth" in categories:
        checklist.extend([
            "✓ Configurar servicio de autenticación",
            "✓ Obtener credenciales y API keys",
            "✓ Implementar estrategia de autenticación en backend",
            "✓ Crear endpoints de autenticación",
            "✓ Actualizar modelo de usuario",
            "✓ Implementar componente de login en frontend",
            "✓ Manejar sesiones y tokens",
            "✓ Actualizar middleware de rutas protegidas"
        ])
    
    if "theme" in categories:
        checklist.extend([
            "✓ Configurar Tailwind CSS para dark mode",
            "✓ Crear ThemeContext con Provider",
            "✓ Implementar hook useTheme personalizado",
            "✓ Crear componente ThemeToggle en Navbar",
            "✓ Implementar persistencia en localStorage",
            "✓ Refactorizar componente Navbar con clases condicionales",
            "✓ Refactorizar componentes de UI principales",
            "✓ Actualizar estilos globales con variables de tema",
            "✓ Testing de contraste con herramientas WCAG",
            "✓ Testing en Chrome, Firefox, Safari",
            "✓ Validar transiciones suaves entre temas",
            "✓ Deploy a staging",
            "✓ QA final en ambos modos"
        ])
    
    if "frontend" in categories:
        checklist.extend([
            "✓ Diseñar wireframes y mockups",
            "✓ Definir paleta de colores y tipografía",
            "✓ Actualizar componentes de UI",
            "✓ Implementar diseño responsive",
            "✓ Agregar animaciones y transiciones",
            "✓ Testing en múltiples navegadores"
        ])
    
    if "payment" in categories:
        checklist.extend([
            "✓ Configurar cuenta en gateway de pagos",
            "✓ Obtener API keys de producción y sandbox",
            "✓ Implementar integración de pagos",
            "✓ Configurar webhooks",
            "✓ Implementar manejo de errores de pago",
            "✓ Testing de flujos de pago en sandbox",
            "✓ Validar cumplimiento PCI DSS"
        ])
    
    if "database" in categories:
        checklist.extend([
            "✓ Diseñar esquema de base de datos",
            "✓ Crear migraciones",
            "✓ Implementar modelos y relaciones",
            "✓ Optimizar queries e índices",
            "✓ Configurar backup automático",
            "✓ Testing de integridad de datos"
        ])

    if "reports" in categories:
        checklist.extend([
            "✓ Definir campos y filtros de reportes",
            "✓ Validar permisos de exportación",
            "✓ Implementar generación de PDF/Excel/CSV",
            "✓ Probar reportes con volúmenes grandes"
        ])

    if "files" in categories:
        checklist.extend([
            "✓ Definir tipos y tamaños permitidos",
            "✓ Implementar carga y validación de archivos",
            "✓ Configurar almacenamiento y permisos",
            "✓ Probar errores de carga y descarga"
        ])

    if "notifications" in categories:
        checklist.extend([
            "✓ Definir eventos de notificación",
            "✓ Configurar proveedor de envío",
            "✓ Crear plantillas y preferencias",
            "✓ Probar entregabilidad y reintentos"
        ])

    if "realtime" in categories:
        checklist.extend([
            "✓ Definir eventos y canales en tiempo real",
            "✓ Implementar conexión y reconexión",
            "✓ Persistir historial si aplica",
            "✓ Probar concurrencia y latencia"
        ])

    if "ai" in categories:
        checklist.extend([
            "✓ Seleccionar proveedor/modelo de IA",
            "✓ Definir criterios de precisión",
            "✓ Implementar inferencia y manejo de errores",
            "✓ Validar privacidad y consentimiento"
        ])

    if "audit" in categories:
        checklist.extend([
            "✓ Definir eventos auditables",
            "✓ Implementar escritura de logs",
            "✓ Crear filtros de consulta de historial",
            "✓ Validar integridad y retención"
        ])

    if "performance" in categories:
        checklist.extend([
            "✓ Medir baseline de rendimiento",
            "✓ Identificar cuellos de botella",
            "✓ Aplicar caché/optimización",
            "✓ Comparar métricas antes y después"
        ])

    if "api" in categories:
        checklist.extend([
            "✓ Definir contrato de API",
            "✓ Implementar validación de payloads",
            "✓ Documentar endpoints y errores",
            "✓ Probar integración con consumidores"
        ])
    
    # Tareas generales
    checklist.extend([
        "✓ Testing integral de funcionalidades",
        "✓ Documentar cambios para el equipo",
        "✓ Actualizar README con instrucciones",
        "✓ Deploy a staging",
        "✓ QA final antes de producción"
    ])
    
    return checklist


def generate_mock_scope_contract(client_request: str, repo_context: Optional[str] = None) -> ScopeContract:
    """
    Genera un Scope Contract dinámico basado en el análisis del request del cliente.
    
    Analiza el texto del request para detectar categorías (auth, frontend, payment, database)
    y genera contenido relevante para cada una. Si se proporciona repoContext, lo usa para
    identificar archivos y carpetas específicos del repositorio.
    """
    # Detectar categorías presentes en el request
    categories = detect_categories(client_request)
    
    # Analizar repoContext si está disponible
    repo_files = analyze_repo_context(repo_context) if repo_context else {}
    
    # Generar componentes basados en las categorías detectadas
    hidden_scope = generate_hidden_scope(categories)
    impacted_areas = generate_impacted_areas(categories, repo_files)
    risks = generate_risks(categories)
    clarifying_questions = generate_clarifying_questions(categories)
    estimate = generate_estimate(categories)
    implementation_plan = generate_implementation_plan(categories)
    checklist = generate_checklist(categories)
    
    # Calcular risk score
    risk_score = calculate_risk_score(categories, risks)
    
    # Generar respuesta para el cliente
    client_reply = generate_client_reply(
        client_request,
        categories,
        hidden_scope,
        clarifying_questions,
        estimate,
        risks
    )
    
    # Generar resumen del request
    if categories:
        labels = [CATEGORY_LABELS.get(category, category) for category in sorted(categories)]
        request_summary = f"El cliente solicita: {client_request.strip()} Áreas detectadas: {', '.join(labels)}."
    else:
        request_summary = f"El cliente solicita: {client_request.strip()} Se requiere aclarar alcance porque no hay detalles técnicos suficientes."
    
    return ScopeContract(
        requestSummary=request_summary,
        hiddenScope=hidden_scope,
        impactedAreas=impacted_areas,
        riskScore=risk_score,
        risks=risks,
        clarifyingQuestions=clarifying_questions,
        estimate=estimate,
        implementationPlan=implementation_plan,
        clientReply=client_reply,
        checklist=checklist
    )


# Made with Bob
