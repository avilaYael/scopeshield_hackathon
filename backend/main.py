from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import scope
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Crear aplicación FastAPI
app = FastAPI(
    title="ScopeShield API",
    description="API para convertir solicitudes ambiguas en contratos de scope técnicos claros",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios permitidos
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(scope.router)


@app.get("/")
async def root():
    """Endpoint raíz - información de la API"""
    return {
        "message": "ScopeShield API - Convierte solicitudes ambiguas en scope técnico claro",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "analyze": "POST /api/scope/analyze"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ScopeShield API"}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

# Made with Bob
