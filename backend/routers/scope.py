from fastapi import APIRouter, HTTPException
from models.schemas import ScopeAnalysisRequest, ScopeAnalysisResponse
from services.analysis_service import generate_scope_contract

router = APIRouter(prefix="/api/scope", tags=["scope"])


@router.post("/analyze", response_model=ScopeAnalysisResponse)
async def analyze_scope(request: ScopeAnalysisRequest):
    """
    Analiza una solicitud de cliente y genera un Scope Contract.
    
    Este endpoint recibe una solicitud ambigua del cliente y retorna:
    - Resumen claro del pedido
    - Alcance oculto identificado
    - Áreas y archivos impactados
    - Riesgos técnicos
    - Preguntas de aclaración
    - Estimación de tiempo
    - Plan de implementación
    - Respuesta profesional lista para enviar
    - Checklist de tareas
    
    Usa IBM Bob Shell cuando está configurado con BOBSHELL_API_KEY.
    Si Bob no está disponible, usa un analizador local determinístico para demo.
    """
    try:
        # Validación adicional (Pydantic ya valida que clientRequest existe)
        if not request.clientRequest.strip():
            raise HTTPException(
                status_code=400,
                detail="El campo 'clientRequest' no puede estar vacío"
            )
        
        # Generar Scope Contract con Bob si está configurado, o fallback local
        scope_contract = generate_scope_contract(
            client_request=request.clientRequest,
            repo_context=request.repoContext
        )
        
        return ScopeAnalysisResponse(
            success=True,
            data=scope_contract
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error interno al procesar la solicitud: {str(e)}"
        )

# Made with Bob
