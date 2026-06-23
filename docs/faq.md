# FAQ

## Why use Llama 3?

Meta-Llama-3-8B-Instruct is strong enough to generate varied interview-style coding questions while remaining accessible through Hugging Face.

## Can I use a different model?

Yes. Set `CODEPREP_MODEL_ID` in `backend/src/.env` or update the default in `backend/src/ai_generator.py`.

## Why does the first generated challenge take a while?

The model is loaded lazily on the first generation request so the API can start and run tests without downloading the LLM.

## How does quota work?

Each user receives a daily quota. The backend resets quota when at least 24 hours have passed since the user's last reset timestamp.

## Where is data stored?

The default local database is SQLite at `backend/challenges.db`. You can point SQLAlchemy to another database with `DATABASE_URL`.

## How do I report a bug?

Open an issue at <https://github.com/ethanvillalovoz/codeprep-ai/issues>.
