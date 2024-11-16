from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyMuPDFLoader

def load_text_pdf(pdf_file):
    loader = PyMuPDFLoader(pdf_file)
    data_pdf = loader.load()
    return data_pdf

def split_chunks(data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
    chunks = text_splitter.split_documents(data)
    return chunks