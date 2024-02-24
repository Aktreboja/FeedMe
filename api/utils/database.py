from pymongo import MongoClient
import os
from pydantic import BaseModel
from fastapi import HTTPException
from api.utils.auth import verify_password

class UserLogin(BaseModel):
    email: str
    password: str

# Retrieves the mongo client
def get_mongo_client():
    url = os.getenv('MONGO_URL')
    client = MongoClient(url)
    return client

# Gets the User Collection
def get_user_collection():
    try:
        client = get_mongo_client()
        db = client['FeedMe']
        collection = db['Users']
        return collection
    except Exception as e:
        return {"Message": f"Error getting User Collection: {e}"}

# Authenticates the user based on credentials
def authenticate_user(user: UserLogin):
    try:
        collection = get_user_collection()
        print(user)
        user_col : dict = collection.find_one({"email": user.email})
        if user_col is not None and verify_password(user.password, user_col['password']):   
            user_col.pop('_id', None)
            user_col.pop('password', None)
            print(user_col)
            return user_col
        else:
            return None
    except Exception as e:
        return {'error': 'Error authenticating user'}

# todo: Work on adding the 
def verify_user(email: str):
    try:
        collection = get_user_collection()
        user_col : dict = collection.find_one({"email": email})
        if user_col is not None:
            user_col.pop('_id', None)
            user_col.pop('password', None)
            return user_col
        else:
            return None
    except Exception as e:
        return e