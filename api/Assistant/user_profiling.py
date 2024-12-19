import os
from dotenv import load_dotenv
from firebase_admin import db
load_dotenv(dotenv_path = '.env')
import json

with open(os.path.join("Questionnaire", "Questionnaire_helpers.json"), "r") as f:
    questionnaire_helpers = json.load(f)
    gad7_mapping = {}
    for x in  questionnaire_helpers["gad7"]["questions"]:
        gad7_mapping[x["shortenedName"]] = x["fullName"]

    phq9_mapping = {}
    for x in  questionnaire_helpers["phq9"]["questions"]:
        phq9_mapping[x["shortenedName"]] = x["fullName"]

diagnosis_mapping = {
    "Minimal Anxiety":"The test results shows that the user have little to no signs of anxiety",
    "Mild Anxiety":"The test results shows that the user may have or might develop anxiety over time, it is not urgent but it might be a great idea to avoid anything that might cause it",
    "Moderate Anxiety":"The test results shows that the user have moderate anxiety, isolating the causes is important in order to avoid/eliminate it",
    "Severe Anxiety":"The test results shows that the user have sever anxiety, understanding and inquiring about the causes is of utmost urgency",
    "Minimal Depression": "The test results shows that the user have little to no signs of depression",
    "Mild Depression": "The test results shows that the user may have or might develop depression over time, it is not urgent but it might be a great idea to avoid anything that might cause it",
    "Moderate Depression": "The test results shows that the user's mental health suffer from moderate depression, getting the causes is important in order to avoid any future complications",
    "Moderately Severe Depression": "The results shows that the user's mental health suffer from Moderately Severe Depression, getting down to the cause and seeking professional help is needed in this case",
    "Severe Depression": "The test results shows that the user suffers from severe depression, calling for professionam help and support is necessary"
}

db_url = os.getenv("FIREBASE_URL")


def json2text(json_object):
    list_to_copy = []
    steps = list_to_copy.copy()

    def func(json_object, depth):
        for key in json_object.keys():
            if type(json_object[key]) == list or type(json_object[key]) == tuple:
                steps.append(depth * "  " + key + ": ")
                for element in json_object[key]:
                    try: func(element, depth + 1)
                    except: steps[-1] += str(element) + " "
            elif json_object[key] is None:
                pass
            else:
                try:
                    steps.append(depth * "  " + key + ": ")
                    func(json_object[key], depth + 1)
                except: steps[-1] += str(json_object[key]) + " "

    if type(json_object) == list:
        for element in json_object:
            func(element, 0)
    else: func(json_object, 0)
    return '\n'.join(steps)


def create_user_profile():
    # TODO: integrate social media and smartwatch data

    general_info = db.reference(f"/general_questionnaire").get()["data"]
    general_info = general_info[list(general_info.keys())[0]]["answers"]

    gad_7 = db.reference(f"/GAD7").get()["data"]
    gad_7 = gad_7[list(gad_7.keys())[0]]
    formatted_gad7 = {gad7_mapping[k]: v for k, v in gad_7["answers"].items()}
    gad7_diagnosis = diagnosis_mapping[gad_7["diagnosis"]]

    phq_9 = db.reference(f"/PHQ9").get()["data"]
    phq_9 = phq_9[list(phq_9.keys())[0]]
    formatted_phq9 = {phq9_mapping[k]: v for k, v in phq_9["answers"].items()}
    phq9_diagnosis = diagnosis_mapping[phq_9["diagnosis"]]

    return json2text({
        "User info": general_info,
        "Anxiety test": formatted_gad7,
        "Anxiety diagnosis": gad7_diagnosis,
        "Depression test": formatted_phq9,
        "Depression diagnosis": phq9_diagnosis,
    })

