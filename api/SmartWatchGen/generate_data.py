import pandas as pd
import datetime
import numpy as np


start_date = datetime.datetime(2024, 12, 15, 0, 0)
end_date = datetime.datetime(2024, 12, 22, 0, 0)

timestamps = [(start_date + datetime.timedelta(seconds=60*x)).strftime("%d-%m-%Y %H:%M:%S") for x in range(int((end_date - start_date).total_seconds()/60))]
days = (end_date - start_date).days
len_ts = len(timestamps)

heart_rate_df = pd.read_csv("SmartWatchGen/heartrate_seconds_merged.csv")
heart_rate_df.columns = ["Id", "Time", "heart_rate"]

# Loop
def generate_hr():
    select_start = np.random.randint(0, heart_rate_df.shape[0]-len_ts)
    heart_rate = heart_rate_df.heart_rate.rolling(20).median().dropna().iloc[select_start: select_start+ len_ts]
    return heart_rate.reset_index(drop = True)

def generate_hrv():
    hrv_states = ["Low", "moderate", "High"]
    hrv_vect = []
    
    while True:
        if len(hrv_vect) >= len_ts: break
        number = np.random.randint(60, 360)
        state = np.random.choice(hrv_states, p=[0.3, 0.4, 0.3])
        hrv_vect = hrv_vect + [str(state) for _ in range(number)]
    return hrv_vect[:len_ts]

def generate_sleep(df):
    data = df.copy()
    data["day"] = df.ts.apply(lambda x: x.split(" ")[0].split("-")[0])
    
    sleep_vect = []
    sleep_enumeration = []

    for i, day in enumerate(data.day.unique()):
        day_df = data.query(f"day == '{day}'")

        sleep_start_idx = np.random.randint(0, int(day_df.shape[0]/4))
        sleep_duration = np.random.randint(180, 420)
        sleep_vect = sleep_vect + [0 for _ in range(0, sleep_start_idx)] + [1 for _ in range(sleep_start_idx, sleep_start_idx + sleep_duration)] + [0 for _ in range(sleep_start_idx + sleep_duration, day_df.shape[0])]
        sleep_enumeration = sleep_enumeration + [0 for _ in range(0, sleep_start_idx)] + [i+1 for _ in range(sleep_start_idx, sleep_start_idx + sleep_duration)] + [0 for _ in range(sleep_start_idx + sleep_duration, day_df.shape[0])]

    df["is_asleep"] = sleep_vect
    df["sleep_cycle_num"] = sleep_enumeration
    return df

def generate_data():
    generated_data = pd.DataFrame({"ts":timestamps})
    generated_data["heart_rate"] = generate_hr()
    generated_data["heart_rate_variability"] = generate_hrv()
    generated_data = generate_sleep(generated_data)
    return generated_data