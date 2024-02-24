from api.utils.database import authenticate_user, get_user_collection, verify_user
from api.utils.auth import TokenResponse, oauth2_scheme
import jwt
import os
from fastapi import APIRouter, HTTPException, status, Depends, Header
from pydantic import BaseModel
import bcrypt
from api.utils.database import UserLogin
from api.utils.auth import create_access_token
from datetime import datetime

router = APIRouter()

# Models

# User Model for login / signup
class User(BaseModel):
    email: str
    name: str
    user_name: str
    password: str


# Dependency function to get the current user based on the JWT Token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, key = os.getenv('JWT_SECRET'), algorithms=[os.getenv("JWT_ALGORITHM")])
        email: str = payload.get('email')

        # Get the expired timestamp and the current, then compare to see if access token is valid or expired
        expired_str = payload.get('expire')
        current_time = datetime.now()

        token_expire = datetime.strptime(expired_str, "%Y-%m-%d %H:%M:%S")
        if current_time > token_expire:
            raise jwt.ExpiredSignatureError
       
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid Credentials")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid Token")
    user = verify_user(email)
    
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user    

# Signup route
@router.post('/api/signup', status_code=status.HTTP_201_CREATED)
def signup(user: User):
    try:
        # create the new user Object to add to the db, hash the password.
        hash = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        new_user : dict = {
            "email": user.email,
            "name": user.name,
            "user_name": user.user_name,
            "password": hash
        }
        collection = get_user_collection()

        # Check to see if the account is unique
        duplicate_email = collection.find_one({"email": new_user['email']})
        duplicate_user_name = collection.find_one({"user_name": new_user['user_name']})
        if duplicate_user_name is not None:
            raise HTTPException(409, detail="User name already exists")
        elif duplicate_email is not None:
            raise HTTPException(409, detail="Email Already exists")
        else:
            # Insert into the database
            collection.insert_one(new_user)
            new_user.pop('password', None)
            new_user.pop('_id', None)
            print(f"new user: {new_user}")
            tokens : TokenResponse = create_access_token(new_user)
            return {
                "status_code": 201,
                "access_token": tokens['access_token'],
                "refresh_token": tokens['refresh_token'],
                "type": "Bearer"
            }   
    except Exception as e:
        return e
    

# Function for user login and token creation
@router.post('/api/token')
def token(user: UserLogin):
    try:
        registered_user = authenticate_user(user)
        if registered_user is not None:
            tokens : TokenResponse = create_access_token(registered_user)
            return {
                    "status_code": 200,
                    "access_token": tokens["access_token"],
                    "refresh_token": tokens["refresh_token"],
                    "type": "Bearer"
                }
        else:
            raise HTTPException(409, detail="Invalid Credentials")
    except Exception as e:
        return e
    
# todo: Work on Refresh functionality
@router.post('/api/refresh')
def refresh():
    return


# Starter / Template route for protected
@router.get('/api/protected')
async def protected_route(user: dict = Depends(get_current_user)):
    return {"Message": "This is a protected route", "user": user}