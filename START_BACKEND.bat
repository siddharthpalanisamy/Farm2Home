@echo off
echo ========================================
echo Starting Backend Server (FastAPI)
echo ========================================
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing/Updating dependencies...
pip install -r requirements.txt

echo.
echo ========================================
echo Starting server on http://127.0.0.1:8000
echo ========================================
echo Press Ctrl+C to stop the server
echo.

uvicorn app.main:app --reload --port 8000

pause

