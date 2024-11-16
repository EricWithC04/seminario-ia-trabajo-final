from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import os
# import shutil
from fastapi.middleware.cors import CORSMiddleware
from src.chain import question

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str

@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # folder_path = "chroma_db_dir"
    # if os.path.exists(folder_path):
        # shutil.rmtree(folder_path)
    
    file_path = os.path.join("src/docs/", "file.pdf")

    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {"message": "Archivo PDF subido exitosamente."}

@app.post("/ask")
async def ask(query: Query):
    response = question(query.query)
    return {"response": response}