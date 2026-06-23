from fastapi.testclient import TestClient

from src.app import app, get_allowed_origins


client = TestClient(app)


def test_health_check():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_default_allowed_origins():
    assert get_allowed_origins() == [
        "http://localhost:5173",
        "http://localhost:5174",
    ]
