import os
from openai import OpenAI 
from dotenv import load_dotenv

class GroqLLM:
    model_name = "llama-3.3-70b-versatile" # Class Variable
    def __init__(self):
        load_dotenv()        

    def get_llm_model(self) -> OpenAI:

        groq_api_key = os.getenv('GROQ_API_KEY')

        if not groq_api_key :
            raise ValueError("API key is required to call Groq.")

        try:
            llm = OpenAI(api_key=groq_api_key, base_url="https://api.groq.com/openai/v1")
            return llm
        except Exception as e:
            error_msg = f"Groq initialization error: {e}"
            raise ValueError(error_msg)
    