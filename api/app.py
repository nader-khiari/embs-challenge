from dotenv import load_dotenv
load_dotenv(dotenv_path = '.env')
import os
import json
from typing import Union, Literal
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from Questionnaire import schemas, tests_calculation
from FirebaseHelpers import connect, insert_data
from SocialMediaConnectors import Twitter, Spotify, Reddit
import datetime
from firebase_admin import db
from SmartWatchGen import generate_data
from Assistant import user_profiling, MindSphere


with open(os.path.join("Questionnaire", "Questionnaire_helpers.json"), "r") as f:
    questionnaire_helpers = json.load(f)

connect.connect()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],#origins,
    # allow_credentials=True,
    allow_methods=["*"],#["GET, POST"],
    allow_headers=["*"],
)

try:
    if not(db.reference("/twitter").get()): 
        print("no twitter data, getting data...") 
        twitter_data = Twitter.collect()
        insert_data.insert_social_media_data(twitter_data, "/twitter")
except: print("error collecting twitter data")
try:
    if not(db.reference("/reddit").get()):
        print("no reddit data, getting data...") 
        reddit_data = Reddit.get_user_activity()
        insert_data.insert_social_media_data(reddit_data, "/reddit")
except: print("error collecting reddit data")
try:
    if not(db.reference("/spotify").get()): 
        print("no spotify data, getting data...")
        spotify_data = Spotify.get_spotify_data()
        insert_data.insert_social_media_data(spotify_data, "/spotify")
except: print("error collecting spotify data")

# insert_data.insert_smartwatch_data(generate_data.generate_data())

# if db.reference(f"/general_questionnaire").get()["data"] and db.reference(f"/GAD7").get()["data"] and db.reference(f"/PHQ9").get()["data"]:
#     user_profile = user_profiling.create_user_profile()
# else: user_profile = "No data at the moment"

# messages = []
# print(user_profile)

@app.get("/questionnaire_helper/{section}")
async def questionnaire_helper(section: Literal["questionnaire", "gad7", "phq9"]):
    response = questionnaire_helpers[section]
    return JSONResponse(content=response, status_code=200)


@app.post("/general_questionnaire")
async def submit_questionnaire(recipe: schemas.GeneralQuestionnaire):
    submission = recipe.model_dump()
    fb_data = {int(datetime.datetime.now().timestamp()):{
        "answers": submission,
    }}
    insert_data.insert_form_data(fb_data, "general_questionnaire")
    return JSONResponse(content={"status": "success", "submission": submission}, status_code=200)


@app.post("/PHQ9")
async def submit_phq9(recipe: schemas.PHQ9Schema):
    submission = recipe.model_dump()
    diagnosis = tests_calculation.phq9(submission)
    # print(datetime.datetime.now().timestamp())
    fb_data = {int(datetime.datetime.now().timestamp()):{
        "answers": submission,
        "diagnosis": diagnosis
    }}
    insert_data.insert_form_data(fb_data, "PHQ9")
    return JSONResponse(content={"status": "success", "submission": submission}, status_code=200)


@app.post("/GAD7")
async def submit_gad7(recipe: schemas.GAD7Schema):
    submission = recipe.model_dump()
    diagnosis = tests_calculation.gad7(submission)
    # print(datetime.datetime.now().timestamp())
    fb_data = {int(datetime.datetime.now().timestamp()):{
        "answers": submission,
        "diagnosis": diagnosis
    }}
    
    insert_data.insert_form_data(fb_data, "GAD7")
    return JSONResponse(content={"status": "success", "submission": submission}, status_code=200)

@app.get("/chat_init")
async def chat_init():
    return JSONResponse(content={"status": "success", "chat_history": MindSphere.default_message}, status_code=200)

@app.post("/chat")
async def chat(recipe: MindSphere.ChatHistory):
    input_messages = recipe.model_dump()["chat_history"]
    if db.reference(f"/general_questionnaire").get()["data"] and db.reference(f"/GAD7").get()["data"] and db.reference(f"/PHQ9").get()["data"]:
        user_profile = user_profiling.create_user_profile()
    else: user_profile = "No data at the moment"
    messages = MindSphere.assistant_text_gen(user_profile, input_messages)
    return JSONResponse(content={"status": "success", "chat_history": messages}, status_code=200)