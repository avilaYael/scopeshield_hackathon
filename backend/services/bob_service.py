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
    Bob Shell only runs when an API key is present.
    This keeps local development deterministic and avoids accidental external calls.
    """
    return bool(os.getenv("BOBSHELL_API_KEY"))


def analyze_with_bob(client_request: str, repo_context: Optional[str] = None) -> ScopeContract:
    if not is_bob_enabled():
        raise BobAnalysisError("BOBSHELL_API_KEY is not configured")

    if not _bob_command_available():
        raise BobAnalysisError("Bob Shell command is not available")

    prompt = _build_prompt(client_request, repo_context)
    configured_timeout = int(os.getenv("BOB_TIMEOUT_SECONDS", "150"))
    timeout_seconds = max(configured_timeout, 150)
    cwd = Path(__file__).resolve().parents[2]

    try:
        completed = subprocess.run(
            _bob_command(prompt),
            cwd=cwd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout_seconds,
            env=_bob_environment(),
        )
    except subprocess.TimeoutExpired as exc:
        raise BobAnalysisError("Bob Shell timed out") from exc
    except OSError as exc:
        raise BobAnalysisError(f"Bob Shell failed to start: {exc}") from exc

    if completed.returncode != 0:
        error_output = (completed.stderr or completed.stdout).strip()
        raise BobAnalysisError(f"Bob Shell exited with code {completed.returncode}: {error_output[:500]}")

    payload = _extract_json_object(completed.stdout)

    try:
        return ScopeContract.model_validate(payload)
    except ValidationError as exc:
        raise BobAnalysisError(f"Bob returned an invalid Scope Contract: {exc}") from exc


def _bob_command_available() -> bool:
    return bool(shutil.which("bob") or shutil.which("bob.cmd") or shutil.which("bob.ps1"))


def _bob_command(prompt: str) -> list[str]:
    # On Windows, npm-installed commands may resolve to .ps1 scripts. cmd /c handles
    # the normal npm shim resolution reliably from subprocess.
    if os.name == "nt":
        return [
            "cmd",
            "/c",
            "bob",
            "--auth-method",
            "api-key",
            "--accept-license",
            "--hide-intermediary-output",
            "-p",
            prompt,
        ]
    return [
        "bob",
        "--auth-method",
        "api-key",
        "--accept-license",
        "--hide-intermediary-output",
        "-p",
        prompt,
    ]


def _bob_environment() -> dict[str, str]:
    env = os.environ.copy()
    bob_key = env.get("BOBSHELL_API_KEY")
    if bob_key and not env.get("GEMINI_API_KEY"):
        # bobshell 1.0.3 expects GEMINI_API_KEY to be set to the same value.
        env["GEMINI_API_KEY"] = bob_key
    return env


def _build_prompt(client_request: str, repo_context: Optional[str]) -> str:
    context = repo_context.strip() if repo_context else "No repo context provided."

    return (
        "Genera AHORA un Scope Contract JSON valido para ScopeShield. "
        "Responde SOLO JSON sin markdown, sin explicaciones y sin texto fuera del JSON. "
        "La primera letra debe ser { y la ultima debe ser }. "
        f"Solicitud del cliente: {client_request}. "
        f"Contexto del repositorio: {context}. "
        "Campos requeridos exactos: requestSummary string; hiddenScope array de strings; "
        "impactedAreas array de objetos con area string, files array de strings, complexity string usando Baja, Media o Alta; "
        "riskScore numero entre 0 y 10; risks array de objetos con type string, description string, severity string usando Baja, Media o Alta; "
        "clarifyingQuestions array de strings; estimate objeto con complexity string, timeRange string y breakdown objeto; "
        "implementationPlan array de objetos con step numero, task string, duration string, dependencies array de strings; "
        "clientReply string; checklist array de strings. "
        "Limites de longitud: hiddenScope maximo 6 items; impactedAreas maximo 4; risks maximo 5; "
        "clarifyingQuestions maximo 6; implementationPlan maximo 6; checklist maximo 10. "
        "Haz el analisis especifico para la solicitud, no uses datos genericos de demo. "
        "Incluye alcance oculto, riesgos tecnicos, preguntas aclaratorias, estimacion y respuesta profesional al cliente. "
        "Usa espanol en todos los textos visibles."
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
