from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.user_model import User
from models.preference_model import Preference
from database import SessionLocal
from schemas.user_schema import Token,UserCreate
from schemas.preference_schema import PreferenceSchema
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from fastapi.responses import JSONResponse

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    token = create_access_token({"sub": db_user.username})
    return JSONResponse(
        content={"access_token": token, "token_type": "bearer"},
        status_code=201
    )

@router.post("/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": db_user.username})
    return JSONResponse(
        content={"access_token": token, "token_type": "bearer"},
        status_code=200
    )