from fastapi import FastAPI
from strawberry.asgi import GraphQL
from dotenv import load_dotenv
import uvicorn
import os

# Load environment variables from .env file
load_dotenv()

# Import the GraphQL schema
from schema import schema

# Create the GraphQL application
graphql_app = GraphQL(schema)

# Create the main FastAPI application
app = FastAPI()

# Mount the GraphQL application at the /graphql endpoint
app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)

# A simple root endpoint to check if the API is running
@app.get("/")
def read_root():
    return {"message": "Welcome to the Supply Chain API!"}

if __name__ == "__main__":
    # Start the Uvicorn server for local development
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)