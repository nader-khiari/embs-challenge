import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from dotenv import load_dotenv
import pandas as pd
import os
load_dotenv(dotenv_path = '.env')

db_url = os.getenv("FIREBASE_URL")


# db_url = os.getenv("FIREBASE_URL")
# cred = credentials.Certificate("FirebaseHelpers/firebase_key.json")
# firebase_admin.initialize_app(cred, {
#     'databaseURL': db_url
# })


def insert_smartwatch_data(data):
    ref = db.reference('/smartwatch')
    if not(ref.get()):
        users_ref = ref.child('data')
        users_ref.set(data.to_dict("records"))

def insert_social_media_data(data, reference):
    ref = db.reference(reference)
    users_ref = ref.child('data')
    if users_ref.get():
        users_ref.update(data)
    else:users_ref.set(data)


def insert_form_data(data, reference):
    ref = db.reference(f"/{reference}")
    users_ref = ref.child('data')
    if ref.get():
        users_ref.update(data)
    else:users_ref.set(data)

# insert_smartwatch_data(pd.DataFrame({"a": [0, 1], "b": [0, 1]}))