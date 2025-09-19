from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import structlog
from contextlib import asynccontextmanager

from src.core.config import settings
from src.core.logging import configure_logging, get_logger
from src.core.database import engine, Base
from src.core.middleware import RateLimitMiddleware, SecurityHeadersMiddleware
from src.api import auth, kolam, learning, users


logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    logger.info("Starting Kolam Learning Platform", version=settings.app_version)
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Kolam Learning Platform")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    
    # Configure logging
    configure_logging()
    
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="AI-powered Kolam learning platform with detection, generation, and interactive education",
        docs_url="/docs" if settings.debug else None,
        redoc_url="/redoc" if settings.debug else None,
        lifespan=lifespan,
    )
    
    # Configure CORS properly for production security
    if settings.debug:
        # Development mode - more permissive but still secure
        cors_origins = [
            "http://localhost:3000",
            "http://localhost:5173", 
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173"
        ]
    else:
        # Production mode - strict origins only
        cors_origins = [
            "https://your-kolam-app.vercel.app",  # Replace with actual Vercel domain
            "https://*.vercel.app"  # Vercel preview deployments
        ]
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],  # Explicit methods only
        allow_headers=["Content-Type", "Authorization", "Accept"],  # Explicit headers only
        max_age=3600,  # Cache preflight for 1 hour
    )
    
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["localhost", "127.0.0.1"] if settings.debug else ["your-kolam-app.vercel.app"]
    )
    
    # Add security middleware
    app.add_middleware(SecurityHeadersMiddleware)
    
    # Add rate limiting (more permissive in debug mode)
    if settings.debug:
        app.add_middleware(RateLimitMiddleware, calls_per_minute=120, calls_per_hour=2000)
    else:
        app.add_middleware(RateLimitMiddleware, calls_per_minute=60, calls_per_hour=1000)
    
    # Include routers
    app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
    app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
    app.include_router(kolam.router, prefix="/api/v1/kolam", tags=["kolam"])
    app.include_router(learning.router, prefix="/api/v1/learning", tags=["learning"])
    
    @app.get("/")
    async def root():
        """Root endpoint with basic API information."""
        return {
            "message": "Welcome to Kolam Learning Platform",
            "version": settings.app_version,
            "docs": "/docs" if settings.debug else "Documentation not available in production"
        }
    
    @app.get("/health")
    async def health_check():
        """Health check endpoint."""
        return {"status": "healthy", "version": settings.app_version}
    
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request, exc):
        """Global HTTP exception handler."""
        logger.error(
            "HTTP exception occurred",
            status_code=exc.status_code,
            detail=exc.detail,
            path=request.url.path
        )
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )
    
    @app.exception_handler(Exception)
    async def general_exception_handler(request, exc):
        """Global exception handler for unhandled exceptions."""
        logger.error(
            "Unhandled exception occurred",
            error=str(exc),
            path=request.url.path,
            exc_info=True
        )
        
        # In production, return generic error message
        if settings.debug:
            detail = f"Internal server error: {str(exc)}"
        else:
            detail = "Internal server error occurred"
        
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": detail}
        )
    
    return app


# Create the app instance
app = create_app()


def main():
    """Main entry point for the application."""
    import uvicorn
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        log_level=settings.log_level.lower(),
    )


if __name__ == "__main__":
    main()

