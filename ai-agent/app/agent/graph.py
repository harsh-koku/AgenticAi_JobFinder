from langgraph.graph import StateGraph, END
from app.agent.state import GraphState
from app.agent.nodes.searcher import search_jobs
from app.agent.nodes.extractor import extract_job_content
from app.agent.nodes.evaluator import evaluate_jobs

def build_graph():
    workflow = StateGraph(GraphState)
    
    # Add Nodes
    workflow.add_node("search", search_jobs)
    workflow.add_node("extract", extract_job_content)
    workflow.add_node("evaluate", evaluate_jobs)
    
    # Define Edges
    workflow.set_entry_point("search")
    workflow.add_edge("search", "extract")
    workflow.add_edge("extract", "evaluate")
    workflow.add_edge("evaluate", END)
    
    # Compile
    return workflow.compile()
