# Usage Guide

This guide covers local setup, configuration, and common development tasks for CodePrep.AI.

## 1. Install Dependencies

Backend:

```bash
conda create -n codeprep python=3.13
conda activate codeprep
pip install -r backend/requirements.txt
```

Frontend:

```bash
cd frontend
npm install
```

## 2. Configure Environment Variables

Backend:

```bash
cp backend/src/.env.example backend/src/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

Fill in the Clerk and Hugging Face values before running the app.

## 3. Run Locally

Start the backend:

```bash
cd backend
huggingface-cli login
python server.py
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`.

## 4. Use the App

1. Sign in with Clerk.
2. Select a difficulty.
3. Generate a challenge.
4. Choose an answer to reveal the explanation.
5. Visit the history page to review previous challenges.
6. Watch the daily quota counter reset after 24 hours.

## 5. Test Clerk Webhooks Locally

Use Ngrok only when testing Clerk webhook delivery:

```bash
ngrok http 8000
```

Set the Clerk webhook target to:

```text
https://your-ngrok-domain.ngrok-free.app/webhooks/clerk
```

## 6. Development Checks

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
pip install -r requirements-ci.txt
pytest
```

## 7. Troubleshooting

- Missing Clerk key: confirm `frontend/.env` has `VITE_CLERK_PUBLISHABLE_KEY`.
- Auth failures: confirm backend `CLERK_API_KEY`, `JWT_KEY`, and `ALLOWED_ORIGINS`.
- Model access errors: confirm your Hugging Face account has access to the configured model.
- Slow first challenge: the backend loads the LLM on the first generation request.
- Database confusion: delete local `backend/challenges.db` and restart the API to recreate SQLite tables.
