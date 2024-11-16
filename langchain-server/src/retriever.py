from langchain_chroma import Chroma
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from src.helpers import load_text_pdf, split_chunks
from src.config import env

vs = None

def obtain_retriever():
    global vs

    embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    pdf_data = load_text_pdf(env.file)
    chunks = split_chunks(pdf_data)

    persist_db = "chroma_db_dir"

    collection_db = "chroma_collection"

    vs = Chroma.from_documents(
        documents=chunks,
        embedding=embed_model,
        persist_directory="",
        collection_name=collection_db
    )

    vectorstore = Chroma(
        embedding_function=embed_model,
        persist_directory=persist_db,
        collection_name=collection_db
    )

    retriever = vectorstore.as_retriever(
        search_kwargs={'k': 5}
    )

    return retriever