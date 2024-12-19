import requests
import os
import json
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


load_dotenv(dotenv_path = '.env')

SPOTIFY_CLIENT_ID=os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET=os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_USERNAME=os.getenv("SPOTIFY_USERNAME")

os.environ['SPOTIPY_CLIENT_ID']= SPOTIFY_CLIENT_ID
os.environ['SPOTIPY_CLIENT_SECRET']= SPOTIFY_CLIENT_SECRET

def get_spotify_data():
    auth_manager = SpotifyClientCredentials()
    sp = spotipy.Spotify(auth_manager=auth_manager)

    playlists = sp.user_playlists(SPOTIFY_USERNAME)

    items = []
    while playlists:
        for i, playlist in enumerate(playlists['items']):
            if len(playlist["description"])>0:
                items.append({
                    "name": playlist["name"],
                    "description": playlist["description"]
                })
            # print(playlist.keys())
        if playlists['next']:
            playlists = sp.next(playlists)
        else:
            playlists = None
    return items[:50]


