# Utility file that handles authentication and persistent storage
import bcrypt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
import jwt
from datetime import timedelta, datetime
import os
from pydantic import BaseModel


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_token(token: str):
    data = jwt.decode(token, key = os.getenv('JWT_SECRET'), algorithms=[os.getenv('JWT_ALGORITHM')])
    return data


TokenDep = Annotated[str, Depends(verify_token)]

# Hashes a plaintext password
def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8', bcrypt.gensalt()))


# Verifies a plaintext password to its hash
def verify_password(plaintext_pw: str, hashed_pw: bytes):
    return bcrypt.checkpw(plaintext_pw.encode('utf-8'), hashed_pw)


# Generates an Access Token for the user
def create_access_token(payload: dict):
    try:
        # Create access and Refresh Tokens
        access_token : dict = payload.copy()
        refresh_token :dict = payload.copy()

        print(access_token)

        # Set up expiration datetimes
        access_expires = datetime.utcnow() + timedelta(minutes=60)
        refresh_expires = datetime.utcnow() + timedelta(days=30)

        access_token.update({"expire": access_expires.strftime("%Y-%m-%d %H:%M:%S")})
        refresh_token.update({"expre": refresh_expires.strftime("%Y-%m-%d %H:%M:%S")})

        # Encode the jwt tokens and return
        encoded_access_jwt = jwt.encode(access_token, os.getenv('JWT_SECRET'), algorithm=os.getenv('JWT_ALGORITHM'))
        encoded_refresh_jwt = jwt.encode(refresh_token, os.getenv('JWT_SECRET'), algorithm=os.getenv('JWT_ALGORITHM'))
        return {
            "access_token": encoded_access_jwt,
            "refresh_token": encoded_refresh_jwt
        }
    except Exception as e:
        return e

# Refresh the expired token
def refresh_token(token : TokenDep):
    return token