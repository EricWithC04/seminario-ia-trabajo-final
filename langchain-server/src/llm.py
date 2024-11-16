from src.config import env
from langchain_ollama import ChatOllama

def load_llm():
    llm = ChatOllama(model=env.model)
    return llm