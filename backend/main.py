from fastapi import FastAPI
from backend import database
from backend.routers import auth, fitness
from backend.models import user

app = FastAPI(title="AI Fitness Planner")

# Create DB tables
database.Base.metadata.create_all(bind=database.engine)

# Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(fitness.router, prefix="/fitness", tags=["Fitness"])

@app.get("/")
def root():
    return {"message": "AI Fitness Planner Backend Running 🚀"}