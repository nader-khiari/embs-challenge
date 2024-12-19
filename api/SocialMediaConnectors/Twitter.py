import requests
import os
import json
from dotenv import load_dotenv

load_dotenv(dotenv_path = '.env')
# To set your environment variables in your terminal run the following line:
# export 'BEARER_TOKEN'='<your_bearer_token>'
bearer_token = os.getenv("TWITTER_BEARER_TOKEN")
username = os.getenv("TWITTER_USER_NAME")


def create_url(user_id):
    return "https://api.twitter.com/2/users/{}/tweets".format(user_id)


def get_params():
    # Tweet fields are adjustable.
    # Options include:
    # attachments, author_id, context_annotations,
    # conversation_id, created_at, entities, geo, id,
    # in_reply_to_user_id, lang, non_public_metrics, organic_metrics,
    # possibly_sensitive, promoted_metrics, public_metrics, referenced_tweets,
    # source, text, and withheld
    return {
        "tweet.fields": "attachments,context_annotations,created_at,lang,possibly_sensitive,referenced_tweets,text",
        "max_results": 50
    }


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {bearer_token}"
    # r.headers["User-Agent"] = "v2UserTweetsPython"
    return r


def connect_to_endpoint(url, params):
    response = requests.request("GET", url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.json()

def get_user_id(username):
    users_retrieval_endpoint = f"https://api.x.com/2/users/by/username/{username}"
    user_info_response = requests.get(users_retrieval_endpoint, headers={'Authorization': f'Bearer {bearer_token}'})
    user_id = json.loads(user_info_response.text)["data"]["id"]
    return user_id

def collect():
    usr_id = get_user_id(username)
    url = create_url(usr_id)
    params = get_params()
    json_response = connect_to_endpoint(url, params)
    return json_response.get("data", [])

def main():
    user_id = "1308779687263469568"
    # user_id = "2437291543"
    url = create_url(user_id)
    params = get_params()
    json_response = connect_to_endpoint(url, params)
    with open("tweets.json", "w") as f:
        json.dump(json_response, f)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()