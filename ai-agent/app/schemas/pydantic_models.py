from pydantic import BaseModel, Field
from typing import List

class JobPostingSchema(BaseModel):
    company_name: str = Field(description="Name of the hiring company")
    job_title: str = Field(description="The exact title of the role")
    description_summary: str = Field(description="A short AI-generated summary of the job description")
    required_skills: List[str] = Field(description="A list of key skills required (e.g. Java, Spring Boot, React)")
    application_link: str = Field(description="Direct URL link to the job application")
    match_score: int = Field(description="Match score out of 100 based on the candidate's skills")

class JobEvaluationResult(BaseModel):
    postings: List[JobPostingSchema] = Field(description="List of evaluated job postings")
