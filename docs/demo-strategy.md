# CodePrep.AI Demo Strategy

CodePrep.AI is best presented as a reproducible local app plus screenshots or a short walkthrough video. It should not advertise a public live demo unless the frontend, backend, authentication, model access, and persistence layer are all deployed and monitored together.

## Current Public Demo

- README screenshot gallery:
  - `docs/screenshots/home.png`
  - `docs/screenshots/challenge.png`
  - `docs/screenshots/history.png`
- Local reproduction through the README quick start and usage guide.

## Why Not GitHub Pages

GitHub Pages only hosts static files. It cannot run:

- The FastAPI backend.
- Clerk-protected challenge generation and history requests.
- Hugging Face model inference.
- SQLite or another configured database.
- Server-side environment variables and secrets.

For that reason, a GitHub Pages link would only show a static shell unless the backend and service configuration were hosted elsewhere.

## Recommended Public Demo Format

The strongest next demo artifact would be a short GIF or video that shows:

1. Signing in or landing on an authenticated session.
2. Choosing a challenge difficulty.
3. Generating a coding question.
4. Selecting an answer and viewing feedback.
5. Opening the challenge history view.

Keep the walkthrough around 30 to 60 seconds and focus on the product behavior instead of setup.

## Local Reproduction Checklist

Before recording a walkthrough:

- Create and activate the backend Python environment.
- Install backend dependencies from `backend/requirements.txt`.
- Configure `backend/src/.env` with Clerk and Hugging Face credentials.
- Log in with `huggingface-cli login` if required by the model.
- Start the backend with `python server.py`.
- Install frontend dependencies.
- Configure `frontend/.env` with the Clerk publishable key and API URL.
- Start the frontend with `npm run dev`.

## If A Hosted Demo Is Added Later

A real public live demo should only be linked after:

- Backend and frontend deployments are stable.
- Clerk callback URLs and allowed origins are configured for production.
- Hugging Face access tokens are stored as server-side secrets.
- Model latency, memory requirements, rate limits, and expected costs are understood.
- The README clearly labels the hosted demo as maintained.
