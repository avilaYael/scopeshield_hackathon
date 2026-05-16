# ❓ ScopeShield - Preguntas Frecuentes de Jueces

## 🎯 Preguntas Técnicas

### P1: ¿Cómo funciona el análisis de las solicitudes?

**Respuesta Corta:**
"Actualmente usamos un sistema de detección de palabras clave que identifica categorías (auth, frontend, backend, database, etc.) y genera análisis contextual. Con IBM Bob, la siguiente fase analizará repositorios reales para mayor precisión."

**Respuesta Detallada:**
"El sistema tiene tres capas:
1. **Detección de categorías**: Identifica palabras clave en la solicitud
2. **Generación de scope**: Cada categoría tiene un conjunto de tareas ocultas típicas
3. **Cálculo de riesgo**: Basado en número de categorías, complejidad y dependencias

IBM Bob nos ayudó a estructurar esta lógica de forma modular para que sea fácil agregar análisis de código real en la siguiente fase."

---

### P2: ¿Qué tan preciso es el Risk Score?

**Respuesta Corta:**
"El Risk Score considera múltiples factores: número de áreas impactadas, complejidad de tareas, y dependencias entre componentes. Es una métrica relativa que ayuda a comparar proyectos."

**Respuesta Detallada:**
"El Risk Score se calcula así:
- Base: 3.0 puntos
- +1.5 por cada categoría detectada
- +0.5 por cada área impactada
- Normalizado a escala 0-10

Con IBM Bob analizando código real, podremos agregar:
- Complejidad ciclomática del código existente
- Acoplamiento entre módulos
- Cobertura de tests
- Deuda técnica acumulada"

---

### P3: ¿Por qué usar un sistema mock en lugar de análisis real?

**Respuesta Corta:**
"Para el MVP del hackathon, el mock nos permitió validar el concepto y la UX rápidamente. La arquitectura está lista para integrar análisis real de código con IBM Bob."

**Respuesta Detallada:**
"Decisión estratégica para el hackathon:
1. **Validar el concepto**: ¿Los desarrolladores encuentran valor en esto?
2. **Probar la UX**: ¿El dashboard comunica claramente el valor?
3. **Demostrar viabilidad**: Sistema funcional end-to-end

IBM Bob nos ayudó a diseñar la arquitectura pensando en el futuro:
- Interfaces bien definidas entre componentes
- Servicio de análisis intercambiable
- Contratos de datos extensibles"

---

### P4: ¿Cómo se integra con IBM Bob?

**Respuesta Corta:**
"IBM Bob fue nuestro copiloto de desarrollo. Nos ayudó a construir el backend, frontend, y la lógica de análisis. La siguiente fase usará IBM Bob para analizar repositorios reales."

**Respuesta Detallada:**
"IBM Bob nos ayudó en tres áreas:

**1. Desarrollo del Backend:**
- Diseño de modelos Pydantic con validaciones
- Estructura de routers y servicios
- Implementación de la lógica de detección

**2. Desarrollo del Frontend:**
- Componentes React tipados con TypeScript
- Sistema de fallback automático
- Dashboard con 10 secciones interactivas

**3. Integración:**
- Alineación de contratos de datos
- Manejo de errores y estados
- Testing end-to-end

**Visión futura:** IBM Bob analizará el código del repositorio para detectar patrones, calcular complejidad real, y generar estimaciones basadas en el historial del equipo."

---

## 💼 Preguntas de Negocio

### P5: ¿Cuál es el mercado objetivo?

**Respuesta Corta:**
"Desarrolladores freelance, agencias de desarrollo, y equipos de producto que reciben solicitudes de clientes o stakeholders."

**Respuesta Detallada:**
"Tres segmentos principales:

**1. Freelancers (Mercado inicial):**
- 59 millones de freelancers en US
- Problema: Aceptan proyectos sin análisis adecuado
- Valor: Protección contra scope creep

**2. Agencias de Desarrollo:**
- Reciben múltiples solicitudes diarias
- Problema: Tiempo perdido en análisis manual
- Valor: Estandarización y eficiencia

**3. Equipos de Producto:**
- Reciben features requests de stakeholders
- Problema: Estimaciones inexactas
- Valor: Análisis técnico objetivo"

---

### P6: ¿Cuál es el modelo de negocio?

