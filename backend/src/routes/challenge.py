from datetime import datetime
import json

from fastapi import APIRouter, Request, HTTPException, Depends
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session

from ..ai_generator import generate_challenge_with_llm
from ..database.db import (
    get_challenge_quota,
    create_challenge,
    create_challenge_quota,
    reset_quota_if_needed,
    get_user_challenges
)
from ..utils import authenticate_and_get_user_details
from ..database.models import get_db

router = APIRouter()

class ChallengeRequest(BaseModel):
    """
    Pydantic model for validating challenge generation requests.
    """
    difficulty: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "difficulty": "easy",
            }
        }
    )

@router.post("/generate-challenge")
async def generate_challenge(
    request: ChallengeRequest,
    request_obj: Request,
    db: Session = Depends(get_db)
):
    """
    Endpoint to generate a new coding challenge for the authenticated user.
    Checks and updates the user's quota, generates a challenge using the LLM,
    stores it in the database, and returns the challenge data.
    """
    try:
        # Authenticate user and get user_id
        user_details = authenticate_and_get_user_details(request_obj)
        user_id = user_details.get("user_id")
        
        # Get or create the user's quota record, and reset if needed
        quota = get_challenge_quota(db, user_id)
        if not quota:
            quota = create_challenge_quota(db, user_id)
        quota = reset_quota_if_needed(db, quota)

        # Check if user has quota remaining
        if quota.quota_remaining <= 0:
            raise HTTPException(status_code=429, detail="Quota exhausted")

        # Generate a challenge using the LLM
        challenge_data = generate_challenge_with_llm(request.difficulty)

        # Store the new challenge in the database
        new_challenge = create_challenge(
            db=db,
            difficulty=request.difficulty,
            created_by=user_id,
            title=challenge_data["title"],
            options=json.dumps(challenge_data["options"]),
            correct_answer_id=challenge_data["correct_answer_id"],
            explanation=challenge_data["explanation"]
        )

        # Decrement the user's quota and commit changes
        quota.quota_remaining -= 1
        db.commit()

        # Return the challenge data to the frontend
        return {
            "id": new_challenge.id,
            "difficulty": request.difficulty,
            "title": new_challenge.title,
            "options": json.loads(new_challenge.options),
            "correct_answer_id": new_challenge.correct_answer_id,
            "explanation": new_challenge.explanation,
            "timestamp": new_challenge.date_created.isoformat()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/my-history")
async def my_history(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Endpoint to retrieve the authenticated user's challenge history.
    """
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    challenges = get_user_challenges(db, user_id)
    return {"challenges": challenges}

@router.get("/quota")
async def get_quota(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Endpoint to retrieve the authenticated user's current challenge quota.
    Resets the quota if 24 hours have passed since the last reset.
    """
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    quota = get_challenge_quota(db, user_id)
    if not quota:
        # If no quota record exists, return default values
        return {
            "user_id": user_id,
            "quota_remaining": 0,
            "last_reset_date": datetime.now()
        }
    
    quota = reset_quota_if_needed(db, quota)
    return quota
