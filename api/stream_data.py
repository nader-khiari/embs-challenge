from FirebaseHelpers import connect, insert_data
from SmartWatchGen import generate_data
from firebase_admin import db
import time
import datetime
import numpy as np

connect.connect()

data = generate_data.generate_data()
data.heart_rate = data.heart_rate + 3*(-0.5 * np.random.random(data.shape[0]))

counter = 0
ref = db.reference('/smartwatch_stream')
data_ref = ref.child('data')
data_ref.set([])

while True:
    if counter == data.shape[0]-1: 
        counter = 0
        data = generate_data.generate_data()
        data.heart_rate = data.heart_rate + 3*(-0.5 * np.random.random(data.shape[0]))

    row = data.iloc[counter].to_dict()
    row["ts"] = datetime.datetime.now().timestamp()
    print(row)
    data_ref.push().set(row)
    counter += 1
    time.sleep(60)