**Respuesta Corta:**
"Freemium con análisis limitados gratis, y suscripción para análisis ilimitados, análisis de repos privados, y features empresariales."

**Respuesta Detallada:**
"Modelo Freemium:

**Tier Gratuito:**
- 10 análisis por mes
- Datos mock
- Dashboard básico

**Tier Pro ($29/mes):**
- Análisis ilimitados
- Análisis de repositorios reales con IBM Bob
- Exportación de reportes (PDF, Markdown)
- Historial de análisis

**Tier Enterprise ($299/mes):**
- Todo lo de Pro
- Templates personalizados por industria
- Integración con Jira/GitHub
- Dashboard para equipos
- Soporte prioritario"

---

### P7: ¿Cómo se diferencia de herramientas existentes?

**Respuesta Corta:**
"ScopeShield es preventivo, no reactivo. Te protege ANTES de comprometerte, no después de que el proyecto ya explotó."

**Respuesta Detallada:**
"Comparación con alternativas:

**vs. Jira/Trello:**
- Ellos: Gestión de proyectos (reactivo)
- Nosotros: Análisis pre-compromiso (preventivo)

**vs. Estimación Manual:**
- Ellos: 30-60 minutos, sesgada
- Nosotros: 2 minutos, objetiva

**vs. Emails/Slack:**
- Ellos: Sin estructura, sin análisis
- Nosotros: Análisis estructurado, preguntas inteligentes

**Ventaja única:** Combinamos análisis técnico + comunicación profesional en un solo flujo."

---

## 🚀 Preguntas de Escalabilidad

### P8: ¿Cómo escala esto a equipos grandes?

**Respuesta Corta:**
"Dashboard para equipos con análisis compartidos, templates personalizados, y métricas de precisión de estimaciones."

**Respuesta Detallada:**
"Roadmap de escalabilidad:

**Fase 1 (Actual):** Individual
- Análisis personal
- Dashboard individual

**Fase 2 (3 meses):** Equipos pequeños
- Análisis compartidos
- Comentarios y colaboración
- Templates de equipo

**Fase 3 (6 meses):** Enterprise
- Dashboard de métricas
- Precisión de estimaciones vs. realidad
- Integración con herramientas existentes
- API para automatización"

---

### P9: ¿Qué pasa con proyectos en otros idiomas?

**Respuesta Corta:**
"El sistema detecta el idioma automáticamente y genera respuestas en el mismo idioma. Actualmente soporta español e inglés."

**Respuesta Detallada:**
"Internacionalización:

**Actualmente:**
- Detección automática de idioma
- Respuestas en español e inglés
- Templates bilingües

**Roadmap:**
- Soporte para 10+ idiomas
- Templates culturalmente apropiados
- Terminología técnica localizada

IBM Bob nos ayudó a estructurar el sistema para que agregar idiomas sea simple."

---

### P10: ¿Cómo manejan la privacidad de los datos?

**Respuesta Corta:**
"Los análisis se procesan localmente o en servidores seguros. No almacenamos código fuente, solo metadatos del análisis."

**Respuesta Detallada:**
"Política de privacidad:

**Datos que NO almacenamos:**
- Código fuente completo
- Información sensible del cliente
- Credenciales o tokens

**Datos que SÍ almacenamos:**
- Texto de la solicitud (anonimizado)
- Resultados del análisis
- Métricas agregadas

**Seguridad:**
- Encriptación en tránsito (TLS)
- Encriptación en reposo
- Cumplimiento GDPR
- Opción de análisis local para empresas"

---

## 🎨 Preguntas de UX/UI

### P11: ¿Por qué 10 secciones en el dashboard?

**Respuesta Corta:**
"Cada sección responde una pregunta crítica que los desarrolladores necesitan antes de comprometerse."

**Respuesta Detallada:**
"Diseño basado en investigación:

1. **Request Summary**: ¿Qué pide realmente el cliente?
2. **Risk Score**: ¿Qué tan peligroso es esto?
3. **Hidden Scope**: ¿Qué no mencionaron?
4. **Impacted Areas**: ¿Qué código debo tocar?
5. **Technical Risks**: ¿Qué puede salir mal?
6. **Clarifying Questions**: ¿Qué debo preguntar?
7. **Estimate**: ¿Cuánto tiempo tomará?
8. **Implementation Plan**: ¿Por dónde empiezo?
9. **Client Reply**: ¿Qué le respondo?
10. **Checklist**: ¿Qué no debo olvidar?

