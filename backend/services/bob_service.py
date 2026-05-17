import json
import os
import shutil
import subprocess
from json import JSONDecodeError
from pathlib import Path
from typing import Optional

from pydantic import ValidationError

from models.schemas import ScopeContract


class BobAnalysisError(Exception):
    """Raised when Bob is unavailable or returns an invalid contract."""


def is_bob_enabled() -> bool:
    """
    Checks if API key is present for Gemini / Bob.
    """
    return bool(os.getenv("GEMINI_API_KEY") or os.getenv("BOBSHELL_API_KEY"))


def analyze_with_bob(client_request: str, repo_context: Optional[str] = None) -> ScopeContract:
    import urllib.request
    import urllib.error

    if not is_bob_enabled():
        raise BobAnalysisError("GEMINI_API_KEY is not configured")

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("BOBSHELL_API_KEY")
    prompt = _build_prompt(client_request, repo_context)
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json"}
    }

    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(payload).encode('utf-8'), 
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=150) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            text_output = result["candidates"][0]["content"]["parts"][0]["text"]
            
            parsed_payload = _extract_json_object(text_output)
            return ScopeContract.model_validate(parsed_payload)
            
    except urllib.error.URLError as exc:
        raise BobAnalysisError(f"Network error calling Gemini API: {exc}")
    except (KeyError, IndexError) as exc:
        raise BobAnalysisError(f"Unexpected response format from Gemini API: {exc}")
    except ValidationError as exc:
        raise BobAnalysisError(f"Gemini returned an invalid Scope Contract: {exc}") from exc


