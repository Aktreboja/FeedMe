# Utility file that handles authentication and persistent storage
import bcrypt
import jwt
from datetime import timedelta, datetime

# Hashes a plaintext password
def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8', bcrypt.gensalt()))


# Verifies a plaintext password to its hash
def verify_password(plaintext_pw: str, hashed_pw: bytes):
    return bcrypt.checkpw(plaintext_pw.encode('utf-8'), hashed_pw)


# Generates an Access Token for the user

def create_access_token(payload: dict):
    payload_with_exp = payload.copy()
    expires = datetime.utcnow() + timedelta(minutes=60)
    payload_with_exp.update({"expire": expires.strftime("%Y-%m-%d %H:%M:%S")})

    encoded_jwt = jwt.encode(payload_with_exp, "SECRET HERE", algorithm="HS256")
    return encoded_jwt