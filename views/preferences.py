from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.user_model import User
from models.preference_model import Preference
from schemas.preference_schema import PreferenceSchema , PreferenceUpdate
from utils import verify_token ,get_db
from typing import List
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/preferences", response_model=List[PreferenceSchema])
def get_preferences(current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    return current_user.preferences

@router.post("/preferences")
def update_preferences(update: PreferenceUpdate, current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    db.query(Preference).filter_by(user_id=current_user.id).delete()
    for genre in update.genres:
        db_pref = Preference(genre=genre, user_id=current_user.id)
        db.add(db_pref)
    db.commit()
    return JSONResponse(
        content={"message": "Preferences updated successfully"},
        status_code=200
    )