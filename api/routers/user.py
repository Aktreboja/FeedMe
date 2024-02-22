from api.database import get_mongo_client
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import bcrypt


router = APIRouter()

# Models

# User Model for login / signup
class User(BaseModel):
    email: str
    name: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str

# Login Route
@router.post('/api/login', status_code=status.HTTP_200_OK)
def login(user: UserLogin):
    try:
        client = get_mongo_client()
        db = client['FeedMe']
        collection = db['Users']
        user_col = collection.find_one({"email": user.email})
        if user_col is None:
            raise HTTPException(409, 'User does not exist')
        else:
            verify_pw = bcrypt.checkpw(user.password.encode('utf-8'), user_col['password'])
            if verify_pw:
                return {'Message': 'User exists and logged in'}
            else:
                raise HTTPException(409, 'Incorrect email and/or password')
    except Exception as e:
        return e

    



# Signup route
@router.post('/api/signup', status_code=status.HTTP_201_CREATED)
def signup(user: User):
    try:
        # create the new user Object to add to the db, hash the password.
        hash = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        new_user = {
            "email": user.email,
            "name": user.name,
            "password": hash
        }
        client = get_mongo_client()
        db = client["FeedMe"]
        collection = db['Users']

        # Check to see if the account is unique
        duplicate = collection.find_one({"email": new_user['email']})
        if duplicate is None:
            # Insert into the database
            collection.insert_one(new_user)
            return {'message': 'User has signed up successfully'}
        else:
            raise HTTPException(409, "User Already Exists")

    except Exception as e:
        print(e)
        raise HTTPException(500, 'Error Signing up')
    