def _build_prompt(client_request: str, repo_context: Optional[str]) -> str:
    context = repo_context.strip() if repo_context else "No repo context provided."

    return (
        "Generate NOW a valid Scope Contract JSON for ScopeShield. "
        "Respond with ONLY JSON without markdown, without explanations, and without any text outside the JSON. "
        "The first character must be { and the last must be }. "
        f"Client request: {client_request}. "
        f"Repository context: {context}. "
        "\n\n"
        "STRICT UNILINGUAL ENGLISH BOUNDARY (MANDATORY):\n"
        "Due to the absence of i18n/localization libraries in this codebase, ALL string fields in the output JSON schema MUST be generated strictly in fluent, professional English. "
        "This includes: requestSummary, hiddenScope array items, impactedAreas descriptions, risks descriptions, clarifyingQuestions, implementationPlan task descriptions, clientReply, and checklist items. "
        "DO NOT mix languages. DO NOT output Spanish text. English ONLY for all visible strings.\n"
        "\n"
        "PROGRAMMATIC MATHEMATICAL VALIDATION (MANDATORY - HARD CONSTRAINT):\n"
        "BEFORE generating the final JSON, you MUST execute this mathematical validation:\n"
        "1. Extract Min_Days and Max_Days from 'estimate.timeRange' (e.g., '3-5 days' → Min=3, Max=5)\n"
        "2. Calculate: Min_Hours_Required = Min_Days * 8\n"
        "3. Calculate: Max_Hours_Required = Max_Days * 8\n"
        "4. Sum ALL hours from ALL steps in 'implementationPlan'\n"
        "5. VERIFY: Sum_Hours >= Min_Hours_Required AND Sum_Hours <= Max_Hours_Required\n"
        "6. If validation FAILS, you MUST add more steps to 'implementationPlan' until the sum converges.\n"
        "\n"
        "CORRECT VALIDATION EXAMPLE:\n"
        "- timeRange: '3-5 days' → Min_Hours=24, Max_Hours=40\n"
        "- implementationPlan steps: [6h, 8h, 4h, 6h, 8h, 4h] → Sum=36h\n"
        "- Validation: 24 <= 36 <= 40 → APPROVED ✓\n"
        "\n"
        "FAILED VALIDATION EXAMPLE (PROHIBITED):\n"
        "- timeRange: '3-5 days' → Min_Hours=24, Max_Hours=40\n"
        "- implementationPlan steps: [4h, 6h, 4h, 4h] → Sum=18h\n"
        "- Validation: 18 < 24 → REJECTED ✗ (MUST ADD MORE STEPS)\n"
        "\n"
        "CHECKLIST-TO-ROADMAP PARITY (MANDATORY):\n"
        "Every development task declared in 'checklist' that is a critical milestone (backend, data processing, external service integration) MUST have a corresponding, dedicated step in 'implementationPlan' with an assigned execution time block of AT LEAST 8 hours.\n"
        "\n"
        "CHECKLIST → ROADMAP MAPPING EXAMPLES:\n"
        "- Checklist: '✓ Implement PDF/Excel/CSV generation'\n"
        "  → Roadmap MUST include: 'Implement report generation service with export libraries' (8-12 hours)\n"
        "- Checklist: '✓ Create API endpoints for reports'\n"
        "  → Roadmap MUST include: 'Implement GET/POST /api/reports endpoints with filters' (6-8 hours)\n"
        "- Checklist: '✓ Integrate data processing library'\n"
        "  → Roadmap MUST include: 'Integrate and configure processing library (pandas/openpyxl)' (4-6 hours)\n"
        "\n"
        "STRUCTURAL PENALIZATION (PROHIBITED):\n"
        "Collapsing multi-tier deployment efforts (FastAPI + Next.js) into generic UI/styling tasks while omitting data orchestration layers is a VIOLATION of the payload schema specification.\n"
        "If 'impactedAreas' includes Backend/API AND 'checklist' mentions backend tasks, then 'implementationPlan' MUST include explicit backend steps.\n"
        "\n"
        "CRITICAL CONTEXT RULES:\n"
        "1. Analyze the client request to identify its real SEMANTIC INTENTION (UI/styles, backend/API, database, authentication, etc.).\n"
        "2. The fields 'hiddenScope', 'impactedAreas', 'risks', and 'implementationPlan' MUST have a DIRECT causal relationship with the detected semantic intention.\n"
        "3. DO NOT include infrastructure files (cache, database indexes, DevOps configs) unless the request EXPLICITLY mentions them or the repo context requires them.\n"
        "4. For cosmetic/UI changes (dark mode, colors, styles): focus ONLY on theme files, UI components, and CSS/Tailwind styles.\n"
        "5. For backend/API changes: focus on controllers, services, routes, and relevant models.\n"
        "6. For database changes: focus on migrations, models, and queries.\n"
        "7. The 'riskScore' must reflect REAL complexity: cosmetic changes = 1-3, medium logic changes = 4-7, architectural changes = 8-10.\n"
        "8. Hours in 'implementationPlan' must sum coherently with 'timeRange' in 'estimate' (e.g., 10-14 hours = 1-2 days).\n"
        "9. The 'breakdown' in 'estimate' must include at least 2 concepts (development + testing) with specific times.\n"
        "\n"
        "CHRONOLOGICAL COMPLETENESS AND MATHEMATICAL PARITY RULES (MANDATORY):\n"
        "10. MANDATORY MULTI-TIER MAPPING: If an application tier (Backend, API, Database, Frontend) is billed in 'estimate.breakdown' OR appears in 'impactedAreas', then 'implementationPlan' MUST contain AT LEAST ONE explicit development step for that specific tier.\n"
        "    - If 'breakdown' includes 'reports: 1-2 days' AND 'impactedAreas' includes 'Backend' or 'API/Routes', then you MUST generate steps like:\n"
        "      * 'Implement GET /api/reports endpoint with filters and pagination' (4-6 hours)\n"
        "      * 'Create report generation service with export library' (6-8 hours)\n"
        "      * 'Implement data serialization and JSON response format' (2-3 hours)\n"
        "11. STRICT MATHEMATICAL CONVERGENCE: The cumulative sum of ALL hours in 'implementationPlan' MUST converge EXACTLY with 'estimate.timeRange' using the formula: 1 day = 8 work hours.\n"
        "    - MANDATORY FORMULA: If 'timeRange' is 'X-Y days', then sum_hours_implementationPlan MUST be between (X*8) and (Y*8) hours.\n"
        "    - CORRECT Example: 'timeRange: 3-5 days' → steps sum to 24-40 hours (3*8=24, 5*8=40)\n"
        "    - CORRECT Example: 'timeRange: 1-2 days' → steps sum to 8-16 hours (1*8=8, 2*8=16)\n"
        "    - INCORRECT Example: 'timeRange: 3-5 days' but steps sum only 16-24 hours → THIS IS PROHIBITED\n"
        "12. PROHIBITION OF FRONTEND-ONLY ROADMAPS: If the scope includes server-side libraries, file streaming, API routing definitions, or backend business logic, then 'implementationPlan' CANNOT collapse all steps into UI/styles configuration.\n"
        "    - You MUST include explicit backend steps such as:\n"
        "      * Implementation of endpoints/controllers\n"
        "      * Service logic and data processing\n"
        "      * External library integration (pandas, openpyxl, reportlab, etc.)\n"
        "      * Data serialization and validation\n"
        "13. COMPLETE ARCHITECTURAL COVERAGE: Before generating 'implementationPlan', verify:\n"
        "    - Does 'estimate.breakdown' mention Backend/API/Database/Reports? → Generate backend steps\n"
        "    - Does 'impactedAreas' include 'Backend', 'API/Routes', 'Database'? → Generate backend steps\n"
        "    - Does the request mention 'export', 'generate', 'process', 'API'? → Generate backend steps\n"
        "    - Each identified layer MUST have representation in the roadmap\n"
        "14. DURATION FORMAT: Each step must specify duration in format 'X-Y hours' or 'X hours' with positive integers that sum correctly to the total.\n"
        "\n"
        "Required exact fields: requestSummary string; hiddenScope array of strings; "
        "impactedAreas array of objects with area string, files array of strings, complexity string using Low, Medium or High; "
        "riskScore number between 0 and 10; risks array of objects with type string, description string, severity string using Low, Medium or High; "
        "clarifyingQuestions array of strings; estimate object with complexity string, timeRange string and breakdown object with at least 2 keys; "
        "implementationPlan array of objects with step number, task string, duration string, dependencies array of strings; "
        "clientReply string; checklist array of strings. "
        "Length limits: hiddenScope maximum 6 items; impactedAreas maximum 4; risks maximum 5; "
        "clarifyingQuestions maximum 6; implementationPlan maximum 8 steps to allow complete layer coverage; checklist maximum 15. "
        "Perform specific analysis for the request, do not use generic demo data. "
        "Include hidden scope, technical risks, clarifying questions, estimation and professional client response. "
        "Use ENGLISH in all visible text fields. DO NOT use Spanish."
    )


def _extract_json_object(output: str) -> dict:
    text = output.strip()

    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:].strip()

    try:
        payload = json.loads(text)
        if isinstance(payload, dict):
            return payload
    except JSONDecodeError:
        pass

    decoder = json.JSONDecoder()
    for index, char in enumerate(output):
        if char != "{":
            continue
        try:
            payload, _ = decoder.raw_decode(output[index:])
        except JSONDecodeError:
            continue
        if isinstance(payload, dict) and "requestSummary" in payload:
            return payload

    raise BobAnalysisError("Bob output did not contain a valid JSON object")
