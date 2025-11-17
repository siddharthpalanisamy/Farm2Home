# Farm2Home

Farm2Home is a full-stack example marketplace connecting farmers and customers. This repository contains a Python FastAPI backend and a React + Vite frontend for browsing products, managing carts, and tracking orders.

**Project Structure**

- `backend/`: FastAPI backend, dependencies, and startup script.
- `frontend/`: React + Vite frontend application and UI components.
- `RUN_INSTRUCTIONS.md`: Quick run notes and scripts.
- `START_BACKEND.bat`, `START_FRONTEND.bat`: Convenience Windows scripts to start each service.

**Tech Stack**

- Backend: Python, FastAPI, Uvicorn
- Frontend: React, Vite, JavaScript, ESLint

## Prerequisites

- Python 3.10+ (Windows)
- Node.js 16+ / npm 8+ (or a compatible Node version)

## Backend — Setup (Windows PowerShell)

Open PowerShell and run:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```

You can also use the provided batch script:

```powershell
.\START_BACKEND.bat
```

The backend will typically serve the API at `http://127.0.0.1:8000` (check `backend/app/main.py` for exact mount).

## Frontend — Setup (Windows PowerShell)

Open a new PowerShell window and run:

```powershell
cd frontend
npm install
# Start the Vite dev server
npm run dev
```

Or use the bundled batch script:

```powershell
.\START_FRONTEND.bat
```

Vite's dev server usually runs at `http://localhost:5173` (the terminal will show the exact URL).

## Notes & Environment

- If the backend requires environment variables or a database, check `backend/app` for config files or `.env` usage.
- This project includes helpful scripts and a `get-pip.py` file in `backend/` for environments that need it.

## Contributing

Contributions are welcome. Create issues for bugs or feature requests, and open pull requests for proposed changes.

## License

Add a license of your choice here (e.g., MIT). If you want, I can add a `LICENSE` file.

## Questions

If you'd like, I can:

- Add more detailed API documentation (list endpoints and example requests).
- Improve the frontend README with development notes for components.
- Add a `Makefile` or PowerShell scripts to start both services concurrently.

---
Created/updated by assistant to consolidate project setup instructions.
