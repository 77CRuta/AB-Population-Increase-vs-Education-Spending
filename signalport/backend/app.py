"""FastAPI application factory for SignalPort."""

import logging
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.config import load_config, get_server_params
from backend.db.database import Database
from backend.dependencies import set_db, set_config, get_db, get_app_config

logger = logging.getLogger(__name__)


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    config = load_config()
    server_cfg = get_server_params(config)
    db = Database(server_cfg["database_path"])

    set_db(db)
    set_config(config)

    app = FastAPI(
        title="SignalPort",
        description="Financial market research API — Oil & Gas and Defence sectors",
        version="1.0.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Import routers after dependencies are set
    from backend.routes.companies import router as companies_router
    from backend.routes.reports import router as reports_router
    from backend.routes.earnings import router as earnings_router
    from backend.routes.featured import router as featured_router
    from backend.routes.screening import router as screening_router

    app.include_router(companies_router, prefix="/api")
    app.include_router(reports_router, prefix="/api")
    app.include_router(earnings_router, prefix="/api")
    app.include_router(featured_router, prefix="/api")
    app.include_router(screening_router, prefix="/api")

    @app.get("/api/health")
    async def health():
        return {"status": "ok"}

    @app.get("/api/freshness")
    async def freshness():
        """Check data freshness: stale if latest report is older than TTL."""
        db = get_db()
        app_config = get_app_config()
        ttl_hours = app_config.get("cache", {}).get("ttl_hours", 24)

        reports = db.get_all_latest_reports()
        if not reports:
            return {
                "last_updated": None,
                "stale": True,
                "staleness_hours": None,
            }

        max_generated_at = max(
            r["generated_at"]
            for r in reports
            if r.get("generated_at") is not None
        )
        now = datetime.now(timezone.utc)
        # Handle naive datetimes from SQLite by assuming UTC
        if max_generated_at.tzinfo is None:
            max_generated_at = max_generated_at.replace(tzinfo=timezone.utc)
        staleness_hours = (now - max_generated_at).total_seconds() / 3600
        stale = staleness_hours > ttl_hours

        return {
            "last_updated": str(max_generated_at),
            "stale": stale,
            "staleness_hours": round(staleness_hours, 2),
        }

    @app.post("/api/pipeline/run")
    async def trigger_pipeline(api_key: str | None = None):
        """Manually trigger the daily pipeline."""
        from backend.pipeline.daily_pipeline import run_pipeline

        expected_key = config.get("pipeline", {}).get("api_key", "")
        if expected_key and api_key != expected_key:
            raise HTTPException(status_code=401, detail="Invalid API key")

        await run_pipeline(config, get_db())
        return {"status": "pipeline_complete"}

    # Serve frontend static files if built
    frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
    if frontend_dist.exists():
        app.mount("/", StaticFiles(directory=str(frontend_dist), html=True))

    return app
