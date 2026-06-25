# CodePrep.AI

[![CI](https://github.com/ethanvillalovoz/codeprep-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/ethanvillalovoz/codeprep-ai/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.13-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-19-blue.svg)](https://react.dev/)

CodePrep.AI is a full-stack coding interview practice app that generates multiple-choice coding challenges with a Hugging Face LLM, tracks daily challenge quota, and stores user challenge history behind Clerk authentication.

![CodePrep.AI home screen](docs/screenshots/home.png)

## Features

- Difficulty-based coding challenge generation with Meta-Llama-3-8B-Instruct
- Multiple-choice practice flow with instant answer explanations
- Clerk authentication for protected challenge generation and history views
- Daily quota tracking with automatic 24-hour resets
- SQLite persistence through SQLAlchemy
- React/Vite frontend and FastAPI backend

## Tech Stack

- Frontend: React, Vite, React Router, Clerk
- Backend: FastAPI, SQLAlchemy, Pydantic, Uvicorn
- AI/ML: Hugging Face Transformers, PyTorch, Meta-Llama-3-8B-Instruct
- Database: SQLite by default, configurable through `DATABASE_URL`
- Tooling: GitHub Actions, ESLint, pytest

## Screenshots

![Generated challenge](docs/screenshots/challenge.png)

![Challenge history](docs/screenshots/history.png)

## Demo Availability

CodePrep.AI is not currently published as a public live app because the product depends on a running FastAPI backend, Clerk authentication, Hugging Face model access, and local or hosted persistence. The README screenshots are the public demo surface for now.

See [Demo strategy](docs/demo-strategy.md) for the recommended walkthrough format and the requirements for adding a maintained hosted demo later.

## Prerequisites

- Python 3.13+
- Node.js 20+
- Hugging Face account with access to `meta-llama/Meta-Llama-3-8B-Instruct`
- Clerk application for authentication
- Ngrok only if you want to test Clerk webhooks locally

## Quick Start

Clone the repository:

```bash
git clone https://github.com/ethanvillalovoz/codeprep-ai.git
cd codeprep-ai
```

Set up the backend:

```bash
conda create -n codeprep python=3.13
conda activate codeprep
pip install -r backend/requirements.txt
cp backend/src/.env.example backend/src/.env
```

Fill in `backend/src/.env`, then start the API:

```bash
cd backend
huggingface-cli login
python server.py
```

Set up the frontend in a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:8000`.

## Configuration

Backend variables live in `backend/src/.env`:

```bash
CLERK_API_KEY=your_clerk_secret_key
JWT_KEY=your_jwt_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
HUGGINGFACE_TOKEN=your_huggingface_token
CODEPREP_MODEL_ID=meta-llama/Meta-Llama-3-8B-Instruct
DATABASE_URL=sqlite:///./challenges.db
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

Frontend variables live in `frontend/.env`:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:8000
```

Never commit real `.env` files or generated database files.

## Development

Run frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

Run backend tests:

```bash
cd backend
pip install -r requirements-ci.txt
pytest
```

The backend test requirements intentionally avoid installing PyTorch/Transformers so CI can verify API wiring without downloading the LLM.

## Project Structure

```text
codeprep-ai/
├── backend/
│   ├── src/
│   │   ├── ai_generator.py
│   │   ├── app.py
│   │   ├── database/
│   │   ├── routes/
│   │   └── utils.py
│   ├── tests/
│   ├── requirements.txt
│   └── requirements-ci.txt
├── frontend/
│   ├── src/
│   │   ├── auth/
│   │   ├── challenge/
│   │   ├── history/
│   │   ├── layout/
│   │   └── utils/
│   └── package.json
├── docs/
│   ├── architecture.md
│   ├── usage-guide.md
│   └── screenshots/
└── .github/
```

## Documentation

- [Architecture](docs/architecture.md)
- [Usage guide](docs/usage-guide.md)
- [Demo strategy](docs/demo-strategy.md)
- [FAQ](docs/faq.md)

## Roadmap

- [x] AI-powered challenge generation
- [x] Clerk authentication
- [x] Challenge history
- [x] Daily quota tracking
- [ ] Topic/tag-based challenge generation
- [ ] Timed practice mode
- [ ] Challenge quality feedback persisted to the backend
- [ ] Deployment recipe for a production hosting target

## License

This project is released under the [MIT License](LICENSE).
