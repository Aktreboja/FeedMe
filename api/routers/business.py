from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import requests
import os

router = APIRouter()

yelp_endpoint = "https://api.yelp.com/v3"

# Models

# /business/search Input. Can append more data as needed.
class BusinessSearchQuery(BaseModel):
    location: str
    term: str

# Gets the 
@router.get('/api/business/search')
def search_business(term: str, location: str):
    try:
        requestUrl = f"{yelp_endpoint}/businesses/search?term={term}&location={location}&sort_by=best_match&limit=10"
        print(requestUrl)
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {os.getenv('YELP_API_KEY')}"
        }
        response = requests.get(requestUrl, headers=headers)

        # Check Response status code of Yelp's API route
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Yelp API returned an error")
        
        try:
            response_json = response.json()
        except ValueError:
            raise HTTPException(status_code=500, detail="Yelp API Returned unexpected values")
        
        return response_json
    except Exception as e:
        raise HTTPException(500, f"Server Error at /api/business/search: {e}") 
         
    


