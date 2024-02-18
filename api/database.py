from pymongo import MongoClient
import os
from dotenv import load_dotenv


# Retrieves the mongo client
def get_mongo_client():
    load_dotenv()
    url = os.getenv('MONGO_URL')
    client = MongoClient(url)
    return client