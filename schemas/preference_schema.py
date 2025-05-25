from pydantic import BaseModel
from typing import List, Optional

class PreferenceSchema(BaseModel):
    genre: str

class PreferenceUpdate(BaseModel):
    genres: List[str]

