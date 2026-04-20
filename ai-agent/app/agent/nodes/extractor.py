import requests
import random
from bs4 import BeautifulSoup
from app.agent.state import GraphState

USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
]

def extract_job_content(state: GraphState) -> dict:
    urls = state["raw_urls"]
    scraped_content = {}
    print(f"--- Extracting Job Content from {len(urls)} URLs ---")
    if not urls:
        print("WARNING: No URLs received from searcher!")
        return {"scraped_content": {}}
    
    for url in urls:
        try:
            headers = {
                'User-Agent': random.choice(USER_AGENTS),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
            }
            response = requests.get(url, headers=headers, timeout=15)
            print(f"  {url} -> HTTP {response.status_code}")
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                for script_or_style in soup(['script', 'style']):
                    script_or_style.decompose()
                text = soup.get_text(separator=' ', strip=True)
                scraped_content[url] = text[:5000]
            else:
                scraped_content[url] = f"Failed to fetch content, status code: {response.status_code}"
        except Exception as e:
            scraped_content[url] = f"Error fetching content: {e}"
            
    successful = sum(1 for v in scraped_content.values() if not v.startswith("Failed") and not v.startswith("Error"))
    print(f"  Successfully scraped {successful}/{len(urls)} URLs")
    return {"scraped_content": scraped_content}
