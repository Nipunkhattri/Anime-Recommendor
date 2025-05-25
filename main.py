from fastapi import FastAPI, Depends, status
from views import auth, anime, preferences
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(anime.router, prefix="/anime", tags=["Anime"])
app.include_router(preferences.router, prefix="/user", tags=["Preferences"])

@app.get("/", status_code=status.HTTP_200_OK)
def root() -> dict:
    return {"message": "Welcome to FastAPI SAAS Template", "docs": "/docs"}