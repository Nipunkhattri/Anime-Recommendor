import requests
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from models.user_model import User
from utils import verify_token , get_db

router = APIRouter()
ANILIST_URL = "https://graphql.anilist.co"

@router.get("/search")
def search_anime(name: str = Query(None), genre: str = Query(None)):
    query = """
    query ($search: String, $genre: String) {
      Page(perPage: 10) {
        media(search: $search, genre_in: [$genre], type: ANIME) {
          title {
            romaji
          }
          genres
          description
        }
      }
    }
    """
    variables = {"search": name, "genre": genre}
    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables})
    return response.json()

@router.get("/recommendations")
def get_recommendations(current_user: User = Depends(verify_token)):
    if not current_user.preferences:
        return {"error": "No preferences set"}

    genres = [pref.genre for pref in current_user.preferences]

    query = """
    query ($genres: [String]) {
      Page(perPage: 10) {
        media(genre_in: $genres, sort: POPULARITY_DESC, type: ANIME) {
          title {
            romaji
          }
          genres
          description
        }
      }
    }
    """

    variables = {"genres": genres}

    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables})
    return response.json()