# ScopeShield - Prompts para IBM Bob IDE

Este documento contiene prompts listos para copiar y pegar en IBM Bob IDE.

Objetivo: que Persona A y Persona B trabajen en paralelo, usando Bob de forma clara y documentable para el hackathon.

---

## Reglas de trabajo

- Primero usar **Plan mode** para pedir estrategia y archivos a modificar.
- Luego usar **Code mode** para implementar.
- Usar **Ask mode** cuando haya dudas sobre el proyecto o el stack.
- Usar **Advanced mode** solo si se necesita una tarea mas compleja, como revisar multiples archivos, conectar piezas o depurar.
- Usar **Orchestrator mode** al final, cuando ya existan frontend y backend y se quiera coordinar integracion, demo o mejoras.

Cada persona debe guardar evidencia:

- Prompt usado.
- Respuesta o codigo generado por Bob.
- Cambios manuales realizados.
- Archivos modificados.
- Resultado integrado al proyecto.

---

## Contrato base: Scope Contract JSON

Este JSON es el contrato entre frontend y backend.

```json
{
  "requestSummary": "",
  "hiddenScope": [],
  "impactedAreas": [],
  "riskScore": 0,
  "risks": [],
  "clarifyingQuestions": [],
  "estimate": {
    "complexity": "",
    "timeRange": ""
  },
  "implementationPlan": [],
  "clientReply": "",
  "checklist": []
}
```

Respuesta mock recomendada:

```json
{
  "requestSummary": "El cliente solicita agregar login con Google, redisenar el dashboard y mejorar la apariencia visual general.",
  "hiddenScope": [
    "Configurar OAuth con Google",
    "Agregar variables de entorno",
    "Validar sesiones y rutas protegidas",
    "Actualizar diseno del dashboard",
    "Revisar estados de carga y errores"
  ],
  "impactedAreas": [
    "Authentication",
    "Environment configuration",
    "Dashboard UI",
    "Routing",
    "User session handling"
  ],
  "riskScore": 82,
  "risks": [
    "La solicitud parece simple, pero toca autenticacion y seguridad.",
    "Faltan detalles sobre roles de usuario y permisos.",
    "El rediseno del dashboard no tiene criterios visuales claros.",
    "Puede requerir cambios en base de datos o proveedor de auth."
  ],
  "clarifyingQuestions": [
    "El login con Google reemplaza el login actual o se agrega como opcion adicional?",
    "Que usuarios deben poder iniciar sesion con Google?",
    "Hay diseno de referencia para el dashboard moderno?",
    "Que secciones del dashboard deben cambiar?"
  ],
  "estimate": {
    "complexity": "High",
    "timeRange": "2-4 days"
  },
  "implementationPlan": [
    "Revisar el flujo actual de autenticacion.",
    "Definir proveedor OAuth y variables de entorno.",
    "Agregar boton de login con Google.",
    "Proteger rutas del dashboard.",
    "Redisenar componentes principales del dashboard.",
    "Probar login, logout, errores y permisos."
  ],
  "clientReply": "Podemos hacerlo, pero no es solo un cambio visual. El login con Google implica configuracion de autenticacion, seguridad, sesiones y pruebas. Antes de estimarlo con precision necesito confirmar si Google reemplaza el login actual o sera una opcion adicional, y que significa exactamente 'mas moderno' para el dashboard.",
  "checklist": [
    "Confirmar alcance de autenticacion",
    "Definir diseno esperado",
    "Configurar variables de entorno",
    "Implementar OAuth",
    "Actualizar dashboard",
    "Probar rutas protegidas",
    "Validar experiencia movil"
  ]
}
```

---

# Persona A - Producto + Frontend

Responsabilidad: construir una experiencia visual clara, convincente y facil de demostrar.

Persona A no debe esperar al backend. Puede trabajar con el JSON mock desde el inicio.

## Prompt A1 - Plan mode: plan inicial de frontend

