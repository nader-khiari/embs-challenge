import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import typing
from dotenv import load_dotenv
import os



load_dotenv(dotenv_path = '.env')

db_url = os.getenv("FIREBASE_URL")

def connect():
    cred = credentials.Certificate("FirebaseHelpers/firebase_key.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': db_url
    })