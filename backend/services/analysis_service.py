import logging
from typing import Optional

from models.schemas import ScopeContract
from services.bob_service import BobAnalysisError, analyze_with_bob
from services.mock_service import generate_mock_scope_contract

logger = logging.getLogger(__name__)


def generate_scope_contract(client_request: str, repo_context: Optional[str] = None) -> ScopeContract:
    """
    Main analysis entry point.
    Uses IBM Bob Shell when configured, then falls back to the deterministic local analyzer.
    """
    try:
        return analyze_with_bob(client_request, repo_context)
    except BobAnalysisError as exc:
        logger.warning("Using local analyzer fallback because Bob is unavailable: %s", exc)
        return generate_mock_scope_contract(
            client_request=client_request,
            repo_context=repo_context,
        )