```text
We are building ScopeShield for a hackathon.

ScopeShield converts vague client or stakeholder requests into a clear technical scope contract.

My responsibility is product and frontend. The backend teammate will provide a POST endpoint later, but I need to build the frontend now using a mock Scope Contract JSON.

Please inspect the current project structure and create a short implementation plan for the frontend.

Goal:
- Build the main user flow for ScopeShield.
- Let the user paste a vague client request.
- Show a clear Scope Contract dashboard using mock data.
- Make the app feel like a serious developer tool, not a generic AI chatbot.

Dashboard sections:
- Request summary.
- Scope Risk Score.
- Hidden scope.
- Impacted areas.
- Technical risks.
- Clarifying questions.
- Estimate.
- Implementation plan.
- Client reply.
- Checklist.

Important:
- Do not implement yet.
- First tell me which files you would create or modify.
- Use the existing framework and project conventions.
- Keep it simple for a hackathon MVP.
- The UI must be responsive.
- Avoid a marketing landing page. The first screen should be the actual tool.
```

## Prompt A2 - Code mode: construir UI con mock

```text
Implement the approved frontend plan.

Requirements:
- Build the main ScopeShield screen.
- Add a textarea for the vague client request.
- Add an "Analyze Scope" action.
- Use a local mock Scope Contract JSON response for now.
- Render all Scope Contract sections clearly.
- Add loading and error states even if they are simulated.
- Keep the UI responsive for desktop and mobile.
- Follow the existing project conventions and component patterns.
- Do not connect to the backend yet unless the endpoint already exists.

Mock input:
"Solo agrega login con Google, cambia el dashboard y que se vea mas moderno."

Mock output fields:
- requestSummary
- hiddenScope
- impactedAreas
- riskScore
- risks
- clarifyingQuestions
- estimate
- implementationPlan
- clientReply
- checklist

Make the product feel practical for developers, freelancers, agencies and product teams.
```

## Prompt A3 - Code mode: preparar integracion con backend

Usar cuando Persona B ya tenga el endpoint.

```text
Update the frontend to call the backend endpoint instead of using only local mock data.

Backend endpoint:
POST /api/scope/analyze

Request body:
{
  "clientRequest": "string",
  "repoContext": "string optional"
}

Expected response:
Scope Contract JSON with:
- requestSummary
- hiddenScope
- impactedAreas
- riskScore
- risks
- clarifyingQuestions
- estimate
- implementationPlan
- clientReply
- checklist

Requirements:
- Keep the mock as fallback if the API fails.
- Show loading state while the request is running.
- Show a useful error message if the request fails.
- Validate that the user entered a client request before calling the API.
- Do not break the current UI.
```

## Prompt A4 - Ask mode: mejorar UX

```text
Review the current ScopeShield frontend UX.

Context:
This is a hackathon demo. The product should immediately communicate that it turns vague client requests into clear technical scope.

Please suggest practical UX improvements, but do not implement yet.

Focus on:
- First impression.
- Dashboard clarity.
- Visual hierarchy.
- Risk score presentation.
- Making the demo easy to understand in under 60 seconds.
- Avoiding generic AI chatbot patterns.
```

## Prompt A5 - Code mode: pulir demo visual

```text
Improve the current ScopeShield frontend for the final hackathon demo.

Requirements:
- Make the risk score visually prominent.
- Make the client reply easy to copy or read.
- Make hidden scope and risks scannable.
- Improve spacing, responsiveness and visual hierarchy.
- Keep the design clean and professional.
- Do not add unnecessary landing page sections.
- Do not remove existing functionality.
```

---

# Persona B - Backend + Bob Logic

Responsabilidad: crear el endpoint mock primero, luego convertirlo en una logica mas creible.

El primer entregable de Persona B es un endpoint que devuelva el Scope Contract JSON. No tiene que ser perfecto, pero debe desbloquear al frontend.

## Prompt B1 - Plan mode: plan inicial de backend mock

```text
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

## Prompt B2 - Code mode: implementar endpoint mock

```text
Implement the approved mock backend endpoint.

Requirements:
- Follow the existing project structure and conventions.
- Create the POST endpoint for scope analysis.
- Return a realistic hardcoded Scope Contract JSON for now.
- Validate that clientRequest exists.
- If clientRequest is missing, return a clear 400 error.
- Keep the implementation simple and easy to replace later with real IBM Bob analysis logic.
- Add one sample request/response file or comment if appropriate for the project.

Endpoint:
POST /api/scope/analyze

Request body:
{
  "clientRequest": "Solo agrega login con Google, cambia el dashboard y que se vea mas moderno.",
  "repoContext": "Optional text about the repository"
}

