from pymongo import MongoClient
import os

# Retrieves the mongo client
def get_mongo_client():
    url = os.getenv('MONGO_URL')
    client = MongoClient(url)
    return client