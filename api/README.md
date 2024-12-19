# MindSphere: A Platform for Early Detection, Personalized Care, and Continuous Support in Mental Health
## What is it?
This part of the project is the the server side of **Mindsphere**, a platform the aims to detect mental health issues, provide personalized care and support for users, through the use of social media platforms, and data coming from wearable devices (both optionnal), all while preserving their privacy and safety by allowing the user to manage his data storage and platforms integration (if he choses to use them).
This part of the project offers a set of APIs that connects to the client side and can also be used by themselves.

## Setup steps
### Step 1: Preparing enviromnement variables
At the root of this folder create a new environments file called `.env`, which contains the following variables:
```
# Required in order to run properly
## Mistral API
MISTRAL_API_KEY= # Your Mistral API key
## Firebase
FIREBASE_URL= # Your Firebase DB URL


# Social media integrations (Optional but recommended, you can choose some or integrate them all)
REDDIT_USERNAME=

TWITTER_BEARER_TOKEN= 
TWITTER_USER_NAME=

SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_USERNAME=
```
### Step 2: Creating the Mistral API key
* First you have to go to the Mistral AI [website](https://mistral.ai/) and create an account.
* Once an Account is created, You will be redirected to the console. Click the **API Keys** tab on the sidebar.
* Click on the choose a plan link and choose the experiment plan (free plan with rate limitations)
* After setting up your plan, create an API key and copy it.
* Lastly, paste the copied key onto the `MISTRAL_API_KEY` variable.
### Step 3: Setting up the Data base
* Got to the Firebase [console](https://console.firebase.google.com/) and create a new project.
* Set up the project and finish the creation.
* On the **Build** tab (in the sidebar), select **Realtime Database** then click on **Create database**
* Select a region, click next, then select **test mode**.
* Copy the DB URL and paste it to the `FIREBASE_URL` variable.
* In the rules tab, change the rules to the following:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
* Lastly, in the project setting, go the the `Service accounts` tab, generate a new private key and put it in the `FirebaseHelpers` folder (Make sure to rename it to `firebase_key.json`)
### Step 4: Social media integrations setup
#### X (Twitter)
* Go to the [X developers](https://developer.x.com/en) website and signin/signup and then you will be redirected to the API portal.
* Click on `Create Project` and complete all the steps required.
* When you get to the app creation process, make sure to copy the bearer token.
* Finally, Paste the bearer token in the `TWITTER_BEARER_TOKEN` variable.
* As a last step, copy your account's username and paste it to the `TWITTER_USER_NAME` variable (simply go to your X profile and it will be whatever is after x.com/, for example JohnDoe is the username of x.com/JohnDoe).
#### Reddit
* Simply open your reddit profile and you will find your username there (make sure to remove the `u/` from `u/USERNAME`).
* Put your username on the `REDDIT_USERNAME` variable.
#### Spotify
* Got to the [Spotify developers](https://developer.spotify.com/) website and signin/signup.
* Go to the dashboard and create an app.
* Fill the necessary information and select `Web API` for the usecase (for the redirect URL you can put any URL as long as it is valid, for this current prototype, we won't be using it).
* Go to the created App's settings, then copy the `Client ID` and paste it to the `SPOTIFY_CLIENT_ID` variable.
* Click on the `Vie client secret` button and copy the `Client secret`, then paste it to the `SPOTIFY_CLIENT_SECRET` variable.
* Finally go to your spotify account settings [page](https://www.spotify.com/account/profile/), copy your user name and paste it to the `SPOTIFY_USERNAME` variable.

## Running the project
* The first step is to make sure docker is installed in you computer.
* In the CLI, got to the project directory.
Build and run the project by executing: `docker compose up --build`
* If you want to kill the container run `docker compose down`.
* If you want to rerun the porject again remove the `--build` flag and simply execute `docker compose up`.

## Project limitations
* Currently, this project is plagued with API rate limits, especially for the social media APIs, meaning that collecting data in realtime is almost impossible, for now, we made so that it collects data on each time we start the project.
* We planned on Integrating Meta's Graph API, but it requires an organization name, a ready ToU page, fully hosted app along with a page for user's to request their data to be deleted which we couldn't get on time. 
## Future work and improvements
* Adress the issued discussed in the **Project limitations** section.
* A more thourough data analysis modules for the social media integrations in general (not only limited to the user's posts, but also their interactions, etc...).
* Create a to do list after each interaction with the assistant resulting in a more interactive and engaging experience for the user.
* Experiment with LLMs with good scores on medical data benchmarks and explore the possibility of finetuning.
* Currenty this project is setup in a way that gives the user full control over his data which is great for data safety and privacy, but it requires the user to have some technical skills in order to set it up, we should explore the possibility of packaging it as a platform in order to make it more accessible.
