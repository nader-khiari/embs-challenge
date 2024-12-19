import os
from mistralai import Mistral
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Literal
load_dotenv(dotenv_path = '.env')
import json

class ChatElement(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatHistory(BaseModel):
    chat_history: List[ChatElement]



mistral_api_key = os.getenv("MISTRAL_API_KEY")

client = Mistral(api_key=mistral_api_key)
model = "mistral-large-latest"

default_message = [
    {
        "role": "assistant",
        "content": "Hello, How are you feeling today?",
    }
]

def assistant_text_gen(user_profile, messages):
    prompt = f"""As a professional mental health assistant, you will gather information about the user's lifestyle, including their daily activities and stressors. 
Additionally, you will ask the user to provide more information about the answered questionnaire to help assess your mental well-being. 
Based on this information, you will inquire about your day-to-day life to identify potential factors contributing to your current challenges or future concerns.

The data below belong to the user, use them to identify which ares needs to be focused on:
{user_profile}
""" 
    if len(messages) == 1 and messages[0]["role"] == "user":
        default_messages = [
            {
                "role": "system",
                "content": prompt
            },
            {
                "role": "assistant",
                "content": "Hello, How are you feeling today?",
            },
        ]
    else:
        default_messages = [
            {
                "role": "system",
                "content": prompt
            }
        ]
    messages = default_messages + messages
    chat_response = client.chat.complete(model = model,
        messages = messages
    )
    messages.append({
        "role": "assistant",
        "content": chat_response.choices[0].message.content
    })
    return messages[1:]