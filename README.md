# Agentic Career Matchmaker 🚀

Welcome to the **Agentic Career Matchmaker**! This is an automated system designed to help you find the best internship opportunities using AI. 

The system doesn't just search the web; it uses an **AI Agent** to scrape real-time data, evaluate job requirements against your criteria, and display everything in a premium, dark-luxury dashboard.

---

## 🌟 What does it do?
1. **Scrapes:** Automatically searches the web (using SerpAPI) for latest internship postings.
2. **Analyzes:** Uses Google's Gemini AI to extract key details (role, company, compensation, location) and score the relevance.
3. **Persists:** Saves the findings into a MySQL database.
4. **Displays:** Renders all data on a beautiful, interactive React dashboard.

---

## 🛠️ System Architecture
The project is split into three main parts:
*   **AI Agent (Python/FastAPI):** The "brain" that searches and analyzes data.
*   **Backend (Java/Spring Boot):** The "heart" that manages data and schedules the AI tasks.
*   **Frontend (React/Vite):** The "face" that you interact with.

---

## 🚀 Getting Started

To run this project on your local machine, you'll need to initialize each component.

### 📋 Prerequisites
Ensure you have the following installed:
*   **Python 3.11+**
*   **Java 17+** (Maven included)
*   **Node.js & npm**
*   **MySQL Server**

---

### Phase 1: AI Agent Setup 🤖
1.  Go into the `ai-agent` folder: `cd ai-agent`
2.  Create a virtual environment: `python -m venv venv`
3.  Activate it: `venv\Scripts\activate` (Windows)
4.  Install dependencies: `pip install -r requirements.txt`
5.  **Initialize Config:** Copy `.env.example` to `.env` and add your `SERPAPI_API_KEY` and `GOOGLE_API_KEY`.
6.  Run it: `python app/main.py`

### Phase 2: Backend Setup ☕
1.  Go into the `backend` folder: `cd backend`
2.  **Initialize Config:** Copy `.env.example` to `.env` and update your MySQL database credentials.
3.  Create the database: `mysql -u root -p -e "CREATE DATABASE matchmaker_db;"`
4.  Run the Spring Boot app: `./mvnw spring-boot:run`

### Phase 3: Frontend Setup 💻
1.  Go into the `frontend` folder: `cd frontend`
2.  Install dependencies: `npm install`
3.  **Initialize Config:** Copy `.env.example` to `.env`.
4.  Run it: `npm run dev`

---

## 🔑 Crucial Notes on Initialization
> [!IMPORTANT]
> **Don't Forget Secrets:** The project will NOT work without valid API keys for SerpAPI (web search) and Google Gemini (AI analysis). Make sure your `.env` files are correctly set up in each directory.

> [!TIP]
> **Order Matters:** Start the AI Agent first (port 8000), then the Backend (port 8080), and finally the Frontend.

---

## 📜 License
This project is for educational and portfolio purposes. Feel free to use it and build upon it!
