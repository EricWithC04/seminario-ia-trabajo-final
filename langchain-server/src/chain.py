from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from src.retriever import obtain_retriever
from src.llm import load_llm
from src.templates import template as c_template

def obtain_qa(): 
    prompt = PromptTemplate(
        template=c_template,
        input_variables=['context', 'question']
    )

    llm = load_llm()
    retriever = obtain_retriever()

    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={'prompt': prompt}
    )
    return qa

def question(query):
    qa = obtain_qa()
    answer = qa.invoke({"query": query})
    return answer['result']