Cada sección es accionable y tiene funcionalidad de copiar."

---

### P12: ¿Funciona en móvil?

**Respuesta Corta:**
"Sí, el diseño es completamente responsive. Funciona en desktop, tablet y móvil."

**Respuesta Detallada:**
"Diseño responsive:
- Desktop: Grid de 2 columnas
- Tablet: Grid de 1 columna
- Móvil: Stack vertical

Optimizaciones móviles:
- Botones táctiles grandes
- Scroll suave
- Carga rápida
- Funcionalidad offline (próximamente)"

---

## 🔮 Preguntas de Visión Futura

### P13: ¿Cuál es la visión a largo plazo?

**Respuesta Corta:**
"Convertir ScopeShield en el estándar de la industria para análisis pre-compromiso, integrado en el flujo de trabajo de todo desarrollador."

**Respuesta Detallada:**
"Visión 2027:

**Año 1:** Adopción individual
- 10,000 usuarios activos
- Integración con IBM Bob para análisis real
- Templates por industria

**Año 2:** Adopción empresarial
- 100 empresas pagando
- Integración con Jira, GitHub, GitLab
- API pública
- Marketplace de templates

**Año 3:** Estándar de industria
- 100,000+ usuarios
- Certificación ScopeShield
- Datos agregados para benchmarking
- IA predictiva basada en millones de análisis"

---

### P14: ¿Qué otras aplicaciones tiene esta tecnología?

**Respuesta Corta:**
"El mismo concepto aplica a RFPs, propuestas de consultoría, y cualquier situación donde necesites analizar requisitos ambiguos."

**Respuesta Detallada:**
"Aplicaciones adicionales:

**1. RFP Analysis:**
- Analizar solicitudes de propuesta
- Identificar requisitos ocultos
- Generar propuestas estructuradas

**2. Consultoría:**
- Analizar solicitudes de clientes
- Estructurar proyectos de consultoría
- Generar SOWs (Statement of Work)

**3. Product Management:**
- Analizar feature requests
- Priorizar backlog
- Comunicar con stakeholders

**4. Educación:**
- Enseñar a juniors a analizar requisitos
- Casos de estudio
- Mejores prácticas"

---

## 💡 Preguntas Difíciles

### P15: ¿Qué pasa si el análisis está equivocado?

**Respuesta Corta:**
"ScopeShield es una herramienta de apoyo, no un reemplazo del juicio humano. El desarrollador siempre tiene la última palabra."

**Respuesta Detallada:**
"Filosofía de diseño:

**ScopeShield es:**
- Una segunda opinión
- Un checklist inteligente
- Un punto de partida

**ScopeShield NO es:**
- Un reemplazo del desarrollador
- Una garantía absoluta
- Una decisión final

**Mejora continua:**
- Feedback loop de usuarios
- Machine learning de casos reales
- Actualización constante de templates

Con el tiempo, la precisión mejora con cada análisis."

---

## 🎯 Respuestas Rápidas (30 segundos)

**P: ¿Cuánto tiempo tomó construir esto?**
R: "2 semanas con IBM Bob como copiloto. Sin Bob, habría tomado 4-6 semanas."

**P: ¿Cuántos usuarios tienen?**
R: "Estamos en fase de hackathon. Lanzamiento beta en 2 semanas."

**P: ¿Código abierto?**
R: "El core será open source. Features empresariales serán propietarias."

**P: ¿Competencia?**
R: "No hay competencia directa. Herramientas existentes son reactivas, no preventivas."

**P: ¿Inversión necesaria?**
R: "$200K para 12 meses: 2 devs, 1 designer, infraestructura, marketing."

---

## 🏆 Cierre para Cualquier Pregunta

"Excelente pregunta. [Respuesta]. Lo importante es que ScopeShield resuelve un problema real que afecta a millones de desarrolladores. Estamos emocionados de construir esto con IBM Bob y llevar la prevención de scope creep al siguiente nivel. ¿Algo más?"

---

**Preparado por:** Equipo ScriptHunters
**Última actualización:** Hackathon 2026