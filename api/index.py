from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.routers import business, user

# Load Environment Variables
load_dotenv()

app = FastAPI(docs_url='/api/docs', openapi_url='/api/openapi.json')

# Mount Routers
app.include_router(user.router)
app.include_router(business.router)


# API Health Checker
@app.get("/api/healthchecker")
def healthchecker():
    return {"status": "success", "message": "API is up and running"}



# Cors Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)