Response:
Return the Scope Contract JSON.
```

## Prompt B3 - Ask mode: revisar si el endpoint esta correcto

```text
Review the backend endpoint for ScopeShield.

Please check:
- Does it follow the project conventions?
- Does it validate missing clientRequest?
- Does it return the expected Scope Contract JSON shape?
- Is the response easy for the frontend to consume?
- Is the implementation simple enough for a hackathon MVP?

Do not rewrite everything. Only suggest necessary fixes.
```

## Prompt B4 - Code mode: agregar generador determinista semirreal

Usar despues del mock basico. La idea es que no siempre responda exactamente igual.

```text
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

## Prompt B5 - Code mode: agregar repoContext

Usar si tienen tiempo y quieren que el backend parezca mas conectado al repositorio.

```text
Enhance the ScopeShield backend to use repoContext when provided.

Requirements:
- Keep the same endpoint and response shape.
- repoContext is optional text that may include file names, folders, package names or notes about the repository.
- If repoContext includes routes, auth, dashboard, database, API, components or config files, include those as likely impacted areas.
- Add an "impactedAreas" entry that references repoContext when relevant.
- Do not fail if repoContext is empty.
- Keep this as deterministic logic, not a real AI integration yet.
```

## Prompt B6 - Advanced mode: depurar backend y frontend juntos

Usar cuando ya exista endpoint y frontend.

```text
Debug the ScopeShield integration between frontend and backend.

Please inspect the current frontend API call and the backend endpoint.

Check:
- Is the frontend calling the correct URL?
- Is the request method POST?
- Is the JSON body correct?
- Does the backend validate clientRequest?
- Does the backend return the expected Scope Contract JSON?
- Are loading and error states handled correctly?

If you find issues, propose the smallest fixes first.
Do not refactor unrelated code.
```

---

# Prompts compartidos para ambos

## Prompt C1 - Orchestrator mode: integrar proyecto completo

Usar cuando ya tengan backend y frontend.

```text
We are preparing ScopeShield for a hackathon demo.

Please review the full project and coordinate the final integration.

Goal:
- The user can paste a vague request.
- The frontend sends it to the backend.
- The backend returns a Scope Contract JSON.
- The dashboard renders the result clearly.
- The app is demo-ready.

Check:
- Main flow works end to end.
- No obvious runtime errors.
- The UI clearly communicates the value.
- The backend response shape matches the frontend expectations.
- The demo case works:
  "Solo agrega login con Google, cambia el dashboard y que se vea mas moderno."

First give me a short checklist of what you will inspect.
Then suggest the smallest changes needed.
```

## Prompt C2 - Ask mode: preparar demo

```text
Help us prepare a 2-minute hackathon demo for ScopeShield.

Context:
ScopeShield converts vague client requests into clear technical scope contracts.

Demo flow:
1. Show a vague client request.
2. Run ScopeShield.
3. Show the Scope Risk Score.
4. Explain hidden scope.
5. Show clarifying questions.
6. Show the client reply.
7. Mention how IBM Bob helped build the frontend, backend and analysis logic.

Please create:
- A 30-second pitch.
- A 2-minute demo script.
- Three judge-friendly bullet points about impact.
- A short explanation of how IBM Bob was used.
```

## Prompt C3 - Ask mode: documentar uso de Bob

```text
Create a concise IBM Bob usage report for the hackathon submission.

We used IBM Bob to:
- Plan the frontend.
- Generate UI components.
- Plan the backend endpoint.
- Implement the Scope Contract mock endpoint.
- Improve deterministic analysis logic.
- Debug frontend/backend integration.

Please format this as:
- Task.
- Bob mode used.
- Prompt summary.
- Output generated.
- Manual changes.
- Final result.

Keep it clear and honest. Do not overclaim that Bob built everything alone.
```

---

# Primeros pasos recomendados

## Persona A

1. Usar `Prompt A1` en Plan mode.
2. Usar `Prompt A2` en Code mode.
3. Trabajar con el JSON mock.
4. Esperar endpoint real de Persona B.
5. Usar `Prompt A3` para conectar frontend con backend.

## Persona B

1. Usar `Prompt B1` en Plan mode.
2. Usar `Prompt B2` en Code mode.
3. Probar el endpoint con una solicitud mock.
4. Usar `Prompt B4` si hay tiempo para mejorar la logica.
5. Usar `Prompt B6` si hay problemas de integracion.

