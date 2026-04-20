from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="Agentic Career Matchmaker AI Microservice",
    description="LangGraph-powered AI agent to crawl and score job postings.",
    version="1.0.0"
)

app.include_router(router)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ai-agent"}
