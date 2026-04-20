from typing import TypedDict, List
from app.schemas.pydantic_models import JobPostingSchema

class GraphState(TypedDict):
    search_query: str
    target_skills: List[str]
    raw_urls: List[str]              # Extracted from search
    scraped_content: dict            # Mapping of url -> raw text
    final_postings: List[JobPostingSchema] # Evaluated postings
