from pydantic import BaseModel, Field
from typing import List, Optional


class ScopeAnalysisRequest(BaseModel):
    """Request model para análisis de scope"""
    clientRequest: str = Field(..., min_length=1, description="Solicitud del cliente o stakeholder")
    repoContext: Optional[str] = Field(None, description="Contexto del repositorio (opcional)")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "clientRequest": "Solo agrega login con Google, cambia el dashboard y que se vea más moderno.",
                    "repoContext": "React + Node.js app"
                }
            ]
        }
    }


class ImpactedArea(BaseModel):
    """Área impactada por el cambio"""
    area: str
    files: List[str]
    complexity: str


class Risk(BaseModel):
    """Riesgo técnico identificado"""
    type: str
    description: str
    severity: str


class Estimate(BaseModel):
    """Estimación de tiempo y complejidad"""
    complexity: str
    timeRange: str
    breakdown: Optional[dict] = None


class ImplementationStep(BaseModel):
    """Paso del plan de implementación"""
    step: int
    task: str
    duration: str
    dependencies: List[str] = []


class ScopeContract(BaseModel):
    """Contrato de scope generado"""
    requestSummary: str
    hiddenScope: List[str]
    impactedAreas: List[ImpactedArea]
    riskScore: float = Field(..., ge=0, le=10)
    risks: List[Risk]
    clarifyingQuestions: List[str]
    estimate: Estimate
    implementationPlan: List[ImplementationStep]
    clientReply: str
    checklist: List[str]


class ScopeAnalysisResponse(BaseModel):
    """Response model del análisis"""
    success: bool = True
    data: ScopeContract

# Made with Bob
