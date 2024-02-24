from api.utils.database import get_mongo_client, find_user, get_user_collection
from api.utils.auth import hash_password, verify_password
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import bcrypt
from api.utils.database import UserLogin

router = APIRouter()

# Models

# User Model for login / signup
class User(BaseModel):
    email: str
    name: str
    password: str




# Login Route
@router.post('/api/login', status_code=status.HTTP_200_OK)
def login(user: UserLogin):
    try:
        registered_user = find_user(user)
        if registered_user is None:
            raise HTTPException(409, 'User does not exist')
        else:
            verified = verify_password(user.password.encode('utf-8', registered_user['password']))
            if verified:
                # todo: Add JWT token implementation here
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
        collection = get_user_collection()
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
    
