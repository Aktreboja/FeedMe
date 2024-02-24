from pymongo import MongoClient
import os
from pydantic import BaseModel


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

# Checks to see if a user exists.
def find_user(user: UserLogin):
    try:
        client = get_mongo_client()
        db = client['FeedMe']
        collection = db['Users']
        user_col = collection.find_one({"email": user.email})
        if user_col is None:   
            return None
        else:
            return user_col
    except Exception as e:
        return e