import os
from pathlib import Path

from clerk_backend_api import AuthenticateRequestOptions, Clerk
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv(Path(__file__).with_name(".env"))

clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_API_KEY"))


def get_authorized_parties():
    raw_parties = os.getenv(
        "CLERK_AUTHORIZED_PARTIES",
        "http://localhost:5173,http://localhost:5174",
    )
    return [party.strip() for party in raw_parties.split(",") if party.strip()]

def authenticate_and_get_user_details(request):
    """
    Authenticate the incoming request using Clerk and return user details.
    Raises HTTPException if authentication fails.
    """
    try:
        # Authenticate the request using Clerk SDK
        request_state = clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=get_authorized_parties(),
                jwt_key=os.getenv("JWT_KEY")
            )
        )
        # If the user is not signed in, raise an unauthorized error
        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Invalid token")

        # Extract the user ID from the token payload
        user_id = request_state.payload.get("sub")

        # Return the user ID in a dictionary
        return {
            "user_id": user_id
        }
    except Exception as e:
        # Raise a 500 error if authentication fails for any reason
        raise HTTPException(status_code=500, detail="Invalid credentials")
