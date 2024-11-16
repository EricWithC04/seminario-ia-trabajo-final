from dotenv import load_dotenv
import os

class Config:
    def __init__(self):
        load_dotenv()

    @property
    def model(self) -> str:
        return os.getenv('MODEL')
    
    @property
    def file(self) -> str:
        return os.getenv('FILE_PATH')
    
env = Config()