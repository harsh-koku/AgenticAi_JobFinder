import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv("d:/Project Main/Agentic AI/ai-agent/.env")
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)
