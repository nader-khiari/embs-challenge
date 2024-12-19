import pandas as pd
import requests
import os
import json
from dotenv import load_dotenv

t_mapper = {
    "t1":"Comment",
    "t2":"Account",
    "t3":"Link",
    "t4":"Message",
    "t5":"Subreddit",
    "t6":"Award",
}

load_dotenv(dotenv_path = '.env')
reddit_username = os.getenv("REDDIT_USERNAME")
# reddit_username = "vegana_slayer"

USER_INFO_ENDPOINT = f"https://www.reddit.com/user/{reddit_username}/about.json"
POSTS_ENDPOINT = f"https://www.reddit.com/user/{reddit_username}/overview.json"
print(POSTS_ENDPOINT)


def get_user_info():
    user_info = requests.request("GET", USER_INFO_ENDPOINT)
    print(user_info.status_code)
    if user_info.json().get("error", 200) != 200:
        final_obj = {}
    else:
        user_info = user_info.json()
        # print(user_info)
        final_obj = {
            "is_mod": user_info["data"]["is_employee"],
            "is_contributor": user_info["data"]["subreddit"]["user_is_contributor"],
            "is_banned": user_info["data"]["subreddit"]["user_is_banned"],
            "free_form_reports": user_info["data"]["subreddit"]["free_form_reports"],
            "is_quarantined": user_info["data"]["subreddit"]["quarantine"],
            "is_blocked": user_info["data"]["is_blocked"],
            # "is_suspended": user_info["data"]["is_suspended"],
            "total_karma": user_info["data"]["total_karma"],
            "comment_karma": user_info["data"]["comment_karma"],
        }
        with open("reddit_user_info.json", "w") as f:
            json.dump(final_obj, f)

    return final_obj

def get_user_activity():
    final_obj = []
    user_data = requests.request("GET", POSTS_ENDPOINT)
    print(user_data.status_code)
    # if user_data.json().get("error", 200) != 200:
    #     final_obj = {}

    user_data = user_data.json()
    print(user_data)
    activity = user_data["data"]["children"]
    for act in activity:
        final_obj.append({
            "kind": t_mapper[act["kind"]],
            "subreddit": act["data"]["subreddit"],
            "title": act["data"].get("title", ""),
            "link_title": act["data"].get("link_title", ""),
            "body": act["data"].get("body", ""),
            "over_18": act["data"]["over_18"],
            "downs": act["data"]["downs"],
        })
    return final_obj

# print(json.dumps(get_user_activity(), indent=4, sort_keys=True))