---

# Actualizacion: backend mock ya iniciado

Si Persona B ya corrio los prompts de Plan mode y Code mode para el backend, entonces ya no debe volver a empezar desde `Prompt B1` o `Prompt B2`.

El siguiente objetivo es validar lo que ya existe, compartir el contrato con Persona A y mejorar la respuesta para que la demo se sienta mas real.

## Nuevo orden recomendado desde este punto

## Persona B

1. Confirmar que el endpoint existe.
2. Confirmar la ruta exacta, idealmente:
   `POST /api/scope/analyze`
3. Probar que acepta:

```json
{
  "clientRequest": "Solo agrega login con Google, cambia el dashboard y que se vea mas moderno.",
  "repoContext": "Proyecto web con autenticacion, dashboard, rutas protegidas y componentes React."
}
```

4. Confirmar que devuelve el Scope Contract JSON.
5. Compartir con Persona A:
   - URL del endpoint.
   - Metodo HTTP.
   - Body esperado.
   - Ejemplo de response.
6. Usar `Prompt B3` para revisar calidad.
7. Usar `Prompt B4` para mejorar la logica si hay tiempo.
8. Usar `Prompt B5` para considerar `repoContext` si quieren una demo mas fuerte.

## Persona A

1. Seguir avanzando con mock local si el endpoint aun no esta listo para integracion.
2. Si el endpoint ya responde, usar `Prompt A3` para conectarlo.
3. Mantener fallback mock por si el endpoint falla durante la demo.
4. Preparar UI para mostrar claramente:
   - Scope Risk Score.
   - Hidden Scope.
   - Risks.
   - Clarifying Questions.
   - Client Reply.

---

# Prompts siguientes si backend ya existe

## Prompt B7 - Ask mode: validar el backend existente

```text
We already created the first backend mock for ScopeShield.

Please review the existing implementation without rewriting everything.

Check:
- What is the exact endpoint path?
- What request body does it expect?
- Does it validate that clientRequest exists?
- Does it return a 400 error when clientRequest is missing?
- Does it return the full Scope Contract JSON shape?
- Is the response easy for the frontend to consume?
- Are field names consistent with the agreed contract?

Expected Scope Contract fields:
- requestSummary
- hiddenScope
- impactedAreas
- riskScore
- risks
- clarifyingQuestions
- estimate
- implementationPlan
- clientReply
- checklist

After reviewing, give me:
1. What is working.
2. What is missing.
3. The smallest fixes needed.
4. The exact endpoint documentation I should send to my frontend teammate.
```

## Prompt B8 - Code mode: corregir solo lo necesario

```text
Apply only the necessary fixes to the existing ScopeShield backend endpoint.

Do not rewrite the whole backend.
Do not change the endpoint path unless it is clearly wrong.

Requirements:
- Keep the agreed Scope Contract JSON shape.
- Ensure clientRequest is required.
- Return a clear 400 response if clientRequest is missing.
- Return a realistic demo response for:
  "Solo agrega login con Google, cambia el dashboard y que se vea mas moderno."
- Keep the code simple and readable for a hackathon MVP.
- Make sure the frontend can consume the response without transformations.

After implementing, summarize:
- Files changed.
- Endpoint path.
- Request body.
- Example response.
```

## Prompt B9 - Ask mode: crear handoff para frontend

```text
Create a concise backend handoff note for my frontend teammate.

Include:
- Endpoint URL.
- HTTP method.
- Request body example.
- Success response example.
- Error response example.
- Field descriptions.
- Any current limitations.

Context:
This is for ScopeShield, a hackathon app that converts vague client requests into a Scope Contract.

Keep it short, practical and ready to paste into our team chat.
```

## Prompt A6 - Code mode: conectar con backend ya existente

```text
Connect the ScopeShield frontend to the existing backend endpoint.

Use the backend handoff details:
- Endpoint: POST /api/scope/analyze
- Body:
  {
    "clientRequest": "string",
    "repoContext": "string optional"
  }

Requirements:
- Send the textarea value as clientRequest.
- Include repoContext only if the UI already has a field for it.
- Render the returned Scope Contract JSON.
- Keep the current mock response as a fallback for demo safety.
- Show loading state while waiting.
- Show an error state if the request fails.
- Do not change the visual design unless needed for integration.
```
