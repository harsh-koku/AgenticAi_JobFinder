import os
from langchain_google_genai import ChatGoogleGenerativeAI
from app.agent.state import GraphState
from app.schemas.pydantic_models import JobEvaluationResult

def evaluate_jobs(state: GraphState) -> dict:
    print("--- Evaluating Job Match ---")
    scraped_content = state["scraped_content"]
    target_skills = state["target_skills"]
    
    if not scraped_content:
        return {"final_postings": []}

    # Needs GOOGLE_API_KEY and GOOGLE_MODEL in environment
    model_name = os.getenv("GOOGLE_MODEL", "gemini-1.5-flash")
    llm = ChatGoogleGenerativeAI(model=model_name, temperature=0)
    structured_llm = llm.with_structured_output(JobEvaluationResult)
    
    final_postings = []
    
    for url, text in scraped_content.items():
        if "Failed" in text or "Error" in text:
            continue
            
        prompt = (
            f"Analyze the following job description from {url}.\n"
            f"Candidate Skills: {', '.join(target_skills)}\n\n"
            f"Job Description Text:\n{text}\n\n"
            f"Extract the company name, exact job title, a short description summary, "
            f"the required skills for the job, the application link (which is {url}), "
            f"and assign a match_score (1-100) based on how well the candidate's skills align with the required skills."
        )
        
        try:
            # Enforce strict parsing
            result: JobEvaluationResult = structured_llm.invoke(prompt)
            final_postings.extend(result.postings)
        except Exception as e:
            print(f"LLM Evaluation error for {url}: {e}")
            
    return {"final_postings": final_postings}
