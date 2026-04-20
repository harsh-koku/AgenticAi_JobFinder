import os
from langchain_community.utilities import SerpAPIWrapper
from app.agent.state import GraphState

def search_jobs(state: GraphState) -> dict:
    print("--- Searching for Jobs ---")
    query = state["search_query"]
    
    # Needs SERPAPI_API_KEY in environment
    try:
        search = SerpAPIWrapper()
        results = search.results(query)
        
        # Extract URLs from organic results. For ATS, usually we use google dorks like:
        # site:greenhouse.io OR site:lever.co "Software Engineering Intern"
        urls = []
        if "organic_results" in results:
            for res in results["organic_results"]:
                if "link" in res:
                    urls.append(res["link"])
                    
        print(f"Found {len(urls)} URLs from SerpAPI: {urls}")
        # Limit to top 5
        return {"raw_urls": urls[:5]}
    except Exception as e:
        print(f"SerpAPI Error: {e}")
        print(f"Full exception: {type(e).__name__}: {e}")
        return {"raw_urls": []}
