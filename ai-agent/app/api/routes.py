from fastapi import APIRouter
from typing import List
from app.agent.graph import build_graph
from app.schemas.pydantic_models import JobPostingSchema

router = APIRouter()
graph = build_graph()

@router.post("/trigger-workflow", response_model=List[JobPostingSchema])
def trigger_agent_workflow():
    import random
    queries = [
        '"Software Engineer" OR "Backend Engineer" OR "Full Stack" intern entry level 2025',
        'site:jobs.lever.co OR site:boards.greenhouse.io "Python" OR "AI" OR "ML" internship',
        '"Software Engineering Intern" 2025 entry level jobs',
        'site:linkedin.com/jobs "Software Engineer" internship 2025',
        '"Frontend Developer" OR "React" OR "Vue" intern entry level 2025',
    ]
    # Pick a random query each run for variety
    selected_query = random.choice(queries)
    
    initial_state = {
        "search_query": selected_query,
        "target_skills": ["Java", "Spring Boot", "React", "Python", "SQL", "Machine Learning", "REST API", "Docker"],
        "raw_urls": [],
        "scraped_content": {},
        "final_postings": []
    }
    
    result = graph.invoke(initial_state)
    return result.get("final_postings", [])
