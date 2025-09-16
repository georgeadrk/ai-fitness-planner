from fastapi import APIRouter

router = APIRouter()

@router.get("/workout-plan")
def get_workout_plan(goal: str = "strength"):
    # Mock response for now
    return {
        "goal": goal,
        "plan": ["Push-ups", "Squats", "Plank"]
    }

@router.get("/nutrition-plan")
def get_nutrition_plan(calories: int = 2000):
    # Mock response for now
    return {
        "calories": calories,
        "meals": ["Oatmeal breakfast", "Chicken salad", "Grilled salmon"]
    }